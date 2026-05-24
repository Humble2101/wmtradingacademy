'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { TrendingUp, BarChart2, List, CreditCard, User2, LogOut, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { formatNaira } from '@/lib/utils'

const portfolioData = [
  { month: 'Jan', value: 3200000, roi: 0 },
  { month: 'Feb', value: 3480000, roi: 8.75 },
  { month: 'Mar', value: 3750000, roi: 17.2 },
  { month: 'Apr', value: 4200000, roi: 31.25 },
  { month: 'May', value: 4820000, roi: 50.6 },
]

const allocation = [
  { name: 'BTC', value: 40, color: '#F5A623' },
  { name: 'ETH', value: 25, color: '#00E5FF' },
  { name: 'SOL', value: 15, color: '#B388FF' },
  { name: 'Stables', value: 12, color: '#00E676' },
  { name: 'Others', value: 8, color: '#FF5252' },
]

const transactions = [
  { type: 'Deposit', amount: 500000, status: 'Approved', method: 'Bank Transfer', date: '15 May 2026', up: true },
  { type: 'Profit Credit', amount: 84000, status: 'Credited', method: 'Auto', date: '12 May 2026', up: true },
  { type: 'Deposit', amount: 1000000, status: 'Approved', method: 'Card', date: '3 May 2026', up: true },
  { type: 'Withdrawal', amount: 200000, status: 'Pending', method: 'Bank Transfer', date: '1 May 2026', up: false },
  { type: 'Profit Credit', amount: 62000, status: 'Credited', method: 'Auto', date: '28 Apr 2026', up: true },
]

interface Props { user: { name?: string | null; email?: string | null } }

export default function InvestorDashboardClient({ user }: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  const [period, setPeriod] = useState('1M')
  const initials = user.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'U'

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-xl px-3 py-2 text-xs space-y-1">
          <p className="text-[#8BA3CC]">{label}</p>
          <p className="text-gold font-bold">{formatNaira(payload[0]?.value || 0)}</p>
          {payload[1] && <p className="text-accent-green">ROI: +{payload[1].value?.toFixed(1)}%</p>}
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
            <div className="w-10 h-10 rounded-full bg-cyan-grad flex items-center justify-center font-syne font-bold text-sm text-bg">{initials}</div>
            <div>
              <p className="text-sm font-semibold truncate max-w-[120px]">{user.name}</p>
              <p className="text-[11px] text-[#4A6A99] font-mono-dm">Investor · VIP</p>
            </div>
          </div>
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mb-2">Portfolio</p>
          {[
            { id: 'overview', icon: <TrendingUp size={15}/>, label: 'Overview' },
            { id: 'analytics', icon: <BarChart2 size={15}/>, label: 'Analytics' },
            { id: 'transactions', icon: <List size={15}/>, label: 'Transactions' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`sidebar-item ${activeTab === item.id ? 'sidebar-item-active' : ''}`}>
              {item.icon} {item.label}
            </button>
          ))}
          <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase px-3 mt-4 mb-2">Account</p>
          <Link href="/subscriptions" className="sidebar-item"><CreditCard size={15}/> Plan Details</Link>
          <button className="sidebar-item"><User2 size={15}/> My Manager</button>
          <div className="mt-auto pt-4 border-t border-border">
            <Link href="/dashboard/student" className="sidebar-item text-gold"><BarChart2 size={15}/> Switch to Student</Link>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="sidebar-item text-accent-red mt-1"><LogOut size={15}/> Sign Out</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-syne text-2xl font-extrabold">Investor Dashboard</h1>
              <p className="text-[#8BA3CC] text-sm mt-1">Portfolio performance · May 2026</p>
            </div>
            <button className="btn-cyan px-4 py-2.5 text-sm rounded-xl">+ Deposit Funds</button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Portfolio', value: '₦4,820,000', change: '+₦320,000 (7.1%)', up: true },
              { label: 'Total ROI', value: '+28.4%', change: 'Since inception', up: true, valueColor: 'text-accent-green' },
              { label: 'This Month', value: '+7.1%', change: '↑ 2.1% vs last month', up: true, valueColor: 'text-gold' },
              { label: 'Risk Level', value: 'Medium', change: '★ Professionally Managed', up: null, valueColor: 'text-accent-cyan' },
            ].map(m => (
              <div key={m.label} className="metric-card">
                <p className="font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase mb-1">{m.label}</p>
                <p className={`font-syne text-xl font-extrabold mt-1 ${m.valueColor || ''}`}>{m.value}</p>
                <p className={`text-[11px] font-mono-dm mt-1 ${m.up === true ? 'text-accent-green' : m.up === false ? 'text-accent-red' : 'text-[#4A6A99]'}`}>{m.change}</p>
              </div>
            ))}
          </div>

          {/* Portfolio Growth Chart */}
          <div className="card-dark p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-syne font-bold">Portfolio Growth</h2>
              <div className="flex gap-1">
                {['1M', '3M', '1Y'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono-dm border transition-all ${period === p ? 'bg-gold/15 border-gold/40 text-gold' : 'border-border text-[#4A6A99]'}`}>{p}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A6A" />
                <XAxis dataKey="month" tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8BA3CC', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '₦'+(v/1e6).toFixed(1)+'M'} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#F5A623" strokeWidth={2.5} fill="url(#goldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation + Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-dark p-6">
              <h2 className="font-syne font-bold mb-5">Asset Allocation</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={allocation} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {allocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Legend formatter={(value) => <span style={{ color: '#8BA3CC', fontSize: 12 }}>{value}</span>} />
                  <Tooltip formatter={(v: any) => [`${v}%`, '']} contentStyle={{ background: '#112040', border: '1px solid #1E3A6A', borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h2 className="font-syne font-bold mb-4">Transaction History</h2>
              <div className="card-dark overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {['Type', 'Amount', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-mono-dm text-[10px] tracking-widest text-[#4A6A99] uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={i} className={`text-sm border-b border-border/50 last:border-0 hover:bg-surface/50 transition-colors`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {t.up ? <ArrowUpRight size={13} className="text-accent-green"/> : <ArrowDownRight size={13} className="text-accent-red"/>}
                            <span className="text-[#8BA3CC]">{t.type}</span>
                          </div>
                        </td>
                        <td className={`px-4 py-3 font-mono-dm text-xs ${t.up ? 'text-accent-green' : 'text-accent-red'}`}>
                          {t.up ? '+' : '-'}{formatNaira(t.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`tag ${t.status === 'Approved' || t.status === 'Credited' ? 'tag-green' : 'tag-gold'}`}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
