# Phase 0 Research: Architect Portfolio Frontpage

## Decision: Hosting — Netlify (free tier) instead of Heroku

**Rationale**: Heroku permanently removed its free dyno tier in November 2022; the cheapest paid
option today is a $5/mo Eco Dyno (sleeps after 30 min idle) or $7/mo Basic Dyno, confirmed
live during planning. Separately, and more importantly: this feature has **no backend** — it's a
static bundle of HTML/CSS/JS with no server-side logic or data storage (per spec FR-008/FR-009,
contact is direct `mailto:`/`tel:`/profile links only). Heroku is built around running dynos
(long-lived server processes); putting a static site on it would mean adding a small Node/Express
process just to serve static files, which is unnecessary work and cost for zero benefit. A
static-hosting platform is both free and the technically correct fit.
**Alternatives considered**:
- **Heroku Eco/Basic Dyno ($5-7/mo)** — rejected: costs money (contradicts "for free"), and
  requires an artificial Express server just to serve a static build.
- **Vercel / Cloudflare Pages / GitHub Pages** — all viable free alternatives with the same core
  properties (git-based deploy, global CDN, free HTTPS). Netlify was chosen as the default for its
  especially simple zero-config Vite support and automatic PR preview deployments (which pairs
  well with the constitution's PR-review Development Workflow gate); any of the others could be
  substituted later with no change to the application code, since the deployable artifact is just
  the static `vite build` output.

## Decision: Language — plain JavaScript (no TypeScript)

**Rationale**: Explicitly requested by the user ("This SPA should be interactive, so you can use
JavaScript"), and it keeps the toolchain smaller (no type-checker, no `.d.ts`/type-dependency
overhead) for a small, single-page feature — consistent with the "minimal number of libraries"
guidance.
**Alternatives considered**: TypeScript — better long-term maintainability on larger codebases,
but rejected here as unnecessary overhead for the current scope; nothing in this plan blocks
adding it later if the codebase grows.

## Decision: Interactivity/animation — native CSS transitions + a small `useInView` hook, no animation library

**Rationale**: The spec's "eye catching"/interactive requirements (FR-003) can be met with CSS
`transition`/`transform` and a small (~20 line) custom hook using `IntersectionObserver` to trigger
scroll-reveal effects, hover states, and a hero entrance animation. This avoids adding a ~30-50kB
animation library, which directly protects the SC-002 (<2s initial load) and Lighthouse Performance
targets, and matches the user's stated preference for a minimal dependency set.
**Alternatives considered**: **Framer Motion** — a strong, well-documented option if the design
grows more animation-heavy (spring physics, gesture-driven interactions, layout animations) than
what's planned here; deliberately not included now, but noted as the natural upgrade path if
future design ambitions exceed what CSS transitions comfortably express.

## Decision: Icons — `lucide-react`

**Rationale**: Contact channels (email/phone/LinkedIn) and expertise highlights benefit from
recognizable icons rather than text alone, which supports both the "eye catching" and credibility
goals. `lucide-react` is tree-shakeable (only the specific icons imported are bundled, a few
hundred bytes each), actively maintained, and avoids hand-maintaining raw SVG markup.
**Alternatives considered**: **Inline hand-written SVGs** — zero dependencies, but more
maintenance burden and easy to get accessibility attributes (e.g. `aria-hidden`, `<title>`) wrong;
**Heroicons** — comparable option, `lucide-react` preferred for its broader icon set (useful for
varied expertise/skill iconography).

## Decision: Typography — system font stack for body text, one self-hosted display font for headings

**Rationale**: A pure system-font stack (`ui-sans-serif`, `system-ui`, ...) is free, requires zero
network requests, and is the safest choice for the <2s load target. To still give the page a
distinctive, "eye catching" visual identity (FR-003) rather than looking like an unstyled default,
one accent font is added for headings only, self-hosted via `@fontsource` (so it's bundled and
subset at build time, not fetched from Google's CDN at runtime) and limited to the 1-2 weights
actually used.
**Alternatives considered**: **Google Fonts `<link>` tag** — simplest to set up, but adds an
external, render-blocking network request that works against the performance target;
**all-system-fonts, no accent font** — safest for performance, but risks the "generic bootstrap
look" the spec explicitly warns against (Assumptions: "eye catching" means a deliberate, cohesive
design, not default styling) — rejected in favor of the single self-hosted accent font as a better
balance.

## Decision: No SSR/prerendering — client-rendered React with a `<noscript>` fallback

**Rationale**: The spec's edge case asks what a visitor with JavaScript disabled sees. Full
server-side rendering or static prerendering (e.g. an SSG plugin) would satisfy this most
completely, but adds meaningful build-tooling complexity for a feature whose target audience
(technical clients evaluating a developer/architect) overwhelmingly browses with JavaScript
enabled. The pragmatic, low-cost resolution: a `<noscript>` block in `index.html` containing the
plain-text core introduction (name, role, specialization) and a direct `mailto:` link, so the
absolute minimum ("who is this and how do I reach them") still works with JavaScript off, without
adopting an SSR/SSG toolchain for what would be a rare visitor scenario.
**Alternatives considered**: **Static prerendering (e.g. an SSG plugin/build step)** — the more
complete fix; left as a documented future option if analytics ever show a meaningful no-JS
audience, rather than committed to now given the added build complexity.

## Decision: Testing stack — Vitest + React Testing Library

**Rationale**: Vitest shares configuration and transform pipeline with Vite (no separate
bundler/config to maintain), and pairs with React Testing Library for behavior-focused component
tests (e.g. "the contact link renders with the correct `href`", "the introduction is visible
without scrolling"). This satisfies the constitution's Testing Standards principle (automated
tests required, full suite required in CI) with the smallest reasonable toolchain.
**Alternatives considered**: **Jest** — the more traditional choice, but requires extra
configuration to work smoothly with Vite's ESM-first pipeline; **Playwright/Cypress E2E** —
valuable for full browser/keyboard-navigation/visual checks, but heavier than this single-page,
backend-less feature needs at this stage; noted as a reasonable future addition if the site grows
additional interactive flows.

## Decision: CI — GitHub Actions running lint + test on every PR

**Rationale**: The repository's origin is already `github.com/KamilSiebyla/KSSoftwareSolution`, so
GitHub Actions requires no new tooling account. A single workflow running ESLint and the Vitest
suite on every pull request directly implements the constitution's Quality Gates section (lint and
tests block merge) and Development Workflow section (PR review + passing gates before merge).
**Alternatives considered**: none seriously — using the CI already native to the hosting git
provider is the standard, lowest-overhead choice for a project this size.
