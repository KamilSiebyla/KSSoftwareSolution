import { describe, expect, it } from 'vitest';
import { profile } from '../../src/content/profile.js';

// Per data-model.md: name, role, specialization, and tagline are required non-empty strings.
describe('profile content', () => {
  it.each(['name', 'role', 'specialization', 'tagline'])('has a non-empty %s', (field) => {
    expect(typeof profile[field]).toBe('string');
    expect(profile[field].trim().length).toBeGreaterThan(0);
  });
});
