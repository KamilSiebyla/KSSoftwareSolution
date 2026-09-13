import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Expertise from '../../src/sections/Expertise.jsx';
import { expertiseItems } from '../../src/content/expertise.js';

// Per FR-002: every expertise item's title and description must be rendered.
describe('Expertise section', () => {
  it('renders every expertise item title and description', () => {
    render(<Expertise />);
    expertiseItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
