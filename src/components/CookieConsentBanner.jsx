import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import { getConsent, setConsent } from '../lib/cookieConsent.js';

// This site doesn't set any cookies or run tracking today (see
// privacy.html) — this banner exists so consent is already wired up before
// any tracking script is ever added, rather than bolted on afterward.
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  function decide(value) {
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-white/10 bg-ink p-5 shadow-lg shadow-black/40 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
    >
      <p className="mb-4 text-sm text-white/70">
        We don&apos;t use tracking or analytics cookies today. We save a small note in your
        browser (not a cookie) so we don&apos;t ask again — see our{' '}
        <a href="/privacy.html" className="underline hover:text-accent">
          Privacy &amp; Cookie Policy
        </a>
        .
      </p>
      <div className="flex gap-3">
        <Button
          as="button"
          type="button"
          variant="primary"
          className="px-4 py-2 text-sm"
          onClick={() => decide('accepted')}
        >
          Accept
        </Button>
        <Button
          as="button"
          type="button"
          variant="ghost"
          className="px-4 py-2 text-sm"
          onClick={() => decide('declined')}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
