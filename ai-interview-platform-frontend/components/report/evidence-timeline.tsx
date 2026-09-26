import { Play } from 'lucide-react'
import type { EvidenceItem } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function EvidenceTimeline({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <section aria-labelledby="evidence-heading" className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <h2 id="evidence-heading" className="text-sm font-medium">
          Evidence from transcript
        </h2>
        <span className="text-xs text-muted-foreground">{evidence.length} key moments</span>
      </div>
      <ol className="flex flex-col">
        {evidence.map((item) => (
          <li key={item.timestamp} className="flex gap-4 border-b py-4 first:pt-0 last:border-b-0 last:pb-0">
            <button
              type="button"
              className="flex h-7 shrink-0 items-center gap-1 rounded-md border bg-background px-2 font-mono text-xs tabular-nums hover:bg-muted"
              aria-label={`Play recording at ${item.timestamp}`}
            >
              <Play className="size-3" aria-hidden="true" />
              {item.timestamp}
            </button>
            <div
              className={cn(
                'flex flex-1 flex-col gap-1.5 border-l-2 pl-4',
                item.signal === 'positive' ? 'border-success' : 'border-destructive',
              )}
            >
              <blockquote className="text-sm leading-relaxed text-pretty">{item.quote}</blockquote>
              <p className="text-xs text-muted-foreground">
                <span className={cn('font-medium', item.signal === 'positive' ? 'text-success' : 'text-destructive')}>
                  {item.signal === 'positive' ? 'Positive signal' : 'Concern'}
                </span>
                {' · '}
                {item.note}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
