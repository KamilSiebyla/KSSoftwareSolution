import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../../src/App.jsx';
import { contactChannels, toHref } from '../../src/content/contactChannels.js';

// Per FR-004/SC-003: a contact channel must be reachable in one interaction
// from anywhere on the page. NavBar is position:fixed, so it's present in the
// render tree (scoped to the banner landmark here) regardless of scroll
// position, independent of whichever other sections also link to it.
describe('contact channel reachability', () => {
  it('surfaces a contact channel link in the persistent nav', () => {
    render(<App />);
    const [primary] = contactChannels;
    const nav = within(screen.getByRole('banner'));
    const link = nav.getByRole('link', { name: primary.label });
    expect(link).toHaveAttribute('href', toHref(primary));
  });
});
