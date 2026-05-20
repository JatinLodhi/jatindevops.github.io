import AnimatedSection from './AnimatedSection'

const METRICS = [
  { val: '100k+',  lbl: 'Concurrent Users'   },
  { val: '99.95%', lbl: 'Production SLA'     },
  { val: '3-AZ',   lbl: 'High Availability'  },
  { val: '7',      lbl: 'Terraform Modules'  },
]

const TAGS = [
  { label: 'Azure AKS',      color: 'border-accent/30 text-accent/90 bg-accent/5'   },
  { label: 'Terraform',      color: 'border-accent/30 text-accent/90 bg-accent/5'   },
  { label: 'Azure CNI',      color: 'border-accent/30 text-accent/90 bg-accent/5'   },
  { label: 'GitHub Actions', color: 'border-orange-400/30 text-orange-400/90 bg-orange-400/5' },
  { label: 'Azure Monitor',  color: 'border-orange-400/30 text-orange-400/90 bg-orange-400/5' },
  { label: 'ACR Premium',    color: 'border-white/10 text-fg-muted bg-white/[0.03]' },
  { label: 'Helm',           color: 'border-white/10 text-fg-muted bg-white/[0.03]' },
  { label: 'Kubernetes 1.31',color: 'border-white/10 text-fg-muted bg-white/[0.03]' },
  { label: 'Log Analytics',  color: 'border-white/10 text-fg-muted bg-white/[0.03]' },
  { label: 'Azure AD RBAC',  color: 'border-white/10 text-fg-muted bg-white/[0.03]' },
]

const ARCH_LINES = [
  { indent: 0, color: 'text-yellow-400', text: '+-- GitHub Actions CI/CD'                  },
  { indent: 1, color: 'text-accent',     text: '+-- Terraform 1.10 (7 modules)'            },
  { indent: 2, color: 'text-accent',     text: '+-- AKS Cluster (Multi-AZ · Premium)'      },
  { indent: 3, color: 'text-green-400',  text: '|   +-- System Node Pool  AZ 1-2-3 ●'      },
  { indent: 3, color: 'text-green-400',  text: '|   +-- Frontend Pool     AZ 1-2-3 ●'      },
  { indent: 3, color: 'text-green-400',  text: '|   +-- Backend Pool      AZ 1-2-3 ●'      },
  { indent: 2, color: 'text-orange-400', text: '+-- Azure Monitor + Log Analytics'         },
  { indent: 2, color: 'text-yellow-400', text: '+-- ACR Premium (geo-replicated)'          },
  { indent: 2, color: 'text-accent',     text: '+-- User Assigned Identity (RBAC)'         },
  { indent: 1, color: 'text-accent',     text: '+-- Workspaces: dev / uat / prod'          },
]

export default function FeaturedProject() {
  return (
    <section id="featured" className="relative z-10 py-14 lg:py-20 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header — slides in from the left */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 02 — FEATURED
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
            FLAGSHIP PROJECT
          </h2>
        </AnimatedSection>

        {/* Featured card — emerges from depth */}
        <AnimatedSection delay={100} from="depth">
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
                  PRODUCTION-GRADE AZURE AKS INFRASTRUCTURE FOR 100K+ CONCURRENT USERS
                </h3>

                <p className="text-sm text-fg-muted leading-relaxed mb-8">
                  Enterprise-scale AKS cluster on Azure designed for 100k+ concurrent users.
                  Three dedicated node pools with independent auto-scaling across 3 availability
                  zones, Azure CNI networking, and a GitHub Actions CI/CD pipeline with manual
                  approval gates — fully provisioned through 7 modular Terraform modules across
                  dev / uat / prod workspaces with no var-files required.
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
