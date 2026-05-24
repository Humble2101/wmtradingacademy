'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { LayoutDashboard, BookOpen, TrendingUp, CreditCard, Star, LogOut, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const studyData = [
  { day: 'Mon', hours: 2 }, { day: 'Tue', hours: 4 }, { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 3 }, { day: 'Fri', hours: 5 }, { day: 'Sat', hours: 2.5 }, { day: 'Sun', hours: 3.5 },
]

const courses = [
  { title: 'Crypto Market Fundamentals', progress: 67, lessons: '12/18', status: 'In Progress', statusColor: 'tag-gold' },
  { title: 'Advanced Technical Analysis', progress: 12, lessons: '3/24', status: 'New', statusColor: 'tag-blue' },
  { title: 'DeFi & Yield Strategies', progress: 100, lessons: '16/16', status: 'Completed', statusColor: 'tag-green' },
  { title: 'Risk Management Masterclass', progress: 45, lessons: '9/20', status: 'In Progress', statusColor: 'tag-gold' },
]

const activity = [
  { action: 'Completed Lesson 12 — Market Cycles', time: '2h ago' },
  { action: 'Joined Live Session: Altcoin Season', time: 'Yesterday' },
  { action: 'Quiz Score: 92% — TA Module', time: '2 days ago' },
  { action: 'Unlocked DeFi Certificate', time: '3 days ago' },
  { action: 'Posted in Community Forum', time: '5 days ago' },
]

interface Props {
  user: { name?: string | null; email?: string | null; role?: string }
}

export default function StudentDashboardClient({ user }: Props) {
  const [activeTab, setActiveTab] = useState('overview')

  const initials = user.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'U'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-xl px-3 py-2 text-xs">
          <p className="text-[#8BA3CC]">{label}</p>
          <p className="text-gold font-bold">{payload[0].value}h studied</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-60 flex-col bg-bg-2 border-r border-border p-4 sticky top-16 h-[calc(100vh-64px)]">
          <div className="flex items-center gap-3 p-3 mb-4 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-sm text-bg">{initials}</div>
            <div>
              <p className="text-sm font-semibold truncate max-w-[120px]">{user.name}</p>
              <p className="text-[11px] text-[#4A6A99] font-mono-dm">Student · VIP</p>
            </div>
          </div>
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mb-2">Learning</p>
          {[
            { id: 'overview', icon: <LayoutDashboard size={15}/>, label: 'Overview' },
            { id: 'courses', icon: <BookOpen size={15}/>, label: 'My Courses' },
            { id: 'progress', icon: <TrendingUp size={15}/>, label: 'Progress' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`sidebar-item ${activeTab === item.id ? 'sidebar-item-active' : ''}`}>
              {item.icon} {item.label}
            </button>
          ))}
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mt-4 mb-2">Account</p>
          <Link href="/subscriptions" className="sidebar-item"><CreditCard size={15}/> Subscription</Link>
          <Link href="/reviews" className="sidebar-item"><Star size={15}/> Reviews</Link>
          <div className="mt-auto pt-4 border-t border-border">
            <Link href="/dashboard/investor" className="sidebar-item text-accent-cyan"><TrendingUp size={15}/> Switch to Investor</Link>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="sidebar-item text-accent-red mt-1"><LogOut size={15}/> Sign Out</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-syne text-2xl font-extrabold">Student Dashboard</h1>
              <p className="text-[#8BA3CC] text-sm mt-1">Welcome back, {user.name?.split(' ')[0]} · Let&apos;s continue learning</p>
            </div>
            <Link href="/subscriptions" className="btn-gold px-4 py-2.5 text-sm rounded-xl">Upgrade Plan</Link>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Courses Enrolled', value: '7', change: '↑ 2 this month', up: true },
              { label: 'Lessons Completed', value: '43', change: '↑ 12 this week', up: true },
              { label: 'Hours Studied', value: '28h', change: '↑ 4h today', up: true },
              { label: 'Study Streak', value: '🔥 14', change: 'days in a row', up: null },
            ].map(m => (
              <div key={m.label} className="metric-card">
                <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase mb-1">{m.label}</p>
                <p className="font-syne text-2xl font-extrabold mt-1">{m.value}</p>
                <p className={`text-[11px] font-mono-dm mt-1 ${m.up === true ? 'text-accent-green' : m.up === false ? 'text-accent-red' : 'text-[#4A6A99]'}`}>{m.change}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="card-dark p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold">Weekly Study Activity</h2>
              <div className="flex gap-1">
                {['7D', '30D', '3M'].map(p => (
                  <button key={p} className={`px-3 py-1 rounded-full text-[11px] font-mono-dm border transition-all ${p === '7D' ? 'bg-gold/15 border-gold/40 text-gold' : 'border-border text-[#4A6A99] hover:border-border-2'}`}>{p}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A6A" />
                <XAxis dataKey="day" tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}h`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="hours" fill="#F5A623" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Courses + Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="font-syne font-bold mb-4">Active Courses</h2>
              <div className="space-y-3">
                {courses.map(c => (
                  <div key={c.title} className="card-dark p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-semibold flex-1 mr-3">{c.title}</p>
                      <span className={`tag ${c.statusColor} flex-shrink-0`}>{c.status}</span>
                    </div>
                    <p className="font-mono-dm text-[11px] text-[#4A6A99] mb-2">{c.lessons} lessons</p>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.progress}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-syne font-bold mb-4">Recent Activity</h2>
              <div className="card-dark overflow-hidden">
                {activity.map((a, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-3.5 text-sm ${i < activity.length - 1 ? 'border-b border-border/60' : ''}`}>
                    <span className="text-[#8BA3CC] flex-1 mr-4">{a.action}</span>
                    <span className="text-[#4A6A99] font-mono-dm text-[11px] flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
              <Link href="/subscriptions" className="flex items-center justify-center gap-2 mt-4 p-3 bg-gold/8 border border-gold/20 rounded-xl text-sm text-gold hover:bg-gold/12 transition-all">
                <span>Upgrade to VIP for 1-on-1 Mentorship</span>
                <ChevronRight size={14}/>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
