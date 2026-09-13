import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether the returned ref's element has scrolled into the viewport,
 * for scroll-reveal effects driven by plain CSS transitions (no animation
 * library — see specs/001-architect-portfolio-site/research.md).
 * @param {IntersectionObserverInit} [options]
 * @returns {[React.RefObject, boolean]}
 */
export function useInView(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isInView];
}
