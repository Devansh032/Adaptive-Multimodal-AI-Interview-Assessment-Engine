import Link from 'next/link'
import { CalendarDays, Clock, Code2, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Pill } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { UpcomingInterview } from '@/lib/mock-data'

export function UpcomingInterviewCard({
  interview,
  featured = false,
}: {
  interview: UpcomingInterview
  featured?: boolean
}) {
  return (
    <article
      className={cn(
        'flex flex-col gap-5 rounded-xl border bg-card p-5',
        featured && 'border-brand/40 shadow-[0_0_0_4px_color-mix(in_oklch,var(--brand)_8%,transparent)]',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs text-muted-foreground">{interview.company}</p>
          <h3 className="font-medium text-pretty">{interview.role}</h3>
        </div>
        {interview.startsIn && (
          <Pill tone="brand" dot>
            {interview.startsIn}
          </Pill>
        )}
      </div>

      <dl className="flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4" aria-hidden="true" />
          <dt className="sr-only">Date</dt>
          <dd>
            {interview.date} · {interview.time}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4" aria-hidden="true" />
          <dt className="sr-only">Duration</dt>
          <dd>{interview.durationMinutes} minutes</dd>
        </div>
        <div className="flex items-center gap-2">
          <Code2 className="size-4" aria-hidden="true" />
          <dt className="sr-only">Language</dt>
          <dd>{interview.language}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-1.5">
        {interview.types.map((type) => (
          <Pill key={type}>{type}</Pill>
        ))}
      </div>

      <div className="mt-auto">
        {featured ? (
          <Link href="/candidate/setup" className={cn(buttonVariants({ size: 'lg' }), 'h-9 w-full')}>
            Start interview
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-9 w-full')}
          >
            Opens 15 min before start
          </button>
        )}
      </div>
    </article>
  )
}
