import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, ArrowRight } from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';

export default function ProjectsPage() {
  const { projects, setActiveProjectId } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const navigate = useNavigate();

  const handleOpen = (proj) => {
    setActiveProjectId(proj.id);
    navigate(proj.nextRoute || `/project/${proj.id}`);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'ALL' || p.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="workspace-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">My Projects</h1>
          <p className="page-header-subtitle">
            Manage your applications across all software development lifecycle stages.
          </p>
        </div>

        <Link to="/create-project" className="btn btn-primary btn-sm">
          <Plus size={14} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Clean Search & Filter Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '360px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="input-clean"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '32px', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="input-clean"
            style={{ width: 'auto', fontSize: '0.75rem', padding: '6px 10px' }}
          >
            <option value="ALL">All Stages</option>
            <option value="REQUIREMENTS_DISCOVERY">Discovery</option>
            <option value="REQUIREMENTS_REVIEW">Requirements</option>
            <option value="ARCHITECTURE">Architecture</option>
            <option value="DEVELOPMENT">Development</option>
            <option value="TESTING">Testing</option>
            <option value="SECURITY">Security</option>
            <option value="DEPLOYMENT">Deployment</option>
            <option value="COMPLETED">Live / Released</option>
          </select>
        </div>
      </div>

      {/* Clean GitHub/Linear-Style Repository Table */}
      <div className="data-table-container">
        <table className="clean-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Current Stage</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Open</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  No projects found matching your filter.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => {
                const isLive = p.status === 'Live';
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          maxWidth: '340px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {p.description}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem' }}>{p.stage.replace(/_/g, ' ')}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '60px',
                            height: '4px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${p.progress}%`,
                              height: '100%',
                              backgroundColor: p.progress === 100 ? 'var(--success)' : 'var(--accent-primary)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.progress}%</span>
                      </div>
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
                    <td>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.lastUpdated}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleOpen(p)}
                        style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                      >
                        <span>Open</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
