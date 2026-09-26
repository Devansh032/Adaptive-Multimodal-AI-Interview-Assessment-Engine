import { CheckCircle2 } from 'lucide-react'
import { Pill } from '@/components/shared'
import type { CompletedInterview } from '@/lib/mock-data'

const statusTone = {
  Advanced: 'success',
  'Under review': 'warning',
  'Not selected': 'neutral',
} as const

export function CompletedInterviewList({ interviews }: { interviews: CompletedInterview[] }) {
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {interviews.map((interview) => (
        <li key={interview.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-muted">
              <CheckCircle2 className="size-4 text-muted-foreground" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{interview.role}</span>
              <span className="text-xs text-muted-foreground">
                {interview.company} · {interview.completedOn} · {interview.durationMinutes} min
              </span>
            </div>
          </div>
          <Pill tone={statusTone[interview.status]} dot className="self-start sm:self-auto">
            {interview.status}
          </Pill>
        </li>
      ))}
    </ul>
  )
}
