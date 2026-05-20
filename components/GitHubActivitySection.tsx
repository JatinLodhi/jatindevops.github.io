'use client'

import AnimatedSection from './AnimatedSection'

/* ── Types ─────────────────────────────────────────────── */
interface StaticEvent {
  id: string
  type: 'PushEvent' | 'PullRequestEvent' | 'CreateEvent' | 'IssuesEvent' | 'WatchEvent' | 'ForkEvent'
  repo: string          // short name (without owner)
  repoFull: string      // JatinLodhi/repo-name
  message: string       // human-readable description
  date: string          // ISO string
}

/* ── Static curated events ──────────────────────────────── */
const EVENTS: StaticEvent[] = [
  {
    id: '1',
    type: 'PushEvent',
    repo: 'ai-k8s-checker',
    repoFull: 'JatinLodhi/ai-k8s-checker',
    message: 'feat: add MS Teams webhook alert for CrashLoopBackOff pods',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'PushEvent',
    repo: 'ai-k8s-checker',
    repoFull: 'JatinLodhi/ai-k8s-checker',
    message: 'refactor: switch LLM backend to Ollama Llama 3.2 (+2)',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'CreateEvent',
    repo: 'mlops-pipeline',
    repoFull: 'JatinLodhi/mlops-pipeline',
    message: 'created branch feature/drift-detection',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'PushEvent',
    repo: 'Terraform-Full-Course-Aws',
    repoFull: 'JatinLodhi/Terraform-Full-Course-Aws',
    message: 'docs: add module examples for EKS node groups',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'PullRequestEvent',
    repo: 'ai-k8s-checker',
    repoFull: 'JatinLodhi/ai-k8s-checker',
    message: '#4: Add RBAC ClusterRole for read-only pod access',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    type: 'PushEvent',
    repo: 'jatin.devops.io',
    repoFull: 'JatinLodhi/jatin.devops.io',
    message: 'feat: add AI K8s Checker project + Medium article link',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    type: 'PushEvent',
    repo: 'jatin.devops.io',
    repoFull: 'JatinLodhi/jatin.devops.io',
    message: 'feat: add ExperienceSection + AnimatedSection scroll reveals',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    type: 'CreateEvent',
    repo: 'ai-k8s-checker',
    repoFull: 'JatinLodhi/ai-k8s-checker',
    message: 'created repository ai-k8s-checker',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

/* ── Helpers ────────────────────────────────────────────── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(diff / 86_400_000)
  const w = Math.floor(d / 7)
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  if (d < 7)  return `${d}d ago`
  return `${w}w ago`
}

type EventMeta = { label: string; dot: string; text: string }

function eventMeta(type: StaticEvent['type']): EventMeta {
  switch (type) {
    case 'PushEvent':        return { label: 'push',   dot: 'bg-green-400',  text: 'text-green-400'  }
    case 'PullRequestEvent': return { label: 'pr',     dot: 'bg-purple-400', text: 'text-purple-400' }
    case 'CreateEvent':      return { label: 'create', dot: 'bg-accent',     text: 'text-accent'     }
    case 'IssuesEvent':      return { label: 'issue',  dot: 'bg-orange-400', text: 'text-orange-400' }
    case 'WatchEvent':       return { label: 'star',   dot: 'bg-yellow-400', text: 'text-yellow-400' }
    case 'ForkEvent':        return { label: 'fork',   dot: 'bg-cyan-400',   text: 'text-cyan-400'   }
  }
}

/* ── Summary stats ─────────────────────────────────────── */
const pushCount  = EVENTS.filter((e) => e.type === 'PushEvent').length
const prCount    = EVENTS.filter((e) => e.type === 'PullRequestEvent').length
const repoCount  = new Set(EVENTS.map((e) => e.repo)).size

/* ── Component ──────────────────────────────────────────── */
export default function GitHubActivitySection() {
  return (
    <section id="activity" className="relative z-10 py-14 lg:py-20 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // GITHUB
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
              GITHUB ACTIVITY
            </h2>
            <div className="flex items-center gap-2 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span className="text-[0.62rem] font-mono tracking-widest text-green-400 uppercase">Recent</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Terminal card */}
        <AnimatedSection delay={80} from="depth">
          <div className="card-glass overflow-hidden">

            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"    aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"  aria-hidden="true" />
              <span className="ml-2 text-[0.65rem] font-mono text-fg-muted flex-1">
                github.com/JatinLodhi — recent activity
              </span>
              <a
                href="https://github.com/JatinLodhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.62rem] font-mono text-accent hover:text-white transition-colors uppercase tracking-wider"
              >
                View Profile →
              </a>
            </div>

            {/* Column headers */}
            <div className="hidden sm:flex items-center gap-4 px-5 py-2 border-b border-white/[0.04] bg-white/[0.01]">
              <span className="w-14 text-[0.58rem] font-mono text-fg-muted uppercase tracking-wider">Type</span>
              <span className="flex-1  text-[0.58rem] font-mono text-fg-muted uppercase tracking-wider">Repository · Message</span>
              <span className="w-16 text-right text-[0.58rem] font-mono text-fg-muted uppercase tracking-wider">When</span>
            </div>

            {/* Event rows */}
            <div className="divide-y divide-white/[0.04]">
              {EVENTS.map((ev) => {
                const meta = eventMeta(ev.type)
                return (
                  <a
                    key={ev.id}
                    href={`https://github.com/${ev.repoFull}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Type badge */}
                    <div className="shrink-0 flex items-center gap-1.5 w-14 mt-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} aria-hidden="true" />
                      <span className={`text-[0.62rem] font-mono font-semibold tracking-wide uppercase ${meta.text}`}>
                        {meta.label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.75rem] font-mono text-fg truncate font-medium">{ev.repo}</p>
                      <p className="text-[0.7rem] font-mono text-fg-muted truncate mt-0.5">↳ {ev.message}</p>
                    </div>

                    {/* Time */}
                    <span className="shrink-0 text-[0.62rem] font-mono text-fg-muted mt-0.5 w-16 text-right">
                      {timeAgo(ev.date)}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Stats footer */}
            <div className="flex items-center gap-6 flex-wrap px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
              <StatChip value={String(pushCount)} label="pushes"       color="text-green-400"  />
              <StatChip value={String(repoCount)} label="repos active" color="text-accent"     />
              <StatChip value={String(prCount)}   label="PRs"          color="text-purple-400" />
              <StatChip value="public"            label="visibility"   color="text-fg-muted"   />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function StatChip({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-sm font-mono font-semibold ${color}`}>{value}</span>
      <span className="text-[0.6rem] font-mono text-fg-muted uppercase tracking-wider">{label}</span>
    </div>
  )
}
