import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Approach from '../../src/sections/Approach.jsx';
import { approachHighlights } from '../../src/content/approach.js';

describe('Approach section', () => {
  it('renders every highlight title and description', () => {
    render(<Approach />);
    approachHighlights.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    });
  });
});
