import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_AGENT_ACTIVITY } from '../data/mockAgentActivity.js';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { projects, setActiveProjectId } = useProject();
  const navigate = useNavigate();

  // Focus project is the most active non-completed project, or the first project
  const focusProject = projects.find((p) => !p.deployed && p.status !== 'Live') || projects[0];

  const handleOpenProject = (project) => {
    setActiveProjectId(project.id);
    navigate(project.nextRoute || `/project/${project.id}`);
  };

  return (
    <div className="workspace-page">
      {/* Workspace Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Workspace</h1>
          <p className="page-header-subtitle">
            Welcome back, {currentUser?.name || 'Engineer'}. Here is your current work and next actions.
          </p>
        </div>

        <Link to="/create-project" className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>New Project</span>
        </Link>
      </div>

      {/* 1. Primary Focus: Active Project */}
      {focusProject && (
        <div
          className="workspace-doc"
          style={{
            padding: '24px 28px',
            marginBottom: '28px',
            borderColor: 'var(--border-color)',
            background: 'var(--bg-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                }}
              >
                Current Focus
              </span>
              <span className="status-indicator">
                <span className="status-dot in-progress" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Stage: {focusProject.stage.replace(/_/g, ' ')}
                </span>
              </span>
            </div>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Progress: {focusProject.progress}%
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  marginBottom: '6px',
                  color: 'var(--text-primary)',
                }}
              >
                {focusProject.name}
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                }}
              >
                {focusProject.description}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8125rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 500,
                }}
              >
                <span>Next: {focusProject.nextAction}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenProject(focusProject)}
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Clean linear progress bar */}
          <div
            style={{
              height: '3px',
              width: '100%',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${focusProject.progress}%`,
                backgroundColor: 'var(--accent-primary)',
                transition: 'width 300ms ease',
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Split Layout: Projects Table (Left) + Activity Log (Right) */}
      <div className="dashboard-split-grid">
        {/* Projects Section */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <h2
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--text-muted)',
              }}
            >
              My Projects ({projects.length})
            </h2>
            <Link
              to="/projects"
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              View all &rarr;
            </Link>
          </div>

          <div className="data-table-container">
            <table className="clean-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const isLive = p.status === 'Live';
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                        <div
                          style={{
                            fontSize: '0.6875rem',
                            color: 'var(--text-muted)',
                            textTransform: 'capitalize',
                          }}
                        >
                          {p.category.replace(/_/g, ' ')}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {p.stage.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td>
                        <span className="status-indicator">
                          <span
                            className={`status-dot ${
                              isLive ? 'success' : p.status === 'In Progress' ? 'in-progress' : 'neutral'
                            }`}
                          />
                          <span style={{ fontSize: '0.75rem' }}>{p.status}</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleOpenProject(p)}
                          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                        >
                          Open &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Concise Activity Log */}
        <div>
          <div style={{ marginBottom: '10px' }}>
            <h2
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--text-muted)',
              }}
            >
              Recent Activity
            </h2>
          </div>

          <div
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card)',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {MOCK_AGENT_ACTIVITY.slice(0, 4).map((item) => (
              <div
                key={item.id}
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: '1.4',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '3px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.75rem' }}>
                    {item.agent}
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {item.timestamp}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.75rem' }}>
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
