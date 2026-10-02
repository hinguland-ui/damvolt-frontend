import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaStable from './useEmblaStable'
import { Counter } from './ui'

const MAX_FIT = 5 // up to this many counters sit side by side; more than that becomes a slider

function Stat({ s }) {
  return (
    <div className="stat">
      <Counter value={s.value} suffix={s.suffix} />
      <span>{s.label}</span>
    </div>
  )
}

// More than 5 counters: a calm slider that moves one counter at a time, pauses on hover and can be dragged.
function StatsSlider({ stats }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1, duration: 42 }, [
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  useEmblaStable(embla)

  return (
    <div className="carousel stats-carousel reveal" style={{ '--per-d': MAX_FIT, '--per-t': 3, '--per-m': 2 }} role="region" aria-label="Our numbers">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track">
          {stats.map((s) => (
            <div className="carousel-slide" key={s.label}>
              <Stat s={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function StatsRow({ stats }) {
  if (!stats.length) return null
  if (stats.length > MAX_FIT) return <StatsSlider stats={stats} />

  return (
    <div className="stats-row reveal" style={{ '--n': stats.length }}>
      {stats.map((s) => (
        <Stat s={s} key={s.label} />
      ))}
    </div>
  )
}
