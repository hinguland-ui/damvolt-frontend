import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Toaster, toast } from 'sonner'
import { AlertCircle, Building2, CheckCircle2, Clock, Mail, MapPin, MessageSquareText, Phone, Send, User, Wrench } from 'lucide-react'
import MapEmbed from '../components/MapEmbed'
import Recaptcha from '../components/Recaptcha'
import { API_URL } from '../lib/api'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { PageHero, usePageMeta } from '../components/ui'
import { company, telLink } from '../data/site'
import { services } from '../data/services'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  email: z.union([z.literal(''), z.email('Please enter a valid email')]),
  company: z.string().trim().max(100).optional(),
  service: z.string().optional(),
  message: z.string().trim().min(10, 'Please describe your requirement (at least 10 characters)').max(1500),
})

// 09982925680 / +91 99829 25680 / 919982925680 -> 9982925680 (digits only, no leading 0 or country code)
const cleanPhone = (v) => {
  let d = v.replace(/\D/g, '')
  if (d.length > 10 && d.startsWith('91')) d = d.slice(2)
  return d.replace(/^0+/, '').slice(0, 10)
}

// One enquiry per visitor every 24 hours (the server enforces the same rule per phone / email).
const SENT_KEY = 'damvolt:enquiry-sent'
const DAY = 24 * 60 * 60 * 1000
const sentRecently = () => {
  try {
    return Date.now() - Number(localStorage.getItem(SENT_KEY)) < DAY
  } catch {
    return false
  }
}
const markSent = () => {
  try {
    localStorage.setItem(SENT_KEY, String(Date.now()))
  } catch {
    /* private mode — the server still enforces the limit */
  }
}

const empty = { name: '', phone: '', email: '', company: '', service: '', message: '' }

function buildText(f) {
  const svc = services.find((s) => s.slug === f.service)?.title || (f.service === 'other' ? 'Other' : 'General enquiry')
  return [
    'New enquiry from website',
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    f.company && `Company: ${f.company}`,
    `Service: ${svc}`,
    `Message: ${f.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function Field({ id, label, required, error, valid, icon: Ic, full, hint, children }) {
  return (
    <div className={`field${full ? ' full' : ''}${error ? ' has-err' : ''}${valid && !error ? ' is-valid' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <i> *</i>}
      </label>
      <span className="control">
        {Ic && <Ic className="lead-ic" size={18} strokeWidth={1.75} />}
        {children}
        <CheckCircle2 className="state-ic ok" size={18} />
        <AlertCircle className="state-ic bad" size={18} />
      </span>
      {error && (
        <span className="err" role="alert">
          {error.message}
        </span>
      )}
      {hint && !error && <span className="hint">{hint}</span>}
    </div>
  )
}

export default function Contact() {
  usePageMeta('Contact Us', 'Contact Damvolt Engineering Services Private Limited — call, WhatsApp or email us for electrical and automation project enquiries.', 'contact')
  const [params] = useSearchParams()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
    // validate as soon as a field is left, then on every keystroke
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...empty, service: params.get('service') || '' },
  })

  const values = watch()
  // green tick only after the visitor has touched the field and it passes
  const ok = (k) => !!touchedFields[k] && !errors[k] && String(values[k] || '').trim() !== ''

  const captchaKey = company.recaptcha?.enabled ? company.recaptcha.siteKey : ''
  const captcha = useRef(null)
  const [token, setToken] = useState('')
  const [done, setDone] = useState(() => (sentRecently() ? 'already' : ''))

  // WhatsApp hands the enquiry to WhatsApp. "Send enquiry" saves it in the admin panel and e-mails it.
  const send = (via) =>
    handleSubmit(
      async (data) => {
        if (via === 'wa') {
          window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(buildText(data))}`, '_blank', 'noopener')
          toast.success('Your enquiry is ready', { description: 'Tap send in WhatsApp to deliver it to our team.' })
          reset(empty)
          return
        }

        if (captchaKey && !token) {
          toast.error('Please confirm that you are not a robot')
          return
        }

        try {
          const res = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...data, captcha: token, website: '' }),
          })
          const json = await res.json().catch(() => ({}))

          if (res.ok) {
            markSent()
            setDone('thanks')
            reset(empty)
          } else if (json.code === 'duplicate') {
            markSent()
            setDone('already')
          } else {
            toast.error(
              res.status === 429
                ? 'Too many attempts. Please wait a minute and try again.'
                : json.message || json.errors?.[Object.keys(json.errors)[0]]?.[0] || 'Something went wrong. Please try again.',
            )
            captcha.current?.reset()
          }
        } catch {
          toast.error('Could not reach the server. Please check your connection and try again.')
          captcha.current?.reset()
        }
      },
      () => toast.error('Please check the highlighted fields'),
    )

  return (
    <>
      <Toaster position="top-center" richColors closeButton toastOptions={{ style: { fontFamily: 'var(--font)' } }} />
      <PageHero
        title="Contact us"
        text="Have a project in mind or need urgent support? Our team is ready to help."
        image="/images/hero-powerlines.webp"
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <span className="eyebrow">Get in touch</span>
            <h2>Let’s talk about your project.</h2>
            <p className="lead">Call, WhatsApp or email us — or fill in the form and we’ll get back within one working day.</p>

            <div className="contact-list">
              <div className="contact-row">
                <span className="ic">
                  <Phone size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h4>Phone</h4>
                  {company.phones.map((p) => (
                    <a key={p} href={telLink(p)}>
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="contact-row">
                <span className="ic">
                  <Mail size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h4>Email</h4>
                  {company.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`}>
                      {e}
                    </a>
                  ))}
                </div>
              </div>
              {company.offices.map((o) => (
                <div className="contact-row" key={o.label}>
                  <span className="ic">
                    <MapPin size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h4>{o.label}</h4>
                    <a href={o.mapLink} target="_blank" rel="noreferrer">
                      {o.address}
                    </a>
                  </div>
                </div>
              ))}
              <div className="contact-row">
                <span className="ic">
                  <Clock size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h4>Working hours</h4>
                  <p>{company.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card reveal">
            <h2>Request a free quote</h2>
            {done ? (
              <div className="form-done" role="status">
                <CheckCircle2 size={34} strokeWidth={1.6} />
                <h3>{done === 'thanks' ? 'Thank you for connecting!' : 'Your request is already submitted'}</h3>
                <p>
                  {done === 'thanks'
                    ? 'Your request has been submitted. We will connect with you soon.'
                    : 'We will connect with you soon. You can send a new enquiry 24 hours after the last one.'}
                </p>
              </div>
            ) : (
              <>
                <p className="muted" style={{ margin: 0 }}>
                  Fields marked * are required.
                </p>

            <form className="form-grid" onSubmit={send('api')} noValidate>
              {/* honeypot: hidden from people, bots fill it */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              <Field id="name" label="Full name" required error={errors.name} valid={ok('name')} icon={User}>
                <input id="name" placeholder="Full name *" autoComplete="name" aria-invalid={!!errors.name} {...register('name')} />
              </Field>
              <Field id="phone" label="Mobile number" required error={errors.phone} valid={ok('phone')} icon={Phone}>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="Mobile number (10 digits) *"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  {...register('phone', {
                    onChange: (e) => setValue('phone', cleanPhone(e.target.value), { shouldValidate: true }),
                  })}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email} valid={ok('email')} icon={Mail}>
                <input id="email" type="email" placeholder="Email (optional)" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />
              </Field>
              <Field id="company" label="Company" error={errors.company} valid={ok('company')} icon={Building2}>
                <input id="company" placeholder="Company (optional)" autoComplete="organization" {...register('company')} />
              </Field>
              <Field id="service" label="Service required" icon={Wrench} full>
                <select id="service" {...register('service')}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field
                id="message"
                label="Your requirement"
                required
                error={errors.message}
                valid={ok('message')}
                icon={MessageSquareText}
                hint={`${(values.message || '').length}/1500`}
                full
              >
                <textarea
                  id="message"
                  placeholder="Your requirement * — project, load, location, timeline…"
                  aria-invalid={!!errors.message}
                  {...register('message')}
                />
              </Field>
              {captchaKey && (
                <div className="field full">
                  <Recaptcha ref={captcha} siteKey={captchaKey} onChange={setToken} />
                </div>
              )}
              <div className="form-actions">
                <button type="button" className="btn btn-wa" onClick={send('wa')} disabled={isSubmitting}>
                  <WhatsAppIcon size={17} /> Send on WhatsApp
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  <Send size={17} /> {isSubmitting ? 'Sending…' : 'Send enquiry'}
                </button>
              </div>
            </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <MapEmbed style={{ minHeight: 460 }} />
        </div>
      </section>
    </>
  )
}
