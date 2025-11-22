"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Filter, SortAsc } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HotelCard } from '@/components/hotels/hotel-card'
import { PriceCalendar } from '@/components/calendar/price-calendar'
import { MapView } from '@/components/map/map-view'

interface SearchSectionProps {
  initialParams: {
    destination: string
    checkIn: string
    checkOut: string
    guests: number
    rooms: number
  }
}

export function SearchSection({ initialParams }: SearchSectionProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map' | 'calendar'>('list')
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price')
  const [showFilters, setShowFilters] = useState(false)

  // Mock hotel data - in real app, this would come from API
  const hotels = [
    {
      id: '1',
      name: 'فندق الجزائر الفاخر',
      description: 'فندق فاخر بإطلالة رائعة على البحر المتوسط',
      address: 'شارع Didouche Mourad, الجزائر العاصمة',
      city: 'الجزائر العاصمة',
      country: 'الجزائر',
      price: 15000,
      originalPrice: 18000,
      rating: 4.8,
      reviewCount: 324,
      images: ['/images/hotel-1.jpg', '/images/hotel-1-2.jpg'],
      amenities: ['واي فاي مجاني', 'مسبح', 'تكييف', 'مطعم', 'خدمة غرف'],
      distance: 0,
      verified: true,
      featured: true,
    },
    // Add more mock hotels...
  ]

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              نتائج البحث في {initialParams.destination}
            </h2>
            <p className="text-gray-300">
              {hotels.length} فندق متاح
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-glass rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                قائمة
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                خريطة
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                تقويم الأسعار
              </Button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass rounded-lg px-3 py-2 text-sm"
            >
              <option value="price">السعر</option>
              <option value="rating">التقييم</option>
              <option value="distance">المسافة</option>
            </select>

            {/* Filters */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 ml-2" />
              فلاتر
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نطاق السعر
                </label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="من" />
                  <Input type="number" placeholder="إلى" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عدد النجوم
                </label>
                <select className="glass rounded-lg px-3 py-2 w-full text-sm">
                  <option value="">جميع التصنيفات</option>
                  <option value="5">5 نجوم</option>
                  <option value="4">4 نجوم</option>
                  <option value="3">3 نجوم</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  المرافق
                </label>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    واي فاي مجاني
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    مسبح
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="ml-2" />
                    مطعم
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نوع العقار
                </label>
                <select className="glass rounded-lg px-3 py-2 w-full text-sm">
                  <option value="">جميع الأنواع</option>
                  <option value="hotel">فندق</option>
                  <option value="resort">منتجع</option>
                  <option value="apartment">شقة مفروشة</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  تطبيق الفلاتر
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {viewMode === 'list' && (
            <div className="space-y-6">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'calendar' && (
            <PriceCalendar hotelId={hotels[0]?.id} />
          )}
        </div>

        <div className="lg:col-span-1">
          {viewMode === 'map' ? (
            <MapView hotels={hotels} />
          ) : (
            <div className="sticky top-6 space-y-6">
              {/* Quick Book */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  حجز سريع
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      الوجهة
                    </label>
                    <Input placeholder="البحث عن فندق" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      تاريخ الوصول
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      تاريخ المغادرة
                    </label>
                    <Input type="date" />
                  </div>
                  <Button className="w-full">
                    ابحث الآن
                  </Button>
                </div>
              </Card>

              {/* Recent Searches */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  آخر عمليات البحث
                </h3>
                <div className="space-y-2">
                  {['الجزائر العاصمة', 'وهران', 'قسنطينة'].map((city) => (
                    <button
                      key={city}
                      className="block w-full text-right p-2 text-sm text-gray-300 hover:text-white hover:bg-glass rounded transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}