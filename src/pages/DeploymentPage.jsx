import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Cloud,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Rocket,
  Globe,
  Server,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_DEPLOYMENT_CONFIG } from '../data/mockDeployment.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function DeploymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, completeDeployment } = useProject();

  const project = getProject(id);
  const [isDeploying, setIsDeploying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const liveUrl = project?.liveUrl || `https://${project?.id || 'demo'}.autodev.app`;

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

  const handleStartDeployment = () => {
    setIsDeploying(true);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < MOCK_DEPLOYMENT_CONFIG.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsDeploying(false);
          completeDeployment(project.id, liveUrl);
          return prev;
        }
      });
    }, 800);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Deployment &amp; Live Infrastructure</h1>
            <span
              className={`status-pill ${project.deployed ? 'success' : 'active'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Globe size={12} />
              <span>{project.deployed ? 'Production Live' : 'Pre-flight Pipeline'}</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Autonomous zero-downtime edge container provisioning with TLS 1.3 certificates and DNS routing.
          </p>
        </div>

        {project.deployed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Visit Live App</span>
              <ExternalLink size={15} />
            </a>
          </div>
        )}
      </div>

      {/* Main Container: Live Success Screen OR Pre-flight Pipeline */}
      {project.deployed ? (
        /* ================= LIVE APPLICATION SUCCESS SCREEN ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Hero Live Banner */}
          <div
            className="panel-card"
            style={{
              padding: '36px 32px',
              background:
                'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)',
              borderColor: 'rgba(16, 185, 129, 0.4)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'var(--success-subtle)',
                    color: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Rocket size={28} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--success)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Deployment Successful &bull; Release v1.0.0-prod
                  </div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginTop: 2,
                    }}
                  >
                    Your Application is Live on Edge
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                    Automated DNS routing, HTTPS certificates, and CDN replication configured.
                  </p>
                </div>
              </div>

              {/* URL Pill Container */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Globe size={16} className="text-accent" />
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                  }}
                >
                  {liveUrl}
                </a>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={handleCopyUrl}
                  title="Copy live URL"
                  style={{ padding: 4 }}
                >
                  {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Health Metrics */}
          <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="metric-card">
              <span className="metric-card-label">Global Edge Response</span>
              <span className="metric-card-val" style={{ color: 'var(--success)' }}>
                24 ms
              </span>
              <span className="metric-card-desc">Sub-second worldwide TTFB</span>
            </div>

            <div className="metric-card">
              <span className="metric-card-label">System Uptime</span>
              <span className="metric-card-val" style={{ color: 'var(--success)' }}>
                100%
              </span>
              <span className="metric-card-desc">Zero-downtime continuous deploy</span>
            </div>

            <div className="metric-card">
              <span className="metric-card-label">SSL / TLS Protocol</span>
              <span className="metric-card-val" style={{ color: 'var(--accent-primary)' }}>
                TLS 1.3
              </span>
              <span className="metric-card-desc">Automated Let&apos;s Encrypt certs</span>
            </div>

            <div className="metric-card">
              <span className="metric-card-label">Edge Cache Hit Ratio</span>
              <span className="metric-card-val">98.2%</span>
              <span className="metric-card-desc">Static asset replication</span>
            </div>
          </div>

          {/* Deployment History Log */}
          <div className="panel-card">
            <div className="panel-header">
              <h3 className="panel-title">Deployment Audit Trail &amp; Releases</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Immutable Ledger</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_DEPLOYMENT_CONFIG.history.map((h) => (
                <div
                  key={h.id}
                  className="card-clean"
                  style={{
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Server size={16} className="text-accent" />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{h.version}</span>
                        <span
                          className={`status-pill ${h.status === 'Live' ? 'success' : 'neutral'}`}
                          style={{ fontSize: '0.6875rem' }}
                        >
                          {h.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {h.commit} &bull; {h.author}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{h.deployedAt}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Duration: {h.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
            <Link to="/dashboard" className="btn btn-secondary">
              <span>Return to Dashboard</span>
            </Link>
            <Link to={`/project/${project.id}`} className="btn btn-primary">
              <span>Project Lifecycle Hub</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        /* ================= PRE-FLIGHT CHECKLIST & DEPLOY BUTTON ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Pre-flight Checklist */}
          <div className="panel-card">
            <div className="panel-header">
              <h3 className="panel-title">Pre-Flight Release Validation</h3>
              <span className="status-pill success" style={{ fontSize: '0.6875rem' }}>
                All 5 Gates Passed
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_DEPLOYMENT_CONFIG.checklist.map((chk) => (
                <div
                  key={chk.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <CheckCircle2 size={18} className="text-success" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {chk.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Action & Simulation Progress */}
          <div
            className="panel-card"
            style={{
              padding: '32px 28px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: isDeploying ? 'var(--accent-primary)' : 'var(--border-color)',
            }}
          >
            {!isDeploying ? (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
                  Ready to Deploy to Global Edge
                </h2>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    maxWidth: 480,
                    margin: '0 auto 24px auto',
                  }}
                >
                  Initiates edge container compilation, database schema migration, and DNS domain routing to{' '}
                  <code style={{ color: 'var(--accent-primary)' }}>{liveUrl}</code>.
                </p>

                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleStartDeployment}
                >
                  <Rocket size={18} />
                  <span>Trigger Production Deployment</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <RefreshCw size={36} className="animate-spin text-accent" />
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {MOCK_DEPLOYMENT_CONFIG.steps[currentStepIndex].label}
                  </h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Step {currentStepIndex + 1} of {MOCK_DEPLOYMENT_CONFIG.steps.length} &bull;{' '}
                    {MOCK_DEPLOYMENT_CONFIG.steps[currentStepIndex].progress}% completed
                  </span>
                </div>

                <div
                  style={{
                    width: '100%',
                    maxWidth: 480,
                    height: 8,
                    backgroundColor: 'var(--border-color)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${MOCK_DEPLOYMENT_CONFIG.steps[currentStepIndex].progress}%`,
                      backgroundColor: 'var(--accent-primary)',
                      transition: 'width 300ms ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
