# Phase 1 Data Model: Architect Portfolio Frontpage

There is no database and no runtime data mutation — everything below is **static content data**,
authored as plain JavaScript/JSON objects under `src/content/` and imported directly into
components at build time (per spec Assumptions: content is authored/maintained via code changes,
no CMS). "Entities" here describe the shape of that content, not persisted records.

## ProfessionalProfile

Represents the individual — used to render the introduction/hero section (spec FR-001, User Story 1).

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Displayed as the primary brand/identity |
| `role` | string | yes | e.g. "Senior Developer / Software Architect" |
| `specialization` | string | yes | e.g. "System Analysis & Maintenance" — must be visible without scrolling (FR-001) |
| `tagline` | string | yes | Short supporting line reinforcing the value proposition, shown alongside the CTA (FR-007) |
| `avatarUrl` | string (asset path) | no | Optional photo/portrait; layout must not depend on its presence |

**Validation rules**: `name`, `role`, `specialization`, and `tagline` must be non-empty strings —
enforced by a unit test asserting the imported content object satisfies this shape, not by runtime
user input validation (there is no user input here).

## ExpertiseItem

Represents one entry in the expertise/credibility section (spec FR-002, User Story 2). Rendered as
a list of these.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable key for list rendering |
| `title` | string | yes | e.g. "Legacy System Analysis", "Maintenance & Refactoring Strategy" |
| `description` | string | yes | Concrete, specific description — spec explicitly requires avoiding generic buzzword filler |
| `icon` | string (icon name) | no | Maps to a `lucide-react` icon name for visual reinforcement |

**Validation rules**: at least one `ExpertiseItem` must exist for the section to render (enforced
by a unit test); `title` and `description` non-empty.

## ProcessStep

Represents one step in the "How We Work" section's engagement timeline, added after initial
delivery to walk visitors through how an engagement runs, ending in data governance (step 1) and
the report deliverable (step 4). Unlike `ExpertiseItem`, **array order is meaningful** — steps
render as a numbered, sequential timeline, not an unordered grid.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable key for list rendering |
| `title` | string | yes | e.g. "Discovery & Codebase Audit", "Documentation & Report" |
| `description` | string | yes | Concrete description of that step, not generic filler |
| `icon` | string (icon name) | no | Maps to a `lucide-react` icon name for visual reinforcement |

**Validation rules**: more than one `ProcessStep` must exist (it's a process, singular steps don't
render as a timeline) — enforced by a unit test; `title` and `description` non-empty.

## ContactChannel

Represents one direct, static way to reach the professional (spec FR-008/FR-009, User Story 3).
No submission/inquiry data is ever captured — this entity only describes the outbound link itself.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Stable key, e.g. `"email"`, `"phone"`, `"linkedin"` |
| `label` | string | yes | Human-readable label shown to the visitor, e.g. "Email" |
| `type` | enum: `"email"` \| `"tel"` \| `"external"` | yes | Determines link construction (`mailto:`, `tel:`, or a plain external URL) |
| `value` | string | yes | The address/number/URL itself |
| `href` | string (derived) | yes | Computed from `type` + `value` (e.g. `mailto:${value}`); must resolve to the correct destination (spec SC-006) |
| `icon` | string (icon name) | no | Maps to a `lucide-react` icon name |

**Validation rules**: at least one `ContactChannel` with `type: "email"` must exist (email is the
baseline fallback channel referenced in the spec's edge cases); every channel's `href` must be
derivable and non-empty — enforced by a unit test that constructs `href` from each fixture entry
and asserts the expected scheme (`mailto:`/`tel:`/`https:`).

## Relationships

These content types are independent and unrelated to each other (no foreign keys, no shared
identifiers) — they are composed together only at the presentation layer: `App.jsx` renders one
`ProfessionalProfile` in the Hero section, a list of `ExpertiseItem`s in the Expertise section, an
ordered list of `ProcessStep`s as a timeline in the Approach ("How We Work") section, and a list of
`ContactChannel`s in the Contact section (and, per FR-004, at least one `ContactChannel` surfaced
persistently, e.g. in a sticky header/nav, so it's reachable in one interaction from anywhere on
the page).

## State Transitions

None. All content is static for the lifetime of a given deployed build; there are no create/update/
delete operations, workflows, or status fields anywhere in this feature.
