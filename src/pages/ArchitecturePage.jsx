import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Boxes,
  ArrowRight,
  Database,
  Server,
  Layout,
  User,
  Cpu,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Sparkles,
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

  const [expandedEntity, setExpandedEntity] = useState(null);
  const [activeTab, setActiveTab] = useState('diagram');

  if (!project || !arch) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
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
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">System Architecture</h1>
            <span className="badge-pill">
              <Boxes size={13} />
              <span>Synthesized by Architecture Agent</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Technical blueprint specifying the technology stack, data schemas, and API topology.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => alert('Architecture change request logged for AI re-synthesis.')}
          >
            <span>Request Changes</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={handleApprove}>
            <span>Approve &amp; Start Development</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Technology Stack Cards */}
      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <span className="metric-card-label">Frontend</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
            {arch.stack.frontend.name}
          </span>
          <span className="metric-card-desc">{arch.stack.frontend.role}</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Backend API</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
            {arch.stack.backend.name}
          </span>
          <span className="metric-card-desc">{arch.stack.backend.role}</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Database</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
            {arch.stack.database.name}
          </span>
          <span className="metric-card-desc">{arch.stack.database.role}</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Authentication</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
            {arch.stack.auth.name}
          </span>
          <span className="metric-card-desc">{arch.stack.auth.role}</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Cloud Hosting</span>
          <span style={{ fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
            {arch.stack.hosting.name}
          </span>
          <span className="metric-card-desc">{arch.stack.hosting.role}</span>
        </div>
      </div>

      {/* System Architecture Visual Diagram */}
      <div className="panel-card">
        <div className="panel-header">
          <h3 className="panel-title">System Topology &amp; Service Boundaries</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Micro-service flow diagram
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            padding: '28px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
          }}
        >
          {arch.diagram.map((node, i) => (
            <React.Fragment key={node.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  minWidth: 120,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1.5px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {node.icon === 'User' && <User size={22} />}
                  {node.icon === 'Layout' && <Layout size={22} />}
                  {node.icon === 'Server' && <Server size={22} />}
                  {node.icon === 'Cpu' && <Cpu size={22} />}
                  {node.icon === 'Zap' && <Zap size={22} />}
                  {node.icon === 'Database' && <Database size={22} />}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{node.label}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {node.type}
                  </div>
                </div>
              </div>
              {i < arch.diagram.length - 1 && (
                <div
                  style={{
                    color: 'var(--workflow-line)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Grid: Data Model & API Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Data Model Entities */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Relational Data Model Entities</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {arch.dataModels.length} Entities
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {arch.dataModels.map((model) => (
              <div
                key={model.name}
                className="card-clean"
                style={{ padding: '16px 20px', cursor: 'pointer' }}
                onClick={() => setExpandedEntity(expandedEntity === model.name ? null : model.name)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Database size={16} className="text-accent" />
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{model.name}</span>
                  </div>
                  {expandedEntity === model.name ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  {model.description}
                </p>

                {expandedEntity === model.name && (
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
                    <table style={{ width: '100%', fontSize: '0.75rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ color: 'var(--text-muted)' }}>
                          <th style={{ paddingBottom: 6 }}>Field</th>
                          <th style={{ paddingBottom: 6 }}>Data Type</th>
                          <th style={{ paddingBottom: 6 }}>Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.fields.map((f) => (
                          <tr key={f.name}>
                            <td style={{ fontWeight: 600, padding: '4px 0' }}>{f.name}</td>
                            <td style={{ color: 'var(--accent-primary)' }}>{f.type}</td>
                            <td style={{ color: 'var(--text-muted)' }}>
                              {f.primary ? 'PRIMARY KEY' : f.unique ? 'UNIQUE' : f.foreign ? 'FOREIGN KEY' : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Core API Specification</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OpenAPI 3.1</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {arch.apis.map((api) => (
              <div
                key={api.path}
                className="card-clean"
                style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    className="badge-pill"
                    style={{
                      fontSize: '0.6875rem',
                      padding: '2px 8px',
                      backgroundColor:
                        api.method === 'POST' ? 'var(--accent-subtle)' : 'var(--success-subtle)',
                      color: api.method === 'POST' ? 'var(--accent-primary)' : 'var(--success)',
                      borderColor: 'transparent',
                    }}
                  >
                    {api.method}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600 }}>
                    {api.path}
                  </span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {api.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Rationale Panel */}
      <div
        className="panel-card"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '4px solid var(--accent-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={16} className="text-accent" />
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
            Architecture Agent Rationale: Why this architecture?
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {arch.aiExplanation}
        </p>
      </div>
    </div>
  );
}
