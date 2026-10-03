import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter/wght.css'
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

// Preloader (defined in index.html): hides as soon as the content, the stylesheet and the first banner picture are
// ready (the picture is waited for at most 1.5 s), then fades away quickly.
const preloader = document.getElementById('preloader')
if (preloader) {
  const cssReady = new Promise((resolve) => {
    const link = document.querySelector('link[rel="stylesheet"][media]')
    if (!link || link.media === 'all') return resolve()
    link.addEventListener('load', resolve, { once: true })
    setTimeout(resolve, 3000)
  })
  const heroReady = () =>
    new Promise((resolve) => {
      const img = document.querySelector('.hero-slide img')
      if (!img || (img.complete && img.naturalWidth)) return resolve()
      img.addEventListener('load', resolve, { once: true })
      img.addEventListener('error', resolve, { once: true })
      setTimeout(resolve, 1500)
    })
  const hide = () => {
    preloader.classList.add('done')
    setTimeout(() => preloader.remove(), 400)
  }
  Promise.all([contentReady, cssReady])
    .then(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))) // let React paint the page
    .then(heroReady)
    .then(hide)
}
