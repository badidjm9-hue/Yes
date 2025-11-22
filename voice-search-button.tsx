"use client"

import { useState } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoiceSearchButtonProps {
  onResult: (text: string) => void
  placeholder?: string
}

export function VoiceSearchButton({ onResult, placeholder }: VoiceSearchButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  // Check if Web Speech API is supported
  useState(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsSupported(!!SpeechRecognition)
  })

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'ar-SA' // Arabic
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  if (!isSupported) return null

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={startListening}
      className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${
        isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'
      }`}
      title={isListening ? 'يتحدث...' : 'بحث صوتي'}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  )
}