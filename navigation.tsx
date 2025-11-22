"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  Bell, 
  Globe, 
  Sun,
  Moon,
  LogIn
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'البحث', href: '/search' },
    { name: 'العروض', href: '/deals' },
    { name: 'من نحن', href: '/about' },
    { name: 'اتصل بنا', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-glass-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-white">Volo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Globe className="h-5 w-5" />
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-300 hover:text-white"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                <User className="h-5 w-5" />
              </Button>

              {isUserMenuOpen && (
                <Card className="absolute top-full left-0 mt-2 w-48 p-2">
                  <div className="space-y-1">
                    <Link href="/auth/signin" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-glass rounded">
                      <LogIn className="h-4 w-4" />
                      تسجيل الدخول
                    </Link>
                    <Link href="/auth/signup" className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-glass rounded">
                      <User className="h-4 w-4" />
                      إنشاء حساب
                    </Link>
                    <hr className="border-glass-border" />
                    <Link href="/profile" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-glass rounded">
                      الملف الشخصي
                    </Link>
                    <Link href="/bookings" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-glass rounded">
                      الحجوزات
                    </Link>
                    <Link href="/settings" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-glass rounded">
                      الإعدادات
                    </Link>
                  </div>
                </Card>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden border-t border-glass-border py-4"
          >
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}