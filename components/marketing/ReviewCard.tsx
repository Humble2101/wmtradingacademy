import type { ReviewData } from '@/types'
import { formatDate } from '@/lib/utils'

interface ReviewCardProps {
  review: ReviewData
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)
  return (
    <div className="card-dark card-hover p-6">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-base ${i < review.rating ? 'text-gold' : 'text-border-2'}`}>★</span>
        ))}
      </div>
      {review.title && <h4 className="font-syne font-bold text-sm mb-2">{review.title}</h4>}
      <p className="text-[#8BA3CC] text-sm leading-relaxed italic mb-5">"{review.message}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-grad flex items-center justify-center font-syne font-bold text-xs text-bg">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold">{review.user.name}</p>
            <p className="text-[11px] text-[#4A6A99] font-mono-dm">{review.user.role}</p>
          </div>
        </div>
        <span className="text-[11px] text-[#4A6A99] font-mono-dm">{formatDate(review.createdAt)}</span>
      </div>
    </div>
  )
}
