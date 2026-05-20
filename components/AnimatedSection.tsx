'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type FromDirection = 'up' | 'left' | 'right' | 'depth'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  /** Extra delay in ms added on top of IntersectionObserver trigger */
  delay?: number
  threshold?: number
  /**
   * Animation direction:
   *  'up'    — fade + slide up           (default, for generic content)
   *  'left'  — slide in from the left    (section headings)
   *  'right' — slide in from the right   (right-column content)
   *  'depth' — scale up from behind      (cards — back-to-front)
   */
  from?: FromDirection
}

/**
 * Wrapper that animates children in when they enter the viewport.
 * Direction controlled by the `from` prop — maps to CSS data-from attribute
 * selectors defined in globals.css.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.08,
  from = 'up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Safety net: ensure visibility even if observer never fires (long timeout so it doesn't
    // pre-reveal off-screen sections before the user scrolls to them)
    const safetyTimer = setTimeout(() => el.classList.add('visible'), 10000)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tid = setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
          clearTimeout(safetyTimer)
          return () => clearTimeout(tid)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(safetyTimer)
    }
  }, [delay, threshold])

  return (
    <div ref={ref} className={`reveal ${className}`} data-from={from}>
      {children}
    </div>
  )
}
