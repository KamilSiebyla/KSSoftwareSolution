import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import CookieConsentBanner from '../../src/components/CookieConsentBanner.jsx';
import { getConsent } from '../../src/lib/cookieConsent.js';

describe('CookieConsentBanner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows when no decision has been made yet', () => {
    render(<CookieConsentBanner />);
    expect(screen.getByRole('region', { name: /cookie consent/i })).toBeInTheDocument();
  });

  it('does not show once a decision was already made', () => {
    window.localStorage.setItem('ks-cookie-consent', 'accepted');
    render(<CookieConsentBanner />);
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
  });

  it('records "accepted" and hides when Accept is clicked', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    expect(getConsent()).toBe('accepted');
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
  });

  it('records "declined" and hides when Decline is clicked', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    expect(getConsent()).toBe('declined');
    expect(screen.queryByRole('region', { name: /cookie consent/i })).not.toBeInTheDocument();
  });
});
