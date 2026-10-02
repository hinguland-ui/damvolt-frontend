import { Component } from 'react'
import { Home, RotateCw } from 'lucide-react'

const RELOAD_FLAG = 'damvolt:chunk-reload'

// A new upload changes the hashed file names, so a tab opened before the upload
// can fail to load a page chunk. Reload once to pick up the new files.
const isChunkError = (err) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError/i.test(
    String(err?.message || err),
  )

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (isChunkError(error)) {
      let reloaded = false
      try {
        reloaded = sessionStorage.getItem(RELOAD_FLAG) === '1'
        sessionStorage.setItem(RELOAD_FLAG, '1')
      } catch {
        /* storage blocked — fall through to the error screen */
      }
      if (!reloaded) window.location.reload()
    }
  }

  componentDidMount() {
    try {
      sessionStorage.removeItem(RELOAD_FLAG)
    } catch {
      /* ignore */
    }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <section className="notfound">
        <div>
          <b>Oops</b>
          <h2>Something went wrong while loading this page.</h2>
          <p className="muted" style={{ marginBottom: 28 }}>
            Please reload the page. If the problem continues, call us or try again in a little while.
          </p>
          <div className="notfound-actions">
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              <RotateCw size={17} /> Reload page
            </button>
            <a className="btn btn-secondary" href="/">
              <Home size={17} /> Back to home
            </a>
          </div>
        </div>
      </section>
    )
  }
}
