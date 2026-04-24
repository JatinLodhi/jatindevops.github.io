'use client'

import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { Cloud } from '@react-three/drei'

/* ── Data ─────────────────────────────────────────────────── */
type Category = 'all' | 'infra' | 'cicd' | 'Configuration Management' | 'monitor' | 'security' | 'container' | 'ha' | 'cost'

const FILTERS: { key: Category; label: string }[] = [
  { key: 'all',       label: 'ALL'              },
  { key: 'infra',     label: 'INFRASTRUCTURE'   },
  { key: 'cicd',      label: 'CI/CD'            },
  { key: 'Configuration Management', label: 'CONFIG MGMT' },
  { key: 'monitor',   label: 'MONITORING'       },
  { key: 'security',  label: 'SECURITY'         },
  { key: 'container', label: 'CONTAINERS'       },
  { key: 'ha',        label: 'HIGH AVAILABILITY'},
  { key: 'cost',      label: 'COST OPS'         },
]

interface MarketplaceLink {
  cloud: string
  href: string
}

interface Project {
  num: string
  cat: Category
  catLabel: string
  title: string
  desc: string
  tags: string[]
  highlight: string
  /** Optional GitHub repo link — rendered as a button on the card */
  githubLink?: string
  /** Optional cloud marketplace links — rendered as live buttons on the card */
  marketplaceLinks?: MarketplaceLink[]
}

const PROJECTS: Project[] = [
  {
    num: '01', cat: 'infra', catLabel: 'INFRASTRUCTURE',
    title: 'Multi-Cloud IaC with Terraform',
    desc:  'Unified IaC framework across AWS & Azure. 200+ resources provisioned, time slashed from 2 days to 30 minutes. Policy-as-code with Checkov and Sentinel.',
    tags:  ['Terraform', 'Checkov', 'Sentinel', 'GitHub Actions'],
    highlight: '2 days → 30 min · 200+ resources',
    githubLink: 'https://github.com/JatinLodhi/Terraform-Full-Course-Aws',
  },
  {
    num: '02', cat: 'infra', catLabel: 'INFRASTRUCTURE',
    title: 'Multi-Cloud VM Images with HashiCorp Packer',
    desc:  'Production-ready VM image pipeline for an API Testing Tool across AWS (AMI), Azure (VHD), and DigitalOcean (Snapshot). Full runtime stack — MongoDB 7, Node.js 20, Java 17, nginx — with security hardening: UFW, Fail2ban, AppArmor, ClamAV, and AIDE file integrity monitoring.',
    tags:  ['Packer', 'AWS AMI', 'Azure VHD', 'DigitalOcean'],
    highlight: '3 clouds unified · 90% provisioning time saved',
    marketplaceLinks: [
      { cloud: 'AWS',          href: 'https://aws.amazon.com/marketplace/search/results?searchTerms=sparrow+community+edition' },
      { cloud: 'Azure',        href: 'https://marketplace.microsoft.com/en-us/product/techdomesolutionsprivatelimited1708671149622.community-sparrow-linux-vm?tab=Overview' },
      { cloud: 'DigitalOcean', href: 'https://marketplace.digitalocean.com/apps/sparrow-community-edition-1' },
    ],
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
    title: 'Game Zone — Cloud Sync & Monitoring',
    desc:  'Ansible-automated server config with Cloud Sync across multiple regions using GitHub Actions. MSSQL exporter + Prometheus via CloudProxy tunneling for cross-region observability.',
    tags:  ['GitHub Actions', 'Ansible', 'Prometheus', 'CloudProxy', 'MSSQL'],
    highlight: 'Multi-region deployment pipeline',
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
    <section id="projects" className="relative z-10 py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header — heading slides in from left */}
        <AnimatedSection className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4" from="left">
          <div>
            <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
              // 03 — WORK
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
              SELECTED PROJECTS
            </h2>
          </div>
          <span className="text-[0.62rem] font-mono tracking-[0.15em] text-fg-muted shrink-0">
            22 TOTAL · 9 FEATURED
          </span>
        </AnimatedSection>

        {/* Filter tabs — horizontal scroll on mobile */}
        <AnimatedSection delay={60} className="mb-8" from="right">
          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {FILTERS.map(({ key, label }) => {
              // Light colour palette per filter — inactive state
              const filterColors: Record<string, string> = {
                all:       'border-violet-400/50  bg-violet-400/10  text-violet-300  hover:border-violet-400/80  hover:bg-violet-400/20  hover:text-violet-200',
                infra:     'border-indigo-400/50  bg-indigo-400/10  text-indigo-300  hover:border-indigo-400/80  hover:bg-indigo-400/20  hover:text-indigo-200',
                cicd:      'border-orange-400/50  bg-orange-400/10  text-orange-300  hover:border-orange-400/80  hover:bg-orange-400/20  hover:text-orange-200',
                monitor:   'border-yellow-400/50  bg-yellow-400/10  text-yellow-300  hover:border-yellow-400/80  hover:bg-yellow-400/20  hover:text-yellow-200',
                security:  'border-red-400/50     bg-red-400/10     text-red-300     hover:border-red-400/80     hover:bg-red-400/20     hover:text-red-200',
                container: 'border-purple-400/50  bg-purple-400/10  text-purple-300  hover:border-purple-400/80  hover:bg-purple-400/20  hover:text-purple-200',
                ha:        'border-cyan-400/50    bg-cyan-400/10    text-cyan-300    hover:border-cyan-400/80    hover:bg-cyan-400/20    hover:text-cyan-200',
                cost:      'border-green-400/50   bg-green-400/10   text-green-300   hover:border-green-400/80   hover:bg-green-400/20   hover:text-green-200',
              }

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active === key}
                  onClick={() => setActive(key)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-[0.65rem] font-semibold font-mono tracking-widest uppercase transition-all duration-200 border ${
                    active === key
                      ? 'bg-accent text-white border-accent shadow-[0_0_16px_rgba(94,106,210,0.45)]'
                      : filterColors[key] ?? 'border-white/20 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white/90'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map((p, i) => (
            <AnimatedSection key={p.num} delay={i * 60} from="depth">
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
        </div>

        {/* More work section */}
        <AnimatedSection delay={100} from="depth">
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
                  12 additional projects
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
  const { num, catLabel, title, desc, tags, highlight, githubLink, marketplaceLinks } = project
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
            className="px-2.5 py-1 rounded-md text-[0.62rem] font-semibold font-mono text-white/80 border border-white/20 bg-white/[0.08]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* GitHub link — only rendered when present */}
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg
                     border border-white/20 bg-white/[0.06]
                     text-[0.65rem] font-semibold font-mono tracking-wide text-white/80
                     hover:border-white/40 hover:bg-white/[0.12] hover:text-white
                     transition-all duration-200 group/gh w-fit"
          aria-label="View source on GitHub"
        >
          {/* GitHub Invertocat icon */}
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 fill-current opacity-80 group-hover/gh:opacity-100 transition-opacity"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                     0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                     -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                     .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                     -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09
                     2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
                     2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
                     2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          VIEW ON GITHUB
          <svg
            className="w-2.5 h-2.5 opacity-60 group-hover/gh:opacity-100 group-hover/gh:translate-x-px group-hover/gh:-translate-y-px transition-transform duration-150"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 8L8 2M5 2h3v3" />
          </svg>
        </a>
      )}

      {/* Marketplace links — only rendered when present */}
      {marketplaceLinks && marketplaceLinks.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Label — bold, white */}
          <p className="text-[0.6rem] font-bold font-mono tracking-[0.18em] text-white uppercase">
            Live on Marketplace
          </p>

          <div className="flex flex-wrap gap-2">
            {marketplaceLinks.map(({ cloud, href }) => {
              // Brand-accurate light colours per cloud provider
              const style: Record<string, string> = {
                AWS:          'border-amber-400/40  bg-amber-400/10  text-amber-300  hover:border-amber-400/70  hover:bg-amber-400/20  hover:text-amber-200',
                Azure:        'border-sky-400/40    bg-sky-400/10    text-sky-300    hover:border-sky-400/70    hover:bg-sky-400/20    hover:text-sky-200',
                DigitalOcean: 'border-teal-400/40   bg-teal-400/10   text-teal-300   hover:border-teal-400/70   hover:bg-teal-400/20   hover:text-teal-200',
              }
              const cls = style[cloud] ?? 'border-white/20 bg-white/[0.06] text-white/70 hover:border-white/40 hover:bg-white/10 hover:text-white'

              return (
                <a
                  key={cloud}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                              text-[0.65rem] font-semibold font-mono tracking-wide
                              border transition-all duration-200 group/link ${cls}`}
                  aria-label={`View on ${cloud} Marketplace`}
                >
                  {cloud}
                  {/* External link arrow */}
                  <svg
                    className="w-2.5 h-2.5 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-px group-hover/link:-translate-y-px transition-transform duration-150"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 8L8 2M5 2h3v3" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Highlight bar */}
      <div className="pt-3 border-t border-white/[0.06]">
        <p className="text-[0.65rem] font-mono text-accent/80">{highlight}</p>
      </div>
    </article>
  )
}
