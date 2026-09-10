import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderKanban,
  FileCheck,
  Cpu,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Layers,
  ArrowUpRight
} from 'lucide-react'
import { Card } from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'
import { mockProject } from '../data/mockData'

export const ProjectDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const sections = [
    {
      id: 'requirements',
      name: 'Requirements',
      icon: FileCheck,
      status: 'Approved (5/5)',
      progress: 100,
      path: '/requirements',
      summary: '5 functional epics and 4 non-functional benchmarks defined and approved.'
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: Cpu,
      status: 'Verified (C4 + Schema)',
      progress: 100,
      path: '/architecture',
      summary: 'React 19 + Node.js REST API + MongoDB Atlas document models configured.'
    },
    {
      id: 'development',
      name: 'Development',
      icon: Code2,
      status: 'In Progress (82%)',
      progress: 82,
      path: '/development',
      summary: 'Synthesizing KanbanBoard.tsx, drag-and-drop state, and taskService client.'
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: CheckCircle2,
      status: '95.9% Passed',
      progress: 96,
      path: '/testing',
      summary: '142 unit and integration tests passed; 6 boundary tests running.'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheck,
      status: 'Score: 94/100',
      progress: 94,
      path: '/security',
      summary: 'SAST inspection clean, OWASP Top 10 validated, 0 critical alerts.'
    },
    {
      id: 'deployment',
      name: 'Deployment',
      icon: Rocket,
      status: 'Ready for Staging',
      progress: 75,
      path: '/deployment',
      summary: 'Docker image built and tagged; Kubernetes cluster manifests prepared.'
    }
  ]

  const timelineEvents = [
    { time: '14:30', title: 'Project Initialized', desc: 'Natural language idea ingested by AI Orchestrator', done: true },
    { time: '14:31', title: 'Requirements Synthesized', desc: 'Requirements Agent drafted PRD & user stories', done: true },
    { time: '14:32', title: 'Architecture Verified', desc: 'Architecture Agent generated C4 diagram & OpenAPI 3.1 spec', done: true },
    { time: '14:34', title: 'Component Synthesis', desc: 'Development Agent generated React component tree & Zustand store', current: true },
    { time: '14:36', title: 'Continuous QA & Testing', desc: 'Testing Agent running Vitest suites (142 passed)', upcoming: true },
    { time: '14:38', title: 'Automated Container Deployment', desc: 'Deploying to staging Kubernetes cluster', upcoming: true }
  ]

  return (
    <div className="project-details-view">
      <div className="details-header-card">
        <div className="details-title-row">
          <div className="flex items-center gap-3">
            <div className="project-avatar-badge">
              <FolderKanban className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="title-page">{mockProject.name}</h1>
                <span className="badge badge-running">AI Development in Progress</span>
              </div>
              <p className="subtitle">Project ID: {mockProject.id} • Created today at {mockProject.createdAt}</p>
            </div>
          </div>

          <div className="details-header-buttons">
            <Link to="/workflow" className="btn btn-secondary btn-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>Inspect Workflow</span>
            </Link>
            <Link to="/development" className="btn btn-primary btn-sm">
              <Code2 className="w-3.5 h-3.5" />
              <span>Launch IDE</span>
            </Link>
          </div>
        </div>

        <div className="header-progress-wrap">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              End-to-End SDLC Completion
            </span>
            <span className="text-sm font-bold font-mono text-indigo-300">{mockProject.progress}%</span>
          </div>
          <ProgressBar progress={mockProject.progress} height={10} showPercentage={false} />
        </div>
      </div>

      <div className="details-tabs-bar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          Project Overview
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
        >
          Execution Timeline
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="overview-tab-content">
          <Card title="Application Specification Prompt" subtitle="Natural language prompt analyzed by AI Orchestrator">
            <div className="prompt-display-quote">
              <p className="text-slate-200 text-sm leading-relaxed">
                "{mockProject.ideaPrompt}"
              </p>
            </div>
          </Card>

          <div className="grid-3 phase-modules-grid">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Card
                  key={section.id}
                  title={
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold">{section.name}</span>
                    </div>
                  }
                  badge={
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {section.status}
                    </span>
                  }
                  action={
                    <Link to={section.path} className="text-slate-400 hover:text-white" title={`Open ${section.name}`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  }
                >
                  <p className="text-xs text-slate-400 mb-4 min-h-[34px]">{section.summary}</p>
                  <ProgressBar progress={section.progress} height={5} showPercentage={true} />
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <Card title="Orchestration Milestone Timeline" subtitle="End-to-End autonomous generation chronology">
          <div className="timeline-container">
            {timelineEvents.map((evt, idx) => (
              <div key={idx} className="timeline-node-row">
                <div className="timeline-time-col font-mono text-xs text-slate-400">{evt.time}</div>
                <div className="timeline-graphic-col">
                  <div className={`timeline-bullet ${evt.done ? 'bullet-done' : evt.current ? 'bullet-current' : 'bullet-upcoming'}`} />
                  {idx < timelineEvents.length - 1 && <div className="timeline-vertical-line" />}
                </div>
                <div className="timeline-text-col">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    {evt.title}
                    {evt.done && <span className="text-[10px] text-emerald-400 font-mono">✓ Passed</span>}
                    {evt.current && <span className="text-[10px] text-indigo-400 font-mono">● Active</span>}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <style>{`
        .project-details-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .details-header-card {
          background: rgba(14, 20, 33, 0.85);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 26px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .details-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .project-avatar-badge {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .details-header-buttons {
          display: flex;
          gap: 10px;
        }
        .header-progress-wrap {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 14px 18px;
        }
        .details-tabs-bar {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 4px;
        }
        .tab-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .tab-btn.active {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .overview-tab-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .prompt-display-quote {
          background: rgba(0, 0, 0, 0.25);
          border-left: 3px solid #6366f1;
          padding: 14px 18px;
          border-radius: 0 10px 10px 0;
        }
        .phase-modules-grid {
          margin-top: 4px;
        }
        .timeline-container {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
        }
        .timeline-node-row {
          display: flex;
          gap: 20px;
          position: relative;
          padding-bottom: 24px;
        }
        .timeline-time-col {
          width: 50px;
          text-align: right;
          padding-top: 2px;
        }
        .timeline-graphic-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .timeline-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          z-index: 2;
        }
        .bullet-done {
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .bullet-current {
          background: #6366f1;
          box-shadow: 0 0 10px #6366f1;
          animation: pulseDot 1.5s infinite;
        }
        .bullet-upcoming {
          background: #334155;
          border: 2px solid #64748b;
        }
        .timeline-vertical-line {
          position: absolute;
          top: 12px;
          bottom: -12px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
        }
        .timeline-text-col {
          flex: 1;
        }
        @media (max-width: 900px) {
          .phase-modules-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
