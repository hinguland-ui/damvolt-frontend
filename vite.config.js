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
    // Never advertise a localhost sitemap (a build made on a developer machine) — only a real https address.
    const sitemap = apiUrl && /^https:\/\/(?!localhost|127\.)/.test(apiUrl) ? `${apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')}/sitemap.xml` : ''
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
      ['Home', '/', 'Company overview, services and sectors we work in.'],
      ['About Us', '/about', 'Who we are and how we work.'],
      ['Services', '/services', 'Panel, transformer and cable tray erection, instrument installation, meggering testing, switchgear, automation, power grid and building electrical work.'],
      ['Careers', '/careers', 'Current work requirements.'],
      ['Contact', '/contact', 'Office address, phone numbers, email and the enquiry form.'],
    ]
    const llms = [
      '# Damvolt Engineering Service Private Limited',
      '',
      '> Electrical and instrumentation (E&I) contractor for cement, power, solar, steel and refinery plants — erection, testing, shutdown work and manpower supply. Office in Sikta, West Champaran, Bihar, India.',
      '',
      '## Pages',
      '',
      ...pages.map(([name, path, text]) => `- [${name}](${base}${path}): ${text}`),
      '',
    ].join('\n')
    const catalog = {
      specVersion: '1.0',
      host: { displayName: 'Damvolt Engineering Service Private Limited', identifier: base || undefined },
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
