import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';

export default function CreateProjectPage() {
  const location = useLocation();
  const [name, setName] = useState('');
  const [type, setType] = useState('auto');
  const [idea, setIdea] = useState(() => location.state?.initialIdea || '');
  const [error, setError] = useState('');
  const { createProject } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.initialIdea && !name) {
      const words = location.state.initialIdea
        .replace(/^(build|create|make|i want to build|an?)\s+/i, '')
        .split(' ')
        .slice(0, 2)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('');
      if (words.length >= 3) {
        setName(words);
      }
    }
  }, [location.state, name]);

  const starterTemplates = [
    {
      title: 'College Attendance System',
      name: 'CampusAttend',
      type: 'education',
      idea: 'A college attendance management tool where instructors start sessions with rotating QR codes, students scan to check in, and automated alerts are sent when attendance drops below 75%.',
    },
    {
      title: 'Team Task Board',
      name: 'TaskFlow',
      type: 'task_management',
      idea: 'A team task planner with columns for To Do, In Progress, and Done, deadline dates, priority flags, and reminder alerts.',
    },
    {
      title: 'Online Jewelry Store',
      name: 'JewelCraft',
      type: 'ecommerce',
      idea: 'An online storefront for custom jewelry with high-res product galleries, custom engraving options, Stripe checkout, and customer order tracking.',
    },
    {
      title: 'Clinic Telehealth Portal',
      name: 'CarePulse',
      type: 'healthcare',
      idea: 'A patient clinic portal where patients can schedule appointments, doctors upload digital prescriptions, and medical records are securely encrypted.',
    },
  ];

  const handleApplyTemplate = (tmpl) => {
    setName(tmpl.name);
    setType(tmpl.type);
    setIdea(tmpl.idea);
    setError('');
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a name for your project.');
      return;
    }
    if (!idea.trim() || idea.trim().length < 15) {
      setError('Please describe your idea in a bit more detail (at least 15 characters).');
      return;
    }

    const newProject = createProject({ name, type, idea });
    navigate(`/project/${newProject.id}/requirements/discovery`);
  };

  return (
    <div className="workspace-page" style={{ maxWidth: '780px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 className="page-header-title">Create New Application</h1>
        <p className="page-header-subtitle">
          Describe what you want to build in simple words. You don&apos;t need to know how to code — AutoDevAI will understand your idea and guide you through each step.
        </p>
      </div>

      {/* 5-Step Simple Roadmap Banner */}
      <div
        style={{
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '12px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}
      >
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Your Idea</span>
        <span>&rarr;</span>
        <span>Answer Questions</span>
        <span>&rarr;</span>
        <span>Requirements</span>
        <span>&rarr;</span>
        <span>Architecture</span>
        <span>&rarr;</span>
        <span style={{ color: 'var(--success)', fontWeight: 600 }}>Application Built</span>
      </div>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--error-subtle)',
            color: 'var(--error)',
            fontSize: '0.8125rem',
            marginBottom: '18px',
          }}
        >
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      {/* Creation Document */}
      <div className="workspace-doc" style={{ padding: '24px 28px' }}>
        <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Project Name & Domain */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: 'var(--text-primary)',
                }}
              >
                Project Name *
              </label>
              <input
                type="text"
                className="input-clean"
                placeholder="e.g. Student Task Planner"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: 'var(--text-primary)',
                }}
              >
                Category (Optional)
              </label>
              <select
                className="input-clean"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ height: '38px' }}
              >
                <option value="auto">Auto-detect from my description</option>
                <option value="task_management">Task &amp; Project Planner</option>
                <option value="education">School &amp; Classroom</option>
                <option value="ecommerce">Online Store / Shop</option>
                <option value="social">Community &amp; Social</option>
                <option value="healthcare">Clinic &amp; Health</option>
                <option value="generic">Custom Application</option>
              </select>
            </div>
          </div>

          {/* Software Description */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '6px',
                color: 'var(--text-primary)',
              }}
            >
              What do you want your application to do? *
            </label>
            <textarea
              rows={5}
              className="textarea-clean"
              placeholder="Example: I want to build a task management tool for students where they can organize assignments by due date, set priority tags (High, Medium, Low), and receive reminder notifications before deadlines..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Write in plain language. Describe who will use it, what they will do, and what features are important to you.
            </span>
          </div>

          {/* Starter Templates */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Or start from an example prompt:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {starterTemplates.map((tmpl) => (
                <button
                  key={tmpl.name}
                  type="button"
                  onClick={() => handleApplyTemplate(tmpl)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '11px 16px', fontSize: '0.875rem' }}
            >
              <span>Start Discovery with Requirement Agent</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
