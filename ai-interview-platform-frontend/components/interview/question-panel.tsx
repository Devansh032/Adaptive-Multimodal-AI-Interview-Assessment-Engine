import { CameraOff } from 'lucide-react'
import { Pill } from '@/components/shared'
import { cn } from '@/lib/utils'

export function QuestionPanel({ cameraOn, className }: { cameraOn: boolean; className?: string }) {
  return (
    <section
      aria-labelledby="question-title"
      className={cn('flex flex-col overflow-hidden rounded-xl border bg-card', className)}
    >
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">Question 2 of 4</span>
        <div className="flex gap-1.5">
          <Pill tone="warning">Medium</Pill>
          <Pill>Arrays · Sorting</Pill>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <h2 id="question-title" className="text-lg font-semibold tracking-tight">
          Merge overlapping intervals
        </h2>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          Given an array of <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">intervals</code>{' '}
          where each interval is <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-foreground">[start, end]</code>,
          merge all overlapping intervals and return an array of non-overlapping intervals sorted by start. Touching
          intervals count as overlapping. Do not mutate the input.
        </p>
        <div className="rounded-lg bg-muted/60 p-3 font-mono text-xs leading-relaxed">
          <p>
            <span className="text-muted-foreground">Input: </span>[[1,3],[2,6],[8,10],[15,18]]
          </p>
          <p>
            <span className="text-muted-foreground">Output: </span>[[1,6],[8,10],[15,18]]
          </p>
        </div>
        <ul className="flex flex-col gap-1 text-xs text-muted-foreground">
          <li>{'• 0 ≤ intervals.length ≤ 100,000'}</li>
          <li>{'• start ≤ end for every interval'}</li>
        </ul>

        <div className="relative mt-auto hidden aspect-video w-40 shrink-0 self-end overflow-hidden rounded-lg bg-editor lg:block">
          {cameraOn ? (
            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.02_270),oklch(0.18_0.008_270))]">
              <span className="grid size-10 place-items-center rounded-full bg-white/10 text-sm text-white/80">AR</span>
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/50">
              <CameraOff className="size-4" aria-hidden="true" />
              <span className="sr-only">Camera off</span>
            </div>
          )}
          <span className="absolute bottom-1 left-1.5 text-[10px] text-white/80">You</span>
        </div>
      </div>
    </section>
  )
}
