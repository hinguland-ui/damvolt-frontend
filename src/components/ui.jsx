import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Phone, Plus } from 'lucide-react'
import Icon from './Icon'
import Img from './Img'
import MapEmbed from './MapEmbed'
import Deco from './Deco'
import { company, home, pageSeo, telLink } from '../data/site'
import { setLink, setMeta } from '../data/store'

// Page <title> + meta tags. Home (title === null) uses the SEO tab of the admin panel; the other main pages use
// Page SEO (key = 'about', 'services' …); services and legal pages pass their own title / description / image.
export function usePageMeta(title, description, key, image, exactTitle) {
  useEffect(() => {
    const seo = home.seo || {}
    const custom = (key && pageSeo[key]) || {}
    const isHome = title == null
    const fullTitle = exactTitle || custom.title || (isHome ? seo.title || company.name : `${title} | ${company.name}`)
    const desc = custom.description || description || (isHome ? seo.description : '') || company.description
    const url = location.origin + (location.pathname.replace(/\/+$/, '') || '/')
    const picture = image || (isHome ? seo.ogImage : '') || seo.ogImage || home.slides?.[0]?.image

    document.title = fullTitle
    setMeta('name', 'description', desc)
    if (isHome && seo.keywords) setMeta('name', 'keywords', seo.keywords)
    setLink('canonical', url)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', company.name)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', picture)
    setMeta('name', 'twitter:card', picture ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setMeta('name', 'twitter:image', picture)
  }, [title, description, key, image, exactTitle])
}

export function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <div className={`sec-head reveal${center ? ' center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function PageHero({ title, text, image, crumbs = [] }) {
  return (
    <section className="page-hero">
      <Img src={image} eager />
      <Deco type="circuit" className="on-dark" style={{ width: 620, right: -80, bottom: -90 }} />
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <ChevronRight size={14} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="current">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  )
}

export function ServiceCard({ s, reveal = true }) {
  return (
    <Link to={`/services/${s.slug}`} className={`svc-card${reveal ? ' reveal' : ''}`} draggable="false">
      <Img src={s.image} alt={s.title} draggable="false" />
      <div className="svc-body">
        <div className="svc-meta">
          <span className="ic">
            <Icon name={s.icon} size={16} />
          </span>
          {s.category}
        </div>
        <h3>{s.title}</h3>
        <p>{s.short}</p>
        <span className="link-arrow">
          Learn more <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}

export function CTABanner({ title = home.cta.title, text = home.cta.text, spaced = false }) {
  return (
    <section className={`section${spaced ? '' : ' tight'}`}>
      <div className="container">
        <div className="cta reveal">
          <Deco type="circuit" className="on-dark" style={{ width: 560, right: -120, top: -80 }} />
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-white">
              Get a free quote <ArrowRight size={17} />
            </Link>
            <a href={telLink(company.phones[0])} className="btn btn-outline-white">
              <Phone size={17} /> Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])
  return (
    <b ref={ref}>
      {n}
      <em>{suffix}</em>
    </b>
  )
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {items.map((f, i) => (
        <div className={`faq-item${open === i ? ' open' : ''}`} key={f.q}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}
            <span className="pm">
              <Plus size={16} />
            </span>
          </button>
          <div className="faq-a">
            <div>
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LocationSection({ alt = false }) {
  return (
    <section className={`section${alt ? ' alt' : ''}`}>
      <div className="container">
        <SectionHead eyebrow="Visit us" title="Our offices" text="Meet our team in Noida or reach our registered office in New Delhi." />
        <div className="location">
          <div className="office-list">
            {company.offices.map((o) => (
              <div className="office reveal" key={o.label}>
                <span className="label">{o.label}</span>
                <p>{o.address}</p>
                <a href={o.mapLink} target="_blank" rel="noreferrer" className="link-arrow">
                  Get directions <ArrowRight size={16} />
                </a>
              </div>
            ))}
            <div className="office reveal">
              <span className="label">Talk to us</span>
              <p>
                {company.phones.map((p) => (
                  <span key={p} style={{ display: 'block' }}>
                    {p}
                  </span>
                ))}
                {company.emails.map((e) => (
                  <span key={e} style={{ display: 'block' }}>
                    {e}
                  </span>
                ))}
              </p>
              <span className="muted" style={{ fontSize: 14.5 }}>
                {company.hours}
              </span>
            </div>
          </div>
          <MapEmbed />
        </div>
      </div>
    </section>
  )
}

export function PageSkeleton() {
  return (
    <div className="page-skel" aria-busy="true" aria-label="Loading">
      <div className="skel skel-hero" />
      <div className="container section">
        <div className="skel" style={{ width: 140, height: 14, marginBottom: 18 }} />
        <div className="skel" style={{ width: '60%', height: 36, marginBottom: 14 }} />
        <div className="skel" style={{ width: '40%', height: 18, marginBottom: 48 }} />
        <div className="row">
          <div className="skel card" />
          <div className="skel card" />
          <div className="skel card" />
        </div>
      </div>
    </div>
  )
}
