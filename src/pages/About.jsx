import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, Gem, Target } from 'lucide-react'
import Icon from '../components/Icon'
import Img from '../components/Img'
import StatsRow from '../components/StatsRow'
import { CTABanner, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { process, stats, whyUs } from '../data/site'

const values = [
  {
    icon: Target,
    title: 'Our mission',
    text: 'To deliver safe, efficient and reliable electrical and automation solutions that keep our clients’ operations running without interruption.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    text: 'To be one of India’s most trusted electrical engineering companies, known for quality workmanship, technical excellence and integrity.',
  },
  {
    icon: Gem,
    title: 'Our values',
    text: 'Safety above everything, honesty in every quotation, quality in every connection and commitment to every deadline.',
  },
]

export default function About() {
  usePageMeta('About Us', 'Learn about Damvolt Engineering Services Private Limited — a complete electrical and automation solutions company based in Noida & New Delhi.', 'about')

  return (
    <>
      <PageHero
        title="About Damvolt Engineering Services Private Limited"
        text="A complete electrical solutions provider making industrial electrical systems efficient and safe."
        image="/images/engineers-site.webp"
        crumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2>Engineering power. Delivering trust.</h2>
            <p className="lead">
              Damvolt Engineering Services Private Limited is headquartered in Noida, Uttar Pradesh, with its registered office in
              New Delhi.
            </p>
            <p>
              We deal in electrical equipment, industrial automation, site testing and commissioning. From a single
              distribution panel to complete plant electrification, our engineers manage the full lifecycle — load study,
              design, supply of genuine equipment, installation, testing, commissioning and after-sales maintenance.
            </p>
            <ul className="check-list">
              {['Experienced engineering team', 'Genuine OEM equipment', 'Turnkey project execution', 'Prompt after-sales service'].map((t) => (
                <li key={t}>
                  <CheckCircle2 size={20} strokeWidth={1.75} /> {t}
                </li>
              ))}
            </ul>
            <Link to="/services" className="btn btn-primary">
              Explore services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="img-stack reveal">
            <Img className="split-img tall" src="/images/commissioning.webp" alt="Damvolt engineer at an electrical panel" />
            <div className="img-badge">
              <b>10+</b>
              <span>
                Years of
                <br />
                excellence
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead center eyebrow="Purpose" title="Mission, vision & values" />
          <div className="values">
            {values.map(({ icon: I, title, text }) => (
              <div className="value reveal" key={title}>
                <span className="feat-ic">
                  <I size={22} strokeWidth={1.75} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StatsRow stats={stats} />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Our strengths" title="Why clients choose Damvolt" text="Every project is backed by engineering discipline and a commitment to safety." />
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

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="How we deliver" />
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

      <section className="section alt">
        <div className="container split">
          <Img className="split-img reveal" src="/images/team-meeting.webp" alt="Damvolt team planning a project" />
          <div className="reveal">
            <span className="eyebrow">Our team</span>
            <h2>Skilled people behind every connection.</h2>
            <p>
              Our team includes electrical engineers, PLC and automation programmers, panel builders, cable jointers,
              testing engineers and site supervisors. Regular training keeps them current with the latest equipment and
              safety practices.
            </p>
            <Link to="/careers" className="btn btn-secondary">
              Join our team <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner spaced />
    </>
  )
}
