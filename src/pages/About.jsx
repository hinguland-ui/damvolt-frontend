import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Eye, Gem, Target } from 'lucide-react'
import Icon from '../components/Icon'
import Img from '../components/Img'
import { CTABanner, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { company, process, whyUs } from '../data/site'

const values = [
  { icon: Target, title: 'Our mission', text: 'To deliver safe, neat and on-time electrical and instrumentation work that keeps our clients’ plants running.' },
  { icon: Eye, title: 'Our vision', text: 'To be a trusted E&I contractor for India’s industrial plants, known for quality workmanship and integrity.' },
  { icon: Gem, title: 'Our values', text: 'Safety above everything, honesty in every quotation and commitment to every deadline.' },
]

export default function About() {
  usePageMeta('About Us', 'Damvolt is an electrical and instrumentation contractor for cement, power, steel and refinery plants — erection, testing, shutdown work and manpower supply.', 'about')

  return (
    <>
      <PageHero
        title="About Damvolt"
        text="An electrical and instrumentation contractor for heavy industrial plants."
        image="/images/13.jpeg"
        crumbs={[{ label: 'About' }]}
      />

      <section className="section">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow">Who we are</span>
            <h2>Engineering power. Delivering trust.</h2>
            <p className="lead">Damvolt works on electrical and instrumentation (E&amp;I) projects in cement plants, power plants, steel plants, refineries and power grid projects.</p>
            <p>
              Our crew handles panel, transformer and cable tray erection, instrument installation, switchgear and switchboard work,
              meggering tests, automation hook-up and shutdown jobs. We also supply skilled manpower to plants. Our office is at {company.offices[0]?.city}.
            </p>
            <ul className="check-list">
              {['Experienced site crew', 'Safety-first execution', 'Turnkey E&I project work', 'Quick response by call or WhatsApp'].map((t) => (
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
            <Img className="split-img tall" src="/images/6.jpeg" alt="Plant where Damvolt carries out E&I work" />
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
          <SectionHead eyebrow="Our strengths" title="Why clients choose Damvolt" text="Every project is backed by discipline and a commitment to safety." />
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

      <section className="section alt">
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

      <CTABanner spaced />
    </>
  )
}
