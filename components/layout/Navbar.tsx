'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const role = (session?.user as any)?.role
  const dashPath = role === 'INVESTOR' ? '/dashboard/investor' : '/dashboard/student'

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/subscriptions', label: 'Plans' },
    { href: '/reviews', label: 'Reviews' },
    ...(role === 'ADMIN' ? [{ href: '/admin', label: 'Admin' }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 bg-bg/95 border-b border-border backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gold-grad rounded-xl flex items-center justify-center font-syne font-extrabold text-sm text-bg">WM</div>
          <span className="font-syne font-bold text-sm hidden sm:block">
            WM <span className="text-gold">Trading</span> Academy
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${pathname === l.href ? 'bg-surface text-white' : 'text-[#8BA3CC] hover:text-white hover:bg-surface'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border hover:border-border-2 transition-all text-sm">
                <div className="w-7 h-7 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-xs text-bg">
                  {session.user?.name?.[0] ?? 'U'}
                </div>
                <span className="text-[#8BA3CC]">{session.user?.name?.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-[#4A6A99]" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 bg-bg-2 border border-border rounded-2xl p-2 shadow-2xl">
                  <div className="px-3 py-2 border-b border-border mb-2">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-[#4A6A99] font-mono-dm">{role}</p>
                  </div>
                  <Link href={dashPath} onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#8BA3CC] hover:bg-surface hover:text-white transition-all">
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-accent-red hover:bg-accent-red/10 transition-all w-full text-left mt-1">
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-outline px-4 py-2 text-sm">Sign In</Link>
              <Link href="/signup" className="btn-gold px-4 py-2 text-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile menu btn */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[#8BA3CC]">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg-2 px-4 py-4 flex flex-col gap-2">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="px-4 py-3 rounded-xl text-sm text-[#8BA3CC] hover:bg-surface hover:text-white transition-all">
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-1 flex flex-col gap-2">
            {session ? (
              <>
                <Link href={dashPath} onClick={() => setMobileOpen(false)} className="btn-outline px-4 py-2.5 text-sm text-center">Dashboard</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn-outline px-4 py-2.5 text-sm text-accent-red border-accent-red/30">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline px-4 py-2.5 text-sm text-center">Sign In</Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="btn-gold px-4 py-2.5 text-sm text-center">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
