import { RecruiterSidebar } from '@/components/recruiter/sidebar'

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <RecruiterSidebar />
      <div className="min-w-0 flex-1 bg-background">{children}</div>
    </div>
  )
}
