import { company } from '../data/store'

// Meta (Facebook) Pixel. The ID comes from the admin panel (Site Settings → Meta Pixel); with no ID nothing is loaded.
// The Pixel script itself is fetched after the page has finished loading, so it never slows the first paint.
// Calls made before it arrives are queued by the small stub below (the standard Meta snippet).

let started = false

function start(id) {
  if (started || !/^\d{6,20}$/.test(id) || typeof window === 'undefined') return
  started = true

  if (!window.fbq) {
    const n = (window.fbq = function (...args) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args)
    })
    if (!window._fbq) window._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
  }
  window.fbq('init', id)

  const load = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
  }
  const later = () => ('requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 3000 }) : setTimeout(load, 1500))
  if (document.readyState === 'complete') later()
  else addEventListener('load', later, { once: true })
}

/** Call on every page view (the site is a single-page app, so the route change is the page view). */
export function trackPageView() {
  const id = company.metaPixelId
  if (!id) return
  start(id)
  window.fbq?.('track', 'PageView')
}
