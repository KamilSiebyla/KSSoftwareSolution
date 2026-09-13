import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button.jsx';
import { profile } from '../content/profile.js';

// The introduction (User Story 1): must be visible without scrolling and
// communicate who this is, their role, and specialization (spec FR-001).
export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-6 px-6 py-16 sm:px-10"
    >
      <div
        className={`max-w-3xl transition-all duration-700 ease-out ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
          {profile.role}
        </p>
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-4 text-2xl font-semibold text-white/90 sm:text-3xl">
          {profile.specialization}
        </p>
        <p className="mt-6 max-w-xl text-lg text-white/70">{profile.tagline}</p>
        <div className="mt-10">
          <Button as="a" href="#contact" variant="primary">
            Let's talk about your system
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
