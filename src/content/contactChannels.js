// ContactChannel[] content, per specs/001-architect-portfolio-site/data-model.md.
// Populated by the "Contact channels" feature branch (User Story 3).

/**
 * Derives the correct href for a contact channel from its type + value.
 * @param {{ type: 'email' | 'tel' | 'external', value: string }} channel
 */
export function toHref({ type, value }) {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'tel') return `tel:${value}`;
  return value;
}

export const contactChannels = [];
