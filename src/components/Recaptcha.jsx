import { useEffect, useImperativeHandle, useRef } from 'react'

// Google reCAPTCHA v2 ("I'm not a robot"). The site key comes from the admin panel via the API.
let scriptPromise
const loadScript = () =>
  (scriptPromise ||= new Promise((resolve, reject) => {
    if (window.grecaptcha?.render) return resolve(window.grecaptcha)
    window.__rcLoaded = () => resolve(window.grecaptcha)
    const s = document.createElement('script')
    s.src = 'https://www.google.com/recaptcha/api.js?onload=__rcLoaded&render=explicit'
    s.async = true
    s.onerror = () => {
      scriptPromise = null
      reject(new Error('reCAPTCHA failed to load'))
    }
    document.head.appendChild(s)
  }))

export default function Recaptcha({ siteKey, onChange, ref }) {
  const box = useRef(null)
  const widget = useRef(null)

  useImperativeHandle(ref, () => ({
    reset() {
      if (widget.current !== null) window.grecaptcha?.reset(widget.current)
      onChange('')
    },
  }))

  useEffect(() => {
    let cancelled = false
    loadScript()
      .then((g) => {
        if (cancelled || !box.current || widget.current !== null) return
        widget.current = g.render(box.current, {
          sitekey: siteKey,
          callback: (token) => onChange(token),
          'expired-callback': () => onChange(''),
          'error-callback': () => onChange(''),
        })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  return <div className="captcha-box" ref={box} />
}
