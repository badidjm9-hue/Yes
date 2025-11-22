"use client"

import { Card } from '@/components/ui/card'
import { User, MapPin, Calendar } from 'lucide-react'

export function SocialProofNotifications() {
  const notifications = [
    {
      id: '1',
      type: 'booking',
      user: { name: 'أحمد م.', location: 'الجزائر' },
      hotel: 'فندق الجزائر الفاخر',
      time: 'منذ دقيقتين'
    },
    {
      id: '2',
      type: 'review',
      user: { name: 'فاطمة ع.', location: 'وهران' },
      hotel: 'منتجع وهران海滨',
      time: 'منذ 5 دقائق'
    }
  ]

  return (
    <div className="fixed top-20 left-4 z-40 space-y-3">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ delay: Math.random() * 5 }}
          className="social-proof"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white font-medium">
                {notification.user.name} من {notification.user.location}
              </p>
              <p className="text-xs text-gray-300">
                {notification.type === 'booking' ? 'حجز' : 'كتب مراجعة'} في {notification.hotel}
              </p>
              <p className="text-xs text-gray-400">{notification.time}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}