export default function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
