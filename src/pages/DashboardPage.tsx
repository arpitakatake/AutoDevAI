import React from 'react'
import { Link } from 'react-router-dom'
import {
  FolderGit2,
  Bot,
  Gauge,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  Cpu,
  Code2,
  ChevronRight
} from 'lucide-react'
import { Card } from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'
import { mockProject, initialAgents, initialActivityLogs } from '../data/mockData'

export const DashboardPage: React.FC = () => {
  const stages = [
    { name: 'Idea', status: 'completed', path: '/new-project' },
    { name: 'Requirements', status: 'completed', path: '/requirements' },
    { name: 'Architecture', status: 'completed', path: '/architecture' },
    { name: 'Development', status: 'active', path: '/development', current: true },
    { name: 'Testing', status: 'running', path: '/testing' },
    { name: 'Security', status: 'pending', path: '/security' },
    { name: 'Deployment', status: 'pending', path: '/deployment' }
  ]

  return (
    <div className="dashboard-view">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <div className="greeting-row">
            <h1 className="title-page">Good morning, Arpita</h1>
            <span className="badge badge-ai">Autonomous Fleet Active</span>
          </div>
          <p className="subtitle">Continue building your software with AutoDevAI.</p>
        </div>

        <div className="welcome-actions">
          <Link to="/workflow" className="btn btn-secondary btn-sm">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>AI Orchestrator</span>
          </Link>
          <Link to="/new-project" className="btn btn-primary btn-sm">
            <Sparkles className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid-4 metrics-grid">
        <Card className="metric-card">
          <div className="metric-inner">
            <div className="metric-icon-box indigo">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Active Projects</span>
              <h3 className="metric-val">3</h3>
              <span className="metric-sub text-emerald-400">2 in production, 1 building</span>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-inner">
            <div className="metric-icon-box purple">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div className="metric-data">
              <span className="metric-label">AI Agents Running</span>
              <h3 className="metric-val">6 Coordinated</h3>
              <span className="metric-sub text-indigo-400">DAG bus latency: 18ms</span>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-inner">
            <div className="metric-icon-box cyan">
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Build Progress</span>
              <h3 className="metric-val">68%</h3>
              <span className="metric-sub text-slate-400">Development stage active</span>
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-inner">
            <div className="metric-icon-box emerald">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Tests Passed</span>
              <h3 className="metric-val">142 / 148</h3>
              <span className="metric-sub text-emerald-400">95.9% Pass Rate (0 Failures)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Focus: Recent Project Spotlight */}
      <Card
        title={
          <div className="spotlight-title-group">
            <div className="spotlight-badge-dot" />
            <h2 className="title-section">Recent Project: {mockProject.name}</h2>
          </div>
        }
        badge={<span className="badge badge-running">AI Development in Progress</span>}
        action={
          <div className="spotlight-header-actions">
            <Link to="/project-details" className="btn btn-secondary btn-sm">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        }
        className="project-spotlight-card"
        glow="indigo"
      >
        <div className="spotlight-body">
          <div className="spotlight-meta-row">
            <p className="project-prompt-quote">"{mockProject.ideaPrompt}"</p>
            <div className="progress-summary-box">
              <div className="progress-top-info">
                <span className="text-xs text-slate-400">Total Completion</span>
                <span className="text-sm font-mono font-bold text-white">68%</span>
              </div>
              <ProgressBar progress={68} height={9} showPercentage={false} />
            </div>
          </div>

          {/* Workflow Progress Visualization */}
          <div className="sdlc-stepper-box">
            <div className="stepper-title-row">
              <span className="stepper-heading">SDLC Autonomous Workflow Pipeline</span>
              <span className="stepper-subtext">Currently executing: <strong>Stage 4 - Development</strong></span>
            </div>

            <div className="stages-pipeline-track">
              {stages.map((stage, idx) => {
                const isActive = stage.current
                const isDone = stage.status === 'completed'
                return (
                  <div key={stage.name} className="stage-step-item">
                    <Link
                      to={stage.path}
                      className={`stage-pill ${isActive ? 'current-active' : ''} ${isDone ? 'stage-done' : ''}`}
                    >
                      <div className="stage-status-icon">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : isActive ? (
                          <span className="pulsing-radar" />
                        ) : (
                          <span className="pending-ring" />
                        )}
                      </div>
                      <div className="stage-text-block">
                        <span className="stage-step-num">0{idx + 1}</span>
                        <span className="stage-title">{stage.name}</span>
                      </div>
                    </Link>
                    {idx < stages.length - 1 && (
                      <div className={`stage-connector-arrow ${isDone ? 'done-arrow' : ''}`}>
                        <ChevronRight className="w-4 h-4 text-slate-600" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Jump Shortcuts */}
          <div className="quick-jump-grid">
            <Link to="/requirements" className="jump-card">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <div>
                <span className="jump-label">Requirements Spec</span>
                <span className="jump-status text-emerald-400">5/5 Approved</span>
              </div>
            </Link>

            <Link to="/architecture" className="jump-card">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="jump-label">System Architecture</span>
                <span className="jump-status text-indigo-400">C4 & MongoDB Ready</span>
              </div>
            </Link>

            <Link to="/development" className="jump-card active-jump">
              <Code2 className="w-4 h-4 text-purple-400" />
              <div>
                <span className="jump-label">IDE & Code Editor</span>
                <span className="jump-status text-purple-300">Generating Components 82%</span>
              </div>
            </Link>

            <Link to="/testing" className="jump-card">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="jump-label">Automated QA</span>
                <span className="jump-status text-emerald-400">142/148 Passed</span>
              </div>
            </Link>
          </div>
        </div>
      </Card>

      {/* Two Columns: Agent Fleet Snapshot & Live Activity Stream */}
      <div className="grid-2 dashboard-lower-grid">
        <Card
          title="AI Agent Fleet Status"
          subtitle="6 Autonomous agents synchronized via central Orchestrator"
          action={
            <Link to="/workflow" className="text-xs text-indigo-400 hover:underline">
              Inspect DAG →
            </Link>
          }
        >
          <div className="mini-agent-list">
            {initialAgents.map((agent) => (
              <div key={agent.id} className="mini-agent-row">
                <div className="mini-agent-left">
                  <span className={`agent-bullet ${agent.status}`} />
                  <div>
                    <h4 className="mini-agent-name">{agent.name}</h4>
                    <p className="mini-agent-task">{agent.activeTask || agent.role}</p>
                  </div>
                </div>
                <div className="mini-agent-right">
                  <span className="mini-progress-num">{agent.progress}%</span>
                  <div className="mini-bar-track">
                    <div
                      className="mini-bar-fill"
                      style={{
                        width: `${agent.progress}%`,
                        backgroundColor:
                          agent.status === 'completed'
                            ? '#10b981'
                            : agent.status === 'running'
                            ? '#6366f1'
                            : '#334155'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Live AI Activity Stream"
          subtitle="Chronological telemetry from agent orchestration bus"
          action={
            <span className="badge badge-ai">
              <span className="pulse-dot" /> Live
            </span>
          }
        >
          <div className="activity-stream-list">
            {initialActivityLogs.map((log) => (
              <div key={log.id} className="activity-log-item">
                <div className="log-time-column">{log.timestamp}</div>
                <div className="log-content-column">
                  <div className="log-header-line">
                    <span className="log-agent">{log.agentName}</span>
                    <span className="log-role">{log.agentRole}</span>
                  </div>
                  <p className="log-action-text">{log.action}</p>
                  {log.details && <p className="log-details-sub">{log.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <style>{`
        .dashboard-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .welcome-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .greeting-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .welcome-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .metrics-grid {
          margin-bottom: 4px;
        }
        .metric-card {
          padding: 18px 20px;
        }
        .metric-inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .metric-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-icon-box.indigo {
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .metric-icon-box.purple {
          background: rgba(139, 92, 246, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        .metric-icon-box.cyan {
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
        }
        .metric-icon-box.emerald {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .metric-data {
          display: flex;
          flex-direction: column;
        }
        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .metric-val {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin: 2px 0;
          letter-spacing: -0.02em;
        }
        .metric-sub {
          font-size: 11px;
          font-weight: 500;
        }
        .spotlight-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spotlight-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px #6366f1;
        }
        .spotlight-body {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .spotlight-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .project-prompt-quote {
          font-size: 13.5px;
          color: #cbd5e1;
          font-style: italic;
          max-width: 680px;
          line-height: 1.5;
        }
        .progress-summary-box {
          min-width: 200px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .progress-top-info {
          display: flex;
          justify-content: space-between;
        }
        .sdlc-stepper-box {
          background: rgba(10, 14, 23, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 18px 20px;
        }
        .stepper-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          font-size: 12px;
        }
        .stepper-heading {
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stepper-subtext {
          color: #94a3b8;
        }
        .stepper-subtext strong {
          color: #818cf8;
        }
        .stages-pipeline-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow-x: auto;
          gap: 6px;
          padding-bottom: 4px;
        }
        .stage-step-item {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .stage-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          flex: 1;
          transition: all 0.2s;
        }
        .stage-pill:hover {
          border-color: var(--border-medium);
          background: rgba(255, 255, 255, 0.06);
        }
        .stage-pill.current-active {
          background: rgba(99, 102, 241, 0.16);
          border-color: #6366f1;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
        }
        .stage-pill.stage-done {
          border-color: rgba(16, 185, 129, 0.3);
        }
        .stage-text-block {
          display: flex;
          flex-direction: column;
        }
        .stage-step-num {
          font-size: 9px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .stage-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pulsing-radar {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 8px #818cf8;
          animation: pulseDot 1.5s infinite;
        }
        .pending-ring {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid #64748b;
        }
        .stage-connector-arrow {
          padding: 0 4px;
        }
        .stage-connector-arrow.done-arrow svg {
          color: #10b981;
        }
        .quick-jump-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .jump-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s;
        }
        .jump-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--border-medium);
        }
        .jump-card.active-jump {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.4);
        }
        .jump-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .jump-status {
          display: block;
          font-size: 11px;
        }
        .dashboard-lower-grid {
          margin-top: 4px;
        }
        .mini-agent-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mini-agent-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
        }
        .mini-agent-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .agent-bullet {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .agent-bullet.completed { background: #10b981; box-shadow: 0 0 6px #10b981; }
        .agent-bullet.running { background: #6366f1; box-shadow: 0 0 6px #6366f1; animation: pulseDot 1.5s infinite; }
        .agent-bullet.pending { background: #475569; }
        .mini-agent-name {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .mini-agent-task {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 280px;
        }
        .mini-agent-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .mini-progress-num {
          font-size: 11.5px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
        }
        .mini-bar-track {
          width: 60px;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .mini-bar-fill {
          height: 100%;
          border-radius: 999px;
        }
        .activity-stream-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 380px;
          overflow-y: auto;
        }
        .activity-log-item {
          display: flex;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border-left: 2px solid #6366f1;
        }
        .log-time-column {
          font-size: 10.5px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          white-space: nowrap;
          margin-top: 1px;
        }
        .log-content-column {
          flex: 1;
        }
        .log-header-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }
        .log-agent {
          font-size: 12px;
          font-weight: 600;
          color: #c7d2fe;
        }
        .log-role {
          font-size: 10.5px;
          color: var(--text-muted);
        }
        .log-action-text {
          font-size: 12px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .log-details-sub {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 3px;
        }
        @media (max-width: 1024px) {
          .quick-jump-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}
