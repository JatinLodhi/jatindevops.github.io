import AnimatedSection from './AnimatedSection'

const IMPACTS = [
  {
    icon: '💰',
    num: '$50K',
    unit: '/mo',
    key: 'CLOUD COST SAVINGS',
    desc: 'Reduced monthly AWS spend from $120K to $70K via FinOps, Spot Instances, and automated cleanup scripts.',
    color: 'from-yellow-500/10 to-transparent',
    border: 'border-yellow-500/20',
    numColor: 'text-yellow-400',
  },
  {
    icon: '⚡',
    num: '90',
    unit: '%',
    key: 'MANUAL EFFORT REDUCED',
    desc: 'Automated end-to-end deployment pipelines across 22 projects, eliminating manual work and human error.',
    color: 'from-accent/10 to-transparent',
    border: 'border-accent/20',
    numColor: 'text-accent',
  },
  {
    icon: '🛡️',
    num: '99.9',
    unit: '%',
    key: 'SYSTEM UPTIME',
    desc: 'Maintained across all production systems through multi-AZ architectures, automated DR, and proactive monitoring.',
    color: 'from-green-500/10 to-transparent',
    border: 'border-green-500/20',
    numColor: 'text-green-400',
  },
  {
    icon: '🔥',
    num: '60',
    unit: '%',
    key: 'MTTR REDUCTION',
    desc: 'Full Prometheus & Grafana observability slashed mean time to resolution across 50+ monitored services.',
    color: 'from-orange-500/10 to-transparent',
    border: 'border-orange-500/20',
    numColor: 'text-orange-400',
  },
]

export default function ImpactSection() {
  return (
    <section id="impact" className="relative z-10 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header — heading slides in from left */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 05 — RESULTS
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
            BUSINESS IMPACT
          </h2>
        </AnimatedSection>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACTS.map(({ icon, num, unit, key, desc, color, border, numColor }, i) => (
            <AnimatedSection key={key} delay={i * 90} from="depth">
              <div
                className={`card-glass p-6 h-full bg-gradient-to-b ${color} border ${border} flex flex-col gap-4`}
              >
                {/* Icon */}
                <span className="text-3xl" aria-hidden="true">{icon}</span>

                {/* Number */}
                <div>
                  <p className={`text-3xl font-semibold tracking-tight ${numColor}`}>
                    {num}<span className="text-xl">{unit}</span>
                  </p>
                  <p className="text-[0.65rem] font-mono tracking-[0.15em] text-fg-muted uppercase mt-1">
                    {key}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-fg-muted leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
