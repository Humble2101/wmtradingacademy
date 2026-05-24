import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function generatePaymentCode(): string {
  return `WM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export const STUDENT_PLANS = [
  {
    id: 'STUDENT_BASIC',
    name: 'Basic',
    price: 5000,
    period: '/month',
    features: [
      '5 Core courses',
      'Community access',
      'Weekly live sessions',
      'Basic market updates',
    ],
    locked: ['1-on-1 mentorship', 'Advanced strategies', 'Priority support'],
    color: 'text-white',
    featured: false,
  },
  {
    id: 'STUDENT_PREMIUM',
    name: 'Premium',
    price: 15000,
    period: '/month',
    features: [
      'All 30+ courses',
      'Community access',
      'Daily live sessions',
      'Advanced market analysis',
      'Certificate of completion',
    ],
    locked: ['1-on-1 mentorship'],
    color: 'text-gold',
    featured: true,
    badge: 'Most Popular',
  },
  {
    id: 'STUDENT_VIP',
    name: 'VIP',
    price: 35000,
    period: '/month',
    features: [
      'Unlimited courses',
      'VIP community access',
      'Daily live + replay',
      'Full market analysis suite',
      '1-on-1 mentorship sessions',
      'Direct WhatsApp support',
      'Priority event access',
    ],
    locked: [],
    color: 'text-accent-cyan',
    featured: false,
  },
]

export const INVESTOR_PLANS = [
  {
    id: 'INVESTOR_BASIC',
    name: 'Basic',
    price: 50000,
    period: 'min. investment',
    features: [
      'Portfolio management',
      'Monthly reports',
      '3–5% monthly ROI target',
      'Medium risk level',
      'Email support',
    ],
    locked: ['Personal account manager', 'Weekly reports', 'Priority withdrawals'],
    color: 'text-white',
    featured: false,
  },
  {
    id: 'INVESTOR_PREMIUM',
    name: 'Premium',
    price: 200000,
    period: 'min. investment',
    features: [
      'Priority portfolio management',
      'Weekly reports',
      '5–8% monthly ROI target',
      'Controlled risk level',
      'ROI tracking dashboard',
      'Phone & chat support',
    ],
    locked: ['Personal account manager'],
    color: 'text-gold',
    featured: true,
    badge: 'Best Value',
  },
  {
    id: 'INVESTOR_VIP',
    name: 'VIP',
    price: 500000,
    period: 'min. investment',
    features: [
      'Dedicated fund management',
      'Daily reports & analytics',
      '8–12% monthly ROI target',
      'Low risk configuration',
      'Full ROI dashboard',
      'Personal account manager',
      'Priority withdrawals',
      '24/7 VIP support',
    ],
    locked: [],
    color: 'text-accent-cyan',
    featured: false,
  },
]

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
