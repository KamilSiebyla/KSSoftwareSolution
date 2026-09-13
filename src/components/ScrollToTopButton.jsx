import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Icon from './Icon.jsx';

const SHOW_AFTER_PX = 400;

function scrollToTop() {
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
}

// Fixed floating button, visible once the visitor has scrolled past the
// Hero, that jumps back to the top of the page — matches the page's dark/
// gradient aesthetic (same accent/fuchsia/violet gradient as the Hero
// background and the nav logo).
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full p-[2px] shadow-lg shadow-black/40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-fuchsia-500 to-violet-600" />
      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-ink">
        <Icon icon={ArrowUp} size={20} className="text-accent" />
      </span>
    </button>
  );
}
