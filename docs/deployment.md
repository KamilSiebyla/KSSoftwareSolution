# Deployment

This is a fully static site (Vite build output — HTML/CSS/JS, no backend). It's hosted on
[Netlify](https://www.netlify.com)'s free tier rather than Heroku — see
`specs/001-architect-portfolio-site/research.md` for why (Heroku's free dyno tier was
discontinued in 2022, and this feature has no server-side component for Heroku to run anyway).

## One-time setup (manual, via the Netlify dashboard)

1. Sign in to Netlify with the `KamilSiebyla` GitHub account and "Add a new site" → "Import an
   existing project" → select `KamilSiebyla/KSSoftwareSolution`.
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Create two Netlify sites (or one site with branch-deploy settings covering both):
   - **Production site** — deploys from the `main` branch.
   - **Staging site** — deploys from the `development` branch (Netlify's "Branch deploys" setting).
4. Deploy previews: enable "Deploy previews" for pull requests — this automatically gives every
   `feature/*` → `development` pull request its own preview URL.

## Ongoing flow

- Opening a PR from a `feature/*` branch → a deploy preview URL is posted on the PR automatically.
- Merging to `development` → the staging site updates.
- Merging `development` into `main` (a release) → the production site updates.

No environment variables or secrets are required for this deployment, since the app makes no
network calls and has no backend.
