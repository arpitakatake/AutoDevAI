import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Plus, ArrowRight, Check, X, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [notification, setNotification] = useState('');

  // Feature Edit state
  const [editingFeature, setEditingFeature] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');

  // Request Changes state
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [changeRequestText, setChangeRequestText] = useState('');

  if (!project || !requirementsData) {
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
    approveRequirements(project.id);
    navigate(`/project/${project.id}/architecture`);
  };

  const handleToggleStatus = (reqId) => {
    setRequirementsData({
      ...requirementsData,
      coreFeatures: requirementsData.coreFeatures.map((f) =>
        f.id === reqId ? { ...f, status: f.status === 'Approved' ? 'Excluded' : 'Approved' } : f
      ),
    });
  };

  const handleRemove = (reqId) => {
    setRequirementsData({
      ...requirementsData,
      coreFeatures: requirementsData.coreFeatures.filter((f) => f.id !== reqId),
    });
    setNotification('Requirement removed from specification.');
    setTimeout(() => setNotification(''), 2500);
  };

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReq = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom operational requirement.',
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
    setTimeout(() => setNotification(''), 2500);
  };

  const handleStartEdit = (feature) => {
    setEditingFeature(feature);
    setEditTitle(feature.title);
    setEditDesc(feature.description);
    setEditPriority(feature.priority);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    setRequirementsData({
      ...requirementsData,
      coreFeatures: requirementsData.coreFeatures.map((f) =>
        f.id === editingFeature.id
          ? { ...f, title: editTitle.trim(), description: editDesc.trim(), priority: editPriority }
          : f
      ),
    });

    setEditingFeature(null);
    setNotification('Requirement updated successfully.');
    setTimeout(() => setNotification(''), 2500);
  };

  const handleSubmitChangeRequest = (e) => {
    e.preventDefault();
    if (!changeRequestText.trim()) return;

    const feedbackReq = {
      id: `change-${Date.now()}`,
      title: `Adjustment: ${changeRequestText.trim().slice(0, 40)}`,
      description: changeRequestText.trim(),
      priority: 'High',
      status: 'Approved',
    };

    setRequirementsData({
      ...requirementsData,
      coreFeatures: [feedbackReq, ...requirementsData.coreFeatures],
    });

    setChangeRequestText('');
    setShowRequestChangesModal(false);
    setNotification('Change request incorporated into product specification.');
    setTimeout(() => setNotification(''), 3000);
  };

  const approvedCount = requirementsData.coreFeatures.filter((f) => f.status === 'Approved').length;

  return (
    <div className="workspace-page" style={{ maxWidth: '960px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">Product Specification: {project.name}</h1>
            <span className="status-indicator">
              <span className="status-dot in-progress" />
              <span style={{ fontSize: '0.75rem' }}>Draft for Review</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Review and refine the functional rules and scope before generating the system architecture.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={13} />
            <span>Add Feature</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowRequestChangesModal(true)}
          >
            <span>Request Changes</span>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleApprove}
          >
            <span>Approve &amp; Generate Architecture</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {notification && (
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
          <CheckCircle2 size={15} />
          <span>{notification}</span>
        </div>
      )}

      {/* Clean Specification Document */}
      <div className="workspace-doc">
        {/* Document Header & Scope Summary */}
        <div className="workspace-doc-header">
          <div className="workspace-doc-title">1. Product Scope &amp; Purpose</div>
          <div className="workspace-doc-meta">
            <span>Author: AutoDevAI Requirement Agent</span>
            <span>&bull;</span>
            <span>Target Domain: {project.category.replace(/_/g, ' ')}</span>
            <span>&bull;</span>
            <span>Status: Ready for Technical Design</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: '12px' }}>
            {requirementsData.overview}
          </p>
        </div>

        {/* Section 2: Core Features Table */}
        <div className="doc-section">
          <div className="doc-section-title">
            <span>2. Core Features ({requirementsData.coreFeatures.length})</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              {approvedCount} of {requirementsData.coreFeatures.length} approved
            </span>
          </div>

          <div className="data-table-container">
            <table className="clean-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>Feature</th>
                  <th>Description</th>
                  <th style={{ width: '12%' }}>Priority</th>
                  <th style={{ width: '12%' }}>Status</th>
                  <th style={{ width: '14%', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requirementsData.coreFeatures.map((f) => {
                  const isApproved = f.status === 'Approved';
                  return (
                    <tr key={f.id} style={{ opacity: isApproved ? 1 : 0.55 }}>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</span>
                      </td>
                      <td>
                        <span style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{f.description}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', color: f.priority === 'High' ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                          {f.priority}
                        </span>
                      </td>
                      <td>
                        <span className="status-indicator">
                          <span className={`status-dot ${isApproved ? 'success' : 'neutral'}`} />
                          <span style={{ fontSize: '0.75rem' }}>{f.status}</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleStartEdit(f)}
                            title="Edit feature"
                            style={{ padding: '3px 6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleToggleStatus(f.id)}
                            title={isApproved ? 'Exclude feature' : 'Approve feature'}
                            style={{ padding: '3px 6px', fontSize: '0.75rem' }}
                          >
                            {isApproved ? 'Exclude' : 'Include'}
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleRemove(f.id)}
                            title="Remove feature"
                            style={{ padding: '3px 6px', color: 'var(--text-muted)' }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: User Stories */}
        <div className="doc-section">
          <div className="doc-section-title">
            <span>3. User Stories</span>
          </div>

          <div
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {requirementsData.userStories.map((story, idx) => (
              <div
                key={story.id}
                style={{
                  fontSize: '0.8125rem',
                  lineHeight: '1.5',
                  color: 'var(--text-secondary)',
                  borderBottom: idx < requirementsData.userStories.length - 1 ? '1px solid var(--border-color)' : 'none',
                  paddingBottom: idx < requirementsData.userStories.length - 1 ? '10px' : 0,
                }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>{idx + 1}. As a {story.asA}</strong>, I want to{' '}
                <span style={{ color: 'var(--text-primary)' }}>{story.iWant}</span> so that{' '}
                <span>{story.soThat}</span>.
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Operational Rules & Performance */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="doc-section" style={{ margin: 0 }}>
            <div className="doc-section-title">
              <span>4. How the App Should Work</span>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
              }}
            >
              {requirementsData.functional.map((fr) => (
                <li key={fr.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={13} style={{ color: 'var(--success)', marginTop: '2px', flexShrink: 0 }} />
                  <span>{fr.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="doc-section" style={{ margin: 0 }}>
            <div className="doc-section-title">
              <span>5. How the App Should Perform</span>
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
              }}
            >
              {requirementsData.nonFunctional.map((nfr) => (
                <li key={nfr.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={13} style={{ color: 'var(--accent-primary)', marginTop: '2px', flexShrink: 0 }} />
                  <span>{nfr.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Document Approval Bar */}
        <div className="action-bar-sticky">
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Specification Ready for Technical Design
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Review the requirements above. Request changes or approve to advance.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowRequestChangesModal(true)}
            >
              <span>Request Changes</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApprove}
            >
              <span>Approve &amp; Build Architecture</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Requirement Dialog */}
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
            padding: '20px',
          }}
        >
          <div
            className="workspace-doc"
            style={{ maxWidth: '480px', width: '100%', padding: '24px', margin: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Add Requirement</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowAddModal(false)}
                style={{ padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddRequirement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Feature Title *
                </label>
                <input
                  type="text"
                  className="input-clean"
                  placeholder="e.g. Export attendance to CSV format"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  className="textarea-clean"
                  placeholder="Explain why this feature is needed and how it should work..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="input-clean"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Add to Specification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Feature Modal */}
      {editingFeature && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
        >
          <div
            className="workspace-doc"
            style={{ maxWidth: '480px', width: '100%', padding: '24px', margin: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Edit Requirement</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setEditingFeature(null)}
                style={{ padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Feature Title *
                </label>
                <input
                  type="text"
                  className="input-clean"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  className="textarea-clean"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Priority
                </label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="input-clean"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setEditingFeature(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {showRequestChangesModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
        >
          <div
            className="workspace-doc"
            style={{ maxWidth: '520px', width: '100%', padding: '24px', margin: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Request Specification Changes</h3>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowRequestChangesModal(false)}
                style={{ padding: '4px' }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
              Specify any alterations, missing edge cases, or adjustments you want the Requirement Agent to incorporate before architecture generation.
            </p>

            <form onSubmit={handleSubmitChangeRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
                  Requested Adjustments *
                </label>
                <textarea
                  rows={4}
                  className="textarea-clean"
                  placeholder="e.g. Include student grade history tracking and restrict parent notifications to weekly digests..."
                  value={changeRequestText}
                  onChange={(e) => setChangeRequestText(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setShowRequestChangesModal(false);
                    navigate(`/project/${project.id}/requirements/discovery`);
                  }}
                  title="Return to the discovery interview to alter your answers"
                >
                  <span>Reopen Discovery Interview</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowRequestChangesModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
