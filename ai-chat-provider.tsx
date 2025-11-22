"use client"

import { createContext, useContext, useState } from 'react'

interface ChatMessage {
  id: string
  message: string
  sender: 'user' | 'bot'
  timestamp: Date
  language: 'ar' | 'fr' | 'en'
}

interface AIChatContextType {
  messages: ChatMessage[]
  isOpen: boolean
  sendMessage: (message: string, language?: 'ar' | 'fr' | 'en') => void
  toggleChat: () => void
}

const AIChatContext = createContext<AIChatContextType | null>(null)

export function useAIChat() {
  const context = useContext(AIChatContext)
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider')
  }
  return context
}

interface AIChatProviderProps {
  children: React.ReactNode
}

export function AIChatProvider({ children }: AIChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'مرحباً! أنا مساعد Volo الذكي. كيف يمكنني مساعدتك في حجز فندقك المثالي؟',
      sender: 'bot',
      timestamp: new Date(),
      language: 'ar'
    }
  ])
  const [isOpen, setIsOpen] = useState(false)

  const sendMessage = (message: string, language: 'ar' | 'fr' | 'en' = 'ar') => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      sender: 'user',
      timestamp: new Date(),
      language
    }

    setMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'شكراً لسؤالك! سأقوم بالبحث عن أفضل الخيارات المتاحة لك.',
        sender: 'bot',
        timestamp: new Date(),
        language
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const toggleChat = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <AIChatContext.Provider value={{ messages, isOpen, sendMessage, toggleChat }}>
      {children}
    </AIChatContext.Provider>
  )
}