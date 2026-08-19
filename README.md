# Learn LLM Foundations

An interactive, noncommercial companion to *Foundations of Large Language Models* by Tong Xiao and Jingbo Zhu. All five chapters are adapted into 22 focused lessons and eight deterministic concept labs.

## Project structure

```text
src/
|-- app/                         # Next.js App Router pages and metadata
|   `-- chapters/[chapter]/      # Static chapter and lesson routes
|-- components/
|   |-- content/                 # MDX callouts and source notes
|   `-- simulators/              # Isolated client-side interactive labs
|-- content/
|   |-- chapters/                # All MDX lessons grouped by chapter slug
|   `-- lesson-components.ts     # Explicit static MDX import map
`-- lib/                         # Content registry and tested calculations
public/
`-- resources/                   # Source PDF served by the site
references/
`-- foundations-of-large-language-models.pdf # Original source book
```

The content registry in `src/lib/content.ts` is the source of truth for navigation, static parameters, metadata, glossary links, and the sitemap. MDX stays server-rendered; only components under `components/simulators` use client state.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin for correct sitemap and social metadata.

## Verification

```bash
npm run check
```

This runs ESLint, TypeScript, Vitest, and a production Next.js build. The same sequence runs in `.github/workflows/ci.yml`.

## Deploy to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import it into Vercel. The included `vercel.json` identifies the Next.js framework; no custom build command is required.
3. Add `NEXT_PUBLIC_SITE_URL` with the production origin in Project Settings > Environment Variables.
4. Deploy. Vercel creates preview deployments for branches and production deployments from the production branch.

No database, API key, server runtime service, or writable filesystem is required. For a CLI deployment, install the Vercel CLI and run `vercel` for preview or `vercel --prod` for production.

## Content and license

The original source book is preserved at `references/foundations-of-large-language-models.pdf` and copied to `public/resources/foundations-of-large-language-models.pdf` for the site's download link. The source PDF's printed notice specifies CC BY-NC 4.0. Site copy is condensed and diagrams/interactions are original implementations; see `/license` for attribution.
