import { useEffect, useRef, useState } from 'react'
import { GENERIC_IMAGE, fallbackFor } from '../lib/media'

// Image with a shimmer skeleton until it has loaded, then fades in.
// If the picture is missing / was never uploaded, the matching original picture from /public/images is shown.
export default function Img({ src, alt = '', className = '', eager = false, fallback = GENERIC_IMAGE, ...rest }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const shown = !src || failed ? fallbackFor(src, fallback) : src

  useEffect(() => {
    setFailed(false)
    const el = ref.current
    if (el?.complete && el.naturalWidth) setLoaded(true)
  }, [src])

  return (
    <div className={`img-wrap ${loaded ? 'loaded' : 'loading'} ${className}`}>
      <img
        ref={ref}
        src={shown}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed && shown === src) setFailed(true) // first failure: switch to the local picture
          else setLoaded(true) // the local one failed too: stop the shimmer
        }}
        {...rest}
      />
    </div>
  )
}
