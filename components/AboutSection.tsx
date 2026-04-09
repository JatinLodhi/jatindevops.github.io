import AnimatedSection from './AnimatedSection'

const ABOUT_CARDS = [
  {
    icon: '☁️',
    label: 'Cloud & Infrastructure',
    labelColor: 'text-accent',
    desc: 'AWS, Azure, GCP · EKS, AKS · Terraform, Ansible',
  },
  {
    icon: '🔄',
    label: 'CI/CD & Automation',
    labelColor: 'text-cyan-400',
    desc: 'GitHub Actions, Jenkins · GitOps · Release Engineering',
  },
  {
    icon: '🐳',
    label: 'Containers & Orchestration',
    labelColor: 'text-orange-400',
    desc: 'Kubernetes, Docker, Helm · Microservices at scale',
  },
  {
    icon: '📊',
    label: 'Observability',
    labelColor: 'text-yellow-400',
    desc: 'Prometheus, Grafana, AlertManager · 60% MTTR reduction',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <AnimatedSection className="mb-12">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 00 — ABOUT
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-white">
            ABOUT ME
          </h2>
        </AnimatedSection>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: about text */}
          <AnimatedSection delay={80}>
            <div className="space-y-5 text-fg-muted leading-relaxed">
              <p>
                <span className="text-fg font-medium">DevOps Engineer</span> with{' '}
                <span className="text-accent font-medium">3 years of hands-on experience</span>{' '}
                automating cloud infrastructure, CI/CD pipelines, and deployment workflows
                across AWS and Azure.
              </p>
              <p>
                Expert in{' '}
                <span className="text-fg font-medium">Infrastructure as Code</span> (Terraform),{' '}
                <span className="text-fg font-medium">Configuration Management</span> (Ansible),{' '}
                <span className="text-fg font-medium">Container Orchestration</span> (Kubernetes,
                Docker), and Release Engineering. Delivered scalable, highly available
                microservices architectures achieving{' '}
                <span className="text-accent font-medium">90% reduction in manual deployment effort</span>.
              </p>
              <p>
                Specialized in building production-grade CI/CD pipelines, implementing
                observability solutions (Prometheus, Grafana), and managing Kubernetes
                clusters (EKS, AKS) at scale.
              </p>
            </div>
          </AnimatedSection>

          {/* Right: cards */}
          <AnimatedSection delay={160}>
            <div className="grid sm:grid-cols-2 gap-4">
              {ABOUT_CARDS.map(({ icon, label, labelColor, desc }) => (
                <div
                  key={label}
                  className="card-glass p-5 flex items-start gap-4"
                  role="listitem"
                >
                  <span className="text-2xl mt-0.5 shrink-0" aria-hidden="true">
                    {icon}
                  </span>
                  <div>
                    <p className={`text-sm font-semibold mb-1 ${labelColor}`}>{label}</p>
                    <p className="text-xs text-fg-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
