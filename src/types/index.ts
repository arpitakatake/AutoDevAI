export type AgentStatus = 'completed' | 'running' | 'pending' | 'failed'

export interface AgentInfo {
  id: string
  name: string
  role: string
  status: AgentStatus
  progress: number
  description: string
  activeTask?: string
  tokensUsed?: number
  latency?: string
  icon: string
  artifactsGenerated: string[]
}

export interface ActivityLog {
  id: string
  timestamp: string
  agentName: string
  agentRole: string
  action: string
  type: 'success' | 'info' | 'progress' | 'warning'
  details?: string
}

export interface FunctionalRequirement {
  id: string
  title: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Approved' | 'Review' | 'Draft'
  description: string
  acceptanceCriteria: string[]
}

export interface NonFunctionalRequirement {
  id: string
  category: 'Security' | 'Performance' | 'Scalability' | 'Reliability'
  target: string
  status: 'Verified' | 'Monitoring' | 'Planned'
  description: string
  metrics: string
}

export interface ArchitectureNode {
  id: string
  title: string
  layer: 'User' | 'Frontend' | 'Gateway' | 'Backend API' | 'AI Layer' | 'Database'
  tech: string
  description: string
  status: 'active' | 'configured' | 'pending'
  endpoints?: string[]
}

export interface CodeFile {
  path: string
  name: string
  type: 'file' | 'folder'
  language?: string
  children?: CodeFile[]
  content?: string
}

export interface TestCase {
  id: string
  name: string
  suite: string
  type: 'Unit' | 'Integration' | 'E2E' | 'Security'
  status: 'Passed' | 'Failed' | 'Running' | 'Skipped'
  duration: string
  assertions: number
}

export interface SecurityCheck {
  id: string
  category: string
  title: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Pass'
  status: 'Passed' | 'Warning' | 'Action Required'
  description: string
  remediation?: string
}

export interface DeploymentStage {
  id: string
  name: string
  status: 'completed' | 'running' | 'pending' | 'failed'
  duration?: string
  details: string
}

export interface ProjectSummary {
  id: string
  name: string
  ideaPrompt: string
  status: string
  progress: number
  activeStage: string
  createdAt: string
  totalAgents: number
  testsCount: { total: number; passed: number; failed: number }
  securityScore: number
}
