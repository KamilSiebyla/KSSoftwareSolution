import { FileText, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { approachHighlights } from '../content/approach.js';

const ICONS_BY_NAME = { ShieldCheck, FileText };

// Describes how an engagement runs: data governance (self-hosted analysis,
// not third-party cloud AI) and the report delivered at the end.
export default function Approach() {
  return (
    <section id="approach" className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="How We Work" title="What to expect from an engagement" />
        <ul className="grid gap-6 sm:grid-cols-2">
          {approachHighlights.map((item) => (
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
