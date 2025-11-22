# أمثلة استخدام ChatGPT في منصة فولو
## ChatGPT Integration Usage Examples

هذا الملف يحتوي على أمثلة عملية لكيفية استخدام ميزات ChatGPT المدمجة في منصة فولو.

---

## 🤖 المساعد الذكي للمحادثة

### مثال 1: البحث عن الفنادق
```typescript
// استخدام الـ ChatBot
import ChatBot from '@/components/chat/ChatBot'

function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsChatOpen(true)}>
        تحدث مع المساعد الذكي
      </button>
      
      <ChatBot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userPreferences={{
          budget: 15000,
          destination: 'الجزائر'
        }}
      />
    </>
  )
}
```

### مثال 2: الاستخدام المباشر للـ Hook
```typescript
import { useAIChat } from '@/hooks/useAI'

function SearchComponent() {
  const { messages, sendMessage, isLoading } = useAIChat()

  const handleSearch = async () => {
    await sendMessage("ابحث عن فندق في وهران بسعر مناسب", {
      currentHotel: null,
      userPreferences: {
        budget: 10000,
        destination: 'وهران'
      }
    })
  }

  return (
    <div>
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'يبحث...' : 'ابحث بالذكاء الاصطناعي'}
      </button>
    </div>
  )
}
```

---

## 🎯 التوصيات الذكية

### مثال 1: عرض التوصيات في الصفحة
```typescript
import AIRecommendations from '@/components/ai/AIRecommendations'
import { useAIRecommendations } from '@/hooks/useAI'

function RecommendationSection() {
  const { recommendations, isLoading, getRecommendationsByType } = useAIRecommendations()

  return (
    <AIRecommendations
      userPreferences={{
        budget: 20000,
        destination: 'قسنطينة',
        rating: 4,
        interests: ['تاريخ', 'ثقافة', 'مأكولات'],
        preferredAmenities: ['واي فاي', 'مطعم', 'موقف سيارات']
      }}
      onHotelSelect={(hotel) => {
        window.location.href = `/hotels/${hotel.id}`
      }}
      className="max-w-6xl mx-auto"
    />
  )
}
```

### مثال 2: توصيات حسب النوع
```typescript
async function fetchPopularHotels() {
  const { getRecommendationsByType } = useAIRecommendations()
  
  // جلب الفنادق الشائعة
  await getRecommendationsByType('popular', 'الجزائر', 10)
  
  // جلب الفنادق الفاخرة
  await getRecommendationsByType('luxury', 'وهران', 5)
  
  // جلب الفنادق العائلية
  await getRecommendationsByType('family', 'قسنطينة', 8)
  
  // جلب فنادق الأعمال
  await getRecommendationsByType('business', 'عنابة', 6)
}
```

---

## 🎙️ الإدخال الصوتي

### مثال 1: البحث بالصوت
```typescript
import { useVoiceInput } from '@/hooks/useAI'

function VoiceSearch() {
  const { isListening, transcript, startListening, resetTranscript } = useVoiceInput()

  const handleVoiceSearch = async () => {
    if (!isListening) {
      startListening()
    }
  }

  useEffect(() => {
    if (transcript) {
      // استخدام النتيجة الصوتية في البحث
      searchHotels(transcript)
      resetTranscript()
    }
  }, [transcript])

  return (
    <button 
      onClick={handleVoiceSearch}
      className={isListening ? 'listening' : 'normal'}
    >
      {isListening ? 'استمع...' : '🎙️ بحث صوتي'}
      {transcript && <span>أقول: "{transcript}"</span>}
    </button>
  )
}
```

---

## 🔍 تحسين البحث الذكي

### مثال 1: تحسين استعلام البحث
```typescript
import { useAISearchOptimization } from '@/hooks/useAI'

function SmartSearch() {
  const { 
    isOptimizing, 
    optimization, 
    optimizeSearch, 
    getSuggestions 
  } = useAISearchOptimization()

  const handleSearch = async (query: string) => {
    // تحسين البحث بالذكاء الاصطناعي
    await optimizeSearch(query)
    
    // الحصول على اقتراحات
    const suggestions = await getSuggestions(query)
    
    // استخدام النتائج المحسنة
    setOptimizedQuery(optimization?.optimized || query)
  }

  return (
    <div>
      {optimization && (
        <div className="search-optimization">
          <p><strong>البحث الأصلي:</strong> {optimization.original}</p>
          <p><strong>البحث المحسن:</strong> {optimization.optimized}</p>
          <p><strong>الكلمات المفتاحية:</strong> {optimization.keywords?.join(', ')}</p>
        </div>
      )}
    </div>
  )
}
```

---

## ⭐ تحليل المراجعات

### مثال 1: تحليل جودة المراجعة
```typescript
async function analyzeReview(reviewData: any, hotelId: string) {
  try {
    const response = await fetch('/api/ai/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewData,
        hotelId,
        action: 'analyze'
      })
    })

    const result = await response.json()
    
    if (result.success) {
      console.log('تحليل المراجعة:', result.analysis)
      console.log('الاقتراحات:', result.suggestions)
      console.log('موصى به:', result.recommended)
    }
  } catch (error) {
    console.error('خطأ في تحليل المراجعة:', error)
  }
}

// استخدام التحليل
const review = {
  rating: 4,
  title: 'إقامة ممتازة',
  comment: 'فندق رائع مع خدمة ممتازة ومرافق مميزة'
}

await analyzeReview(review, 'hotel-id')
```

### مثال 2: ملخص مراجعات الفندق
```typescript
async function getHotelReviewSummary(hotelId: string) {
  try {
    const response = await fetch(`/api/ai/reviews?hotelId=${hotelId}`)
    const result = await response.json()
    
    if (result.success) {
      return {
        summary: result.summary,
        statistics: result.statistics,
        averageRating: result.statistics.averageRating,
        totalReviews: result.statistics.totalReviews
      }
    }
  } catch (error) {
    console.error('خطأ في جلب ملخص المراجعات:', error)
  }
}
```

---

## 🧠 الفنادق الذكية

### مثال 1: تحليل الفنادق بالذكاء الاصطناعي
```typescript
import { useSmartHotels } from '@/hooks/useAI'

function SmartHotelList({ hotels, preferences }: any) {
  const { hotels: analyzedHotels, isAnalyzing, analyzeHotels } = useSmartHotels()

  useEffect(() => {
    if (hotels.length > 0) {
      analyzeHotels(hotels, preferences)
    }
  }, [hotels, preferences])

  return (
    <div>
      {isAnalyzing && (
        <div className="analyzing">
          <p>يجري تحليل الفنادق بالذكاء الاصطناعي...</p>
        </div>
      )}
      
      {analyzedHotels.map((hotel, index) => (
        <div key={hotel.id} className="smart-hotel-card">
          <h3>{hotel.name}</h3>
          <p>AI Score: {Math.round(hotel.aiScore)}</p>
          <p>التطابق الشخصي: {Math.round(hotel.personalizedScore)}</p>
          <div className="ai-reasons">
            <h4>لماذا يناسبك:</h4>
            <ul>
              {hotel.aiReasons?.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## 🔧 API Endpoints المباشرة

### مثال 1: استخدام الـ API مباشرة
```typescript
// Chat API
const chatResponse = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'أريد فندقاً في الجزائر بسعر جيد',
    context: {
      currentHotel: null,
      userPreferences: { budget: 15000 }
    }
  })
})

// Recommendations API
const recommendationsResponse = await fetch('/api/ai/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    budget: 15000,
    destination: 'الجزائر',
    rating: 4,
    count: 5
  })
})

// Reviews API
const reviewResponse = await fetch('/api/ai/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'analyze',
    reviewData: {
      rating: 4,
      comment: 'فندق رائع'
    },
    hotelId: 'hotel-id'
  })
})
```

---

## 💡 نصائح للـ Integration

### 1. إدارة الأخطاء
```typescript
try {
  const result = await sendMessage(message, context)
  // معالجة النتيجة
} catch (error) {
  console.error('AI Error:', error)
  // عرض رسالة خطأ للمستخدم
  setError('حدث خطأ في الاتصال بالمساعد الذكي')
}
```

### 2. تحسين الأداء
```typescript
// استخدام memoization لتجنب العمليات المتكررة
const optimizedRecommendations = useMemo(() => 
  getCachedRecommendations(userId), [userId, preferences]
)

// استخدام debounce للبحث
const debouncedSearch = useMemo(
  () => debounce(handleAIQuery, 500),
  []
)
```

### 3. معالجة السياق
```typescript
// حفظ السياق في localStorage
useEffect(() => {
  localStorage.setItem('ai-context', JSON.stringify({
    preferences,
    conversationHistory
  }))
}, [preferences, conversationHistory])

// استرجاع السياق
const savedContext = JSON.parse(localStorage.getItem('ai-context') || '{}')
```

---

## 📊 مراقبة الأداء

### مثال 1: تتبّع استخدام AI
```typescript
// تتبّع استخدام API
useEffect(() => {
  if (aiRequest) {
    trackEvent('ai_api_request', {
      type: aiRequest.type,
      duration: Date.now() - aiRequest.startTime,
      tokensUsed: aiRequest.tokens
    })
  }
}, [aiRequest])

// تتبّع رضا المستخدم
useEffect(() => {
  if (chatMessage) {
    trackEvent('chat_satisfaction', {
      messageLength: chatMessage.content.length,
      intent: chatMessage.intent?.type,
      responseTime: chatMessage.responseTime
    })
  }
}, [chatMessage])
```

---

## 🚀 أمثلة متقدمة

### مثال 1: مساعد حجز ذكي
```typescript
function SmartBookingAssistant({ hotel, room, dates }: any) {
  const { sendMessage } = useAIChat()
  const [bookingContext, setBookingContext] = useState({})

  const handleBookingQuery = async (query: string) => {
    const context = {
      currentHotel: hotel,
      currentRoom: room,
      bookingDates: dates,
      userPreferences: bookingContext
    }

    const response = await sendMessage(query, context)
    
    if (response?.intent?.type === 'booking') {
      // توجيه إلى صفحة الحجز
      navigateToBooking(hotel.id, room.id, dates)
    }
  }

  return (
    <div className="smart-booking-assistant">
      <textarea 
        placeholder="اسأل أي شيء عن الحجز..."
        onChange={(e) => setBookingContext({ ...bookingContext, lastQuery: e.target.value })}
      />
      <button onClick={() => handleBookingQuery(bookingContext.lastQuery)}>
        استشارة المساعد
      </button>
    </div>
  )
}
```

### مثال 2: تحليل محتوى المراجعات
```typescript
function ReviewContentAnalyzer({ reviews }: any) {
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    if (reviews.length > 0) {
      analyzeReviewContent(reviews)
    }
  }, [reviews])

  const analyzeReviewContent = async (reviews: any[]) => {
    for (const review of reviews) {
      const result = await fetch('/api/ai/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          reviewData: review,
          hotelId: review.hotelId
        })
      })

      const data = await result.json()
      if (data.success) {
        // تصنيف المراجعة حسب الجودة
        if (data.analysis.accuracy > 80) {
          markAsVerified(review.id)
        }
        
        // إضافة اقتراحات للتحسين
        if (data.suggestions.length > 0) {
          notifyReviewer(review.userId, data.suggestions)
        }
      }
    }
  }

  return (
    <div className="review-analysis">
      {analysis && (
        <div className="analysis-results">
          <h3>نتائج تحليل المراجعات</h3>
          <p>عدد المراجعات المحللة: {analysis.analyzedCount}</p>
          <p>جودة المحتوى الإجمالية: {analysis.averageQuality}%</p>
        </div>
      )}
    </div>
  )
}
```

---

**ملاحظة**: تذكر أن ChatGPT API له تكلفة استخدام. احرص على مراقبة استهلاكك واستخدام الـ Rate Limiting بشكل مناسب في الإنتاج.
