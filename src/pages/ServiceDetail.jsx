import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight, Mail, Phone } from 'lucide-react'
import Carousel from '../components/Carousel'
import Img from '../components/Img'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { CTABanner, PageHero, SectionHead, ServiceCard, usePageMeta } from '../components/ui'
import { company, telLink } from '../data/site'
import { getService, services } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const s = getService(slug)
  usePageMeta(s?.title, s?.metaDescription || s?.short, undefined, s?.image, s?.metaTitle)
  if (!s) return <Navigate to="/services" replace />

  const related = [...services.filter((x) => x.slug !== s.slug && x.category === s.category), ...services.filter((x) => x.category !== s.category)]

  return (
    <>
      <PageHero title={s.title} text={s.short} image={s.image} crumbs={[{ label: 'Services', to: '/services' }, { label: s.title }]} />

      <section className="section">
        <div className="container detail">
          <article>
            <Img className="detail-img reveal" src={s.image} alt={s.title} />
            {s.category && <span className="eyebrow">{s.category} services</span>}
            <h2>Overview</h2>
            <div
              className="rich"
              // intro is sanitised HTML from the admin editor; older plain-text entries are wrapped in a paragraph
              dangerouslySetInnerHTML={{ __html: /<[a-z][\s\S]*>/i.test(s.intro || '') ? s.intro : `<p>${s.intro || ''}</p>` }}
              onClick={(e) => {
                const href = e.target.closest('a')?.getAttribute('href')
                if (href?.startsWith('/') && !href.startsWith('//')) {
                  e.preventDefault()
                  navigate(href)
                }
              }}
            />

            <h3>What we offer</h3>
            <ul className="offer-list">
              {s.offerings.map((o) => (
                <li key={o}>
                  <CheckCircle2 size={19} strokeWidth={1.75} /> {o}
                </li>
              ))}
            </ul>

            <h3>Key benefits</h3>
            <div className="benefit-grid">
              {s.benefits.map((b, i) => (
                <div className="benefit reveal" key={b.title}>
                  <span className="num">0{i + 1}</span>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>

            <h3>Applications</h3>
            <div className="chips">
              {s.applications.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </article>

          <aside className="aside">
            <div className="aside-cta">
              <h4>Need {s.title.split(' (')[0].toLowerCase()}?</h4>
              <p>Talk to our engineers for a free consultation and quotation.</p>
              <a className="phone" href={telLink(company.phones[0])}>
                <Phone size={18} /> {company.phones[0]}
              </a>
              <div className="btns">
                <Link to={`/contact?service=${s.slug}`} className="btn btn-white">
                  <Mail size={17} /> Send enquiry
                </Link>
                <a
                  className="btn btn-outline-white"
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello, I need information about ${s.title}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={17} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="aside-box">
              <h4>All services</h4>
              <div className="aside-links">
                {services.map((x) => (
                  <Link key={x.slug} to={`/services/${x.slug}`} className={x.slug === s.slug ? 'active' : ''}>
                    {x.title} <ChevronRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="sec-head-row">
            <SectionHead eyebrow="Explore more" title="Related services" />
            <Link to="/services" className="link-arrow reveal">
              All services <ArrowRight size={16} />
            </Link>
          </div>
          <Carousel perView={[3, 2, 1.15]} label="Related services">
            {related.map((r) => (
              <ServiceCard key={r.slug} s={r} reveal={false} />
            ))}
          </Carousel>
        </div>
      </section>

      <CTABanner spaced />
    </>
  )
}
