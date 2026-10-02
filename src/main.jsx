import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { loadContent, onContentUpdate } from './lib/api'

// Remounts the app once if fresh content arrives after a cached first paint.
function Root() {
  const [version, setVersion] = useState(0)
  useEffect(() => onContentUpdate(() => setVersion((v) => v + 1)), [])
  return (
    <BrowserRouter>
      <App key={version} />
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root'))

// Start the (single) API request immediately, in parallel with the page load.
const contentReady = loadContent().then(
  () =>
    root.render(
      <StrictMode>
        <Root />
      </StrictMode>,
    ),
  () => {
    root.render(
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24, fontFamily: 'sans-serif', color: '#3c3c43' }}>
        <div>
          <h2 style={{ margin: '0 0 8px' }}>We couldn’t load the website</h2>
          <p style={{ margin: '0 0 16px' }}>Please check your connection and try again.</p>
          <button onClick={() => location.reload()} style={{ padding: '10px 22px', border: 0, borderRadius: 10, background: '#2078fe', color: '#fff', fontSize: 15, cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      </div>,
    )
  },
)

// Preloader (defined in index.html): once the page AND the content have loaded, finish the bar
// smoothly from wherever it is, then fade the whole screen out.
const preloader = document.getElementById('preloader')
if (preloader) {
  const MIN = 1200 // minimum time on screen (from when it first appeared) so it feels calm, not flashy
  const shownAt = window.__plStart ?? 0
  const bar = preloader.querySelector('.pl-bar span')
  const hide = () => {
    const wait = Math.max(0, MIN - (performance.now() - shownAt))
    setTimeout(() => {
      if (bar) {
        // freeze the running animation at its current point, then glide to 100%
        bar.style.transform = getComputedStyle(bar).transform
        bar.style.animation = 'none'
        void bar.offsetWidth
        bar.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)'
        bar.style.transform = 'scaleX(1)'
      }
      setTimeout(() => {
        preloader.classList.add('done')
        setTimeout(() => preloader.remove(), 900)
      }, 550)
    }, wait)
  }
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })
  Promise.all([pageLoaded, contentReady]).then(hide)
}
