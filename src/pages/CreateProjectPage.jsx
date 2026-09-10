import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  Cloud,
  AlertCircle,
} from 'lucide-react';
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
      // Propose a clean name based on the prompt
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

  const exampleIdeas = [
    {
      title: 'College Attendance System',
      name: 'CampusAttend',
      type: 'education',
      idea: 'I want to build a college attendance management system where professors start sessions with rotating QR codes, students scan to check in, and automated alerts are sent when attendance drops below 75%.',
    },
    {
      title: 'Luxury Jewelry Store',
      name: 'JewelCraft',
      type: 'ecommerce',
      idea: 'An online luxury jewelry store featuring high-res product galleries, custom engraving options, Stripe checkout, guest purchases, and shipment tracking.',
    },
    {
      title: 'Agile Task Manager',
      name: 'TaskFlow',
      type: 'task_management',
      idea: 'Build a modern team task management app with Kanban boards, sprint backlogs, priority flags, deadline reminders, and Slack webhook alerts.',
    },
    {
      title: 'Patient Telehealth Portal',
      name: 'CarePulse',
      type: 'healthcare',
      idea: 'A telehealth clinic portal where patients can schedule video appointments, doctors can upload digital prescriptions, and health records are securely encrypted.',
    },
  ];

  const handleApplyExample = (ex) => {
    setName(ex.name);
    setType(ex.type);
    setIdea(ex.idea);
    setError('');
  };

  const handleStartBuilding = (e) => {
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
    <div className="workspace-page" style={{ maxWidth: 840 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span className="badge-pill" style={{ marginBottom: 12 }}>
          <Sparkles size={13} />
          <span>Intelligent Project Inception</span>
        </span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>
          What do you want to build?
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto' }}>
          Describe your idea in your own words. AutoDevAI&apos;s Requirement Agent will analyze your prompt
          and guide it through to a production-ready application.
        </p>
      </div>

      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--error-subtle)',
            color: 'var(--error)',
            fontSize: '0.875rem',
            marginBottom: 20,
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Creation Form */}
      <div className="panel-card" style={{ padding: '32px 28px' }}>
        <form onSubmit={handleStartBuilding} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Row 1: Project Name & Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Project Name *
              </label>
              <div className="hero-input-group" style={{ padding: '8px 14px' }}>
                <input
                  type="text"
                  className="hero-input"
                  placeholder="e.g. CampusAttend"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Domain / Template (Optional)
              </label>
              <select
                className="hero-input-group"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="auto">Auto-detect from idea</option>
                <option value="education">Education & Campus</option>
                <option value="ecommerce">E-Commerce & Retail</option>
                <option value="task_management">Task & Productivity</option>
                <option value="social">Social & Community</option>
                <option value="healthcare">Healthcare & Clinic</option>
                <option value="generic">Custom Software</option>
              </select>
            </div>
          </div>

          {/* Row 2: Large Idea Textarea */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Describe your software idea *
            </label>
            <textarea
              rows={6}
              className="hero-input-group"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
              }}
              placeholder="Example: I want to build a task management application for college students where users can create tasks, set deadlines, organize tasks by priority, and receive reminders..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>

          {/* Quick Example Chips */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
              Or try a prompt template:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {exampleIdeas.map((ex) => (
                <button
                  key={ex.name}
                  type="button"
                  className="chip-tag"
                  onClick={() => handleApplyExample(ex)}
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div style={{ marginTop: 8 }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', padding: '14px 20px', fontSize: '1rem' }}
            >
              <span>Start Building with AutoDevAI</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Compact Workflow Explanation */}
      <div
        className="card-clean"
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          How AutoDevAI builds your idea:
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            flexWrap: 'wrap',
          }}
        >
          <span>Your Idea</span>
          <span>→</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Requirement Agent</span>
          <span>→</span>
          <span>Architecture</span>
          <span>→</span>
          <span>Development</span>
          <span>→</span>
          <span>Testing & Security</span>
          <span>→</span>
          <span style={{ color: 'var(--success)', fontWeight: 600 }}>Deployment</span>
        </div>
      </div>
    </div>
  );
}
