// Pictures come from the admin panel. If one was never uploaded (or the server cannot deliver it), the site falls
// back to the original pictures that ship with the website in /public/images, so nothing ever looks empty.

// The pictures that ship with the website (/public/images, 1.jpeg … 16.jpeg; there is no 11).
export const LOCAL_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16].map((n) => `/images/${n}.jpeg`)

export const GENERIC_IMAGE = '/images/6.jpeg'
export const HERO_FALLBACKS = ['/images/6.jpeg', '/images/16.jpeg', '/images/8.jpeg']

// Any missing picture (service, industry, about …) gets one of the local pictures. The pick is derived from the
// original file name, so the same picture is always shown for the same item and different items look different.
//   …/storage/brand/logo.png -> /logo.png
export function fallbackFor(src, generic = GENERIC_IMAGE) {
  const m = /\/(images|brand)\/([^/?#]+)$/.exec(String(src || ''))
  if (!m) return generic
  if (m[1] === 'brand') return `/${m[2]}`
  if (/^\d+\.jpe?g$/i.test(m[2])) return `/images/${m[2]}` // already one of the local pictures
  let h = 0
  for (const c of m[2]) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return LOCAL_IMAGES[h % LOCAL_IMAGES.length]
}

// Use on an <img onError>: swaps to the local picture once (never loops).
export function swapToFallback(event, generic) {
  const img = event.currentTarget
  const local = fallbackFor(img.getAttribute('src'), generic)
  if (img.dataset.fallback || img.getAttribute('src') === local) return false
  img.dataset.fallback = '1'
  img.src = local
  return true
}
