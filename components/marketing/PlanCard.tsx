'use client'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { formatNaira } from '@/lib/utils'
import type { Plan } from '@/types'

interface PlanCardProps {
  plan: Plan
  type: 'student' | 'investor'
}

export default function PlanCard({ plan, type }: PlanCardProps) {
  return (
    <div className={`plan-card ${plan.featured ? 'plan-card-featured' : ''}`}>
      {plan.badge && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-grad text-bg text-[11px] font-bold font-mono-dm mb-4">
          {plan.badge}
        </div>
      )}
      <h3 className={`font-syne text-2xl font-extrabold mb-1 ${plan.color}`}>{plan.name}</h3>
      <div className="flex items-baseline gap-1.5 my-5">
        <span className="font-syne text-4xl font-extrabold">{formatNaira(plan.price)}</span>
        <span className="text-[#4A6A99] text-sm">{plan.period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#8BA3CC]">
            <Check size={14} className="text-accent-green mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
        {plan.locked.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#4A6A99]">
            <X size={14} className="text-[#4A6A99] mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={`/subscriptions/checkout?plan=${plan.id}&type=${type}`}
        className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${plan.featured ? 'btn-gold' : 'btn-outline'}`}
      >
        {type === 'student' ? 'Enroll Now' : 'Start Investing'} →
      </Link>
    </div>
  )
}
