import Icon from '../components/Icon'
import Img from '../components/Img'
import { CTABanner, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { industries } from '../data/services'

const sectors = [
  { title: 'Factories & plants', text: 'Plant electrification, MCC panels, motor drives and machine automation for production lines.' },
  { title: 'Commercial buildings', text: 'Transformers, LT panels, rising mains and distribution for offices, malls and hospitals.' },
  { title: 'Energy & utilities', text: 'Cabling, HT switchgear, testing and commissioning for solar, wind and utility projects.' },
]

export default function Industries() {
  usePageMeta('Industries We Serve', 'Electrical and automation solutions for manufacturing, automobile, pharma, commercial, warehousing, renewable energy and steel industries.', 'industries')

  return (
    <>
      <PageHero
        title="Industries we serve"
        text="Our electrical and automation expertise powers businesses across a wide range of sectors."
        image="/images/ind-manufacturing.webp"
        crumbs={[{ label: 'Industries' }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Sectors"
            title="Solutions for every industry"
            text="Every industry has different power, safety and automation needs. We tailor each solution to your process."
          />
          <div className="ind-grid">
            {industries.map((i) => (
              <div className="ind-card reveal" key={i.title}>
                <Img src={i.image} alt={i.title} fallback="/images/ind-manufacturing.webp" />
                <h3>
                  <Icon name={i.icon} size={18} /> {i.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Expertise" title="Where we make a difference" />
          <div className="values">
            {sectors.map((s, i) => (
              <div className="value reveal" key={s.title}>
                <span className="step-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner spaced title="Don't see your industry listed?" text="We work with businesses of all sizes. Share your requirement and our engineers will suggest the right solution." />
    </>
  )
}
