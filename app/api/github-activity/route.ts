import { NextResponse } from 'next/server'

export const revalidate = 300 // cache 5 minutes server-side

export async function GET() {
  try {
    const res = await fetch(
      'https://api.github.com/users/JatinLodhi/events?per_page=30',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'jatin.devops.io',
        },
        next: { revalidate: 300 },
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}` },
        { status: res.status }
      )
    }

    const events = await res.json()
    return NextResponse.json(events)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub activity' },
      { status: 500 }
    )
  }
}
