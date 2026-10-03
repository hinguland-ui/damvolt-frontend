import { Star } from 'lucide-react'
import { reviewRows } from '../data/reviews'

const tints = ['#e8f1ff', '#e8eefc', '#e7f5ee', '#fdf0e3', '#fde8ee', '#ece9fb']
const inks = ['#2078fe', '#2f4ea8', '#1f7a4d', '#a2560d', '#b0244f', '#4b3bb0']

function QuoteMark() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor" aria-hidden="true">
      <path d="M0 26V15.6C0 6.9 4.6 1.7 13 0l1.6 3.6C9.9 5 7.6 8 7.3 12H14v14H0Zm19.4 0V15.6C19.4 6.9 24 1.7 32.4 0L34 3.6c-4.7 1.4-7 4.4-7.3 8.4h6.7v14h-14Z" />
    </svg>
  )
}

function ReviewCard({ r, i }) {
  const initials = r.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <figure className="review">
      <div className="review-top">
        <span className="review-quote">
          <QuoteMark />
        </span>
        <span className="stars" role="img" aria-label={`${r.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} size={14} strokeWidth={0} fill={k < r.rating ? 'currentColor' : '#dcdce2'} />
          ))}
        </span>
      </div>
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className="review-avatar" style={{ background: tints[i % tints.length], color: inks[i % inks.length] }}>
          {initials}
        </span>
        <span>
          <strong>{r.name}</strong>
          <small>{r.role}</small>
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse = false, offset = 0 }) {
  // Pure-CSS loop: the list is rendered twice and the track slides by exactly
  // half its width, so the seam is invisible. ~7s per card keeps the pace calm.
  if (!items.length) return null
  const loop = [...items, ...items]
  return (
    <div className="marquee-viewport">
      <div
        className={`marquee-track${reverse ? ' reverse' : ''}`}
        style={{ '--marquee-duration': `${items.length * 7}s` }}
      >
        {loop.map((r, i) => (
          <div className="marquee-slide" key={i} aria-hidden={i >= items.length || undefined}>
            <ReviewCard r={r} i={(i % items.length) + offset} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Two rows of reviews that scroll continuously in opposite directions,
// pause on hover / touch.
export default function ReviewMarquee() {
  return (
    <div className="marquee">
      <Row items={reviewRows[0]} />
      <Row items={reviewRows[1]} reverse offset={3} />
    </div>
  )
}
