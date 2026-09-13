import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ScrollToTopButton from '../../src/components/ScrollToTopButton.jsx';

function setScrollY(value) {
  Object.defineProperty(window, 'scrollY', { value, configurable: true, writable: true });
}

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    setScrollY(0);
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    setScrollY(0);
  });

  it('is hidden (not tab-focusable) until the page is scrolled down', () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveAttribute('tabindex', '-1');
  });

  it('becomes visible after scrolling past the threshold', () => {
    render(<ScrollToTopButton />);
    setScrollY(500);
    fireEvent.scroll(window);
    const button = screen.getByRole('button', { name: /scroll to top/i });
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('scrolls to the top when clicked', () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole('button', { name: /scroll to top/i });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });
});
