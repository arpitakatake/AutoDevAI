import type {
  AgentInfo,
  ActivityLog,
  FunctionalRequirement,
  NonFunctionalRequirement,
  ArchitectureNode,
  TestCase,
  SecurityCheck,
  DeploymentStage,
  ProjectSummary
} from '../types'

export const mockProject: ProjectSummary = {
  id: 'proj-autodev-01',
  name: 'Task Management App',
  ideaPrompt:
    'Build a modern, collaborative task management application for college students where they can create tasks, assign course deadlines, track progress on a Kanban board, and receive automated study reminders.',
  status: 'AI Development in Progress',
  progress: 68,
  activeStage: 'Development',
  createdAt: '2026-09-08 14:30',
  totalAgents: 6,
  testsCount: { total: 148, passed: 142, failed: 0 },
  securityScore: 94
}

export const initialAgents: AgentInfo[] = [
  {
    id: 'agent-req',
    name: 'Requirements Agent',
    role: 'Specification & User Stories',
    status: 'completed',
    progress: 100,
    description:
      'Analyzes natural-language prompts, extracts functional and non-functional requirements, and drafts PRD specifications.',
    activeTask: 'PRD and 18 user stories synthesized and approved',
    tokensUsed: 14200,
    latency: '1.2s',
    icon: 'ClipboardList',
    artifactsGenerated: ['PRD-v1.0.md', 'UserStories.json', 'AcceptanceCriteria.md']
  },
  {
    id: 'agent-arch',
    name: 'Architecture Agent',
    role: 'System Design & Contracts',
    status: 'completed',
    progress: 100,
    description:
      'Designs modular microservice boundaries, OpenAPI contracts, C4 diagrams, and database schemas.',
    activeTask: 'OpenAPI 3.1 schema and MongoDB document models verified',
    tokensUsed: 19800,
    latency: '1.8s',
    icon: 'Cpu',
    artifactsGenerated: ['SystemArchitecture.c4', 'OpenAPISpec.yaml', 'MongoSchema.ts']
  },
  {
    id: 'agent-dev',
    name: 'Development Agent',
    role: 'Code Synthesis & State',
    status: 'running',
    progress: 82,
    description:
      'Synthesizes clean React components, state machines, API integration layers, and responsive layouts.',
    activeTask: 'Generating KanbanBoard.tsx drag-and-drop state machine',
    tokensUsed: 42300,
    latency: '0.8s',
    icon: 'Code2',
    artifactsGenerated: ['TaskCard.tsx', 'KanbanBoard.tsx', 'taskService.ts', 'App.tsx']
  },
  {
    id: 'agent-test',
    name: 'Testing Agent',
    role: 'QA & Unit Synthesis',
    status: 'running',
    progress: 45,
    description:
      'Generates automated test suites with boundary value checks, mocking, and assertion pipelines.',
    activeTask: 'Synthesizing Vitest unit suites for TaskService priority queue',
    tokensUsed: 21500,
    latency: '1.1s',
    icon: 'CheckCircle2',
    artifactsGenerated: ['TaskCard.test.tsx', 'TaskService.spec.ts', 'e2e-workflow.spec.ts']
  },
  {
    id: 'agent-sec',
    name: 'Security Agent',
    role: 'SAST & Vulnerability Audit',
    status: 'pending',
    progress: 0,
    description:
      'Inspects abstract syntax trees for OWASP Top 10 risks, validates secret hygiene, and checks dependencies.',
    activeTask: 'Queued - awaiting component compilation AST output',
    tokensUsed: 0,
    latency: '--',
    icon: 'ShieldCheck',
    artifactsGenerated: []
  },
  {
    id: 'agent-ops',
    name: 'DevOps Agent',
    role: 'CI/CD & Cloud Infrastructure',
    status: 'pending',
    progress: 0,
    description:
      'Generates multi-stage Dockerfiles, Kubernetes manifests, and GitHub Actions deployment workflows.',
    activeTask: 'Queued - standing by for container image build trigger',
    tokensUsed: 0,
    latency: '--',
    icon: 'Rocket',
    artifactsGenerated: []
  }
]

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '16:40:12',
    agentName: 'Requirements Agent',
    agentRole: 'Requirements Extraction',
    action: 'Completed user stories extraction and acceptance criteria for 5 modules',
    type: 'success',
    details: 'Derived 18 user stories covering auth, task CRUD, and deadline matrix.'
  },
  {
    id: 'log-2',
    timestamp: '16:41:05',
    agentName: 'Architecture Agent',
    agentRole: 'System Design',
    action: 'Generated OpenAPI 3.1 specification and MongoDB collection models',
    type: 'success',
    details: 'Defined 14 REST endpoints with strict JWT bearer authentication.'
  },
  {
    id: 'log-3',
    timestamp: '16:41:50',
    agentName: 'Development Agent',
    agentRole: 'Frontend Synthesis',
    action: 'Synthesized TaskCard.tsx and KanbanBoard.tsx with responsive grid',
    type: 'progress',
    details: 'Integrated Lucide icons and optimistic state updates.'
  },
  {
    id: 'log-4',
    timestamp: '16:42:15',
    agentName: 'Testing Agent',
    agentRole: 'Automated QA',
    action: 'Executed 148 test assertions across component and utility layers',
    type: 'info',
    details: '142 tests passed, 6 boundary conditions currently running.'
  },
  {
    id: 'log-5',
    timestamp: '16:42:30',
    agentName: 'Security Agent',
    agentRole: 'SAST Scanner',
    action: 'Initialized AST inspection pipeline; dependency scanner pre-warmed',
    type: 'info',
    details: 'Clean hygiene verified across initial scaffolding.'
  },
  {
    id: 'log-6',
    timestamp: '16:42:48',
    agentName: 'AI Orchestrator',
    agentRole: 'Central Dispatcher',
    action: 'Synchronized DAG dependencies; distributed code artifacts to Testing Agent',
    type: 'success',
    details: 'Latency 18ms across internal agent communication bus.'
  }
]

export const initialFunctionalRequirements: FunctionalRequirement[] = [
  {
    id: 'req-1',
    title: 'User Registration & OAuth2 Authentication',
    category: 'Authentication',
    priority: 'High',
    status: 'Approved',
    description:
      'Students must be able to sign up using college email credentials or OAuth2 (Google/GitHub) with role-based access control.',
    acceptanceCriteria: [
      'JWT token generated with 24h validity and secure refresh rotation',
      'Password complexity enforcement (min 8 chars, mixed case, symbol)',
      'Session persisted in secure httpOnly cookie'
    ]
  },
  {
    id: 'req-2',
    title: 'Task Creation & Rich Description',
    category: 'Task Management',
    priority: 'High',
    status: 'Approved',
    description:
      'Users can quickly create tasks with title, course tag, rich-text markdown notes, and sub-checklists.',
    acceptanceCriteria: [
      'Instant inline task creation shortcut (Press Enter)',
      'Tagging by Course Code (e.g. CS101, MATH202)',
      'Attachment support up to 10MB per task'
    ]
  },
  {
    id: 'req-3',
    title: 'Interactive Drag-and-Drop Kanban Board',
    category: 'Workspace',
    priority: 'High',
    status: 'Approved',
    description:
      'Provide an interactive board with columns: "To Do", "In Progress", "In Review", and "Completed".',
    acceptanceCriteria: [
      'Smooth drag-and-drop state transition between columns',
      'Optimistic UI updates with rollback on network failure',
      'Filtered views by deadline, course, or priority'
    ]
  },
  {
    id: 'req-4',
    title: 'Deadline Management & Eisenhower Priority Matrix',
    category: 'Scheduling',
    priority: 'Medium',
    status: 'Approved',
    description:
      'Sort and categorize tasks based on urgency and importance with visual countdown tags.',
    acceptanceCriteria: [
      'Color-coded urgency chips (Overdue: Red, Today: Amber, Upcoming: Green)',
      'Calendar sync export (.ics feed)',
      'Smart sort order based on student exam timetable'
    ]
  },
  {
    id: 'req-5',
    title: 'Progress Tracking & Study Velocity Analytics',
    category: 'Analytics',
    priority: 'Medium',
    status: 'Review',
    description:
      'Visual burn-down graphs showing tasks completed per week and estimated hours spent.',
    acceptanceCriteria: [
      'Weekly completion velocity chart',
      'Productivity streaks counter',
      'Exportable weekly PDF summary for academic advisors'
    ]
  }
]

export const initialNonFunctionalRequirements: NonFunctionalRequirement[] = [
  {
    id: 'nfr-1',
    category: 'Security',
    target: 'OWASP Top 10 Compliant & AES-256',
    status: 'Verified',
    description:
      'All user data encrypted at rest using AES-256; TLS 1.3 enforced for all client-server communications with strict CORS.',
    metrics: '0 Critical / High vulnerabilities, 100% inputs sanitized with Zod'
  },
  {
    id: 'nfr-2',
    category: 'Performance',
    target: 'P99 Latency < 120ms',
    status: 'Verified',
    description:
      'Client bundle size under 180kb gzipped; API responses cached at edge using Redis for fast retrieval.',
    metrics: 'Lighthouse score > 96 across Performance and Accessibility'
  },
  {
    id: 'nfr-3',
    category: 'Scalability',
    target: '10,000+ Concurrent Users',
    status: 'Monitoring',
    description:
      'Stateless microservice instances running inside Kubernetes clusters with automatic horizontal pod scaling.',
    metrics: 'HPA triggers at 75% CPU; zero degradation up to 15k req/sec'
  },
  {
    id: 'nfr-4',
    category: 'Reliability',
    target: '99.95% System Uptime',
    status: 'Planned',
    description:
      'Automated health checks, database replica sets with automatic failover, and disaster recovery snapshots.',
    metrics: 'RTO < 5 minutes, RPO < 1 minute with continuous WAL streaming'
  }
]

export const initialArchitectureNodes: ArchitectureNode[] = [
  {
    id: 'node-client',
    title: 'Client Layer',
    layer: 'User',
    tech: 'Web Browser & PWA',
    description: 'Responsive single-page application with offline caching and responsive UI.',
    status: 'active',
    endpoints: ['HTTPS / WSS Protocol', 'ServiceWorker Sync']
  },
  {
    id: 'node-frontend',
    title: 'Frontend Framework',
    layer: 'Frontend',
    tech: 'React 19 + Vite + TypeScript',
    description: 'Component-driven UI, Zustand state store, and glassmorphic design system.',
    status: 'active',
    endpoints: ['/src/components', '/src/services', '/src/types']
  },
  {
    id: 'node-gateway',
    title: 'API Gateway & Reverse Proxy',
    layer: 'Gateway',
    tech: 'NGINX / Envoy Gateway',
    description: 'SSL termination, request rate limiting, and JWT token authentication filter.',
    status: 'configured',
    endpoints: ['/api/v1/auth/*', '/api/v1/tasks/*', '/api/v1/analytics/*']
  },
  {
    id: 'node-backend',
    title: 'Application API Services',
    layer: 'Backend API',
    tech: 'Node.js Express / REST APIs',
    description: 'Stateless business logic handling user sessions, tasks, deadlines, and events.',
    status: 'configured',
    endpoints: ['GET /tasks', 'POST /tasks', 'PATCH /tasks/:id', 'DELETE /tasks/:id']
  },
  {
    id: 'node-ai',
    title: 'AutoDevAI Agent Orchestration',
    layer: 'AI Layer',
    tech: 'Multi-Agent DAG Engine',
    description: 'Autonomous orchestration bus coordinating requirements, code, QA, and security.',
    status: 'active',
    endpoints: ['EventBus: agent:req', 'agent:dev', 'agent:test', 'agent:sec']
  },
  {
    id: 'node-database',
    title: 'Persistence & Cache Layer',
    layer: 'Database',
    tech: 'MongoDB Atlas + Redis Cache',
    description: 'Document database for tasks & user profiles; in-memory cache for session state.',
    status: 'configured',
    endpoints: ['mongodb://atlas-replica-set', 'redis://cache-cluster:6379']
  }
]

export const mockCodeFiles: Record<string, string> = {
  'TaskCard.tsx': `import React from 'react'
import { Calendar, Tag, CheckCircle2, Clock } from 'lucide-react'

export interface TaskCardProps {
  id: string
  title: string
  course: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  completed: boolean
  onToggle: (id: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  course,
  priority,
  dueDate,
  completed,
  onToggle
}) => {
  const priorityColors = {
    High: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  }

  return (
    <div className="group p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/50 transition-all shadow-md">
      <div className="flex items-start justify-between gap-3">
        <button 
          onClick={() => onToggle(id)}
          className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors"
        >
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-600 hover:border-indigo-400" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h4 className={\`text-sm font-semibold \${completed ? 'line-through text-slate-500' : 'text-white'}\`}>
            {title}
          </h4>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-mono">
              <Tag className="w-3 h-3 text-indigo-400" />
              {course}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {dueDate}
            </span>
          </div>
        </div>
        <span className={\`text-[11px] px-2 py-0.5 rounded-full border font-medium \${priorityColors[priority]}\`}>
          {priority}
        </span>
      </div>
    </div>
  )
}`,

  'KanbanBoard.tsx': `import React, { useState } from 'react'
import { TaskCard } from './TaskCard'
import { Plus, MoreHorizontal } from 'lucide-react'

export interface Task {
  id: string
  title: string
  course: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  status: 'todo' | 'in-progress' | 'completed'
}

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Implement Dijkstra Graph Algorithm', course: 'CS301', priority: 'High', dueDate: 'Tomorrow', status: 'todo' },
    { id: '2', title: 'Prepare Chemistry Lab Presentation', course: 'CHEM102', priority: 'Medium', dueDate: '3 Days', status: 'in-progress' },
    { id: '3', title: 'Submit Literature Essay Draft', course: 'ENG210', priority: 'Low', dueDate: 'Friday', status: 'completed' },
  ])

  const columns = [
    { id: 'todo', title: 'To Do', count: tasks.filter(t => t.status === 'todo').length },
    { id: 'in-progress', title: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'completed', title: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {columns.map(col => (
        <div key={col.id} className="bg-slate-900/40 rounded-2xl p-4 border border-white/5 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-slate-200">{col.title}</h3>
              <span className="px-2 py-0.5 text-xs bg-slate-800 rounded-full text-slate-400">{col.count}</span>
            </div>
            <button className="text-slate-400 hover:text-white"><Plus className="w-4 h-4" /></button>
          </div>
          <div className="flex flex-col gap-2.5">
            {tasks.filter(t => t.status === col.id).map(task => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                course={task.course}
                priority={task.priority}
                dueDate={task.dueDate}
                completed={task.status === 'completed'}
                onToggle={(id) => {
                  setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t))
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}`,

  'taskService.ts': `// taskService.ts - Synthesized by AutoDevAI Development Agent
import axios from 'axios'

export interface TaskDTO {
  id: string
  title: string
  course: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  status: 'todo' | 'in-progress' | 'completed'
}

const API_BASE = '/api/v1/tasks'

export const taskService = {
  async getAllTasks(): Promise<TaskDTO[]> {
    const res = await axios.get(API_BASE)
    return res.data
  },

  async createTask(task: Omit<TaskDTO, 'id'>): Promise<TaskDTO> {
    const res = await axios.post(API_BASE, task)
    return res.data
  },

  async updateStatus(id: string, status: TaskDTO['status']): Promise<TaskDTO> {
    const res = await axios.patch(\`\${API_BASE}/\${id}/status\`, { status })
    return res.data
  },

  async deleteTask(id: string): Promise<void> {
    await axios.delete(\`\${API_BASE}/\${id}\`)
  }
}`,

  'App.tsx': `import React from 'react'
import { KanbanBoard } from './components/KanbanBoard'
import { Sparkles } from 'lucide-react'

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Student Task Planner</h1>
            <p className="text-xs text-slate-400">Generated by AutoDevAI Agent Fleet</p>
          </div>
        </div>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  )
}`
}

export const initialTestCases: TestCase[] = [
  {
    id: 'test-1',
    name: 'TaskCard renders priority badge with correct styling',
    suite: 'Component / TaskCard.test.tsx',
    type: 'Unit',
    status: 'Passed',
    duration: '14ms',
    assertions: 4
  },
  {
    id: 'test-2',
    name: 'KanbanBoard shifts card from To Do to In Progress on drag',
    suite: 'Integration / KanbanBoard.test.tsx',
    type: 'Integration',
    status: 'Passed',
    duration: '42ms',
    assertions: 6
  },
  {
    id: 'test-3',
    name: 'taskService.createTask returns 201 with generated UUID',
    suite: 'Services / taskService.spec.ts',
    type: 'Unit',
    status: 'Passed',
    duration: '28ms',
    assertions: 5
  },
  {
    id: 'test-4',
    name: 'OAuth2 token refresh rotation verifies cryptographically',
    suite: 'Security / authService.spec.ts',
    type: 'Security',
    status: 'Passed',
    duration: '35ms',
    assertions: 8
  },
  {
    id: 'test-5',
    name: 'Eisenhower priority queue sorts urgent tasks to top index',
    suite: 'Unit / priorityEngine.test.ts',
    type: 'Unit',
    status: 'Passed',
    duration: '11ms',
    assertions: 7
  },
  {
    id: 'test-6',
    name: 'MongoDB collection validates schema against Zod type',
    suite: 'Database / taskSchema.test.ts',
    type: 'Integration',
    status: 'Passed',
    duration: '54ms',
    assertions: 9
  },
  {
    id: 'test-7',
    name: 'End-to-End student task creation to completion workflow',
    suite: 'E2E / studentWorkflow.e2e.ts',
    type: 'E2E',
    status: 'Passed',
    duration: '420ms',
    assertions: 16
  },
  {
    id: 'test-8',
    name: 'Optimistic UI rollback on simulated 500 network timeout',
    suite: 'Integration / networkFailure.spec.ts',
    type: 'Integration',
    status: 'Running',
    duration: '18ms',
    assertions: 3
  }
]

export const initialSecurityChecks: SecurityCheck[] = [
  {
    id: 'sec-1',
    category: 'Authentication',
    title: 'OAuth2 PKCE & JWT Signature Verification',
    severity: 'Pass',
    status: 'Passed',
    description: 'Tokens signed with RS256; PKCE challenge verified for student logins.'
  },
  {
    id: 'sec-2',
    category: 'Authorization & RBAC',
    title: 'Role-based Task Ownership Policies',
    severity: 'Pass',
    status: 'Passed',
    description: 'Strict middleware ensures students can only read and mutate their own tasks.'
  },
  {
    id: 'sec-3',
    category: 'API Security',
    title: 'OWASP API Top 10 & Rate Limiting',
    severity: 'Pass',
    status: 'Passed',
    description: 'Sliding window rate limit set to 100 requests / minute per IP; CORS strictly locked.'
  },
  {
    id: 'sec-4',
    category: 'Input Validation',
    title: 'Zod Sanitization & XSS Prevention',
    severity: 'Pass',
    status: 'Passed',
    description: 'All string and HTML input sanitized before database ingestion; DOMPurify configured.'
  },
  {
    id: 'sec-5',
    category: 'Dependency Scan',
    title: 'NPM Advisory & Transitive Dep Check',
    severity: 'Low',
    status: 'Warning',
    description: '2 low-severity vulnerabilities detected in transitive test runner fixtures.',
    remediation: 'Run npm audit fix or update vitest to v3.0.4'
  }
]

export const initialDeploymentStages: DeploymentStage[] = [
  {
    id: 'stage-1',
    name: 'Source Compilation & Build',
    status: 'completed',
    duration: '18s',
    details: 'Vite 8 production bundle generated; output 148.4 kB gzipped'
  },
  {
    id: 'stage-2',
    name: 'Automated Test Suite',
    status: 'completed',
    duration: '24s',
    details: '142 tests executed across Vitest & Playwright with 0 failures'
  },
  {
    id: 'stage-3',
    name: 'Static Security & Dependency Scan',
    status: 'completed',
    duration: '12s',
    details: 'AST inspection clean; Security score rated 94/100 (Grade A+)'
  },
  {
    id: 'stage-4',
    name: 'Docker Image Build & Push',
    status: 'completed',
    duration: '42s',
    details: 'Image autodevai/task-app:v1.2 tagged and pushed to ECR registry'
  },
  {
    id: 'stage-5',
    name: 'Cloud Deployment to Kubernetes',
    status: 'running',
    duration: '15s',
    details: 'Rolling update applied to 3 pods in us-east-1 production cluster'
  }
]
