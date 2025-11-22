import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, addDays, differenceInDays, parseISO } from "date-fns"
import { ar, fr, enUS } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "DZD", locale: string = "ar-DZ"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "DZD" ? 0 : 2,
    maximumFractionDigits: currency === "DZD" ? 0 : 2,
  }).format(amount)
}

export function formatDate(date: Date | string, formatString: string = "PPP", locale: string = "ar"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  const localeMap = {
    "ar": ar,
    "fr": fr,
    "en": enUS,
  }
  return format(dateObj, formatString, { locale: localeMap[locale as keyof typeof localeMap] || ar })
}

export function calculateNights(checkIn: Date | string, checkOut: Date | string): number {
  const start = typeof checkIn === "string" ? parseISO(checkIn) : checkIn
  const end = typeof checkOut === "string" ? parseISO(checkOut) : checkOut
  return differenceInDays(end, start)
}

export function generateBookingReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `VOLO-${timestamp}-${randomStr}`
}

export function generateQRCode(text: string): string {
  // This would integrate with a QR code library
  // For now, return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
}

export function getPriceLevel(price: number): "low" | "medium" | "high" {
  if (price < 10000) return "low"
  if (price < 25000) return "medium"
  return "high"
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-volo-success"
  if (rating >= 3.5) return "text-volo-warning"
  return "text-volo-error"
}

export function getRatingStars(rating: number): string {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+213|0)[567][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    return `+213 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`
  }
  return phone
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = typeof date === "string" ? parseISO(date) : date
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  
  if (diffInSeconds < 60) return "منذ لحظات"
  if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`
  if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`
  if (diffInSeconds < 2592000) return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`
  return formatDate(past, "PPP", "ar")
}

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c * 10) / 10 // Round to 1 decimal place
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

export function isRTL(locale: string): boolean {
  return locale === "ar" || locale === "ar-DZ"
}

export function getRandomGradient(): string {
  const gradients = [
    "from-purple-600 to-blue-600",
    "from-blue-600 to-teal-600",
    "from-teal-600 to-green-600",
    "from-green-600 to-yellow-600",
    "from-yellow-600 to-red-600",
    "from-red-600 to-pink-600",
    "from-pink-600 to-purple-600",
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

export function parseSearchParams(params: URLSearchParams): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {}
  
  for (const [key, value] of params.entries()) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value)
      } else {
        result[key] = [result[key] as string, value]
      }
    } else {
      result[key] = value
    }
  }
  
  return result
}