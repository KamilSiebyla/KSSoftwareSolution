// Cookie-consent storage. This site sets no cookies today (see privacy.html)
// — this exists so the choice is already wired up before any tracking script
// is added: any future analytics/tracking code should call hasAccepted()
// before loading, so declining actually prevents it from ever running.
const STORAGE_KEY = 'ks-cookie-consent';

function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing / blocked storage: treat as "no decision yet" rather
    // than throwing, and never persist across such sessions.
    return null;
  }
}

export function getConsent() {
  const value = readStorage();
  return value === 'accepted' || value === 'declined' ? value : null;
}

export function setConsent(value) {
  if (value !== 'accepted' && value !== 'declined') {
    throw new Error(`Invalid consent value: ${value}`);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore write failures (e.g. storage blocked) — the banner will simply
    // reappear next visit, which is the safe default.
  }
}

export function hasAccepted() {
  return getConsent() === 'accepted';
}
