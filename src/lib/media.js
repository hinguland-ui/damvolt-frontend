// Pictures come from the admin panel. If one was never uploaded (or the server cannot deliver it), the site falls
// back to the original pictures that ship with the website in /public/images, so nothing ever looks empty.

export const GENERIC_IMAGE = '/images/engineers-site.webp'
export const HERO_FALLBACKS = ['/images/hero-powerlines.webp', '/images/machine-automation.webp', '/images/commissioning.webp']

// …/storage/images/transformers.webp -> /images/transformers.webp   (starter pictures keep their file names)
// …/storage/brand/logo.png           -> /logo.png
export function fallbackFor(src, generic = GENERIC_IMAGE) {
  const m = /\/(images|brand)\/([^/?#]+)$/.exec(String(src || ''))
  if (m) return m[1] === 'brand' ? `/${m[2]}` : `/images/${m[2]}`
  return generic
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
