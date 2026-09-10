import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileCode,
  Check,
  ChevronDown,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { INITIAL_SECURITY_REPORT, FIXED_SECURITY_REPORT } from '../data/mockSecurity.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function SecurityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, resolveSecurity } = useProject();

  const project = getProject(id);
  const [report, setReport] = useState(() =>
    project?.securityResolved ? FIXED_SECURITY_REPORT : INITIAL_SECURITY_REPORT
  );
  const [isFixing, setIsFixing] = useState(false);
  const [expandedFindingId, setExpandedFindingId] = useState('sec-1');
  const [remediationNotice, setRemediationNotice] = useState(
    project?.securityResolved
      ? 'All security vulnerabilities resolved. Score upgraded to 98/100 (Production Ready).'
      : ''
  );

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

  const handleRunRemediation = () => {
    setIsFixing(true);
    setTimeout(() => {
      setReport(FIXED_SECURITY_REPORT);
      setIsFixing(false);
      setRemediationNotice(
        'Security Agent applied zxcvbn password policy and locked down CORS origin whitelist. System score upgraded to 98/100.'
      );
      resolveSecurity(project.id);
    }, 1000);
  };

  const handleProceedToDeployment = () => {
    resolveSecurity(project.id);
    navigate(`/project/${project.id}/deployment`);
  };

  const isClean = report.score >= 95;

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Security &amp; Vulnerability Audit</h1>
            <span
              className={`status-pill ${isClean ? 'success' : 'warning'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {isClean ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
              <span>{report.status}</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Static AST analysis, dependency CVE scanning, and OWASP Top 10 automated remediation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isClean && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleRunRemediation}
              disabled={isFixing}
            >
              {isFixing ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Sparkles size={15} className="text-accent" />
              )}
              <span>{isFixing ? 'Remediating...' : 'Auto-Fix Vulnerabilities'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleProceedToDeployment}
          >
            <span>Proceed to Deployment Pipeline</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Remediation Notice Banner */}
      {remediationNotice && (
        <div
          className="panel-card"
          style={{
            padding: '14px 18px',
            marginBottom: 24,
            backgroundColor: 'var(--success-subtle)',
            borderColor: 'var(--success)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: '0.84rem',
          }}
        >
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>{remediationNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 28 }}>
        <div className="metric-card">
          <span className="metric-card-label">Security Health Score</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span
              className="metric-card-val"
              style={{ color: isClean ? 'var(--success)' : 'var(--warning)' }}
            >
              {report.score}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>/ 100</span>
          </div>
          <span className="metric-card-desc">
            {isClean ? 'Meets enterprise release standards' : 'Remediation recommended'}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Scanned Endpoints</span>
          <span className="metric-card-val">{report.scannedEndpoints}</span>
          <span className="metric-card-desc">All public &amp; private REST routes</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Dependencies Audited</span>
          <span className="metric-card-val">{report.dependenciesAudited}</span>
          <span className="metric-card-desc">NPM supply chain integrity check</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">OWASP Compliance</span>
          <span className="metric-card-val" style={{ color: 'var(--accent-primary)' }}>
            {isClean ? '100%' : '80%'}
          </span>
          <span className="metric-card-desc">Injection, Auth &amp; Header protections</span>
        </div>
      </div>

      {/* Vulnerability Findings Section */}
      <div className="panel-card">
        <div className="panel-header">
          <h3 className="panel-title">Audit Findings &amp; Hardening Recommendations</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {report.findings.length} Audited Vectors
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {report.findings.map((f) => {
            const isResolved = f.status === 'Resolved';
            const isExpanded = expandedFindingId === f.id;

            return (
              <div
                key={f.id}
                className="card-clean"
                style={{
                  padding: '16px 20px',
                  backgroundColor: isResolved ? 'var(--bg-card)' : 'rgba(245, 158, 11, 0.02)',
                  borderColor: isResolved ? 'var(--border-color)' : 'rgba(245, 158, 11, 0.3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedFindingId(isExpanded ? null : f.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isResolved
                          ? 'var(--success-subtle)'
                          : 'rgba(245, 158, 11, 0.1)',
                        color: isResolved ? 'var(--success)' : 'var(--warning)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isResolved ? <Check size={16} /> : <AlertTriangle size={16} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {f.title}
                        </span>
                        <span
                          className="badge-pill"
                          style={{
                            fontSize: '0.6875rem',
                            padding: '1px 6px',
                            backgroundColor:
                              f.severity === 'High'
                                ? 'var(--error-subtle)'
                                : f.severity === 'Medium'
                                ? 'var(--warning-subtle)'
                                : 'var(--accent-subtle)',
                            color:
                              f.severity === 'High'
                                ? 'var(--error)'
                                : f.severity === 'Medium'
                                ? 'var(--warning)'
                                : 'var(--accent-primary)',
                            borderColor: 'transparent',
                          }}
                        >
                          {f.severity} Severity
                        </span>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {f.cve}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Target: {f.component}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      className={`status-pill ${isResolved ? 'success' : 'warning'}`}
                      style={{ fontSize: '0.6875rem' }}
                    >
                      {f.status}
                    </span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong>Vulnerability Details:</strong> {f.description}
                    </p>
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                        Automated Remediation Applied:{' '}
                      </span>
                      {f.recommendation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
