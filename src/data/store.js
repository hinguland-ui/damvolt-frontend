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
  // Favicon: use the uploaded one only if it really loads, otherwise keep the one that ships with the site.
  if (company.favicon) {
    // after the page has loaded, so the small icon never competes with the banner picture
    const swap = () => {
      const probe = new Image()
      probe.onload = () => {
        setLink('icon', company.favicon)
        setLink('apple-touch-icon', company.favicon)
      }
      probe.src = company.favicon
    }
    if (document.readyState === 'complete') swap()
    else addEventListener('load', swap, { once: true })
  }
  setMeta('property', 'og:image', home.seo.ogImage || `${location.origin}/og-image.png`)
  setMeta('name', 'apple-mobile-web-app-title', company.shortName)
  // drop a stale preload (a banner that has since been replaced), keep the one that is already downloading
  document.head.querySelectorAll('link[rel="preload"][as="image"]').forEach((l) => l.getAttribute('href') !== home.slides[0]?.image && l.remove())
  if (home.slides[0]?.image) {
    if (!document.head.querySelector(`link[rel="preload"][as="image"][href="${home.slides[0].image}"]`)) setLink('preload', home.slides[0].image, { as: 'image', fetchpriority: 'high' })
    try {
      localStorage.setItem('damvolt:hero', home.slides[0].image) // index.html preloads it on the next visit
    } catch {
      /* storage blocked — fine */
    }
  }
  applyStructuredData()
}

// JSON-LD helper: one <script id="…"> per block, replaced on every call (page-specific blocks are removed with removeJsonLd).
export function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}
export const removeJsonLd = (id) => document.getElementById(id)?.remove()

// schema.org Organization + WebSite — lets Google show the company name, logo, contact details and address.
function applyStructuredData() {
  const origin = location.origin
  const offices = company.offices || []
  const same = Object.values(company.social || {}).filter((u) => /^https?:\/\//.test(u))
  setJsonLd('ld-org', {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${origin}/#org`,
        name: company.name,
        alternateName: company.shortName || undefined,
        url: `${origin}/`,
        logo: company.logo || undefined,
        image: `${origin}/og-image.png`,
        description: company.description || undefined,
        email: company.email || undefined,
        telephone: company.phones?.[0] || undefined,
        openingHours: company.hours || undefined,
        address: offices.map((o) => ({ '@type': 'PostalAddress', streetAddress: o.address, addressCountry: 'IN' })),
        areaServed: ['Noida', 'Delhi NCR', 'India'],
        sameAs: same.length ? same : undefined,
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: `${origin}/`,
        // Google's site name in search results: the short brand first, the full legal name as an alternative.
        name: company.shortName || company.name,
        alternateName: [...new Set([company.name, 'Damvolt Engineering'].filter((n) => n && n !== (company.shortName || company.name)))],
        inLanguage: 'en-IN',
        publisher: { '@id': `${origin}/#org` },
      },
      // The main pages, as a hint for the links Google lists under the company name.
      ...[
        ['About Us', '/about'],
        ['Services', '/services'],
        ['Industries', '/industries'],
        ['FAQs', '/faq'],
        ['Contact Us', '/contact'],
        ...services.slice(0, 6).map((s) => [s.title, `/services/${s.slug}`]),
      ].map(([name, path]) => ({ '@type': 'SiteNavigationElement', name, url: `${origin}${path}` })),
    ],
  })
}
