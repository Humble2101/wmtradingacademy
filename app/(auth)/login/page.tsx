'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', { ...form, redirect: false })
      if (res?.error) {
        toast.error('Invalid email or password')
      } else {
        toast.success('Welcome back! 🎉')
        router.push('/dashboard/student')
        router.refresh()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Logo mark */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gold-grad rounded-2xl flex items-center justify-center font-syne font-extrabold text-xl text-bg mx-auto mb-4">WM</div>
            <h1 className="font-syne text-3xl font-extrabold">Welcome back</h1>
            <p className="text-[#8BA3CC] text-sm mt-1">Sign in to your WM Trading Academy account</p>
          </div>

          <div className="card-dark p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Email Address</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="input-dark"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase">Password</label>
                  <Link href="#" className="text-xs text-gold hover:underline">Forgot password?</Link>
                </div>
                <input
                  type="password" required
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="input-dark"
                  placeholder="••••••••••"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="btn-gold w-full py-3.5 text-sm rounded-xl mt-2 disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[#4A6A99] text-xs">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-center text-sm text-[#8BA3CC]">
              No account yet?{' '}
              <Link href="/signup" className="text-gold hover:underline">Sign up free</Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <p className="font-mono-dm text-[11px] text-gold uppercase tracking-widest mb-2">Demo Credentials</p>
            <p className="text-xs text-[#8BA3CC]">Student: student@demo.com / demo1234</p>
            <p className="text-xs text-[#8BA3CC]">Investor: investor@demo.com / demo1234</p>
            <p className="text-xs text-[#8BA3CC]">Admin: admin@demo.com / demo1234</p>
          </div>
        </div>
      </div>
    </div>
  )
}
