import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from '../../src/sections/Hero.jsx';
import { profile } from '../../src/content/profile.js';

// Per spec FR-001 / SC-001: name, role, and specialization must be present on
// initial render, with no scrolling or interaction required.
describe('Hero section', () => {
  it('renders the profile name, role, and specialization on initial render', () => {
    render(<Hero />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.specialization)).toBeInTheDocument();
  });

  it('renders a call-to-action toward contact', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /talk about your system/i });
    expect(cta).toHaveAttribute('href', '#contact');
  });
});
