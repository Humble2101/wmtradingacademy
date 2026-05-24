import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-bg-2 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gold-grad rounded-xl flex items-center justify-center font-syne font-extrabold text-sm text-bg">WM</div>
              <span className="font-syne font-bold">WM <span className="text-gold">Trading</span> Academy</span>
            </div>
            <p className="text-[#8BA3CC] text-sm leading-relaxed max-w-sm">Nigeria's premier crypto trading education and managed investment platform. Trade smarter. Grow faster. Win bigger.</p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://wa.me/2349153137682" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-sm hover:border-gold hover:text-gold transition-all">💬</a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-sm hover:border-gold transition-all">📸</a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-sm hover:border-gold transition-all">🐦</a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-sm hover:border-gold transition-all">🎵</a>
            </div>
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[['/', 'Home'], ['/subscriptions', 'Plans & Pricing'], ['/reviews', 'Testimonials'], ['/login', 'Sign In'], ['/signup', 'Get Started']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm text-[#8BA3CC] hover:text-gold transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-syne font-bold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-[#8BA3CC]">📞 07065507517</li>
              <li className="text-sm text-[#8BA3CC]">💬 wa.me/2349153137682</li>
              <li className="text-sm text-[#8BA3CC]">📸 @wm_winnerman</li>
              <li className="text-sm text-[#8BA3CC]">🐦 @wm_winnerman</li>
              <li className="text-sm text-[#8BA3CC]">🎵 @wmwinnerman</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4A6A99] font-mono-dm">© 2026 WM Trading Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[#4A6A99] hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-[#4A6A99] hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-[#4A6A99] hover:text-gold transition-colors">Risk Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
