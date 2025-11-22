"use client"

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
        },
        success: {
          iconTheme: {
            primary: '#30A46C',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#F03E3E',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}