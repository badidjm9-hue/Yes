import { Suspense } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import HotelDetails from '@/components/hotel/HotelDetails'
import BookingForm from '@/components/booking/BookingForm'
import ReviewsSection from '@/components/hotel/ReviewsSection'
import { Card } from '@/components/ui/card'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const hotel = await prisma.hotel.findUnique({
    where: { id: params.id }
  })

  if (!hotel) {
    return {
      title: 'Hotel Not Found | Volo'
    }
  }

  return {
    title: `${hotel.name} | Volo Hotel Booking`,
    description: hotel.description,
    openGraph: {
      title: hotel.name,
      description: hotel.description,
      images: hotel.images,
    },
  }
}

export default async function HotelPage({ params }: { params: { id: string } }) {
  const hotel = await prisma.hotel.findUnique({
    where: { id: params.id },
    include: {
      amenities: true,
      rooms: {
        where: {
          available: true
        }
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  })

  if (!hotel) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<HotelLoadingSkeleton />}>
              <HotelDetails hotel={hotel} />
            </Suspense>
            
            <ReviewsSection hotelId={hotel.id} initialReviews={hotel.reviews} />
          </div>
          
          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm hotel={hotel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HotelLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Image Gallery Skeleton */}
      <div className="h-96 bg-white/10 rounded-lg animate-pulse" />
      
      {/* Hotel Info Skeleton */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="space-y-4">
          <div className="h-8 bg-white/10 rounded animate-pulse" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-white/10 rounded animate-pulse w-1/2" />
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </Card>
      
      {/* Rooms Skeleton */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="space-y-4">
          <div className="h-6 bg-white/10 rounded animate-pulse" />
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-32 bg-white/10 rounded animate-pulse" />
          ))}
        </div>
      </Card>
      
      {/* Reviews Skeleton */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="space-y-4">
          <div className="h-6 bg-white/10 rounded animate-pulse" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}