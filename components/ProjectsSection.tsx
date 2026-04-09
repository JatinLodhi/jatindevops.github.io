'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'

/* ── Data ─────────────────────────────────────────────────── */
type Category = 'all' | 'infra' | 'cicd' | 'monitor' | 'security' | 'container' | 'ha' | 'cost'

const FILTERS: { key: Category; label: string }[] = [
  { key: 'all',       label: 'ALL'              },
  { key: 'infra',     label: 'INFRASTRUCTURE'   },
  { key: 'cicd',      label: 'CI/CD'            },
  { key: 'monitor',   label: 'MONITORING'       },
  { key: 'security',  label: 'SECURITY'         },
  { key: 'container', label: 'CONTAINERS'       },
  { key: 'ha',        label: 'HIGH AVAILABILITY'},
  { key: 'cost',      label: 'COST OPS'         },
]

interface Project {
  num: string
  cat: Category
  catLabel: string
  title: string
  desc: string
  tags: string[]
  highlight: string
}

const PROJECTS: Project[] = [
  {
    num: '01', cat: 'infra', catLabel: 'INFRASTRUCTURE',
    title: 'Multi-Cloud IaC with Terraform',
    desc:  'Unified IaC framework across AWS & Azure. 200+ resources provisioned, time slashed from 2 days to 30 minutes. Policy-as-code with Checkov and Sentinel.',
    tags:  ['Terraform', 'Checkov', 'Sentinel', 'GitHub Actions'],
    highlight: '2 days → 30 min · 200+ resources',
  },
  {
    num: '02', cat: 'infra', catLabel: 'INFRASTRUCTURE',
    title: 'Catalyst — Azure Kubernetes Infrastructure',
    desc:  'Complete AKS cluster with ACR, API Gateway, MongoDB, and Kafka. NGINX ingress with Prometheus/Grafana observability. Resolved complex Terraform dependency issues.',
    tags:  ['AKS', 'ACR', 'Kafka', 'NGINX'],
    highlight: 'Full Azure K8s stack end-to-end',
  },
  {
    num: '03', cat: 'cicd', catLabel: 'CI/CD',
    title: 'Full-Stack Jenkins & GitOps Pipeline',
    desc:  'Multi-stage pipeline with automated testing, SonarQube quality gates, and Trivy security scanning. 70% deployment time reduction with 98% pipeline success rate.',
    tags:  ['Jenkins', 'GitOps', 'SonarQube', 'Trivy'],
    highlight: '70% deploy time reduction · 98% success rate',
  },
  {
    num: '04', cat: 'cicd', catLabel: 'CI/CD',
    title: 'Funplex — Cloud Sync & Monitoring',
    desc:  'Ansible-automated server config with Cloud Sync across multiple regions. MSSQL exporter + Prometheus via CloudProxy tunneling for cross-region observability.',
    tags:  ['Ansible', 'Prometheus', 'CloudProxy', 'MSSQL'],
    highlight: 'Multi-region monitoring pipeline',
  },
  {
    num: '05', cat: 'monitor', catLabel: 'MONITORING',
    title: 'Prometheus & Grafana Monitoring Stack',
    desc:  'Full observability for 50+ services with custom dashboards, alerting rules, and automated incident response. Reduced MTTR by 60% across all systems.',
    tags:  ['Prometheus', 'Grafana', 'AlertManager', 'Exporters'],
    highlight: '60% MTTR reduction · 50+ services',
  },
  {
    num: '06', cat: 'monitor', catLabel: 'MONITORING',
    title: 'Riseangle — Predictive Scaling Analytics',
    desc:  'ML-based capacity planning with 92% prediction accuracy. Prevented 99% of capacity incidents through intelligent resource forecasting, $40K in annual savings.',
    tags:  ['ML · Python', 'Analytics', 'AWS'],
    highlight: '$40K saved · 92% accuracy',
  },
  {
    num: '07', cat: 'security', catLabel: 'SECURITY',
    title: 'Kubernetes Cluster Security Hardening',
    desc:  'RBAC, Network Policies, and Pod Security Standards across all clusters. OPA Gatekeeper, Falco runtime detection, and Trivy image scanning — 98% compliance achieved.',
    tags:  ['OPA', 'Falco', 'Trivy', 'RBAC'],
    highlight: '98% compliance score · Zero breaches',
  },
  {
    num: '08', cat: 'ha', catLabel: 'HIGH AVAILABILITY',
    title: 'Multi-Region DR Architecture',
    desc:  'Active-passive failover across AWS regions with RTO under 15 minutes. Automated disaster recovery via Terraform and Route 53 health checks for tested failover.',
    tags:  ['AWS', 'Terraform', 'Route 53'],
    highlight: 'RTO < 15 min · Active-Passive DR',
  },
  {
    num: '09', cat: 'cost', catLabel: 'COST OPS',
    title: 'AWS Cost Optimization & FinOps',
    desc:  'Slashed monthly AWS spend by 42% from $120K to $70K. Automated cleanup saving $15K/month, 70% of workloads on Spot Instances with interruption handling.',
    tags:  ['AWS', 'Spot Instances', 'FinOps', 'Python'],
    highlight: '$50K/month saved · 42% cost reduction',
  },
]

const MORE_PROJECTS = [
  { name: 'Sparrow — Self-Hosted Cloud POC',       stack: 'Packer · Docker · SSL/TLS',               metric: '90% time saved'            },
  { name: 'Moakcasey — IaC & CI/CD Pipeline',      stack: 'Terraform · GitHub Actions',              metric: 'Zero inconsistencies'      },
  { name: 'Plaintiff — Multi-Environment IaC',     stack: 'Terraform · DEV / UAT / PROD',            metric: '3 envs standardized'       },
  { name: 'Mythicboost — Full Pipeline Ownership', stack: 'GitHub Secrets · 73 env vars',            metric: 'End-to-end owned'          },
  { name: 'BookmarkED — K8s Perf Optimization',    stack: 'EKS · t2.2xlarge · Pod Affinity',         metric: '100% uptime'               },
  { name: 'Ansible Configuration Management',      stack: 'Ansible Tower · 100+ servers',            metric: '95% error reduction'       },
  { name: 'Saral — Infrastructure Stability',      stack: 'IaC · Process Engineering',               metric: 'Prod stabilized'           },
  { name: 'Docker Multi-Stage Builds & Registry',  stack: 'Docker · Harbor · Multi-stage',           metric: '60% image reduction'       },
  { name: 'HAProxy Load Balancer',                 stack: 'HAProxy · Keepalived · SSL',              metric: '10K+ concurrent'           },
  { name: 'Slaem — Zero-Trust Access Mgmt',        stack: 'Zero-Trust · MFA · IAM',                  metric: 'Zero breaches'             },
  { name: 'Infrastructure Drift Detection',        stack: 'Terraform Cloud · Sentinel · Python',     metric: '20+ incidents prevented'   },
  { name: 'JIA — Infra Support & Automation',      stack: 'IaC · Deployment Automation',             metric: 'Gaps resolved'             },
  { name: 'Riseangle — Capacity Planning',         stack: 'Python · ML Analytics',                   metric: '99% incidents prevented'   },
]

// Category badge colour map
const CAT_COLORS: Record<string, string> = {
  INFRASTRUCTURE:    'text-accent  border-accent/30  bg-accent/5',
  'CI/CD':           'text-orange-400 border-orange-400/30 bg-orange-400/5',
  MONITORING:        'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  SECURITY:          'text-red-400    border-red-400/30    bg-red-400/5',
  'HIGH AVAILABILITY': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
  'COST OPS':        'text-green-400  border-green-400/30  bg-green-400/5',
  CONTAINERS:        'text-purple-400 border-purple-400/30 bg-purple-400/5',
}

/* ── Component ────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [active, setActive] = useState<Category>('all')
  const [showMore, setShowMore] = useState(false)

  const filtered = active === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === active)

  return (
    <section id="projects" className="relative z-10 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
              // 02 — WORK
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-white">
              SELECTED PROJECTS
            </h2>
          </div>
          <span className="text-[0.62rem] font-mono tracking-[0.15em] text-fg-muted shrink-0">
            22 TOTAL · 9 FEATURED
          </span>
        </AnimatedSection>

        {/* Filter tabs — horizontal scroll on mobile */}
        <AnimatedSection delay={60} className="mb-8">
          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={`shrink-0 px-4 py-2 rounded-lg text-[0.65rem] font-mono tracking-widest uppercase transition-all duration-200 border ${
                  active === key
                    ? 'bg-accent text-white border-accent shadow-[0_0_12px_rgba(94,106,210,0.3)]'
                    : 'bg-white/[0.03] text-fg-muted border-white/[0.06] hover:bg-white/[0.06] hover:text-fg hover:border-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map((p, i) => (
            <AnimatedSection key={p.num} delay={i * 50}>
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
        </div>

        {/* More work section */}
        <AnimatedSection delay={100}>
          <div className="card-glass p-0 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
              aria-expanded={showMore}
              aria-controls="more-projects"
            >
              <div>
                <p className="text-[0.62rem] font-mono tracking-[0.2em] text-accent uppercase mb-0.5">
                  // MORE WORK
                </p>
                <p className="text-sm text-fg-muted">
                  13 additional projects
                </p>
              </div>
              <svg
                className={`w-4 h-4 text-fg-muted transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Accordion body */}
            <div
              id="more-projects"
              className={`overflow-hidden transition-all duration-500 ease-out ${
                showMore ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="border-t border-white/[0.06]">
                {MORE_PROJECTS.map(({ name, stack, metric }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-fg truncate">{name}</p>
                      <p className="text-[0.65rem] font-mono text-fg-muted mt-0.5">{stack}</p>
                    </div>
                    <span className="shrink-0 text-[0.65rem] font-mono text-accent">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ── Project card ─────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const { num, catLabel, title, desc, tags, highlight } = project
  const badgeColor = CAT_COLORS[catLabel] ?? 'text-fg-muted border-white/10 bg-white/[0.03]'

  return (
    <article className="card-glass p-6 h-full flex flex-col gap-4 group" aria-label={title}>
      {/* Card top row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[0.65rem] font-mono text-fg-muted/60">{num}</span>
        <span className={`px-2.5 py-1 rounded-full text-[0.6rem] font-mono tracking-wide border ${badgeColor}`}>
          {catLabel}
        </span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-fg leading-snug">{title}</h4>

      {/* Desc */}
      <p className="text-xs text-fg-muted leading-relaxed flex-1">{desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[0.6rem] font-mono text-fg-muted/80 border border-white/[0.06] bg-white/[0.03]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Highlight bar */}
      <div className="pt-3 border-t border-white/[0.06]">
        <p className="text-[0.65rem] font-mono text-accent/80">{highlight}</p>
      </div>
    </article>
  )
}
