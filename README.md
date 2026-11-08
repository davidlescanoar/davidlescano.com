# davidlescano.com

Personal website of David Lescano, Full-Stack Software Engineer in Munich.

Next.js 16 (App Router, fully static), React 19, TypeScript (strict), Tailwind CSS v4 and next-themes. No backend, no
database, no cookies, no third-party scripts.

[![CI](https://github.com/davidlescanoar/davidlescano.com/actions/workflows/ci.yml/badge.svg)](https://github.com/davidlescanoar/davidlescano.com/actions/workflows/ci.yml)

## Quick start

Requires Node 26 LTS (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev          # http://localhost:3000
npm run dev:drafts   # same, but shows placeholders and draft case studies
```

| Command             | What it does                                                                     |
| ------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`       | Local dev server                                                                 |
| `npm run build`     | Production build                                                                 |
| `npm start`         | Serve the production build                                                       |
| `npm run lint`      | ESLint (Next.js core web vitals + TypeScript rules)                              |
| `npm run format`    | Prettier, including Tailwind class sorting                                       |
| `npm run typecheck` | TypeScript, no emit                                                              |
| `npm test`          | Content guard rails and unit tests (Vitest)                                      |
| `npm run test:e2e`  | End-to-end and accessibility tests (Playwright + axe), run after `npm run build` |
| `npm run check`     | Typecheck, lint, format check, unit tests and build                              |

## Quality gates

Every push and pull request runs [CI](.github/workflows/ci.yml):

1. **Typecheck, lint, format check.**
2. **Unit tests** (`tests/`). Besides normal checks, they enforce the same rules as the CV: no degree claims, no
   achievement percentages, no client names except Rheinmetall, no street address or phone number, and a work history
   without gaps.
3. **Production build.** Every route is prerendered as static HTML.
4. **End-to-end tests** (`e2e/`) against the production build, on desktop and mobile Chrome: the key facts a recruiter
   looks for, navigation, the mobile menu's focus handling, theme persistence, security headers, the sitemap, the 404
   page, and an [axe](https://github.com/dequelabs/axe-core) WCAG 2.2 AA scan of every page in light and dark mode.
5. **Lighthouse budgets** ([`lighthouserc.json`](lighthouserc.json)): performance ≥ 95, accessibility 100, best
   practices ≥ 95, SEO 100.

Dependabot keeps dependencies and actions current.

## Editing content

Everything personal lives in a few typed files. No component needs to change for routine updates.

| To change                                 | Edit                          |
| ----------------------------------------- | ----------------------------- |
| Name, links, availability, languages, SEO | `src/config/site.ts`          |
| Jobs (keep in sync with the CV)           | `src/data/experience.ts`      |
| Skills                                    | `src/data/skills.ts`          |
| Projects and case studies                 | `src/content/projects.ts`     |
| Notes / articles                          | `src/content/writing.ts`      |
| About page                                | `src/app/about/page.tsx`      |
| CV download                               | `public/david-lescano-cv.pdf` |

The CV in `public/` is the public variant of the master CV: same content, but without street address and phone number.

### Projects

`projects` is empty on purpose. Once it has an entry, the Projects section, the nav link, the `/projects` index, the
case-study pages and their sitemap entries all appear. Until then `/projects` returns 404.

A case study stays `status: "draft"` until its overview, role and architecture are written (the tests enforce this).
Drafts are not built, linked or indexed in production. Screenshots go in `public/projects/<slug>/`.

### Draft mode

`NEXT_PUBLIC_SHOW_DRAFTS=true` renders placeholders and draft case studies (marked `noindex`). Never set it on Vercel
production; it's fine on Preview deployments.

### Writing

The Notes section, nav link and `/writing` route appear once a note with `status: "published"` exists. If notes grow
long, switch to MDX (`@next/mdx`) and keep `writing.ts` as the index.

## Design system

Tokens live at the top of `src/styles/globals.css` as CSS variables, with light values on `:root` and dark values on
`.dark`. Tailwind exposes them as `bg-bg`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-muted`, `text-accent`,
`bg-highlight`, `text-peach`, `text-peach-ink`, `border-line`, plus `font-display` and `font-mono`.

**Concept: "blueprint and highlighter."** An editorial, recruiter-first layout: numbered sections, experience early,
generous whitespace. Personality comes from two recurring marks: a faint engineering grid behind illustrations, and a
lime highlighter stroke under one phrase per section. The hero's one interactive detail is a three-layer system diagram
(Interface, API, Data) with a request packet travelling through it. All motion respects `prefers-reduced-motion`.

- **Type:** Space Grotesk (display), Geist (body), Geist Mono (labels). Self-hosted by `next/font`.
- **Color:** warm off-white, forest green as the only strong accent, lime for highlights, peach for small accents. Dark
  mode uses mint as the accent.
- **Theme:** follows the system setting; a manual choice is remembered, with no flash on load.

## Security and privacy

- Strict security headers from `next.config.ts`: a Content Security Policy that only allows this origin, `nosniff`,
  `frame-ancestors 'none'`, a restrictive `Permissions-Policy`.
- Vercel Web Analytics (page views) and Speed Insights (real-visitor Core Web Vitals): both cookieless, so no consent
  banner.
- The Impressum and privacy pages return 404 until reviewed texts are in place; then set `site.legal.impressumReady`
  and `site.legal.privacyReady` to `true` and the footer links appear. Not legal advice.

## Deploying to Vercel

1. In Vercel, "Add New Project" and import this repository. Defaults work.
2. In the project, enable Analytics and Speed Insights (one click each).
3. In Project Settings → Domains, add `davidlescano.com` and `www.davidlescano.com` and follow the DNS instructions.
4. Every push to `main` deploys production; pull requests get preview URLs.

No environment variables are required.
