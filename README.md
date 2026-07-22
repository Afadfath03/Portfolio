# Portfolio — Afad Fath

Persona 5–inspired portfolio with bilingual support and a self-hosted admin panel.

## Architecture

Split into two independent services:

- **Portofolio-FE** — Next.js frontend (pages, components, CSS). Fetches data from BE via HTTP.
- **Portofolio-BE** — Next.js API-only service (SQLite, auth, CRUD). Owns the database.

FE and BE communicate over Docker internal network. FE proxies `/api/*` to BE via Next.js rewrites.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, standalone output)
- **Language:** TypeScript
- **Styling:** Plain CSS (no Tailwind) — design tokens as CSS custom properties
- **Database:** SQLite via `better-sqlite3`, single `data/portfolio.db`
- **Auth:** HMAC-SHA256 signed cookie (7 days)
- **Fonts:** Archivo Black (display) + Space Grotesk (body) via `next/font/google`
- **Deployment:** Docker (multi-stage, standalone build)

## Quick Start

```bash
# copy env files
cp Portofolio-BE/.env.example Portofolio-BE/.env
cp Portofolio-FE/.env.example Portofolio-FE/.env

# fill credentials in Portofolio-BE/.env
ADMIN_PASSWORD=yourpassword
SESSION_SECRET=randomstring

# install workspaces
npm install

# run both services
docker compose up -d --build
```

Frontend: `http://localhost:3000`  
Backend API: internal only (`http://be:3000` in Docker network)

## Environment Variables

### BE (`Portofolio-BE/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ADMIN_PASSWORD` | Yes | — | Password for admin login |
| `SESSION_SECRET` | Yes | `ADMIN_PASSWORD` | HMAC signing key for session cookie |
| `DB_PATH` | No | `data/portfolio.db` | SQLite file path |

### FE (`Portofolio-FE/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BE_URL` | No | `http://localhost:3001` | BE API URL (for local dev outside Docker) |

In Docker, FE uses `http://be:3000` via `next.config.ts` rewrites.

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/content` | No | All content (EN + ID) |
| GET | `/api/content/[section]` | No | One section (EN + ID) |
| PUT | `/api/content/[section]` | Yes | Upsert EN + ID data |
| POST | `/api/auth/login` | No | Login (sets cookie) |
| POST | `/api/auth/logout` | Yes | Logout (clears cookie) |

## Admin Panel

Located at `/admin`. Login with `ADMIN_PASSWORD`. Sections:

- **Hero** — greeting, tagline, sub, image URL
- **About** — title, heading, body, stats (array), image URL
- **Works** — title, items (array of tag/name/desc/image URL)
- **Contact** — title, heading, links (array of label/value/href)

Each section has side-by-side EN/ID columns with per-item sync buttons (→ copy EN→ID, ← copy ID→EN). Array fields mirror ADD/REMOVE/MOVE to both languages. Image URLs can be validated with a 🔗 check button.

## Docker

### Run both services (recommended)

```bash
docker compose up -d --build
```

### Run individually

```bash
# BE only
cd Portofolio-BE && docker compose up -d

# FE only (includes BE)
cd Portofolio-FE && docker compose up -d
```

### Update FE only (no BE rebuild)

```bash
docker compose up -d --build fe
```

DB data persists in `Portofolio-FE/data/` or `Portofolio-BE/data/` volume mounts.

## Project Structure

```
├── docker-compose.yml          # Run both services
├── package.json                # Monorepo root (npm workspaces)
├── .env.example                # Combined reference
│
├── Portofolio-BE/
│   ├── Dockerfile
│   ├── docker-compose.yml      # Standalone BE
│   ├── lib/db.ts               # SQLite CRUD
│   ├── lib/auth.ts             # HMAC cookie auth
│   ├── app/i18n.ts             # Seed data (EN/ID dicts)
│   ├── app/api/                # REST API routes
│   └── data/                   # SQLite volume
│
└── Portofolio-FE/
    ├── Dockerfile
    ├── docker-compose.yml      # FE + BE
    ├── next.config.ts          # rewrites /api/* → BE
    ├── lib/checkImage.ts       # Image URL validation
    ├── app/                    # All UI
    │   ├── page.tsx            # SSR fetch from BE
    │   ├── PageClient.tsx      # Client state machine
    │   ├── globals.css         # All styles
    │   ├── i18n.ts             # Bilingual dict + lang store
    │   ├── components/         # Nav
    │   ├── sections/           # Hero, About, Works, Contact
    │   └── admin/              # Admin panel (forms call BE API)
    └── public/
```

## Key Decisions

- **FE owns no database.** All data flows through BE API.
- **No server actions in FE.** Admin forms use `fetch()` to BE endpoints.
- **Auth on BE only.** FE admin pages are publicly accessible; BE API routes verify session.
- **Next.js rewrites.** FE proxies `/api/*` to BE, avoiding CORS and cookie issues.
- **Independent deploys.** FE and BE can be rebuilt/restarted independently as long as API contract is preserved.

## License

MIT
