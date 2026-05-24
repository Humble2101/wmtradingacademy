'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

const MOCK_REVIEWS = [
  { id: '1', rating: 5, title: 'Life-changing education', message: 'WM Trading Academy completely transformed how I look at the crypto market. The Let\'s Talk Crypto event was phenomenal — I went from zero understanding to placing profitable trades within 2 weeks. Coach Winnerman breaks things down in a way that actually sticks.', user: { name: 'Chukwuemeka B.', role: 'STUDENT' }, createdAt: new Date('2026-05-10') },
  { id: '2', rating: 5, title: '28% ROI in 3 months', message: 'My portfolio has grown 28% in 3 months under their managed investment program. The transparency is incredible — daily reports, clear charts, and a dedicated account manager who genuinely cares about your growth.', user: { name: 'Amaka N.', role: 'INVESTOR' }, createdAt: new Date('2026-05-08') },
  { id: '3', rating: 4, title: 'Finally things clicked!', message: 'The crypto terminologies module finally made things click for me. Very clear explanations, practical examples, and the community support is amazing. I\'ll be upgrading to VIP next month without hesitation.', user: { name: 'Tunde F.', role: 'STUDENT' }, createdAt: new Date('2026-05-05') },
  { id: '4', rating: 5, title: 'Best investment of 2026', message: 'Best investment decision I made this year. ROI of over 30% in under 4 months. The admin team is responsive and my personal account manager is worth every kobo of the VIP subscription. Highly recommend!', user: { name: 'Ngozi O.', role: 'INVESTOR' }, createdAt: new Date('2026-05-03') },
  { id: '5', rating: 5, title: 'Evening sessions are gold', message: 'The live evening sessions are absolute gold. Wm Winnerman breaks down market analysis in a way that actually sticks. I\'ve since started growing my own portfolio from scratch and I\'m up 15% this month alone.', user: { name: 'Segun A.', role: 'STUDENT' }, createdAt: new Date('2026-04-28') },
  { id: '6', rating: 4, title: 'Safe and professional', message: 'Safe and professional managed trading. I love the risk controls in place and the weekly profit summaries. Great starting point for anyone serious about crypto investment in Nigeria. The team is very professional.', user: { name: 'Ify C.', role: 'INVESTOR' }, createdAt: new Date('2026-04-25') },
  { id: '7', rating: 5, title: 'Community is everything', message: 'Joined the WhatsApp community first and was blown away by the level of support and quality of signals. The paid courses are on another level. Worth every naira — don\'t hesitate.', user: { name: 'Bola M.', role: 'STUDENT' }, createdAt: new Date('2026-04-20') },
  { id: '8', rating: 5, title: 'Doubled my capital', message: 'I started with the Basic investor plan and upgraded to VIP within 60 days because the results spoke for themselves. Currently at 47% ROI since inception. This is not a scam — it\'s the real deal.', user: { name: 'Emeka T.', role: 'INVESTOR' }, createdAt: new Date('2026-04-15') },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS)
  const [form, setForm] = useState({ name: '', role: 'STUDENT', rating: 5, title: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
  const ratingDist = [5, 4, 3, 2, 1].map(r => ({ rating: r, count: reviews.filter(rv => rv.rating === r).length, pct: (reviews.filter(rv => rv.rating === r).length / reviews.length) * 100 }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.message.trim()) { toast.error('Please write a review message'); return }
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 800))
    toast.success('Review submitted for moderation — thank you! 🌟')
    setForm({ name: '', role: 'STUDENT', rating: 5, title: '', message: '' })
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />

      <div className="bg-bg-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="label-mono mb-3">Testimonials</div>
          <h1 className="font-syne text-4xl md:text-5xl font-extrabold tracking-tight mb-4">What our traders say</h1>
          <p className="text-[#8BA3CC] max-w-lg mx-auto">Real results from real students and investors in WM Trading Academy.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 w-full">
        {/* Rating summary */}
        <div className="card-dark p-8 mb-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="font-syne text-7xl font-extrabold text-gold">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center gap-1 my-2">
                {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`text-xl ${i < Math.round(avgRating) ? 'text-gold' : 'text-border-2'}`}>★</span>)}
              </div>
              <p className="text-[#8BA3CC] text-sm font-mono-dm">{reviews.length} verified reviews</p>
            </div>
            <div className="space-y-2">
              {ratingDist.map(r => (
                <div key={r.rating} className="flex items-center gap-3">
                  <span className="text-xs text-[#8BA3CC] font-mono-dm w-3">{r.rating}</span>
                  <span className="text-gold text-xs">★</span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${r.pct}%` }}/>
                  </div>
                  <span className="text-xs text-[#4A6A99] font-mono-dm w-6">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit review */}
        <div className="card-dark p-8 mb-12 max-w-2xl mx-auto">
          <h2 className="font-syne font-bold text-xl mb-6">Share your experience</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Your Name</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input-dark" placeholder="John Doe"/>
              </div>
              <div>
                <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">I am a</label>
                <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input-dark bg-bg">
                  <option value="STUDENT">Student</option>
                  <option value="INVESTOR">Investor</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-3">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button"
                    onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setForm(p => ({ ...p, rating: s }))}
                    className={`text-2xl transition-all hover:scale-110 ${s <= (hoveredStar || form.rating) ? 'text-gold' : 'text-border-2'}`}>★</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Review Title</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-dark" placeholder="Brief summary (optional)"/>
            </div>
            <div>
              <label className="block font-mono-dm text-[11px] tracking-widest text-[#8BA3CC] uppercase mb-2">Your Review</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={4} className="input-dark resize-none" placeholder="Tell others about your experience with WM Trading Academy..."/>
            </div>
            <button type="submit" disabled={submitting} className="btn-gold py-3.5 px-8 text-sm rounded-xl disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit Review →'}
            </button>
          </form>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.id} className="card-dark card-hover p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`text-base ${i < r.rating ? 'text-gold' : 'text-border-2'}`}>★</span>)}
              </div>
              {r.title && <h4 className="font-syne font-bold text-sm mb-2">{r.title}</h4>}
              <p className="text-[#8BA3CC] text-sm leading-relaxed italic mb-5">"{r.message}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-xs text-bg">
                    {r.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.user.name}</p>
                    <p className="text-[11px] text-[#4A6A99] font-mono-dm">{r.user.role}</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#4A6A99] font-mono-dm">
                  {new Intl.DateTimeFormat('en-NG', { day: '2-digit', month: 'short' }).format(r.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
