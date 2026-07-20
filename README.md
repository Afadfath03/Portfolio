# Portfolio — Afad Fath

Persona 5–inspired portfolio with bilingual support and a self-hosted admin panel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, standalone output)
- **Language:** TypeScript
- **Styling:** Plain CSS (no Tailwind) — design tokens as CSS custom properties
- **Database:** SQLite via `better-sqlite3`, single `data/portfolio.db`
- **Auth:** HMAC-SHA256 signed cookie, Web Crypto (Edge) + Node.js crypto (Server Actions)
- **Fonts:** Archivo Black (display) + Space Grotesk (body) via `next/font/google`
- **Deployment:** Docker (multi-stage, standalone build)

## Quick Start

```bash
# copy env template
cp .env.example .env.local

# fill credentials
ADMIN_PASSWORD=yourpassword
SESSION_SECRET=randomstring

# install & dev
npm install
npm run dev
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ADMIN_PASSWORD` | Yes | — | Password for admin login |
| `SESSION_SECRET` | Yes | `ADMIN_PASSWORD` | HMAC signing key for session cookie |
| `DB_PATH` | No | `data/portfolio.db` | SQLite file path |

## Admin Panel

Located at `/admin`. Login with `ADMIN_PASSWORD`. Sections:

- **Hero** — greeting, tagline, sub, image URL
- **About** — title, heading, body, stats (array), image URL
- **Works** — title, items (array of tag/name/desc/image URL)
- **Contact** — title, heading, links (array of label/value/href)

Each section has side-by-side EN/ID columns with per-field sync buttons (→ copy EN→ID, ← copy ID→EN). Array fields mirror ADD/REMOVE to both languages. Image URLs can be validated with a 🔍 check button.

## Docker

```bash
docker build -t portfolio .
docker run -d \
  -p 3000:3000 \
  -e ADMIN_PASSWORD=yourpassword \
  -e SESSION_SECRET=randomstring \
  -v /host/path/to/data:/app/data \
  portfolio
```

Images are loaded from external URLs set via the admin panel. Add a `public/images/` volume mount for local file upload if needed.

## Project Structure

```
├── app/
│   ├── page.tsx            # Server component, ISR fetch from DB
│   ├── PageClient.tsx       # Client state machine (transitions, lang, nav)
│   ├── globals.css          # All styles (~920 lines)
│   ├── i18n.ts              # Bilingual dict EN/ID
│   ├── components/Nav.tsx   # Rail nav + section navigation
│   ├── sections/            # Hero, About, Works, Contact
│   └── admin/               # Admin panel (login + edit forms)
├── lib/
│   ├── db.ts                # SQLite schema, seed, CRUD
│   ├── auth.ts              # HMAC cookie auth (Node.js)
│   ├── actions.ts           # Server actions (login, logout, saveContentPair)
│   └── checkImage.ts        # Image URL validation utility
├── proxy.ts                 # Route guard (Edge Web Crypto)
├── Dockerfile               # Multi-stage build
└── .env.example
```

## License

MIT
