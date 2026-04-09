export default function Footer() {
  return (
    <footer className="relative z-10 py-10 bg-bg-deep border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[0.62rem] tracking-[0.15em] text-fg-muted uppercase">
          © 2025 DevOps Engineer ·{' '}
          <span className="text-accent">Built with Infrastructure as Code</span>
        </p>
        <p className="font-mono text-[0.62rem] tracking-[0.15em] text-fg-muted uppercase">
          22 Projects ·{' '}
          <span className="text-accent">99.9% Uptime</span> · Always On
        </p>
      </div>
    </footer>
  )
}
