export default function Icon({ icon: LucideIcon, size = 20, label, className = '' }) {
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={size}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
