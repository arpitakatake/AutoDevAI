import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Database,
  Server,
  Layout,
  User,
  Shield,
  Cloud,
  Check,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { generateArchitectureForProject } from '../data/mockArchitecture.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function ArchitecturePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, approveArchitecture } = useProject();

  const project = getProject(id);
  const arch = project ? generateArchitectureForProject(project.category, project.name) : null;

  // Progressive disclosure states
  const [showDbSchemas, setShowDbSchemas] = useState(false);
  const [showApis, setShowApis] = useState(false);
  const [showRationale, setShowRationale] = useState(false);

  if (!project || !arch) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const handleApprove = () => {
    approveArchitecture(project.id);
    navigate(`/project/${project.id}/development`);
  };

  return (
    <div className="workspace-page" style={{ maxWidth: '960px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">System Architecture: {project.name}</h1>
            <span className="status-indicator">
              <span className="status-dot in-progress" />
              <span style={{ fontSize: '0.75rem' }}>Technical Blueprint</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Technical blueprint defining the application structure, technology stack, and communication flows.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleApprove}>
            <span>Approve &amp; Start Development</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className="workspace-doc">
        {/* 1. Core Technology Stack (Beginner-Friendly High Level) */}
        <div className="doc-section">
          <div className="doc-section-title">
            <span>1. Core Application Technologies</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Standard modern web stack
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '12px',
            }}
          >
            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Frontend Interface
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                React + Vite
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                The screens and user interface
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Backend API
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Node.js &amp; Express
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                The server and business logic
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Database
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                PostgreSQL
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                How your app stores information
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Login &amp; Accounts
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Secure Auth
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Protects accounts and sessions
              </span>
            </div>

            <div
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Hosting &amp; CDN
              </span>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Edge Cloud
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Makes your app accessible online
              </span>
            </div>
          </div>
        </div>

        {/* 2. Visual Architecture Diagram */}
        <div className="doc-section">
          <div className="doc-section-title">
            <span>2. Visual System Blueprint</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Data flow from user to storage
            </span>
          </div>

          <div
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px 18px',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {[
              { label: 'Users', sub: 'Web Browser', icon: User },
              { label: 'Frontend', sub: 'React Client', icon: Layout },
              { label: 'API Gateway', sub: 'Request Router', icon: Server },
              { label: 'Business Logic', sub: 'Domain Services', icon: Shield },
              { label: 'Database', sub: 'PostgreSQL Tables', icon: Database },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <React.Fragment key={node.label}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '6px',
                      minWidth: '100px',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                        {node.label}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        {node.sub}
                      </div>
                    </div>
                  </div>
                  {i < 4 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>
                      &rarr;
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 3. Progressive Disclosure: Database Structure */}
        <div
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowDbSchemas(!showDbSchemas)}
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
            <span>Database Structure ({arch.dataModels.length} Tables)</span>
            {showDbSchemas ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>

          {showDbSchemas && (
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {arch.dataModels.map((model) => (
                <div key={model.name} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                    Table: {model.name}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 8px 0' }}>
                    {model.description}
                  </p>
                  <table className="clean-table" style={{ fontSize: '0.75rem' }}>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Data Type</th>
                        <th>Constraint</th>
                      </tr>
                    </thead>
                    <tbody>
                      {model.fields.map((f) => (
                        <tr key={f.name}>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{f.name}</td>
                          <td style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{f.type}</td>
                          <td style={{ color: 'var(--text-muted)' }}>
                            {f.primary ? 'PRIMARY KEY' : f.unique ? 'UNIQUE' : f.foreign ? 'FOREIGN KEY' : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Progressive Disclosure: How Different Parts Communicate (APIs) */}
        <div
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowApis(!showApis)}
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
            <span>How Different Parts Communicate ({arch.apis.length} API Endpoints)</span>
            {showApis ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>

          {showApis && (
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)' }}>
              <table className="clean-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Endpoint Path</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {arch.apis.map((api) => (
                    <tr key={api.path}>
                      <td>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 700,
                            color: api.method === 'POST' ? 'var(--accent-primary)' : 'var(--success)',
                          }}
                        >
                          {api.method}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{api.path}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{api.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 5. Progressive Disclosure: Why This Architecture Was Chosen */}
        <div
          style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowRationale(!showRationale)}
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
            <span>Why We Chose This Architecture (Technical Rationale)</span>
            {showRationale ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>

          {showRationale && (
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-card)', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {arch.aiExplanation}
            </div>
          )}
        </div>

        {/* Bottom Approval Bar */}
        <div className="action-bar-sticky">
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Architecture Blueprint Ready
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Approving triggers code generation across frontend components, database tables, and API services.
            </div>
          </div>

          <button type="button" className="btn btn-primary" onClick={handleApprove}>
            <span>Approve &amp; Start Development</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
