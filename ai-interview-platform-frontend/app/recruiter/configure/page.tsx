import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ConfigureForm } from '@/components/recruiter/configure-form'

export const metadata: Metadata = { title: 'Configure interview' }

export default function ConfigurePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-3">
        <Link
          href="/recruiter"
          className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Candidates
        </Link>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Configure new interview</h1>
          <p className="text-sm text-muted-foreground">
            The AI interviewer tailors questions to the role and job description you provide.
          </p>
        </div>
      </div>
      <ConfigureForm />
    </main>
  )
}
