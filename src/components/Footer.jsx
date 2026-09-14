import { profile } from '../content/profile.js';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-8 text-sm text-white/50 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>
          © {year} {profile.name}
        </p>
        <a href="/privacy.html" className="hover:text-accent">
          Privacy &amp; Cookie Policy
        </a>
      </div>
    </footer>
  );
}
