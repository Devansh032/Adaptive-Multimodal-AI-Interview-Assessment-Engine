import { CheckCircle2, Loader2, Play, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { TestCase } from '@/lib/mock-data'

export function TestResults({
  tests,
  running,
  runCount,
  onRun,
  className,
}: {
  tests: TestCase[]
  running: boolean
  runCount: number
  onRun: () => void
  className?: string
}) {
  const passed = tests.filter((t) => t.passed).length
  const allPassed = passed === tests.length

  return (
    <section aria-label="Test results" className={cn('flex flex-col overflow-hidden rounded-xl border bg-card', className)}>
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-muted-foreground">Test results</span>
          {!running && (
            <span className={cn('font-medium', allPassed ? 'text-success' : 'text-destructive')}>
              {passed}/{tests.length} passed
            </span>
          )}
        </div>
        <Button size="sm" onClick={onRun} disabled={running}>
          {running ? (
            <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
          ) : (
            <Play data-icon="inline-start" aria-hidden="true" />
          )}
          {running ? 'Running…' : 'Run code'}
        </Button>
      </div>

      <div className="h-1 bg-muted" aria-hidden="true">
        <div
          className={cn('h-full transition-all', running ? 'w-full animate-pulse bg-brand/50' : 'bg-success')}
          style={running ? undefined : { width: `${(passed / tests.length) * 100}%` }}
        />
      </div>

      <ul className="flex-1 divide-y overflow-y-auto" aria-busy={running}>
        {tests.map((test) => (
          <li key={`${test.id}-${runCount}`} className={cn('px-4 py-2.5', !test.passed && !running && 'bg-destructive/5')}>
            <div className="flex items-center gap-2.5">
              {running ? (
                <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
              ) : test.passed ? (
                <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
              ) : (
                <XCircle className="size-4 shrink-0 text-destructive" aria-hidden="true" />
              )}
              <span className="sr-only">{running ? 'Running' : test.passed ? 'Passed' : 'Failed'}:</span>
              <span className="flex-1 truncate text-sm">{test.name}</span>
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{test.durationMs}ms</span>
            </div>
            {!test.passed && !running && (
              <div className="mt-2 ml-6.5 flex flex-col gap-0.5 rounded-md bg-editor p-2 font-mono text-[11px] text-editor-foreground">
                <span>
                  <span className="text-success">expected </span>
                  {test.expected}
                </span>
                <span>
                  <span className="text-[oklch(0.7_0.18_25)]">received </span>
                  {test.received}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="border-t px-4 py-2 text-[11px] text-muted-foreground">
        Run #{runCount} · Node 22 · {running ? 'executing…' : 'finished in 91ms'}
      </p>
    </section>
  )
}
