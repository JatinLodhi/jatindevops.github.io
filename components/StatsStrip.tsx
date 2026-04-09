'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { to: 22,   suffix: '',    label: 'Production Projects' },
  { to: 99,   suffix: '.9%', label: 'System Uptime'       },
  { to: 90,   suffix: '%',   label: 'Manual Effort Saved'  },
  { to: 42,   suffix: '%',   label: 'AWS Cost Reduced'     },
  { to: 60,   suffix: '%',   label: 'MTTR Reduced'         },
  { to: 50,   suffix: '+',   label: 'Deployments/Month'    },
]

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])

  return value
}

function StatItem({ to, suffix, label }: typeof STATS[0]) {
  const ref  = useRef<HTMLDivElement>(null)
  const [go, setGo] = useState(false)
  const val  = useCountUp(to, 1400, go)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGo(true); observer.unobserve(el) } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 px-6 py-4 group"
    >
      <span className="text-2xl sm:text-3xl font-semibold text-fg tracking-tight tabular-nums">
        {val}
        <span className="text-accent text-xl sm:text-2xl">{suffix}</span>
      </span>
      <span className="text-[0.65rem] font-mono tracking-[0.12em] text-fg-muted uppercase text-center">
        {label}
      </span>
    </div>
  )
}

export default function StatsStrip() {
  return (
    <section
      aria-label="Key statistics"
      className="relative z-10 bg-bg-elevated border-y border-white/[0.06]"
    >
      {/* Subtle accent glow behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(94,106,210,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-white/[0.06]">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
