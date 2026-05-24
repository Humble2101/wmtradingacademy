'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import toast from 'react-hot-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, DollarSign, Clock, TrendingUp, CheckCircle, XCircle, BarChart2, BookOpen, Bell, Star, LogOut } from 'lucide-react'
import { formatNaira } from '@/lib/utils'

const revenueData = [
  { month: 'Dec', students: 1200000, investors: 2100000 },
  { month: 'Jan', students: 1450000, investors: 2400000 },
  { month: 'Feb', students: 1800000, investors: 2900000 },
  { month: 'Mar', students: 2100000, investors: 3200000 },
  { month: 'Apr', students: 2400000, investors: 3800000 },
  { month: 'May', students: 2800000, investors: 5600000 },
]

const pendingPayments = [
  { id: '1', user: 'Chidi Okafor', amount: 50000, code: 'WM-8821', plan: 'Student VIP', date: '22 May 2026', status: 'pending' },
  { id: '2', user: 'Ngozi Adaeze', amount: 120000, code: 'WM-8822', plan: 'Investor Basic', date: '22 May 2026', status: 'pending' },
  { id: '3', user: 'Emeka Tunde', amount: 75000, code: 'WM-8823', plan: 'Student Premium', date: '21 May 2026', status: 'pending' },
  { id: '4', user: 'Fatima Bello', amount: 500000, code: 'WM-8824', plan: 'Investor VIP', date: '21 May 2026', status: 'pending' },
]

const recentUsers = [
  { name: 'Fatima B.', email: 'fatima@example.com', role: 'STUDENT', plan: 'VIP', joined: '22 May' },
  { name: 'Kelechi M.', email: 'kelechi@example.com', role: 'INVESTOR', plan: 'Premium', joined: '22 May' },
  { name: 'Adaeze O.', email: 'adaeze@example.com', role: 'STUDENT', plan: 'Basic', joined: '21 May' },
  { name: 'Uche P.', email: 'uche@example.com', role: 'INVESTOR', plan: 'VIP', joined: '21 May' },
  { name: 'Bola S.', email: 'bola@example.com', role: 'STUDENT', plan: 'Premium', joined: '20 May' },
]

const pendingReviews = [
  { id: 'r1', user: 'Anonymous User', rating: 5, message: 'Amazing platform, best I\'ve used in Nigeria for crypto education...', date: '22 May' },
  { id: 'r2', user: 'New Investor', rating: 4, message: 'Good returns but could improve communication on withdrawal timelines...', date: '21 May' },
]

export default function AdminPage() {
  const [payments, setPayments] = useState(pendingPayments)
  const [reviews, setReviews] = useState(pendingReviews)
  const [activeSection, setActiveSection] = useState('overview')

  const approvePayment = (id: string) => {
    setPayments(p => p.filter(t => t.id !== id))
    toast.success('Payment approved! User subscription activated.')
  }

  const rejectPayment = (id: string) => {
    setPayments(p => p.filter(t => t.id !== id))
    toast.error('Payment rejected and user notified.')
  }

  const approveReview = (id: string) => {
    setReviews(r => r.filter(rv => rv.id !== id))
    toast.success('Review approved and published.')
  }

  const rejectReview = (id: string) => {
    setReviews(r => r.filter(rv => rv.id !== id))
    toast.error('Review rejected.')
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-xl px-3 py-2 text-xs space-y-1">
          <p className="text-[#8BA3CC] mb-1">{label}</p>
          {payload.map((p: any) => <p key={p.name} style={{ color: p.fill }}>₦{(p.value/1e6).toFixed(1)}M {p.name}</p>)}
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
          <div className="p-3 mb-4 border-b border-border pb-4">
            <p className="font-syne font-bold text-sm">Admin Panel</p>
            <p className="text-[11px] text-[#4A6A99] font-mono-dm mt-0.5">WM Trading Academy</p>
          </div>
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mb-2">Management</p>
          {[
            { id: 'overview', icon: <BarChart2 size={15}/>, label: 'Overview' },
            { id: 'users', icon: <Users size={15}/>, label: 'All Users' },
            { id: 'payments', icon: <DollarSign size={15}/>, label: 'Verify Payments', badge: payments.length },
            { id: 'reviews-mod', icon: <Star size={15}/>, label: 'Reviews', badge: reviews.length },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveSection(item.id)}
              className={`sidebar-item ${activeSection === item.id ? 'sidebar-item-active' : ''}`}>
              {item.icon} {item.label}
              {item.badge ? <span className="ml-auto bg-accent-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono-dm">{item.badge}</span> : null}
            </button>
          ))}
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mt-4 mb-2">Content</p>
          <button className="sidebar-item"><BookOpen size={15}/> Courses</button>
          <button className="sidebar-item"><Bell size={15}/> Announcements</button>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-syne text-2xl font-extrabold">Admin Dashboard</h1>
              <p className="text-[#8BA3CC] text-sm mt-1">WM Trading Academy · Full Control Panel</p>
            </div>
            <button onClick={() => toast.success('Generating report...')} className="btn-outline px-4 py-2.5 text-sm rounded-xl">Export Report</button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Users size={18}/>, label: 'Total Users', value: '4,287', change: '+127 this week', changeColor: 'text-accent-green', iconBg: 'bg-gold/10 text-gold' },
              { icon: <DollarSign size={18}/>, label: 'Revenue (May)', value: '₦8.4M', change: '↑ +22% vs April', changeColor: 'text-accent-green', iconBg: 'bg-accent-cyan/10 text-accent-cyan' },
              { icon: <Clock size={18}/>, label: 'Pending Payments', value: payments.length.toString(), change: 'Needs review', changeColor: 'text-gold', iconBg: 'bg-gold/10 text-gold' },
              { icon: <TrendingUp size={18}/>, label: 'Assets Under Mgmt', value: '₦2.4B', change: '↑ Growing AUM', changeColor: 'text-accent-green', iconBg: 'bg-accent-green/10 text-accent-green' },
            ].map(m => (
              <div key={m.label} className="metric-card flex items-start justify-between">
                <div>
                  <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase">{m.label}</p>
                  <p className="font-syne text-2xl font-extrabold mt-1">{m.value}</p>
                  <p className={`text-[11px] font-mono-dm mt-1 ${m.changeColor}`}>{m.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.iconBg}`}>{m.icon}</div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="card-dark p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold">Platform Revenue</h2>
              <div className="flex gap-1">
                {['3M', '6M', '1Y'].map(p => (
                  <button key={p} className={`px-3 py-1 rounded-full text-[11px] font-mono-dm border transition-all ${p === '6M' ? 'bg-gold/15 border-gold/40 text-gold' : 'border-border text-[#4A6A99]'}`}>{p}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A6A" />
                <XAxis dataKey="month" tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '₦'+(v/1e6).toFixed(1)+'M'} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={v => <span style={{ color: '#8BA3CC', fontSize: 11 }}>{v}</span>} />
                <Bar dataKey="students" name="Students" fill="#F5A623" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
                <Bar dataKey="investors" name="Investors" fill="#00E5FF" radius={[4, 4, 0, 0]} fillOpacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pending Payments */}
          <div className="card-dark overflow-hidden mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-syne font-bold">Pending Bank Transfers</h2>
              <span className="tag tag-gold">{payments.length} pending</span>
            </div>
            {payments.length === 0 ? (
              <div className="px-6 py-10 text-center text-[#4A6A99] font-mono-dm text-sm">All payments verified ✓</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {['User', 'Plan', 'Amount', 'Code', 'Date', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-surface/30 transition-colors">
                      <td className="px-4 py-3.5 text-sm font-medium">{p.user}</td>
                      <td className="px-4 py-3.5"><span className="tag tag-gray text-xs">{p.plan}</span></td>
                      <td className="px-4 py-3.5 text-gold font-mono-dm text-xs font-bold">{formatNaira(p.amount)}</td>
                      <td className="px-4 py-3.5 font-mono-dm text-xs text-[#8BA3CC]">{p.code}</td>
                      <td className="px-4 py-3.5 font-mono-dm text-xs text-[#4A6A99]">{p.date}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-2">
                          <button onClick={() => approvePayment(p.id)} className="flex items-center gap-1 px-3 py-1.5 bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-mono-dm rounded-lg hover:bg-accent-green/20 transition-all">
                            <CheckCircle size={12}/> Approve
                          </button>
                          <button onClick={() => rejectPayment(p.id)} className="flex items-center gap-1 px-3 py-1.5 bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs font-mono-dm rounded-lg hover:bg-accent-red/20 transition-all">
                            <XCircle size={12}/> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="card-dark overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="font-syne font-bold">Recent Signups</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {['Name', 'Role', 'Plan', 'Joined'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(u => (
                    <tr key={u.email} className="border-b border-border/50 last:border-0 hover:bg-surface/30 transition-colors text-sm">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-[11px] text-bg">{u.name.split(' ').map(n=>n[0]).join('')}</div>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><span className={`tag ${u.role === 'INVESTOR' ? 'tag-gold' : 'tag-blue'}`}>{u.role}</span></td>
                      <td className="px-4 py-3"><span className={`tag ${u.plan === 'VIP' ? 'tag-gold' : u.plan === 'Premium' ? 'tag-blue' : 'tag-green'}`}>{u.plan}</span></td>
                      <td className="px-4 py-3 font-mono-dm text-xs text-[#4A6A99]">{u.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pending Reviews */}
            <div className="card-dark overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-syne font-bold">Pending Reviews</h2>
                <span className="tag tag-gold">{reviews.length}</span>
              </div>
              {reviews.length === 0 ? (
                <div className="px-5 py-10 text-center text-[#4A6A99] font-mono-dm text-sm">No pending reviews</div>
              ) : (
                <div className="divide-y divide-border/50">
                  {reviews.map(r => (
                    <div key={r.id} className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><span key={i} className={`text-sm ${i<r.rating?'text-gold':'text-border-2'}`}>★</span>)}</div>
                        <span className="font-mono-dm text-[11px] text-[#4A6A99]">{r.date}</span>
                      </div>
                      <p className="text-sm text-[#8BA3CC] mb-3 line-clamp-2 italic">"{r.message}"</p>
                      <div className="flex gap-2">
                        <button onClick={() => approveReview(r.id)} className="flex items-center gap-1 px-3 py-1.5 bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-mono-dm rounded-lg hover:bg-accent-green/20 transition-all">
                          <CheckCircle size={12}/> Approve
                        </button>
                        <button onClick={() => rejectReview(r.id)} className="flex items-center gap-1 px-3 py-1.5 bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs font-mono-dm rounded-lg hover:bg-accent-red/20 transition-all">
                          <XCircle size={12}/> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
