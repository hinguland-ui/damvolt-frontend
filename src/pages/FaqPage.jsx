import { CTABanner, Faq, PageHero, SectionHead, usePageMeta } from '../components/ui'
import { faqs } from '../data/site'

export default function FaqPage() {
  usePageMeta('FAQs', 'Frequently asked questions about Damvolt Engineering Services Private Limited.', 'faq')
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
