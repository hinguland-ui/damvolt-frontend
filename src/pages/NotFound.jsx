import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import Deco from '../components/Deco'
import Icon from '../components/Icon'
import { usePageMeta } from '../components/ui'
import { company, telLink } from '../data/site'
import { services } from '../data/services'

const popular = [
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'All services' },
  { to: '/industries', label: 'Industries' },
  { to: '/contact', label: 'Contact' },
]

export default function NotFound() {
  usePageMeta('Page Not Found')
  const { pathname } = useLocation()

  // Tell search engines not to index this 404 view; removed again when leaving the page.
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex'
    document.head.appendChild(m)
    return () => m.remove()
  }, [])

  return (
    <section className="notfound has-deco">
      <Deco type="circuit" style={{ width: 620, right: -120, top: -40 }} />
      <Deco type="rings" style={{ width: 420, left: -160, bottom: -120 }} />
      <div className="container" style={{ maxWidth: 820 }}>
        <span className="eyebrow">Error 404</span>
        <b>404</b>
        <h2>This page couldn’t be found.</h2>
        <p className="muted">
          The link <code className="nf-path">{pathname}</code> may be broken, or the page may have been moved.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={17} /> Back to home
          </Link>
          <a href={telLink(company.phones[0])} className="btn btn-secondary">
            <Phone size={17} /> {company.phones[0]}
          </a>
        </div>

        <div className="nf-links">
          <span className="mega-title">Popular pages</span>
          <div className="nf-chips">
            {popular.map((p) => (
              <Link key={p.to} to={p.to} className="chip">
                {p.label}
              </Link>
            ))}
          </div>
          <span className="mega-title" style={{ marginTop: 20 }}>
            Our services
          </span>
          <div className="nf-grid">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="mega-link">
                <span className="ic">
                  <Icon name={s.icon} size={18} />
                </span>
                {s.title}
                <ArrowRight size={15} className="nf-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
