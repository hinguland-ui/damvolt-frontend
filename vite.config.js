import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Copies index.html to 404.html after build. Static hosts without rewrite support
// (GitHub Pages, some shared hosting) serve 404.html for unknown paths, so the app
// still boots and React Router shows the right page — or our own 404 page.
const spaFallback = () => ({
  name: 'spa-404-fallback',
  apply: 'build',
  closeBundle() {
    const out = (f) => fileURLToPath(new URL(`./dist/${f}`, import.meta.url))
    copyFileSync(out('index.html'), out('404.html'))
  },
})

// robots.txt for search engines. The sitemap lives on the backend (generated from the database), so its address
// is taken from the same VITE_API_URL setting as everything else: https://api.example.com/api -> https://api.example.com/sitemap.xml
const robots = (apiUrl) => ({
  name: 'robots-txt',
  apply: 'build',
  generateBundle() {
    const sitemap = apiUrl && /^https?:\/\//.test(apiUrl) ? `${apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')}/sitemap.xml` : ''
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: ['User-agent: *', 'Allow: /', sitemap && `Sitemap: ${sitemap}`].filter(Boolean).join('\n') + '\n',
    })
  },
})

// Public address of the website (VITE_SITE_URL, e.g. https://damvolt.com). Social apps (WhatsApp, Facebook, LinkedIn…)
// read the static HTML and need a full https:// link for the share picture, so it is filled in at build time.
const siteUrl = (env) => (env.VITE_SITE_URL || '').replace(/\/$/, '')

const siteMeta = (env) => ({
  name: 'site-url',
  transformIndexHtml: {
    order: 'post',
    handler: (html) =>
      html
        .replaceAll('%SITE_URL%', siteUrl(env))
        // The CSS no longer blocks the first paint: the white preloader covers the page until everything has loaded.
        .replace(/<link rel="stylesheet"([^>]*?) href="(\/assets\/[^"]+\.css)">/g, '<link rel="stylesheet"$1 href="$2" media="print" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="$2"></noscript>'),
  },
})

// llms.txt + ai-catalog.json: plain descriptions of the site for AI assistants / agents.
const aiFiles = (env) => ({
  name: 'ai-files',
  apply: 'build',
  generateBundle() {
    const base = siteUrl(env)
    const pages = [
      ['Home', '/', 'Company overview, banner highlights, services and industries.'],
      ['About Us', '/about', 'Who we are, our numbers and why customers choose us.'],
      ['Services', '/services', 'Transformers, LT/HT panels, cables, testing, commissioning and PLC/VFD automation.'],
      ['Industries', '/industries', 'Industries we serve: manufacturing, pharma, metal, solar, wind, warehouses and commercial buildings.'],
      ['Contact', '/contact', 'Offices, phone numbers, email and the enquiry form.'],
      ['FAQ', '/faq', 'Answers to common questions.'],
    ]
    const llms = [
      '# Damvolt Engineering Services Private Limited',
      '',
      '> Complete electrical and automation solutions — transformers, LT/HT panels, industrial cables, testing, commissioning and PLC/VFD automation. Offices in Noida and New Delhi, India.',
      '',
      '## Pages',
      '',
      ...pages.map(([name, path, text]) => `- [${name}](${base}${path}): ${text}`),
      '',
    ].join('\n')
    const catalog = {
      specVersion: '1.0',
      host: { displayName: 'Damvolt Engineering Services Private Limited', identifier: base || undefined },
      entries: [
        {
          identifier: `${base}/llms.txt`,
          displayName: 'Damvolt website guide',
          type: 'text/markdown',
          url: `${base}/llms.txt`,
          description: 'Short description of the company and a list of its public pages.',
        },
      ],
    }
    this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms })
    this.emitFile({ type: 'asset', fileName: 'ai-catalog.json', source: JSON.stringify(catalog, null, 2) })
    this.emitFile({ type: 'asset', fileName: '.well-known/ai-catalog.json', source: JSON.stringify(catalog, null, 2) })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react(), spaFallback(), robots(env.VITE_API_URL), siteMeta(env), aiFiles(env)],
  }
})
