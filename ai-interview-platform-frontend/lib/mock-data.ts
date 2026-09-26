export type InterviewType = 'Coding' | 'Conceptual' | 'Behavioral' | 'System Design'

export type Recommendation = 'Strong Hire' | 'Hire' | 'No Hire' | 'Strong No Hire'

export type UpcomingInterview = {
  id: string
  company: string
  role: string
  date: string
  time: string
  durationMinutes: number
  types: InterviewType[]
  language: string
  startsIn?: string
}

export type CompletedInterview = {
  id: string
  company: string
  role: string
  completedOn: string
  durationMinutes: number
  status: 'Under review' | 'Advanced' | 'Not selected'
}

export const candidateProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@hey.com',
  initials: 'AR',
}

export const upcomingInterviews: UpcomingInterview[] = [
  {
    id: 'int-4821',
    company: 'Northwind Labs',
    role: 'Senior Frontend Engineer',
    date: 'Today',
    time: '2:30 PM',
    durationMinutes: 60,
    types: ['Coding', 'Conceptual'],
    language: 'TypeScript',
    startsIn: 'Starts in 12 min',
  },
  {
    id: 'int-4830',
    company: 'Halcyon Health',
    role: 'Full-Stack Engineer',
    date: 'Tue, Sep 29',
    time: '10:00 AM',
    durationMinutes: 45,
    types: ['Coding', 'Behavioral'],
    language: 'Python',
  },
  {
    id: 'int-4842',
    company: 'Parallax Robotics',
    role: 'Platform Engineer',
    date: 'Fri, Oct 2',
    time: '4:15 PM',
    durationMinutes: 90,
    types: ['Coding', 'System Design'],
    language: 'Go',
  },
]

export const completedInterviews: CompletedInterview[] = [
  {
    id: 'int-4702',
    company: 'Brightline Finance',
    role: 'Frontend Engineer II',
    completedOn: 'Sep 18, 2026',
    durationMinutes: 58,
    status: 'Advanced',
  },
  {
    id: 'int-4688',
    company: 'Oakmoss Studio',
    role: 'Product Engineer',
    completedOn: 'Sep 12, 2026',
    durationMinutes: 45,
    status: 'Under review',
  },
  {
    id: 'int-4610',
    company: 'Tessellate',
    role: 'Senior UI Engineer',
    completedOn: 'Aug 30, 2026',
    durationMinutes: 60,
    status: 'Not selected',
  },
]

export type CandidateStatus = 'Scheduled' | 'In progress' | 'Completed' | 'Needs review' | 'Expired'

export type RecruiterCandidate = {
  id: string
  name: string
  email: string
  role: string
  status: CandidateStatus
  score?: number
  recommendation?: Recommendation
  competencies?: string[]
  date: string
}

export const recruiterCandidates: RecruiterCandidate[] = [
  {
    id: 'maya-chen',
    name: 'Maya Chen',
    email: 'maya.chen@proton.me',
    role: 'Senior Frontend Engineer',
    status: 'Completed',
    score: 4.6,
    recommendation: 'Strong Hire',
    competencies: ['Problem solving', 'Communication'],
    date: 'Sep 25, 2026',
  },
  {
    id: 'jordan-okafor',
    name: 'Jordan Okafor',
    email: 'jordan@okafor.dev',
    role: 'Backend Engineer',
    status: 'Completed',
    score: 3.8,
    recommendation: 'Hire',
    competencies: ['API design', 'Testing'],
    date: 'Sep 24, 2026',
  },
  {
    id: 'priya-natarajan',
    name: 'Priya Natarajan',
    email: 'priya.n@gmail.com',
    role: 'Senior Frontend Engineer',
    status: 'In progress',
    date: 'Sep 26, 2026',
  },
  {
    id: 'daniel-weiss',
    name: 'Daniel Weiss',
    email: 'dweiss@fastmail.com',
    role: 'Platform Engineer',
    status: 'Completed',
    score: 2.4,
    recommendation: 'No Hire',
    competencies: ['Needs depth: concurrency'],
    date: 'Sep 23, 2026',
  },
  {
    id: 'sofia-marquez',
    name: 'Sofia Márquez',
    email: 'sofia.marquez@outlook.com',
    role: 'Full-Stack Engineer',
    status: 'Needs review',
    score: 3.4,
    competencies: ['Mixed signals'],
    date: 'Sep 22, 2026',
  },
  {
    id: 'ethan-brooks',
    name: 'Ethan Brooks',
    email: 'ethan.brooks@icloud.com',
    role: 'Backend Engineer',
    status: 'Scheduled',
    date: 'Sep 28, 2026',
  },
  {
    id: 'amara-diallo',
    name: 'Amara Diallo',
    email: 'amara@diallo.io',
    role: 'Senior Frontend Engineer',
    status: 'Completed',
    score: 1.7,
    recommendation: 'Strong No Hire',
    competencies: ['Gaps: fundamentals'],
    date: 'Sep 21, 2026',
  },
  {
    id: 'lucas-ferreira',
    name: 'Lucas Ferreira',
    email: 'lucas.f@hey.com',
    role: 'Platform Engineer',
    status: 'Scheduled',
    date: 'Sep 30, 2026',
  },
  {
    id: 'hana-kim',
    name: 'Hana Kim',
    email: 'hana.kim@proton.me',
    role: 'Full-Stack Engineer',
    status: 'Expired',
    date: 'Sep 15, 2026',
  },
]

export const recruiterStats = [
  { label: 'Interviews this month', value: '48', delta: '+12 vs Aug' },
  { label: 'Awaiting review', value: '6', delta: '2 flagged' },
  { label: 'Avg. competency score', value: '3.4', delta: 'out of 5' },
  { label: 'Hours saved', value: '71', delta: 'est. recruiter time' },
]

export type Competency = {
  name: string
  score: number
  summary: string
}

export type EvidenceItem = {
  timestamp: string
  quote: string
  note: string
  signal: 'positive' | 'negative'
}

export type CandidateReport = {
  candidateId: string
  role: string
  interviewedOn: string
  durationMinutes: number
  language: string
  interviewTypes: InterviewType[]
  recommendation: Recommendation
  overallScore: number
  headline: string
  competencies: Competency[]
  strengths: string[]
  weaknesses: string[]
  evidence: EvidenceItem[]
  testsPassed: number
  testsTotal: number
}

export const candidateReports: Record<string, CandidateReport> = {
  'maya-chen': {
    candidateId: 'maya-chen',
    role: 'Senior Frontend Engineer',
    interviewedOn: 'Sep 25, 2026',
    durationMinutes: 57,
    language: 'TypeScript',
    interviewTypes: ['Coding', 'Conceptual', 'Behavioral'],
    recommendation: 'Strong Hire',
    overallScore: 4.6,
    headline:
      'Structured problem solver who reasons out loud, catches her own bugs, and makes pragmatic trade-offs under time pressure.',
    competencies: [
      { name: 'Problem solving', score: 4.8, summary: 'Decomposed the problem before coding; found optimal approach unprompted.' },
      { name: 'Code quality', score: 4.5, summary: 'Readable, typed, idiomatic. Named things well.' },
      { name: 'Testing & debugging', score: 4.4, summary: 'Wrote edge cases first; diagnosed a mutation bug in under a minute.' },
      { name: 'Technical knowledge', score: 4.6, summary: 'Deep understanding of rendering, memoization and the event loop.' },
      { name: 'Communication', score: 4.7, summary: 'Clear narration; asked clarifying questions at the right moments.' },
      { name: 'Collaboration', score: 4.3, summary: 'Receptive to hints and built on them rather than restarting.' },
    ],
    strengths: [
      'Clarified input constraints (sorted? inclusive bounds?) before writing any code.',
      'Identified O(n log n) sort-then-sweep approach and explained why it beats pairwise comparison.',
      'Spotted that her solution mutated the caller’s input and fixed it without being told.',
      'Strong mental model of React reconciliation, including when useMemo is counterproductive.',
    ],
    weaknesses: [
      'Initially skipped the empty-input case; only caught it when the test failed.',
      'Behavioral answers leaned on team outcomes; less detail on her individual decisions.',
      'Spent ~4 minutes over-polishing variable names while time was tight.',
    ],
    evidence: [
      {
        timestamp: '04:12',
        quote: '“Before I start — can intervals touch, like [1,2] and [2,3]? Should those merge?”',
        note: 'Proactively clarified an ambiguous boundary condition.',
        signal: 'positive',
      },
      {
        timestamp: '11:47',
        quote: '“If I sort by start first, I only ever need to compare against the last merged interval.”',
        note: 'Arrived at the optimal approach and articulated the invariant.',
        signal: 'positive',
      },
      {
        timestamp: '19:03',
        quote: '“Wait — last is a reference into sorted, which still points at their arrays. I’m mutating input.”',
        note: 'Self-diagnosed a subtle aliasing bug from a single failing test.',
        signal: 'positive',
      },
      {
        timestamp: '22:30',
        quote: '“Oh, I didn’t handle the empty array.”',
        note: 'Edge case missed until surfaced by the test suite.',
        signal: 'negative',
      },
      {
        timestamp: '41:18',
        quote: '“We shipped the migration in two sprints and it went really well.”',
        note: 'Behavioral answer light on personal ownership; follow-up needed.',
        signal: 'negative',
      },
    ],
    testsPassed: 8,
    testsTotal: 8,
  },
  'jordan-okafor': {
    candidateId: 'jordan-okafor',
    role: 'Backend Engineer',
    interviewedOn: 'Sep 24, 2026',
    durationMinutes: 60,
    language: 'Go',
    interviewTypes: ['Coding', 'System Design'],
    recommendation: 'Hire',
    overallScore: 3.8,
    headline:
      'Solid, methodical engineer with strong API instincts. Slower on the algorithmic portion but excellent on system design.',
    competencies: [
      { name: 'Problem solving', score: 3.5, summary: 'Reached a working solution with one hint.' },
      { name: 'Code quality', score: 4.0, summary: 'Clear error handling and small, focused functions.' },
      { name: 'Testing & debugging', score: 4.2, summary: 'Table-driven tests written without prompting.' },
      { name: 'System design', score: 4.3, summary: 'Thoughtful about idempotency and back-pressure.' },
      { name: 'Communication', score: 3.6, summary: 'Precise, but occasionally went quiet for long stretches.' },
      { name: 'Collaboration', score: 3.4, summary: 'Hesitant to ask for clarification.' },
    ],
    strengths: [
      'Designed a rate limiter with a clear token-bucket model and justified Redis as the backing store.',
      'Wrote table-driven tests covering boundary conditions unprompted.',
      'Considered idempotency keys for retried requests without being asked.',
    ],
    weaknesses: [
      'Needed a hint to move from O(n²) to a sorted sweep.',
      'Long silent periods made his reasoning hard to follow.',
      'Did not discuss observability or alerting in the design round.',
    ],
    evidence: [
      {
        timestamp: '08:55',
        quote: '“I’ll brute force it first and then see where the redundant comparisons are.”',
        note: 'Reasonable strategy, though the optimization needed a hint.',
        signal: 'negative',
      },
      {
        timestamp: '27:40',
        quote: '“Every write carries an idempotency key so a retry never double-charges.”',
        note: 'Strong production instincts in system design.',
        signal: 'positive',
      },
      {
        timestamp: '33:12',
        quote: '“Let me add a case for zero tokens and for a burst exactly at capacity.”',
        note: 'Thorough boundary testing.',
        signal: 'positive',
      },
    ],
    testsPassed: 7,
    testsTotal: 8,
  },
  'daniel-weiss': {
    candidateId: 'daniel-weiss',
    role: 'Platform Engineer',
    interviewedOn: 'Sep 23, 2026',
    durationMinutes: 52,
    language: 'Go',
    interviewTypes: ['Coding', 'Conceptual', 'System Design'],
    recommendation: 'No Hire',
    overallScore: 2.4,
    headline:
      'Confident communicator with good infrastructure vocabulary, but struggled to translate concepts into working code.',
    competencies: [
      { name: 'Problem solving', score: 2.2, summary: 'Jumped into code without a plan; restarted twice.' },
      { name: 'Code quality', score: 2.5, summary: 'Working fragments but inconsistent error handling.' },
      { name: 'Testing & debugging', score: 1.9, summary: 'Relied on print debugging; missed root cause.' },
      { name: 'Technical knowledge', score: 3.0, summary: 'Good breadth on Kubernetes, shallow on concurrency.' },
      { name: 'Communication', score: 3.4, summary: 'Articulate and friendly.' },
      { name: 'Collaboration', score: 2.6, summary: 'Pushed back on hints rather than exploring them.' },
    ],
    strengths: [
      'Explained Kubernetes scheduling and pod disruption budgets clearly.',
      'Friendly, confident communicator who kept the conversation moving.',
    ],
    weaknesses: [
      'Could not explain why his goroutines produced a data race.',
      'Did not reach a passing solution for the core coding task.',
      'Dismissed a hint about using a mutex before later adopting it.',
    ],
    evidence: [
      {
        timestamp: '14:20',
        quote: '“I don’t think there’s a race, the map writes are pretty fast.”',
        note: 'Misunderstanding of Go concurrency semantics.',
        signal: 'negative',
      },
      {
        timestamp: '31:05',
        quote: '“PDBs let you guarantee N replicas stay up during a drain.”',
        note: 'Accurate operational knowledge.',
        signal: 'positive',
      },
      {
        timestamp: '38:44',
        quote: '“Let me just start over, this is getting messy.”',
        note: 'Second full restart; ran out of time.',
        signal: 'negative',
      },
    ],
    testsPassed: 3,
    testsTotal: 8,
  },
  'amara-diallo': {
    candidateId: 'amara-diallo',
    role: 'Senior Frontend Engineer',
    interviewedOn: 'Sep 21, 2026',
    durationMinutes: 38,
    language: 'TypeScript',
    interviewTypes: ['Coding', 'Conceptual'],
    recommendation: 'Strong No Hire',
    overallScore: 1.7,
    headline: 'Significant gaps in JavaScript fundamentals for a senior-level role; ended the session early.',
    competencies: [
      { name: 'Problem solving', score: 1.6, summary: 'Unable to break the problem into steps.' },
      { name: 'Code quality', score: 1.8, summary: 'Untyped, deeply nested conditionals.' },
      { name: 'Testing & debugging', score: 1.4, summary: 'Did not run tests before ending.' },
      { name: 'Technical knowledge', score: 1.9, summary: 'Confused closures with callbacks.' },
      { name: 'Communication', score: 2.2, summary: 'Polite but vague explanations.' },
    ],
    strengths: ['Honest about knowledge gaps when asked directly.'],
    weaknesses: [
      'Could not explain the difference between == and === semantics.',
      'Ended the interview at 38 minutes without a working solution.',
    ],
    evidence: [
      {
        timestamp: '09:31',
        quote: '“A closure is when you pass a function to another function.”',
        note: 'Fundamental concept misunderstood.',
        signal: 'negative',
      },
      {
        timestamp: '35:02',
        quote: '“I’m not sure, I usually just look that up.”',
        note: 'Candid, but indicates reliance on lookup for core concepts.',
        signal: 'negative',
      },
    ],
    testsPassed: 1,
    testsTotal: 8,
  },
}

export type TranscriptMessage = {
  id: string
  speaker: 'ai' | 'candidate'
  text: string
  time: string
}

export const interviewTranscript: TranscriptMessage[] = [
  {
    id: 'm1',
    speaker: 'ai',
    time: '14:02',
    text: "Great work on the first question. Let's move on. Given an array of intervals, merge all overlapping intervals and return the result sorted by start time.",
  },
  {
    id: 'm2',
    speaker: 'candidate',
    time: '14:31',
    text: 'Quick clarification — if two intervals just touch, like [1,2] and [2,3], should those be merged?',
  },
  {
    id: 'm3',
    speaker: 'ai',
    time: '14:40',
    text: 'Yes, treat touching intervals as overlapping. You can assume each interval has start ≤ end.',
  },
  {
    id: 'm4',
    speaker: 'candidate',
    time: '15:12',
    text: "Okay. I'll sort by start time first, then sweep once and only compare against the last merged interval. That's O(n log n) for the sort.",
  },
  {
    id: 'm5',
    speaker: 'ai',
    time: '15:20',
    text: 'Sounds good. Go ahead and implement it — talk me through any trade-offs as you go.',
  },
  {
    id: 'm6',
    speaker: 'candidate',
    time: '18:05',
    text: 'Done with a first pass. Running the tests now.',
  },
  {
    id: 'm7',
    speaker: 'ai',
    time: '18:30',
    text: 'One test is failing: "does not mutate the input". What do you think is causing that?',
  },
]

export type TestCase = {
  id: string
  name: string
  input: string
  expected: string
  received?: string
  passed: boolean
  durationMs: number
}

export const testCases: TestCase[] = [
  { id: 't1', name: 'merges overlapping intervals', input: '[[1,3],[2,6],[8,10]]', expected: '[[1,6],[8,10]]', passed: true, durationMs: 1 },
  { id: 't2', name: 'merges touching intervals', input: '[[1,4],[4,5]]', expected: '[[1,5]]', passed: true, durationMs: 1 },
  { id: 't3', name: 'handles unsorted input', input: '[[8,10],[1,3],[2,6]]', expected: '[[1,6],[8,10]]', passed: true, durationMs: 1 },
  { id: 't4', name: 'handles nested intervals', input: '[[1,10],[2,3],[4,5]]', expected: '[[1,10]]', passed: true, durationMs: 0 },
  { id: 't5', name: 'returns single interval unchanged', input: '[[5,7]]', expected: '[[5,7]]', passed: true, durationMs: 0 },
  { id: 't6', name: 'handles empty input', input: '[]', expected: '[]', passed: true, durationMs: 0 },
  {
    id: 't7',
    name: 'does not mutate the input',
    input: '[[1,3],[2,6]]',
    expected: 'input === [[1,3],[2,6]]',
    received: 'input === [[1,6],[2,6]]',
    passed: false,
    durationMs: 1,
  },
  { id: 't8', name: 'performs on 100k intervals', input: 'random(100_000)', expected: '< 200ms', passed: true, durationMs: 84 },
]

export const solutionCode = `// Merge all overlapping intervals, sorted by start.
export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result: number[][] = [sorted[0]];

  for (const [start, end] of sorted.slice(1)) {
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}`
