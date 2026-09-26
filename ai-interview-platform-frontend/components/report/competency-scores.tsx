import type { Competency } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function barColor(score: number) {
  if (score >= 4) return 'bg-success'
  if (score >= 3) return 'bg-brand'
  if (score >= 2.5) return 'bg-warning'
  return 'bg-destructive'
}

export function CompetencyScores({ competencies }: { competencies: Competency[] }) {
  return (
    <section aria-labelledby="competency-heading" className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <h2 id="competency-heading" className="text-sm font-medium">
          Competency scores
        </h2>
        <span className="text-xs text-muted-foreground">Scale 1–5</span>
      </div>
      <ul className="flex flex-col gap-4">
        {competencies.map((c) => (
          <li key={c.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span>{c.name}</span>
              <span className="font-mono tabular-nums">{c.score.toFixed(1)}</span>
            </div>
            <div
              className="grid h-1.5 grid-cols-5 gap-0.5"
              role="meter"
              aria-label={c.name}
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={c.score}
            >
              {[0, 1, 2, 3, 4].map((i) => {
                const fill = Math.min(Math.max(c.score - i, 0), 1)
                return (
                  <span key={i} className="overflow-hidden rounded-full bg-muted">
                    <span className={cn('block h-full', barColor(c.score))} style={{ width: `${fill * 100}%` }} />
                  </span>
                )
              })}
            </div>
            <p className="text-xs text-pretty text-muted-foreground">{c.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
