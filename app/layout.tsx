import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'WM Trading Academy — Let\'s Talk Crypto 6.0',
  description: 'Nigeria\'s premier crypto trading education and managed investment platform. Join 4,200+ traders already winning.',
  keywords: ['crypto trading', 'Nigeria', 'WM Trading Academy', 'investment', 'blockchain'],
  openGraph: {
    title: 'WM Trading Academy',
    description: 'Trade Smarter. Grow Faster. Win Bigger.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
