'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, LogOut, PlusSquare, Users } from 'lucide-react'
import { Logo } from '@/components/shared'
import { cn } from '@/lib/utils'
import { recruiterCandidates } from '@/lib/mock-data'

const nav = [
  { href: '/recruiter', label: 'Candidates', icon: Users },
  { href: '/recruiter/configure', label: 'New interview', icon: PlusSquare },
]

const recentReports = recruiterCandidates.filter((c) => c.recommendation).slice(0, 4)

export function RecruiterSidebar() {
  const pathname = usePathname()

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-14 items-center px-4">
          <Logo inverted />
        </div>

        <div className="mx-3 mb-4 flex items-center gap-2 rounded-lg border border-sidebar-border px-2.5 py-2">
          <span className="grid size-6 place-items-center rounded bg-[oklch(0.7_0.14_155)] text-[11px] font-bold text-black">
            N
          </span>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">Northwind Labs</span>
            <span className="text-[11px] text-sidebar-foreground/50">Growth plan</span>
          </div>
        </div>

        <nav aria-label="Recruiter" className="flex flex-col gap-0.5 px-3">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === '/recruiter' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-0.5 px-3">
          <span className="px-2.5 pb-1 text-[11px] font-medium tracking-wide text-sidebar-foreground/40 uppercase">
            Recent reports
          </span>
          {recentReports.map((c) => {
            const href = `/recruiter/candidates/${c.id}`
            return (
              <Link
                key={c.id}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2.5 truncate rounded-md px-2.5 py-1.5 text-sm transition-colors',
                  pathname === href
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/65 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 shrink-0 rounded-full',
                    c.recommendation?.includes('No') ? 'bg-destructive' : 'bg-success',
                  )}
                />
                {c.name}
              </Link>
            )
          })}
        </div>

        <div className="mt-auto flex items-center gap-2.5 border-t border-sidebar-border p-3">
          <span className="grid size-7 place-items-center rounded-full bg-sidebar-accent text-[11px] font-medium">SP</span>
          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-sm">Sam Patel</span>
            <span className="truncate text-[11px] text-sidebar-foreground/50">Head of Engineering</span>
          </div>
          <Link
            href="/"
            aria-label="Sign out"
            className="rounded-md p-1.5 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <header className="flex items-center justify-between gap-4 bg-sidebar px-4 py-3 text-sidebar-foreground md:hidden">
        <Logo inverted />
        <nav aria-label="Recruiter mobile" className="flex gap-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === '/recruiter' ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs',
                  active ? 'bg-sidebar-accent' : 'text-sidebar-foreground/65',
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>
      </header>
    </>
  )
}
