'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'
import { STUDENT_PLANS, INVESTOR_PLANS, formatNaira } from '@/lib/utils'
import { Copy, CreditCard, Building2, CheckCircle, Loader2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Plan } from '@/types'

const GENERATED_CODE = `WM-${Date.now().toString(36).toUpperCase().slice(-6)}`

function CheckoutPageInner() {
  const router = useRouter()
  const params = useSearchParams()
  const { data: session, status } = useSession()

  const planId = params.get('plan') || ''
  const type = (params.get('type') || 'student') as 'student' | 'investor'

  const allPlans = [...STUDENT_PLANS, ...INVESTOR_PLANS]
  const plan: Plan | undefined = allPlans.find((p) => p.id === planId)

  const [payMethod, setPayMethod] = useState<'card' | 'bank'>('card')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [payCode] = useState(GENERATED_CODE)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?redirect=/subscriptions')
  }, [status, router])

  if (!plan) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#8BA3CC] mb-4">Invalid plan selected.</p>
            <Link href="/subscriptions" className="btn-gold px-6 py-3 rounded-xl text-sm">
              Browse Plans
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleCardPay = async () => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      toast.success('Redirecting to Stripe checkout...')
    } catch {
      toast.error('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBankConfirm = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: plan.id, method: 'BANK_TRANSFER' }),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      toast.success('Transfer request recorded! Activation within 2–4 hours.')
    } catch {
      toast.error('Could not record your payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val)
    toast.success(`${label} copied!`)
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-bg">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="card-dark p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-accent-green" />
            </div>
            <h2 className="font-syne text-2xl font-extrabold mb-2">Payment Recorded!</h2>
            <p className="text-[#8BA3CC] text-sm leading-relaxed mb-8">
              Your bank transfer has been logged. Our team will verify and activate your{' '}
              <strong className="text-white">{plan.name}</strong> plan within{' '}
              <strong className="text-gold">2–4 hours</strong>. You'll receive a confirmation
              notification.
            </p>
            <div className="bg-bg border border-border rounded-xl p-4 mb-8 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#4A6A99] font-mono-dm text-xs">Plan</span>
                <span>
                  {plan.name} ({type})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4A6A99] font-mono-dm text-xs">Amount</span>
                <span className="text-gold font-bold">{formatNaira(plan.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#4A6A99] font-mono-dm text-xs">Payment Code</span>
                <span className="font-mono-dm text-xs">{payCode}</span>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="btn-gold w-full py-3.5 text-sm rounded-xl block text-center"
            >
              Go to Dashboard →
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <Link
          href="/subscriptions"
          className="inline-flex items-center gap-1.5 text-sm text-[#8BA3CC] hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft size={15} /> Back to Plans
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card-dark p-6 sticky top-24">
              <h2 className="font-syne font-bold text-lg mb-5">Order Summary</h2>
              <div
                className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono-dm font-bold mb-3 ${plan.featured ? 'bg-gold-grad text-bg' : 'bg-surface text-[#8BA3CC]'}`}
              >
                {type === 'student' ? '🎓 Student Plan' : '💼 Investor Plan'}
              </div>
              <h3 className={`font-syne text-2xl font-extrabold mb-1 ${plan.color}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1.5 my-4 pb-4 border-b border-border">
                <span className="font-syne text-3xl font-extrabold">{formatNaira(plan.price)}</span>
                <span className="text-[#4A6A99] text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#8BA3CC]">
                    <span className="text-accent-green mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-3 bg-gold/5 border border-gold/20 rounded-xl">
                <p className="text-[11px] text-gold font-mono-dm">
                  🔒 Secure checkout · SSL encrypted
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-syne text-2xl font-extrabold">Complete Payment</h2>
            <p className="text-[#8BA3CC] text-sm">
              Choose how you'd like to pay for your {plan.name} plan.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  id: 'card',
                  icon: <CreditCard size={20} className="text-accent-cyan" />,
                  bg: 'bg-accent-cyan/10',
                  label: 'Card Payment',
                  sub: 'Stripe · Instant',
                },
                {
                  id: 'bank',
                  icon: <Building2 size={20} className="text-gold" />,
                  bg: 'bg-gold/10',
                  label: 'Bank Transfer',
                  sub: 'Manual · 2–4 hrs',
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id as any)}
                  className={`card-dark p-4 text-left transition-all ${payMethod === m.id ? 'border-gold' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 ${m.bg} rounded-xl flex items-center justify-center`}
                    >
                      {m.icon}
                    </div>
                    <div
                      className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === m.id ? 'border-gold' : 'border-border-2'}`}
                    >
                      {payMethod === m.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                    </div>
                  </div>
                  <p className="font-syne font-bold text-sm">{m.label}</p>
                  <p className="text-[11px] text-[#4A6A99] font-mono-dm">{m.sub}</p>
                </button>
              ))}
            </div>

            {payMethod === 'card' && (
              <div className="card-dark p-6 space-y-4">
                <h3 className="font-syne font-bold">Card Details</h3>
                <div>
                  <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">
                    Card Number
                  </label>
                  <input
                    className="input-dark"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value
                        .replace(/\D/g, '')
                        .replace(/(\d{4})/g, '$1 ')
                        .trim()
                      e.target.value = v
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">
                      Expiry
                    </label>
                    <input className="input-dark" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div>
                    <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">
                      CVV
                    </label>
                    <input className="input-dark" placeholder="•••" maxLength={4} />
                  </div>
                </div>
                <div>
                  <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">
                    Cardholder Name
                  </label>
                  <input className="input-dark" placeholder="Full name on card" />
                </div>
                <button
                  onClick={handleCardPay}
                  disabled={loading}
                  className="btn-gold w-full py-4 text-sm rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    `Pay ${formatNaira(plan.price)} →`
                  )}
                </button>
              </div>
            )}

            {payMethod === 'bank' && (
              <div className="card-dark p-6 space-y-5">
                <h3 className="font-syne font-bold">Bank Transfer Details</h3>
                <p className="text-[#8BA3CC] text-sm">
                  Transfer exactly <strong className="text-gold">{formatNaira(plan.price)}</strong>{' '}
                  to the account below, then click "I've Sent Payment".
                </p>
                <div className="bg-bg border border-border rounded-xl p-5 space-y-3.5">
                  {[
                    { k: 'Bank Name', v: 'GTBank' },
                    { k: 'Account Name', v: 'WM Trading Academy Ltd' },
                    { k: 'Account Number', v: '0123456789', copy: true },
                    { k: 'Amount', v: formatNaira(plan.price), highlight: true },
                    { k: 'Payment Code', v: payCode, copy: true, highlight: true },
                  ].map((row) => (
                    <div key={row.k} className="flex justify-between items-center">
                      <span className="font-mono-dm text-[11px] text-[#4A6A99]">{row.k}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono-dm text-xs ${row.highlight ? 'text-gold font-bold' : 'text-white'}`}
                        >
                          {row.v}
                        </span>
                        {row.copy && (
                          <button
                            onClick={() => copy(row.v, row.k)}
                            className="p-1.5 rounded-lg bg-surface hover:bg-border-2 transition-colors"
                          >
                            <Copy size={11} className="text-[#8BA3CC]" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
                  <p className="text-[11px] text-gold font-mono-dm leading-relaxed">
                    ⚠ <strong>Important:</strong> You MUST include the Payment Code (
                    <strong>{payCode}</strong>) in the "Narration" or "Description" field of your
                    bank transfer.
                  </p>
                </div>
                <button
                  onClick={handleBankConfirm}
                  disabled={loading}
                  className="btn-gold w-full py-4 text-sm rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Recording...
                    </>
                  ) : (
                    "I've Sent the Payment →"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <div className="text-[#8BA3CC]">Loading...</div>
        </div>
      }
    >
      <CheckoutPageInner />
    </Suspense>
  )
}
