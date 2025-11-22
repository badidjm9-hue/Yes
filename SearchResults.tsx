'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Users, Wifi, Car, Coffee, Dumbbell, Utensils } from 'lucide-react'

interface Hotel {
  id: string
  name: string
  description: string
  city: string
  country: string
  rating: number
  images: string[]
  amenities: { name: string }[]
  rooms: Array<{
    id: string
    type: string
    price: number
    currency: string
    available: boolean
  }>
  _count: {
    reviews: number
  }
}

// Mock hotels data - in real app, this would come from API
const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Hotel Aurassi',
    description: 'Luxury hotel in the heart of Algiers with stunning Mediterranean views and world-class amenities.',
    city: 'Algiers',
    country: 'Algeria',
    rating: 4.8,
    images: ['/api/placeholder/400/300'],
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Swimming Pool' },
      { name: 'Spa' },
      { name: 'Restaurant' },
      { name: 'Fitness Center' },
      { name: 'Room Service' }
    ],
    rooms: [
      {
        id: '1a',
        type: 'Deluxe Room',
        price: 15000,
        currency: 'DZD',
        available: true
      }
    ],
    _count: {
      reviews: 124
    }
  },
  {
    id: '2',
    name: 'Sheraton Alger',
    description: 'Modern business hotel located in the diplomatic district with state-of-the-art facilities.',
    city: 'Algiers',
    country: 'Algeria',
    rating: 4.7,
    images: ['/api/placeholder/400/300'],
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Business Center' },
      { name: 'Fitness Center' },
      { name: 'Bar' },
      { name: 'Conference Rooms' }
    ],
    rooms: [
      {
        id: '2a',
        type: 'Executive Room',
        price: 12000,
        currency: 'DZD',
        available: true
      }
    ],
    _count: {
      reviews: 89
    }
  },
  {
    id: '3',
    name: 'Hôtel El Biar',
    description: 'Charming boutique hotel in the historic El Biar district with traditional Algerian hospitality.',
    city: 'El Biar',
    country: 'Algeria',
    rating: 4.6,
    images: ['/api/placeholder/400/300'],
    amenities: [
      { name: 'Free WiFi' },
      { name: 'Restaurant' },
      { name: 'Terrace' },
      { name: 'Concierge' },
      { name: 'Laundry Service' }
    ],
    rooms: [
      {
        id: '3a',
        type: 'Standard Room',
        price: 8000,
        currency: 'DZD',
        available: true
      }
    ],
    _count: {
      reviews: 67
    }
  }
]

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Free WiFi': Wifi,
  'Swimming Pool': Car,
  'Spa': Coffee,
  'Restaurant': Utensils,
  'Fitness Center': Dumbbell,
  'Business Center': Users,
  'Bar': Coffee,
  'Conference Rooms': Users,
  'Room Service': Coffee,
  'Terrace': Users,
  'Concierge': Users,
  'Laundry Service': Users
}

interface SearchResultsProps {
  searchParams: {
    destination?: string
    checkIn?: string
    checkOut?: string
    guests?: string
    minPrice?: string
    maxPrice?: string
    rating?: string
    amenities?: string
  }
}

export default function SearchResults({ searchParams }: SearchResultsProps) {
  const [hotels] = useState<Hotel[]>(mockHotels)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // Filter hotels based on search criteria
  const filteredHotels = hotels.filter(hotel => {
    if (searchParams.destination && !hotel.city.toLowerCase().includes(searchParams.destination.toLowerCase()) && 
        !hotel.name.toLowerCase().includes(searchParams.destination.toLowerCase())) {
      return false
    }
    
    if (searchParams.minPrice && hotel.rooms[0]?.price < parseInt(searchParams.minPrice)) {
      return false
    }
    
    if (searchParams.maxPrice && hotel.rooms[0]?.price > parseInt(searchParams.maxPrice)) {
      return false
    }
    
    if (searchParams.rating && hotel.rating < parseFloat(searchParams.rating)) {
      return false
    }
    
    if (searchParams.amenities) {
      const searchAmenities = searchParams.amenities.split(',')
      const hasMatchingAmenities = searchAmenities.some(amenity => 
        hotel.amenities.some(hotelAmenity => 
          hotelAmenity.name.toLowerCase().includes(amenity.toLowerCase())
        )
      )
      if (!hasMatchingAmenities) return false
    }
    
    return true
  })

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-DZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price)
  }

  const getLowestPrice = (rooms: Hotel['rooms']) => {
    if (!rooms.length) return 0
    return Math.min(...rooms.map(room => room.price))
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {filteredHotels.length} hotels found
          </h2>
          <p className="text-gray-300">
            {searchParams.destination && `in ${searchParams.destination}`}
            {searchParams.checkIn && ` • ${new Date(searchParams.checkIn).toLocaleDateString()}`}
            {searchParams.checkOut && ` - ${new Date(searchParams.checkOut).toLocaleDateString()}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className={`border-white/20 ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-300'}`}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`border-white/20 ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-300'}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* Hotels List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No hotels found</h3>
          <p className="text-gray-400">
            Try adjusting your search criteria or filters to find more results.
          </p>
        </Card>
      )}
    </div>
  )
}

interface HotelCardProps {
  hotel: Hotel
  viewMode: 'grid' | 'list'
}

function HotelCard({ hotel, viewMode }: HotelCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-DZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price)
  }

  const getLowestPrice = (rooms: Hotel['rooms']) => {
    if (!rooms.length) return 0
    return Math.min(...rooms.map(room => room.price))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ))
  }

  if (viewMode === 'grid') {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300">
        <div className="relative">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <svg
              className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : 'fill-none'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
        </div>

        <CardContent className="p-6">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-white mb-1">{hotel.name}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {hotel.city}, {hotel.country}
            </div>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex mr-2">
              {renderStars(hotel.rating)}
            </div>
            <span className="text-white text-sm font-medium">{hotel.rating}</span>
            <span className="text-gray-400 text-sm ml-1">({hotel._count.reviews} reviews)</span>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => {
              const Icon = amenityIcons[amenity.name] || Users
              return (
                <Badge 
                  key={amenity.name}
                  variant="outline" 
                  className="text-xs border-white/20 text-gray-300"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {amenity.name}
                </Badge>
              )
            })}
            {hotel.amenities.length > 4 && (
              <Badge 
                variant="outline" 
                className="text-xs border-white/20 text-gray-400"
              >
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">
                {formatPrice(getLowestPrice(hotel.rooms), hotel.rooms[0]?.currency || 'DZD')}
              </p>
              <p className="text-xs text-gray-400">per night</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // List view
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300">
      <div className="flex">
        <div className="relative w-64 h-48">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <svg
              className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : 'fill-none'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </Button>
        </div>

        <CardContent className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-1">{hotel.name}</h3>
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel.city}, {hotel.country}
              </div>

              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars(hotel.rating)}
                </div>
                <span className="text-white text-sm font-medium">{hotel.rating}</span>
                <span className="text-gray-400 text-sm ml-1">({hotel._count.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-white">
                {formatPrice(getLowestPrice(hotel.rooms), hotel.rooms[0]?.currency || 'DZD')}
              </p>
              <p className="text-xs text-gray-400">per night</p>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {hotel.amenities.slice(0, 6).map((amenity) => {
              const Icon = amenityIcons[amenity.name] || Users
              return (
                <Badge 
                  key={amenity.name}
                  variant="outline" 
                  className="text-xs border-white/20 text-gray-300"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {amenity.name}
                </Badge>
              )
            })}
            {hotel.amenities.length > 6 && (
              <Badge 
                variant="outline" 
                className="text-xs border-white/20 text-gray-400"
              >
                +{hotel.amenities.length - 6} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Compare
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Book Now
              </Button>
            </div>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              View Details
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}