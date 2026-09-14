import { Bug, Compass, Search, Wrench } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { useInView } from '../hooks/useInView.js';
import { expertiseItems } from '../content/expertise.js';

const ICONS_BY_NAME = { Search, Wrench, Bug, Compass };

function ExpertiseCard({ item }) {
  const [ref, isInView] = useInView();

  return (
    <li
      ref={ref}
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-700 ease-out ${
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <Icon icon={ICONS_BY_NAME[item.icon]} size={28} className="mb-4 text-accent" />
      <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
      <p className="text-white/70">{item.description}</p>
    </li>
  );
}

// User Story 2: visitors who scroll past the introduction find specific,
// concrete expertise content (FR-002), not generic filler.
export default function Expertise() {
  return (
    <section id="expertise" className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Expertise"
          title="What we bring to a system that's grown hard to trust"
        />
        <ul className="grid gap-6 sm:grid-cols-2">
          {expertiseItems.map((item) => (
            <ExpertiseCard key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
