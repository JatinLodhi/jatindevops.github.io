import type { NextConfig } from 'next'

/**
 * next.config.ts
 *
 * Static export is required for GitHub Pages (no Node.js server).
 *
 * BASE_PATH env var lets the workflow set the correct subpath:
 *   • Custom domain (jatin.devops.io)  → BASE_PATH=""   (leave empty)
 *   • GitHub Pages subpath             → BASE_PATH="/jatin.devops.io"
 *
 * The workflow sets this automatically based on the repo name.
 */
const basePath = process.env.BASE_PATH ?? ''

const nextConfig: NextConfig = {
  // ── Static export for GitHub Pages ────────────────────────
  output: 'export',       // emit static HTML/CSS/JS into ./out
  trailingSlash: true,    // /about → /about/index.html (avoids 404s on GH Pages)
  basePath,               // '' for custom domain, '/repo-name' for project page

  // ── Image optimisation ────────────────────────────────────
  // next/image optimisation requires a Node server — disable for static export.
  // All <Image> components still render correctly; only server-side optimisation
  // (resizing, WebP conversion) is skipped.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
