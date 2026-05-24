'use client'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#162850', color: '#F0F4FF', border: '1px solid #2A4E8A', borderRadius: '12px', fontSize: '13px' },
          success: { iconTheme: { primary: '#00E676', secondary: '#162850' } },
          error: { iconTheme: { primary: '#FF5252', secondary: '#162850' } },
        }}
      />
    </SessionProvider>
  )
}
