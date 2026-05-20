'use client'

/**
 * HeroSection.tsx
 *
 * Layer order (bottom → top):
 *  [0] bg-base dark background                    (CSS on body)
 *  [1] CSS ambient gradient blobs                 (div, z-index 0)
 *  [2] DevOpsBackground — 3D particle field       (canvas, z-index 0)
 *       Adapted from sanidhyy/space-portfolio StarBackground:
 *       └─ Layer A: indigo (#5E6AD2) particles, radius 1.2
 *                   rotation x -= delta/10, y -= delta/15  ← exact original
 *       └─ Layer B: white particles, radius 0.9, counter-rotates
 *       └─ CameraRig: subtle mouse-parallax (lerp 0.02)
 *  [3] DevOpsFloatingBackground                   (CSS logos, z-index 1–4)
 *       └─ FAR   layer (z:1) — Docker, Jenkins, Linux, Prometheus
 *       └─ MID   layer (z:2) — AWS, Terraform, Grafana
 *       └─ NEAR  layer (z:3) — Kubernetes, GitHub
 *       └─ Radial vignette + edge fades (z:4)
 *  [4] Hero content (text, terminal, CTAs)        (div, z-index 10)
 */

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

/**
 * DevOpsBackground — 3D particle field adapted from space-portfolio.
 * Uses React Three Fiber (browser-only). Loaded with ssr:false.
 */
const DevOpsBackground = dynamic(
  () => import('./DevOpsBackground'),
  { ssr: false }
)

/**
 * DevOpsFloatingBackground — CSS floating DevOps tool logos.
 * Unchanged. Renders on top of the 3D particle field.
 */
const DevOpsFloatingBackground = dynamic(
  () => import('./DevOpsFloatingBackground'),
  { ssr: false }
)

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  /* ── Scroll parallax on hero content ──────────────────── */
  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1)
      el.style.opacity   = String(1 - progress * 0.8)
      el.style.transform = `translateY(${window.scrollY * 0.08}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Layer 1: CSS ambient gradient blobs ───────────── */}
      {/*
        These purely-CSS blobs create the base indigo glow.
        They sit below the 3D canvas but colour-tint the scene.
      */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        {/* Primary blob — top-center, large indigo glow */}
        <div
          className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full animate-blob-1"
          style={{
            background: 'radial-gradient(circle, rgba(94,106,210,0.22) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        {/* Secondary blob — left, purple-violet */}
        <div
          className="absolute top-1/4 -left-[200px] w-[600px] h-[800px] rounded-full animate-blob-2"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(94,106,210,0.08) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Tertiary blob — right, indigo-blue */}
        <div
          className="absolute bottom-1/3 -right-[100px] w-[500px] h-[700px] rounded-full animate-blob-3"
          style={{
            background:
              'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Bottom accent blob */}
        <div
          className="absolute -bottom-[200px] left-1/3 w-[700px] h-[500px] rounded-full animate-blob-4"
          style={{
            background:
              'radial-gradient(circle, rgba(94,106,210,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* ── Layer 2: 3D particle field (space-portfolio flavour) ── */}
      {/*
        Adapted from sanidhyy/space-portfolio StarBackground.
        Camera at [0,0,1] sits INSIDE the particle sphere (radius 1.2)
        so particles surround the scene in all directions — same
        immersive star-field technique as the original.

        Two layers:
          A) Indigo (#5E6AD2) particles — DevOps accent colour
          B) White micro-particles      — original star feel

        Rotation formula kept identical to space-portfolio source:
          rotation.x -= delta / 10
          rotation.y -= delta / 15
      */}
      <DevOpsBackground />

      {/* ── Layer 3: Floating DevOps logo background ─────────── */}
      {/*
        Pure CSS + React. Completely unchanged from previous build.
        9 tool logos at edges/corners, three depth layers (far/mid/near).
        Mouse parallax via rAF. Float animation via CSS keyframes.
        These logos float IN FRONT OF the 3D particle field above.
      */}
      <DevOpsFloatingBackground />

      {/* ── Layer 3: Hero content ──────────────────────────── */}
      <div
        ref={contentRef}
        className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full"
        style={{ zIndex: 10 }}
      >
        {/* Left column: tag → headline → subtitle → desc → CTAs */}
        <div className="flex-1 text-center lg:text-left">

          {/* Tag pill — fades up on load */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            style={{
              animation: 'enter-from-left 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.05s',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse"
              aria-hidden="true"
            />
            <span className="text-[0.65rem] font-mono tracking-[0.18em] text-fg uppercase">
              DevOps Engineer · 3 Years XP
            </span>
          </div>

          {/* Main headline — slides in from the left on page load, one time */}
          <h1
            className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-semibold leading-none tracking-[-0.03em] mb-4"
            aria-label="DevOps Engineer"
          >
            <span
              className="block text-gradient-heading"
              style={{
                animation: 'enter-from-left 0.9s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: '0.2s',
              }}
            >
              DEVOPS
            </span>
            <span
              className="block text-gradient-heading"
              style={{
                animation: 'enter-from-left 0.9s cubic-bezier(0.16,1,0.3,1) both',
                animationDelay: '0.4s',
              }}
            >
              ENGINEER
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-[0.65rem] font-mono tracking-[0.2em] text-fg-muted mb-6 uppercase"
            style={{
              animation: 'enter-from-left 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.55s',
            }}
          >
            AWS · AZURE · GCP · KUBERNETES · TERRAFORM
          </p>

          {/* Description */}
          <p
            className="text-base lg:text-lg text-fg-muted leading-relaxed max-w-[480px] mx-auto lg:mx-0 mb-8"
            style={{
              animation: 'enter-from-left 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.7s',
            }}
          >
            <strong className="text-fg font-medium">3 years</strong> automating cloud
            infrastructure, CI/CD pipelines and deployments at scale.{' '}
            <strong className="text-fg font-medium">22 production projects</strong> across
            AWS &amp; Azure.{' '}
            <strong className="text-fg font-medium">99.9% uptime</strong> maintained.{' '}
            <strong className="text-fg font-medium">90% reduction</strong> in manual
            deployment effort.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            style={{
              animation: 'enter-from-left 0.8s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: '0.85s',
            }}
          >
            <a
              href="#featured"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium
                shadow-accent-btn hover:bg-accent-bright hover:shadow-accent-btn-hover
                active:scale-[0.98] transition-all duration-200"
            >
              ▶ VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/[0.05] text-fg text-sm font-medium border border-white/10
                hover:bg-white/[0.08] hover:border-white/20
                active:scale-[0.98] transition-all duration-200"
            >
              GET IN TOUCH →
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Jatin_Lodhi_DevOps_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                bg-white/[0.04] text-fg-muted text-sm font-medium border border-white/[0.08]
                hover:bg-white/[0.08] hover:border-accent/40 hover:text-fg
                active:scale-[0.98] transition-all duration-200 group/dl"
              aria-label="Download Resume PDF"
            >
              {/* Download icon */}
              <svg
                className="w-4 h-4 opacity-70 group-hover/dl:opacity-100 group-hover/dl:translate-y-px transition-all duration-200"
                viewBox="0 0 16 16" fill="none" stroke="currentColor"
                strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 2v8M5 7l3 3 3-3M2 12h12" />
              </svg>
              RESUME
            </a>
          </div>
        </div>

        {/* Right column: Terminal mock — slides in from the right on load */}
        <div
          className="flex-1 w-full max-w-[440px]"
          style={{
            animation: 'enter-from-right 1s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: '0.5s',
          }}
        >
          <div
            className="card-glass overflow-hidden"
            aria-label="Terminal output preview"
            role="img"
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"    aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"  aria-hidden="true" />
              <span className="flex-1 text-center text-[0.65rem] font-mono text-fg-muted">
                bash — devops@prod-cluster
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-[0.78rem] space-y-1 leading-5">
              <TermLine prompt="$" cmd="kubectl get nodes" />
              <TermOut>NAME              STATUS   ROLES   AGE</TermOut>
              <TermOut color="text-green-400">eks-node-1a       Ready    worker  12d</TermOut>
              <TermOut color="text-green-400">eks-node-1b       Ready    worker  12d</TermOut>
              <TermOut color="text-green-400">eks-node-1c       Ready    worker  12d</TermOut>
              <div className="h-2" />
              <TermLine prompt="$" cmd="terraform apply -auto-approve" />
              <TermOut color="text-yellow-400">Plan: 47 to add, 3 to change...</TermOut>
              <TermOut color="text-green-400">Apply complete! 47 added. ✓</TermOut>
              <div className="flex items-center gap-1.5">
                <span className="text-accent">$</span>
                <span className="terminal-cursor" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        aria-hidden="true"
        style={{ zIndex: 10 }}
      >
        <span className="text-[0.55rem] font-mono tracking-[0.25em] text-fg-muted">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}

/* ── Terminal line sub-components ────────────────────────── */
function TermLine({ prompt, cmd }: { prompt: string; cmd: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-accent">{prompt}</span>
      <span className="text-fg">{cmd}</span>
    </div>
  )
}

function TermOut({
  children,
  color = 'text-fg-muted',
}: {
  children: React.ReactNode
  color?: string
}) {
  return <div className={`pl-3 ${color}`}>{children}</div>
}
