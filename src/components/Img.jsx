import { useEffect, useRef, useState } from 'react'

// Image with a shimmer skeleton until it has loaded, then fades in.
export default function Img({ src, alt = '', className = '', eager = false, ...rest }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (el?.complete && el.naturalWidth) setLoaded(true)
  }, [src])

  return (
    <div className={`img-wrap ${loaded ? 'loaded' : 'loading'} ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        {...rest}
      />
    </div>
  )
}
