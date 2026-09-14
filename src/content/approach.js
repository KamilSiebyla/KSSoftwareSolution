// ProcessStep[] content — the ordered engagement process, per
// specs/001-architect-portfolio-site/data-model.md. Order is meaningful here
// (unlike ExpertiseItem): steps render as a sequential timeline.
export const processSteps = [
  {
    id: 'discovery',
    icon: 'Search',
    title: 'Discovery & Codebase Audit',
    description:
      "We review the codebase, architecture, and dependencies using our own self-hosted analysis tooling — automated checks alongside manual review to map structure, complexity, and risk areas, without your code touching third-party cloud AI services.",
  },
  {
    id: 'risk-assessment',
    icon: 'ShieldAlert',
    title: 'Risk & Technical Debt Assessment',
    description:
      'Findings are classified by severity and risk — security, business continuity, and compliance — and mapped against your actual technical debt, not just abstract code-quality scores.',
  },
  {
    id: 'stakeholder-conversations',
    icon: 'Users',
    title: 'Stakeholder Conversations',
    description:
      "We talk to the people who use and maintain the system, so priorities reflect real business value — not just whatever is easiest to fix in the code.",
  },
  {
    id: 'documentation-report',
    icon: 'FileText',
    title: 'Documentation & Report',
    description:
      'Delivered as a structured report: findings ranked by criticality, a risk register, an architecture/dependency map, and a phased remediation roadmap your team can act on directly.',
  },
  {
    id: 'walkthrough-handover',
    icon: 'MessagesSquare',
    title: 'Walkthrough & Handover',
    description:
      "We walk through the report with your team and answer questions, so the recommendations are understood before the engagement ends — not just handed over as a PDF.",
  },
];
