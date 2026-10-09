import { CTABanner, PageHero, SectionHead, ServiceCard, usePageMeta } from '../components/ui'
import { process } from '../data/site'
import { services } from '../data/services'

export default function Services() {
  usePageMeta('Our Services', 'E&I complete project work, panel, transformer and cable tray erection, instrument installation, meggering testing, switchgear, automation, power grid and electrical building work.', 'services')

  return (
    <>
      <PageHero
        title="Our services"
        text="Electrical and instrumentation erection, testing and project work — executed by one experienced team."
        image="/images/10.jpeg"
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section">
        <div className="container">
          <div className="svc-grid">
            {services.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="How we work" title="From enquiry to handover" />
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

      <CTABanner />
    </>
  )
}
