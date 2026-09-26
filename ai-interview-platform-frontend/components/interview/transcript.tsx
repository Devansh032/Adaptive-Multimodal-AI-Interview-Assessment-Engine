import { Sparkles } from 'lucide-react'
import { interviewTranscript } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function Transcript({ micOn, className }: { micOn: boolean; className?: string }) {
  return (
    <section aria-label="Transcript" className={cn('flex flex-col overflow-hidden rounded-xl border bg-card', className)}>
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">Transcript</span>
        <span className="text-xs text-muted-foreground">Live · auto-captioned</span>
      </div>
      <ol className="flex flex-1 flex-col gap-4 overflow-y-auto p-4" aria-live="polite">
        {interviewTranscript.map((message) => {
          const isAi = message.speaker === 'ai'
          return (
            <li key={message.id} className={cn('flex gap-2.5', !isAi && 'flex-row-reverse')}>
              {isAi ? (
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                </span>
              ) : (
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-medium">
                  AR
                </span>
              )}
              <div className={cn('flex max-w-[80%] flex-col gap-1', !isAi && 'items-end')}>
                <span className="text-[11px] text-muted-foreground">
                  {isAi ? 'Ava' : 'You'} · {message.time}
                </span>
                <p
                  className={cn(
                    'rounded-2xl px-3.5 py-2 text-sm leading-relaxed text-pretty',
                    isAi ? 'rounded-tl-sm bg-muted' : 'rounded-tr-sm bg-primary text-primary-foreground',
                  )}
                >
                  {message.text}
                </p>
              </div>
            </li>
          )
        })}
        <li className="flex flex-row-reverse gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-medium">AR</span>
          <div className="flex items-center gap-2 rounded-2xl rounded-tr-sm border border-dashed px-3.5 py-2 text-sm text-muted-foreground">
            {micOn ? (
              <>
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </span>
                Listening…
              </>
            ) : (
              'Microphone muted'
            )}
          </div>
        </li>
      </ol>
    </section>
  )
}
