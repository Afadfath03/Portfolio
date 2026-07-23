<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio — Agent Conventions

## Architecture

Two independent Next.js services in one repo:

- **Portofolio-FE/** — Frontend (pages, components, CSS). No DB.
- **Portofolio-BE/** — API-only (SQLite, auth, CRUD). No UI.

FE fetches from BE via HTTP. FE proxies `/api/*` to BE using `next.config.ts` rewrites. In Docker, BE is internal (`http://be:3000`). In local dev, FE hits BE at `BE_URL` env var.

**CRITICAL:** FE and BE share no code at runtime. Do NOT import from the other service. The only contract is the API response shape at `/api/content` and `/api/content/[section]`.

## Language & i18n

- Bilingual EN/ID via a flat dict in `app/i18n.ts`. Type `Dict = typeof en`.
- **Both services have their own `app/i18n.ts`.** BE uses it for DB seed. FE uses it for client-side lang switching.
- Lang state managed via in-memory store + `useSyncExternalStore` (not localStorage).
- Always default to EN on page load; user can toggle during session.
- Admin panel has side-by-side EN/ID columns.
- Adding a new section requires updating both `app/i18n.ts` files (BE and FE), the `en` object, the `id` object (must match structure), and the `Dict` type (inferred automatically).

## Database (BE only)

- SQLite via `better-sqlite3`, single table `content(section, lang, data TEXT)`.
- Data stored as JSON blobs. Schema auto-creates on first import.
- Seed from `app/i18n.ts` on first run if DB empty. Source of truth after admin edit is the DB.
- DB file lives at `data/portfolio.db` (gitignored). Path overridable via `DB_PATH`.
- `lib/db.ts` exports `getSection`, `getAllContent`, `upsertContent`, `getAllSections`.
- Do NOT use async DB operations — `better-sqlite3` is synchronous.

## Auth (BE only)

- HMAC-SHA256 signed cookie (7 days). `lib/auth.ts` for Node.js route handlers.
- Cookie name: `admin_session`, path: `/`, httpOnly, secure in production.
- `path: "/"` (not `/admin`) so cookie works via Next.js rewrites from FE.
- FE admin pages have no auth middleware — BE API routes verify session.
- After login, BE sets cookie. FE calls `router.push("/admin/hero")` on success.

## API (BE)

Routes in `app/api/`:

| Method | Endpoint | Auth | Body | Response |
|--------|----------|------|------|----------|
| GET | `/api/content` | No | — | `{ en: Dict, id: Dict }` |
| GET | `/api/content/[section]` | No | — | `{ en: Data, id: Data }` |
| PUT | `/api/content/[section]` | Yes | `{ en: Data, id: Data }` | `{ ok: true }` |
| POST | `/api/auth/login` | No | `{ password: string }` | `{ ok: true }` + Set-Cookie |
| POST | `/api/auth/logout` | Yes | — | `{ ok: true }` + Clear-Cookie |

## FE Communication

- `app/page.tsx` (Server Component): fetches from `${BE_URL}/api/content` directly (server-side).
- Admin forms (Client Components): `fetch("/api/content/{section}", { method: "PUT" })` via browser → FE rewrites to BE.
- `next.config.ts` rewrites `/api/:path*` → `${BE_URL}/api/:path*`.
- `credentials: "include"` on all client-side fetches to forward cookies.

## CSS

- No Tailwind — plain CSS in `app/globals.css` (FE only).
- Design tokens as CSS custom properties: `--violet: #3b82f6`, `--acid: #22d3ee`, `--ink: #0f172a`, `--panel: #1e293b`, `--bone: #e2e8f0`.
- Fonts via `next/font/google`: `Archivo Black` (--font-display), `Space Grotesk` (--font-body).
- Content pane rotation transitions for section nav. Language switch uses horizontal slide+fade.
- Animations use CSS `@keyframes` + JS timers (not CSS `animation-delay` for sequential logic).

## Admin Panel (FE)

- Layout: `AdminNav.tsx` wraps children. Login page (`/admin`) renders without nav.
- Forms are client components with state for both EN and ID data.
- `FieldPair` component for side-by-side field editing with sync buttons.
- `ArrayEditor` component supports mirror ADD/REMOVE/MOVE via `mirrorItems`/`setMirrorItems` props. Per-item sync via `renderSync` prop.
- Save calls `fetch("/api/content/{section}", { method: "PUT", body: JSON.stringify({ en, id }) })`.
- Image URLs: validated manually via 🔗 check button (`lib/checkImage.ts`), not on save.
- All forms have loading state on save button.

## Deployment

- `output: "standalone"` in both `next.config.ts` files. Docker multi-stage builds.
- Volume mount `/app/data` for SQLite persistence (BE only).
- `.env` files (real credentials) are gitignored. `.env.example` is tracked.
- Root `docker-compose.yml` runs both services. FE `depends_on` BE.
- To update FE only: `docker compose up -d --build fe`.

## Change Notification

After every code change, always explain **what was changed** and **which service to reload**:

- **FE only** → `docker compose up -d --build fe` or restart FE dev server
- **BE only** → `docker compose up -d --build be` or restart BE dev server
- **Both** → `docker compose up -d --build`
- **Docker/infra** → `docker compose up -d`

Format:
```
Changes: [file] — [what changed]
Reload: [FE / BE / Both] → [actual command]
```

Commands:
- FE only → `docker compose up -d --build fe`
- BE only → `docker compose up -d --build be`
- Both → `docker compose up -d --build`
- Docker/infra → `docker compose up -d`

If unclear which service is affected, analyze the file path:
- `Portofolio-FE/` → FE
- `Portofolio-BE/` → BE
- Root config (`docker-compose.yml`, `AGENTS.md`) → depends on content

## Documentation Maintenance

- **AGENTS.md and README.md are source of truth for agent and human.** If you change architecture, API contracts, env vars, deployment flow, or component patterns, update these files in the same session.
- Trigger: new section, new API endpoint, changed env var, changed Docker setup, new component pattern, removed/renamed file.
- Do NOT leave stale info. A wrong rule in AGENTS.md wastes every future agent session.
