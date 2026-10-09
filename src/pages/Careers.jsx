import { ArrowRight, Briefcase, MapPin } from 'lucide-react'
import { PageHero, SectionHead, usePageMeta } from '../components/ui'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { careers, company } from '../data/site'

// Work requirements are listed here (data/content.js → careers, or the admin panel later).
export default function Careers() {
  usePageMeta('Careers', 'Current work requirements at Damvolt — electrical supervisors, instrument technicians, electricians and helpers.', 'careers')

  const waLink = (t) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello, I want to apply for: ${t}`)}`

  return (
    <>
      <PageHero
        title="Work requirements"
        text="Current openings for skilled electrical and instrumentation people at our plant sites."
        image="/images/15.jpeg"
        crumbs={[{ label: 'Careers' }]}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <SectionHead eyebrow="Openings" title="Current requirements" text={`To apply, call ${company.phones[0]}, WhatsApp us or send your details to ${company.email}.`} />
          {careers.length ? (
            <div className="jobs">
              {careers.map((j) => (
                <div className="job reveal" key={j.title}>
                  <div>
                    <h3>{j.title}</h3>
                    <div className="job-meta">
                      {j.exp && (
                        <span>
                          <Briefcase size={15} /> {j.exp}
                        </span>
                      )}
                      {j.loc && (
                        <span>
                          <MapPin size={15} /> {j.loc}
                        </span>
                      )}
                      {j.note && <span>{j.note}</span>}
                    </div>
                  </div>
                  <a className="btn btn-secondary btn-sm" href={waLink(j.title)} target="_blank" rel="noreferrer">
                    <WhatsAppIcon size={16} /> Apply now <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">No requirement is open right now. Please check again soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
