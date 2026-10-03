import { useEffect, useRef, useState } from 'react'

// Renders its children only when they are about to scroll into view. Heavy sections far below the fold
// (many cards / images) then do not slow down the first load. `minHeight` keeps the page from jumping.
export default function LazyMount({ children, minHeight = 0, margin = '600px' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (show) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: `${margin} 0px` },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [show, margin])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  )
}
