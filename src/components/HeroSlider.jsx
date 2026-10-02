import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { m } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SmartLink from './SmartLink'
import useEmblaStable from './useEmblaStable'
import { home } from '../data/site'

const DELAY = 6000
const pad = (n) => String(n).padStart(2, '0')

const item = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
}

export default function HeroSlider() {
  const slides = home.slides
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 34, skipSnaps: false }, [
    Autoplay({ delay: DELAY, stopOnInteraction: false, stopOnMouseEnter: false }),
  ])
  useEmblaStable(embla)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!embla) return
    const onSelect = () => setSelected(embla.selectedScrollSnap())
    onSelect()
    embla.on('select', onSelect)
    return () => {
      embla.off('select', onSelect)
    }
  }, [embla])

  // Manual navigation restarts the autoplay timer.
  const nav = useCallback(
    (fn) => {
      if (!embla) return
      fn(embla)
      embla.plugins().autoplay?.reset()
    },
    [embla],
  )

  if (!slides.length) return null

  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="hero-viewport" ref={emblaRef}>
        <div className="hero-track">
          {slides.map((s, i) => {
            const Heading = i === 0 ? m.h1 : m.h2
            const active = i === selected
            return (
              <div className={`hero-slide${active ? ' active' : ''}`} key={`${i}-${s.image}`} aria-hidden={!active}>
                <img src={s.image} alt="" draggable="false" fetchPriority={i === 0 ? 'high' : 'low'} />
                <div className="container slide-content">
                  {s.kicker && (
                    <m.div className="kicker" variants={item} custom={0} initial="hidden" animate={active ? 'show' : 'hidden'}>
                      {s.kicker}
                    </m.div>
                  )}
                  <Heading variants={item} custom={1} initial="hidden" animate={active ? 'show' : 'hidden'}>
                    {s.title}
                  </Heading>
                  {s.text && (
                    <m.p variants={item} custom={2} initial="hidden" animate={active ? 'show' : 'hidden'}>
                      {s.text}
                    </m.p>
                  )}
                  <m.div className="slide-cta" variants={item} custom={3} initial="hidden" animate={active ? 'show' : 'hidden'}>
                    {s.cta?.label && s.cta?.to && (
                      <SmartLink to={s.cta.to} className="btn btn-white" tabIndex={active ? 0 : -1} draggable="false">
                        {s.cta.label} <ArrowRight size={17} />
                      </SmartLink>
                    )}
                    {s.cta2?.label && s.cta2?.to && (
                      <SmartLink to={s.cta2.to} className="btn btn-outline-white" tabIndex={active ? 0 : -1} draggable="false">
                        {s.cta2.label}
                      </SmartLink>
                    )}
                  </m.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hero-controls">
        <div className="container">
          <div className="hero-dots">
            {slides.map((s, i) => (
              <button
                key={`${i}-${s.image}`}
                className={`hero-dot${i === selected ? ' active' : ''}`}
                style={{ '--dur': `${DELAY}ms` }}
                onClick={() => nav((e) => e.scrollTo(i))}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span key={i === selected ? `a${selected}` : 'x'} />
              </button>
            ))}
            <span className="hero-count">
              {pad(selected + 1)} / {pad(slides.length)}
            </span>
          </div>
          <div className="hero-arrows">
            <button className="round-btn" onClick={() => nav((e) => e.scrollPrev())} aria-label="Previous slide">
              <ArrowLeft size={18} />
            </button>
            <button className="round-btn" onClick={() => nav((e) => e.scrollNext())} aria-label="Next slide">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
