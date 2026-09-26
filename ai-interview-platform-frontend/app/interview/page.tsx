import type { Metadata } from 'next'
import { InterviewRoom } from '@/components/interview/interview-room'

export const metadata: Metadata = { title: 'Interview room' }

export default function InterviewPage() {
  return <InterviewRoom />
}
