"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function NewsletterSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="p-12 text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 glass rounded-full">
                <Mail className="h-12 w-12 text-purple-400" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              اشترك في نشرتنا الإخبارية
            </h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              احصل على آخر العروض والمنتجات الجديدة والنصائح المفيدة للسفر
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1"
              />
              <Button className="px-8">
                اشترك الآن
              </Button>
            </div>
            
            <p className="text-gray-400 text-sm mt-4">
              لن نرسل لك رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}