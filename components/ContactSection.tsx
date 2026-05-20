import AnimatedSection from './AnimatedSection'

const QUICK_STATS = [
  { key: 'Location',       val: 'Remote / Hybrid' },
  { key: 'Experience',     val: '3 Years'         },
  { key: 'Projects',       val: '22 Production'   },
  { key: 'Clouds',         val: 'AWS · Azure · GCP' },
  { key: 'Primary IaC',    val: 'Terraform + Ansible' },
  { key: 'CI/CD Tools',    val: 'GitHub Actions · Jenkins' },
  { key: 'Packaging',      val: 'Packer · Docker · Helm' },
  { key: 'Containers',     val: 'K8s (EKS · AKS)' },
  { key: 'OS / Scripting', val: 'Linux · Python · Bash' },
  { key: 'Monitoring',     val: 'Prometheus + Grafana' },
  { key: 'Cost Saved',     val: '$50K/month'        },
  { key: 'Availability',   val: '99.9% uptime'      },
]

const CONTACT_LINKS = [
  {
    icon: '✉️',
    label: 'jllodhi2435@gmail.com',
    href: 'mailto:jllodhi2435@gmail.com',
    ariaLabel: 'Email',
    download: undefined as string | undefined,
  },
  {
    icon: '💼',
    label: 'linkedin.com/in/jatin-lodhi',
    href: 'https://www.linkedin.com/in/jatin-lodhi',
    ariaLabel: 'LinkedIn profile',
    download: undefined as string | undefined,
  },
  {
    icon: '🐙',
    label: 'github.com/JatinLodhi',
    href: 'https://github.com/JatinLodhi',
    ariaLabel: 'GitHub profile',
    download: undefined as string | undefined,
  },
  {
    icon: '📝',
    label: 'jatinlodhi.medium.com',
    href: 'https://jatinlodhi.medium.com/',
    ariaLabel: 'Medium blog',
    download: undefined as string | undefined,
  },
  {
    icon: '📄',
    label: 'Download Resume (PDF)',
    href: '/resume.pdf',
    ariaLabel: 'Download Resume',
    download: 'Jatin_Lodhi_DevOps_Resume.pdf',
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-14 lg:py-20 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: CTA — slides from left */}
          <AnimatedSection from="left">
            <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-4">
              // 06 — CONTACT
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight mb-6">
              <span className="text-gradient-heading">LET&apos;S BUILD</span>
              <br />
              <span className="text-gradient-accent">TOGETHER</span>
            </h2>

            <p className="text-base text-fg-muted leading-relaxed mb-8 max-w-md">
              Open to DevOps, SRE, and Cloud Engineering roles. Let&apos;s build reliable,
              scalable infrastructure that makes a real impact.
            </p>

            <div className="space-y-3">
              {CONTACT_LINKS.map(({ icon, label, href, ariaLabel, download }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={ariaLabel}
                  target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={download}
                  className="flex items-center gap-3 p-4 card-glass rounded-xl group"
                >
                  <span className="text-xl" aria-hidden="true">{icon}</span>
                  <span className="text-sm font-mono text-fg-muted group-hover:text-fg transition-colors duration-200">
                    {label}
                  </span>
                  <span className="ml-auto text-fg-muted/40 group-hover:text-accent transition-colors duration-200" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: terminal quick stats — slides from right */}
          <AnimatedSection delay={120} from="right">
            <div
              className="card-glass overflow-hidden"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(94,106,210,0.15), 0 4px 40px rgba(0,0,0,0.4), 0 0 60px rgba(94,106,210,0.04)',
              }}
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"    aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"  aria-hidden="true" />
                <span className="flex-1 text-center text-[0.65rem] font-mono text-fg-muted">
                  // QUICK STATS
                </span>
              </div>

              {/* Stats list */}
              <div className="p-6 font-mono text-[0.73rem] space-y-2.5">
                {QUICK_STATS.map(({ key, val }) => (
                  <div key={key} className="flex items-baseline gap-2">
                    {/* key + dots */}
                    <span className="text-fg-muted/70 shrink-0 w-[120px]">{key}</span>
                    <span className="text-fg-muted/40 flex-1 overflow-hidden">
                      {'·'.repeat(20)}
                    </span>
                    <span className="text-accent shrink-0">{val}</span>
                  </div>
                ))}

                {/* Cursor line */}
                <div className="pt-2 flex items-center gap-1.5">
                  <span className="text-accent">$</span>
                  <span className="text-fg-muted text-[0.73rem]">ready_for_next_challenge</span>
                  <span className="terminal-cursor" aria-hidden="true" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
