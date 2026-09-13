// Eye-catching CSS-only background (FR-003) — chosen over an actual video
// clip for performance/accessibility: pure CSS transforms + blur run on the
// GPU compositor at near-zero byte cost, versus a video's real weight and
// mobile-data/accessibility overhead (see research.md's later addendum).
// `motion-safe:` means the blobs simply hold still for anyone who has
// requested reduced motion, rather than being removed outright.
export default function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/40 blur-3xl motion-safe:animate-blob" />
      <div className="absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/30 blur-3xl motion-safe:animate-blob [animation-delay:5s]" />
      <div className="absolute -bottom-24 left-1/4 h-[24rem] w-[24rem] rounded-full bg-violet-600/30 blur-3xl motion-safe:animate-blob [animation-delay:10s]" />
      <div className="absolute inset-0 bg-ink/50" />
    </div>
  );
}
