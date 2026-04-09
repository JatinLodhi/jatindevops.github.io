'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  /** Extra delay in ms added on top of IntersectionObserver trigger */
  delay?: number
  threshold?: number
}

/**
 * Wrapper that fades + slides children in when they enter the viewport.
 * Uses IntersectionObserver — no animation library needed.
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.08,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Safety net: ensure visibility even if observer never fires
    const safetyTimer = setTimeout(() => el.classList.add('visible'), 1500)

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
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}
