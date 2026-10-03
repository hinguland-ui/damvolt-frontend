import { useEffect } from 'react'
import { CTABanner, Faq, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { faqs } from '../data/site'
import { removeJsonLd, setJsonLd } from '../data/store'

export default function FaqPage() {
  usePageMeta('FAQs', 'Frequently asked questions about Damvolt Engineering Services Private Limited.', 'faq')
  // FAQ rich results in Google
  useEffect(() => {
    if (!faqs.length) return
    setJsonLd('ld-page', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
    return () => removeJsonLd('ld-page')
  }, [])
  return (
    <>
      <PageHero title="Frequently asked questions" text="Quick answers about our services, process and support." image="/images/wiring.webp" crumbs={[{ label: 'FAQs' }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <SectionHead center eyebrow="Help centre" title="Got questions?" />
          <Faq items={faqs} />
        </div>
      </section>
      <CTABanner title="Still have questions?" text="Call or WhatsApp our team — we’re happy to help." />
    </>
  )
}
