import { ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import Icon from '../components/Icon.jsx';
import { contactChannels, toHref } from '../content/contactChannels.js';

const ICONS_BY_NAME = { Mail, Phone, Linkedin };

// User Story 3: a visitor can reach the professional via a direct, static
// channel (FR-008/FR-009) — no form, nothing captured or stored.
export default function Contact() {
  return (
    <section id="contact" className="px-6 py-14 sm:px-10 sm:py-20">
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
                {...(channel.type === 'external'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <Icon icon={ICONS_BY_NAME[channel.icon] ?? ExternalLink} size={18} />
                {channel.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
