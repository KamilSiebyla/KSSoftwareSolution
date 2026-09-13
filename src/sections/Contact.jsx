import { ExternalLink, Mail, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { contactChannels, toHref } from '../content/contactChannels.js';

const ICONS_BY_TYPE = { email: Mail, tel: Phone, external: ExternalLink };

// User Story 3: a visitor can reach the professional via a direct, static
// channel (FR-008/FR-009) — no form, nothing captured or stored.
export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="Get in touch" title="Let's talk about your system" />
        <p className="mb-10 text-white/70">
          Whether it's a system you've inherited, one that's grown hard to maintain, or one you
          need analyzed before making a decision — reach out directly.
        </p>
        <ul className="flex flex-wrap justify-center gap-4">
          {contactChannels.map((channel) => (
            <li key={channel.id}>
              <a
                href={toHref(channel)}
                aria-label={channel.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <Icon icon={ICONS_BY_TYPE[channel.type] ?? Mail} size={18} />
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
