"use client"

import { Card } from '@/components/ui/card'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'من نحن', href: '/about' },
      { name: 'الوظائف', href: '/careers' },
      { name: 'الأخبار', href: '/news' },
      { name: 'اتصل بنا', href: '/contact' },
    ],
    services: [
      { name: 'حجز الفنادق', href: '/search' },
      { name: 'العروض الخاصة', href: '/deals' },
      { name: 'تطبيق الجوال', href: '/mobile-app' },
      { name: 'خدمة العملاء', href: '/support' },
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'سياسة الإلغاء', href: '/cancellation-policy' },
      { name: 'الشروط والأحكام', href: '/terms' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
    ],
    legal: [
      { name: 'شروط الاستخدام', href: '/terms' },
      { name: 'سياسة الخصوصية', href: '/privacy' },
      { name: 'ملفات تعريف الارتباط', href: '/cookies' },
      { name: 'إخلاء المسؤولية', href: '/disclaimer' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/volo', label: 'فيسبوك' },
    { icon: Twitter, href: 'https://twitter.com/volo', label: 'تويتر' },
    { icon: Instagram, href: 'https://instagram.com/volo', label: 'إنستغرام' },
    { icon: Youtube, href: 'https://youtube.com/volo', label: 'يوتيوب' },
  ]

  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-glass-border mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold text-white">Volo</span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة حجز الفنادق الأكثر تطوراً في الجزائر. نوفر أفضل التجارب 
              مع تقنيات الذكاء الاصطناعي والأمان التام.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span>الجزائر العاصمة، الجزائر</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-primary-400" />
                <span>+213 555 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-primary-400" />
                <span>info@volo.dz</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">الشركة</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">الدعم</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-primary-600/20 to-primary-800/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                ابق على اطلاع بآخر العروض
              </h3>
              <p className="text-gray-300">
                اشترك في نشرتنا الإخبارية واحصل على أفضل العروض والأخبار
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 md:w-64 glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                اشترك الآن
              </button>
            </div>
          </div>
        </Card>

        {/* Bottom Footer */}
        <div className="border-t border-glass-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-300 text-sm">
              © {currentYear} Volo. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span>صُنع بـ</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>في الجزائر</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}