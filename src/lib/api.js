import { hydrate } from '../data/store'

// Single source of truth for the backend address: VITE_API_URL (see .env.example).
export const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

const CACHE_KEY = 'damvolt:content:v1'
const listeners = new Set()

export const onContentUpdate = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY))
  } catch {
    return null
  }
}

// How long a returning visitor waits for fresh content before the cached copy is shown instead.
const FRESH_WAIT_MS = 1500

const fetchContent = () =>
  fetch(`${API_URL}/content`, { headers: { Accept: 'application/json' }, cache: 'no-cache' }).then((r) => {
    if (!r.ok) throw new Error(`API ${r.status}`)
    return r.json()
  })

/**
 * Loads all website content in ONE request (the API caches it server-side and sends an ETag).
 *  - Returning visitors: rendered instantly from localStorage, then refreshed silently in the background.
 *  - First visit: waits for the single request.
 */
export async function loadContent() {
  const cached = readCache()
  const request = fetchContent().then((data) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch {
      /* storage full / blocked — fine */
    }
    return data
  })

  if (cached) {
    // Network first: a refresh right after an admin change shows the new data. Only if the API is
    // slow (or down) do we fall back to the cached copy and update silently when the reply arrives.
    const timeout = new Promise((resolve) => setTimeout(() => resolve(null), FRESH_WAIT_MS))
    const fresh = await Promise.race([request.catch(() => null), timeout])
    if (fresh) {
      hydrate(fresh)
      return
    }
    hydrate(cached)
    request
      .then((late) => {
        if (JSON.stringify(late) !== JSON.stringify(cached)) {
          hydrate(late)
          listeners.forEach((fn) => fn())
        }
      })
      .catch(() => {})
    return
  }

  hydrate(await request)
}
