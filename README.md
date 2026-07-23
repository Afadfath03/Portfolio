# Portfolio — Afad Fath

Bilingual portfolio (EN/ID) with a self-hosted admin panel.

## 1. Architecture

Two independent Next.js services in one repo:

- **Portofolio-FE** — Frontend (pages, components, CSS). Fetches data from BE via HTTP.
- **Portofolio-BE** — API-only service (SQLite, auth, CRUD). Owns the database.

FE proxies `/api/*` to BE via Next.js rewrites. No shared code at runtime.

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, standalone output)
- **Language:** TypeScript
- **Styling:** Plain CSS — design tokens as CSS custom properties
- **Database:** SQLite via `better-sqlite3`
- **Auth:** HMAC-SHA256 signed cookie (7 days)
- **Fonts:** Archivo Black (display) + Space Grotesk (body)

## 3. Quick Start

```bash
cp Portofolio-BE/.env.example Portofolio-BE/.env
cp Portofolio-FE/.env.example Portofolio-FE/.env
# edit Portofolio-BE/.env — set ADMIN_PASSWORD and SESSION_SECRET

npm install
docker compose up -d --build
```

- Frontend: `http://localhost:8887`
- Backend API: `http://localhost:8888` (internal in Docker)

## 4. Local Development (npm)

```bash
npm install

# run BE (port 8888) and FE (port 3000) in separate terminals
npm run dev:be
npm run dev:fe
```

FE auto-proxies `/api/*` to BE via `next.config.ts` rewrites.

### 4.1 Production Build (no Docker)

```bash
npm run build:be && npm run build:fe
cd Portofolio-BE && PORT=8888 npm start
cd Portofolio-FE && npm start
```

## 5. Environment Variables

### 5.1 BE (`Portofolio-BE/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ADMIN_PASSWORD` | Yes | — | Password for admin login |
| `SESSION_SECRET` | Yes | `ADMIN_PASSWORD` | HMAC signing key for session cookie |
| `DB_PATH` | No | `data/portfolio.db` | SQLite file path |

### 5.2 FE (`Portofolio-FE/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BE_URL` | No | `http://localhost:8888` | BE API URL |

## 6. API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/content` | No | All content (EN + ID) |
| GET | `/api/content/[section]` | No | One section (EN + ID) |
| PUT | `/api/content/[section]` | Yes | Upsert EN + ID data |
| POST | `/api/auth/login` | No | Login (sets cookie) |
| POST | `/api/auth/logout` | Yes | Logout (clears cookie) |

## 7. Admin Panel

Located at `/admin`. Login with `ADMIN_PASSWORD`. Sections:

- **Hero** — greeting, tagline, sub, image URL
- **About** — title, heading, body, stats (array), image URL
- **Works** — title, items (tag/name/desc/image URL/links array)
- **Contact** — title, heading, links (array of label/value/href)

Side-by-side EN/ID columns with per-item sync buttons. Image URLs validated via check button.

## 8. Docker

```bash
# both services
docker compose up -d --build

# FE only (no BE rebuild)
docker compose up -d --build fe

# BE only
docker compose up -d --build be
```

DB data persists in `Portofolio-BE/data/` volume mount.

## 9. Project Structure

```
├── docker-compose.yml          # Run both services
├── package.json                # Monorepo root (npm workspaces)
│
├── Portofolio-BE/
│   ├── lib/db.ts               # SQLite CRUD
│   ├── lib/auth.ts             # HMAC cookie auth
│   ├── app/i18n.ts             # Seed data (EN/ID dicts)
│   ├── app/api/                # REST API routes
│   └── data/                   # SQLite volume (gitignored)
│
└── Portofolio-FE/
    ├── next.config.ts          # rewrites /api/* → BE
    ├── lib/checkImage.ts       # Image URL validation
    ├── app/
    │   ├── page.tsx            # SSR fetch from BE
    │   ├── PageClient.tsx      # Client state machine
    │   ├── globals.css         # All styles
    │   ├── i18n.ts             # Bilingual dict + lang store
    │   ├── components/         # Nav
    │   ├── sections/           # Hero, About, Works, Contact
    │   └── admin/              # Admin panel (forms call BE API)
    └── public/
```

## 10. License

MIT
