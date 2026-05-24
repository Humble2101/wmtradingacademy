import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TickerBar from '@/components/marketing/TickerBar'
import CountdownTimer from '@/components/marketing/CountdownTimer'
import PlanCard from '@/components/marketing/PlanCard'
import { STUDENT_PLANS, INVESTOR_PLANS } from '@/lib/utils'

const EVENT_DATE = new Date('2026-05-30T18:00:00+01:00')

const FEATURES = [
  { icon: '📊', title: 'How Crypto Markets Function', desc: 'Understand order books, liquidity pools, market cycles, and on-chain metrics that drive price action.', color: 'bg-gold/10', link: '/dashboard/student' },
  { icon: '⚡', title: 'Execute Market Trades Correctly', desc: 'Master entry/exit points, position sizing, leverage management, and how to place trades without emotion.', color: 'bg-accent-cyan/10', link: '/subscriptions' },
  { icon: '📚', title: 'Crypto Terminologies Explained', desc: 'DeFi, NFTs, L1/L2, liquidity mining, yield farming — decoded in plain language with practical examples.', color: 'bg-accent-purple/10', link: '/subscriptions' },
  { icon: '💰', title: 'Managed Investment Portfolios', desc: 'Let our expert traders manage your capital with transparent ROI tracking, risk controls, and daily reporting.', color: 'bg-accent-green/10', link: '/dashboard/investor' },
]

const STATS = [
  { num: '4,200+', label: 'Active Students' },
  { num: '₦2.4B', label: 'Assets Managed' },
  { num: '6th', label: 'Edition Running' },
  { num: '94%', label: 'Success Rate' },
]

const TESTIMONIALS = [
  { name: 'Chukwuemeka B.', role: 'Student · VIP', stars: 5, text: 'WM Trading Academy completely transformed how I look at the crypto market. I went from zero understanding to placing profitable trades within 2 weeks.' },
  { name: 'Amaka N.', role: 'Investor · Premium', stars: 5, text: 'My portfolio has grown 28% in 3 months under their managed investment program. The transparency is incredible — daily reports, clear charts, and a dedicated manager.' },
  { name: 'Tunde F.', role: 'Student · Basic', stars: 4, text: 'The crypto terminologies module finally made things click for me. Very clear explanations and the community support is amazing.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <TickerBar />

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-2 rounded-full text-xs font-mono-dm mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-dot" />
            Live Now · Let&apos;s Talk Crypto 6.0 · 6th Edition May 2026
          </div>
          <h1 className="font-syne text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Trade Smarter.<br />
            <span className="gradient-text-gold">Grow Faster.</span><br />
            <span className="gradient-text-cyan">Win Bigger.</span>
          </h1>
          <p className="text-[#8BA3CC] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            WM Trading Academy empowers you to master crypto markets through expert-led education, live trading sessions, and managed investment portfolios with real ROI tracking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="btn-gold px-8 py-4 text-base rounded-xl">Start Learning Free →</Link>
            <Link href="/subscriptions" className="btn-outline px-8 py-4 text-base rounded-xl">View All Plans</Link>
          </div>
          <div className="flex flex-wrap gap-12 justify-center mt-20 pt-12 border-t border-border">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-syne text-3xl font-extrabold text-gold">{s.num}</div>
                <div className="font-mono-dm text-[11px] text-[#4A6A99] tracking-wider uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-bg-2 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="label-mono mb-3">What you&apos;ll learn</div>
          <h2 className="section-title mb-4">Everything to become a<br />profitable crypto trader</h2>
          <p className="text-[#8BA3CC] max-w-xl leading-relaxed mb-14">From market fundamentals to advanced strategies — our curriculum is designed for real-world results in the Nigerian and global crypto market.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <Link key={f.title} href={f.link} className="card-dark card-hover p-6 group">
                <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}>{f.icon}</div>
                <h3 className="font-syne font-bold text-base mb-2">{f.title}</h3>
                <p className="text-[#8BA3CC] text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="label-mono mb-3">Upcoming Event</div>
            <h2 className="section-title mb-6">Let&apos;s Talk<br /><span className="gradient-text-gold">Crypto 6.0</span></h2>
            <p className="text-[#8BA3CC] leading-relaxed mb-8">Join Nigeria's fastest-growing crypto education event. 6th Edition, May 2026 — Evening Sessions designed for beginners to intermediate traders who want to break into consistent profitability.</p>
            <div className="space-y-4 mb-8">
              {[
                { icon: '📅', label: '30th & 31st May 2026', sub: 'Evening Sessions' },
                { icon: '💬', label: 'WhatsApp Community', sub: 'wa.me/2349153137682' },
                { icon: '📞', label: '07065507517', sub: 'Call or WhatsApp' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-[#4A6A99] text-xs font-mono-dm">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/2349153137682" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3.5 rounded-xl text-sm inline-block">
              Join the Community →
            </a>
          </div>
          <div className="card-dark p-8">
            <div className="font-mono-dm text-[11px] text-[#4A6A99] uppercase tracking-widest mb-5">Event Countdown</div>
            <CountdownTimer target={EVENT_DATE} />
            <div className="border-t border-border mt-8 pt-6">
              <div className="font-mono-dm text-[11px] text-[#4A6A99] uppercase tracking-widest mb-4">Social Media</div>
              <div className="grid grid-cols-2 gap-3">
                {['📸 @wm_winnerman', '🐦 @wm_winnerman', '🎵 @wmwinnerman', 'Facebook: Wm Winnerman'].map(s => (
                  <span key={s} className="text-xs text-[#8BA3CC]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS PREVIEW */}
      <section className="bg-bg-2 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="label-mono mb-3">Pricing</div>
            <h2 className="section-title mb-4">Choose your path to<br />financial freedom</h2>
            <p className="text-[#8BA3CC] max-w-lg mx-auto">Whether you want to learn trading or grow your money passively — we have the right plan for you.</p>
          </div>
          <div className="mb-10">
            <h3 className="font-syne font-bold text-xl mb-6 flex items-center gap-2">🎓 <span>Student Plans</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STUDENT_PLANS.map(p => <PlanCard key={p.id} plan={p} type="student" />)}
            </div>
          </div>
          <div>
            <h3 className="font-syne font-bold text-xl mb-6 flex items-center gap-2">💼 <span>Investor Plans</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INVESTOR_PLANS.map(p => <PlanCard key={p.id} plan={p} type="investor" />)}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-14">
          <div className="label-mono mb-3">Testimonials</div>
          <h2 className="section-title">What our traders say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(r => (
            <div key={r.name} className="card-dark p-6">
              <div className="flex gap-0.5 mb-4">{Array.from({length:5}).map((_,i)=><span key={i} className={`text-base ${i<r.stars?'text-gold':'text-border-2'}`}>★</span>)}</div>
              <p className="text-[#8BA3CC] text-sm leading-relaxed italic mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-xs text-bg">
                  {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div><p className="text-sm font-semibold">{r.name}</p><p className="text-[11px] text-[#4A6A99] font-mono-dm">{r.role}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/reviews" className="btn-outline px-6 py-3 rounded-xl text-sm">Read All Reviews →</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-gold/5 to-accent-cyan/5 border-y border-gold/20">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="label-mono mb-3">Ready to start?</div>
          <h2 className="section-title mb-6">Join 4,200+ traders<br />already winning</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="btn-gold px-8 py-4 text-base rounded-xl">Create Free Account</Link>
            <Link href="/subscriptions" className="btn-outline px-8 py-4 text-base rounded-xl">View All Plans</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
