import SectionHeading from '../components/SectionHeading.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { expertiseItems } from '../content/expertise.js';
import { ICONS_BY_NAME } from '../lib/icons.js';

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
            <FeatureCard
              key={item.id}
              icon={ICONS_BY_NAME[item.icon]}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
