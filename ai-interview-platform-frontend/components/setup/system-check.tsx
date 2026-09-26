'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Circle,
  Loader2,
  Mic,
  RotateCw,
  Wifi,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CheckStatus = 'pending' | 'checking' | 'passed' | 'failed'
type CheckId = 'camera' | 'microphone' | 'network'

type CheckDefinition = {
  id: CheckId
  label: string
  icon: LucideIcon
  passedDetail: string
  failedDetail?: string
}

const checks: CheckDefinition[] = [
  { id: 'camera', label: 'Camera', icon: Camera, passedDetail: 'FaceTime HD Camera · 1280×720' },
  {
    id: 'microphone',
    label: 'Microphone',
    icon: Mic,
    passedDetail: 'MacBook Pro Microphone · good input level',
    failedDetail: "No input detected. Make sure your mic isn't muted, then retry.",
  },
  { id: 'network', label: 'Network', icon: Wifi, passedDetail: '42 ms latency · 86 Mbps down' },
]

const initialStatus: Record<CheckId, CheckStatus> = { camera: 'pending', microphone: 'pending', network: 'pending' }

export function SystemCheck() {
  const [status, setStatus] = useState(initialStatus)
  const [agreed, setAgreed] = useState(false)
  const attempts = useRef<Record<CheckId, number>>({ camera: 0, microphone: 0, network: 0 })
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const runCheck = useCallback((id: CheckId, delay = 0) => {
    timers.current.push(
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, [id]: 'checking' }))
        timers.current.push(
          setTimeout(() => {
            attempts.current[id] += 1
            const fails = id === 'microphone' && attempts.current[id] === 1
            setStatus((prev) => ({ ...prev, [id]: fails ? 'failed' : 'passed' }))
          }, 1400),
        )
      }, delay),
    )
  }, [])

  useEffect(() => {
    const pending = timers.current
    checks.forEach((check, index) => runCheck(check.id, index * 1600 + 400))
    return () => pending.forEach(clearTimeout)
  }, [runCheck])

  const allPassed = checks.every((c) => status[c.id] === 'passed')
  const ready = allPassed && agreed

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
      <div className="relative aspect-video overflow-hidden rounded-xl border bg-editor">
        {status.camera === 'passed' ? (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_center,oklch(0.32_0.02_270),oklch(0.18_0.008_270))]">
            <span className="grid size-20 place-items-center rounded-full bg-white/10 text-2xl font-medium text-white/80">
              AR
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-sm text-white/50">
            <span className="flex items-center gap-2">
              <Camera className="size-4" aria-hidden="true" />
              {status.camera === 'checking' ? 'Starting camera…' : 'Camera preview'}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white backdrop-blur">
          <MicLevel active={status.microphone === 'passed'} />
          Alex Rivera
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ul className="divide-y rounded-xl border bg-card" aria-live="polite">
          {checks.map((check) => (
            <CheckRow
              key={check.id}
              check={check}
              status={status[check.id]}
              onRetry={() => runCheck(check.id)}
            />
          ))}
        </ul>

        <label className="flex items-start gap-2.5 rounded-lg border bg-muted/40 p-3 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 size-4 accent-[var(--brand)]"
          />
          <span className="text-pretty text-muted-foreground">
            I understand this interview is recorded and conducted by an AI interviewer. My responses will be shared with
            Northwind Labs.
          </span>
        </label>

        {ready ? (
          <Link href="/interview" className={cn(buttonVariants({ size: 'lg' }), 'h-10')}>
            Start interview
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        ) : (
          <Button size="lg" className="h-10" disabled>
            {allPassed ? 'Accept to continue' : 'Waiting for checks…'}
          </Button>
        )}
      </div>
    </div>
  )
}

function CheckRow({
  check,
  status,
  onRetry,
}: {
  check: CheckDefinition
  status: CheckStatus
  onRetry: () => void
}) {
  const Icon = check.icon
  const detail =
    status === 'passed'
      ? check.passedDetail
      : status === 'failed'
        ? check.failedDetail
        : status === 'checking'
          ? 'Checking…'
          : 'Waiting'

  return (
    <li className="flex items-center gap-3 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium">{check.label}</span>
        <span className={cn('text-xs text-pretty', status === 'failed' ? 'text-destructive' : 'text-muted-foreground')}>
          {detail}
        </span>
      </div>
      {status === 'failed' ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCw data-icon="inline-start" aria-hidden="true" />
          Retry
        </Button>
      ) : (
        <StatusIcon status={status} />
      )}
    </li>
  )
}

function StatusIcon({ status }: { status: CheckStatus }) {
  const label = { pending: 'Pending', checking: 'Checking', passed: 'Passed', failed: 'Failed' }[status]
  return (
    <span className="shrink-0" title={label}>
      <span className="sr-only">{label}</span>
      {status === 'pending' && <Circle className="size-5 text-border" aria-hidden="true" />}
      {status === 'checking' && <Loader2 className="size-5 animate-spin text-brand" aria-hidden="true" />}
      {status === 'passed' && <CheckCircle2 className="size-5 text-success" aria-hidden="true" />}
      {status === 'failed' && <XCircle className="size-5 text-destructive" aria-hidden="true" />}
    </span>
  )
}

function MicLevel({ active }: { active: boolean }) {
  return (
    <span className="flex h-3 items-end gap-0.5" aria-hidden="true">
      {[0.4, 0.9, 0.6].map((h, i) => (
        <span
          key={i}
          className={cn('w-0.5 rounded-full', active ? 'animate-pulse bg-success' : 'bg-white/40')}
          style={{ height: `${active ? h * 100 : 30}%`, animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}
