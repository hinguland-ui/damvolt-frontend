// Live content store, filled from the Laravel API (see lib/api.js) before the app renders.
// The exports are stable objects/arrays that get *mutated* by hydrate(), so every component
// that imports them keeps working without any prop-drilling or context.

export const company = {}
// Footer credit is fixed in code on purpose — it is not editable from the admin panel.
export const developer = { name: 'Hinguland', url: 'https://hinguland.com' }
export const home = { seo: {}, slides: [], trust: [], about: {}, cta: {} }
export const stats = []
export const whyUs = []
export const process = []
export const faqs = []
export const services = []
export const categories = []
export const industries = []
export const reviews = []
export const reviewRows = [[], []]
export const legalPages = []
export const pageSeo = {}

const replace = (arr, next = []) => {
  arr.length = 0
  arr.push(...next)
}
const assign = (obj, next = {}) => {
  Object.keys(obj).forEach((k) => delete obj[k])
  Object.assign(obj, next)
}

export function hydrate(d) {
  const site = d.site || {}
  assign(company, { ...site, email: site.emails?.[0] || '', emails: site.emails || [], phones: site.phones || [], offices: site.offices || [] })

  const h = d.home || {}
  assign(home, h)
  home.seo ||= {}
  home.slides ||= []
  home.trust ||= []
  home.about ||= {}
  home.cta ||= {}
  for (const k of ['servicesHead', 'statsHead', 'whyHead', 'processHead', 'industriesHead', 'reviewsHead']) home[k] ||= {}

  replace(stats, h.stats)
  replace(whyUs, h.why)
  replace(process, h.process)
  replace(faqs, d.faqs)
  replace(services, d.services)
  replace(categories, d.categories)
  replace(industries, d.industries)
  replace(reviews, d.reviews)
  const half = Math.ceil(reviews.length / 2)
  replace(reviewRows, [reviews.slice(0, half), reviews.slice(half)])
  replace(legalPages, d.legal)
  assign(pageSeo, d.pageSeo)

  applyHead()
}

export function setLink(rel, href, extra = {}) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]${extra.as ? `[as="${extra.as}"]` : ''}`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
  }
  el.href = href
  if (!el.isConnected) document.head.appendChild(el)
}

export function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Favicon, share image and first-slide preload come from the admin panel too.
function applyHead() {
  setLink('icon', company.favicon)
  setLink('apple-touch-icon', company.favicon)
  setMeta('property', 'og:image', home.seo.ogImage || home.slides[0]?.image)
  setMeta('name', 'apple-mobile-web-app-title', company.shortName)
  document.head.querySelectorAll('link[rel="preload"][as="image"]').forEach((l) => l.remove()) // old static preload from index.html
  if (home.slides[0]?.image) setLink('preload', home.slides[0].image, { as: 'image', fetchpriority: 'high' })
  applyStructuredData()
}

// schema.org Organization — lets Google show the company name, logo and contact details.
function applyStructuredData() {
  const office = company.offices?.[0]
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: location.origin,
    logo: company.logo || undefined,
    email: company.email || undefined,
    telephone: company.phones?.[0] || undefined,
    address: office?.address ? { '@type': 'PostalAddress', streetAddress: office.address, addressCountry: 'IN' } : undefined,
    sameAs: Object.values(company.social || {}).filter((u) => /^https?:\/\//.test(u)),
  }
  let el = document.getElementById('ld-org')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'ld-org'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}
