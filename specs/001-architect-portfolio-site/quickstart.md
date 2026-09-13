# Quickstart: Architect Portfolio Frontpage

Validates that the feature works end-to-end once implemented. Assumes Node.js (LTS) and npm are
installed.

## Prerequisites

- Node.js LTS and npm installed
- Repository cloned, on branch `001-architect-portfolio-site`
- `npm install` run at the repository root (installs React, Vite, Tailwind, Vitest, and the other
  dependencies decided in [research.md](./research.md))

## Run locally

```bash
npm run dev
```

Open the printed local URL (Vite's default is `http://localhost:5173`). Expected: the introduction
(name, role, "System Analysis & Maintenance" specialization) is visible immediately without
scrolling, per spec FR-001 / SC-001.

## Validate primary user journeys

1. **User Story 1 — grasp the offering at a glance**
   - Load the page and, without scrolling, confirm the professional's name, role, and
     specialization are visible, along with a visually prominent call-to-action.
   - Expected per spec SC-001: a first-time reader can state the role and specialization after
     viewing only this initial view.

2. **User Story 2 — evaluate expertise**
   - Scroll to the expertise section.
   - Confirm each expertise item shows a specific, concrete title and description (not generic
     filler), per FR-002.
   - Resize the browser to a mobile width (e.g. 375px) and confirm the content remains legible
     with no horizontal scrolling, per the corresponding acceptance scenario.

3. **User Story 3 — make contact**
   - From the top of the page (before scrolling to any dedicated contact section), confirm at
     least one contact channel is reachable in a single click/tap (spec FR-004, SC-003).
   - Click the email contact channel and confirm it opens a `mailto:` link addressed to the
     correct email (spec FR-009).
   - Click the phone contact channel (if present) and confirm it opens a `tel:` link with the
     correct number.
   - Click any external profile channel (e.g. LinkedIn) and confirm it opens the correct URL.

4. **Edge case — JavaScript disabled**
   - Disable JavaScript in the browser (or view page source) and reload the page.
   - Confirm the `<noscript>` fallback shows the core introduction text and a working `mailto:`
     link.

5. **Edge case — keyboard/screen reader access**
   - Using Tab/Shift+Tab only (no mouse), confirm every interactive element (nav links,
     call-to-action, all contact channels) can be reached and activated, per FR-010.

## Run automated checks

```bash
npm run lint      # ESLint — must report zero warnings (Quality Gates)
npm test          # Vitest + React Testing Library — full suite must pass (Quality Gates)
npm run build     # production build — must complete without errors
```

Expected: all three commands exit successfully; this mirrors exactly what the CI workflow
(`.github/workflows/ci.yml`) runs on every pull request.

## Validate the production build locally

```bash
npm run build
npm run preview
```

Open the printed preview URL and repeat the User Story checks above against the production build,
since Tailwind's purge/minification step and any code-splitting only take effect there.

## Validate performance target

Run a Lighthouse audit (Chrome DevTools → Lighthouse, or `npx lighthouse <preview-url>`) against
the `npm run preview` build. Expected: Performance score ≥90 on both mobile and desktop presets,
and the introduction content visibly renders in under 2 seconds on a throttled "Fast 3G"/typical
broadband profile, per spec SC-002.

## Validate deployment

Push the branch and open a pull request. Expected: the GitHub Actions workflow runs lint + tests,
and Netlify creates a deploy preview URL on the PR (per research.md's hosting decision) — open that
preview URL and spot-check the introduction and one contact channel to confirm the deployed build
matches local behavior.
