'use client'
const TICKERS = [
  { sym: 'BTC/USDT', price: '68,420.50', change: '+2.14%', up: true },
  { sym: 'ETH/USDT', price: '3,842.10', change: '+1.87%', up: true },
  { sym: 'BNB/USDT', price: '612.40', change: '-0.43%', up: false },
  { sym: 'SOL/USDT', price: '182.30', change: '+4.21%', up: true },
  { sym: 'ADA/USDT', price: '0.4821', change: '-1.12%', up: false },
  { sym: 'DOT/USDT', price: '8.92', change: '+0.76%', up: true },
  { sym: 'AVAX/USDT', price: '42.17', change: '+2.94%', up: true },
  { sym: 'LINK/USDT', price: '17.84', change: '+3.11%', up: true },
  { sym: 'XRP/USDT', price: '0.6234', change: '+1.42%', up: true },
]
export default function TickerBar() {
  const doubled = [...TICKERS, ...TICKERS]
  return (
    <div className="bg-bg-2 border-b border-border overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-8 font-mono-dm text-[11px]">
            <span className="text-white font-medium">{t.sym}</span>
            <span className="text-[#8BA3CC]">${t.price}</span>
            <span className={t.up ? 'text-accent-green' : 'text-accent-red'}>{t.change}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
