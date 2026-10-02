# Damvolt — website (React + Vite)

The public website. All content comes from the Laravel admin panel ([backend repo](https://github.com/hinguland-ui/damvolt-backend))
through a single request, `GET {VITE_API_URL}/content`, which is cached in the browser and revalidated on every visit.
The design lives in this repo; the text, images, SEO and links are managed in the admin panel.

## Setup
```bash
npm install
cp .env.example .env      # set VITE_API_URL — the ONLY place the API address is configured
npm run dev               # http://localhost:5173
```

| Variable | Example |
| --- | --- |
| `VITE_API_URL` | `http://localhost:8000/api` · production: `https://api.yourdomain.com/api` |

The backend must list this site's address in its `FRONTEND_URL` (e.g. `http://localhost:5173`), otherwise it
refuses the requests.

## Build & deploy
```bash
npm run build             # outputs dist/ (+ robots.txt that points to the backend's sitemap.xml)
```
Upload the **contents of `dist/`** to the web root (the hidden `.htaccess` included — it handles page refreshes,
caching and security headers). Changing the API address means editing `VITE_API_URL` and rebuilding.

## Notes
- First visit waits for the content request; returning visitors see the saved copy at once, but it is refreshed
  first (network first, 1.5 s), so a change saved in the admin panel shows after a normal refresh.
- Contact form: saved in the admin panel, e-mailed to the owner and confirmed to the customer; one enquiry per
  phone/e-mail per 24 hours; optional Google reCAPTCHA (configured in the admin panel).
- `npm run lint` runs oxlint.
