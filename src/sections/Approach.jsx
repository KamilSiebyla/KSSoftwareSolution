import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { useInView } from '../hooks/useInView.js';
import { processSteps } from '../content/approach.js';
import { ICONS_BY_NAME } from '../lib/icons.js';

function ProcessStep({ step, index, isLast }) {
  const [ref, isInView] = useInView();

  return (
    <li ref={ref} className="relative flex gap-6 pb-10 last:pb-0">
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-6 top-12 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-accent/60 via-fuchsia-500/40 to-transparent"
        />
      ) : null}
      <div
        className={`relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-gradient text-ink shadow-lg shadow-accent/20 transition-all duration-700 ease-out ${
          isInView ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        <Icon icon={ICONS_BY_NAME[step.icon]} size={20} />
      </div>
      <div
        className={`pt-2 transition-all duration-700 ease-out ${
          isInView ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 120 + 80}ms` }}
      >
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-accent">
          Step {index + 1}
        </p>
        <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
        <p className="max-w-xl text-white/70">{step.description}</p>
      </div>
    </li>
  );
}

// Presents the engagement as an ordered, animated timeline covering data
// governance (self-hosted analysis, step 1) and the report deliverable
// (step 4), grounded in typical technical-audit documentation practice.
export default function Approach() {
  return (
    <section id="approach" className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="How We Work" title="From first look to final report" />
        <ol>
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
