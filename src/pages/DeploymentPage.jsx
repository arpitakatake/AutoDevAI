import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Check,
  Globe,
  ExternalLink,
  Download,
  Copy,
  RefreshCw,
  Eye,
  ChevronDown,
  ChevronRight,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_DEPLOYMENT_CONFIG } from '../data/mockDeployment.js';
import { MOCK_DEVELOPMENT } from '../data/mockDevelopment.js';
import { downloadProjectZip } from '../utils/zipExport.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function DeploymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, completeDeployment } = useProject();

  const project = getProject(id);
  const [isDeploying, setIsDeploying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Live simulated preview tasks
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete student roll-call verification', status: 'done' },
    { id: '2', title: 'Verify QR session code rotation', status: 'in-progress' },
    { id: '3', title: 'Send low attendance warnings', status: 'todo' },
  ]);
  const [newTitle, setNewTitle] = useState('');

  const liveUrl = project?.liveUrl || `https://${project?.id || 'app'}.autodev.app`;

  if (!project) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setStepIndex(0);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < MOCK_DEPLOYMENT_CONFIG.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDeploying(false);
          completeDeployment(project.id, liveUrl);
          return prev;
        }
      });
    }, 700);
  };

  const handleDownloadZip = () => {
    downloadProjectZip(project.name, MOCK_DEVELOPMENT.codeFiles);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="workspace-page" style={{ maxWidth: '960px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">
              {project.deployed ? 'Live Application' : 'Release & Deployment'}: {project.name}
            </h1>
            <span className="status-indicator">
              <span className={`status-dot ${project.deployed ? 'success' : 'in-progress'}`} />
              <span style={{ fontSize: '0.75rem' }}>
                {project.deployed ? 'Live on Edge' : 'Pre-flight Ready'}
              </span>
            </span>
          </div>
          <p className="page-header-subtitle">
            {project.deployed
              ? 'Your application is live on the internet with zero-downtime edge hosting and SSL certificates.'
              : 'Review your pre-flight checklist, test your application, download code, or deploy directly online.'}
          </p>
        </div>

        {project.deployed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Visit Live App</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>

      {project.deployed ? (
        /* ================= PAYOFF: LIVE APPLICATION SCREEN ================= */
        <div className="workspace-doc">
          {/* Hero Live URL Banner */}
          <div
            style={{
              padding: '24px 28px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--success)',
                }}
              >
                Production Live &bull; Release v1.0.0
              </span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Your Application is Live
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Online at <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{liveUrl}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCopyLink}
              >
                {copied ? <Check size={13} style={{ color: 'var(--success)' }} /> : <Copy size={13} />}
                <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleDownloadZip}
                title="Download full project as ZIP"
              >
                <Download size={13} />
                <span>Download Project (.zip)</span>
              </button>

              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <span>Open in New Tab</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Performance & Security Health Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <div style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Response Latency
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--success)', marginTop: '2px' }}>
                24 ms
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Global Edge TTFB</span>
            </div>

            <div style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Uptime
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--success)', marginTop: '2px' }}>
                100%
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Zero-downtime release</span>
            </div>

            <div style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                HTTPS Security
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '2px' }}>
                TLS 1.3 Active
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Automated SSL certificate</span>
            </div>

            <div style={{ padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Hosting Region
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Worldwide CDN
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>Replicated edge nodes</span>
            </div>
          </div>

          {/* Interactive Live App Preview Frame */}
          <div className="doc-section">
            <div className="doc-section-title">
              <span>Interactive Application Preview</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                Live running instance
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: '#090f1a',
                color: '#f8fafc',
              }}
            >
              {/* Browser bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  backgroundColor: '#070b14',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94a3b8',
                }}
              >
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ marginLeft: '6px' }}>{liveUrl}</span>
              </div>

              {/* Interactive content inside preview */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                      {project.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Operational Workspace
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newTitle.trim()) return;
                      setTasks([...tasks, { id: Date.now().toString(), title: newTitle.trim(), status: 'todo' }]);
                      setNewTitle('');
                    }}
                    style={{ display: 'flex', gap: '6px' }}
                  >
                    <input
                      type="text"
                      placeholder="Add item..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{
                        padding: '5px 8px',
                        borderRadius: '4px',
                        border: '1px solid #334155',
                        backgroundColor: '#1e293b',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        outline: 'none',
                      }}
                    />
                    <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '4px 8px' }}>
                      <Plus size={11} />
                      <span>Add</span>
                    </button>
                  </form>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['todo', 'in-progress', 'done'].map((col) => (
                    <div
                      key={col}
                      style={{
                        backgroundColor: 'rgba(30, 41, 59, 0.4)',
                        border: '1px solid #1e293b',
                        borderRadius: '4px',
                        padding: '10px',
                      }}
                    >
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
                        {col.replace('-', ' ')}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {tasks.filter((t) => t.status === col).map((task) => (
                          <div
                            key={task.id}
                            style={{
                              padding: '6px 8px',
                              borderRadius: '3px',
                              backgroundColor: '#1e293b',
                              border: '1px solid #334155',
                              fontSize: '0.6875rem',
                              color: '#e2e8f0',
                            }}
                          >
                            {task.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Deployment History */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              <span>Deployment Ledger &amp; History ({MOCK_DEPLOYMENT_CONFIG.history.length} Releases)</span>
              {showDetails ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>

            {showDetails && (
              <div style={{ padding: '14px', backgroundColor: 'var(--bg-card)' }}>
                <table className="clean-table" style={{ fontSize: '0.75rem' }}>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Deployed At</th>
                      <th>Commit</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_DEPLOYMENT_CONFIG.history.map((h) => (
                      <tr key={h.id}>
                        <td style={{ fontWeight: 600 }}>{h.version}</td>
                        <td>
                          <span className="status-indicator">
                            <span className={`status-dot ${h.status === 'Live' ? 'success' : 'neutral'}`} />
                            <span>{h.status}</span>
                          </span>
                        </td>
                        <td>{h.deployedAt}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{h.commit}</td>
                        <td>{h.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= PRE-FLIGHT CHECKLIST & DEPLOY ACTION ================= */
        <div className="workspace-doc">
          {/* Pre-Flight Checklist */}
          <div className="doc-section">
            <div className="doc-section-title">
              <span>Pre-Flight Readiness Checklist</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
                All 5 checks passed
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '14px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {MOCK_DEPLOYMENT_CONFIG.checklist.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8125rem' }}>
                  <Check size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-primary)' }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Center: Preview, Download ZIP, Deploy */}
          <div
            style={{
              padding: '24px 28px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card)',
              marginBottom: '20px',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Application Ready for Deployment
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                You can preview the app, download the entire source code as a ZIP archive, or deploy directly to the Edge cloud.
              </p>
            </div>

            {isDeploying ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <RefreshCw size={14} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
                  <span>{MOCK_DEPLOYMENT_CONFIG.steps[stepIndex].label}...</span>
                </div>
                <div
                  style={{
                    height: '4px',
                    width: '100%',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${MOCK_DEPLOYMENT_CONFIG.steps[stepIndex].progress}%`,
                      backgroundColor: 'var(--accent-primary)',
                      transition: 'width 250ms ease',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleStartDeploy}
                >
                  <Globe size={14} />
                  <span>Deploy Application Online</span>
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleDownloadZip}
                  title="Download full project as ZIP"
                >
                  <Download size={14} />
                  <span>Download Project (.zip)</span>
                </button>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowPreviewModal(true)}
                >
                  <Eye size={13} />
                  <span>Preview First</span>
                </button>
              </div>
            )}
          </div>

          {/* Expandable Technical Details */}
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              <span>Deployment Infrastructure Details</span>
              {showDetails ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>

            {showDetails && (
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>Cloud Platform:</strong> Global Serverless Edge Containers with US-East and EU-West regions.
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>TLS Protocol:</strong> Automated Let&apos;s Encrypt TLS 1.3 with automated certificate renewal.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>DNS Routing:</strong> Anycast routing to the nearest edge datacenter for sub-30ms response times.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Modal for Pre-Deploy state */}
      {showPreviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              width: '100%',
              backgroundColor: '#0b111c',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc' }}>App Preview: {project.name}</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowPreviewModal(false)} style={{ padding: '2px 6px', color: '#94a3b8' }}>
                Close
              </button>
            </div>
            <div style={{ padding: '24px', color: '#f8fafc' }}>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginBottom: '16px' }}>
                Previewing pre-flight synthesized build. All 48 tests passing and security verified.
              </p>
              <div style={{ padding: '14px', border: '1px solid #334155', borderRadius: '4px', backgroundColor: '#1e293b' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9375rem' }}>{project.name}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
