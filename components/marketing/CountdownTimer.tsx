'use client'
import { useEffect, useState } from 'react'
export default function CountdownTimer({ target }: { target: Date }) {
  const [time, setTime] = useState({ d: 8, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setTime({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  const Box = ({ val, label }: { val: number; label: string }) => (
    <div className="bg-bg border border-border rounded-xl px-4 py-3 text-center min-w-[68px]">
      <div className="font-syne text-2xl font-extrabold text-gold">{String(val).padStart(2,'0')}</div>
      <div className="font-mono-dm text-[10px] text-[#4A6A99] uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  )
  return (
    <div className="flex gap-3 flex-wrap">
      <Box val={time.d} label="Days"/>
      <Box val={time.h} label="Hours"/>
      <Box val={time.m} label="Mins"/>
      <Box val={time.s} label="Secs"/>
    </div>
  )
}
