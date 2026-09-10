import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Layers,
  AlertCircle,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { generateRequirementsForProject } from '../data/mockRequirements.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function RequirementsReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, approveRequirements } = useProject();

  const project = getProject(id);
  const initialData = project
    ? generateRequirementsForProject(project.category, project.name, project.idea, project.answers)
    : null;

  const [requirementsData, setRequirementsData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('features');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [notification, setNotification] = useState('');

  if (!project || !requirementsData) {
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
    approveRequirements(project.id);
    navigate(`/project/${project.id}/architecture`);
  };

  const handleToggleStatus = (reqId, type) => {
    if (type === 'features') {
      setRequirementsData({
        ...requirementsData,
        coreFeatures: requirementsData.coreFeatures.map((f) =>
          f.id === reqId ? { ...f, status: f.status === 'Approved' ? 'Rejected' : 'Approved' } : f
        ),
      });
    }
  };

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReq = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom user requirement.',
      priority: newPriority,
      status: 'Approved',
    };

    setRequirementsData({
      ...requirementsData,
      coreFeatures: [newReq, ...requirementsData.coreFeatures],
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
    setNotification('Custom requirement added to specification.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Requirements Review</h1>
            <span className="badge-pill" style={{ backgroundColor: 'var(--success-subtle)', color: 'var(--success)', borderColor: 'var(--success)' }}>
              <Check size={12} />
              <span>AI-Generated from Discovery</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Review, refine, and approve the functional specifications before initiating architecture generation.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Requirement</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleApprove}
          >
            <span>Approve &amp; Generate Architecture</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {notification && (
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--success-subtle)',
            color: 'var(--success)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.84rem',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Overview Card */}
      <div className="panel-card" style={{ marginBottom: 24, padding: '22px 24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>
          Product Scope Summary
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {requirementsData.overview}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          borderBottom: '1px solid var(--border-color)',
          marginBottom: 24,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('features')}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'features' ? 'var(--accent-primary)' : 'transparent'}`,
            color: activeTab === 'features' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'features' ? 600 : 500,
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Core Features ({requirementsData.coreFeatures.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stories')}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'stories' ? 'var(--accent-primary)' : 'transparent'}`,
            color: activeTab === 'stories' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'stories' ? 600 : 500,
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          User Stories ({requirementsData.userStories.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          style={{
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${activeTab === 'technical' ? 'var(--accent-primary)' : 'transparent'}`,
            color: activeTab === 'technical' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'technical' ? 600 : 500,
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Functional &amp; Non-Functional ({requirementsData.functional.length + requirementsData.nonFunctional.length})
        </button>
      </div>

      {/* Tab 1: Core Features */}
      {activeTab === 'features' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {requirementsData.coreFeatures.map((feat) => (
            <div
              key={feat.id}
              className="card-clean"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '18px 22px',
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {feat.title}
                  </span>
                  <span
                    className="badge-pill"
                    style={{
                      fontSize: '0.6875rem',
                      padding: '2px 8px',
                      backgroundColor:
                        feat.priority === 'High' ? 'var(--error-subtle)' : 'var(--accent-subtle)',
                      color: feat.priority === 'High' ? 'var(--error)' : 'var(--accent-primary)',
                      borderColor: 'transparent',
                    }}
                  >
                    {feat.priority} Priority
                  </span>
                  <span
                    className={`status-pill ${feat.status === 'Approved' ? 'success' : 'warning'}`}
                  >
                    {feat.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {feat.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleToggleStatus(feat.id, 'features')}
                  title={feat.status === 'Approved' ? 'Reject' : 'Approve'}
                >
                  {feat.status === 'Approved' ? <span>Reject</span> : <span>Approve</span>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: User Stories */}
      {activeTab === 'stories' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {requirementsData.userStories.map((story) => (
            <div
              key={story.id}
              className="card-clean"
              style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <div style={{ fontSize: '0.8125rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                Persona: {story.asA}
              </div>
              <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <strong>As a</strong> {story.asA}, <strong>I want to</strong> {story.iWant}{' '}
                <strong>so that</strong> {story.soThat}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Functional & Non-Functional */}
      {activeTab === 'technical' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div className="panel-card" style={{ margin: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>
              Functional Requirements
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {requirementsData.functional.map((fr) => (
                <li
                  key={fr.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <CheckCircle2 size={16} className="text-success" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{fr.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card" style={{ margin: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>
              Non-Functional Requirements
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {requirementsData.nonFunctional.map((nfr) => (
                <li
                  key={nfr.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: 3 }} />
                  <span>{nfr.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add Custom Requirement Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: 24,
          }}
        >
          <div className="card-clean" style={{ maxWidth: 500, width: '100%', padding: '28px 24px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Add Custom Requirement</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRequirement} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Requirement Title *
                </label>
                <input
                  type="text"
                  className="hero-input-group"
                  style={{ width: '100%', padding: '10px 14px' }}
                  placeholder="e.g. Export reports to Excel with semester breakdown"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  className="hero-input-group"
                  style={{ width: '100%', padding: '10px 14px', resize: 'vertical' }}
                  placeholder="Explain why this requirement is needed..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Priority Level
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="hero-input-group"
                  style={{ width: '100%', padding: '10px 14px' }}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add to Specification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
