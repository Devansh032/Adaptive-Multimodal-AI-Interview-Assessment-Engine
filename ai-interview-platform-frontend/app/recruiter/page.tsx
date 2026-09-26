import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { CandidatesTable } from '@/components/recruiter/candidates-table'
import { recruiterCandidates, recruiterStats } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Candidates' }

export default function RecruiterDashboardPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Candidates</h1>
          <p className="text-sm text-muted-foreground">Every AI-led interview across your open roles.</p>
        </div>
        <Link href="/recruiter/configure" className={cn(buttonVariants({ size: 'lg' }), 'h-9 w-fit')}>
          <Plus data-icon="inline-start" aria-hidden="true" />
          Configure new interview
        </Link>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
        {recruiterStats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 bg-card p-4">
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
            <dd className="text-xs text-muted-foreground">{stat.delta}</dd>
          </div>
        ))}
      </dl>

      <CandidatesTable candidates={recruiterCandidates} />
    </main>
  )
}
