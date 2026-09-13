# Implementation Plan: Architect Portfolio Frontpage

**Branch**: `001-architect-portfolio-site` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-architect-portfolio-site/spec.md`

## Summary

A single-page, client-rendered marketing site for a senior developer/architect specializing in
system analysis and maintenance. It presents an attention-grabbing introduction, a credible
expertise section, and one-click static contact channels (email/phone/LinkedIn — no form, no
backend), built with React + Vite + Tailwind CSS and deployed to a free static host (Netlify).

## Technical Context

**Language/Version**: JavaScript (ES2022+), no TypeScript — per explicit user request ("you can
use JavaScript") and to keep tooling minimal.

**Primary Dependencies**: React 18, Vite 5 (build/dev server), Tailwind CSS 3 (+ PostCSS,
Autoprefixer). `lucide-react` for lightweight, tree-shaken contact/skill icons. See
[research.md](./research.md) for the animation-library and icon-library evaluation.

**Storage**: N/A — fully static site, no backend, no database. Contact is handled via direct
`mailto:`/`tel:`/profile links only (per spec FR-008/FR-009); nothing is captured or persisted.

**Testing**: Vitest + React Testing Library for component/unit tests; `jest-dom` matchers.
Satisfies the constitution's Testing Standards principle without adding heavier E2E tooling that
this single-page, backend-less feature doesn't need.

**Target Platform**: Static web hosting on Netlify (free tier), served over a global CDN with
HTTPS. See [research.md](./research.md) for why Netlify replaces the originally-requested Heroku
(Heroku's free tier was discontinued in 2022; this project has no backend, so a static host is
also the better technical fit, not just the cheaper one).

**Project Type**: Single static frontend project (no backend, no monorepo split needed).

**Performance Goals**: Initial content visible/usable in <2s on a typical broadband connection
(spec SC-002); Lighthouse Performance score ≥90 on both mobile and desktop presets.

**Constraints**: No server-side calls of any kind. Must degrade gracefully with JavaScript
disabled/blocked (spec edge case) via a `<noscript>` fallback containing the core introduction
text and a direct `mailto:` link, since this is a client-rendered SPA without server-side
rendering/prerendering (see research.md for why prerendering was judged unnecessary here).

**Scale/Scope**: One page, roughly 4-6 sections (introduction, expertise, optionally
experience/highlights, contact), no user accounts, low/portfolio-level traffic.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|---|---|---|
| I. Code Quality | ESLint + Prettier configured; CI runs lint with zero warnings allowed; all changes via reviewed PR, no direct pushes to `main` | **PASS** — plan adds ESLint/Prettier and a GitHub Actions lint step (see Project Structure); branch protection is a repo-setting task tracked in tasks.md, not a code artifact |
| II. Testing Standards | Automated tests for new logic; full suite runs in CI and blocks merge on failure | **PASS** — Vitest + React Testing Library, run in the same CI workflow as lint, both required checks |
| III. UX Consistency | Shared components/styles reused across sections; accessibility (keyboard operability, screen-reader-perceivable content) is a baseline | **PASS** — Tailwind design tokens (`tailwind.config.js` theme) shared across sections; FR-010 (assistive tech + keyboard operability) is an explicit spec requirement carried into acceptance tests |
| IV. Performance Requirements | Explicit, documented performance target; regressions treated as bugs | **PASS** — SC-002 and the Lighthouse ≥90 target above are the documented targets; Lighthouse CI is proposed in research.md as an optional follow-up gate |

No violations identified. Complexity Tracking table below is intentionally empty.

*(Re-checked after Phase 1 design — no new violations introduced by the data model or component
structure; still PASS on all four principles.)*

## Project Structure

### Documentation (this feature)

```text
specs/001-architect-portfolio-site/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md         # Phase 1 output (/speckit-plan command)
└── tasks.md              # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

No `contracts/` directory: this feature exposes no API, CLI, or other machine-consumable
interface to external systems — its only "interface" is the rendered page itself, which the spec's
acceptance scenarios and this plan's `data-model.md` already fully describe.

### Source Code (repository root)

```text
KSSoftwareSolution/                  # repo root doubles as the project root — single static
│                                     # frontend, no backend, so no frontend/backend split needed
├── index.html                       # Vite entry HTML; contains the <noscript> fallback
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/                          # static assets copied as-is (favicon, robots.txt, resume/CV file if added later)
├── src/
│   ├── main.jsx                     # React entry point
│   ├── App.jsx                      # top-level layout: renders sections in order
│   ├── sections/                    # one component per page section (Hero, Expertise, Contact, ...)
│   ├── components/                  # shared/reusable building blocks (Button, SectionHeading, Icon, ...)
│   ├── content/                     # structured content data (profile bio, expertise items, contact channels) kept separate from presentation, per data-model.md
│   └── styles/
│       └── index.css                # Tailwind entry (@tailwind base/components/utilities)
├── tests/
│   ├── unit/                        # component-level tests (Vitest + React Testing Library)
│   └── integration/                 # cross-section flows, e.g. "contact channel reachable from anywhere on the page"
└── .github/
    └── workflows/
        └── ci.yml                   # lint + test on every PR (Quality Gates), required to merge
```

**Structure Decision**: Single static frontend project at the repository root. There is no
backend, so the "web application" (frontend+backend) template option does not apply — this uses a
flat single-project layout instead, with `src/content/` separating the actual profile/expertise/
contact copy from the presentational components so the professional can update content without
touching component code (still without needing a full CMS, per spec Assumptions).

## Branching & Release Strategy

This project uses a three-tier branch model instead of merging feature work directly to `main`:

- **`feature/<feature-name>`** — one branch per feature (e.g. `feature/architect-portfolio-site`),
  branched off `development`. All implementation work for a feature happens here.
- **`development`** — integration branch. Every feature branch is merged into `development` via a
  reviewed pull request once its user stories are complete and its Quality Gates (lint + full test
  suite) pass. `development` always reflects the next candidate release.
- **`main`** — production branch. When a release is ready, `development` is merged into `main` via
  a pull request; code on `main` is what actually reaches production. `main` is never committed to
  directly and never receives a feature branch straight — it only ever receives merges from
  `development`.

```text
feature/<feature-name>  --PR-->  development  --PR (release)-->  main  --> production
```

This maps onto the constitution's Development Workflow principle (PR review + passing Quality
Gates required before merge) at **every** arrow above, not just the final one — a feature branch
merging into `development` and `development` merging into `main` both go through review and CI,
not just direct-to-`main` changes.

**Deployment mapping** (extends the Netlify hosting decision in research.md):
- Pushes/PRs to `feature/*` branches get Netlify **deploy previews** (a temporary URL per PR) for
  review, per research.md's existing PR-preview rationale.
- The `development` branch is connected to a **staging** Netlify site, so the integration branch
  is always viewable at a stable staging URL before a release is cut.
- The `main` branch is connected to the **production** Netlify site — merging `development` into
  `main` is what actually publishes the release.
- The CI workflow (`.github/workflows/ci.yml`) runs the same lint + test Quality Gates on pull
  requests targeting either `development` or `main`.

`main` and `development` should both be configured with branch protection (no direct pushes,
required passing status checks, required review) — tracked as a setup task in tasks.md rather than
a code artifact.

## Complexity Tracking

*No Constitution Check violations — table intentionally left empty.*
