"use client"

import { Card } from '@/components/ui/card'
import { Star, Shield, Clock, Heart } from 'lucide-react'

export function FeaturedHotels() {
  const hotels = [
    {
      id: '1',
      name: 'فندق الجزائر الفاخر',
      location: 'الجزائر العاصمة',
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      image: '/images/featured-hotel-1.jpg',
      discount: 17
    },
    {
      id: '2', 
      name: 'منتجع وهران海滨',
      location: 'وهران',
      price: 22000,
      rating: 4.9,
      image: '/images/featured-hotel-2.jpg'
    },
    {
      id: '3',
      name: 'فندق قسنطينة royal',
      location: 'قسنطينة',
      price: 12000,
      rating: 4.6,
      image: '/images/featured-hotel-3.jpg'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            الفنادق المميزة
          </h2>
          <p className="text-gray-300 text-lg">
            اكتشف أفضل العروض والحجوزات المتاحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <Card key={hotel.id} className="overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={hotel.image || '/images/hotel-placeholder.jpg'}
                  alt={hotel.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {hotel.discount && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-volo-error text-white px-3 py-1 rounded-full text-sm font-medium">
                      -{hotel.discount}%
                    </span>
                  </div>
                )}
                <button className="absolute top-4 left-4 p-2 glass rounded-full hover:bg-white/20 transition-colors">
                  <Heart className="h-5 w-5 text-white" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-2 text-gray-300 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{hotel.rating}</span>
                  <span>• {hotel.location}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
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
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                    احجز
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}