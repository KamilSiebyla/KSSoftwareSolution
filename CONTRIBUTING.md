# Contributing

## Branch flow

This repository uses a three-tier branch model (see
`specs/001-architect-portfolio-site/plan.md` for the full rationale):

```text
feature/<feature-name>  --PR-->  development  --PR (release)-->  main  --> production
```

- **`feature/<feature-name>`** — one branch per feature, branched from `development`. All
  implementation work happens here.
- **`development`** — integration branch. Feature branches merge here via a reviewed pull request
  once their Quality Gates (lint + full test suite, run in CI) pass. `development` always reflects
  the next candidate release.
- **`main`** — production branch. Releases are cut by merging `development` into `main` via a pull
  request. `main` is never committed to directly and never receives a feature branch directly.

## Before opening a pull request

Run the same checks CI runs, locally:

```bash
npm run lint
npm test
npm run build
```

## Branch protection (required repository settings)

Both `main` and `development` should have branch protection enabled:

- No direct pushes — changes only land via pull request
- At least one required approving review
- Required passing status check: the `quality-gates` CI job (`.github/workflows/ci.yml`)

These are GitHub repository settings, not files in this repo, so they need to be configured once
in the repository's Settings → Branches page.
