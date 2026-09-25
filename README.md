# Adaptive Multimodal AI Interview & Assessment Engine

> **Status:** Architecture / Development Blueprint
> **Version:** 1.0
> **Architecture Style:** Modular service-oriented architecture with selective microservices
> **Primary Goal:** Build a production-grade, adaptive, multimodal AI interview and assessment platform rather than a simple chatbot-based interviewer.

---

# 1. Project Vision

## 1.1 What are we building?

We are building an **Adaptive Multimodal AI Interview & Assessment Engine**.

The system should conduct realistic technical and professional interviews while continuously adapting to the candidate's demonstrated abilities.

The platform should eventually support:

* Software engineering interviews
* DSA/coding interviews
* CS fundamentals
* Project deep-dives
* System design
* Behavioral interviews
* Finance/banking assessments
* Legal assessments
* Domain-specific simulations
* Other professional assessments

The core engine should remain domain-independent.

---

# 2. Core Design Philosophy

## 2.1 This is NOT a chatbot

The system must not simply implement:

```text
Candidate
   ↓
LLM
   ↓
Question
   ↓
LLM
   ↓
Score
```

Instead:

```text
Candidate
   ↓
Multimodal Input
   ├── Voice
   ├── Video
   ├── Screen
   ├── Code
   └── Text
          ↓
     Interview State
          ↓
   Adaptive Controller
          ↓
 Question Selection
          ↓
     AI Interviewer
          ↓
 Candidate Response
          ↓
 Evidence Collection
          ↓
 Evaluation
          ↓
 Competency State
          ↓
 Adaptive Controller
          ↓
 Next Question
```

The LLM is one component of the system, not the entire system.

---

# 3. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │      Candidate       │
                         │      Browser         │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
              HTTPS              WebSocket           WebRTC
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐  ┌────────────────┐  ┌──────────────┐
        │ REST/API Layer │  │ Realtime Layer │  │ Media Layer  │
        │                │  │                │  │              │
        │ Node.js        │  │ Node.js        │  │ LiveKit      │
        └───────┬────────┘  └───────┬────────┘  └──────┬───────┘
                │                   │                  │
                └──────────┬────────┘                  │
                           │                           │
                           ▼                           ▼
                  ┌─────────────────┐          Audio/Video/
                  │ Interview       │          Screen Streams
                  │ Orchestrator    │
                  └────────┬────────┘
                           │
                       gRPC + protobuf
                           │
          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼
   ┌────────────┐   ┌────────────┐   ┌────────────┐
   │ AI Engine  │   │ Speech     │   │ Evaluation │
   │ Python     │   │ Services   │   │ Services   │
   └────────────┘   └────────────┘   └────────────┘
          │                │                 │
          └────────────────┼─────────────────┘
                           │
                ┌──────────┴───────────┐
                │                      │
                ▼                      ▼
           PostgreSQL               Redis
                │                      │
                │                 Temporary State
                │
                ▼
          S3/Object Storage
```

---

# 4. Application Structure

The entire application is divided into the following major sections:

```text
1. Candidate Application
2. Recruiter / Admin Application
3. Authentication & Authorization
4. Interview Management
5. Realtime Communication
6. AI Interviewer
7. Adaptive Interview Engine
8. Competency & Skill Engine
9. Coding & Execution Engine
10. Speech System
11. Multimodal / Computer Vision System
12. Integrity Monitoring
13. Evidence & Evaluation Engine
14. Assessment & Reporting
15. Data Layer
16. Event & Job Infrastructure
17. Observability
18. Security
19. Infrastructure & Deployment
20. Testing
21. Development Roadmap
```

---

# 5. Frontend

## 5.1 Technology

### Primary

* Next.js
* React
* TypeScript

### UI

* Tailwind CSS
* shadcn/ui

### Client State

* Zustand

### Code Editor

* Monaco Editor

---

# 6. Candidate Application

## 6.1 Candidate Dashboard

Responsibilities:

* Upcoming interviews
* Completed interviews
* Interview status
* Profile
* Resume
* Target roles

---

## 6.2 Pre-Interview Setup

The candidate must perform:

```text
Camera check
Microphone check
Speaker check
Network check
Screen sharing check
Browser compatibility check
Permissions check
```

System should verify:

* Camera available
* Microphone available
* Screen sharing possible
* Network latency
* Audio input quality

---

## 6.3 Interview Room

The main candidate interface.

```text
┌─────────────────────────────────────────────┐
│ AI Interviewer              Timer            │
├─────────────────────────────────────────────┤
│                                             │
│          AI Avatar / Video                  │
│                                             │
├─────────────────────────────────────────────┤
│ Question / Problem                         │
├─────────────────────────────────────────────┤
│                                             │
│ Transcript                                  │
│                                             │
├───────────────────────┬─────────────────────┤
│ Code Editor           │ Test Results        │
│                       │                     │
│ Monaco                │ Passed / Failed     │
│                       │ Runtime             │
└───────────────────────┴─────────────────────┘
```

---

## 6.4 Interview Interaction Modes

The frontend should support multiple task types.

### Coding

```text
Question
→ Candidate explains approach
→ Candidate writes code
→ Run code
→ Hidden tests
→ Debug
→ Explain complexity
```

### Conceptual

```text
Question
→ Candidate answer
→ Follow-up
→ Challenge
→ Evaluation
```

### Project Deep-Dive

```text
Resume claim
→ Architecture
→ Implementation
→ Tradeoff
→ Edge case
→ Failure mode
→ Deployment
→ Monitoring
```

### System Design

Eventually:

```text
Canvas
→ Components
→ Connections
→ Architecture
→ Scaling
→ Failure analysis
```

---

# 7. Recruiter / Admin Application

## 7.1 Recruiter Dashboard

Provides:

* Candidate list
* Interview status
* Reports
* Competency results
* Interview history

---

## 7.2 Interview Configuration

Recruiter can configure:

```text
Role
Job Description
Interview duration
Competencies
Difficulty
Question categories
Coding languages
Interview type
Integrity settings
```

---

## 7.3 Candidate Profile

Displays:

* Resume
* Target role
* Interview history
* Competency profile
* Evidence
* Code submissions
* Interview timeline

---

## 7.4 Interview Replay

Recruiter can inspect:

```text
Timeline
↓
Question
↓
Candidate response
↓
Transcript
↓
Code changes
↓
Hints
↓
Execution results
↓
Competency update
↓
Integrity signals
```

---

# 8. Authentication & Authorization

## 8.1 Authentication

Possible technologies:

* Auth.js
* Keycloak
* Auth0
* Clerk

Final selection should depend on deployment requirements.

---

## 8.2 Roles

```text
Candidate
Recruiter
Interviewer
Admin
```

---

## 8.3 Authorization

Authorization must be enforced server-side.

Example:

```text
Candidate A
   ❌ Candidate B's report

Recruiter
   ✓ Assigned candidates

Admin
   ✓ System administration
```

Never rely only on frontend route protection.

---

# 9. Realtime Communication

There are three fundamentally different communication systems.

## 9.1 REST

Use REST for:

* Login/session APIs
* Candidate CRUD
* Interview configuration
* Job descriptions
* Resume upload metadata
* Reports
* Historical data

REST is for normal request/response communication.

---

# 10. WebSocket

Use WebSocket for live application events.

Examples:

```text
QuestionStarted
QuestionChanged
TranscriptUpdated
CandidateSpeaking
AISpeaking
CodeChanged
CodeSubmitted
TestCompleted
TimerUpdated
HintGiven
WarningIssued
InterviewEnded
```

WebSocket is for:

> **real-time application state**

It is NOT for raw video/audio streaming.

---

# 11. WebRTC

Use WebRTC for:

* Microphone
* Camera
* Screen sharing
* Low-latency media

Recommended media infrastructure:

**LiveKit**

Do not build a complete WebRTC media server from scratch initially.

---

# 12. Internal Service Communication

## 12.1 gRPC + Protocol Buffers

Use:

**gRPC + protobuf**

for internal service-to-service communication.

Example:

```text
Node.js
   │
   │ gRPC
   │ protobuf
   ▼
Python AI Service
```

---

## 12.2 Why protobuf?

Benefits:

* Strongly typed contracts
* Smaller messages than JSON
* Faster serialization/deserialization
* Generated clients
* Schema evolution
* Good cross-language support
* Suitable for high-frequency internal communication

The main reason is **service contracts and architecture**, not merely speed.

---

# 13. Communication Decision Table

| Communication              | Technology           | Purpose                 |
| -------------------------- | -------------------- | ----------------------- |
| Browser → Backend          | REST                 | Normal API              |
| Browser → Backend realtime | WebSocket            | Live application events |
| Browser → Media            | WebRTC               | Audio/video/screen      |
| Node → Python              | gRPC + protobuf      | Internal services       |
| Service → Service          | gRPC + protobuf      | Internal communication  |
| Large files                | S3                   | Audio/video/resumes     |
| Async jobs                 | BullMQ + Redis       | Background processing   |
| Durable event streaming    | Kafka/Redpanda later | High-scale events       |

---

# 14. AI Interviewer

The AI Interviewer is responsible for conversation.

## Responsibilities

* Ask questions
* Understand answers
* Ask follow-ups
* Clarify questions
* Challenge assumptions
* Provide controlled hints
* Discuss candidate's approach
* Maintain conversational flow

---

# 15. AI Model Architecture

Do NOT use one LLM for every task.

## 15.1 Interviewer LLM

Handles:

```text
Conversation
Question phrasing
Follow-ups
Clarifications
Hints
Natural language
```

---

## 15.2 Evaluation Models

Used for:

```text
Answer evaluation
Reasoning analysis
Technical explanation
Project understanding
Communication analysis
```

---

## 15.3 Small Models

Use smaller models where possible:

```text
Classification
Intent detection
Transcript cleanup
Simple extraction
Metadata generation
```

---

## 15.4 Strong Models

Reserve stronger models for:

```text
Complex technical reasoning
Project deep-dive evaluation
Final assessment
Complex follow-up generation
```

This reduces cost and latency.

---

# 16. Adaptive Interview Engine

This is the central intelligence of the platform.

The controller decides:

```text
What should we ask next?
Why should we ask it?
How difficult should it be?
What competency should it measure?
How much time remains?
What uncertainty remains?
```

---

# 17. Adaptive Controller

The controller should NOT simply be:

```text
LLM → "choose next question"
```

Instead:

```text
Candidate State
       +
Competency State
       +
Question Metadata
       +
Interview Constraints
       +
Time Remaining
       +
Previous Evidence
       ↓
Adaptive Controller
       ↓
Next Question
```

---

# 18. Candidate State

Maintain structured state such as:

```text
Current competency
Estimated proficiency
Confidence
Mistakes
Hints used
Current approach
Complexity claim
Unresolved misconceptions
Questions already asked
Time remaining
```

Do not send the entire interview transcript to the LLM every turn.

---

# 19. Question Bank

Every question should have metadata.

Example:

```json
{
  "id": "graph-042",
  "topic": "graphs",
  "difficulty": 4,
  "competencies": [
    "graph-traversal",
    "complexity-analysis"
  ],
  "task_type": "coding",
  "expected_duration": 12,
  "prerequisites": [
    "bfs"
  ]
}
```

---

# 20. Question Selection

Initially:

```text
Rules
+
Difficulty adjustment
+
Competency coverage
+
Interview constraints
```

Later:

```text
Information Gain
+
Uncertainty Reduction
+
Candidate Model
+
Question Cost
+
Time Remaining
```

The long-term objective is to select questions that provide maximum useful information about the candidate.

---

# 21. Competency Engine

Instead of producing only:

```text
Score = 7.5/10
```

maintain a competency graph.

Example:

```text
Software Engineering
│
├── DSA
│   ├── Arrays
│   ├── Trees
│   ├── Graphs
│   └── DP
│
├── CS Fundamentals
│   ├── OS
│   ├── DBMS
│   ├── Networks
│   └── OOP
│
├── System Design
│   ├── Scalability
│   ├── Reliability
│   └── Architecture
│
└── Projects
    ├── Architecture
    ├── Implementation
    └── Tradeoffs
```

---

# 22. Evidence Engine

Every competency assessment should have supporting evidence.

Example:

```text
Competency:
Graph Algorithms

Evidence:
✓ Correct BFS explanation
✓ Correct complexity analysis
✓ Solved graph problem
△ Needed hint for cycle detection
△ Did not explain memory tradeoff
```

This is much more useful than an unexplained score.

---

# 23. Coding Engine

Coding must be an independent subsystem.

Pipeline:

```text
Candidate
   ↓
Monaco Editor
   ↓
Code Service
   ↓
Job Queue
   ↓
Isolated Worker
   ↓
Compiler
   ↓
Hidden Tests
   ↓
Execution
   ↓
Result
```

---

# 24. Code Execution Security

NEVER execute arbitrary candidate code directly on the main backend.

Bad:

```text
Node backend
   ↓
subprocess.run(candidate_code)
```

Preferred:

```text
Code Service
   ↓
Sandbox
   ↓
Compiler
   ↓
Execution
```

---

# 25. Initial Sandbox

Use:

**Docker**

with strict:

* CPU limits
* Memory limits
* Timeouts
* Process limits
* Filesystem restrictions
* Network restrictions

---

# 26. Stronger Sandbox Later

For stronger isolation:

* gVisor
* Firecracker
* isolated workers/VMs

These should be introduced after the basic engine works.

---

# 27. Code Evaluation

Evaluation should combine:

```text
Compile status
+
Test results
+
Runtime
+
Memory
+
Static analysis
+
Code quality
+
Candidate explanation
+
Complexity explanation
+
Debugging behavior
```

Final assessment should not depend solely on whether the code passes tests.

---

# 28. Code Evolution

Record:

```text
Version 1
Version 2
Version 3
...
Final submission
```

This enables analysis of:

* Thought process
* Debugging
* Refactoring
* Error recovery
* Approach changes

---

# 29. Dry-Run System

The system should eventually be able to ask:

> "Walk me through what happens when this input is processed."

Potential execution trace:

```text
Function call
↓
Variable state
↓
Branch
↓
Loop
↓
Function return
```

This provides additional evidence of understanding.

---

# 30. Speech System

## 30.1 Speech-to-Text

Use **streaming STT**.

Pipeline:

```text
Microphone
   ↓
Streaming STT
   ↓
Partial transcript
   ↓
Final transcript
```

Do not wait for a 30-second recording before transcription.

---

# 31. Text-to-Speech

Pipeline:

```text
LLM
 ↓
Streaming response
 ↓
Sentence/chunk
 ↓
TTS
 ↓
Audio
 ↓
Candidate
```

Start TTS before the entire response is generated where possible.

Goal:

> Minimize time-to-first-audio.

---

# 32. Multimodal / Computer Vision

Python service.

Potential technologies:

* OpenCV
* PyTorch
* Transformers
* Appropriate CV models

Possible signals:

```text
Face present
Multiple faces
Face consistency
Camera obstruction
Screen state
Suspicious activity
```

Do not run expensive inference unnecessarily on every frame.

Use:

```text
Sampling
+
Event-triggered analysis
+
Selective high-resolution analysis
```

---

# 33. Integrity Monitoring

The system should produce:

```text
Integrity Signal
```

rather than automatically declaring:

```text
Candidate cheated
```

Example:

```text
12:32 — second face detected
12:47 — candidate left camera frame
14:08 — unusual screen change
```

These signals can later be reviewed.

---

# 34. Data Architecture

## 34.1 PostgreSQL

PostgreSQL is the primary durable database.

Store:

```text
Users
Candidates
Recruiters
Jobs
Interviews
Questions
Competencies
Interview Plans
Responses
Submissions
Evaluations
Evidence
Reports
```

PostgreSQL represents:

> **What happened / what must persist.**

---

# 35. Redis

Redis is NOT the primary database.

Use Redis for:

```text
Current interview state
Timers
Presence
Locks
Short-lived buffers
Caching
Rate limiting
Realtime coordination
```

Redis represents:

> **What is happening right now.**

---

# 36. Queue

Use:

**BullMQ + Redis**

for asynchronous jobs.

Examples:

```text
Video processing
Transcription jobs
Report generation
Embedding generation
Post-interview evaluation
```

Do not confuse:

```text
Redis = storage/coordination
BullMQ = job queue
```

---

# 37. Object Storage

Use:

**S3-compatible object storage**

for large binary files.

Store:

```text
Resume PDFs
Audio
Video
Screen recordings
Screenshots
Code artifacts
Generated reports
```

PostgreSQL stores metadata and object references, not large media blobs.

---

# 38. Vector Search

Initially:

**PostgreSQL + pgvector**

Use for:

```text
Resume retrieval
Question retrieval
Competency retrieval
Domain knowledge
Similar questions
```

Do not introduce a dedicated vector database until scale requires it.

---

# 39. Event Architecture

Initially:

```text
Node
 ↓
Redis / internal event system
```

Events can include:

```text
InterviewStarted
QuestionAsked
SpeechStarted
SpeechEnded
TranscriptUpdated
CodeChanged
CodeRun
CodeSubmitted
TestCompleted
HintRequested
HintGiven
CompetencyUpdated
WarningIssued
InterviewEnded
```

---

# 40. Event Streaming at Scale

If the system reaches sufficiently high event volume:

Use:

* Kafka
* Redpanda

Potential consumers:

```text
Analytics
Evidence Engine
Replay Engine
Monitoring
ML pipelines
Audit system
```

Do not introduce Kafka before there is an actual architectural need.

---

# 41. Analytics

Initially:

```text
PostgreSQL
+
Event data
```

Later, if event volume becomes large:

**ClickHouse**

for analytical workloads such as:

```text
Question completion statistics
Average response time
Hint frequency
Abandonment
Competency trends
Interview behavior
System performance
```

---

# 42. AI Context Management

Do NOT repeatedly send:

```text
Entire resume
+
Entire transcript
+
Entire question bank
+
Entire interview history
```

Instead maintain compact state.

Example:

```json
{
  "competency": "graphs",
  "estimated_level": 0.72,
  "confidence": 0.61,
  "mistakes": [
    "confused directed/undirected cycle detection"
  ],
  "strengths": [
    "BFS",
    "complexity analysis"
  ],
  "hints_used": 1
}
```

This reduces:

* Token cost
* Latency
* Context size
* Unnecessary model reasoning

---

# 43. Live Path vs Async Path

This distinction is critical.

## 43.1 Live path

Keep it short:

```text
Microphone
 ↓
Streaming STT
 ↓
Interview Controller
 ↓
LLM
 ↓
Streaming TTS
 ↓
Candidate
```

Every unnecessary component here increases latency.

---

# 44. Async Path

Expensive processing should happen asynchronously.

```text
Video
 ↓
CV analysis

Code
 ↓
Deep static analysis

Transcript
 ↓
Full evaluation

Interview
 ↓
Report generation
```

This prevents heavy workloads from blocking the live interview.

---

# 45. Model Infrastructure

Initially:

```text
External model APIs
```

Later, if self-hosting becomes beneficial:

```text
vLLM
+
GPU inference servers
```

Possible reasons to self-host:

* Cost at scale
* Latency control
* Privacy
* Model customization
* Fine-tuning

Do not self-host large models merely for architectural appearance.

---

# 46. CPU vs GPU

## CPU

Use for:

```text
API
WebSocket
Database
Redis
Business logic
Scheduling
Light processing
```

## GPU

Use for:

```text
LLM inference
Speech models
Computer vision
Embeddings
Other neural models
```

---

# 47. Observability

Use:

* OpenTelemetry
* Prometheus
* Grafana

Track:

```text
STT latency
LLM latency
TTS latency
WebSocket latency
Code execution latency
Question selection latency
Database latency
Redis latency
GPU utilization
CPU utilization
```

---

# 48. Critical Performance Metric

Do not optimize only:

```text
Total request time
```

Measure:

> **Time to first useful response**

Example:

```text
Candidate stops speaking
       ↓
STT final:       250 ms
       ↓
Controller:       20 ms
       ↓
LLM first token: 350 ms
       ↓
TTS first audio: 180 ms
       ↓
Candidate hears response
```

This is much more important for conversational UX.

---

# 49. Security

Security must be designed from the beginning.

## 49.1 Authentication

Use secure authentication.

## 49.2 Authorization

Server-side RBAC.

## 49.3 Code execution

Strong sandbox isolation.

## 49.4 Data protection

Protect:

* Resume
* Video
* Audio
* Candidate responses
* Interview reports
* Personal information

## 49.5 Secrets

Never commit:

```text
API keys
Database passwords
JWT secrets
Cloud credentials
```

Use environment variables / secret management.

---

# 50. Infrastructure

## Development

Use:

**Docker Compose**

for local development.

Example:

```text
frontend
backend
ai-service
postgres
redis
```

---

## Production

Start with simple container deployment.

Introduce:

**Kubernetes**

only when actual scale/availability requirements justify it.

Do not start the project with Kubernetes.

---

# 51. Repository Structure

Recommended monorepo:

```text
adaptive-interviewer/
│
├── apps/
│   ├── web/
│   ├── api/
│   └── recruiter/
│
├── services/
│   ├── ai/
│   ├── speech/
│   ├── evaluation/
│   ├── code-execution/
│   └── vision/
│
├── packages/
│   ├── proto/
│   ├── types/
│   ├── ui/
│   └── config/
│
├── infrastructure/
│   ├── docker/
│   ├── compose/
│   └── deployment/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── docs/
│
└── README.md
```

---

# 52. Protobuf Organization

Create a dedicated package:

```text
packages/proto/
```

Example:

```text
packages/proto/
│
├── interview.proto
├── candidate.proto
├── question.proto
├── speech.proto
├── code.proto
├── evaluation.proto
└── events.proto
```

Generated clients/types should be generated from these schemas.

The `.proto` files become the internal communication contracts.

---

# 53. API Boundaries

Every module should have a clearly defined responsibility.

Example:

```text
Interview Service
    ↓
owns interview lifecycle

AI Service
    ↓
owns AI interaction

Code Service
    ↓
owns code execution

Speech Service
    ↓
owns STT/TTS

Evaluation Service
    ↓
owns evaluation

Vision Service
    ↓
owns visual analysis
```

Avoid letting every service access every database table directly.

---

# 54. Data Ownership Principle

A service should own the data that belongs to its domain.

For example:

```text
Interview Service
→ interview state

Code Service
→ code execution artifacts

Evaluation Service
→ evaluation records

Identity/Auth
→ user identity
```

Other services should communicate through APIs/events rather than directly modifying another service's data.

---

# 55. What NOT to Use Everywhere

Do not make the mistake of selecting one technology and using it for everything.

```text
Redis
❌ Primary database
✓ Cache/session/realtime state

PostgreSQL
✓ Durable relational data
❌ Realtime pub/sub for everything

WebSocket
✓ Realtime application events
❌ Video transport

WebRTC
✓ Audio/video/screen
❌ Database communication

REST
✓ Normal APIs
❌ Raw media

gRPC
✓ Internal services
❌ Browser-facing UI API by default

protobuf
✓ Internal service contracts
❌ Replace every JSON response

Kafka
✓ High-volume durable events
❌ Every simple background task

S3
✓ Large files
❌ Relational application state
```

---

# 56. Development Principles

## Principle 1 — Build the core before scaling infrastructure

First make:

```text
Interview
→ Question
→ Candidate response
→ Evaluation
→ Next question
```

work correctly.

---

## Principle 2 — Keep the live path small

Anything that does not need to happen synchronously should be asynchronous.

---

## Principle 3 — Deterministic systems verify AI claims

For example:

```text
LLM: "The code is probably correct."

Execution Engine:
"17/20 tests passed."
```

The execution engine is the authoritative source for code correctness.

---

## Principle 4 — Evidence over unsupported scores

Instead of:

```text
DSA: 8/10
```

prefer:

```text
DSA

Strengths:
- BFS
- Complexity analysis

Weaknesses:
- Cycle detection

Evidence:
- Solved Q1 without assistance
- Required hint on Q2
- Failed edge case on Q3
```

---

# 57. Development Phases

## Phase 1 — Foundation

Build:

```text
Next.js
React
TypeScript
Node.js
PostgreSQL
Redis
Python/FastAPI
WebSocket
Docker
```

Goal:

> Candidate can enter an interview and communicate with the backend.

---

# 58. Phase 2 — AI Interviewer

Implement:

```text
STT
LLM
TTS
Question system
Conversation state
Basic follow-ups
```

Goal:

> Natural conversational AI interview.

---

# 59. Phase 3 — Coding Engine

Implement:

```text
Monaco
Code submission
Compiler
Sandbox
Hidden tests
Execution results
```

Goal:

> Real coding interview.

---

# 60. Phase 4 — Adaptive Engine

Implement:

```text
Competency graph
Candidate state
Question metadata
Difficulty adaptation
Adaptive question selection
Time management
```

Goal:

> Interview dynamically changes based on candidate performance.

---

# 61. Phase 5 — Evidence Engine

Implement:

```text
Evidence collection
Competency updates
Code evolution
Reasoning analysis
Interview timeline
```

Goal:

> Explainable assessment.

---

# 62. Phase 6 — Multimodal Monitoring

Implement:

```text
Camera
Screen
CV
Integrity signals
Audio analysis
```

Goal:

> Multimodal assessment and integrity signals.

---

# 63. Phase 7 — Recruiter Platform

Implement:

```text
Recruiter dashboard
Candidate management
Interview configuration
Replay
Evidence inspection
Reports
```

---

# 64. Phase 8 — Scaling

Only when required:

```text
Kafka / Redpanda
ClickHouse
Dedicated vector database
GPU model serving
Kubernetes
Advanced sandboxing
Read replicas
Distributed services
```

---

# 65. Initial Technology Stack

| Layer                | Technology                              |
| -------------------- | --------------------------------------- |
| Frontend             | Next.js + React + TypeScript            |
| UI                   | Tailwind + shadcn/ui                    |
| Client State         | Zustand                                 |
| Code Editor          | Monaco                                  |
| Media                | WebRTC                                  |
| Media Infrastructure | LiveKit                                 |
| Application Realtime | WebSocket                               |
| Backend              | Node.js + TypeScript                    |
| AI Services          | Python + FastAPI                        |
| Internal RPC         | gRPC                                    |
| Serialization        | Protocol Buffers                        |
| Database             | PostgreSQL                              |
| Vector Search        | pgvector                                |
| Temporary State      | Redis                                   |
| Queue                | BullMQ + Redis                          |
| File Storage         | S3-compatible storage                   |
| Code Sandbox         | Docker initially                        |
| Strong Sandbox       | gVisor / Firecracker later              |
| ML                   | PyTorch + Transformers                  |
| LLM Serving          | API initially / vLLM later              |
| CV                   | OpenCV + CV models                      |
| Events               | Redis initially                         |
| Event Streaming      | Kafka/Redpanda later                    |
| Analytics            | PostgreSQL initially / ClickHouse later |
| Observability        | OpenTelemetry + Prometheus + Grafana    |
| Containers           | Docker                                  |
| Orchestration        | Kubernetes later                        |

---

# 66. Architecture Decision Summary

The most important architectural decisions are:

```text
Next.js
    ↓
Complex frontend

WebRTC
    ↓
Realtime media

WebSocket
    ↓
Realtime application events

Node.js
    ↓
Application/realtime backend

Python
    ↓
AI/ML

gRPC + protobuf
    ↓
Internal service communication

PostgreSQL
    ↓
Persistent truth

Redis
    ↓
Fast temporary state

BullMQ
    ↓
Async jobs

S3
    ↓
Large files

Docker
    ↓
Isolation/deployment

Kafka
    ↓
Only when event scale requires it

ClickHouse
    ↓
Only when analytics scale requires it
```

---

# 67. Golden Rule

The architecture should follow:

> **Use the simplest technology that correctly solves the specific problem.**

Do not add a technology because it is popular.

Every technology should answer:

1. What problem does it solve?
2. Why is the current technology insufficient?
3. What operational cost does it introduce?
4. Does it improve correctness, latency, scalability, security, or maintainability?

If the answer is unclear, don't add it yet.

---

# 68. Final Target Architecture

The long-term system should look approximately like:

```text
                         CANDIDATE
                             │
                    ┌────────┴────────┐
                    │     Browser     │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
             REST        WebSocket       WebRTC
              │              │              │
              └──────────────┼──────────────┘
                             │
                    ┌────────▼────────┐
                    │ API / Gateway   │
                    │ Node.js         │
                    └────────┬────────┘
                             │
                        gRPC/protobuf
                             │
       ┌─────────────────────┼──────────────────────┐
       │                     │                      │
       ▼                     ▼                      ▼
 ┌───────────┐        ┌───────────┐         ┌────────────┐
 │ AI Engine │        │ Speech    │         │ Evaluation │
 │ Python    │        │ Service   │         │ Service    │
 └─────┬─────┘        └─────┬─────┘         └──────┬─────┘
       │                    │                       │
       └────────────────────┼───────────────────────┘
                            │
                    ┌───────▼────────┐
                    │ Adaptive       │
                    │ Controller     │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │ Competency     │
                    │ Engine         │
                    └───────┬────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          PostgreSQL      Redis         S3
              │
              │
       ┌──────▼──────────┐
       │ Evidence /      │
       │ Assessment      │
       └──────┬──────────┘
              │
       ┌──────▼──────────┐
       │ Recruiter       │
       │ Dashboard       │
       └─────────────────┘
```

The final system is therefore not simply an AI interviewer.

It is an:

> **Adaptive, multimodal, evidence-driven assessment platform with AI conversation, deterministic evaluation, realtime communication, isolated code execution, competency modeling, and explainable assessment.**

This architecture should be treated as the **baseline design**. Individual technologies can change later if implementation/testing demonstrates a better option, but changes should be made deliberately rather than accumulating technologies without a clear responsibility.
#   A d a p t i v e - M u l t i m o d a l - A I - I n t e r v i e w - A s s e s s m e n t - E n g i n e 
 
 