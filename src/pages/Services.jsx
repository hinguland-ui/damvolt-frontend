import { CTABanner, Faq, PageHero, SectionHead, ServiceCard, usePageMeta } from '../components/ui'
import { faqs, process } from '../data/site'
import { categories, services } from '../data/services'

export default function Services() {
  usePageMeta('Our Services', 'Transformers, LT/HT panels, industrial cables, site testing, commissioning, machine automation, PLC/VFD/HMI panels, instrumentation and process control.', 'services')

  // One section per tag; services without a tag go under "More services".
  const groups = categories.filter((c) => services.some((s) => s.category === c.key)).map((c) => ({ key: c.key, title: c.title, text: c.text }))
  if (services.some((s) => !categories.some((c) => c.key === s.category))) groups.push({ key: '', title: 'More services' })

  return (
    <>
      <PageHero
        title="Our services"
        text="Electrical, testing and automation services — designed, supplied, installed and commissioned by one expert team."
        image="/images/switchgear.webp"
        crumbs={[{ label: 'Services' }]}
      />

      {groups.map((g, gi) => (
        <section className={`section${gi % 2 ? ' alt' : ''}`} key={g.key || 'other'}>
          <div className="container">
            <SectionHead eyebrow={g.key || undefined} title={g.title} text={g.text} />
            <div className="card-grid">
              {services
                .filter((s) => (g.key ? s.category === g.key : !categories.some((c) => c.key === s.category)))
                .map((s) => (
                  <ServiceCard key={s.slug} s={s} />
                ))}
            </div>
          </div>
        </section>
      ))}

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

      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <SectionHead center eyebrow="FAQs" title="Common questions" />
          <Faq items={faqs.slice(0, 4)} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}
