import { describe, expect, it } from 'vitest';
import { processSteps } from '../../src/content/approach.js';

describe('process steps content', () => {
  it('includes more than one step (it is a process)', () => {
    expect(processSteps.length).toBeGreaterThan(1);
  });

  it.each(processSteps)('has a non-empty title and description for %o', (step) => {
    expect(step.title.trim().length).toBeGreaterThan(0);
    expect(step.description.trim().length).toBeGreaterThan(0);
  });
});
