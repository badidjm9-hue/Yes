"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Wifi, Car, Utensils } from 'lucide-react'

interface Hotel {
  id: string
  name: string
  description: string
  address: string
  city: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  distance?: number
  verified?: boolean
  featured?: boolean
}

interface HotelCardProps {
  hotel: Hotel
}

export function HotelCard({ hotel }: HotelCardProps) {
  const discountPercentage = hotel.originalPrice 
    ? Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)
    : 0

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'واي فاي مجاني':
        return <Wifi className="h-4 w-4" />
      case 'مسبح':
        return <div className="h-4 w-4 bg-blue-500 rounded-full" />
      case 'مطعم':
        return <Utensils className="h-4 w-4" />
      case 'مواقف سيارات':
        return <Car className="h-4 w-4" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="lg:w-80 lg:h-64 relative">
          <img
            src={hotel.images[0] || '/images/hotel-placeholder.jpg'}
            alt={hotel.name}
            className="w-full h-64 lg:h-full object-cover"
          />
          {hotel.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                مميز
              </span>
            </div>
          )}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4">
              <span className="bg-volo-error text-white px-3 py-1 rounded-full text-xs font-medium">
                -{discountPercentage}%
              </span>
            </div>
          )}
          {hotel.verified && (
            <div className="absolute bottom-4 right-4">
              <span className="bg-volo-success text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                ✓ موثق
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{hotel.name}</h3>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{hotel.city}</span>
                {hotel.distance !== undefined && (
                  <span>• {hotel.distance} كم من المركز</span>
                )}
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{hotel.rating}</span>
                <span className="text-gray-300 text-sm">({hotel.reviewCount})</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-1 bg-glass px-2 py-1 rounded text-xs text-gray-300"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <div className="bg-glass px-2 py-1 rounded text-xs text-gray-300">
                +{hotel.amenities.length - 4} أكثر
              </div>
            )}
          </div>

          {/* Price & Actions */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-right">
                {hotel.originalPrice && (
                  <span className="text-gray-400 text-sm line-through ml-2">
                    {hotel.originalPrice.toLocaleString()} دج
                  </span>
                )}
                <span className="text-xl font-bold text-white">
                  {hotel.price.toLocaleString()} دج
                </span>
                <span className="text-gray-300 text-sm"> / ليلة</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                عرض التفاصيل
              </Button>
              <Button size="sm" className="animate-glow">
                احجز الآن
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}