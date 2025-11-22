"use client"

import { Card } from '@/components/ui/card'
import { Map, Navigation, ZoomIn, ZoomOut } from 'lucide-react'

interface Hotel {
  id: string
  name: string
  address: string
  price: number
  rating: number
  latitude: number
  longitude: number
}

interface MapViewProps {
  hotels: Hotel[]
}

export function MapView({ hotels }: MapViewProps) {
  // Mock map data - in real app, this would integrate with Google Maps or Mapbox
  const center = { lat: 36.7538, lng: 3.0588 } // Algiers coordinates

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Map className="h-6 w-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">خريطة الفنادق</h3>
      </div>

      {/* Map Container */}
      <div className="relative map-container">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20">
            <ZoomIn className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20">
            <ZoomOut className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20">
            <Navigation className="h-5 w-5" />
          </button>
        </div>

        {/* Hotel Markers */}
        <div className="absolute inset-0">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + (index * 30) % 60}%`,
                top: `${30 + (index * 20) % 40}%`,
              }}
            >
              {/* Hotel Marker */}
              <div className="relative">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                
                {/* Hotel Info Card */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Card className="p-3 w-48">
                    <h4 className="font-semibold text-white text-sm mb-1">{hotel.name}</h4>
                    <p className="text-xs text-gray-300 mb-2">{hotel.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">
                        {hotel.price.toLocaleString()} دج
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-yellow-400">★</span>
                        <span className="text-xs text-white">{hotel.rating}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-400">
          خريطة تفاعلية • معطيات الفنادق
        </div>
      </div>

      {/* Map Legend */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto mb-1 flex items-center justify-center">
            <span className="text-white text-xs">1</span>
          </div>
          <span className="text-gray-300">فندق متاح</span>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 bg-volo-warning rounded-full mx-auto mb-1 flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <span className="text-gray-300">عدد محدود</span>
        </div>
        <div className="text-center">
          <div className="w-6 h-6 bg-volo-success rounded-full mx-auto mb-1 flex items-center justify-center">
            <span className="text-white text-xs">%</span>
          </div>
          <span className="text-gray-300">عرض خاص</span>
        </div>
      </div>
    </Card>
  )
}