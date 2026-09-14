import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from '../../src/components/Footer.jsx';
import { profile } from '../../src/content/profile.js';

describe('Footer', () => {
  it('shows a copyright line with the current year and brand name', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${year}.*${profile.name}`))).toBeInTheDocument();
  });

  it('links to the privacy policy', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy.*cookie policy/i })).toHaveAttribute(
      'href',
      '/privacy.html',
    );
  });
});
