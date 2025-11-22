import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required for OpenAI integration')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai

// نظام التوصيات الذكي
export class AIRecommendationEngine {
  static async getPersonalizedRecommendations(userPreferences: {
    budget?: number
    destination?: string
    travelDates?: string[]
    interests?: string[]
    previousBookings?: any[]
    preferredAmenities?: string[]
    rating?: number
  }) {
    try {
      const prompt = `
أنت مساعد ذكي متخصص في فنادق الجزائر. قدم توصيات مخصصة بناءً على تفضيلات المستخدم:

التفضيلات:
- الميزانية: ${userPreferences.budget || 'غير محدد'} DZD
- الوجهة: ${userPreferences.destination || 'غير محدد'}
- التواريخ: ${userPreferences.travelDates?.join(', ') || 'غير محدد'}
- الاهتمامات: ${userPreferences.interests?.join(', ') || 'غير محدد'}
- التقييم المطلوب: ${userPreferences.rating || 'غير محدد'} نجوم
- المرافق المفضلة: ${userPreferences.preferredAmenities?.join(', ') || 'غير محدد'}

قدم رداً باللغة العربية يحتوي على:
1. توصيات مناسبة للفنادق (3-5 فنادق)
2. شرح موجز لكل توصية
3. نصائح مفيدة للسفر
4. بدائل للخيارات المحدودة

استخدم تنسيق JSON للبيانات الهيكلية مع نص ودود للمستخدم.
`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "أنت مساعد سفر ذكي ومتخصص في فنادق الجزائر. تقدم توصيات مخصصة وتجيب باللغة العربية."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      })

      const recommendation = completion.choices[0].message.content
      return { success: true, recommendation }
    } catch (error) {
      console.error('AI Recommendation Error:', error)
      return { 
        success: false, 
        error: 'فشل في إنشاء التوصيات. يرجى المحاولة مرة أخرى.',
        fallback: await this.getDefaultRecommendations()
      }
    }
  }

  static async getDefaultRecommendations() {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "أنت مساعد سفر ذكي. قدم توصيات عامة لفنادق الجزائر."
          },
          {
            role: "user",
            content: "قدم توصيات لافضل الفنادق في الجزائر مع نصائح للسفر"
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
      })

      return completion.choices[0].message.content
    } catch (error) {
      return "يُنصح بزيارة الجزائر العاصمة ووهران وقسنطينة. استكشف المدن التاريخية والاستمتاع بالمأكولات المحلية."
    }
  }

  static async analyzeSentiment(text: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "حلل المشاعر في النص العربي. أجب بنتيجة موجزة: إيجابي، سلبي، أو محايد."
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 100,
        temperature: 0.3,
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Sentiment Analysis Error:', error)
      return "محايد"
    }
  }

  static async optimizeSearchQuery(userInput: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "حسن العبارة العربية للبحث عن الفنادق. استخرج الكلمات المفتاحية المهمة."
          },
          {
            role: "user",
            content: `حسن هذا البحث: "${userInput}"`
          }
        ],
        max_tokens: 200,
        temperature: 0.5,
      })

      return completion.choices[0].message.content
    } catch (error) {
      return userInput // fallback to original
    }
  }
}

// نظام المساعد الذكي للمحادثة
export class AIChatAssistant {
  static async processMessage(userMessage: string, context?: {
    currentHotel?: any
    userPreferences?: any
    conversationHistory?: Array<{role: string, content: string}>
  }) {
    try {
      const systemPrompt = `
أنت مساعد ذكي لمنصة فولو لحجز الفنادق في الجزائر. مساعدتك تشمل:

1. البحث عن الفنادق المناسبة
2. تقديم معلومات حول الفنادق والخدمات
3. الإجابة على أسئلة الحجز
4. تقديم نصائح السفر
5. مساعدتك في اختيار المرافق والخدمات

استخدم اللغة العربية دائماً وتحدث بأسلوب ودود ومهني.

${context?.currentHotel ? `الفندق الحالي المشاهد: ${context.currentHotel.name}` : ''}
${context?.userPreferences ? `تفضيلات المستخدم: ${JSON.stringify(context.userPreferences, null, 2)}` : ''}
`

      const messages = [
        { role: "system", content: systemPrompt }
      ]

      // إضافة تاريخ المحادثة إذا وُجد
      if (context?.conversationHistory) {
        messages.push(...context.conversationHistory)
      }

      messages.push({ role: "user", content: userMessage })

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 800,
        temperature: 0.7,
      })

      const response = completion.choices[0].message.content

      // تحليل المحتوى لفهم النوايا
      const intent = await this.analyzeIntent(userMessage)

      return {
        success: true,
        response,
        intent,
        suggestions: await this.generateSuggestions(intent, userMessage)
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      return {
        success: false,
        response: "عذراً، حدث خطأ تقني. يرجى المحاولة مرة أخرى أو استخدام البحث اليدوي.",
        intent: { type: "error", confidence: 1.0 },
        suggestions: ["جرب البحث مرة أخرى", "تحدث مع فريق الدعم"]
      }
    }
  }

  static async analyzeIntent(message: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "صنف نية الرسالة العربية إلى واحدة من هذه الفئات: search, booking, info, help, complaint, review, general. أجب بكلمة واحدة فقط."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 10,
        temperature: 0.3,
      })

      const intent = completion.choices[0].message.content?.toLowerCase() || "general"
      
      return {
        type: intent,
        confidence: 0.9,
        keywords: await this.extractKeywords(message)
      }
    } catch (error) {
      return {
        type: "general",
        confidence: 0.5,
        keywords: message.split(" ")
      }
    }
  }

  static async extractKeywords(text: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "استخرج الكلمات المفتاحية من النص العربي للبحث عن الفنادق. أجب بأسماء مفصولة بفواصل."
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 100,
        temperature: 0.3,
      })

      return completion.choices[0].message.content?.split(',').map(k => k.trim()) || []
    } catch (error) {
      return text.split(" ").filter(word => word.length > 2)
    }
  }

  static async generateSuggestions(intent: any, message: string) {
    const suggestions = {
      search: ["ابحث عن فندق في الجزائر", "ابحث عن فنادق فاخرة", "فندقي قرب المركز"],
      booking: ["احجز غرفة", "تحقق من التوفر", "أسعار الأسبوع القادم"],
      info: ["معلومات حول الفندق", "قائمة المرافق", "سياسات الفندق"],
      help: ["كيفية الحجز", "طرق الدفع", "سياسة الإلغاء"],
      complaint: ["تواصل مع الدعم", "قدم شكوى", "المشاكل التقنية"],
      review: ["قيم الفندق", "اطلب مراجعة", "اكتب تقييم"],
      general: ["ما هي فنادقك المفضلة؟", "ساعدني في الاختيار", "نصائح للسفر"]
    }

    return suggestions[intent.type] || suggestions.general
  }
}

// تحسين الصور باستخدام DALL-E
export class AIImageGenerator {
  static async generateHotelDescription(imageUrl: string) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "صف هذه الصورة لغرفة فندق أو مطعم بالتفصيل. اذكر المرافق والديكور والأثاث."
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 200,
        temperature: 0.6,
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Image Analysis Error:', error)
      return "صورة لغرفة فندق مريحة مع ديكور عصري."
    }
  }
}

// تحليل المراجعات والمراقبة
export class AIReviewAnalyzer {
  static async analyzeReviewQuality(review: {
    rating: number
    comment: string
    title?: string
    images?: string[]
  }) {
    try {
      const prompt = `
حلل جودة هذه المراجعة لفندق:

التقييم: ${review.rating}/5 نجوم
العنوان: ${review.title || 'غير محدد'}
التعليق: ${review.comment}

قدم تحليل يشمل:
1. مدى تطابق التقييم مع المحتوى (0-100%)
2. جودة المحتوى (1-10)
3. مدى فائدة المراجعة للآخرين (1-10)
4. إذا كانت تحتوي على محتوى غير مناسب

أجب بصيغة JSON فقط.
`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "أنت خبير في تحليل جودة مراجعات الفنادق. قدم تحليلاً موضوعياً ودقيقاً."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.4,
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Review Analysis Error:', error)
      return JSON.stringify({
        accuracy: 85,
        quality: 7,
        usefulness: 6,
        appropriate: true
      })
    }
  }

  static async generateSmartSummary(hotelId: string, reviews: any[]) {
    try {
      const reviewsText = reviews.map((r, i) => 
        `${i+1}. التقييم: ${r.rating}/5 - ${r.comment?.substring(0, 200)}...`
      ).join('\n')

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "اكتب ملخص ذكي للمراجعات العربية لفندق. ركز على النقاط الإيجابية والسلبية والمميزات الرئيسية."
          },
          {
            role: "user",
            content: `مراجعات الفندق:\n${reviewsText}`
          }
        ],
        max_tokens: 400,
        temperature: 0.6,
      })

      return completion.choices[0].message.content
    } catch (error) {
      return "فندق مميز مع خدمات جيدة ومرافق متنوعة. يحظي بتقييمات إيجابية من النزلاء."
    }
  }
}
