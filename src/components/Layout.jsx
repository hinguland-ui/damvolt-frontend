import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, m } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import MobileDrawer from './MobileDrawer'
import WhatsAppWidget from './WhatsAppWidget'
import { PageSkeleton } from './ui'
import ErrorBoundary from './ErrorBoundary'
import { trackPageView } from '../lib/pixel'

// Reveal-on-scroll for every .reveal element, including ones added later by lazy pages.
// DOM scans are batched into one per animation frame to stay cheap.
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    let raf = 0
    const scan = () => {
      raf = 0
      document.querySelectorAll('.reveal:not(.in):not([data-io])').forEach((el) => {
        el.dataset.io = '1'
        io.observe(el)
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(scan)
    }
    scan()
    const mo = new MutationObserver(schedule)
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useReveal()
  // The first page paints at once (so the hero picture is not held back by a fade-in); later page changes still fade in.
  const firstPage = useRef(true)
  useEffect(() => {
    firstPage.current = false
  }, [])

  useEffect(() => {
    trackPageView() // Meta Pixel (only when an ID is set in the admin panel)
  }, [pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
  }, [pathname])

  return (
    <LazyMotion features={domAnimation} strict>
      <div key={`progress:${pathname}`} className="route-progress run" />
      <Header onMenu={() => setMenuOpen(true)} />
      <m.main
        key={`page:${pathname}`}
        initial={firstPage.current ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </m.main>
      <Footer />

      <WhatsAppWidget />

      <MobileDrawer open={menuOpen} onClose={closeMenu} />
    </LazyMotion>
  )
}
