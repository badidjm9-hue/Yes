import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'
    const period = searchParams.get('period') || '30' // days
    const hotelId = searchParams.get('hotelId')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    switch (type) {
      case 'overview':
        const [
          totalBookings,
          totalRevenue,
          totalHotels,
          totalUsers,
          activeBookings,
          recentBookings
        ] = await Promise.all([
          prisma.booking.count(),
          prisma.booking.aggregate({
            _sum: { totalAmount: true },
            where: { status: 'CONFIRMED' }
          }),
          prisma.hotel.count(),
          prisma.user.count(),
          prisma.booking.count({
            where: {
              status: 'CONFIRMED',
              checkOutDate: { gte: new Date() }
            }
          }),
          prisma.booking.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: { name: true, email: true }
              },
              hotel: {
                select: { name: true }
              }
            }
          })
        ])

        return NextResponse.json({
          stats: {
            totalBookings,
            totalRevenue: totalRevenue._sum.totalAmount || 0,
            totalHotels,
            totalUsers,
            activeBookings
          },
          recentBookings
        })

      case 'bookings':
        const bookings = await prisma.booking.findMany({
          where: hotelId ? { hotelId } : {},
          include: {
            user: {
              select: { name: true, email: true }
            },
            hotel: {
              select: { name: true }
            },
            room: true
          },
          orderBy: { createdAt: 'desc' },
          take: 50
        })

        return NextResponse.json({ bookings })

      case 'hotels':
        const hotels = await prisma.hotel.findMany({
          include: {
            _count: {
              select: {
                rooms: true,
                reviews: true,
                bookings: true
              }
            }
          },
          orderBy: { starRating: 'desc' }
        })

        return NextResponse.json({ hotels })

      case 'analytics':
        // Revenue by period
        const revenueByPeriod = await prisma.booking.groupBy({
          by: ['createdAt'],
          where: {
            createdAt: { gte: startDate },
            status: 'CONFIRMED'
          },
          _sum: { totalAmount: true },
          orderBy: { createdAt: 'asc' }
        })

        // Bookings by status
        const bookingsByStatus = await prisma.booking.groupBy({
          by: ['status'],
          _count: true
        })

        // Top hotels by bookings
        const topHotels = await prisma.hotel.findMany({
          take: 10,
          include: {
            _count: {
              select: { bookings: true }
            },
            bookings: {
              where: {
                status: 'CONFIRMED',
                createdAt: { gte: startDate }
              }
            }
          },
          orderBy: {
            bookings: {
              _count: 'desc'
            }
          }
        })

        return NextResponse.json({
          revenueByPeriod,
          bookingsByStatus,
          topHotels
        })

      case 'users':
        const users = await prisma.user.findMany({
          include: {
            _count: {
              select: { bookings: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 50
        })

        return NextResponse.json({ users })

      default:
        return NextResponse.json(
          { error: 'Invalid analytics type' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'updateBookingStatus':
        const { bookingId, status } = data
        const booking = await prisma.booking.update({
          where: { id: bookingId },
          data: { status },
          include: {
            user: true,
            hotel: true
          }
        })

        // Create notification
        await prisma.notification.create({
          data: {
            userId: booking.userId,
            title: 'Booking Status Updated',
            message: `Your booking at ${booking.hotel.name} has been ${status.toLowerCase()}`,
            type: 'BOOKING_UPDATE',
            data: { bookingId }
          }
        })

        return NextResponse.json({ booking })

      case 'deleteHotel':
        const { hotelId: deleteHotelId } = data
        await prisma.hotel.delete({
          where: { id: deleteHotelId }
        })

        return NextResponse.json({ message: 'Hotel deleted successfully' })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error processing admin action:', error)
    return NextResponse.json(
      { error: 'Failed to process admin action' },
      { status: 500 }
    )
  }
}