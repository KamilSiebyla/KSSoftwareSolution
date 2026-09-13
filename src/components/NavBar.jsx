import { Mail, Phone } from 'lucide-react';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { contactChannels, toHref } from '../content/contactChannels.js';

const ICONS_BY_TYPE = { email: Mail, tel: Phone };

// Surfaces one contact channel persistently so it's reachable in a single
// interaction from anywhere on the page (spec FR-004). Renders nothing until
// User Story 3 populates src/content/contactChannels.js.
export default function NavBar() {
  const primaryChannel = contactChannels.find((c) => c.type === 'email') ?? contactChannels[0];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/80 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          KS
        </a>
        <div className="hidden gap-6 text-sm font-medium sm:flex">
          <a href="#expertise" className="hover:text-accent">
            Expertise
          </a>
          <a href="#contact" className="hover:text-accent">
            Contact
          </a>
        </div>
        {primaryChannel ? (
          <Button as="a" href={toHref(primaryChannel)} variant="primary" className="px-4 py-2 text-sm">
            <Icon icon={ICONS_BY_TYPE[primaryChannel.type] ?? Mail} size={16} />
            {primaryChannel.label}
          </Button>
        ) : null}
      </nav>
    </header>
  );
}
