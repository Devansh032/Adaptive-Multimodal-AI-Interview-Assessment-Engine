'use client'

import { useState } from 'react'
import { InterviewTopBar } from './top-bar'
import { QuestionPanel } from './question-panel'
import { Transcript } from './transcript'
import { CodeEditor } from './code-editor'
import { TestResults } from './test-results'
import { testCases } from '@/lib/mock-data'

export function InterviewRoom() {
  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [running, setRunning] = useState(false)
  const [runCount, setRunCount] = useState(1)

  function handleRun() {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setRunCount((c) => c + 1)
    }, 1200)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-muted/40 lg:h-dvh lg:overflow-hidden">
      <InterviewTopBar
        micOn={micOn}
        cameraOn={cameraOn}
        onToggleMic={() => setMicOn((v) => !v)}
        onToggleCamera={() => setCameraOn((v) => !v)}
      />
      <main className="grid flex-1 gap-3 p-3 lg:min-h-0 lg:grid-cols-5 lg:grid-rows-[minmax(0,5fr)_minmax(0,6fr)]">
        <QuestionPanel cameraOn={cameraOn} className="lg:col-span-2" />
        <Transcript micOn={micOn} className="min-h-80 lg:col-span-3 lg:min-h-0" />
        <CodeEditor className="min-h-96 lg:col-span-3 lg:min-h-0" />
        <TestResults
          tests={testCases}
          running={running}
          runCount={runCount}
          onRun={handleRun}
          className="lg:col-span-2 lg:min-h-0"
        />
      </main>
    </div>
  )
}
