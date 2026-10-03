import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Inner pages are code-split; a skeleton shows while each one loads.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
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
        <Route path="industries" element={<Industries />} />
        <Route path="contact" element={<Contact />} />
        {/* Careers is switched off for now (pages/Careers.jsx is kept): the old link goes to the home page */}
        <Route path="careers" element={<Navigate to="/" replace />} />
        <Route path="faq" element={<FaqPage />} />
        {/* Legal pages: /privacy-policy, /terms-and-conditions, … (slugs set in the admin panel) */}
        <Route path=":slug" element={<LegalPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
