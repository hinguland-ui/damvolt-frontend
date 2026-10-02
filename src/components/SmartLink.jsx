import { Link } from 'react-router-dom'

// Admin-entered links can be internal (/contact) or external (https://…, tel:, mailto:).
export default function SmartLink({ to, children, ...rest }) {
  if (/^(https?:|mailto:|tel:|#)/.test(to)) {
    const external = /^https?:/.test(to)
    return (
      <a href={to} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
