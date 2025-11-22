'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Dumbbell, 
  Utensils,
  Users,
  Bed,
  Bath,
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2
} from 'lucide-react'

interface Hotel {
  id: string
  name: string
  description: string
  address: string
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
    maxGuests: number
    size: number
    beds: string
    features: string[]
  }>
  _count: {
    reviews: number
  }
}

interface HotelDetailsProps {
  hotel: Hotel
}

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
  'Laundry Service': Users,
  'Parking': Car,
  'Airport Shuttle': Car,
  '24/7 Reception': Users
}

export default function HotelDetails({ hotel }: HotelDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ))
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-DZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={hotel.images[currentImageIndex] || '/api/placeholder/800/400'}
            alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {hotel.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={prevImage}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextImage}
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`w-6 h-6 ${isFavorited ? 'fill-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <Share2 className="w-6 h-6" />
            </Button>
          </div>

          {/* Image Indicators */}
          {hotel.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hotel Basic Info */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{hotel.name}</h1>
            
            <div className="flex items-center text-gray-300 mb-3">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex mr-3">
                {renderStars(hotel.rating)}
              </div>
              <span className="text-white font-semibold text-lg">{hotel.rating}</span>
              <span className="text-gray-400 ml-2">({hotel._count.reviews} reviews)</span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {hotel.description}
            </p>
          </div>

          <div className="mt-6 lg:mt-0 lg:ml-8">
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-400">Excellent</p>
              <p className="text-gray-400 text-sm">Guest rating</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hotel.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity.name] || Users
              return (
                <div 
                  key={amenity.name}
                  className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg p-3"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="text-white text-sm">{amenity.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Rooms & Rates */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bed className="w-6 h-6" />
            Available Rooms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {hotel.rooms.map((room) => (
              <div 
                key={room.id}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{room.type}</h4>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>Up to {room.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{room.beds}</span>
                      </div>
                      <div>
                        <span>{room.size} m²</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {room.features.map((feature) => (
                        <Badge 
                          key={feature}
                          variant="outline" 
                          className="text-xs border-white/20 text-gray-300"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 lg:mt-0 lg:ml-8 text-right">
                    <p className="text-2xl font-bold text-white">
                      {formatPrice(room.price, room.currency)}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">per night</p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!room.available}
                    >
                      {room.available ? 'Select Room' : 'Not Available'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Map Placeholder */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <CardHeader>
          <CardTitle className="text-white">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Interactive map would be displayed here</p>
              <p className="text-gray-500 text-sm">{hotel.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}