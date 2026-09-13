// ContactChannel[] content, per specs/001-architect-portfolio-site/data-model.md.

/**
 * Derives the correct href for a contact channel from its type + value.
 * @param {{ type: 'email' | 'tel' | 'external', value: string }} channel
 */
export function toHref({ type, value }) {
  if (type === 'email') return `mailto:${value}`;
  if (type === 'tel') return `tel:${value}`;
  return value;
}

export const contactChannels = [
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    value: 'kamil.siebyla@gmail.com',
    icon: 'Mail',
  },
  {
    // TODO: replace with the real LinkedIn profile URL once available.
    id: 'linkedin',
    label: 'LinkedIn',
    type: 'external',
    value: '#',
    icon: 'Linkedin',
  },
];
