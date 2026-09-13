const VARIANTS = {
  primary: 'bg-accent text-ink hover:bg-accent/90 focus-visible:bg-accent/90',
  ghost: 'bg-transparent text-white border border-white/30 hover:border-accent hover:text-accent',
};

export default function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors duration-200 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
