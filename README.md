# Architect Portfolio Frontpage

A single-page frontpage for **KS Software Solutions**, a software development and systems
consultancy specializing in **system analysis and maintenance**, built to attract and convert
prospective clients. Built with React, Vite, and Tailwind CSS; deployed as a fully static site.

Full spec-driven development history (spec, plan, research, and task breakdown) lives in
[`specs/001-architect-portfolio-site/`](specs/001-architect-portfolio-site/).

## Features

- **Introduction (Hero)** — name, role, and specialization visible without scrolling, plus a
  call-to-action toward Contact.
- **Expertise section** — four concrete areas of expertise (legacy system analysis, maintenance
  & refactoring strategy, root-cause debugging, architecture review), not generic filler.
- **Approach ("How We Work") section** — the engagement presented as an animated 5-step timeline
  (discovery/audit, risk assessment, stakeholder conversations, documentation & report, walkthrough
  & handover), covering data governance (self-hosted analysis, not third-party cloud AI) and the
  written report delivered at the end.
- **Contact** — direct `mailto:`/`tel:`/external-profile links only. No contact form, and no
  visitor data is ever captured or stored.
- **Persistent navigation** — a contact channel is reachable in one click from anywhere on the
  page.
- **Cookie consent, built in advance** — the site sets no cookies and runs no tracking today, but
  the consent banner/storage/policy page (`/privacy.html`) are already wired up so adding
  analytics later just means gating the script behind `hasAccepted()` (`src/lib/cookieConsent.js`)
  rather than retrofitting consent afterward.
- Fully responsive (mobile → desktop), keyboard-operable, and screen-reader-perceivable.
- Works with JavaScript disabled via a `<noscript>` fallback containing the core introduction and
  a working email link.

## Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · `lucide-react` (icons) · `@fontsource/space-grotesk` (font) ·
Vitest + React Testing Library (tests) · ESLint + Prettier · GitHub Actions (CI) · Netlify
(hosting)

No backend, no database — this is a static site by design (see
[`specs/001-architect-portfolio-site/research.md`](specs/001-architect-portfolio-site/research.md)
for why, including why Netlify replaced the originally-requested Heroku).

## What was built

All 41 tasks in
[`specs/001-architect-portfolio-site/tasks.md`](specs/001-architect-portfolio-site/tasks.md) are
complete:

| Phase | Tasks | Summary |
|---|---|---|
| Setup | T001–T008 | Vite/React/Tailwind scaffold, ESLint/Prettier, Vitest, CI workflow, branching & deployment docs |
| Foundational | T009–T014 | App shell + `<noscript>` fallback, shared components, `useInView` scroll-reveal hook, persistent nav |
| User Story 1 — Grasp the offering | T015–T021 | Hero section + profile content |
| User Story 3 — Make contact | T022–T028 | Contact section + channel content, surfaced in nav |
| User Story 2 — Evaluate expertise | T029–T035 | Expertise section + content |
| Polish & release | T036–T041 | Lighthouse audit, keyboard/accessibility pass, noscript verification, full CI check, feature + release PRs |

Delivered through 5 pull requests, each independently reviewed and merged into `development`
before the final release PR into `main`: [#1](https://github.com/KamilSiebyla/KSSoftwareSolution/pull/1)
(Hero), [#2](https://github.com/KamilSiebyla/KSSoftwareSolution/pull/2) (Contact),
[#3](https://github.com/KamilSiebyla/KSSoftwareSolution/pull/3) (Expertise),
[#4](https://github.com/KamilSiebyla/KSSoftwareSolution/pull/4) (polish/release verification),
[#5](https://github.com/KamilSiebyla/KSSoftwareSolution/pull/5) (`development` → `main` release).

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the branch model
(`feature/<name>` → `development` → `main`) used throughout.

## Test results

```text
npm run lint    →  0 warnings (ESLint, --max-warnings=0)
npm test        →  16/16 tests passing (7 test files, Vitest + React Testing Library)
npm run build   →  succeeds
```

**Lighthouse** (production build, desktop preset): **Performance 100 · Accessibility 100 · Best
Practices 100 · SEO 100** — well above the ≥90 performance target set in
[`plan.md`](specs/001-architect-portfolio-site/plan.md). The only flagged item was the ~3.5 KB
Tailwind stylesheet being technically "render-blocking" (~150 ms), immaterial at a perfect score.

## Known issues

- **Production site currently returns HTTP 401.** The Netlify site
  (`kssoftwaresolution.netlify.app`) has some form of visitor access restriction enabled (likely
  Site protection / password protection under Site configuration → Visitor access in the Netlify
  dashboard). The build itself succeeds; this needs to be disabled in Netlify's settings for the
  site to be publicly reachable.
- **Only an email contact channel is configured** — no phone number or LinkedIn link yet. Add
  entries to `src/content/contactChannels.js` if more channels are wanted.
- **5 `npm audit` findings**, all in dev-only tooling (Vite's dev server, Vitest's mocker) — they
  do not affect the production build/runtime. Fixing them requires a major-version jump (Vite 8,
  Vitest 5) beyond what this plan called for; left as a deliberate follow-up.
- GitHub branch protection on `main`/`development` (documented in `CONTRIBUTING.md`) has not
  actually been configured yet in the repository's settings.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run lint      # ESLint
npm test          # Vitest
npm run build     # production build
npm run preview   # serve the production build locally
```

See [`specs/001-architect-portfolio-site/quickstart.md`](specs/001-architect-portfolio-site/quickstart.md)
for a full manual validation walkthrough, and
[`docs/deployment.md`](docs/deployment.md) for the Netlify deployment setup.
