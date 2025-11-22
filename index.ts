import { User, Hotel, Room, Booking, Review, Payment, Notification } from "@prisma/client"

// Extended types with relations
export interface ExtendedUser extends User {
  bookings?: ExtendedBooking[]
  reviews?: Review[]
  favorites?: Favorite[]
  loyaltyHistory?: LoyaltyTransaction[]
}

export interface ExtendedHotel extends Hotel {
  rooms?: ExtendedRoom[]
  reviews?: Review[]
  bookings?: Booking[]
  favorites?: Favorite[]
  _avgRating?: number
  _countReviews?: number
}

export interface ExtendedRoom extends Room {
  hotel?: Hotel
  bookings?: Booking[]
  availability?: RoomAvailability[]
}

export interface ExtendedBooking extends Booking {
  user?: User
  hotel?: Hotel
  room?: Room
  payments?: Payment[]
}

export interface Favorite {
  id: string
  userId: string
  hotelId: string
  createdAt: Date
  user?: User
  hotel?: Hotel
}

export interface LoyaltyTransaction {
  id: string
  userId: string
  type: "EARNED" | "REDEEMED" | "BONUS" | "EXPIRED" | "ADJUSTED"
  points: number
  description: string
  bookingId?: string
  createdAt: Date
  user?: User
  booking?: Booking
}

export interface RoomAvailability {
  id: string
  roomId: string
  date: Date
  available: boolean
  price: number
  createdAt: Date
  updatedAt: Date
  room?: Room
}

// Form types
export interface SearchFormData {
  destination: string
  checkIn: Date
  checkOut: Date
  guests: number
  rooms: number
}

export interface BookingFormData {
  guestName: string
  guestEmail: string
  guestPhone?: string
  specialRequests?: string
  paymentMethod: PaymentMethod
  agreeToTerms: boolean
}

export interface ReviewFormData {
  rating: number
  title?: string
  comment: string
  images?: File[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Search types
export interface SearchFilters {
  priceRange?: [number, number]
  starRating?: number[]
  amenities?: string[]
  propertyType?: string[]
  location?: {
    lat: number
    lng: number
    radius: number
  }
  sortBy?: "price" | "rating" | "distance" | "popularity"
  sortOrder?: "asc" | "desc"
}

export interface SearchResult {
  hotels: ExtendedHotel[]
  total: number
  filters: SearchFilters
  suggestions?: string[]
}

// Payment types
export interface PaymentMethod {
  id: string
  name: string
  type: "CCP" | "BARIDIMOB" | "VISA" | "MASTERCARD" | "PAYPAL" | "BANK_TRANSFER"
  enabled: boolean
  processingFee?: number
  processingTime?: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  bookingId: string
  clientSecret?: string
}

// Notification types
export interface NotificationData {
  type: "BOOKING_CONFIRMATION" | "BOOKING_CANCELLATION" | "PRICE_ALERT" | "REVIEW_REMINDER" | "LOYALTY_REWARD" | "REFERRAL_BONUS" | "SYSTEM" | "PROMOTIONAL"
  title: string
  message: string
  data?: any
  actionUrl?: string
}

// Analytics types
export interface DashboardStats {
  totalBookings: number
  totalRevenue: number
  averageBookingValue: number
  occupancyRate: number
  topHotels: ExtendedHotel[]
  recentBookings: ExtendedBooking[]
  monthlyRevenue: MonthlyRevenue[]
  userGrowth: UserGrowth[]
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  bookings: number
}

export interface UserGrowth {
  date: string
  users: number
  newUsers: number
}

// AI Chat types
export interface ChatMessage {
  id: string
  message: string
  sender: "user" | "bot"
  timestamp: Date
  language: "ar" | "fr" | "en"
  type?: "text" | "quick_reply" | "image" | "card"
}

export interface QuickReply {
  id: string
  text: string
  action: string
}

// Experience types
export interface Experience {
  id: string
  hotelId?: string
  name: string
  description: string
  category: string
  duration: string
  price: number
  currency: string
  images: string[]
  available: boolean
  rating?: number
  reviewCount: number
  hotel?: Hotel
}

// Map types
export interface MapLocation {
  lat: number
  lng: number
  name: string
  address: string
  rating?: number
  price?: number
  image?: string
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

// Calendar heatmap types
export interface PriceCalendarDay {
  date: Date
  price: number
  available: boolean
  discountPercentage?: number
}

// Social proof types
export interface SocialProofEvent {
  id: string
  type: "booking" | "review" | "signup"
  message: string
  location?: string
  timestamp: Date
  userInitials?: string
  userImage?: string
}

// AR Preview types
export interface ARPreviewData {
  roomId: string
  images: string[]
  hotspots: ARHotspot[]
}

export interface ARHotspot {
  id: string
  x: number
  y: number
  z: number
  title: string
  description: string
  image?: string
}

// Voice search types
export interface VoiceSearchResult {
  query: string
  confidence: number
  language: string
  timestamp: Date
}

// Gamification types
export interface UserBadge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  earnedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  requirement: string
  reward: number
  progress: number
  completed: boolean
}

// Referral types
export interface ReferralProgram {
  code: string
  rewardPoints: number
  maxUses: number
  usedCount: number
  createdAt: Date
}

// Discount types
export interface DiscountCode {
  id: string
  code: string
  type: "PERCENTAGE" | "FIXED_AMOUNT"
  value: number
  minBookingAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  active: boolean
  expiresAt?: Date
  createdAt: Date
}

// Export enums for easier importing
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  HOTEL_OWNER = "HOTEL_OWNER"
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  NO_SHOW = "NO_SHOW"
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED"
}

export enum PropertyType {
  HOTEL = "HOTEL",
  APARTMENT = "APARTMENT",
  RESORT = "RESORT",
  VILLA = "VILLA",
  HOSTEL = "HOSTEL",
  GUESTHOUSE = "GUESTHOUSE"
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TWIN = "TWIN",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
  PRESIDENTIAL = "PRESIDENTIAL"
}

export type PaymentMethodType = "CCP" | "BARIDIMOB" | "VISA" | "MASTERCARD" | "PAYPAL" | "BANK_TRANSFER"

// AI and ChatGPT Integration Types
export interface AIChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  intent?: AIIntent
  suggestions?: string[]
  isTyping?: boolean
}

export interface AIIntent {
  type: 'search' | 'booking' | 'info' | 'help' | 'complaint' | 'review' | 'general' | 'error'
  confidence: number
  keywords?: string[]
}

export interface AIRecommendationRequest {
  budget?: number
  destination?: string
  travelDates?: string[]
  interests?: string[]
  preferredAmenities?: string[]
  rating?: number
  count?: number
}

export interface AIRecommendationResponse {
  success: boolean
  aiRecommendation?: string
  hotels?: ExtendedHotel[]
  userPreferences?: AIRecommendationRequest
  timestamp: Date
  error?: string
}

export interface AIAnalysisResult {
  accuracy: number
  quality: number
  usefulness: number
  appropriate: boolean
  details?: string
}

export interface AIReviewAnalysis {
  id: string
  reviewId: string
  hotelId: string
  analysis: AIAnalysisResult
  suggestions: string[]
  recommended: boolean
  createdAt: Date
}

export interface AISearchOptimization {
  original: string
  optimized: string
  keywords: string[]
  intent: AIIntent
  suggestions: string[]
}

export interface VoiceInputData {
  transcript: string
  confidence: number
  language: string
  timestamp: Date
}

export interface SmartHotel {
  id: string
  name: string
  city: string
  starRating: number
  images: string[]
  rooms: any[]
  _count: {
    reviews: number
    bookings: number
  }
  aiScore?: number
  aiReasons?: string[]
  personalizedScore?: number
  similarityScore?: number
}

export interface RecommendationType {
  id: 'popular' | 'luxury' | 'family' | 'business'
  label: string
  description: string
  criteria: {
    budget?: { min: number; max: number }
    amenities?: string[]
    target?: string
    features?: string[]
  }
}

export interface ChatContext {
  currentHotel?: ExtendedHotel
  userPreferences?: UserPreferences
  conversationHistory: ChatMessage[]
  location?: {
    lat: number
    lng: number
    city?: string
  }
}

export interface UserPreferences {
  budget?: number
  currency?: string
  travelStyle?: 'luxury' | 'budget' | 'business' | 'family'
  interests?: string[]
  preferredAmenities?: string[]
  tripType?: 'leisure' | 'business' | 'family' | 'romantic'
  duration?: string
  seasonality?: 'spring' | 'summer' | 'autumn' | 'winter'
}

export interface AIInsights {
  bookingProbability: number
  priceOptimization: string[]
  bestTimeToBook: string
  similarTravelers: {
    count: number
    averageRating: number
    commonAmenities: string[]
  }
  marketTrends: {
    demandLevel: 'low' | 'medium' | 'high'
    priceTrend: 'rising' | 'stable' | 'falling'
    recommendation: string
  }
}

export interface SmartSearchFilters {
  aiOptimized?: boolean
  personalityMatch?: boolean
  socialProof?: boolean
  dynamicPricing?: boolean
  sustainabilityScore?: number
  localExperiences?: boolean
}

export interface AIModelConfig {
  model: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-vision-preview'
  temperature: number
  maxTokens: number
  systemPrompt: string
  language: 'ar' | 'fr' | 'en'
  context: string
}