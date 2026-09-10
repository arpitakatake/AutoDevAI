import React from 'react'
import {
  ClipboardList,
  Cpu,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Clock,
  ChevronRight,
  FileText
} from 'lucide-react'
import type { AgentInfo } from '../types'
import { ProgressBar } from './ProgressBar'

interface AgentCardProps {
  agent: AgentInfo
  isSelected?: boolean
  onClick?: () => void
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected = false, onClick }) => {
  const iconMap: Record<string, React.ReactNode> = {
    ClipboardList: <ClipboardList className="w-5 h-5 text-indigo-400" />,
    Cpu: <Cpu className="w-5 h-5 text-purple-400" />,
    Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    Rocket: <Rocket className="w-5 h-5 text-rose-400" />
  }

  const statusBadges = {
    completed: {
      label: '✓ Completed',
      class: 'badge-completed'
    },
    running: {
      label: '● Running',
      class: 'badge-running'
    },
    pending: {
      label: '○ Pending',
      class: 'badge-pending'
    },
    failed: {
      label: '✕ Failed',
      class: 'badge-danger'
    }
  }

  const badgeInfo = statusBadges[agent.status]

  return (
    <div
      onClick={onClick}
      className={`agent-card ${agent.status} ${isSelected ? 'selected' : ''}`}
    >
      {/* Top Header */}
      <div className="agent-card-top">
        <div className="agent-icon-wrapper">
          {iconMap[agent.icon] || <Cpu className="w-5 h-5 text-indigo-400" />}
          {agent.status === 'running' && <span className="agent-active-pulse" />}
        </div>
        <div className="agent-title-info">
          <div className="agent-name-row">
            <h4 className="agent-name">{agent.name}</h4>
          </div>
          <span className="agent-role">{agent.role}</span>
        </div>
        <span className={`badge ${badgeInfo.class}`}>{badgeInfo.label}</span>
      </div>

      {/* Description */}
      <p className="agent-description">{agent.description}</p>

      {/* Current Active Task / Artifact */}
      {agent.activeTask && (
        <div className="agent-active-task-box">
          <span className="task-indicator" />
          <span className="task-text">{agent.activeTask}</span>
        </div>
      )}

      {/* Progress */}
      <div className="agent-card-progress">
        <ProgressBar
          progress={agent.progress}
          showPercentage={true}
          active={agent.status === 'running'}
          color={agent.status === 'completed' ? 'emerald' : 'default'}
        />
      </div>

      {/* Footer Metrics */}
      <div className="agent-card-footer">
        <div className="footer-metric">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{agent.latency}</span>
        </div>
        <div className="footer-artifacts">
          <FileText className="w-3 h-3 text-slate-400" />
          <span>{agent.artifactsGenerated.length} artifacts</span>
        </div>
        <div className="inspect-cta">
          <span>Inspect</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <style>{`
        .agent-card {
          background: rgba(15, 21, 35, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all 0.22s ease;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
        }
        .agent-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
          background: rgba(19, 27, 46, 0.85);
          box-shadow: var(--shadow-md);
        }
        .agent-card.running {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.12);
        }
        .agent-card.selected {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3), var(--shadow-glow);
        }
        .agent-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .agent-icon-wrapper {
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
        .agent-active-pulse {
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
        .agent-title-info {
          flex: 1;
          min-width: 0;
        }
        .agent-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .agent-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .agent-description {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .agent-active-task-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
        }
        .task-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #818cf8;
          flex-shrink: 0;
        }
        .task-text {
          font-size: 11.5px;
          color: #cbd5e1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agent-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          font-size: 11px;
          color: var(--text-muted);
        }
        .footer-metric, .footer-artifacts, .inspect-cta {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .inspect-cta {
          color: #818cf8;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
