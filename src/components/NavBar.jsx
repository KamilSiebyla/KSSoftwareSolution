import { Linkedin, Mail, Phone } from 'lucide-react';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { contactChannels, toHref } from '../content/contactChannels.js';

const ICONS_BY_NAME = { Mail, Phone, Linkedin };

// Surfaces one contact channel persistently so it's reachable in a single
// interaction from anywhere on the page (spec FR-004). Renders nothing until
// User Story 3 populates src/content/contactChannels.js.
export default function NavBar() {
  const primaryChannel = contactChannels.find((c) => c.type === 'email') ?? contactChannels[0];
  const linkedin = contactChannels.find((c) => c.id === 'linkedin');

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/80 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          KS
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <a href="#expertise" className="hover:text-accent">
            Expertise
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
          {linkedin ? (
            <a
              href={toHref(linkedin)}
              aria-label={linkedin.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-accent"
            >
              <Icon icon={ICONS_BY_NAME[linkedin.icon] ?? Linkedin} size={20} />
            </a>
          ) : null}
        </div>
        {primaryChannel ? (
          <Button
            as="a"
            href={toHref(primaryChannel)}
            aria-label={primaryChannel.label}
            variant="primary"
            className="px-4 py-2 text-sm"
          >
            <Icon icon={ICONS_BY_NAME[primaryChannel.icon] ?? Mail} size={16} />
            {primaryChannel.label}
          </Button>
        ) : null}
      </nav>
    </header>
  );
}
