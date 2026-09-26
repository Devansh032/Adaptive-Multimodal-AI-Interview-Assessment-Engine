import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Recommendation } from '@/lib/mock-data'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 font-semibold tracking-tight', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'grid size-6 place-items-center rounded-md text-[11px] font-bold',
          inverted ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'bg-primary text-primary-foreground',
        )}
      >
        {'</>'}
      </span>
      <span>Intervue</span>
    </Link>
  )
}

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground ring-border',
  brand: 'bg-brand/10 text-brand ring-brand/20',
  success: 'bg-success/10 text-success ring-success/25',
  warning: 'bg-warning/15 text-[oklch(0.5_0.12_60)] ring-warning/30',
  danger: 'bg-destructive/10 text-destructive ring-destructive/20',
}

export function Pill({
  tone = 'neutral',
  dot = false,
  className,
  children,
}: {
  tone?: Tone
  dot?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
        toneClasses[tone],
        className,
      )}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

const recommendationTone: Record<Recommendation, string> = {
  'Strong Hire': 'bg-success text-white ring-success',
  Hire: 'bg-success/10 text-success ring-success/30',
  'No Hire': 'bg-destructive/10 text-destructive ring-destructive/25',
  'Strong No Hire': 'bg-destructive text-white ring-destructive',
}

export function RecommendationBadge({
  recommendation,
  size = 'sm',
}: {
  recommendation: Recommendation
  size?: 'sm' | 'lg'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap ring-1 ring-inset',
        size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs',
        recommendationTone[recommendation],
      )}
    >
      {recommendation}
    </span>
  )
}

export function Initials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium text-foreground',
        className,
      )}
    >
      {initials}
    </span>
  )
}
