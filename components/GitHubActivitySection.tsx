'use client'

import { useEffect, useState } from 'react'
import AnimatedSection from './AnimatedSection'

/* ── Types ─────────────────────────────────────────────── */
interface GitHubEvent {
  id: string
  type: string
  repo: { name: string }
  payload: {
    commits?: Array<{ message: string; sha: string }>
    pull_request?: { title: string; number: number; state: string }
    ref?: string
    ref_type?: string
    action?: string
    issue?: { title: string; number: number }
  }
  created_at: string
}

/* ── Helpers ────────────────────────────────────────────── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60_000)
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(diff / 86_400_000)
  const w = Math.floor(d / 7)
  if (m < 60)  return `${m}m ago`
  if (h < 24)  return `${h}h ago`
  if (d < 7)   return `${d}d ago`
  return `${w}w ago`
}

type EventMeta = { label: string; dot: string; text: string }

function eventMeta(type: string): EventMeta {
  switch (type) {
    case 'PushEvent':        return { label: 'push',   dot: 'bg-green-400',  text: 'text-green-400'  }
    case 'PullRequestEvent': return { label: 'pr',     dot: 'bg-purple-400', text: 'text-purple-400' }
    case 'CreateEvent':      return { label: 'create', dot: 'bg-accent',     text: 'text-accent'     }
    case 'IssuesEvent':      return { label: 'issue',  dot: 'bg-orange-400', text: 'text-orange-400' }
    case 'WatchEvent':       return { label: 'star',   dot: 'bg-yellow-400', text: 'text-yellow-400' }
    case 'ForkEvent':        return { label: 'fork',   dot: 'bg-cyan-400',   text: 'text-cyan-400'   }
    default:                 return { label: type.replace('Event', '').toLowerCase(), dot: 'bg-fg-muted', text: 'text-fg-muted' }
  }
}

function eventDesc(e: GitHubEvent): string {
  switch (e.type) {
    case 'PushEvent': {
      const commits = e.payload.commits ?? []
      const msg = commits[0]?.message?.split('\n')[0] ?? 'pushed commits'
      return commits.length > 1 ? `${msg}  (+${commits.length - 1})` : msg
    }
    case 'PullRequestEvent': {
      const pr = e.payload.pull_request
      return pr ? `#${pr.number}: ${pr.title}` : 'pull request activity'
    }
    case 'CreateEvent':
      return `created ${e.payload.ref_type ?? ''} ${e.payload.ref ?? ''}`.trim()
    case 'IssuesEvent': {
      const iss = e.payload.issue
      return iss ? `#${iss.number}: ${iss.title}` : 'issue activity'
    }
    case 'WatchEvent':  return 'starred repository'
    case 'ForkEvent':   return 'forked repository'
    default:            return e.type.replace('Event', '')
  }
}

const MEANINGFUL = ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'IssuesEvent']

/* ── Component ──────────────────────────────────────────── */
export default function GitHubActivitySection() {
  const [events,    setEvents]    = useState<GitHubEvent[]>([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(false)
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null)

  useEffect(() => {
    fetch('/api/github-activity')
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: GitHubEvent[]) => {
        setEvents(data.filter((e) => MEANINGFUL.includes(e.type)).slice(0, 8))
        setFetchedAt(new Date())
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const pushes  = events.filter((e) => e.type === 'PushEvent').length
  const prs     = events.filter((e) => e.type === 'PullRequestEvent').length
  const repos   = new Set(events.map((e) => e.repo.name)).size

  return (
    <section id="activity" className="relative z-10 py-14 lg:py-20 bg-bg-elevated/40">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="mb-8" from="left">
          <p className="text-[0.62rem] font-mono tracking-[0.3em] text-accent uppercase mb-3">
            // LIVE — GITHUB
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-heading">
              GITHUB ACTIVITY
            </h2>
            {!loading && !error && (
              <div className="flex items-center gap-2 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className="text-[0.62rem] font-mono tracking-widest text-green-400 uppercase">Live</span>
                {fetchedAt && (
                  <span className="text-[0.62rem] font-mono text-fg-muted">
                    · fetched {timeAgo(fetchedAt.toISOString())}
                  </span>
                )}
              </div>
            )}
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
                github.com/JatinLodhi — recent public activity
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
              {loading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5 animate-pulse">
                    <div className="w-14 h-4 bg-white/[0.06] rounded" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3   bg-white/[0.06] rounded w-40" />
                      <div className="h-2.5 bg-white/[0.04] rounded w-60" />
                    </div>
                    <div className="w-12 h-3 bg-white/[0.04] rounded" />
                  </div>
                ))
              ) : error ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[0.75rem] font-mono text-fg-muted">
                    ✗ could not reach GitHub API — rate limit or network error
                  </p>
                </div>
              ) : events.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-[0.75rem] font-mono text-fg-muted">no recent public events found</p>
                </div>
              ) : (
                events.map((ev) => {
                  const meta    = eventMeta(ev.type)
                  const desc    = eventDesc(ev)
                  const repo    = ev.repo.name.replace('JatinLodhi/', '')
                  return (
                    <div
                      key={ev.id}
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
                        <p className="text-[0.75rem] font-mono text-fg truncate font-medium">{repo}</p>
                        <p className="text-[0.7rem] font-mono text-fg-muted truncate mt-0.5">↳ {desc}</p>
                      </div>

                      {/* Time */}
                      <span className="shrink-0 text-[0.62rem] font-mono text-fg-muted mt-0.5 w-16 text-right">
                        {timeAgo(ev.created_at)}
                      </span>
                    </div>
                  )
                })
              )}
            </div>

            {/* Stats footer */}
            {!loading && !error && events.length > 0 && (
              <div className="flex items-center gap-6 flex-wrap px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                <StatChip value={String(pushes)}  label="pushes"       color="text-green-400"  />
                <StatChip value={String(repos)}   label="repos active" color="text-accent"     />
                <StatChip value={String(prs)}     label="PRs"          color="text-purple-400" />
                <StatChip value="public"          label="visibility"   color="text-fg-muted"   />
              </div>
            )}
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
