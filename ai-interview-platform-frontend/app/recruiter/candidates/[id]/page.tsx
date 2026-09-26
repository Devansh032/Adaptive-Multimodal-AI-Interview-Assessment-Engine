import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { candidateReports, recruiterCandidates } from '@/lib/mock-data'
import { ReportHeader } from '@/components/report/report-header'
import { CompetencyScores } from '@/components/report/competency-scores'
import { StrengthsWeaknesses } from '@/components/report/strengths-weaknesses'
import { EvidenceTimeline } from '@/components/report/evidence-timeline'

export function generateStaticParams() {
  return Object.keys(candidateReports).map((id) => ({ id }))
}

export async function generateMetadata({ params }: PageProps<'/recruiter/candidates/[id]'>): Promise<Metadata> {
  const { id } = await params
  const candidate = recruiterCandidates.find((c) => c.id === id)
  return { title: candidate ? `${candidate.name} · Report` : 'Report' }
}

export default async function CandidateReportPage({ params }: PageProps<'/recruiter/candidates/[id]'>) {
  const { id } = await params
  const report = candidateReports[id]
  const candidate = recruiterCandidates.find((c) => c.id === id)
  if (!report || !candidate) notFound()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8">
      <Link
        href="/recruiter"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Candidates
      </Link>
      <ReportHeader candidate={candidate} report={report} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <CompetencyScores competencies={report.competencies} />
        <StrengthsWeaknesses strengths={report.strengths} weaknesses={report.weaknesses} />
      </div>
      <EvidenceTimeline evidence={report.evidence} />
    </main>
  )
}
