import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Bot,
  ShieldCheck,
  Code2,
  Cpu,
  ChevronRight,
  CheckCircle2,
  FileCheck,
  Rocket
} from 'lucide-react'
import { Navbar } from '../components/Navbar'

export const LandingPage: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'Build a task management application for college students where they can create tasks, set deadlines, track progress on a Kanban board, and receive automated study reminders.'
  )
  const navigate = useNavigate()

  const samplePrompts = [
    'Build a task management application for college students',
    'AI-powered Customer Support ticket triaging microservice',
    'Real-time collaborative markdown editor with WebSocket sync',
    'Fintech wallet with dual-currency balance and ledger auditing'
  ]

  const handleStartBuilding = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('autodevai_prompt', prompt)
    navigate('/workflow')
  }

  const workflowSteps = [
    { title: 'User Idea', icon: Sparkles, desc: 'Natural Language Input', color: '#a855f7' },
    { title: 'AI Orchestrator', icon: Bot, desc: 'Autonomous DAG Engine', color: '#6366f1', highlight: true },
    { title: 'Requirements', icon: FileCheck, desc: 'PRD & Acceptance Criteria', color: '#3b82f6' },
    { title: 'Architecture', icon: Cpu, desc: 'C4 & OpenAPI Contracts', color: '#06b6d4' },
    { title: 'Development', icon: Code2, desc: 'React & Node.js Synthesis', color: '#10b981' },
    { title: 'Testing', icon: CheckCircle2, desc: 'Vitest & E2E Suites', color: '#f59e0b' },
    { title: 'Security', icon: ShieldCheck, desc: 'SAST & OWASP Audit', color: '#ef4444' },
    { title: 'Deployment', icon: Rocket, desc: 'Docker & Kubernetes', color: '#ec4899' }
  ]

  return (
    <div className="landing-wrapper">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="glow-sphere sphere-1" />
        <div className="glow-sphere sphere-2" />

        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous Software Engineering Platform</span>
            <span className="pill-divider">•</span>
            <span className="pill-tag">Final-Year Research Prototype</span>
          </div>

          <h1 className="hero-headline">
            From Idea to <span className="gradient-text">Production-Ready</span> Software.
          </h1>

          <p className="hero-subtext">
            AutoDevAI transforms a natural-language idea into a complete, verified, and deployed
            software system using coordinated autonomous AI agents across the entire SDLC.
          </p>

          {/* Interactive Idea Input Box */}
          <form onSubmit={handleStartBuilding} className="prompt-builder-card">
            <div className="input-header">
              <span className="input-label">Describe your application idea in natural language</span>
              <span className="input-mode-badge">Multi-Agent Planner Enabled</span>
            </div>

            <div className="input-textarea-wrapper">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your application idea... (e.g. Build a task management application for college students)"
                rows={3}
                className="hero-textarea"
              />
            </div>

            <div className="sample-prompts-row">
              <span className="sample-label">Examples:</span>
              <div className="samples-scroll">
                {samplePrompts.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(s)}
                    className="sample-chip"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="prompt-action-footer">
              <div className="model-notice">
                <span className="status-ping" />
                <span>6 Specialized AI Agents Ready to Orchestrate</span>
              </div>
              <button type="submit" className="btn btn-primary btn-lg start-btn">
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Visual AI Workflow Illustration */}
      <section className="workflow-illustration-section">
        <div className="section-header-block">
          <div className="badge badge-ai">Autonomous SDLC Pipeline</div>
          <h2 className="title-hero" style={{ fontSize: '32px' }}>
            The Coordinated Multi-Agent Architecture
          </h2>
          <p className="subtitle" style={{ maxWidth: '640px', margin: '8px auto 0' }}>
            Every stage of software engineering is delegated to a domain-specialized agent,
            coordinated by the central AI Orchestrator.
          </p>
        </div>

        <div className="pipeline-flow-container">
          <div className="pipeline-track">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={idx} className="flow-step-wrapper">
                  <div className={`flow-step-card ${step.highlight ? 'hub-highlight' : ''}`}>
                    <div
                      className="step-icon-bubble"
                      style={{
                        backgroundColor: `${step.color}15`,
                        borderColor: `${step.color}40`,
                        color: step.color
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="step-info">
                      <span className="step-num">STAGE 0{idx + 1}</span>
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="flow-arrow-separator">
                      <div className="pulsing-line" />
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="features-grid-section">
        <div className="feature-card">
          <div className="feature-icon-box">
            <Cpu className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="feature-title">Autonomous Orchestration</h3>
          <p className="feature-text">
            DAG-based workflow coordinator ensures requirements directly inform architecture, which
            guides code synthesis and unit testing without human friction.
          </p>
          <div className="feature-tag">Event-Driven Bus</div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <Code2 className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="feature-title">Production React & Node.js</h3>
          <p className="feature-text">
            Generates modular TypeScript, state-driven UI components, typed REST APIs, and database
            schemas with zero placeholder boilerplate.
          </p>
          <div className="feature-tag">AST Code Synthesis</div>
        </div>

        <div className="feature-card">
          <div className="feature-icon-box">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="feature-title">Built-in Automated QA & SAST</h3>
          <p className="feature-text">
            Testing and Security agents generate Vitest suites, boundary analysis, and audit for
            OWASP Top 10 vulnerabilities before deployment.
          </p>
          <div className="feature-tag">94/100 Security Score</div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-section">
        <div className="cta-box">
          <h2 className="title-page" style={{ fontSize: '28px' }}>
            Ready to experience AI-driven software development?
          </h2>
          <p className="subtitle" style={{ marginTop: '8px', marginBottom: '24px' }}>
            Step into the live workspace and inspect the running multi-agent fleet in real-time.
          </p>
          <div className="cta-btn-group">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/workflow" className="btn btn-secondary btn-lg">
              <Cpu className="w-4 h-4" />
              <span>Inspect AI Workflow</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white">AutoDevAI</span>
            <span className="text-slate-500 text-xs">
              • Final-Year Project Prototype • Lead Architect: Arpita
            </span>
          </div>
          <div className="footer-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/workflow">AI Workflow</Link>
            <Link to="/architecture">Architecture</Link>
            <Link to="/development">IDE</Link>
            <Link to="/testing">Testing</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-wrapper {
          min-height: 100vh;
          background: #07090e;
          position: relative;
          overflow-x: hidden;
        }
        .glow-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .sphere-1 {
          width: 500px;
          height: 500px;
          background: rgba(99, 102, 241, 0.15);
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
        }
        .sphere-2 {
          width: 400px;
          height: 400px;
          background: rgba(139, 92, 246, 0.12);
          top: 300px;
          right: 5%;
        }
        .hero-section {
          position: relative;
          z-index: 1;
          padding: 80px 24px 60px;
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .hero-content {
          max-width: 920px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.25);
          color: #c7d2fe;
          font-size: 12.5px;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .pill-divider {
          color: rgba(255, 255, 255, 0.2);
        }
        .pill-tag {
          color: #a5b4fc;
          font-family: var(--font-mono);
          font-size: 11px;
        }
        .hero-headline {
          font-size: 54px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .hero-subtext {
          font-size: 17px;
          color: #94a3b8;
          max-width: 680px;
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .prompt-builder-card {
          width: 100%;
          background: rgba(16, 23, 38, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.15), 0 20px 40px -15px rgba(0,0,0,0.7);
          border-radius: 20px;
          padding: 24px;
          text-align: left;
        }
        .input-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .input-label {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
        }
        .input-mode-badge {
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 3px 8px;
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
          border-radius: 6px;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .hero-textarea {
          width: 100%;
          background: #090d16;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          color: #ffffff;
          font-size: 15px;
          line-height: 1.5;
          resize: none;
          transition: border-color 0.2s;
        }
        .hero-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.25);
        }
        .sample-prompts-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 16px 0 20px;
          overflow: hidden;
        }
        .sample-label {
          font-size: 11.5px;
          color: #64748b;
          font-weight: 600;
          white-space: nowrap;
        }
        .samples-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .sample-chip {
          font-size: 11.5px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: #94a3b8;
          white-space: nowrap;
          transition: all 0.15s;
        }
        .sample-chip:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .prompt-action-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .model-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #94a3b8;
        }
        .status-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .start-btn {
          padding: 12px 28px;
        }
        .workflow-illustration-section {
          max-width: 1320px;
          margin: 40px auto 60px;
          padding: 0 24px;
          text-align: center;
        }
        .section-header-block {
          margin-bottom: 36px;
        }
        .pipeline-flow-container {
          background: rgba(13, 18, 29, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 32px 20px;
          overflow-x: auto;
        }
        .pipeline-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 1100px;
        }
        .flow-step-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .flow-step-card {
          flex: 1;
          background: rgba(18, 26, 44, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          transition: transform 0.2s;
        }
        .flow-step-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-medium);
        }
        .flow-step-card.hub-highlight {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(30, 41, 69, 0.8);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.25);
        }
        .step-icon-bubble {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .step-num {
          font-size: 9.5px;
          font-family: var(--font-mono);
          color: #64748b;
          letter-spacing: 0.05em;
        }
        .step-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }
        .step-desc {
          font-size: 10.5px;
          color: #94a3b8;
        }
        .flow-arrow-separator {
          display: flex;
          align-items: center;
          padding: 0 6px;
        }
        .pulsing-line {
          width: 14px;
          height: 2px;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.6));
        }
        .features-grid-section {
          max-width: 1320px;
          margin: 0 auto 60px;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-card {
          background: rgba(14, 20, 33, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s;
        }
        .feature-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        .feature-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-title {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
        }
        .feature-text {
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.55;
          flex: 1;
        }
        .feature-tag {
          font-size: 11px;
          font-family: var(--font-mono);
          color: #818cf8;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        .bottom-cta-section {
          max-width: 900px;
          margin: 0 auto 80px;
          padding: 0 24px;
          text-align: center;
        }
        .cta-box {
          background: linear-gradient(135deg, rgba(20, 28, 48, 0.9), rgba(14, 19, 32, 0.9));
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 24px;
          padding: 48px 32px;
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.15);
        }
        .cta-btn-group {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .landing-footer {
          border-top: 1px solid var(--border-subtle);
          padding: 32px 24px;
          background: #05070a;
        }
        .footer-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .footer-links {
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: #94a3b8;
        }
        .footer-links a:hover {
          color: #ffffff;
        }
        @media (max-width: 900px) {
          .hero-headline { font-size: 38px; }
          .features-grid-section { grid-template-columns: 1fr; }
          .cta-btn-group { flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
