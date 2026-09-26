import { CandidateHeader } from '@/components/candidate/candidate-header'

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <CandidateHeader />
      {children}
    </div>
  )
}
