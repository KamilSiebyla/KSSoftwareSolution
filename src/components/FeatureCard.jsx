import { useInView } from '../hooks/useInView.js';
import Icon from './Icon.jsx';

// Shared scroll-reveal card used by the Expertise and Approach sections, per
// the constitution's UX Consistency principle (reuse over duplication).
export default function FeatureCard({ icon, title, description }) {
  const [ref, isInView] = useInView();

  return (
    <li
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <Icon icon={icon} size={28} className="mb-4 text-accent" />
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-white/70">{description}</p>
    </li>
  );
}
