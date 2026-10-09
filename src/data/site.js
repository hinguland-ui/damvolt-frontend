// All company / page content now comes from the Laravel admin panel (see data/store.js).
// This file keeps the old import path working.
export { company, developer, stats, whyUs, process, faqs, home, legalPages, pageSeo, careers } from './store'

export const telLink = (p = '') => `tel:${p.replace(/\s/g, '')}`
