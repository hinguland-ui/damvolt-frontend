import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Inner pages are code-split; a skeleton shows while each one loads.
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const Contact = lazy(() => import('./pages/Contact'))
const LegalPage = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="careers" element={<Careers />} />
        {/* Industries / FAQ are not part of the site for now (the page files are kept): old links go home */}
        {['industries', 'faq'].map((p) => (
          <Route key={p} path={p} element={<Navigate to="/" replace />} />
        ))}
        {/* Legal pages: /privacy-policy, /terms-and-conditions, … (slugs set in the admin panel) */}
        <Route path=":slug" element={<LegalPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
