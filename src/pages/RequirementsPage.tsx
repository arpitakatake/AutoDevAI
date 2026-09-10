import React, { useState } from 'react'
import {
  FileCheck,
  CheckCircle2,
  Edit3,
  RotateCcw,
  Check,
  Shield,
  Zap,
  Maximize2,
  Award
} from 'lucide-react'
import { Card } from '../components/Card'
import { initialFunctionalRequirements, initialNonFunctionalRequirements } from '../data/mockData'
import type { FunctionalRequirement, NonFunctionalRequirement } from '../types'

export const RequirementsPage: React.FC = () => {
  const [funcReqs, setFuncReqs] = useState<FunctionalRequirement[]>(initialFunctionalRequirements)
  const [nfrReqs] = useState<NonFunctionalRequirement[]>(initialNonFunctionalRequirements)
  const [editingReqId, setEditingReqId] = useState<string | null>(null)
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const showToast = (msg: string) => {
    setNotificationMsg(msg)
    setTimeout(() => setNotificationMsg(null), 3500)
  }

  const handleApproveAll = () => {
    setFuncReqs(funcReqs.map((r) => ({ ...r, status: 'Approved' })))
    showToast('✓ All 5 Functional Requirements have been officially approved!')
  }

  const toggleStatus = (id: string) => {
    setFuncReqs(
      funcReqs.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Approved' ? 'Review' : 'Approved'
          return { ...r, status: nextStatus }
        }
        return r
      })
    )
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)
    setTimeout(() => {
      setIsRegenerating(false)
      showToast('✨ Requirements regenerated with latest student productivity guidelines!')
    }, 1200)
  }

  const categoryIcons: Record<string, React.ReactNode> = {
    Security: <Shield className="w-4 h-4 text-rose-400" />,
    Performance: <Zap className="w-4 h-4 text-amber-400" />,
    Scalability: <Maximize2 className="w-4 h-4 text-cyan-400" />,
    Reliability: <Award className="w-4 h-4 text-emerald-400" />
  }

  return (
    <div className="requirements-view">
      {/* Toast banner */}
      {notificationMsg && (
        <div className="toast-notification">
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header with Actions */}
      <div className="req-header-row">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="title-page">Software Requirements Specification (SRS)</h1>
            <span className="badge badge-completed">5/5 Approved</span>
          </div>
          <p className="subtitle">
            Synthesized by <strong>Requirements Agent</strong> from user prompt with automated acceptance criteria.
          </p>
        </div>

        <div className="req-actions-group">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate with AI'}</span>
          </button>
          <button onClick={handleApproveAll} className="btn btn-primary btn-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve All Specs</span>
          </button>
        </div>
      </div>

      {/* Functional Requirements Section */}
      <div className="req-section-block">
        <div className="section-title-bar">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-indigo-400" />
            <h2 className="title-section">Functional Requirements</h2>
            <span className="text-xs font-mono text-slate-400">({funcReqs.length} Modules)</span>
          </div>
          <span className="text-xs text-slate-400">Click status badge to toggle Approval</span>
        </div>

        <div className="func-cards-list">
          {funcReqs.map((req) => (
            <Card
              key={req.id}
              className="req-card"
              title={
                <div className="flex items-center gap-3">
                  <span className="req-id-tag">{req.id.toUpperCase()}</span>
                  <span className="text-base font-semibold">{req.title}</span>
                </div>
              }
              badge={
                <button
                  onClick={() => toggleStatus(req.id)}
                  className={`badge cursor-pointer ${
                    req.status === 'Approved' ? 'badge-completed' : 'badge-warning'
                  }`}
                  title="Click to toggle status"
                >
                  {req.status === 'Approved' ? '✓ Approved' : '● Review Required'}
                </button>
              }
              action={
                <div className="flex items-center gap-2">
                  <span className={`priority-chip ${req.priority.toLowerCase()}`}>
                    {req.priority} Priority
                  </span>
                  <button
                    onClick={() => {
                      setEditingReqId(editingReqId === req.id ? null : req.id)
                    }}
                    className="btn btn-ghost btn-sm text-slate-400 hover:text-white"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{editingReqId === req.id ? 'Close' : 'Edit'}</span>
                  </button>
                </div>
              }
            >
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{req.description}</p>

              {/* Acceptance Criteria */}
              <div className="criteria-container">
                <span className="criteria-heading">Acceptance Criteria (Gherkin/BDD):</span>
                <ul className="criteria-list">
                  {req.acceptanceCriteria.map((crit: string, idx: number) => (
                    <li key={idx} className="criteria-item">
                      <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inline Editor Drawer */}
              {editingReqId === req.id && (
                <div className="req-inline-editor">
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Modify Requirement Specification:
                  </label>
                  <textarea
                    defaultValue={req.description}
                    rows={2}
                    className="editor-textarea"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setEditingReqId(null)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setEditingReqId(null)
                        showToast(`Updated requirement ${req.id}!`)
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Non-Functional Requirements Section */}
      <div className="req-section-block">
        <div className="section-title-bar">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h2 className="title-section">Non-Functional Requirements (NFR)</h2>
          </div>
          <span className="text-xs text-slate-400">Architectural quality attributes & SLAs</span>
        </div>

        <div className="grid-2 nfr-grid">
          {nfrReqs.map((nfr) => (
            <Card
              key={nfr.id}
              title={
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-white/5 border border-white/10">
                    {categoryIcons[nfr.category]}
                  </div>
                  <span className="text-sm font-bold">{nfr.category}</span>
                </div>
              }
              badge={<span className="badge badge-completed">{nfr.status}</span>}
            >
              <div className="nfr-target-row mb-2">
                <span className="text-xs text-slate-400">Target Standard:</span>
                <span className="text-xs font-mono font-semibold text-indigo-300 ml-1">
                  {nfr.target}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{nfr.description}</p>
              <div className="nfr-metric-box">
                <span className="text-[11px] text-slate-400">Telemetry Metric:</span>
                <span className="text-[11px] font-mono text-emerald-400 ml-1 font-semibold">
                  {nfr.metrics}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        .requirements-view {
          display: flex;
          flex-direction: column;
          gap: 28px;
          position: relative;
        }
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #10b981;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 10px;
          box-shadow: var(--shadow-md);
          font-size: 13px;
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.25s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .req-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .req-actions-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .req-section-block {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-title-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 8px;
        }
        .func-cards-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .req-card {
          padding: 20px;
        }
        .req-id-tag {
          font-size: 10px;
          font-family: var(--font-mono);
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .priority-chip {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .priority-chip.high {
          background: rgba(244, 63, 94, 0.1);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.25);
        }
        .priority-chip.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.25);
        }
        .criteria-container {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 12px 14px;
        }
        .criteria-heading {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
        }
        .criteria-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .criteria-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: #cbd5e1;
        }
        .req-inline-editor {
          margin-top: 14px;
          padding: 12px;
          background: #080c14;
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 8px;
        }
        .editor-textarea {
          width: 100%;
          background: #0d121f;
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          padding: 8px;
          color: #ffffff;
          font-size: 13px;
        }
        .nfr-target-row {
          display: flex;
          align-items: center;
        }
        .nfr-metric-box {
          padding: 8px 10px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 6px;
        }
      `}</style>
    </div>
  )
}
