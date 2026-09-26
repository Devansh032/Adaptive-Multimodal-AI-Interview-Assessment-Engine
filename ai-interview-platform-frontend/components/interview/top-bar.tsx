'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Camera, CameraOff, Mic, MicOff, PhoneOff, Sparkles } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const sections = ['Warm-up', 'Coding', 'Conceptual', 'Wrap-up']
const currentSection = 1
const START_SECONDS = 18 * 60 + 42
const TOTAL_SECONDS = 60 * 60

function formatTime(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function InterviewTopBar({
  micOn,
  cameraOn,
  onToggleMic,
  onToggleCamera,
}: {
  micOn: boolean
  cameraOn: boolean
  onToggleMic: () => void
  onToggleCamera: () => void
}) {
  const [elapsed, setElapsed] = useState(START_SECONDS)

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b bg-background px-4 py-2.5">
      <div className="flex items-center gap-3">
        <span className="relative grid size-9 place-items-center rounded-full bg-brand text-brand-foreground">
          <Sparkles className="size-4" aria-hidden="true" />
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-success" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">Ava · AI Interviewer</span>
          <span className="text-xs text-muted-foreground">Northwind Labs · Senior Frontend Engineer</span>
        </div>
      </div>

      <div className="order-last flex w-full items-center gap-4 md:order-none md:w-auto md:flex-1 md:justify-center">
        <ol className="flex flex-1 items-center gap-1.5 md:max-w-md" aria-label="Interview progress">
          {sections.map((section, i) => (
            <li key={section} className="flex flex-1 flex-col gap-1.5">
              <span
                className={cn(
                  'h-1 rounded-full',
                  i < currentSection ? 'bg-foreground' : i === currentSection ? 'bg-brand' : 'bg-border',
                )}
              />
              <span
                className={cn(
                  'text-[11px]',
                  i === currentSection ? 'font-medium text-foreground' : 'text-muted-foreground',
                )}
                aria-current={i === currentSection ? 'step' : undefined}
              >
                {section}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="mr-2 flex items-center gap-2 font-mono text-sm tabular-nums">
          <span className="size-2 animate-pulse rounded-full bg-destructive" aria-hidden="true" />
          <span aria-label="Elapsed time">{formatTime(elapsed)}</span>
          <span className="text-muted-foreground">/ {formatTime(TOTAL_SECONDS)}</span>
        </div>
        <Button
          variant={micOn ? 'outline' : 'destructive'}
          size="icon"
          onClick={onToggleMic}
          aria-pressed={!micOn}
          aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
        >
          {micOn ? <Mic /> : <MicOff />}
        </Button>
        <Button
          variant={cameraOn ? 'outline' : 'destructive'}
          size="icon"
          onClick={onToggleCamera}
          aria-pressed={!cameraOn}
          aria-label={cameraOn ? 'Turn camera off' : 'Turn camera on'}
        >
          {cameraOn ? <Camera /> : <CameraOff />}
        </Button>
        <Link
          href="/candidate"
          className={cn(buttonVariants(), 'bg-destructive text-white hover:bg-destructive/90 [a]:hover:bg-destructive/90')}
        >
          <PhoneOff data-icon="inline-start" aria-hidden="true" />
          End interview
        </Link>
      </div>
    </header>
  )
}
