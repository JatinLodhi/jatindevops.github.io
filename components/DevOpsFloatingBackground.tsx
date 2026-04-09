'use client'

/**
 * DevOpsFloatingBackground.tsx
 *
 * Pure CSS + React floating DevOps logo background.
 * Renders 9 tool logos as atmospheric background elements —
 * low opacity, blurred, glowing, animated — never competing
 * with hero content.
 *
 * ─── Architecture ─────────────────────────────────────────────
 *
 *  Three depth layers create a parallax atmosphere:
 *
 *  FAR   (z:1)  36–44px  blur 3–4px  opacity 0.05–0.06  slow parallax
 *  MID   (z:2)  52–64px  blur 1.5–2.5px  opacity 0.07–0.09  medium
 *  NEAR  (z:3)  68–80px  blur 0.5–1px  opacity 0.10–0.13  faster
 *
 * ─── Position strategy ────────────────────────────────────────
 *
 *  Content safe zone (text + terminal): roughly 8%–88% horizontal
 *  Logos are placed at corners and edges, outside this zone:
 *
 *  ┌──────────────────────────────────────────────────────────┐
 *  │ Docker(far)    Jenkins(far,blur)       Kubernetes(near)  │
 *  │                                                          │
 *  │ AWS(mid)    [ text content + terminal ]   GitHub(near)   │
 *  │                                                          │
 *  │ Terraform(mid)  Grafana(mid)         Prometheus(far)     │
 *  │ Linux(far)                                               │
 *  └──────────────────────────────────────────────────────────┘
 *
 * ─── Three-div pattern ────────────────────────────────────────
 *
 *  outerRef div  — absolute positioned, JS writes translate() for parallax
 *  anim div      — CSS float keyframe (translateY + rotate), isolated from JS
 *  image div     — opacity + filter (blur + drop-shadow glow)
 *
 *  Separating JS transform from CSS animation prevents one from
 *  overwriting the other on the same element.
 *
 * ─── Glow system ──────────────────────────────────────────────
 *
 *  Each logo uses its brand colour (desaturated) in two drop-shadows:
 *    inner: tight radius  — hot-spot halo
 *    outer: large radius  — ambient atmospheric fog
 *
 * ─── Mouse parallax ───────────────────────────────────────────
 *
 *  requestAnimationFrame loop lerps cursor position toward target
 *  (factor 0.04) then applies translate() to each logo's outer ref.
 *  Far logos move least, near logos move most — reinforcing depth.
 */

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/* ── Types ───────────────────────────────────────────────────── */
type DepthLayer = 'far' | 'mid' | 'near'

interface LogoConfig {
  src: string
  alt: string
  /** Visual size in px */
  size: number
  /** CSS top (% or px) */
  top: string
  /** CSS left (% or px) */
  left: string
  /** Element opacity — keep between 0.05 and 0.15 */
  opacity: number
  /** Gaussian blur in px — far = more blur */
  blur: number
  /** CSS animation keyframe class from globals.css */
  animClass: string
  /** Float cycle length — 8–16s range */
  duration: string
  /** Stagger offset so logos don't all move in sync */
  delay: string
  /** Mouse parallax multiplier — far < mid < near */
  parallaxSpeed: number
  /** Depth plane — controls z-index layering */
  layer: DepthLayer
  /**
   * Desaturated brand glow colour in rgba().
   * Used in two drop-shadows: inner halo + outer ambient haze.
   * Keep alpha low (0.20–0.40) to stay subtle.
   */
  glowColor: string
}

/* ── z-index per depth layer ─────────────────────────────────── */
const LAYER_Z: Record<DepthLayer, number> = { far: 1, mid: 2, near: 3 }

/* ── Logo definitions ────────────────────────────────────────── */
/*
 * Sizing and position rationale:
 *   FAR   → smallest, most blurred, lowest opacity, edges/corners
 *   MID   → medium, partial blur, left/right margins
 *   NEAR  → largest, sharpest, highest opacity, outer edge only
 */
const LOGOS: LogoConfig[] = [

  /* ════════════════ FAR LAYER ════════════════════════════════ */

  {
    // Docker — top-left far corner, barely visible, deep background
    src: '/logos/docker.svg',
    alt: 'Docker',
    size: 44,
    top: '5%',
    left: '1%',
    opacity: 0.06,
    blur: 3.5,
    animClass: 'logo-float-a',
    duration: '14s',
    delay: '0s',
    parallaxSpeed: 0.010,
    layer: 'far',
    glowColor: 'rgba(36,150,237,0.22)',   // Docker blue, desaturated
  },
  {
    // Jenkins — top-centre, extremely blurred, barely a silhouette
    // Placed in the "safe zone" but so blurred and faint it doesn't distract
    src: '/logos/jenkins.svg',
    alt: 'Jenkins',
    size: 36,
    top: '7%',
    left: '44%',
    opacity: 0.05,
    blur: 4.5,
    animClass: 'logo-float-b',
    duration: '16s',
    delay: '3s',
    parallaxSpeed: 0.008,
    layer: 'far',
    glowColor: 'rgba(94,106,210,0.18)',   // neutral indigo tint
  },
  {
    // Linux — bottom-left far, very soft
    src: '/logos/linux.svg',
    alt: 'Linux',
    size: 40,
    top: '80%',
    left: '3%',
    opacity: 0.05,
    blur: 4,
    animClass: 'logo-float-c',
    duration: '15s',
    delay: '5s',
    parallaxSpeed: 0.009,
    layer: 'far',
    glowColor: 'rgba(200,200,200,0.15)',  // neutral near-white
  },
  {
    // Prometheus — bottom-right far corner
    src: '/logos/prometheus.svg',
    alt: 'Prometheus',
    size: 38,
    top: '74%',
    left: '90%',
    opacity: 0.06,
    blur: 3.5,
    animClass: 'logo-float-d',
    duration: '13s',
    delay: '6s',
    parallaxSpeed: 0.010,
    layer: 'far',
    glowColor: 'rgba(230,82,44,0.20)',    // Prometheus orange-red, low sat
  },

  /* ════════════════ MID LAYER ════════════════════════════════ */

  {
    // AWS — left edge, vertically centred, medium depth
    src: '/logos/aws.svg',
    alt: 'AWS',
    size: 60,
    top: '40%',
    left: '-1%',
    opacity: 0.09,
    blur: 2,
    animClass: 'logo-float-e',
    duration: '11s',
    delay: '1.5s',
    parallaxSpeed: 0.022,
    layer: 'mid',
    glowColor: 'rgba(255,153,0,0.28)',    // AWS orange, subdued
  },
  {
    // Terraform — bottom-left quadrant
    src: '/logos/terraform.svg',
    alt: 'Terraform',
    size: 54,
    top: '68%',
    left: '20%',
    opacity: 0.08,
    blur: 2.5,
    animClass: 'logo-float-a',
    duration: '12.5s',
    delay: '2s',
    parallaxSpeed: 0.018,
    layer: 'mid',
    glowColor: 'rgba(123,66,188,0.28)',   // Terraform purple, desaturated
  },
  {
    // Grafana — bottom-right quadrant
    src: '/logos/grafana.svg',
    alt: 'Grafana',
    size: 58,
    top: '63%',
    left: '62%',
    opacity: 0.08,
    blur: 2,
    animClass: 'logo-float-b',
    duration: '10.5s',
    delay: '4s',
    parallaxSpeed: 0.020,
    layer: 'mid',
    glowColor: 'rgba(255,166,0,0.25)',    // Grafana amber
  },

  /* ════════════════ NEAR LAYER ═══════════════════════════════ */

  {
    // Kubernetes — top-right corner, largest on the right side
    src: '/logos/kubernetes.svg',
    alt: 'Kubernetes',
    size: 76,
    top: '4%',
    left: '88%',
    opacity: 0.12,
    blur: 0.8,
    animClass: 'logo-float-c',
    duration: '9s',
    delay: '0.5s',
    parallaxSpeed: 0.040,
    layer: 'near',
    glowColor: 'rgba(50,108,229,0.35)',   // K8s blue, slightly desaturated
  },
  {
    // GitHub — right edge, vertically centred
    src: '/logos/github.svg',
    alt: 'GitHub',
    size: 68,
    top: '37%',
    left: '93%',
    opacity: 0.11,
    blur: 1,
    animClass: 'logo-float-d',
    duration: '10s',
    delay: '2.5s',
    parallaxSpeed: 0.035,
    layer: 'near',
    glowColor: 'rgba(139,148,158,0.30)',  // GitHub grey
  },
]

/* ── Component ───────────────────────────────────────────────── */
export default function DevOpsFloatingBackground() {
  const mouseRef  = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef    = useRef<number | null>(null)
  /* One ref per logo — matched by index to LOGOS array */
  const logoRefs  = useRef<(HTMLDivElement | null)[]>([])

  /* ── Mouse parallax via rAF loop ─────────────────────────── */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalise to [-1, +1]
      targetRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    const tick = () => {
      // Lerp toward mouse target (0.04 = smooth but responsive)
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.04

      logoRefs.current.forEach((el, i) => {
        if (!el) return
        const s  = LOGOS[i].parallaxSpeed
        const tx = mouseRef.current.x * s * 100  // max ≈ ±10px for far logos
        const ty = mouseRef.current.y * s *  60  // vertical range slightly smaller
        el.style.transform = `translate(${tx}px, ${ty}px)`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LOGOS.map((logo, i) => (
        /**
         * Three-div isolation pattern:
         *
         *  div#1 (outerRef)  — position anchor + JS parallax translate()
         *  div#2 (anim)      — CSS float animation (translateY + rotate)
         *  div#3 (image)     — opacity + filter, contains <Image>
         *
         * Separating JS and CSS transforms prevents overwrite conflicts.
         */
        <div
          key={logo.alt}
          ref={(el) => { logoRefs.current[i] = el }}
          className="absolute will-change-transform"
          style={{
            top:    logo.top,
            left:   logo.left,
            zIndex: LAYER_Z[logo.layer],
          }}
        >
          {/* CSS float animation — completely isolated from JS transform above */}
          <div
            className={logo.animClass}
            style={{
              animationDuration:       logo.duration,
              animationDelay:          logo.delay,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          >
            {/* Opacity + glow filter wrapper */}
            <div
              style={{
                width:    logo.size,
                height:   logo.size,
                position: 'relative',
                opacity:  logo.opacity,
                filter: [
                  /* Gaussian blur — far logos are blurrier */
                  `blur(${logo.blur}px)`,
                  /* Inner halo: tight, brand-coloured */
                  `drop-shadow(0 0 ${Math.round(logo.size * 0.14)}px ${logo.glowColor})`,
                  /* Outer ambient haze: wide, very transparent */
                  `drop-shadow(0 0 ${Math.round(logo.size * 0.35)}px ${logo.glowColor.replace(/[\d.]+\)$/, '0.10)')})`,
                ].join(' '),
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes={`${logo.size}px`}
                style={{ objectFit: 'contain' }}
                priority={false}
              />
            </div>
          </div>
        </div>
      ))}

      {/*
       * Radial vignette overlay
       * Darkens edges toward the centre so logos naturally fade
       * away from the hero content without hard cutoffs.
       * z-index 4 places it above all logo layers.
       */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            /* Centre clear zone — content area stays unobscured */
            'radial-gradient(ellipse 65% 55% at 50% 45%, transparent 25%, rgba(5,5,6,0.55) 100%)',
          ].join(', '),
          zIndex: 4,
        }}
      />

      {/*
       * Edge bleed fades — smooth logo edges at screen borders
       * so logos don't look clipped.
       */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to right,  rgba(5,5,6,0.5) 0%, transparent 8%, transparent 92%, rgba(5,5,6,0.5) 100%)',
            'linear-gradient(to bottom, rgba(5,5,6,0.4) 0%, transparent 8%, transparent 90%, rgba(5,5,6,0.5) 100%)',
          ].join(', '),
          zIndex: 4,
        }}
      />
    </div>
  )
}
