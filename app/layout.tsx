import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DevOps Engineer Portfolio',
  description:
    'DevOps Engineer Portfolio — AWS, Azure, GCP, Kubernetes, Terraform, CI/CD. 3 years experience, 22 production projects, 99.9% uptime.',
  keywords: [
    'DevOps Engineer',
    'AWS',
    'Azure',
    'GCP',
    'Kubernetes',
    'Terraform',
    'CI/CD',
    'Portfolio',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
