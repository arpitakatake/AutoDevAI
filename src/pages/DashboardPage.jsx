import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  FolderKanban,
  Activity,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_AGENT_ACTIVITY } from '../data/mockAgentActivity.js';

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { projects, setActiveProjectId } = useProject();
  const navigate = useNavigate();

  const activeProjectsCount = projects.filter((p) => p.status !== 'Live').length;
  const completedProjectsCount = projects.filter((p) => p.status === 'Live').length;
  const pendingApprovalsCount = projects.filter(
    (p) => !p.requirementsApproved || !p.architectureApproved
  ).length;

  // Highlighted project that needs attention
  const projectNeedingAttention =
    projects.find((p) => !p.deployed && p.status !== 'Live') || projects[0];

  const handleOpenProject = (project) => {
    setActiveProjectId(project.id);
    navigate(project.nextRoute || `/project/${project.id}`);
  };

  return (
    <div className="workspace-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Welcome back, {currentUser?.name || 'Engineer'}</h1>
          <p className="page-header-subtitle">
            Here is what your AI agents are building and what needs your attention.
          </p>
        </div>
        <Link to="/create-project" className="btn btn-primary">
          <PlusCircle size={17} />
          <span>Create New Project</span>
        </Link>
      </div>

      {/* Overview Metrics */}
      <div className="metrics-row">
        <div className="metric-card">
          <span className="metric-card-label">Active Projects</span>
          <span className="metric-card-value">{activeProjectsCount}</span>
          <span className="metric-card-desc">Moving through the SDLC</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Completed Applications</span>
          <span className="metric-card-value">{completedProjectsCount}</span>
          <span className="metric-card-desc">Live on production edge</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Pending Approvals</span>
          <span className="metric-card-value" style={{ color: 'var(--warning)' }}>
            {pendingApprovalsCount}
          </span>
          <span className="metric-card-desc">Human-in-the-loop decisions</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Agent Health & Uptime</span>
          <span className="metric-card-value" style={{ color: 'var(--success)' }}>
            99.8%
          </span>
          <span className="metric-card-desc">All specialized agents active</span>
        </div>
      </div>

      {/* Current Project Needing Attention */}
      {projectNeedingAttention && (
        <div className="panel-card" style={{ borderColor: 'var(--accent-subtle-border)' }}>
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge-pill">
                <Sparkles size={13} />
                <span>Needs Your Input</span>
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Active focus project
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => handleOpenProject(projectNeedingAttention)}
            >
              <span>{projectNeedingAttention.nextAction}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>
                {projectNeedingAttention.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: 640 }}>
                {projectNeedingAttention.description}
              </p>
            </div>

            <div style={{ minWidth: 200 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                <span>Stage: {projectNeedingAttention.stage.replace('_', ' ')}</span>
                <span style={{ color: 'var(--accent-primary)' }}>
                  {projectNeedingAttention.progress}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  width: '100%',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${projectNeedingAttention.progress}%`,
                    backgroundColor: 'var(--accent-primary)',
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Recent Projects (Left 2/3) + Recent AI Activity (Right 1/3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
        }}
      >
        {/* Recent Projects Table */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Recent Projects</h3>
            <Link to="/projects" className="btn btn-ghost btn-sm">
              <span>View All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="table-container" style={{ border: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Current Stage</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {p.category}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem' }}>
                        {p.stage.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            width: 60,
                            height: 5,
                            backgroundColor: 'var(--border-color)',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${p.progress}%`,
                              height: '100%',
                              backgroundColor:
                                p.progress === 100
                                  ? 'var(--success)'
                                  : 'var(--accent-primary)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          p.status === 'Live'
                            ? 'success'
                            : p.status === 'In Progress'
                            ? 'in-progress'
                            : 'warning'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleOpenProject(p)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Agent Activity Feed */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Recent AI Activity</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Feed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {MOCK_AGENT_ACTIVITY.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  paddingBottom: 12,
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--accent-subtle)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Activity size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {act.agent}
                    </span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      {act.timestamp}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {act.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
