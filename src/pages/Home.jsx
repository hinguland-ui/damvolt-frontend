import { ArrowRight, CheckCircle2, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Deco from '../components/Deco'
import LazyMount from '../components/LazyMount'
import ReviewMarquee from '../components/ReviewMarquee'
import HeroSlider from '../components/HeroSlider'
import Carousel from '../components/Carousel'
import Icon from '../components/Icon'
import Img from '../components/Img'
import SmartLink from '../components/SmartLink'
import StatsRow from '../components/StatsRow'
import { CTABanner, LocationSection, SectionHead, ServiceCard, usePageMeta } from '../components/ui'
import { home, process, stats, whyUs } from '../data/site'
import { industries, services } from '../data/services'
import { reviews } from '../data/store'

// Every piece of text, image and link on this page comes from the admin panel (Home Page tabs).
export default function Home() {
  usePageMeta(null)
  const { trust, about, servicesHead, statsHead, whyHead, processHead, industriesHead, reviewsHead } = home

  return (
    <>
      <HeroSlider />

      {trust.length > 0 && (
        <section className="trust">
          <div className="container">
            {trust.map((t) => (
              <div className="trust-item" key={t.title}>
                <Icon name={t.icon} size={26} strokeWidth={1.75} />
                <div>
                  <strong>{t.title}</strong>
                  <small>{t.text}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      <section className="section has-deco">
        <Deco type="rings" style={{ width: 520, right: -160, top: 40 }} />
        <div className="container split">
          <div className="img-stack reveal">
            <Img className="split-img tall" src={about.image} alt={about.title} fallback="/images/7.jpeg" />
            {about.badgeValue && (
              <div className="img-badge">
                <b>{about.badgeValue}</b>
                <span>{about.badgeLabel}</span>
              </div>
            )}
          </div>
          <div className="reveal">
            {about.eyebrow && <span className="eyebrow">{about.eyebrow}</span>}
            <h2>{about.title}</h2>
            {about.lead && <p className="lead">{about.lead}</p>}
            {about.text && <p>{about.text}</p>}
            {about.points?.length > 0 && (
              <ul className="check-list">
                {about.points.map((t) => (
                  <li key={t}>
                    <CheckCircle2 size={20} strokeWidth={1.75} /> {t}
                  </li>
                ))}
              </ul>
            )}
            {about.buttonLabel && (
              <SmartLink to={about.buttonUrl || '/about'} className="btn btn-secondary">
                {about.buttonLabel} <ArrowRight size={17} />
              </SmartLink>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="section alt has-deco">
          <Deco type="circuit" style={{ width: 560, right: -60, top: -20 }} />
          <div className="container">
            <div className="sec-head-row">
              <SectionHead eyebrow={servicesHead.eyebrow} title={servicesHead.title} text={servicesHead.text} />
              <Link to="/services" className="link-arrow reveal">
                {servicesHead.link_label || 'View all services'} <ArrowRight size={16} />
              </Link>
            </div>
            <Carousel perView={[4, 2, 1.15]} label="Our services">
              {services.map((s) => (
                <ServiceCard key={s.slug} s={s} reveal={false} />
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <section className="section has-deco defer">
          <Deco type="wave" style={{ width: 720, left: -80, bottom: 30 }} />
          <div className="container">
            <SectionHead eyebrow={statsHead.eyebrow} title={statsHead.title} />
            <StatsRow stats={stats} />
          </div>
        </section>
      )}

      {/* Why us */}
      {whyUs.length > 0 && (
        <section className="section alt has-deco defer">
          <Deco type="tower" style={{ width: 300, right: 40, top: 30 }} />
          <div className="container">
            <SectionHead eyebrow={whyHead.eyebrow} title={whyHead.title} text={whyHead.text} />
            <div className="feat-grid">
              {whyUs.map((w) => (
                <div className="feat reveal" key={w.title}>
                  <span className="feat-ic">
                    <Icon name={w.icon} size={22} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {process.length > 0 && (
        <section className="section has-deco defer">
          <Deco type="bolt" style={{ width: 120, right: '8%', top: 60 }} />
          <div className="container">
            <SectionHead eyebrow={processHead.eyebrow} title={processHead.title} />
            <div className="process">
              {process.map((p) => (
                <div className="step reveal" key={p.step}>
                  <span className="step-num">STEP {p.step}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industries */}
      {industries.length > 0 && (
        <section className="section alt has-deco">
          <Deco type="circuit" style={{ width: 520, left: -120, bottom: -60, transform: 'scaleX(-1)' }} />
          <div className="container">
            <div className="sec-head-row">
              <SectionHead eyebrow={industriesHead.eyebrow} title={industriesHead.title} text={industriesHead.text} />
              <Link to="/industries" className="link-arrow reveal">
                {industriesHead.link_label || 'All industries'} <ArrowRight size={16} />
              </Link>
            </div>
            <Carousel perView={[4, 3, 1.6]} label="Industries">
              {industries.map((i) => (
                <div className="ind-card" key={i.title}>
                  <Img src={i.image} alt={i.title} draggable="false" />
                  <h3>
                    <Icon name={i.icon} size={18} /> {i.title}
                  </h3>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {reviews.length > 0 && (
      <section className="section reviews has-deco defer">
        <Deco type="rings" style={{ width: 420, left: -140, top: -60 }} />
        <div className="container">
          <div className="sec-head center reveal">
            {reviewsHead.badge && (
              <span className="pill-badge">
                <span className="pill-ic">
                  <Star size={13} fill="currentColor" strokeWidth={0} />
                </span>
                {reviewsHead.badge}
              </span>
            )}
            <h2>{reviewsHead.title}</h2>
          </div>
        </div>
        <LazyMount minHeight={460}>
          <ReviewMarquee />
        </LazyMount>
      </section>
      )}

      <LocationSection alt />

      <CTABanner spaced />
    </>
  )
}
