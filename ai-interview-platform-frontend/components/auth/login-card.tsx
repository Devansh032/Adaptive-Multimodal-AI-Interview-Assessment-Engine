'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Role = 'candidate' | 'recruiter'

const roles: { value: Role; label: string; icon: typeof UserRound; hint: string }[] = [
  { value: 'candidate', label: 'Candidate', icon: UserRound, hint: 'Join your scheduled interviews' },
  { value: 'recruiter', label: 'Recruiter', icon: Briefcase, hint: 'Configure interviews and review reports' },
]

export function LoginCard() {
  const router = useRouter()
  const [role, setRole] = useState<Role>('candidate')
  const [submitting, setSubmitting] = useState(false)
  const active = roles.find((r) => r.value === role)!

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    router.push(role === 'candidate' ? '/candidate' : '/recruiter')
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">{active.hint}</p>
      </div>

      <div role="radiogroup" aria-label="Sign in as" className="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
        {roles.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={role === value}
            onClick={() => setRole(value)}
            className={cn(
              'flex items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
              role === value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{role === 'candidate' ? 'Email' : 'Work email'}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={role === 'candidate' ? 'alex.rivera@hey.com' : 'sam@northwindlabs.com'}
            key={role}
            className="h-9"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            defaultValue="demo-password"
            className="h-9"
          />
        </div>
        <Button type="submit" size="lg" className="mt-2 h-9" disabled={submitting}>
          {submitting ? 'Signing in…' : `Continue as ${active.label.toLowerCase()}`}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {role === 'candidate'
          ? 'Received an invite link? Use the same email to sign in.'
          : 'New to Intervue? Start a 14-day trial — no card required.'}
      </p>
    </div>
  )
}
