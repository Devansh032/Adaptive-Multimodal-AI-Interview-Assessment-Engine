'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Initials, Pill, RecommendationBadge } from '@/components/shared'
import { candidateReports, type CandidateStatus, type RecruiterCandidate } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const statusTone: Record<CandidateStatus, 'neutral' | 'brand' | 'success' | 'warning' | 'danger'> = {
  Scheduled: 'neutral',
  'In progress': 'brand',
  Completed: 'success',
  'Needs review': 'warning',
  Expired: 'danger',
}

const filters = ['All', 'Completed', 'Needs review', 'In progress', 'Scheduled'] as const

export function CandidatesTable({ candidates }: { candidates: RecruiterCandidate[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return candidates.filter(
      (c) =>
        (filter === 'All' || c.status === filter) &&
        (!q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)),
    )
  }, [candidates, query, filter])

  return (
    <section aria-label="Candidates" className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by status">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-md px-2.5 py-1 text-sm transition-colors',
                filter === f ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search candidates"
            aria-label="Search candidates"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 pl-8"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="pr-4 text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((c) => {
              const hasReport = Boolean(candidateReports[c.id])
              const href = `/recruiter/candidates/${c.id}`
              return (
                <TableRow
                  key={c.id}
                  onClick={hasReport ? () => router.push(href) : undefined}
                  className={cn(hasReport && 'cursor-pointer')}
                >
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <Initials name={c.name} />
                      <div className="flex flex-col">
                        {hasReport ? (
                          <Link href={href} className="font-medium hover:underline" onClick={(e) => e.stopPropagation()}>
                            {c.name}
                          </Link>
                        ) : (
                          <span className="font-medium">{c.name}</span>
                        )}
                        <span className="text-xs text-muted-foreground">{c.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.role}</TableCell>
                  <TableCell>
                    <Pill tone={statusTone[c.status]} dot>
                      {c.status}
                    </Pill>
                  </TableCell>
                  <TableCell>
                    {c.score !== undefined ? (
                      <div className="flex items-center gap-2">
                        <span className="w-7 font-mono text-sm tabular-nums">{c.score.toFixed(1)}</span>
                        {c.recommendation ? (
                          <RecommendationBadge recommendation={c.recommendation} />
                        ) : (
                          <Pill tone="warning">{c.competencies?.[0]}</Pill>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="pr-4 text-right text-muted-foreground tabular-nums">{c.date}</TableCell>
                </TableRow>
              )
            })}
            {visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No candidates match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
