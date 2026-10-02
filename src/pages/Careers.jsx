import { ArrowRight, Briefcase, GraduationCap, HeartHandshake, MapPin, TrendingUp } from 'lucide-react'
import { CTABanner, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { company } from '../data/site'

// Sample openings — update with the client's real vacancies.
const jobs = [
  { title: 'Electrical Site Engineer', exp: '2–5 years', loc: 'Noida / Site' },
  { title: 'PLC & Automation Engineer', exp: '1–4 years', loc: 'Noida' },
  { title: 'Testing & Commissioning Engineer', exp: '2–6 years', loc: 'Pan India' },
  { title: 'Panel Wireman / Electrician', exp: '1–3 years', loc: 'Noida' },
]

const perks = [
  { icon: TrendingUp, title: 'Career growth', text: 'Work on diverse industrial projects and grow quickly.' },
  { icon: GraduationCap, title: 'Continuous learning', text: 'Hands-on training on the latest equipment and safety.' },
  { icon: HeartHandshake, title: 'Supportive team', text: 'Experienced seniors who guide you on site.' },
]

export default function Careers() {
  usePageMeta('Careers', 'Join Damvolt Engineering Services Private Limited — careers for electrical, automation and commissioning engineers.', 'careers')
  const apply = (t) =>
    `mailto:${company.email}?subject=${encodeURIComponent(`Job application – ${t}`)}&body=${encodeURIComponent('Please find my resume attached.\n\nName:\nPhone:\nExperience:\n')}`

  return (
    <>
      <PageHero
        title="Build your career with us"
        text="We’re always looking for skilled, safety-minded people who enjoy solving electrical and automation challenges."
        image="/images/electrician-portrait.webp"
        crumbs={[{ label: 'Careers' }]}
      />

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Why join" title="Life at Damvolt" />
          <div className="values">
            {perks.map(({ icon: I, title, text }) => (
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
        <div className="container" style={{ maxWidth: 960 }}>
          <SectionHead eyebrow="Openings" title="Current opportunities" text={`Don’t see a matching role? Send your resume to ${company.email}.`} />
          <div className="jobs">
            {jobs.map((j) => (
              <div className="job reveal" key={j.title}>
                <div>
                  <h3>{j.title}</h3>
                  <div className="job-meta">
                    <span>
                      <Briefcase size={15} /> {j.exp}
                    </span>
                    <span>
                      <MapPin size={15} /> {j.loc}
                    </span>
                    <span>Full-time</span>
                  </div>
                </div>
                <a className="btn btn-secondary btn-sm" href={apply(j.title)}>
                  Apply now <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
