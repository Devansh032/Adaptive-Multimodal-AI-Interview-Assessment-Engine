'use client'

import { useState } from 'react'
import { CheckCircle2, Code2, Layers, Lightbulb, MessagesSquare, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pill } from '@/components/shared'
import { cn } from '@/lib/utils'
import type { InterviewType } from '@/lib/mock-data'

const durations = [
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '60 minutes' },
  { value: '90', label: '90 minutes' },
]

const difficulties = [
  { value: 'Junior', hint: 'Fundamentals' },
  { value: 'Mid', hint: 'Applied' },
  { value: 'Senior', hint: 'Trade-offs' },
  { value: 'Staff', hint: 'Ambiguity' },
] as const

const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Java', 'Rust', 'C++', 'Ruby']

const interviewTypes: { value: InterviewType; icon: LucideIcon; description: string }[] = [
  { value: 'Coding', icon: Code2, description: 'Live problem in the editor with tests' },
  { value: 'Conceptual', icon: Lightbulb, description: 'Language and framework fundamentals' },
  { value: 'Behavioral', icon: MessagesSquare, description: 'Past experience and collaboration' },
  { value: 'System Design', icon: Layers, description: 'Architecture and scaling trade-offs' },
]

const defaultJd = `We're looking for a Senior Frontend Engineer to own our customer-facing dashboard. You'll work in React and TypeScript, partner closely with design, and lead performance work across the app.

Must have: 5+ years building production web apps, deep React knowledge, strong testing habits.
Nice to have: experience with design systems, WebSockets, or data visualization.`

export function ConfigureForm() {
  const [role, setRole] = useState('Senior Frontend Engineer')
  const [jd, setJd] = useState(defaultJd)
  const [duration, setDuration] = useState('60')
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]['value']>('Senior')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['TypeScript', 'JavaScript'])
  const [types, setTypes] = useState<InterviewType[]>(['Coding', 'Conceptual', 'Behavioral'])
  const [saved, setSaved] = useState(false)

  function toggle<T>(list: T[], value: T) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  const valid = role.trim() && selectedLanguages.length > 0 && types.length > 0
  const minutesPerSection = types.length ? Math.round(Number(duration) / types.length) : 0

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]" onChange={() => setSaved(false)}>
      <div className="flex flex-col gap-8">
        <FormSection title="Role" description="What position is this interview for?">
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role title</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} required className="h-9" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="jd">Job description</Label>
            <Textarea id="jd" value={jd} onChange={(e) => setJd(e.target.value)} rows={7} className="leading-relaxed" />
            <p className="text-xs text-muted-foreground">
              Used to generate relevant questions and weight competencies. {jd.length} characters.
            </p>
          </div>
        </FormSection>

        <FormSection title="Format" description="Duration and expected seniority.">
          <div className="flex flex-col gap-2 sm:max-w-xs">
            <Label htmlFor="duration">Interview duration</Label>
            <Select
              items={durations}
              value={duration}
              onValueChange={(value) => {
                if (value) setDuration(value as string)
                setSaved(false)
              }}
            >
              <SelectTrigger id="duration" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Difficulty level</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {difficulties.map((d) => (
                <label
                  key={d.value}
                  className={cn(
                    'flex cursor-pointer flex-col gap-0.5 rounded-lg border p-3 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ring',
                    difficulty === d.value ? 'border-brand bg-brand/5' : 'hover:bg-muted/50',
                  )}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={d.value}
                    checked={difficulty === d.value}
                    onChange={() => setDifficulty(d.value)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{d.value}</span>
                  <span className="text-xs text-muted-foreground">{d.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </FormSection>

        <FormSection title="Languages" description="Candidates choose from these in the editor.">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Coding languages</legend>
            {languages.map((lang) => {
              const checked = selectedLanguages.includes(lang)
              return (
                <label
                  key={lang}
                  className={cn(
                    'cursor-pointer rounded-full border px-3 py-1 text-sm transition-colors has-focus-visible:ring-2 has-focus-visible:ring-ring',
                    checked ? 'border-foreground bg-foreground text-background' : 'hover:bg-muted',
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => setSelectedLanguages((l) => toggle(l, lang))}
                  />
                  {lang}
                </label>
              )
            })}
          </fieldset>
        </FormSection>

        <FormSection title="Interview type" description="Select every section the AI should cover.">
          <fieldset className="grid gap-2 sm:grid-cols-2">
            <legend className="sr-only">Interview types</legend>
            {interviewTypes.map(({ value, icon: Icon, description }) => {
              const checked = types.includes(value)
              return (
                <label
                  key={value}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors',
                    checked ? 'border-brand bg-brand/5' : 'hover:bg-muted/50',
                  )}
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => {
                      setTypes((t) => toggle(t, value))
                      setSaved(false)
                    }}
                    className="mt-0.5"
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </span>
                </label>
              )
            })}
          </fieldset>
        </FormSection>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="flex flex-col gap-5 rounded-xl border bg-card p-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Summary</span>
            <span className="font-medium text-pretty">{role || 'Untitled role'}</span>
          </div>
          <dl className="flex flex-col gap-2.5 text-sm">
            <SummaryRow label="Duration" value={`${duration} min`} />
            <SummaryRow label="Difficulty" value={difficulty} />
            <SummaryRow label="Languages" value={selectedLanguages.length ? `${selectedLanguages.length} selected` : 'None'} />
            <SummaryRow label="Per section" value={minutesPerSection ? `~${minutesPerSection} min` : '—'} />
          </dl>
          <div className="flex flex-wrap gap-1.5">
            {types.map((t) => (
              <Pill key={t} tone="brand">
                {t}
              </Pill>
            ))}
          </div>
          <Button type="submit" size="lg" className="h-9" disabled={!valid}>
            Create interview
          </Button>
          {saved && (
            <p className="flex items-center gap-2 text-sm text-success" role="status">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Interview created. Invite link copied.
            </p>
          )}
          {!valid && (
            <p className="text-xs text-destructive">Add a role, at least one language and one interview type.</p>
          )}
        </div>
      </aside>
    </form>
  )
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 border-b pb-8 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <p className="text-xs text-pretty text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
