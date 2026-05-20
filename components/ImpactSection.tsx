'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedSection from './AnimatedSection'

/* ── Count-up hook ──────────────────────────────────────── */
function useCountUp(target: number, decimals = 0, duration = 2200) {
  const [value, setValue]     = useState(0)
  const startedRef            = useRef(false)
  const elementRef            = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          observer.unobserve(el)

          const t0 = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - t0) / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setValue(parseFloat((eased * target).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals, duration])

  return { value, ref: elementRef }
}

/* ── Sparkline ──────────────────────────────────────────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const W = 110, H = 30
  const min   = Math.min(...data)
  const max   = Math.max(...data)
  const range = max - min || 1

  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W
      const y = H - ((v - min) / range) * (H - 6) - 3
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const last = pts.split(' ').at(-1)!.split(',')

  return (
    <svg
      width={W}
      height={H}
      className="overflow-visible"
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <circle
        cx={last[0]}
        cy={last[1]}
        r="2.5"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

/* ── Data ─────────────────────────────────────────────────  */
const METRICS = [
  {
    icon: '💰',
    prefix: '$',
    target: 50,
    suffix: 'K/mo',
    decimals: 0,
    label: 'CLOUD COST SAVINGS',
    desc: 'AWS spend reduced from $120K → $70K via FinOps, Spot Instances & automated cleanup scripts.',
    color:    'from-yellow-500/10 to-transparent',
    border:   'border-yellow-500/20',
    numColor: 'text-yellow-400',
    sparkHex: '#eab308',
    sparkData: [22, 28, 30, 34, 38, 40, 43, 46, 47, 49, 50, 50],
    trend:    '+12%',
    trendUp:  true,
  },
  {
    icon: '⚡',
    prefix: '',
    target: 90,
    suffix: '%',
    decimals: 0,
    label: 'MANUAL EFFORT REDUCED',
    desc: 'End-to-end deployment pipelines automated across 22 projects — zero manual handoffs.',
    color:    'from-accent/10 to-transparent',
    border:   'border-accent/20',
    numColor: 'text-accent',
    sparkHex: '#5E6AD2',
    sparkData: [40, 50, 58, 65, 70, 75, 80, 83, 86, 88, 90, 90],
    trend:    '+8% last sprint',
    trendUp:  true,
  },
  {
    icon: '🛡️',
    prefix: '',
    target: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'SYSTEM UPTIME',
    desc: 'Multi-AZ architectures, automated DR & proactive monitoring across all production systems.',
    color:    'from-green-500/10 to-transparent',
    border:   'border-green-500/20',
    numColor: 'text-green-400',
    sparkHex: '#22c55e',
    sparkData: [99.7, 100, 99.9, 100, 99.8, 100, 100, 99.9, 100, 99.9, 100, 99.9],
    trend:    '↔ stable',
    trendUp:  null,
  },
  {
    icon: '🔥',
    prefix: '',
    target: 60,
    suffix: '%',
    decimals: 0,
    label: 'MTTR REDUCTION',
    desc: 'Prometheus + Grafana observability slashed mean time to resolution across 50+ services.',
    color:    'from-orange-500/10 to-transparent',
    border:   'border-orange-500/20',
    numColor: 'text-orange-400',
    sparkHex: '#f97316',
    sparkData: [15, 20, 28, 34, 40, 44, 48, 52, 55, 58, 60, 60],
    trend:    '-40% response time',
    trendUp:  true,
  },
]

const STAT_PILLS = [
  { value: '220+',  label: 'Deployments',         color: 'text-accent'     },
  { value: '200+',  label: 'Terraform Resources',  color: 'text-cyan-400'   },
  { value: '1M+',   label: 'Requests / Day',       color: 'text-purple-400' },
  { value: '98%',   label: 'Pipeline Success Rate', color: 'text-green-400' },
  { value: '100+',  label: 'Servers via Ansible',  color: 'text-yellow-400' },
  { value: '20+',   label: 'Incidents Prevented',  color: 'text-orange-400' },
]

/* ── Metric card ────────────────────────────────────────── */
function MetricCard({
  icon, prefix, target, suffix, decimals, label,
  desc, color, border, numColor, sparkHex, sparkData, trend, trendUp,
}: typeof METRICS[0]) {
  const { value, ref } = useCountUp(target, decimals)
  const displayed = decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value))

  return (
    <div
      ref={ref}
      className={`card-glass p-6 flex flex-col gap-4 bg-gradient-to-b ${color} border ${border}`}
    >
      {/* Icon + trend */}
      <div className="flex items-start justify-between">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <span
          className={`text-[0.6rem] font-mono tracking-wide px-2 py-0.5 rounded-full border ${
            trendUp === true
              ? 'text-green-400 border-green-400/20 bg-green-400/5'
              : trendUp === false
              ? 'text-red-400 border-red-400/20 bg-red-400/5'
              : 'text-fg-muted border-white/10 bg-white/[0.03]'
          }`}
        >
          {trend}
        </span>
      </div>

      {/* Count-up number */}
      <div>
        <p className={`text-3xl font-semibold tracking-tight tabular-nums ${numColor}`}>
          {prefix}{displayed}<span className="text-lg font-normal ml-0.5 opacity-80">{suffix}</span>
        </p>
        <p className="text-[0.62rem] font-mono tracking-[0.15em] text-fg-muted uppercase mt-1">
          {label}
        </p>
      </div>

      {/* Sparkline */}
      <Sparkline data={sparkData} color={sparkHex} />

      {/* Description */}
      <p className="text-xs text-fg-muted leading-relaxed">{desc}</p>
    </div>
  )
}

/* ── Main section ───────────────────────────────────────── */
export default function ImpactSection() {
  return (
    <section id="impact" className="relative z-10 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 05 — RESULTS
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
              BUSINESS IMPACT
            </h2>
            <div className="flex items-center gap-2 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span className="text-[0.62rem] font-mono tracking-widest text-accent uppercase">
                Live Metrics
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Metric cards with count-up + sparklines */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {METRICS.map((m, i) => (
            <AnimatedSection key={m.label} delay={i * 90} from="depth">
              <MetricCard {...m} />
            </AnimatedSection>
          ))}
        </div>

        {/* Stat pills row */}
        <AnimatedSection delay={200} from="up">
          <div className="card-glass px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-[0.58rem] font-mono tracking-[0.25em] text-fg-muted uppercase shrink-0">
              // More numbers
            </span>
            {STAT_PILLS.map(({ value, label, color }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className={`text-sm font-semibold font-mono ${color}`}>{value}</span>
                <span className="text-[0.62rem] font-mono text-fg-muted uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
