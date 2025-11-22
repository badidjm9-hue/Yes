"use client"

import { Card } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      id: '1',
      name: 'أحمد محمد',
      location: 'الجزائر العاصمة',
      rating: 5,
      comment: 'تجربة رائعة مع Volo! حجزت فندق في دقائق قليلة والدعم كان ممتاز.',
      avatar: '/images/avatar-1.jpg'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      location: 'وهران',
      rating: 5,
      comment: 'أفضل منصة حجز استخدمتها. الأسعار منافسة والخدمة عملاء رائعة.',
      avatar: '/images/avatar-2.jpg'
    },
    {
      id: '3',
      name: 'محمد بن علي',
      location: 'قسنطينة',
      rating: 5,
      comment: 'واجهة سهلة الاستخدام وحجوزات سريعة. أنصح الجميع بـ Volo!',
      avatar: '/images/avatar-3.jpg'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-gray-300 text-lg">
            آراء حقيقية من عملاء راضين عن خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar || '/images/default-avatar.jpg'}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 right-0 h-6 w-6 text-primary-400/30" />
                <p className="text-gray-300 italic leading-relaxed pl-6">
                  "{testimonial.comment}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}