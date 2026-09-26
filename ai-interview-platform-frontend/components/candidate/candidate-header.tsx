import Link from 'next/link'
import { LifeBuoy } from 'lucide-react'
import { Logo, Initials } from '@/components/shared'
import { candidateProfile } from '@/lib/mock-data'

export function CandidateHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav aria-label="Candidate" className="hidden items-center gap-4 text-sm sm:flex">
            <Link href="/candidate" className="font-medium text-foreground">
              Interviews
            </Link>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Practice
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground sm:flex"
          >
            <LifeBuoy className="size-4" aria-hidden="true" />
            Help
          </a>
          <div className="flex items-center gap-2">
            <Initials name={candidateProfile.name} className="bg-brand/10 text-brand" />
            <span className="sr-only">{candidateProfile.name}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
