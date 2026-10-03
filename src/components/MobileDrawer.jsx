import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Phone, X } from 'lucide-react'
import Brand from './Brand'
import { WhatsAppIcon } from './WhatsAppIcon'
import { company, telLink } from '../data/site'
import { services } from '../data/services'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { services: true },
  { to: '/industries', label: 'Industries' },
  { to: '/faq', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileDrawer({ open, onClose }) {
  const { pathname } = useLocation()
  const [svcOpen, setSvcOpen] = useState(pathname.startsWith('/services'))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const cls = ({ isActive }) => `drawer-link${isActive ? ' active' : ''}`

  return (
    <>
      <div className={`drawer-backdrop${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`drawer${open ? ' open' : ''}`} aria-hidden={!open} aria-label="Menu">
        <div className="drawer-head">
          <Brand />
          <button className="menu-btn" style={{ display: 'grid' }} onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="drawer-body">
          {links.map((l) =>
            l.services ? (
              <div className={`drawer-acc${svcOpen ? ' open' : ''}`} key="services">
                <button className="drawer-acc-btn" onClick={() => setSvcOpen((o) => !o)} aria-expanded={svcOpen}>
                  Services <ChevronDown size={20} />
                </button>
                <div className="drawer-acc-panel">
                  <div>
                    <NavLink to="/services" end onClick={onClose}>
                      All Services
                    </NavLink>
                    {services.map((s) => (
                      <NavLink key={s.slug} to={`/services/${s.slug}`} onClick={onClose}>
                        {s.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink key={l.to} to={l.to} end={l.end} className={cls} onClick={onClose}>
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="drawer-foot">
          <a className="btn btn-primary" href={telLink(company.phones[0])}>
            <Phone size={17} /> Call
          </a>
          <a className="btn btn-wa" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        </div>
      </aside>
    </>
  )
}
