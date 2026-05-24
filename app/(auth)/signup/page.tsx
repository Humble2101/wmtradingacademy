'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'STUDENT' | 'INVESTOR'>('STUDENT')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Account created! Welcome to WM Trading Academy 🎉')
      router.push('/login')
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gold-grad rounded-2xl flex items-center justify-center font-syne font-extrabold text-xl text-bg mx-auto mb-4">WM</div>
            <h1 className="font-syne text-3xl font-extrabold">Create account</h1>
            <p className="text-[#8BA3CC] text-sm mt-1">Start your crypto journey with WM Trading Academy</p>
          </div>

          <div className="card-dark p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Full Name</label>
                <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-dark" placeholder="John Doe" />
              </div>
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-dark" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Password</label>
                <input type="password" required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="input-dark" placeholder="Min. 8 characters" />
              </div>
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Confirm Password</label>
                <input type="password" required value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} className="input-dark" placeholder="Repeat password" />
              </div>

              {/* Role selection */}
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-3">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'STUDENT', icon: '🎓', label: 'Learn', sub: 'Student / Trader' },
                    { val: 'INVESTOR', icon: '💼', label: 'Invest', sub: 'Managed Portfolio' },
                  ].map(opt => (
                    <button
                      key={opt.val} type="button"
                      onClick={() => setRole(opt.val as any)}
                      className={`p-4 rounded-xl border text-center transition-all ${role === opt.val ? 'border-gold bg-gold/8' : 'border-border hover:border-border-2'}`}
                    >
                      <div className="text-2xl mb-1">{opt.icon}</div>
                      <div className="font-syne font-bold text-sm">{opt.label}</div>
                      <div className="text-[11px] text-[#4A6A99]">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-sm rounded-xl disabled:opacity-60">
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[#4A6A99] text-xs">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <p className="text-center text-sm text-[#8BA3CC]">
              Already have an account? <Link href="/login" className="text-gold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
