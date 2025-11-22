"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { VoiceSearchButton } from '@/components/voice/voice-search-button'

interface HeroSectionProps {
  onSearch: (params: {
    destination: string
    checkIn: string
    checkOut: string
    guests: number
    rooms: number
  }) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)

  const handleSearch = () => {
    onSearch({
      destination,
      checkIn,
      checkOut,
      guests,
      rooms
    })
  }

  const popularDestinations = [
    'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'تلمسان', 'باتنة'
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            اكتشف إقامتك المثالية
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              بسهولة تامة
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-12 leading-relaxed">
            منصة الحجز الأكثر تطوراً في الجزائر مع توصيات ذكية، جولات افتراضية، 
            وتأكيد فوري للحجز
          </p>

          {/* Search Form */}
          <Card className="p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {/* Destination */}
              <div className="md:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الوجهة
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="أين تريد الإقامة؟"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <VoiceSearchButton 
                  onResult={(text) => setDestination(text)}
                  placeholder="ابحث صوتياً عن الوجهة"
                />
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  تاريخ الوصول
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  تاريخ المغادرة
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الضيوف والغرف
                </label>
                <div className="relative">
                  <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={`${guests}-${rooms}`}
                    onChange={(e) => {
                      const [g, r] = e.target.value.split('-')
                      setGuests(parseInt(g))
                      setRooms(parseInt(r))
                    }}
                    className="form-input pr-10 appearance-none cursor-pointer"
                  >
                    <option value="1-1">ضيف واحد - غرفة واحدة</option>
                    <option value="2-1">ضيفين - غرفة واحدة</option>
                    <option value="2-2">ضيفين - غرفتان</option>
                    <option value="3-1">ثلاثة ضيوف - غرفة واحدة</option>
                    <option value="3-2">ثلاثة ضيوف - غرفتان</option>
                    <option value="4-2">أربعة ضيوف - غرفتان</option>
                    <option value="4-3">أربعة ضيوف - ثلاث غرف</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              size="lg"
              className="w-full md:w-auto px-12 py-4 text-lg font-semibold animate-glow"
            >
              <Search className="ml-2 h-5 w-5" />
              ابحث الآن
            </Button>
          </Card>

          {/* Popular Destinations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8"
          >
            <p className="text-gray-300 mb-4">الوجهات الأكثر شعبية:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularDestinations.map((city, index) => (
                <motion.button
                  key={city}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  onClick={() => setDestination(city)}
                  className="px-4 py-2 glass text-sm rounded-full hover:bg-white/20 transition-all duration-200 cursor-pointer"
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 glass rounded-full flex items-center justify-center">
          <Search className="h-8 w-8 text-primary-400" />
        </div>
      </div>
      
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 glass rounded-full flex items-center justify-center">
          <Calendar className="h-6 w-6 text-primary-400" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}