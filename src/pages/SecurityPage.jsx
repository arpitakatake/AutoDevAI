import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Check,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Lock,
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
  const [expandedId, setExpandedId] = useState('sec-1');
  const [notice, setNotice] = useState(
    project?.securityResolved
      ? 'Security audit verified clean (Score: 98/100). Ready for deployment.'
      : ''
  );

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

  const handleFixAll = () => {
    setIsFixing(true);
    setTimeout(() => {
      setReport(FIXED_SECURITY_REPORT);
      setIsFixing(false);
      setNotice('Applied password complexity rules and locked API origin whitelist. Score upgraded to 98/100.');
      resolveSecurity(project.id);
    }, 900);
  };

  const handleRescanSecurity = () => {
    setIsFixing(true);
    setTimeout(() => {
      setIsFixing(false);
      setNotice('Security audit complete: 0 vulnerabilities detected. Score: 98/100.');
    }, 700);
  };

  const handleProceedToDeployment = () => {
    resolveSecurity(project.id);
    navigate(`/project/${project.id}/deployment`);
  };

  const isClean = report.score >= 95;

  return (
    <div className="workspace-page" style={{ maxWidth: '960px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">Security Review: {project.name}</h1>
            <span className="status-indicator">
              <span className={`status-dot ${isClean ? 'success' : 'warning'}`} />
              <span style={{ fontSize: '0.75rem' }}>
                {isClean ? 'Clean (Score: 98/100)' : 'Remediation Needed (Score: 76/100)'}
              </span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Vulnerability scanning across authentication, data protection, and external network boundaries.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {!isClean ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleFixAll}
              disabled={isFixing}
            >
              <Sparkles size={13} style={{ color: 'var(--accent-primary)' }} />
              <span>{isFixing ? 'Applying Patches...' : 'Fix Security Issues Automatically'}</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRescanSecurity}
              disabled={isFixing}
            >
              <ShieldCheck size={13} style={{ color: 'var(--success)' }} />
              <span>{isFixing ? 'Scanning...' : 'Re-scan Security'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleProceedToDeployment}
          >
            <span>Proceed to Release</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {notice && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--success-subtle)',
            color: 'var(--success)',
            fontSize: '0.8125rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Check size={15} />
          <span>{notice}</span>
        </div>
      )}

      {/* Security Review Document */}
      <div className="workspace-doc">
        {/* Status Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            marginBottom: '20px',
            fontSize: '0.8125rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <span>
              <strong>Security Rating:</strong>{' '}
              <span style={{ color: isClean ? 'var(--success)' : 'var(--warning)', fontWeight: 700 }}>
                {report.score} / 100
              </span>
            </span>
            <span>
              <strong>Endpoints Scanned:</strong> {report.scannedEndpoints} routes
            </span>
            <span>
              <strong>Dependencies Checked:</strong> {report.dependenciesAudited} packages
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Status: {isClean ? 'Production Ready' : 'Attention Recommended'}
          </div>
        </div>

        {/* Findings List (Answering: What is wrong? Why does it matter? How to fix it) */}
        <div className="doc-section">
          <div className="doc-section-title">
            <span>Security Findings &amp; Hardening ({report.findings.length})</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Click to view details and recommendations
            </span>
          </div>

          <div className="results-list">
            {report.findings.map((f) => {
              const isResolved = f.status === 'Resolved';
              const isExpanded = expandedId === f.id;

              return (
                <div key={f.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <div
                    className="results-row"
                    onClick={() => setExpandedId(isExpanded ? null : f.id)}
                    style={{
                      backgroundColor: isResolved ? 'transparent' : 'rgba(245, 158, 11, 0.03)',
                    }}
                  >
                    <div className="results-row-left">
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '3px',
                          backgroundColor: isResolved ? 'var(--success-subtle)' : 'var(--warning-subtle)',
                          color: isResolved ? 'var(--success)' : 'var(--warning)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {isResolved ? <Check size={12} strokeWidth={3} /> : '!'}
                      </span>

                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                          {f.title}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          Component: {f.component}
                        </div>
                      </div>
                    </div>

                    <div className="results-row-right">
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          color: f.severity === 'High' ? 'var(--error)' : 'var(--warning)',
                          fontWeight: 600,
                        }}
                      >
                        {f.severity} Priority
                      </span>
                      <span className="status-indicator">
                        <span className={`status-dot ${isResolved ? 'success' : 'warning'}`} />
                        <span style={{ fontSize: '0.75rem' }}>{f.status}</span>
                      </span>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        padding: '14px 18px',
                        backgroundColor: 'var(--bg-secondary)',
                        fontSize: '0.75rem',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {/* 1. What is wrong? */}
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>1. What is the issue? </strong>
                        <span>{f.description}</span>
                      </div>

                      {/* 2. Why does it matter? */}
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>2. Why does it matter? </strong>
                        <span>
                          {f.severity === 'High'
                            ? 'Without this protection, user accounts or session data could be compromised by unauthorized third parties.'
                            : 'Misconfigured headers or origins can allow cross-site requests to leak internal endpoints.'}
                        </span>
                      </div>

                      {/* 3. How to fix it */}
                      <div
                        style={{
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <strong>Recommended Fix: </strong>
                        <span>{f.recommendation}</span>
                      </div>

                      {/* Technical detail identifier */}
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        Technical Security Classification: {f.cve}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="action-bar-sticky">
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {isClean ? 'Security Hardening Complete' : 'Security Issues Identified'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isClean
                ? 'All 5 pre-flight checks are now satisfied. Advance to release and deploy your application online.'
                : 'Automated hardening will remediate password rules and CORS policies to satisfy release checks.'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {!isClean ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleFixAll}
                disabled={isFixing}
              >
                <Sparkles size={14} style={{ color: 'var(--accent-primary)' }} />
                <span>Fix Security Issues Automatically</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRescanSecurity}
                disabled={isFixing}
              >
                <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
                <span>{isFixing ? 'Scanning...' : 'Re-scan Security'}</span>
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProceedToDeployment}
            >
              <span>Proceed to Release</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
