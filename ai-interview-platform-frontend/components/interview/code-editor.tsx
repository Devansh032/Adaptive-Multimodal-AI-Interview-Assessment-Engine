import { FileCode2, X } from 'lucide-react'
import { solutionCode } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TOKEN_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(export|function|const|let|return|if|else|for|of|new)\b|\b(number|string|boolean|void)\b|\b(\d+)\b|([A-Za-z_]\w*)(?=\()/g

const TOKEN_CLASSES = [
  'text-[oklch(0.6_0.02_270)] italic',
  'text-[oklch(0.8_0.12_150)]',
  'text-[oklch(0.72_0.16_310)]',
  'text-[oklch(0.8_0.1_200)]',
  'text-[oklch(0.8_0.13_60)]',
  'text-[oklch(0.8_0.12_250)]',
]

function highlight(line: string) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of line.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0
    if (index > last) parts.push(line.slice(last, index))
    const group = match.slice(1).findIndex((g) => g !== undefined)
    parts.push(
      <span key={index} className={TOKEN_CLASSES[group]}>
        {match[0]}
      </span>,
    )
    last = index + match[0].length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

const CURSOR_LINE = 12

export function CodeEditor({ className }: { className?: string }) {
  const lines = solutionCode.split('\n')

  return (
    <section
      aria-label="Code editor"
      className={cn('flex flex-col overflow-hidden rounded-xl border border-black/20 bg-editor text-editor-foreground', className)}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20">
        <div className="flex text-xs" role="tablist" aria-label="Open files">
          <div
            role="tab"
            aria-selected="true"
            className="flex items-center gap-2 border-t-2 border-t-brand bg-editor px-3 py-2 text-white"
          >
            <FileCode2 className="size-3.5 text-[oklch(0.7_0.12_240)]" aria-hidden="true" />
            solution.ts
            <X className="size-3 text-white/40" aria-hidden="true" />
          </div>
          <div role="tab" aria-selected="false" className="flex items-center gap-2 px-3 py-2 text-white/50">
            <FileCode2 className="size-3.5" aria-hidden="true" />
            solution.test.ts
          </div>
        </div>
        <span className="px-3 text-[11px] text-white/40">TypeScript 5.7</span>
      </div>

      <div className="flex-1 overflow-auto py-3 font-mono text-[13px] leading-6">
        <pre>
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={cn('flex pr-4', i + 1 === CURSOR_LINE && 'bg-white/[0.04]')}
              >
                <span className="w-12 shrink-0 pr-4 text-right text-white/25 select-none">{i + 1}</span>
                <span className="whitespace-pre">
                  {highlight(line)}
                  {i + 1 === CURSOR_LINE && (
                    <span
                      aria-hidden="true"
                      className="ml-px inline-block h-4 w-0.5 translate-y-0.5 bg-white [animation:caret-blink_1s_infinite]"
                    />
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-brand/90 px-3 py-1 text-[11px] text-white">
        <span>main · autosaved</span>
        <span className="flex gap-4">
          <span>Ln {CURSOR_LINE}, Col 40</span>
          <span className="hidden sm:inline">Spaces: 2</span>
          <span>UTF-8</span>
        </span>
      </div>
    </section>
  )
}
