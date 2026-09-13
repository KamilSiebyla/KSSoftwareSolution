import { describe, expect, it } from 'vitest';
import { contactChannels, toHref } from '../../src/content/contactChannels.js';

// Per data-model.md: at least one email channel must exist, and every
// channel's href must resolve to the correct scheme.
describe('contact channel content', () => {
  it('includes at least one email channel', () => {
    expect(contactChannels.some((c) => c.type === 'email')).toBe(true);
  });

  it.each(contactChannels)('derives the correct href scheme for %o', (channel) => {
    const href = toHref(channel);
    if (channel.type === 'email') expect(href).toBe(`mailto:${channel.value}`);
    if (channel.type === 'tel') expect(href).toBe(`tel:${channel.value}`);
    if (channel.type === 'external') expect(href).toBe(channel.value);
  });
});
