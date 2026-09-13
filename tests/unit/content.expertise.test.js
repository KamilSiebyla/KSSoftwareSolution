import { describe, expect, it } from 'vitest';
import { expertiseItems } from '../../src/content/expertise.js';

// Per data-model.md: at least one ExpertiseItem must exist, each with a
// non-empty title and description.
describe('expertise content', () => {
  it('includes at least one expertise item', () => {
    expect(expertiseItems.length).toBeGreaterThan(0);
  });

  it.each(expertiseItems)('has a non-empty title and description for %o', (item) => {
    expect(item.title.trim().length).toBeGreaterThan(0);
    expect(item.description.trim().length).toBeGreaterThan(0);
  });
});
