# Aditya Shah — Portfolio

A static Next.js portfolio positioning Aditya at the intersection of technical customer experience, WordPress infrastructure, production operations, security, automation, and team leadership.

## Routes

- `/` — portfolio homepage with a live WordPress REST API article feed and local fallback
- `/recruiter/` — concise printable recruiter view
- `/robots.txt` and `/sitemap.xml` — generated SEO files

## Local development

```bash
npm install
npm run dev
```

## Validation and export

```bash
npm run lint
npm run build
```

The build uses `output: 'export'` and writes the GitHub Pages-compatible site to `out/`. Content lives in `public/content.json`; claim sourcing and removed claims are documented in `docs/CONTENT-SOURCES.md`.

The homepage fetches three recent posts from `https://adityashah.blog/wp-json/wp/v2/posts?per_page=3&_embed=wp:term` in the browser. If that request fails, the published fallback entries in `content.json` remain visible.
