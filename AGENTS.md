# AGENTS.md

Instructions for AI coding agents working on this repository. Humans: see [README.md](README.md).

This is the personal website of David Lescano, a full-stack software engineer. It goes out with every job application,
so **every sentence must be true, and every change must keep the site fast, accessible and polished.**

## Commands

| Command            | When                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `nvm use`          | First. The project requires Node 26 (`.nvmrc`); scripts refuse older |
| `npm run dev`      | Local dev server on http://localhost:3000                            |
| `npm run check`    | Before every commit: typecheck, lint, format check, tests, build     |
| `npm run test:e2e` | After `npm run build`: Playwright + axe on desktop and mobile        |
| `npm run format`   | Fix formatting (Prettier, Tailwind classes sorted)                   |

A change is done only when `npm run check` and `npm run test:e2e` both pass. CI runs the same checks plus Lighthouse
budgets (`lighthouserc.json`).

## Where things live

| What                              | Where                                       |
| --------------------------------- | ------------------------------------------- |
| Name, links, languages, SEO       | `src/config/site.ts`                        |
| Work history                      | `src/data/experience.ts`                    |
| Skills                            | `src/data/skills.ts`                        |
| Projects and case studies         | `src/content/projects.ts`                   |
| Notes                             | `src/content/writing.ts`                    |
| Content helpers (what is visible) | `src/lib/content.ts`                        |
| Design tokens                     | top of `src/styles/globals.css`             |
| Security headers (CSP)            | `next.config.ts`                            |
| Content rules as tests            | `tests/content-rules.ts`, `content.test.ts` |
| End-to-end and accessibility      | `e2e/site.spec.ts`                          |
| Public CV                         | `public/david-lescano-cv.pdf` (do not edit) |

Routine content updates only touch the content files. Components read from them.

## Content rules (never break)

The content mirrors David's CV, and the same rules apply. Several are enforced by `tests/content-rules.ts`, which checks the
content files and the rendered text of every page.

1. **No invented facts.** Never add employers, projects, technologies, responsibilities, dates or results that David
   hasn't confirmed. If something is missing, leave it out and ask.
2. **No metrics.** No percentages, user counts or speed-ups. The only number allowed is "a team of 4 developers".
3. **No degree.** Computer Science at the University of Buenos Aires was not completed. Never write "degree",
   "Bachelor", "Master", "graduated" or "thesis".
4. **Clients stay anonymous.** Rheinmetall is the only client that may be named. Describe other clients by industry,
   such as "a US insurance technology company".
5. **No private data.** No street address, no phone number. The public CV deliberately has neither.
6. **No gaps in the timeline.** Every job stays listed, newest first, with `MM/YYYY` dates.
7. **Don't inflate.** Rewording is fine; changing scope is not ("contributed to" never becomes "led").
8. **Nothing fake.** No mocked-up screenshots, no placeholder projects, no lorem ipsum in production.

## Engineering rules

- **Static only.** Every route is prerendered. No server-side data fetching, API routes, databases or environment
  secrets.
- **Empty means hidden.** Sections, nav links and routes appear only when real content exists (see
  `src/lib/content.ts`). Unfinished case studies and notes stay `status: "draft"`: visible in `npm run dev`, never
  built for production.
- **No third-party scripts, fonts or images.** The CSP allows only this origin. Fonts are self-hosted with `next/font`.
  Vercel Analytics and Speed Insights load from `/_vercel` and are the only tracking.
- **Use the design tokens** (`bg-surface`, `text-muted`, `text-accent`, `border-line`, ...), never hard-coded colors.
  Every change must work in light and dark mode.
- **Accessibility is a requirement.** Semantic HTML, visible focus, 44px touch targets, text contrast of at least 4.5:1
  (use `text-peach-ink`, not `text-peach`, for text), and every animation must respect `prefers-reduced-motion`.
- **TypeScript is strict**, including `noUncheckedIndexedAccess`. No `any`, no `@ts-ignore`.
- **Prefer fixing the cause over silencing a rule.** Don't disable ESLint rules or skip tests to make a check pass.
- **Dependencies:** pin exact versions (`npm install --save-exact`), and prefer releases that are at least two weeks old.
  New packages with install scripts must be reviewed with `npm install-scripts ls`.

## Style

- **Copy:** English (en-GB dates, e.g. "1 Jan 2026"), short sentences, first person on the site, no buzzwords.
- **Code:** match the surrounding code. Small components, no comments that restate the code.
- **Commits:** short, imperative subject line ("Add notes section"), one topic per commit.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
