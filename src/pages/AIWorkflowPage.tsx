import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bot,
  ClipboardList,
  Cpu,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Play,
  Pause,
  RotateCcw,
  Clock,
  FileText,
  Activity
} from 'lucide-react'
import { Card } from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'
import { initialAgents, initialActivityLogs } from '../data/mockData'
import type { AgentInfo } from '../types'

export const AIWorkflowPage: React.FC = () => {
  const [agents, setAgents] = useState<AgentInfo[]>(initialAgents)
  const [selectedAgent, setSelectedAgent] = useState<AgentInfo>(initialAgents[2]) // Default Development Agent
  const [isPaused, setIsPaused] = useState(false)
  const [logsFilter, setLogsFilter] = useState<string>('all')

  const iconComponents: Record<string, React.ReactNode> = {
    ClipboardList: <ClipboardList className="w-5 h-5 text-indigo-400" />,
    Cpu: <Cpu className="w-5 h-5 text-purple-400" />,
    Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    Rocket: <Rocket className="w-5 h-5 text-rose-400" />
  }

  const filteredLogs = logsFilter === 'all'
    ? initialActivityLogs
    : initialActivityLogs.filter((l) => l.agentName.toLowerCase().includes(logsFilter.toLowerCase()))

  return (
    <div className="workflow-page-view">
      {/* Header Bar */}
      <div className="workflow-header-row">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="title-page">AI Agent Workflow</h1>
            <span className="badge badge-running">● Multi-Agent Live Execution</span>
          </div>
          <p className="subtitle">
            Coordinated autonomous software lifecycle orchestrated across 6 specialized LLM agents.
          </p>
        </div>

        <div className="workflow-control-actions">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`btn btn-sm ${isPaused ? 'btn-primary' : 'btn-secondary'}`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume Workflow' : 'Pause Execution'}</span>
          </button>
          <Link to="/development" className="btn btn-primary btn-sm">
            <Code2 className="w-3.5 h-3.5" />
            <span>Open IDE</span>
          </Link>
        </div>
      </div>

      {/* Main 2-Column Layout: Left (Orchestrator Visualizer & Agent Grid) | Right (AI Activity Stream) */}
      <div className="workflow-main-grid">
        {/* Left: Interactive Multi-Agent Canvas */}
        <div className="orchestrator-stage-column">
          {/* Central Orchestrator Hub Card */}
          <div className="orchestrator-master-node">
            <div className="hub-glow-ring ring-outer" />
            <div className="hub-glow-ring ring-inner" />
            
            <div className="master-node-content">
              <div className="master-avatar-box">
                <Bot className="w-8 h-8 text-indigo-400" />
                <span className="master-beacon" />
              </div>

              <div className="master-meta">
                <div className="flex items-center gap-2">
                  <h3 className="master-title">AI Agent Orchestrator</h3>
                  <span className="master-tag">CENTRAL HUB</span>
                </div>
                <p className="master-sub">
                  Dynamic DAG Scheduler • Context Memory Synchronization • Continuous Feedback Loop
                </p>
              </div>

              <div className="master-telemetry-pill">
                <div className="telemetry-item">
                  <span className="telemetry-label">Active Agents</span>
                  <span className="telemetry-val text-indigo-300">6 Coordinated</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-label">Bus Latency</span>
                  <span className="telemetry-val text-emerald-400">18ms</span>
                </div>
                <div className="telemetry-divider" />
                <div className="telemetry-item">
                  <span className="telemetry-label">Tokens Synced</span>
                  <span className="telemetry-val text-purple-300">97.8k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Flow Connectors Visualization */}
          <div className="svg-connector-canvas-box">
            <svg className="connector-svg" preserveAspectRatio="none" viewBox="0 0 1000 70">
              <defs>
                <linearGradient id="flowGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <line x1="60" y1="35" x2="940" y2="35" stroke="rgba(255,255,255,0.09)" strokeWidth="2.5" />
              <line
                x1="60"
                y1="35"
                x2="940"
                y2="35"
                stroke="url(#flowGlowGradient)"
                strokeWidth="2.5"
                strokeDasharray="10, 16"
                className="connector-pulse-line"
              />
            </svg>
          </div>

          {/* 6 Specialized Agents Grid */}
          <div className="agents-cards-grid">
            {agents.map((agent) => {
              const isSelected = selectedAgent.id === agent.id
              const isDone = agent.status === 'completed'
              const isRunning = agent.status === 'running'
              const isPending = agent.status === 'pending'

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`agent-detailed-card ${agent.status} ${isSelected ? 'selected' : ''}`}
                >
                  <div className="card-top-header">
                    <div className="agent-icon-box">
                      {iconComponents[agent.icon]}
                      {isRunning && <span className="running-halo" />}
                    </div>

                    <div className="agent-identity">
                      <h4 className="agent-heading">{agent.name}</h4>
                      <span className="agent-sub-role">{agent.role}</span>
                    </div>

                    <div className="status-badge-container">
                      {isDone && <span className="badge badge-completed">✓ Completed</span>}
                      {isRunning && <span className="badge badge-running">● Running</span>}
                      {isPending && <span className="badge badge-pending">○ Pending</span>}
                    </div>
                  </div>

                  <p className="agent-desc-text">{agent.description}</p>

                  <div className="agent-current-action">
                    <span className="bullet-indicator" />
                    <span className="action-label-text">
                      {agent.activeTask || 'Awaiting DAG orchestrator signal'}
                    </span>
                  </div>

                  <div className="agent-progress-box">
                    <ProgressBar
                      progress={agent.progress}
                      active={isRunning}
                      color={isDone ? 'emerald' : 'default'}
                      height={6}
                    />
                  </div>

                  <div className="agent-card-bottom-bar">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{agent.latency}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <FileText className="w-3 h-3" />
                      <span>{agent.artifactsGenerated.length} files</span>
                    </div>
                    <span className="inspect-pill-btn">
                      {isSelected ? 'Inspecting' : 'Click to Inspect'} →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Selected Agent Deep-Inspection Drawer */}
          {selectedAgent && (
            <div className="agent-deep-inspect-card">
              <div className="inspect-header">
                <div className="flex items-center gap-3">
                  <div className="inspect-avatar-box">
                    {iconComponents[selectedAgent.icon]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {selectedAgent.name}
                      <span className={`badge ${
                        selectedAgent.status === 'completed' ? 'badge-completed' :
                        selectedAgent.status === 'running' ? 'badge-running' : 'badge-pending'
                      }`}>
                        {selectedAgent.status.toUpperCase()}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">{selectedAgent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Tokens: <strong className="text-indigo-300 font-mono">{selectedAgent.tokensUsed?.toLocaleString()}</strong>
                  </span>
                </div>
              </div>

              <div className="grid-2 inspect-sub-details">
                <div className="inspect-box">
                  <h4 className="inspect-subhead">Generated Artifacts & Schemas</h4>
                  {selectedAgent.artifactsGenerated.length > 0 ? (
                    <div className="artifacts-list">
                      {selectedAgent.artifactsGenerated.map((art: string, idx: number) => (
                        <div key={idx} className="artifact-chip">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="font-mono text-xs text-slate-200">{art}</span>
                          <span className="text-[10px] text-emerald-400 ml-auto font-mono">Ready</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic mt-2">
                      No artifacts produced yet. Awaiting upstream compilation DAG signals.
                    </p>
                  )}
                </div>

                <div className="inspect-box">
                  <h4 className="inspect-subhead">Active Reasoning Trace</h4>
                  <div className="reasoning-trace-box">
                    <p className="text-xs text-slate-300 font-mono leading-relaxed">
                      &gt; [Context Window]: 128k unified memory pool<br />
                      &gt; [Goal]: {selectedAgent.activeTask}<br />
                      &gt; [State]: {selectedAgent.status === 'completed' ? 'Verified by Orchestrator' : 'Emitting AST tokens...'}<br />
                      &gt; [Latency]: {selectedAgent.latency} response time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: AI Activity Panel */}
        <div className="ai-activity-column">
          <Card
            title={
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <span>AI Activity</span>
              </div>
            }
            subtitle="Real-time multi-agent coordination log"
            badge={
              <span className="badge badge-ai">
                <span className="pulse-dot" /> Live Stream
              </span>
            }
            className="activity-panel-card"
          >
            <div className="activity-filter-pills">
              <button
                onClick={() => setLogsFilter('all')}
                className={`filter-chip ${logsFilter === 'all' ? 'active' : ''}`}
              >
                All Events
              </button>
              <button
                onClick={() => setLogsFilter('requirements')}
                className={`filter-chip ${logsFilter === 'requirements' ? 'active' : ''}`}
              >
                Req
              </button>
              <button
                onClick={() => setLogsFilter('architecture')}
                className={`filter-chip ${logsFilter === 'architecture' ? 'active' : ''}`}
              >
                Arch
              </button>
              <button
                onClick={() => setLogsFilter('development')}
                className={`filter-chip ${logsFilter === 'development' ? 'active' : ''}`}
              >
                Dev
              </button>
              <button
                onClick={() => setLogsFilter('testing')}
                className={`filter-chip ${logsFilter === 'testing' ? 'active' : ''}`}
              >
                Test
              </button>
            </div>

            <div className="live-activity-stream">
              {filteredLogs.map((log) => (
                <div key={log.id} className="live-log-row">
                  <div className="log-avatar-dot">
                    <span className="dot-inner" />
                  </div>
                  <div className="log-main-body">
                    <div className="log-title-time">
                      <span className="log-agent-name">{log.agentName}</span>
                      <span className="log-clock">{log.timestamp}</span>
                    </div>
                    <p className="log-message">{log.action}</p>
                    {log.details && (
                      <div className="log-extra-box">
                        <span>{log.details}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="activity-panel-footer">
              <span className="text-xs text-slate-400">Stream sync: 100% active</span>
              <button
                onClick={() => setAgents([...initialAgents])}
                className="btn btn-ghost btn-sm flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Telemetry</span>
              </button>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        .workflow-page-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .workflow-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .workflow-control-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .workflow-main-grid {
          display: grid;
          grid-template-columns: 1.6fr 0.95fr;
          gap: 24px;
          align-items: start;
        }
        .orchestrator-stage-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .orchestrator-master-node {
          position: relative;
          background: linear-gradient(135deg, rgba(20, 27, 45, 0.9), rgba(13, 18, 29, 0.9));
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 20px;
          padding: 24px 28px;
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.15);
          overflow: hidden;
        }
        .hub-glow-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .ring-outer {
          top: -40px;
          right: -40px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
        }
        .ring-inner {
          bottom: -30px;
          left: -30px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
        }
        .master-node-content {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          z-index: 2;
          flex-wrap: wrap;
        }
        .master-avatar-box {
          position: relative;
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.25));
          border: 1.5px solid rgba(99, 102, 241, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        .master-beacon {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: pulseDot 1.6s infinite;
        }
        .master-meta {
          flex: 1;
          min-width: 240px;
        }
        .master-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
        }
        .master-tag {
          font-size: 9.5px;
          font-family: var(--font-mono);
          padding: 2px 6px;
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          border-radius: 4px;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .master-sub {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .master-telemetry-pill {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
        }
        .telemetry-item {
          display: flex;
          flex-direction: column;
        }
        .telemetry-label {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .telemetry-val {
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-mono);
        }
        .telemetry-divider {
          width: 1px;
          height: 24px;
          background: var(--border-subtle);
        }
        .svg-connector-canvas-box {
          width: 100%;
          height: 28px;
          position: relative;
          margin: -10px 0;
        }
        .connector-svg {
          width: 100%;
          height: 100%;
        }
        .connector-pulse-line {
          animation: connectorFlow 12s linear infinite;
        }
        @keyframes connectorFlow {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
        .agents-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .agent-detailed-card {
          background: rgba(14, 20, 33, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .agent-detailed-card:hover {
          border-color: var(--border-medium);
          background: rgba(20, 28, 48, 0.9);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .agent-detailed-card.running {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.12);
        }
        .agent-detailed-card.selected {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4), var(--shadow-glow);
        }
        .card-top-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .agent-icon-box {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .running-halo {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px #6366f1;
          animation: pulseDot 1.5s infinite;
        }
        .agent-identity {
          flex: 1;
          min-width: 0;
        }
        .agent-heading {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agent-sub-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .agent-desc-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
          min-height: 34px;
        }
        .agent-current-action {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
        }
        .bullet-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #818cf8;
          flex-shrink: 0;
        }
        .action-label-text {
          font-size: 11px;
          color: #cbd5e1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agent-card-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
          font-size: 11px;
        }
        .inspect-pill-btn {
          color: #818cf8;
          font-weight: 500;
        }
        .agent-deep-inspect-card {
          background: rgba(16, 23, 38, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 16px;
          padding: 20px;
        }
        .inspect-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 16px;
        }
        .inspect-avatar-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inspect-subhead {
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .artifacts-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .artifact-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
        }
        .reasoning-trace-box {
          background: #090c14;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 12px;
        }
        .ai-activity-column {
          position: sticky;
          top: calc(var(--topbar-height) + 16px);
        }
        .activity-panel-card {
          padding: 20px;
        }
        .activity-filter-pills {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .filter-chip {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .filter-chip.active {
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border-color: rgba(99, 102, 241, 0.4);
        }
        .live-activity-stream {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 520px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .live-log-row {
          display: flex;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .log-avatar-dot {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 3px;
        }
        .dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 6px #818cf8;
        }
        .log-main-body {
          flex: 1;
        }
        .log-title-time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
        }
        .log-agent-name {
          font-size: 12px;
          font-weight: 600;
          color: #e2e8f0;
        }
        .log-clock {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .log-message {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .log-extra-box {
          font-size: 11px;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.02);
          border-left: 2px solid #818cf8;
          padding: 4px 8px;
          margin-top: 6px;
          border-radius: 0 4px 4px 0;
        }
        .activity-panel-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          margin-top: 16px;
        }
        @media (max-width: 1200px) {
          .workflow-main-grid {
            grid-template-columns: 1fr;
          }
          .agents-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .agents-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
