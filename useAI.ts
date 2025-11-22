import { useState, useCallback } from 'react'
import type {
  AIChatMessage,
  AIIntent,
  AIRecommendationRequest,
  AIRecommendationResponse,
  AIAnalysisResult,
  AISearchOptimization,
  ChatContext,
  SmartHotel,
  VoiceInputData
} from '@/types'

export function useAIChat() {
  const [messages, setMessages] = useState<AIChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (
    message: string,
    context?: ChatContext
  ): Promise<AIChatMessage | null> => {
    if (!message.trim()) return null

    setIsLoading(true)
    setError(null)

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
      isTyping: false
    }

    setMessages(prev => [...prev, userMessage])

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          conversationHistory: messages.slice(-10)
        }),
      })

      const data = await response.json()

      if (data.success) {
        const assistantMessage: AIChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          role: 'assistant',
          timestamp: new Date(),
          intent: data.intent,
          suggestions: data.suggestions,
          isTyping: false
        }

        setMessages(prev => [...prev, assistantMessage])
        return assistantMessage
      } else {
        throw new Error(data.error || 'فشل في الحصول على الرد')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ غير معروف'
      setError(errorMessage)

      const errorAssistantMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "عذراً، حدث خطأ تقني. يرجى المحاولة مرة أخرى أو استخدام البحث اليدوي.",
        role: 'assistant',
        timestamp: new Date(),
        intent: {
          type: 'error',
          confidence: 1.0
        },
        suggestions: ["جرب مرة أخرى", "ابحث يدوياً", "تواصل مع الدعم"],
        isTyping: false
      }

      setMessages(prev => [...prev, errorAssistantMessage])
      return null
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const getMessageById = useCallback((id: string): AIChatMessage | undefined => {
    return messages.find(msg => msg.id === id)
  }, [messages])

  const getMessagesByIntent = useCallback((intentType: string): AIChatMessage[] => {
    return messages.filter(msg => msg.intent?.type === intentType)
  }, [messages])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    getMessageById,
    getMessagesByIntent
  }
}

export function useAIRecommendations() {
  const [recommendations, setRecommendations] = useState<AIRecommendationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = useCallback(async (
    preferences: AIRecommendationRequest,
    count: number = 5
  ): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...preferences,
          count
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRecommendations(data)
      } else {
        throw new Error(data.error || 'فشل في جلب التوصيات')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ غير معروف'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getRecommendationsByType = useCallback(async (
    type: 'popular' | 'luxury' | 'family' | 'business',
    destination?: string,
    count: number = 6
  ): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/recommendations?type=${type}&destination=${destination}&count=${count}`)
      const data = await response.json()

      if (data.success) {
        setRecommendations(data)
      } else {
        throw new Error(data.error || 'فشل في جلب التوصيات')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ غير معروف'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearRecommendations = useCallback(() => {
    setRecommendations(null)
    setError(null)
  }, [])

  return {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
    getRecommendationsByType,
    clearRecommendations
  }
}

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('المتصفح لا يدعم إدخال الصوت')
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'ar-SA'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
      setError(null)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      const confidence = event.results[0][0].confidence

      setTranscript(transcript)
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      setError(`خطأ في التعرف على الصوت: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }, [])

  const stopListening = useCallback(() => {
    setIsListening(false)
    // SpeechRecognition لا يوفر stop method في جميع المتصفحات
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  }
}

export function useAISearchOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimization, setOptimization] = useState<AISearchOptimization | null>(null)
  const [error, setError] = useState<string | null>(null)

  const optimizeSearch = useCallback(async (query: string): Promise<void> => {
    setIsOptimizing(true)
    setError(null)

    try {
      const response = await fetch(`/api/ai/chat?action=optimize&query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        setOptimization(data)
      } else {
        throw new Error(data.error || 'فشل في تحسين البحث')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ في تحسين البحث'
      setError(errorMessage)
    } finally {
      setIsOptimizing(false)
    }
  }, [])

  const getSuggestions = useCallback(async (query: string): Promise<string[] | null> => {
    try {
      const response = await fetch(`/api/ai/chat?action=suggestions&query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        return data.suggestions
      } else {
        return null
      }
    } catch (err) {
      console.error('Failed to get suggestions:', err)
      return null
    }
  }, [])

  const clearOptimization = useCallback(() => {
    setOptimization(null)
    setError(null)
  }, [])

  return {
    isOptimizing,
    optimization,
    error,
    optimizeSearch,
    getSuggestions,
    clearOptimization
  }
}

export function useSmartHotels() {
  const [hotels, setHotels] = useState<SmartHotel[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeHotels = useCallback(async (
    hotels: any[],
    preferences: AIRecommendationRequest
  ): Promise<SmartHotel[]> => {
    setIsAnalyzing(true)
    setError(null)

    try {
      // محاكاة تحليل ذكي (في التطبيق الحقيقي ستستخدم OpenAI)
      const smartHotels: SmartHotel[] = hotels.map((hotel, index) => {
        const aiScore = Math.random() * 40 + 60 // 60-100
        const personalizedScore = Math.random() * 30 + 70 // 70-100
        
        // حسابSimilarity Score بناءً على التفضيلات
        let similarityScore = 0
        if (preferences.destination && hotel.city?.includes(preferences.destination)) {
          similarityScore += 30
        }
        if (preferences.rating && hotel.starRating >= preferences.rating) {
          similarityScore += 20
        }
        if (preferences.preferredAmenities) {
          const commonAmenities = hotel.amenities?.filter((amenity: string) => 
            preferences.preferredAmenities?.includes(amenity)
          ).length || 0
          similarityScore += Math.min(commonAmenities * 5, 30)
        }
        
        similarityScore += Math.random() * 20 // Random factor
        
        return {
          ...hotel,
          aiScore,
          personalizedScore,
          similarityScore,
          aiReasons: generateAIReasons(hotel, preferences)
        }
      })

      // ترتيب الفنادق حسب AI Score
      const sortedHotels = smartHotels.sort((a, b) => (b.aiScore + b.personalizedScore) - (a.aiScore + a.personalizedScore))
      
      setHotels(sortedHotels)
      return sortedHotels
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطأ في تحليل الفنادق'
      setError(errorMessage)
      return hotels
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const clearAnalysis = useCallback(() => {
    setHotels([])
    setError(null)
  }, [])

  return {
    hotels,
    isAnalyzing,
    error,
    analyzeHotels,
    clearAnalysis
  }
}

// دالة مساعدة لتوليد أسباب AI
function generateAIReasons(hotel: any, preferences: AIRecommendationRequest): string[] {
  const reasons: string[] = []
  
  if (preferences.destination && hotel.city?.includes(preferences.destination)) {
    reasons.push('مطابق لوجهتك المفضلة')
  }
  
  if (preferences.rating && hotel.starRating >= preferences.rating) {
    reasons.push('يلبي معايير التقييم')
  }
  
  if (preferences.budget && hotel.rooms?.[0]?.basePrice <= preferences.budget) {
    reasons.push('ضمن ميزانيتك')
  }
  
  if (hotel.featured) {
    reasons.push('فندق مميز ومعتمد')
  }
  
  if (hotel._count?.reviews > 10) {
    reasons.push('مستوى ثقة عالي من النزلاء')
  }
  
  if (hotel.amenities?.includes('واي فاي مجاني')) {
    reasons.push('مرفق مفضل متوفر')
  }
  
  if (reasons.length === 0) {
    reasons.push('خيار جيد للإقامة')
  }
  
  return reasons.slice(0, 3) // أفضل 3 أسباب
}
