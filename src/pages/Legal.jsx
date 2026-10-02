import { useNavigate, useParams } from 'react-router-dom'
import { PageHero, usePageMeta } from '../components/ui'
import NotFound from './NotFound'
import { company, legalPages } from '../data/site'

// Every legal page (Privacy Policy, Terms, Disclaimer, Service/Shipping policy …) is managed
// in the admin panel under "Legal Pages" and served here by its slug.
export default function LegalPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const page = legalPages.find((p) => p.slug === slug)
  usePageMeta(page?.title, page?.description)
  if (!page) return <NotFound />

  return (
    <>
      <PageHero title={page.title} image="/images/cad-design.webp" crumbs={[{ label: page.title }]} />
      <section className="section">
        <div className="container legal">
          {page.updated && <span className="updated">Last updated: {page.updated}</span>}
          <div
            dangerouslySetInnerHTML={{ __html: page.content }}
            onClick={(e) => {
              // keep in-site links inside the SPA instead of reloading the page
              const href = e.target.closest('a')?.getAttribute('href')
              if (href?.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault()
                navigate(href)
              }
            }}
          />
          <h2>Contact Us</h2>
          <p>
            For any questions about this page, contact {company.name}
            {company.emails[0] && (
              <>
                {' '}
                at <a href={`mailto:${company.emails[0]}`}>{company.emails[0]}</a>
              </>
            )}
            {company.phones[0] && <> or call {company.phones[0]}</>}.
            {company.offices[0] && (
              <>
                <br />
                Address: {company.offices[0].address}
              </>
            )}
          </p>
        </div>
      </section>
    </>
  )
}
