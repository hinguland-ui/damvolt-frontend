import { useEffect } from 'react'

// Embla measures slide sizes once. If the width changes afterwards (page scrollbar appearing when the
// preloader leaves, web-fonts or images finishing, window resize) the loop offsets go stale and two
// slides end up touching/overlapping. This re-measures at those moments.
export default function useEmblaStable(embla) {
  useEffect(() => {
    if (!embla) return
    let raf = 0
    const remeasure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => embla.reInit())
    }

    const viewport = embla.rootNode()
    const ro = new ResizeObserver(remeasure)
    ro.observe(viewport)

    window.addEventListener('load', remeasure)
    window.addEventListener('resize', remeasure)
    document.fonts?.ready.then(remeasure)
    const t = setTimeout(remeasure, 1500) // after the preloader has gone

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      ro.disconnect()
      window.removeEventListener('load', remeasure)
      window.removeEventListener('resize', remeasure)
    }
  }, [embla])
}
