# Aditya Shah — Portfolio

A static Next.js portfolio positioning Aditya at the intersection of technical customer experience, WordPress infrastructure, production operations, security, automation, and team leadership.

## Routes

- `/` — portfolio homepage with selected public work and curated technical articles
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

The homepage uses three curated technical articles from `content.json`. Light is the default theme; a visitor’s explicit theme choice is remembered locally.
