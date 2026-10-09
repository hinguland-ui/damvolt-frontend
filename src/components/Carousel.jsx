import { Children, useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import useEmblaStable from './useEmblaStable'

// Drag/swipe carousel (Embla) with arrows, autoplay and a progress bar.
// perView = [desktop, tablet, phone] cards visible.
//  - more cards than fit on desktop: loops and auto-plays
//  - everything already fits: a plain row — every card shown exactly once, no loop, no arrows
export default function Carousel({ children, perView = [3, 2, 1.15], autoplay = true, loop = true, label = 'Carousel' }) {
  const [d, t, m] = perView
  const count = Children.count(children)
  const loopable = loop && count > d

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: loopable, align: 'start', duration: 30, skipSnaps: false, containScroll: loopable ? false : 'trimSnaps' },
    loopable && autoplay ? [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })] : [],
  )
  useEmblaStable(embla)

  const [selected, setSelected] = useState(0)
  const [scrollable, setScrollable] = useState(loop && count > d)

  const update = useCallback((api) => {
    setSelected(api.selectedScrollSnap())
    setScrollable(api.canScrollNext() || api.canScrollPrev())
  }, [])

  useEffect(() => {
    if (!embla) return
    update(embla)
    embla.on('select', update).on('reInit', update)
    return () => {
      embla.off('select', update).off('reInit', update)
    }
  }, [embla, update])

  const go = (dir) => {
    if (!embla) return
    dir < 0 ? embla.scrollPrev() : embla.scrollNext()
    embla.plugins().autoplay?.reset()
  }

  // Embla's loop needs plenty of slides beyond the visible ones (with e.g. 8 slides and 4 in view the loop
  // points are mis-calculated and two slides touch), so a *looping* list is repeated until it is long enough.
  const items = useMemo(() => {
    const list = Children.toArray(children)
    const copies = loopable && list.length < d * 3 ? Math.ceil((d * 3) / list.length) : 1
    return { list, all: Array.from({ length: copies }, () => list).flat() }
  }, [children, d, loopable])
  const realCount = items.list.length

  return (
    <div className="carousel" role="region" aria-label={label} style={{ '--per-d': d, '--per-t': t, '--per-m': m }}>
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track">
          {items.all.map((c, i) => (
            <div className="carousel-slide" key={`${c.key ?? ''}-${i}`} aria-hidden={i >= realCount || undefined}>
              {c}
            </div>
          ))}
        </div>
      </div>
      {scrollable && (
        <div className="carousel-nav">
          <div className="carousel-bar" aria-hidden="true">
            <span style={{ width: `${100 / realCount}%`, transform: `translateX(${(selected % realCount) * 100}%)` }} />
          </div>
          <div className="carousel-arrows">
            <button className="round-btn" onClick={() => go(-1)} aria-label="Previous">
              <ArrowLeft size={18} />
            </button>
            <button className="round-btn" onClick={() => go(1)} aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
