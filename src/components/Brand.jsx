import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Brand({ light = false }) {
  const src = (light ? company.footerLogo : company.logo) || (light ? '/footer-logo.png' : '/logo.png')
  return (
    <Link to="/" className={`brand${light ? ' light' : ''}`} aria-label={`${company.name} — Home`}>
      <img src={src} alt={company.name} width="156" height="52" />
    </Link>
  )
}
