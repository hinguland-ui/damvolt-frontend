import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Clock, Mail, MapPin, Menu, Phone } from 'lucide-react'
import Brand from './Brand'
import Icon from './Icon'
import { company, telLink } from '../data/site'
import { categories, services } from '../data/services'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', mega: true },
  { to: '/industries', label: 'Industries' },
  { to: '/contact', label: 'Contact' },
]

// Shorter names for the menu only.
const short = (t) => t.replace(' (PLC, VFD, HMI)', '').replace('Instrumental ', '').replace(' Engineering', '')

export default function Header({ onMenu }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    document.activeElement?.blur?.()
  }, [pathname])

  // Small delay on close so moving the mouse into the panel doesn't flicker it shut.
  const open = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const close = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 220)
  }

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-group">
            <a href={telLink(company.phones[0])}>
              <Phone size={14} /> {company.phones[0]}
            </a>
            <a href={`mailto:${company.email}`}>
              <Mail size={14} /> {company.email}
            </a>
          </div>
          <div className="topbar-group">
            <span>
              <Clock size={14} /> {company.hours}
            </span>
            <span>
              <MapPin size={14} /> Sector-7, Noida
            </span>
          </div>
        </div>
      </div>

      <header className={`header${scrolled || megaOpen ? ' scrolled' : ''}`}>
        <div className="container">
          <Brand />

          <nav className="nav" aria-label="Main">
            {links.map((l) =>
              l.mega ? (
                <div
                  className={`dropdown${megaOpen ? ' open' : ''}`}
                  key={l.to}
                  onMouseEnter={open}
                  onMouseLeave={close}
                  onFocus={open}
                  onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
                  onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                >
                  <NavLink to={l.to} className="nav-link" aria-expanded={megaOpen} aria-haspopup="true">
                    {l.label} <ChevronDown size={15} className="chev" />
                  </NavLink>

                  {/* Always mounted; shown/hidden with CSS so the first open is instant. */}
                  <div className="mega" aria-hidden={!megaOpen}>
                    <div className="mega-panel">
                      <div className="mega-inner">
                        <div className="mega-cols">
                          {categories.filter((g) => services.some((s) => s.category === g.key)).map((g) => (
                            <div className="mega-col" key={g.key}>
                              <span className="mega-title">{g.key}</span>
                              {services
                                .filter((s) => s.category === g.key)
                                .map((s) => (
                                  <Link to={`/services/${s.slug}`} key={s.slug} className="mega-link" tabIndex={megaOpen ? 0 : -1}>
                                    <span className="ic">
                                      <Icon name={s.icon} size={18} />
                                    </span>
                                    {short(s.title)}
                                  </Link>
                                ))}
                            </div>
                          ))}
                        </div>
                        <Link to="/contact" className="mega-promo" tabIndex={megaOpen ? 0 : -1}>
                          <img src="/images/switchgear.webp" alt="" loading="lazy" decoding="async" />
                          <span className="mega-promo-body">
                            <strong>Planning a project?</strong>
                            <span>Free site visit &amp; quotation</span>
                            <span className="link-arrow">
                              Get a quote <ArrowRight size={15} />
                            </span>
                          </span>
                        </Link>
                      </div>
                      <div className="mega-foot">
                        <span>Turnkey electrical &amp; automation solutions</span>
                        <Link to="/services" className="link-arrow" tabIndex={megaOpen ? 0 : -1}>
                          View all services <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary btn-sm header-cta">
              Get a Quote
            </Link>
            <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mega-overlay${megaOpen ? ' show' : ''}`} onClick={() => setMegaOpen(false)} aria-hidden="true" />
    </>
  )
}
