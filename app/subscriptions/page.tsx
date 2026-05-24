'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PlanCard from '@/components/marketing/PlanCard'
import { STUDENT_PLANS, INVESTOR_PLANS, formatNaira } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Copy, Building2, CreditCard } from 'lucide-react'

const PAYMENT_CODE = `WM-${Date.now().toString(36).toUpperCase().slice(-4)}`

export default function SubscriptionsPage() {
  const [planType, setPlanType] = useState<'student' | 'investor'>('student')
  const [payMethod, setPayMethod] = useState<'card' | 'bank'>('card')

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      {/* Header */}
      <div className="bg-bg-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="label-mono mb-3">Pricing</div>
          <h1 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Choose your path to<br /><span className="gradient-text-gold">financial freedom</span>
          </h1>
          <p className="text-[#8BA3CC] max-w-lg mx-auto leading-relaxed">
            Whether you want to learn trading or grow your money passively — we have the right plan for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-bg-2 border border-border rounded-2xl p-1.5 gap-1">
            {[
              { id: 'student', label: '🎓 Student Plans', sub: 'Learn to trade' },
              { id: 'investor', label: '💼 Investor Plans', sub: 'Managed trading' },
            ].map(t => (
              <button key={t.id} onClick={() => setPlanType(t.id as any)}
                className={`px-6 py-3 rounded-xl transition-all text-sm flex flex-col items-center ${planType === t.id ? 'bg-surface text-white font-semibold' : 'text-[#8BA3CC] hover:text-white'}`}>
                <span>{t.label}</span>
                <span className="text-[10px] font-mono-dm text-[#4A6A99] mt-0.5">{t.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {(planType === 'student' ? STUDENT_PLANS : INVESTOR_PLANS).map(plan => (
            <PlanCard key={plan.id} plan={plan} type={planType} />
          ))}
        </div>

        {/* Payment section */}
        <div id="payment" className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-syne text-3xl font-extrabold mb-3">Payment Options</h2>
            <p className="text-[#8BA3CC]">Choose your preferred payment method below</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Payment */}
            <div onClick={() => setPayMethod('card')}
              className={`card-dark p-6 cursor-pointer transition-all ${payMethod === 'card' ? 'border-gold' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-accent-cyan/10 rounded-xl flex items-center justify-center"><CreditCard size={20} className="text-accent-cyan"/></div>
                <div>
                  <h3 className="font-syne font-bold text-sm">Card Payment</h3>
                  <p className="text-[11px] text-[#4A6A99] font-mono-dm">Stripe · Instant activation</p>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'card' ? 'border-gold' : 'border-border-2'}`}>
                  {payMethod === 'card' && <div className="w-2 h-2 rounded-full bg-gold"/>}
                </div>
              </div>
              <p className="text-[#8BA3CC] text-sm leading-relaxed mb-5">Pay securely via debit/credit card. Your account is activated instantly after successful payment.</p>
              <button onClick={() => toast.success('Redirecting to Stripe...')} className="btn-gold w-full py-3 text-sm rounded-xl">
                Pay with Card →
              </button>
            </div>

            {/* Bank Transfer */}
            <div onClick={() => setPayMethod('bank')}
              className={`card-dark p-6 cursor-pointer transition-all ${payMethod === 'bank' ? 'border-gold' : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gold/10 rounded-xl flex items-center justify-center"><Building2 size={20} className="text-gold"/></div>
                <div>
                  <h3 className="font-syne font-bold text-sm">Bank Transfer</h3>
                  <p className="text-[11px] text-[#4A6A99] font-mono-dm">Manual · Verified in 2–4 hrs</p>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'bank' ? 'border-gold' : 'border-border-2'}`}>
                  {payMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-gold"/>}
                </div>
              </div>
              <div className="bg-bg border border-border rounded-xl p-4 space-y-3 mb-4">
                {[
                  { key: 'Bank', val: 'GTBank' },
                  { key: 'Account Name', val: 'WM Trading Academy Ltd' },
                  { key: 'Account Number', val: '0123456789', copy: true },
                  { key: 'Payment Code', val: PAYMENT_CODE, copy: true, highlight: true },
                ].map(row => (
                  <div key={row.key} className="flex justify-between items-center">
                    <span className="font-mono-dm text-[11px] text-[#4A6A99]">{row.key}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-mono-dm text-xs ${row.highlight ? 'text-gold font-bold' : 'text-white'}`}>{row.val}</span>
                      {row.copy && (
                        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(row.val, row.key) }}
                          className="p-1 rounded-md bg-surface hover:bg-border transition-colors">
                          <Copy size={11} className="text-[#4A6A99]"/>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#4A6A99] font-mono-dm bg-gold/5 border border-gold/20 rounded-lg p-3">
                ⚠ Include the payment code in your transfer description for instant verification by our team.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="font-syne text-2xl font-extrabold text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Can I switch plans later?', a: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the end of your billing cycle.' },
              { q: 'How long does bank transfer verification take?', a: 'Bank transfers are typically verified within 2–4 hours during business hours. You\'ll receive an email confirmation once verified.' },
              { q: 'Is my investment safe?', a: 'We employ strict risk management protocols. Investor funds are managed by certified traders with transparent reporting. Past performance is disclosed in your dashboard.' },
              { q: 'Can I withdraw my investment anytime?', a: 'Premium and VIP investors can request withdrawals with a 48-hour processing window. Basic investors follow a 7-day processing cycle.' },
            ].map(faq => (
              <div key={faq.q} className="card-dark p-5">
                <h4 className="font-syne font-bold text-sm mb-2">{faq.q}</h4>
                <p className="text-[#8BA3CC] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
