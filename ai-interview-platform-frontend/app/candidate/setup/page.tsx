import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SystemCheck } from '@/components/setup/system-check'
import { upcomingInterviews } from '@/lib/mock-data'

export const metadata: Metadata = { title: 'Pre-interview setup' }

export default function SetupPage() {
  const interview = upcomingInterviews[0]

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6">
      <Link
        href="/candidate"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to interviews
      </Link>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          {interview.company} · {interview.role}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{"Let's make sure you're ready"}</h1>
        <p className="text-sm text-pretty text-muted-foreground">
          {`We'll check your camera, microphone and connection. This takes about 20 seconds.`}
        </p>
      </div>
      <SystemCheck />
    </main>
  )
}
