'use client'

import { useState, useEffect, useRef } from 'react'
import AnimatedSection from './AnimatedSection'

/* ── Data ─────────────────────────────────────────────────── */
interface Skill { name: string; level: number }

interface SkillGroup {
  key: string
  label: string
  icon: string
  skills: Skill[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    key: 'cloud', label: 'CLOUD PLATFORMS', icon: '☁️',
    skills: [
      { name: 'AWS',       level: 95 },
      { name: 'Azure',     level: 80 },
      { name: 'GCP',       level: 65 },
      { name: 'EKS / AKS', level: 90 },
    ],
  },
  {
    key: 'iac', label: 'INFRA AS CODE', icon: '📄',
    skills: [
      { name: 'Terraform',    level: 95 },
      { name: 'Ansible',      level: 85 },
      { name: 'Packer',       level: 75 },
      { name: 'Linux / Bash', level: 90 },
    ],
  },
  {
    key: 'cicd', label: 'CI/CD', icon: '🔄',
    skills: [
      { name: 'GitHub Actions', level: 92 },
      { name: 'Jenkins',        level: 85 },
      { name: 'GitOps',         level: 80 },
      { name: 'Python Scripting', level: 78 },
    ],
  },
  {
    key: 'containers', label: 'CONTAINERS', icon: '🐳',
    skills: [
      { name: 'Kubernetes', level: 90 },
      { name: 'Docker',     level: 95 },
      { name: 'Helm',       level: 85 },
      { name: 'Harbor',     level: 72 },
    ],
  },
  {
    key: 'observability', label: 'OBSERVABILITY', icon: '📊',
    skills: [
      { name: 'Prometheus',        level: 90 },
      { name: 'Grafana',           level: 90 },
      { name: 'AlertManager',      level: 82 },
      { name: 'SonarQube / Trivy', level: 78 },
    ],
  },
]

/* ── Skill bar (animated when visible) ──────────────────── */
function SkillBar({ name, level }: Skill) {
  const ref     = useRef<HTMLDivElement>(null)
  const barRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el  = ref.current
    const bar = barRef.current
    if (!el || !bar) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so reveal animation completes first
          setTimeout(() => { bar.style.width = `${level}%` }, 120)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-fg">{name}</span>
        <span className="text-[0.65rem] font-mono text-fg-muted">{level}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        {/* Fill — animated via CSS transition */}
        <div
          ref={barRef}
          className="skill-bar-fill"
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────── */
export default function SkillsSection() {
  const [activeKey, setActiveKey] = useState('cloud')
  const active = SKILL_GROUPS.find((g) => g.key === activeKey) ?? SKILL_GROUPS[0]

  return (
    <section id="skills" className="relative z-10 py-14 lg:py-20 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header — heading slides in from left */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 04 — STACK
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
            TECH STACK
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* Left: tab list — slides from left */}
          <AnimatedSection delay={60} from="left">
            <nav
              role="tablist"
              aria-label="Skill categories"
              className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none"
            >
              {SKILL_GROUPS.map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeKey === key}
                  aria-controls={`skills-panel-${key}`}
                  onClick={() => setActiveKey(key)}
                  className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                    activeKey === key
                      ? 'bg-accent/10 border-accent/30 text-fg'
                      : 'bg-transparent border-transparent text-fg-muted hover:bg-white/[0.04] hover:text-fg hover:border-white/[0.06]'
                  }`}
                >
                  <span className="text-lg" aria-hidden="true">{icon}</span>
                  <span className="text-[0.7rem] font-mono tracking-[0.1em] uppercase">
                    {label}
                  </span>
                  {activeKey === key && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                  )}
                </button>
              ))}
            </nav>
          </AnimatedSection>

          {/* Right: skill bars panel — slides from right */}
          <AnimatedSection delay={120} from="right">
            <div
              id={`skills-panel-${activeKey}`}
              role="tabpanel"
              aria-label={`${active.label} skills`}
              className="card-glass p-8 space-y-6"
            >
              <p className="text-[0.62rem] font-mono tracking-[0.25em] text-accent uppercase mb-6">
                // {active.label}
              </p>
              {active.skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
