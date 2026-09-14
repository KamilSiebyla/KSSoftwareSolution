import { beforeEach, describe, expect, it } from 'vitest';
import { getConsent, hasAccepted, setConsent } from '../../src/lib/cookieConsent.js';

describe('cookieConsent', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('has no decision by default', () => {
    expect(getConsent()).toBeNull();
    expect(hasAccepted()).toBe(false);
  });

  it('persists an accepted decision', () => {
    setConsent('accepted');
    expect(getConsent()).toBe('accepted');
    expect(hasAccepted()).toBe(true);
  });

  it('persists a declined decision', () => {
    setConsent('declined');
    expect(getConsent()).toBe('declined');
    expect(hasAccepted()).toBe(false);
  });

  it('rejects invalid values', () => {
    expect(() => setConsent('maybe')).toThrow();
  });
});
