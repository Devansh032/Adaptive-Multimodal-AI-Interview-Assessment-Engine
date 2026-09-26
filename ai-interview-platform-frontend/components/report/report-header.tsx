import { Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Initials, Pill, RecommendationBadge } from '@/components/shared'
import type { CandidateReport, RecruiterCandidate } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function ReportHeader({ candidate, report }: { candidate: RecruiterCandidate; report: CandidateReport }) {
  const positive = report.recommendation.includes('Hire') && !report.recommendation.includes('No')
  const pct = (report.overallScore / 5) * 100

  return (
    <section className="grid gap-6 rounded-xl border bg-card p-5 md:grid-cols-[1fr_auto] md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Initials name={candidate.name} className="size-11 text-sm" />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight">{candidate.name}</h1>
            <p className="text-sm text-muted-foreground">
              {report.role} · {candidate.email}
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-pretty">{report.headline}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill>{report.interviewedOn}</Pill>
          <Pill>{report.durationMinutes} min</Pill>
          <Pill>{report.language}</Pill>
          {report.interviewTypes.map((t) => (
            <Pill key={t} tone="brand">
              {t}
            </Pill>
          ))}
          <Pill tone={report.testsPassed === report.testsTotal ? 'success' : 'warning'}>
            {report.testsPassed}/{report.testsTotal} tests passed
          </Pill>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:items-end">
        <div className="flex items-center gap-4 md:flex-row-reverse">
          <div
            className="relative grid size-24 shrink-0 place-items-center rounded-full"
            style={{
              background: `conic-gradient(var(--${positive ? 'success' : 'destructive'}) ${pct}%, var(--muted) 0)`,
            }}
            role="img"
            aria-label={`Overall score ${report.overallScore} out of 5`}
          >
            <div className="grid size-20 place-items-center rounded-full bg-card">
              <span className="flex flex-col items-center leading-none">
                <span className="text-2xl font-semibold tabular-nums">{report.overallScore.toFixed(1)}</span>
                <span className="text-[11px] text-muted-foreground">/ 5.0</span>
              </span>
            </div>
          </div>
          <div className={cn('flex flex-col gap-1.5 md:items-end')}>
            <span className="text-xs text-muted-foreground">Recommendation</span>
            <RecommendationBadge recommendation={report.recommendation} size="lg" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 data-icon="inline-start" aria-hidden="true" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download data-icon="inline-start" aria-hidden="true" />
            Export PDF
          </Button>
        </div>
      </div>
    </section>
  )
}
