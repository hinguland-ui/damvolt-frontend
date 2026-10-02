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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/',
    plugins: [react(), spaFallback(), robots(env.VITE_API_URL)],
  }
})
