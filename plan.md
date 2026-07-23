# Portfolio — Rencana Pengembangan

Berdasarkan review codebase (Juli 2026).

## Prioritas

### 🔴 Tinggi — Dikerjakan duluan

| # | Fitur | Alasan | Effort |
|---|-------|--------|--------|
| 1 | SEO metadata + favicon + OG image | Portfolio tanpa SEO = invisible di Google. `layout.tsx` belum punya `og:image`, `robots.txt`, `sitemap.xml` | Rendah |
| 2 | 404 page | Belum ada. User yang salah URL langsung blank page | Rendah |
| 3 | Loading & error states pada homepage fetch | BE down = white screen. Perlu fallback | Rendah |
| 4 | Contact form | Saat ini hanya link luar. Form (name, email, message) → POST BE → simpan DB/kirim email. Lebih profesional | Sedang |

### 🟡 Sedang — Setelah yang tinggi selesai

| # | Fitur | Alasan | Effort |
|---|-------|--------|--------|
| 5 | Resume/CV section | Section dedicated untuk education, experience, skills — lebih detail dari "about" | Sedang |
| 6 | Testimonials / Recommendations | Social proof. Dari client/rekan kerja | Sedang |
| 7 | Sitemap + robots.txt | SEO lanjutan. Auto-generate dari content sections | Rendah |
| 8 | Simple analytics (e.g. Umami self-hosted) | Data pengunjung dasar | Sedang |

### 🟢 Rendah — Dikerjakan hanya jika perlu

| # | Fitur | Alasan skip |
|---|-------|-------------|
| — | Blog | Portfolio ≠ blog. Overhead konten besar |
| — | Dark/light mode toggle | Tema dark sudah konsisten |
| — | Image upload | URL-based sudah cukup. Upload = file handling + storage |
| — | CMS dashboard enhancement | Admin panel sudah fungsional |

## Catatan

- **YAGNI**: Jangan tambah fitur sebelum tiga prioritas tinggi selesai.
- Setiap fitur ditambahkan melalui section baru di `i18n.ts` (FE + BE) + komponen FE + form admin + route BE.
- Update `AGENTS.md` dan `README.md` setelah setiap perubahan signifikan.
