import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Bot,
  ArrowRight,
  FileCheck,
  Cpu,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Check
} from 'lucide-react'
import { Card } from '../components/Card'

export const NewProjectPage: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'Build a task management application where students can create tasks, set deadlines, track progress and receive reminders.'
  )
  const [projectName, setProjectName] = useState('Task Management App')
  const [techStack, setTechStack] = useState('React 19 + Node.js REST API')
  const [dbTarget, setDbTarget] = useState('MongoDB Atlas')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)

  const navigate = useNavigate()

  const presets = [
    {
      title: 'Student Task Manager',
      prompt:
        'Build a task management application where students can create tasks, set deadlines, track progress and receive reminders.',
      stack: 'React 19 + Node.js REST API',
      db: 'MongoDB Atlas'
    },
    {
      title: 'Real-Time Team Chat',
      prompt:
        'Build a real-time messaging application with team channels, direct messages, markdown support, and file uploads.',
      stack: 'Next.js + WebSocket Gateway',
      db: 'PostgreSQL + Redis'
    },
    {
      title: 'E-Commerce Marketplace',
      prompt:
        'Build a modern multi-vendor storefront with shopping cart, Stripe checkout integration, inventory tracking, and order history.',
      stack: 'React 19 + Express Microservices',
      db: 'PostgreSQL'
    }
  ]

  const deliverables = [
    {
      title: 'Requirements Spec',
      icon: FileCheck,
      desc: 'PRD, functional user stories & non-functional targets',
      color: '#3b82f6'
    },
    {
      title: 'System Architecture',
      icon: Cpu,
      desc: 'C4 component diagram, REST contracts & database schemas',
      color: '#06b6d4'
    },
    {
      title: 'Development Plan',
      icon: Code2,
      desc: 'React component hierarchy, state machine & API client stubs',
      color: '#10b981'
    },
    {
      title: 'Testing Strategy',
      icon: CheckCircle2,
      desc: 'Automated Vitest unit specs, mock fixtures & boundary tests',
      color: '#f59e0b'
    },
    {
      title: 'Security Checks',
      icon: ShieldCheck,
      desc: 'OWASP Top 10 validation, AST audits & secret scanning',
      color: '#ef4444'
    },
    {
      title: 'Deployment Plan',
      icon: Rocket,
      desc: 'Multi-stage Dockerfile, CI/CD pipeline & Kubernetes specs',
      color: '#ec4899'
    }
  ]

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGenerationStep(1)

    setTimeout(() => setGenerationStep(2), 700)
    setTimeout(() => setGenerationStep(3), 1400)
    setTimeout(() => {
      sessionStorage.setItem('autodevai_prompt', prompt)
      sessionStorage.setItem('autodevai_project_name', projectName)
      navigate('/workflow')
    }, 2200)
  }

  return (
    <div className="new-project-view">
      <div className="page-header-row">
        <div>
          <h1 className="title-page">Start a New Project</h1>
          <p className="subtitle">
            Provide a natural-language description and let AutoDevAI orchestrate the full SDLC.
          </p>
        </div>
        <div className="badge badge-ai">
          <Bot className="w-3.5 h-3.5" />
          Autonomous Dispatcher
        </div>
      </div>

      <div className="new-project-layout">
        <div className="form-column">
          <Card className="prompt-input-card" glow="indigo">
            <form onSubmit={handleGenerate} className="prompt-form">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Task Management App"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <div className="label-with-hint">
                  <label className="form-label">
                    Describe your application idea in natural language
                  </label>
                  <span className="char-count">Auto-Prompt Optimizer Active</span>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your application idea in natural language… (e.g. Build a task management application where students can create tasks, set deadlines, track progress and receive reminders.)"
                  rows={6}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="presets-block">
                <span className="preset-heading">Or choose a pre-configured architecture template:</span>
                <div className="presets-grid">
                  {presets.map((preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => {
                        setProjectName(preset.title)
                        setPrompt(preset.prompt)
                        setTechStack(preset.stack)
                        setDbTarget(preset.db)
                      }}
                      className="preset-pill-btn"
                    >
                      <span className="preset-title">{preset.title}</span>
                      <span className="preset-stack">{preset.stack}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid-2 tech-options-row">
                <div className="form-group">
                  <label className="form-label">Target Architecture Stack</label>
                  <select
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="form-select"
                  >
                    <option value="React 19 + Node.js REST API">React 19 + Node.js Express (REST)</option>
                    <option value="Next.js 15 App Router">Next.js 15 App Router + Server Actions</option>
                    <option value="FastAPI + React 19">FastAPI + React 19 + Pydantic</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Persistence Layer</label>
                  <select
                    value={dbTarget}
                    onChange={(e) => setDbTarget(e.target.value)}
                    className="form-select"
                  >
                    <option value="MongoDB Atlas">MongoDB Atlas (NoSQL Document)</option>
                    <option value="PostgreSQL + Prisma">PostgreSQL + Prisma ORM</option>
                    <option value="Redis + DynamoDB">Redis Cache + DynamoDB</option>
                  </select>
                </div>
              </div>

              <div className="submit-action-row">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn btn-primary btn-lg generate-submit-btn"
                >
                  {isGenerating ? (
                    <>
                      <span className="loading-spinner" />
                      <span>
                        {generationStep === 1 && 'Extracting Requirements...'}
                        {generationStep === 2 && 'Synthesizing Architecture...'}
                        {generationStep === 3 && 'Dispatching Agent Fleet...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Development Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Card>
        </div>

        <div className="preview-column">
          <Card
            title="AI Coordinated Deliverables"
            subtitle="Autonomous multi-agent generation pipeline"
            className="deliverables-card"
          >
            <div className="deliverables-list">
              {deliverables.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="deliverable-item">
                    <div className="check-bullet">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div
                      className="deliverable-icon-box"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}35`,
                        color: item.color
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="deliverable-text">
                      <h4 className="deliverable-title">{item.title}</h4>
                      <p className="deliverable-desc">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="fleet-orchestration-summary">
              <div className="orchestrator-mini-header">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-xs text-slate-200">
                  Orchestrator Guarantee
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                All generated code, schemas, and test suites adhere to enterprise-grade standards.
                Review, modify, or approve each stage at any time during execution.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        .new-project-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .new-project-layout {
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 24px;
          align-items: start;
        }
        .prompt-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .label-with-hint {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .char-count {
          font-size: 11px;
          color: #818cf8;
          font-family: var(--font-mono);
        }
        .form-input, .form-textarea, .form-select {
          background: #080c14;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px 14px;
          color: #ffffff;
          font-size: 14px;
          transition: all 0.2s;
        }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.25);
        }
        .form-textarea {
          resize: vertical;
          line-height: 1.6;
        }
        .presets-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .preset-heading {
          font-size: 11.5px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .presets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .preset-pill-btn {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          text-align: left;
          transition: all 0.2s;
        }
        .preset-pill-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
        .preset-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .preset-stack {
          font-size: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .tech-options-row {
          padding-top: 6px;
        }
        .submit-action-row {
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        .generate-submit-btn {
          width: 100%;
          padding: 14px;
        }
        .deliverables-card {
          padding: 24px;
        }
        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .deliverable-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          transition: background 0.15s;
        }
        .deliverable-item:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .check-bullet {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .deliverable-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .deliverable-text {
          flex: 1;
        }
        .deliverable-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .deliverable-desc {
          font-size: 11.5px;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.4;
        }
        .fleet-orchestration-summary {
          margin-top: 20px;
          padding: 14px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
        .orchestrator-mini-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @media (max-width: 1024px) {
          .new-project-layout {
            grid-template-columns: 1fr;
          }
          .presets-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
