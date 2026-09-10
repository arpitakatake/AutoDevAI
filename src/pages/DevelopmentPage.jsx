import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Code2,
  Boxes,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Copy,
  Check,
  Terminal,
  Play,
  Hammer,
  RefreshCw,
  Sparkles,
  Bot,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_DEVELOPMENT } from '../data/mockDevelopment.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function DevelopmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, completeDevelopment } = useProject();

  const project = getProject(id);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [buildNotice, setBuildNotice] = useState('All 5 core modules synthesized. Ready for QA test suite execution.');

  if (!project) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
          Return to Projects
        </Link>
      </div>
    );
  }

  const handleCopyCode = () => {
    const code = MOCK_DEVELOPMENT.codeFiles[activeFileIndex]?.code || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunBuild = () => {
    setIsSynthesizing(true);
    setBuildNotice('Re-compiling module dependencies and running static AST analysis...');
    setTimeout(() => {
      setIsSynthesizing(false);
      setBuildNotice('Build completed successfully. Zero compilation errors detected (148.4 kB bundle).');
    }, 900);
  };

  const handleProceedToTesting = () => {
    completeDevelopment(project.id);
    navigate(`/project/${project.id}/testing`);
  };

  const activeCodeFile = MOCK_DEVELOPMENT.codeFiles[activeFileIndex];

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Development Workspace</h1>
            <span className="badge-pill">
              <Code2 size={13} />
              <span>Autonomous Full-Stack Synthesis</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Autonomous agent swarm generating business logic, persistent schemas, and UI components.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleRunBuild}
            disabled={isSynthesizing}
          >
            {isSynthesizing ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Hammer size={15} />
            )}
            <span>{isSynthesizing ? 'Compiling...' : 'Re-verify Build'}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleProceedToTesting}
          >
            <span>Proceed to Testing Suite</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Synthesis Status Banner */}
      <div
        className="panel-card"
        style={{
          padding: '16px 20px',
          marginBottom: 24,
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--accent-subtle-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-subtle)',
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={17} />
          </div>
          <div>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Agent Synthesis Status:
            </span>{' '}
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              {buildNotice}
            </span>
          </div>
        </div>

        <span
          className="status-pill success"
          style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'var(--success)',
            }}
          />
          Vite Dev Server Active
        </span>
      </div>

      {/* 2-Column Layout: Modules & Dev Swarm on Left, Code Inspector on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.8fr',
          gap: 28,
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Modules & Dev Agent Swarm */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Synthesized Modules List */}
          <div className="panel-card" style={{ margin: 0, padding: '22px 20px' }}>
            <div className="panel-header">
              <h3 className="panel-title">Synthesized System Modules</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {MOCK_DEVELOPMENT.modules.length} Modules
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_DEVELOPMENT.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="card-clean"
                  style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {mod.name}
                    </span>
                    <span
                      className={`status-pill ${
                        mod.status === 'Completed' ? 'success' : 'active'
                      }`}
                      style={{ fontSize: '0.6875rem' }}
                    >
                      {mod.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {mod.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${mod.progress}%`,
                          height: '100%',
                          backgroundColor:
                            mod.progress === 100 ? 'var(--success)' : 'var(--accent-primary)',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {mod.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Agent Swarm */}
          <div className="panel-card" style={{ margin: 0, padding: '22px 20px' }}>
            <div className="panel-header">
              <h3 className="panel-title">Active AI Dev Swarm</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 Autonomous Agents</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_DEVELOPMENT.agents.map((ag) => (
                <div
                  key={ag.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Bot size={15} className="text-accent" />
                      <span style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{ag.name}</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        • {ag.role}
                      </span>
                    </div>
                    <span
                      className={`status-pill ${ag.status === 'Active' ? 'active' : 'neutral'}`}
                      style={{ fontSize: '0.625rem', padding: '1px 6px' }}
                    >
                      {ag.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {ag.currentTask}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code Inspector & Terminal Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            className="panel-card"
            style={{
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            {/* File Tab Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                height: 42,
              }}
            >
              <div style={{ display: 'flex', gap: 4 }}>
                {MOCK_DEVELOPMENT.codeFiles.map((file, idx) => (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => setActiveFileIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      background: activeFileIndex === idx ? 'var(--bg-card)' : 'transparent',
                      color: activeFileIndex === idx ? 'var(--text-primary)' : 'var(--text-muted)',
                      border: 'none',
                      borderTop: activeFileIndex === idx ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      cursor: 'pointer',
                      borderRadius: '4px 4px 0 0',
                    }}
                  >
                    <FileCode size={13} className="text-accent" />
                    <span>{file.name.split('/').pop()}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleCopyCode}
                title="Copy code"
                style={{ fontSize: '0.75rem' }}
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#0a0d14',
                color: '#e2e8f0',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.6,
                maxHeight: 380,
                overflowY: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{activeCodeFile?.code}</code>
              </pre>
            </div>

            {/* Terminal Drawer Footer */}
            <div
              style={{
                padding: '12px 18px',
                backgroundColor: '#07090e',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Terminal size={14} className="text-accent" />
                <span>Compiler: Vite v8.2.2 dynamic HMR pipeline ready</span>
              </div>
              <span style={{ color: 'var(--success)' }}>● 0 errors</span>
            </div>
          </div>

          {/* Code Quality & Review Score */}
          <div
            className="panel-card"
            style={{
              margin: 0,
              padding: '18px 22px',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                Static Analysis Review
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                SonarQube clean code threshold: A grade. Cyclomatic complexity: 3.2 (optimal).
              </p>
            </div>
            <span className="badge-pill" style={{ backgroundColor: 'var(--success-subtle)', color: 'var(--success)', borderColor: 'var(--success)' }}>
              Quality Gate Passed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
