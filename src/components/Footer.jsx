import { Link } from 'react-router-dom'
import { Clock, FileText, Mail, MapPin, Phone } from 'lucide-react'
import Brand from './Brand'
import Deco from './Deco'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './WhatsAppIcon'
import { company, developer, legalPages, telLink } from '../data/site'

// Only the networks whose link is filled in (admin → Site Settings → Social Links) are shown.
const NETWORKS = [
  ['facebook', 'Facebook', FacebookIcon],
  ['instagram', 'Instagram', InstagramIcon],
  ['linkedin', 'LinkedIn', LinkedinIcon],
  ['youtube', 'YouTube', YoutubeIcon],
]

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = NETWORKS.filter(([key]) => /^https?:\/\//i.test((company.social?.[key] || '').trim()))
  return (
    <footer className="footer defer">
      <Deco type="tower" className="on-dark" style={{ width: 260, right: '4%', bottom: 40 }} />
      <div className="container footer-top">
        <div>
          <div className="brand-chip">
            <Brand light />
          </div>
          <p>{company.description}</p>
          {socials.length > 0 && (
            <div className="socials">
              {socials.map(([key, label, Icon]) => (
                <a href={company.social[key]} aria-label={label} key={key} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3>Company</h3>
          <ul className="flinks">
            {[
              ['/about', 'About Us'],
              ['/services', 'Services'],
              ['/industries', 'Industries'],
              ['/faq', 'FAQs'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Legal Pages</h3>
          <ul className="flinks">
            {legalPages.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <div className="fcontact">
            {company.offices.map((o) => (
              <div key={o.label}>
                <MapPin size={17} />
                <span>
                  <span style={{ color: '#fff' }}>{o.label}</span>
                  <br />
                  {o.address}
                </span>
              </div>
            ))}
            <div>
              <Phone size={17} />
              <span>
                {company.phones.map((p) => (
                  <a key={p} href={telLink(p)} style={{ display: 'block' }}>
                    {p}
                  </a>
                ))}
              </span>
            </div>
            <div>
              <Mail size={17} />
              <span>
                {company.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} style={{ display: 'block' }}>
                    {e}
                  </a>
                ))}
              </span>
            </div>
            <div>
              <Clock size={17} />
              <span>{company.hours}</span>
            </div>
            {company.gst && (
              <div>
                <FileText size={17} />
                <span>GSTIN: {company.gst}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>
            © {year} {company.name}. All rights reserved.
          </span>
          <span className="credit">
            Designed &amp; Developed by{' '}
            {developer.url ? (
              <a href={developer.url} target="_blank" rel="noreferrer">
                {developer.name}
              </a>
            ) : (
              <b>{developer.name}</b>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}
