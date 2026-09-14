import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Approach from '../../src/sections/Approach.jsx';
import { processSteps } from '../../src/content/approach.js';

describe('Approach section', () => {
  it('renders every step title and description in order', () => {
    render(<Approach />);
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(processSteps.map((step) => step.title));
    processSteps.forEach((step) => {
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('numbers each step sequentially', () => {
    render(<Approach />);
    processSteps.forEach((_, index) => {
      expect(screen.getByText(`Step ${index + 1}`)).toBeInTheDocument();
    });
  });
});
