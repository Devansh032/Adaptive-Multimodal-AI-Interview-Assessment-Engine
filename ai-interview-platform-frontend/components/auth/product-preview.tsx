import { CheckCircle2, Quote } from 'lucide-react'
import { RecommendationBadge } from '@/components/shared'

const bars = [
  { name: 'Problem solving', score: 4.8 },
  { name: 'Code quality', score: 4.5 },
  { name: 'Communication', score: 4.7 },
]

export function ProductPreview() {
  return (
    <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Maya Chen</p>
          <p className="text-xs text-muted-foreground">Senior Frontend Engineer · 57 min</p>
        </div>
        <RecommendationBadge recommendation="Strong Hire" />
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {bars.map((bar) => (
          <li key={bar.name} className="flex items-center gap-3 text-xs">
            <span className="w-28 shrink-0 text-muted-foreground">{bar.name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-brand" style={{ width: `${(bar.score / 5) * 100}%` }} />
            </span>
            <span className="w-7 text-right font-mono tabular-nums">{bar.score.toFixed(1)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-3 rounded-lg bg-muted/60 p-3 text-xs">
        <Quote className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <p className="text-pretty">
          <span className="font-mono text-muted-foreground">19:03</span>{' '}
          {'“Wait — last is a reference into sorted. I’m mutating input.”'}
          <span className="mt-1 flex items-center gap-1 text-success">
            <CheckCircle2 className="size-3" aria-hidden="true" /> Self-diagnosed aliasing bug
          </span>
        </p>
      </div>
    </div>
  )
}
