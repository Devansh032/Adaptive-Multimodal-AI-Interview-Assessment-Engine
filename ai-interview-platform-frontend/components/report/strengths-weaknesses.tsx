import { Minus, Plus } from 'lucide-react'

export function StrengthsWeaknesses({ strengths, weaknesses }: { strengths: string[]; weaknesses: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      <InsightList title="Strengths" items={strengths} tone="positive" />
      <InsightList title="Areas of concern" items={weaknesses} tone="negative" />
    </div>
  )
}

function InsightList({ title, items, tone }: { title: string; items: string[]; tone: 'positive' | 'negative' }) {
  const Icon = tone === 'positive' ? Plus : Minus
  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-card p-5">
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <span
          className={
            tone === 'positive'
              ? 'grid size-5 place-items-center rounded bg-success/15 text-success'
              : 'grid size-5 place-items-center rounded bg-destructive/10 text-destructive'
          }
        >
          <Icon className="size-3" aria-hidden="true" />
        </span>
        {title}
        <span className="text-xs font-normal text-muted-foreground">{items.length}</span>
      </h2>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-pretty">
            <span
              aria-hidden="true"
              className={`mt-2 size-1.5 shrink-0 rounded-full ${tone === 'positive' ? 'bg-success' : 'bg-destructive'}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
