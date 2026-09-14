import {
  Bug,
  Compass,
  ExternalLink,
  FileText,
  Linkedin,
  Mail,
  MessagesSquare,
  Phone,
  Search,
  ShieldAlert,
  Users,
  Wrench,
} from 'lucide-react';

// Single source of truth mapping the icon-name strings used in src/content/
// (ExpertiseItem.icon, ProcessStep.icon, ContactChannel.icon) to their
// lucide-react components, so every section/component that renders a
// content-driven icon shares one registry instead of each defining its own.
export const ICONS_BY_NAME = {
  Mail,
  Phone,
  Linkedin,
  Search,
  Wrench,
  Bug,
  Compass,
  ShieldAlert,
  Users,
  FileText,
  MessagesSquare,
};

// Re-exported for the few places that need a named fallback icon (e.g. an
// unrecognized contact-channel icon name) rather than a lookup.
export { Mail, ExternalLink, Linkedin };
