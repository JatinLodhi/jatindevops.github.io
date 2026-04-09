'use client'

/**
 * DevOpsBackground.tsx
 *
 * 3D particle field for the hero section background.
 *
 * ─── Inspiration ──────────────────────────────────────────────
 *
 *  Directly adapted from sanidhyy/space-portfolio:
 *  components/main/star-background.tsx
 *
 *  Original pattern (kept verbatim where possible):
 *    • Camera at [0, 0, 1] — camera sits INSIDE the particle sphere
 *    • Particles distributed in sphere, radius 1.2
 *    • useFrame rotation: x -= delta/10, y -= delta/15
 *    • Group rotation: [0, 0, Math.PI/4] (45° Z tilt, same as original)
 *    • Points + PointMaterial (single draw call, GPU-efficient)
 *
 * ─── Our DevOps adaptations ───────────────────────────────────
 *
 *  1. Two counter-rotating layers instead of one:
 *       Layer A — indigo (#5E6AD2), radius 1.2 — DevOps accent colour
 *                 Rotates exactly like the original (delta/10, delta/15)
 *       Layer B — white  (#ffffff), radius 0.9 — ambient star field
 *                 Counter-rotates (+=delta/16, -=delta/20) for depth
 *
 *  2. No maath dependency — generateSphere() replaces maath/random.inSphere
 *     Uses the cube-root trick for uniform density inside the sphere.
 *
 *  3. CameraRig — subtle mouse-parallax via useFrame lerp (0.02 factor).
 *     Adds dimensionality without distracting motion.
 *
 *  4. ResizeObserver pattern — canvas gets real pixel dims before mount
 *     (required because the container uses absolute inset-0 in the hero).
 *
 * ─── Layer stack (hero section, bottom → top) ─────────────────
 *
 *  CSS gradient blobs     (div, z-index 0)       ← atmosphere tint
 *  DevOpsBackground       (canvas, z-index 0)    ← THIS FILE — particles
 *  DevOpsFloatingBackground (CSS, z-index 1–4)   ← logos, unchanged
 *  Hero content           (div, z-index 10)
 *
 * ─── Performance ──────────────────────────────────────────────
 *
 *  • ~1300 particles total across two groups — 2 draw calls
 *  • depthWrite: false on all materials (no z-fighting)
 *  • dpr capped [1, 1.5] — Retina-safe without full 2× GPU cost
 *  • frustumCulled on both Points groups
 *  • No lights, no shadows, no geometry fills
 */

import { useRef, useEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────
   generateSphere
   Replacement for maath/random.inSphere — no extra package.

   Fills a Float32Array with `count` xyz triplets distributed
   uniformly inside a sphere of given radius.

   The cube-root trick (r = Math.cbrt(rand) * radius) gives
   uniform volume density — without it, points cluster at centre.
───────────────────────────────────────────────────────────────*/
function generateSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = Math.cbrt(Math.random()) * radius
    out[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    out[i * 3 + 2] = r * Math.cos(phi)
  }
  return out
}

/* ─────────────────────────────────────────────────────────────
   ParticleField
   The direct DevOps adaptation of StarBackground from space-portfolio.

   Layer A — indigo, outer sphere (radius 1.2, same as original)
   Layer B — white,  inner sphere (radius 0.9, creates near/far depth)

   Rotation formula kept identical to the original source:
     ref.current.rotation.x -= delta / 10
     ref.current.rotation.y -= delta / 15
   Layer B counter-rotates for parallax depth feeling.
───────────────────────────────────────────────────────────────*/
function ParticleField() {
  const indigoRef = useRef<THREE.Points>(null)
  const whiteRef  = useRef<THREE.Points>(null)

  // useMemo so React StrictMode double-invoke doesn't regenerate mid-frame
  const indigoPositions = useMemo(() => generateSphere(800, 1.2),  [])
  const whitePositions  = useMemo(() => generateSphere(500, 0.9), [])

  useFrame((_state, delta) => {
    // ── Layer A: exact rotation formula from space-portfolio ──
    if (indigoRef.current) {
      indigoRef.current.rotation.x -= delta / 10
      indigoRef.current.rotation.y -= delta / 15
    }
    // ── Layer B: counter-rotation for depth ───────────────────
    if (whiteRef.current) {
      whiteRef.current.rotation.x += delta / 16
      whiteRef.current.rotation.y -= delta / 20
    }
  })

  return (
    // Group rotation matches the original: [0, 0, Math.PI / 4]
    <group rotation={[0, 0, Math.PI / 4]}>

      {/* Layer A — indigo DevOps accent particles (outer, larger) */}
      <Points
        ref={indigoRef}
        positions={indigoPositions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#5E6AD2"       // accent indigo — DevOps brand colour
          size={0.004}          // slightly larger than original 0.002
          sizeAttenuation       // perspective-correct sizing
          depthWrite={false}    // no z-fighting with CSS layers
          opacity={0.70}
        />
      </Points>

      {/* Layer B — white ambient micro-particles (inner, original feel) */}
      <Points
        ref={whiteRef}
        positions={whitePositions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#ffffff"        // white — matches original star colour
          size={0.002}           // original size
          sizeAttenuation
          depthWrite={false}
          opacity={0.40}
        />
      </Points>

    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   CameraRig
   Gentle mouse-parallax camera movement.
   Maps cursor to a small offset and lerps toward it each frame.
   Movement is subtle (max ±0.08 units) so it never distracts.
───────────────────────────────────────────────────────────────*/
function CameraRig() {
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Map cursor to [-1, +1] then scale to a small world-space range
      target.current.x =  (e.clientX / window.innerWidth  - 0.5) * 0.16
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.10
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ camera }) => {
    // Lerp factor 0.02 — very smooth, takes ~2s to settle
    camera.position.x += (target.current.x - camera.position.x) * 0.02
    camera.position.y += (target.current.y - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ─────────────────────────────────────────────────────────────
   Scene
   Composes particle field + camera rig inside the R3F canvas.
   Wrapped in Suspense (drei components are async-loaded).
───────────────────────────────────────────────────────────────*/
function Scene() {
  return (
    <Suspense fallback={null}>
      <ParticleField />
      <CameraRig />
    </Suspense>
  )
}

/* ─────────────────────────────────────────────────────────────
   DevOpsBackground  (default export)

   Renders the WebGL canvas inside an absolute-positioned div
   that fills the hero section. The canvas is transparent so
   CSS blobs beneath it show through.

   ResizeObserver pattern:
     R3F reads clientWidth/clientHeight from the parent div.
     With absolute inset-0, these read as 0 before paint.
     We measure via offsetWidth/offsetHeight and pass explicit
     pixel dimensions to <Canvas> once they are non-zero.

   Usage in HeroSection (added as a new layer, nothing removed):
     const DevOpsBackground = dynamic(
       () => import('./DevOpsBackground'), { ssr: false }
     )
     // In JSX, between the CSS blobs and DevOpsFloatingBackground:
     <DevOpsBackground />
───────────────────────────────────────────────────────────────*/
export default function DevOpsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Mount canvas only once ResizeObserver gives real dimensions */}
      {size && size.w > 0 && (
        <Canvas
          /**
           * Camera position [0, 0, 1] — identical to space-portfolio.
           * At this position the camera sits inside the particle sphere
           * (radius 1.2), so particles surround it in all directions,
           * exactly recreating the star-field immersion effect.
           */
          camera={{ position: [0, 0, 1] }}
          gl={{
            antialias: false,        // not needed for points
            alpha: true,             // transparent — CSS blobs show through
            powerPreference: 'default',
          }}
          dpr={[1, 1.5]}
          style={{ width: size.w, height: size.h, background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  )
}
