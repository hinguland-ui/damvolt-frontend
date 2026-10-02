import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import { WhatsAppIcon } from './WhatsAppIcon'
import { company } from '../data/site'

// Floating button that opens a small chat popup. The visitor types a message
// here and it is handed to WhatsApp (wa.me) pre-filled — there is no backend.
export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const box = useRef(null)
  const input = useRef(null)

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => input.current?.focus(), 250)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => {
      if (box.current && !box.current.contains(e.target) && !e.target.closest('.wa-float')) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const send = (e) => {
    e.preventDefault()
    const msg = text.trim()
    if (!msg) return
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    setText('')
    setOpen(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) send(e)
  }

  return (
    <>
      <div className={`wa-chat${open ? ' open' : ''}`} ref={box} role="dialog" aria-label="Chat on WhatsApp" aria-hidden={!open}>
        <div className="wa-chat-head">
          <span className="wa-chat-avatar">
            <img src="/fav.png" alt="" />
          </span>
          <div>
            <strong>{company.shortName} Engineering</strong>
            <small>Typically replies within a few hours</small>
          </div>
          <button type="button" className="wa-chat-close" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <X size={18} />
          </button>
        </div>
        <div className="wa-chat-body">
          <div className="wa-bubble">
            Hello! 👋 How can we help you today? Type your message below and we’ll continue on WhatsApp.
          </div>
        </div>
        <form className="wa-chat-form" onSubmit={send}>
          <textarea
            ref={input}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message…"
            aria-label="Your message"
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" disabled={!text.trim()} aria-label="Send on WhatsApp" tabIndex={open ? 0 : -1}>
            <Send size={19} />
          </button>
        </form>
        <p className="wa-chat-note">Opens WhatsApp with your message ready to send.</p>
      </div>

      <button
        type="button"
        className={`wa-float${open ? ' open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
        aria-expanded={open}
      >
        <span className="wa-ic">
          <WhatsAppIcon size={26} />
        </span>
        <X size={24} className="wa-x" />
      </button>
    </>
  )
}
