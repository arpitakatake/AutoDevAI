import React from 'react'
import {
  Bot,
  ClipboardList,
  Cpu,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import type { AgentInfo } from '../types'

interface WorkflowVisualizationProps {
  agents: AgentInfo[]
  selectedAgentId?: string
  onSelectAgent?: (agent: AgentInfo) => void
  mode?: 'full' | 'compact' | 'pipeline'
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
  mode = 'full'
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    ClipboardList: <ClipboardList className="w-4 h-4" />,
    Cpu: <Cpu className="w-4 h-4" />,
    Code2: <Code2 className="w-4 h-4" />,
    CheckCircle2: <CheckCircle2 className="w-4 h-4" />,
    ShieldCheck: <ShieldCheck className="w-4 h-4" />,
    Rocket: <Rocket className="w-4 h-4" />
  }

  const getStatusBadge = (status: AgentInfo['status']) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge badge-completed">✓ Completed</span>
      case 'running':
        return <span className="status-badge badge-running">● Running</span>
      case 'pending':
        return <span className="status-badge badge-pending">○ Pending</span>
      default:
        return null
    }
  }

  return (
    <div className={`workflow-viz-container ${mode}`}>
      {/* Visual Orchestration Canvas */}
      <div className="orchestrator-canvas">
        {/* Central Orchestrator Node */}
        <div className="central-orchestrator-hub">
          <div className="pulsing-halo ring-1" />
          <div className="pulsing-halo ring-2" />
          <div className="orchestrator-core">
            <div className="core-icon-box">
              <Bot className="w-7 h-7 text-indigo-400" />
              <span className="live-core-beacon" />
            </div>
            <div className="core-title-box">
              <h3 className="core-heading">AI Agent Orchestrator</h3>
              <p className="core-subheading">Event-Driven Multi-Agent DAG Bus</p>
            </div>
            <div className="core-metrics-pill">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>6 Agents • Real-Time Sync</span>
            </div>
          </div>
        </div>

        {/* Animated Connector Visualizer (SVG lines with traveling dash/glow) */}
        <div className="workflow-connectors-wrapper">
          <svg className="connector-svg" preserveAspectRatio="none" viewBox="0 0 1000 120">
            <defs>
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 50,60 L 950,60"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 50,60 L 950,60"
              stroke="url(#lineGlow)"
              strokeWidth="3"
              strokeDasharray="8, 12"
              className="animated-flow-line"
              fill="none"
            />
          </svg>
        </div>

        {/* Coordinated Agents Pipeline / Grid */}
        <div className="agents-horizontal-flow">
          {agents.map((agent, index) => {
            const isSelected = selectedAgentId === agent.id
            return (
              <div
                key={agent.id}
                onClick={() => onSelectAgent && onSelectAgent(agent)}
                className={`agent-flow-node ${agent.status} ${isSelected ? 'selected' : ''}`}
              >
                <div className="node-step-index">0{index + 1}</div>
                <div className="node-icon-box">
                  {iconMap[agent.icon] || <Cpu className="w-4 h-4" />}
                </div>
                <div className="node-content">
                  <div className="node-title-row">
                    <span className="node-name">{agent.name}</span>
                  </div>
                  <div className="node-status-row">{getStatusBadge(agent.status)}</div>
                  <div className="node-progress-mini">
                    <div
                      className="node-progress-bar"
                      style={{
                        width: `${agent.progress}%`,
                        backgroundColor:
                          agent.status === 'completed'
                            ? '#10b981'
                            : agent.status === 'running'
                            ? '#6366f1'
                            : '#475569'
                      }}
                    />
                  </div>
                </div>
                {index < agents.length - 1 && (
                  <div className="node-arrow">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .workflow-viz-container {
          background: rgba(13, 18, 29, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 32px 24px;
          position: relative;
          overflow: hidden;
        }
        .orchestrator-canvas {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          gap: 28px;
        }
        .central-orchestrator-hub {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .pulsing-halo {
          position: absolute;
          border-radius: var(--radius-xl);
          pointer-events: none;
        }
        .ring-1 {
          inset: -8px;
          border: 1px solid rgba(99, 102, 241, 0.3);
          animation: pulseRing 3s infinite ease-in-out;
        }
        .ring-2 {
          inset: -16px;
          border: 1px solid rgba(139, 92, 246, 0.15);
          animation: pulseRing 3s infinite ease-in-out 1.5s;
        }
        @keyframes pulseRing {
          0% { transform: scale(0.97); opacity: 0.8; }
          50% { transform: scale(1.03); opacity: 0.3; }
          100% { transform: scale(0.97); opacity: 0.8; }
        }
        .orchestrator-core {
          background: linear-gradient(135deg, rgba(20, 27, 45, 0.95), rgba(15, 20, 33, 0.95));
          border: 1.5px solid rgba(99, 102, 241, 0.5);
          border-radius: 18px;
          padding: 16px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.25);
          backdrop-filter: blur(12px);
        }
        .core-icon-box {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .live-core-beacon {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
        }
        .core-title-box {
          display: flex;
          flex-direction: column;
        }
        .core-heading {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }
        .core-subheading {
          font-size: 11.5px;
          color: var(--text-secondary);
        }
        .core-metrics-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #c7d2fe;
          font-size: 11px;
          font-weight: 600;
        }
        .workflow-connectors-wrapper {
          width: 100%;
          height: 24px;
          position: relative;
          margin: -10px 0;
        }
        .connector-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .animated-flow-line {
          animation: flowDash 15s linear infinite;
        }
        @keyframes flowDash {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
        .agents-horizontal-flow {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          width: 100%;
          z-index: 5;
        }
        .agent-flow-node {
          background: rgba(17, 24, 39, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .agent-flow-node:hover {
          border-color: var(--border-medium);
          background: rgba(22, 32, 54, 0.85);
          transform: translateY(-2px);
        }
        .agent-flow-node.running {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
        }
        .agent-flow-node.selected {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.35);
        }
        .node-step-index {
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .node-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a5b4fc;
        }
        .node-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .node-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .node-status-row {
          display: flex;
          align-items: center;
        }
        .status-badge {
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 999px;
          line-height: 1.3;
        }
        .node-progress-mini {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
          margin-top: 4px;
        }
        .node-progress-bar {
          height: 100%;
          border-radius: 999px;
          transition: width 0.3s;
        }
        .node-arrow {
          display: none;
        }
        @media (max-width: 1024px) {
          .agents-horizontal-flow {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .agents-horizontal-flow {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
