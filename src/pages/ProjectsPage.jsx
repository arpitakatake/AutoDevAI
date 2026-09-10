import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Filter,
  ArrowRight,
  FolderKanban,
  Clock,
  Layers,
  ArrowUpDown,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';

export default function ProjectsPage() {
  const { projects, setActiveProjectId } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('updated');
  const navigate = useNavigate();

  const handleOpen = (proj) => {
    setActiveProjectId(proj.id);
    navigate(proj.nextRoute || `/project/${proj.id}`);
  };

  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === 'ALL' || p.stage === stageFilter;
      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress;
      return 0; // default order
    });

  return (
    <div className="workspace-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">My Projects</h1>
          <p className="page-header-subtitle">
            Manage, inspect, and continue software projects across all lifecycle stages.
          </p>
        </div>
        <Link to="/create-project" className="btn btn-primary">
          <PlusCircle size={17} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card-clean"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          padding: '14px 20px',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
          <Search size={17} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="hero-input"
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px', background: 'transparent' }}
            >
              <option value="ALL">All Stages</option>
              <option value="REQUIREMENTS_DISCOVERY">Discovery</option>
              <option value="REQUIREMENTS_REVIEW">Requirements</option>
              <option value="ARCHITECTURE">Architecture</option>
              <option value="DEVELOPMENT">Development</option>
              <option value="TESTING">Testing</option>
              <option value="SECURITY">Security</option>
              <option value="DEPLOYMENT">Deployment</option>
              <option value="COMPLETED">Completed / Live</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '6px 12px', background: 'transparent' }}
            >
              <option value="updated">Recently Updated</option>
              <option value="progress">Highest Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Category</th>
              <th>Lifecycle Stage</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
                    No projects found matching your criteria.
                  </div>
                  <Link to="/create-project" className="btn btn-primary btn-sm">
                    Create New Project
                  </Link>
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        maxWidth: 320,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.description}
                    </div>
                  </td>
                  <td>
                    <span className="badge-pill" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                      {p.category}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                      {p.stage.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 70,
                          height: 6,
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
                              p.progress === 100 ? 'var(--success)' : 'var(--accent-primary)',
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
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {p.lastUpdated}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleOpen(p)}
                    >
                      <span>Open</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
