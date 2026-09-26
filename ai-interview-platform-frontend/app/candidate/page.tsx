import type { Metadata } from 'next'
import { candidateProfile, completedInterviews, upcomingInterviews } from '@/lib/mock-data'
import { UpcomingInterviewCard } from '@/components/candidate/upcoming-interview-card'
import { CompletedInterviewList } from '@/components/candidate/completed-interview-list'

export const metadata: Metadata = { title: 'Your interviews' }

export default function CandidateDashboardPage() {
  const firstName = candidateProfile.name.split(' ')[0]

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Good afternoon, {firstName}</h1>
        <p className="text-sm text-muted-foreground">
          You have {upcomingInterviews.length} upcoming interviews. Your next one starts soon.
        </p>
      </div>

      <section aria-labelledby="upcoming-heading" className="flex flex-col gap-4">
        <h2 id="upcoming-heading" className="text-sm font-medium text-muted-foreground">
          Upcoming
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingInterviews.map((interview, index) => (
            <UpcomingInterviewCard key={interview.id} interview={interview} featured={index === 0} />
          ))}
        </div>
      </section>

      <section aria-labelledby="completed-heading" className="flex flex-col gap-4">
        <h2 id="completed-heading" className="text-sm font-medium text-muted-foreground">
          Completed
        </h2>
        <CompletedInterviewList interviews={completedInterviews} />
      </section>
    </main>
  )
}
