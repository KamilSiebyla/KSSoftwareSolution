import { describe, expect, it } from 'vitest';
import { approachHighlights } from '../../src/content/approach.js';

describe('approach content', () => {
  it('includes at least one highlight', () => {
    expect(approachHighlights.length).toBeGreaterThan(0);
  });

  it.each(approachHighlights)('has a non-empty title and description for %o', (item) => {
    expect(item.title.trim().length).toBeGreaterThan(0);
    expect(item.description.trim().length).toBeGreaterThan(0);
  });
});
