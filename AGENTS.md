<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio — Agent Conventions

## Language & i18n

- Bilingual EN/ID via a flat dict in `app/i18n.ts`. Type `Dict = typeof en`.
- Lang state managed via in-memory store + `useSyncExternalStore` (not localStorage).
- Always default to EN on page load; user can toggle during session.
- Admin panel has side-by-side EN/ID columns.
- Adding a new section requires updating the `en` object, the `id` object (must match structure), and the `Dict` type (inferred automatically).

## Database

- SQLite via `better-sqlite3`, single table `content(section, lang, data TEXT)`.
- Data stored as JSON blobs. Schema auto-creates on first import.
- Seed from `i18n.ts` on first run if DB empty. Source of truth after admin edit is the DB.
- DB file lives at `data/portfolio.db` (gitignored). Path overridable via `DB_PATH`.
- `lib/db.ts` exports `getSection`, `getAllContent`, `upsertContent`, `getAllSections`.
- Do NOT use async DB operations — `better-sqlite3` is synchronous.

## Auth

- HMAC-SHA256 signed cookie (7 days). `lib/auth.ts` for Node.js (Server Actions), `proxy.ts` for Edge.
- Cookie name: `admin_session`, path: `/admin`, httpOnly, secure in production.
- `proxy.ts` guards all `/admin/*` routes (Next.js 16 uses `proxy.ts`, not `middleware.ts`).
- The function must be named `proxy()` and exported.

## CSS

- No Tailwind — plain CSS in `app/globals.css`.
- Design tokens as CSS custom properties: `--violet: #7c2dff`, `--acid: #c8ff00`, `--ink: #14141b`, `--panel: #1e1e28`, `--bone: #f2f0ea`.
- Fonts via `next/font/google`: `Archivo Black` (--font-display), `Space Grotesk` (--font-body).
- Content pane rotation transitions for section nav. Language switch uses horizontal slide+fade.
- Animations use CSS `@keyframes` + JS timers (not CSS `animation-delay` for sequential logic).

## Admin Panel

- Layout: `AdminNav.tsx` wraps children. Login page (`/admin`) renders without nav.
- Forms are client components with state for both EN and ID data.
- `FieldPair` component for side-by-side field editing with sync buttons.
- `ArrayEditor` component supports mirror ADD/REMOVE via `mirrorItems`/`setMirrorItems` props.
- Save calls `saveContentPair(section, enData, idData)` — one action, two upserts.
- Image URLs: validated manually via 🔍 check button (`lib/checkImage.ts`), not on save.
- All forms have loading state on save button.

## Deployment

- `output: "standalone"` in `next.config.ts`. Docker multi-stage build.
- Previous Docker bug: `next start` fails with standalone output. Use `node /app/.next/standalone/server.js`.
- Volume mount `/app/data` for SQLite persistence.
- `.env` files (real credentials) are gitignored. `.env.example` is tracked.
