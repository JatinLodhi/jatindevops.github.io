import AnimatedSection from './AnimatedSection'

/* ── Data ─────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    role:      'DevOps Engineer',
    level:     'L1',
    company:   'Techdome Pvt Ltd',
    location:  'Indore',
    period:    'Sep 2024 – Present',
    current:   true,
    color:     'border-accent/40 bg-accent/[0.04]',
    dotColor:  'bg-accent',
    bullets: [
      'Architected and launched 8+ production-grade projects using Terraform and Ansible across AWS and Azure, maintaining full ownership of CI/CD automation, deployment, and monitoring.',
      'Engineered multi-environment CI/CD pipelines (DEV/UAT/PROD) via GitHub Actions, automating containerized deployments to Kubernetes clusters with 95% success rate and 50+ zero-downtime deployments/month.',
      'Reduced infrastructure provisioning time by 90% through Terraform modules and Ansible playbooks, ensuring consistency across 15+ environments.',
      'Managed Kubernetes clusters (AKS/EKS) including NGINX Ingress, Horizontal Pod Autoscaling, resource quotas, and workload optimization for 20+ microservices.',
      'Built comprehensive observability stack with Prometheus, Grafana, and custom exporters for APIs, Kafka, MongoDB, and Kubernetes metrics — reducing MTTR by 60%.',
      'Orchestrated Docker multi-stage builds reducing image sizes by 40%, while introducing GitOps workflows and release engineering practices.',
    ],
    tags: ['Terraform', 'Ansible', 'GitHub Actions', 'Kubernetes', 'Prometheus', 'Grafana', 'Docker', 'AWS', 'Azure'],
  },
  {
    role:      'Junior Engineer',
    level:     '',
    company:   'KocharTech',
    location:  'Amritsar',
    period:    'Jul 2023 – Sep 2024',
    current:   false,
    color:     'border-white/10 bg-white/[0.02]',
    dotColor:  'bg-fg-muted',
    bullets: [
      'Provisioned and configured Linux servers (Ubuntu, RHEL), databases (PostgreSQL, MySQL), and cloud networking (VPCs, security groups, subnets), improving system performance by 40%.',
      'Built centralized log management and rotation strategies for distributed systems, reducing storage costs by 30% and accelerating troubleshooting efficiency.',
      'Refined CI/CD pipelines using GitHub Actions and Docker, reducing release cycles by 30%, increasing deployment frequency by 25%, and cutting manual errors by 85%.',
      'Enhanced PostgreSQL scalability by 20% through Docker Compose orchestration with connection pooling and query optimization.',
      'Designed cloud infrastructure solutions on AWS and Azure meeting security, scalability, and HA requirements with 95% client satisfaction.',
    ],
    tags: ['GitHub Actions', 'Docker', 'Linux', 'PostgreSQL', 'AWS', 'Azure', 'Bash'],
  },
]

/* ── Component ────────────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // 01 — EXPERIENCE
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
            WORK EXPERIENCE
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 pl-8">
            {EXPERIENCES.map((exp, i) => (
              <AnimatedSection key={exp.company} delay={i * 120} from={i % 2 === 0 ? 'left' : 'right'}>
                <div className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-8 top-5 w-3.5 h-3.5 rounded-full border-2 border-bg-base ${exp.dotColor}`}
                    aria-hidden="true"
                  />
                  {exp.current && (
                    <div
                      className="absolute -left-8 top-5 w-3.5 h-3.5 rounded-full bg-accent/40 animate-ping"
                      aria-hidden="true"
                    />
                  )}

                  {/* Card */}
                  <div className={`card-glass p-6 border ${exp.color}`}>
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-fg">
                            {exp.role}
                            {exp.level && (
                              <span className="ml-1.5 text-[0.65rem] font-mono text-fg-muted">
                                {exp.level}
                              </span>
                            )}
                          </h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.55rem] font-mono tracking-widest border border-accent/30 bg-accent/10 text-accent uppercase">
                              <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-fg-muted mt-0.5">
                          {exp.company}
                          <span className="mx-2 text-white/20">·</span>
                          {exp.location}
                        </p>
                      </div>
                      <span className="shrink-0 text-[0.65rem] font-mono tracking-[0.1em] text-fg-muted border border-white/10 bg-white/[0.04] rounded-lg px-2.5 py-1">
                        {exp.period}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-2.5 text-xs text-fg-muted leading-relaxed">
                          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[0.6rem] font-semibold font-mono text-white/70 border border-white/15 bg-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
