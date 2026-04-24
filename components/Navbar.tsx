'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about',      label: 'About'      },
  { href: '#experience', label: 'Experience' },
  { href: '#featured',   label: 'Projects'   },
  { href: '#skills',     label: 'Stack'      },
  { href: '#impact',     label: 'Impact'     },
  { href: '#contact',    label: 'Contact'    },
]

/* ── Scroll Progress Bar ─────────────────────────────────────── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] h-[2px] bg-gradient-to-r from-accent to-indigo-400 transition-none pointer-events-none"
      style={{ width: `${progress}%` }}
    />
  )
}

/* ── Navbar ──────────────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setIsOpen(false)

  return (
    <>
      <ScrollProgressBar />

      {/* Main nav bar */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-sm tracking-[0.2em] text-fg hover:text-white transition-colors duration-200"
            aria-label="Home"
          >
            DEV<span className="text-accent">/</span>OPS
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative text-[0.7rem] font-mono tracking-[0.15em] uppercase text-fg-muted hover:text-fg transition-colors duration-200 group py-1"
                >
                  {label}
                  {/* Underline reveal on hover */}
                  <span className="absolute -bottom-px left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: Medium + status + mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Medium blog link */}
            <a
              href="https://jatinlodhi.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium blog"
              className="hidden sm:flex items-center gap-1.5 text-fg-muted hover:text-white transition-colors duration-200"
            >
              {/* Medium M icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <span className="text-[0.6rem] font-mono tracking-[0.1em] uppercase">Blog</span>
            </a>

            {/* Available status badge */}
            <div className="hidden sm:flex items-center gap-2" aria-label="Availability status">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse"
                aria-hidden="true"
              />
              <span className="text-[0.6rem] font-mono tracking-[0.12em] text-accent uppercase">
                Available for Work
              </span>
            </div>

            {/* Hamburger / Close */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 text-fg-muted hover:text-fg transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                /* X icon */
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed top-14 left-0 right-0 z-40 md:hidden bg-bg-base/97 backdrop-blur-xl border-b border-white/[0.06]
          transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-1 p-4" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={close}
                className="block px-4 py-3 text-sm font-mono tracking-widest uppercase text-fg-muted hover:text-fg hover:bg-white/[0.05] rounded-xl transition-all duration-150"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-3 px-2 pb-2">
            <a
              href="#contact"
              onClick={close}
              className="block w-full text-center py-3 bg-accent hover:bg-accent-bright text-white rounded-xl text-sm font-medium transition-colors duration-200
                shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3)]"
            >
              Get In Touch →
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
