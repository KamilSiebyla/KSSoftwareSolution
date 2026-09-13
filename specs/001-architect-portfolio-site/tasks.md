---

description: "Task list template for feature implementation"
---

# Tasks: Architect Portfolio Frontpage

**Input**: Design documents from `/specs/001-architect-portfolio-site/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (all present; no contracts/ — this feature has no external API)

**Tests**: Included as required tasks (not optional) — the project constitution's Testing Standards principle mandates automated tests for all new logic and a full suite gating CI, so test tasks are generated alongside implementation for every user story rather than treated as optional.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story. Spec priorities are US1 = P1, US2 = P2, US3 = P1; phases below are ordered P1, P1, P2 (US1, then US3, then US2) so both P1 stories land before the P2 story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Paths are relative to the repository root (single static frontend project, no `frontend`/`backend` split — per plan.md Structure Decision)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic tooling

- [ ] T001 Initialize the Vite + React project at the repository root (`package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx` scaffolds) per plan.md Project Structure
- [ ] T002 [P] Install and configure Tailwind CSS: `tailwind.config.js`, `postcss.config.js`, and `src/styles/index.css` with the `@tailwind` directives
- [ ] T003 [P] Configure ESLint + Prettier (`.eslintrc`, `.prettierrc`) with zero-warnings-allowed enforced, per the constitution's Code Quality principle
- [ ] T004 [P] Install and configure Vitest + React Testing Library + `jest-dom` (test config in `vite.config.js` or `vitest.config.js`), per research.md's testing-stack decision
- [ ] T005 [P] Install `lucide-react` and the self-hosted `@fontsource` accent heading font package, per research.md's icon and typography decisions
- [ ] T006 Create `.github/workflows/ci.yml` running `npm ci`, `npm run lint`, `npm test`, and `npm run build` on pull requests targeting `development` and `main`, per plan.md's Branching & Release Strategy
- [ ] T007 [P] Create `CONTRIBUTING.md` documenting the `feature/<name>` → `development` → `main` branch flow, PR review requirement, and required branch-protection settings for `main` and `development`, per plan.md's Branching & Release Strategy
- [ ] T008 [P] Create `docs/deployment.md` documenting the Netlify setup: production site deploying from `main`, staging site deploying from `development`, and deploy previews from `feature/*` pull requests, per plan.md's deployment mapping

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared shell and building blocks that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Build the app shell: `index.html` with `<div id="root">` and a `<noscript>` fallback containing the core introduction text and a `mailto:` link (per plan.md Constraints/edge case), and `src/main.jsx` mounting `<App />`
- [ ] T010 Create `src/App.jsx` as the top-level layout that renders page sections in order (Hero, Expertise, Contact), initially with placeholder section components
- [ ] T011 [P] Create `src/content/` module skeleton with the three content shapes from data-model.md (`profile.js`, `expertise.js`, `contactChannels.js`), each exporting an empty/placeholder value matching the documented field shape
- [ ] T012 [P] Build shared UI components in `src/components/` (`Button.jsx`, `SectionHeading.jsx`, `Icon.jsx` wrapping `lucide-react`) reused across sections, per the constitution's UX Consistency principle
- [ ] T013 [P] Implement the `useInView` `IntersectionObserver` hook in `src/hooks/useInView.js`, per research.md's interactivity decision (no animation library)
- [ ] T014 Build a persistent/sticky `src/components/NavBar.jsx` with a placeholder contact link slot, ensuring a contact channel will be reachable in one interaction from anywhere on the page (FR-004) once populated by User Story 3

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Grasp the offering at a glance (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor sees, without scrolling, the professional's name/role/specialization and a call-to-action toward contact.

**Independent Test**: Load the page with only the Hero section built and confirm an unfamiliar reader can state the professional's role and specialization from the initial view alone (spec SC-001).

### Tests for User Story 1

- [ ] T015 [P] [US1] Unit test in `tests/unit/content.profile.test.js` asserting the `ProfessionalProfile` object's `name`, `role`, `specialization`, and `tagline` fields are non-empty strings, per data-model.md's validation rule for this entity
- [ ] T016 [P] [US1] Component test in `tests/unit/Hero.test.jsx` asserting the Hero section renders the profile's name, role, and specialization on initial render (no scroll/interaction required) and renders a call-to-action element

### Implementation for User Story 1

- [ ] T017 [US1] Populate `src/content/profile.js` with the real `ProfessionalProfile` content (name, role "Senior Developer / Software Architect", specialization "System Analysis & Maintenance", tagline), matching data-model.md's field shape
- [ ] T018 [P] [US1] Build `src/sections/Hero.jsx` rendering the profile content from `src/content/profile.js`, styled with Tailwind so it's fully visible without scrolling (FR-001)
- [ ] T019 [US1] Add a visually prominent call-to-action in `Hero.jsx` linking to the Contact section (FR-007)
- [ ] T020 [US1] Apply an entrance animation to `Hero.jsx` using CSS transitions per research.md (no animation library dependency)
- [ ] T021 [US1] Replace the Hero placeholder in `src/App.jsx` with the real `Hero.jsx` section

**Checkpoint**: User Story 1 is fully functional and independently testable/demoable.

---

## Phase 4: User Story 3 - Make contact (Priority: P1)

**Goal**: A visitor can reach the professional via a direct contact channel (email/phone/profile link) in one interaction from anywhere on the page.

**Independent Test**: Confirm a contact channel link is present and reachable from any scroll position, and that activating it opens the correct destination (`mailto:`, `tel:`, or external profile), per spec SC-003/SC-006.

### Tests for User Story 3

- [ ] T022 [P] [US3] Unit test in `tests/unit/content.contact.test.js` constructing the derived `href` for each `ContactChannel` fixture and asserting the correct scheme (`mailto:`/`tel:`/`https:`), per data-model.md's validation rule for this entity
- [ ] T023 [P] [US3] Integration test in `tests/integration/contact-reachable.test.jsx` asserting at least one contact channel link is present and reachable via the persistent `NavBar` regardless of scroll position (FR-004)

### Implementation for User Story 3

- [ ] T024 [US3] Populate `src/content/contactChannels.js` with real `ContactChannel` entries (email required per data-model.md's validation rule; optionally phone and/or LinkedIn), each with a correctly derived `href`
- [ ] T025 [P] [US3] Build `src/sections/Contact.jsx` rendering each `ContactChannel` as an icon + label link with the correct `mailto:`/`tel:`/external `href` (FR-008, FR-009)
- [ ] T026 [US3] Surface at least one `ContactChannel` link in the `NavBar` placeholder slot built in T014, so it's reachable in one interaction from anywhere on the page (FR-004, SC-003)
- [ ] T027 [US3] Add visible keyboard-focus styles and `aria-label`s to all contact links across `Contact.jsx` and `NavBar.jsx` (FR-010)
- [ ] T028 [US3] Replace the Contact placeholder in `src/App.jsx` with the real `Contact.jsx` section

**Checkpoint**: User Stories 1 and 3 (both P1) are independently functional — this is the recommended MVP cutoff.

---

## Phase 5: User Story 2 - Evaluate expertise and credibility (Priority: P2)

**Goal**: A visitor who scrolls past the introduction finds specific, concrete content about the professional's expertise in system analysis and maintenance.

**Independent Test**: Publish only the Hero (US1) plus this section, and confirm a reader can describe the professional's relevant skills/experience afterward (spec User Story 2 acceptance scenarios).

### Tests for User Story 2

- [ ] T029 [P] [US2] Unit test in `tests/unit/content.expertise.test.js` asserting at least one `ExpertiseItem` exists and each has non-empty `title` and `description`, per data-model.md's validation rule for this entity
- [ ] T030 [P] [US2] Component test in `tests/unit/Expertise.test.jsx` asserting the Expertise section renders every `ExpertiseItem`'s title and description

### Implementation for User Story 2

- [ ] T031 [US2] Populate `src/content/expertise.js` with concrete, specific `ExpertiseItem` entries about system analysis and maintenance (not generic filler), per the spec's explicit requirement
- [ ] T032 [P] [US2] Build `src/sections/Expertise.jsx` rendering the `ExpertiseItem` list with `lucide-react` icons and Tailwind card/list styling
- [ ] T033 [US2] Apply scroll-reveal animation to `Expertise.jsx` list items using the `useInView` hook from T013
- [ ] T034 [US2] Verify and adjust `Expertise.jsx` responsive layout at mobile width (375px) so no horizontal scrolling occurs (spec acceptance scenario)
- [ ] T035 [US2] Replace the Expertise placeholder in `src/App.jsx` with the real `Expertise.jsx` section, positioned between Hero and Contact

**Checkpoint**: All three user stories are independently functional.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Verification and release readiness spanning all stories

- [ ] T036 [P] Run a Lighthouse audit against the `npm run preview` build and address any finding below a Performance score of 90 (spec SC-002, plan.md Performance Goals)
- [ ] T037 [P] Perform a full keyboard-only navigation pass across the entire page (nav, Hero CTA, Expertise, Contact) and fix any element that isn't reachable/operable (FR-010)
- [ ] T038 [P] Verify the `<noscript>` fallback in `index.html` (T009) renders the core introduction and a working `mailto:` link with JavaScript disabled
- [ ] T039 Run `npm run lint`, `npm test`, and `npm run build` locally and confirm all three succeed, matching the CI Quality Gates (T006)
- [ ] T040 Execute the full [quickstart.md](./quickstart.md) validation guide end-to-end against the production build
- [ ] T041 Open a pull request from `feature/architect-portfolio-site` into `development`; after merge and staging verification, open the release pull request from `development` into `main` (plan.md Branching & Release Strategy)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3, P1)**: Depends on Foundational only
- **User Story 3 (Phase 4, P1)**: Depends on Foundational only — independent of User Story 1 (its own tests/content/component can be built and verified without Hero being finished, though T026 writes into the shared `NavBar`)
- **User Story 2 (Phase 5, P2)**: Depends on Foundational only — independent of User Stories 1 and 3
- **Polish (Final Phase)**: Depends on all three user stories being complete

### Parallel Opportunities

- Setup: T002, T003, T004, T005 in parallel; T007, T008 in parallel
- Foundational: T011, T012, T013 in parallel (T009 → T010 must happen first as the shell the others plug into; T014 can run alongside T011-T013)
- Once Foundational is complete, User Stories 1, 3, and 2 (Phases 3-5) can be worked in parallel by different contributors on separate `feature/*` branches, since none of them depend on each other
- Within each story: the two test tasks marked [P] can run in parallel with each other, and content-population tasks are independent of shared-component-styling tasks marked [P]

## Parallel Example: User Story 1

```bash
# Launch both User Story 1 tests together:
Task: "Unit test for ProfessionalProfile content in tests/unit/content.profile.test.js"
Task: "Component test for Hero section in tests/unit/Hero.test.jsx"

# Then, content and component work:
Task: "Populate src/content/profile.js with real profile content"
Task: "Build src/sections/Hero.jsx rendering the profile content"
```

## Implementation Strategy

### MVP First (Both P1 Stories)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 and Phase 4: User Story 3 (both P1 — together they satisfy the feature's core purpose: a visitor understands the offering and can make contact)
4. **STOP and VALIDATE**: Run the quickstart.md checks for User Stories 1 and 3 independently
5. Deploy to the `development` staging site if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → validate independently
3. Add User Story 3 → validate independently → this is the MVP checkpoint (both P1 stories done)
4. Add User Story 2 → validate independently → full feature complete
5. Final Phase: polish, then release per the Branching & Release Strategy (feature branch → `development` → `main`)

## Notes

- [P] tasks touch different files with no unmet dependencies
- Tests were included as required tasks (not optional) because of the constitution's Testing Standards principle — write and confirm they fail before implementing each task pair, per the constitution's Test-first spirit
- Commit after each task or logical group
- Stop at each checkpoint to validate a story independently before starting the next
