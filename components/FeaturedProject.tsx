import AnimatedSection from './AnimatedSection'

const METRICS = [
  { val: '1M+',    lbl: 'Requests / Day'       },
  { val: '75%',    lbl: 'Deploy Time Reduced'   },
  { val: '99.95%', lbl: 'Uptime Achieved'       },
  { val: '3-AZ',   lbl: 'High Availability'     },
]

const TAGS = [
  { label: 'AWS EKS',     color: 'border-accent/30 text-accent/90 bg-accent/5'   },
  { label: 'Terraform',   color: 'border-accent/30 text-accent/90 bg-accent/5'   },
  { label: 'Docker',      color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
  { label: 'Helm',        color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
  { label: 'Prometheus',  color: 'border-orange-400/30 text-orange-400/90 bg-orange-400/5' },
  { label: 'Grafana',     color: 'border-orange-400/30 text-orange-400/90 bg-orange-400/5' },
  { label: 'ALB',         color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
  { label: 'CloudFront',  color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
  { label: 'RDS',         color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
  { label: 'ElastiCache', color: 'border-white/10  text-fg-muted  bg-white/[0.03]' },
]

const ARCH_LINES = [
  { indent: 0, color: 'text-accent',      text: '+-- CloudFront CDN'              },
  { indent: 1, color: 'text-yellow-400',  text: '+-- Application Load Balancer'   },
  { indent: 2, color: 'text-accent',      text: '+-- EKS Cluster (Multi-AZ)'      },
  { indent: 3, color: 'text-green-400',   text: '|   +-- Node Group AZ-1a ●'      },
  { indent: 3, color: 'text-green-400',   text: '|   +-- Node Group AZ-1b ●'      },
  { indent: 3, color: 'text-green-400',   text: '|   +-- Node Group AZ-1c ●'      },
  { indent: 2, color: 'text-yellow-400',  text: '+-- RDS Multi-AZ'                },
  { indent: 2, color: 'text-yellow-400',  text: '+-- ElastiCache Redis'            },
  { indent: 2, color: 'text-red-400',     text: '+-- Prometheus + Grafana'         },
  { indent: 1, color: 'text-accent',      text: '+-- Terraform IaC (all resources)' },
]

export default function FeaturedProject() {
  return (
    <section id="featured" className="relative z-10 py-24 lg:py-32 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <AnimatedSection className="mb-12">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 01 — FEATURED
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-white">
            FLAGSHIP PROJECT
          </h2>
        </AnimatedSection>

        {/* Featured card */}
        <AnimatedSection delay={100}>
          <div
            className="card-glass p-0 overflow-hidden"
            style={{
              boxShadow:
                '0 0 0 1px rgba(94,106,210,0.2), 0 4px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.06)',
            }}
          >
            {/* Accent gradient top border */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: info */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-accent/30 bg-accent/[0.08] text-[0.65rem] font-mono tracking-widest text-accent uppercase">
                  ★ FEATURED · PRODUCTION
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-fg leading-tight mb-4 tracking-tight">
                  PRODUCTION-GRADE AWS EKS CLUSTER WITH FULL OBSERVABILITY
                </h3>

                <p className="text-sm text-fg-muted leading-relaxed mb-8">
                  Enterprise Kubernetes deployment serving 1M+ requests/day. Multi-AZ high
                  availability with ALB, CloudFront CDN, RDS, and ElastiCache — fully provisioned
                  through Terraform IaC with Helm charts and a complete Prometheus/Grafana
                  observability stack.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {METRICS.map(({ val, lbl }) => (
                    <div key={lbl} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-2xl font-semibold text-fg mb-1 tracking-tight">{val}</p>
                      <p className="text-[0.65rem] font-mono tracking-widest text-fg-muted uppercase">{lbl}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(({ label, color }) => (
                    <span
                      key={label}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-mono border ${color}`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: architecture diagram */}
              <div className="p-8 lg:p-10 bg-bg-base/60">
                <p className="text-[0.62rem] font-mono tracking-[0.25em] text-accent mb-6 uppercase">
                  // ARCHITECTURE OVERVIEW
                </p>
                <div className="font-mono text-[0.75rem] space-y-1.5">
                  {ARCH_LINES.map(({ indent, color, text }) => (
                    <div key={text} className={`flex ${color}`} style={{ paddingLeft: `${indent * 1.2}rem` }}>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
