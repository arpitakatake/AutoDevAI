import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileCode,
  Folder,
  Copy,
  Check,
  Play,
  Download,
  ArrowRight,
  Search,
  Save,
  Eye,
  X,
  Plus,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { MOCK_DEVELOPMENT } from '../data/mockDevelopment.js';
import { downloadProjectZip } from '../utils/zipExport.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function DevelopmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, completeDevelopment } = useProject();

  const project = getProject(id);

  // File state & editing
  const [files, setFiles] = useState(() =>
    MOCK_DEVELOPMENT.codeFiles.map((f) => ({
      name: f.name,
      language: f.language,
      content: f.content,
      isDirty: false,
    }))
  );

  const [activeFileName, setActiveFileName] = useState('src/App.jsx');
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [saveNotice, setSaveNotice] = useState('');

  // Live simulated preview tasks
  const [previewTasks, setPreviewTasks] = useState([
    { id: '1', title: 'Complete student roll-call verification', status: 'done', priority: 'high' },
    { id: '2', title: 'Verify QR session code rotation', status: 'in-progress', priority: 'medium' },
    { id: '3', title: 'Send low attendance warnings', status: 'todo', priority: 'high' },
  ]);
  const [newPreviewTitle, setNewPreviewTitle] = useState('');

  if (!project) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const activeFile = files.find((f) => f.name === activeFileName) || files[0];

  const handleContentChange = (newContent) => {
    setFiles((prev) =>
      prev.map((f) => (f.name === activeFileName ? { ...f, content: newContent, isDirty: true } : f))
    );
  };

  const handleSaveFile = () => {
    setFiles((prev) =>
      prev.map((f) => (f.name === activeFileName ? { ...f, isDirty: false } : f))
    );
    setSaveNotice('File saved');
    setTimeout(() => setSaveNotice(''), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile?.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadProject = () => {
    downloadProjectZip(project.name, files);
  };

  const handleProceedToTesting = () => {
    completeDevelopment(project.id);
    navigate(`/project/${project.id}/testing`);
  };

  const lineCount = (activeFile?.content || '').split('\n').length;

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">Development: {project.name}</h1>
            <span className="status-indicator">
              <span className="status-dot in-progress" />
              <span style={{ fontSize: '0.75rem' }}>Synthesized Codebase</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Inspect, edit, and preview the generated components, models, and API clients.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowPreviewModal(true)}
          >
            <Eye size={13} />
            <span>Preview App</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleDownloadProject}
            title="Download full project as ZIP"
          >
            <Download size={13} />
            <span>Download Project (.zip)</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleProceedToTesting}
          >
            <span>Run Automated Tests</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Simplified VS Code-Style Workspace (File Tree | Editor) */}
      <div className="code-workspace">
        {/* Left: File Explorer Tree */}
        <div className="code-sidebar">
          <div className="code-sidebar-header">
            <span>Explorer</span>
            <span style={{ fontSize: '0.625rem', color: '#475569' }}>{files.length} files</span>
          </div>

          <div className="code-file-tree">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 6px', color: '#64748b', fontSize: '0.6875rem', fontWeight: 600 }}>
              <Folder size={12} />
              <span>project/src</span>
            </div>

            {files.map((file) => {
              const isActive = file.name === activeFileName;
              return (
                <div
                  key={file.name}
                  className={`file-tree-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFileName(file.name)}
                >
                  <FileCode size={12} style={{ color: isActive ? 'var(--accent-secondary)' : '#64748b', flexShrink: 0 }} />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </span>
                  {file.isDirty && <span className="code-dirty-dot" title="Unsaved changes" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="code-editor-area">
          {/* Tab Bar & File Toolbar */}
          <div className="code-tab-bar" style={{ justifyContent: 'space-between', paddingRight: '8px' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              {files.map((file) => {
                const isActive = file.name === activeFileName;
                return (
                  <div
                    key={file.name}
                    className={`code-tab ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFileName(file.name)}
                  >
                    <span>{file.name.split('/').pop()}</span>
                    {file.isDirty && <span className="code-dirty-dot" />}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {saveNotice && (
                <span style={{ fontSize: '0.6875rem', color: 'var(--success)', marginRight: '4px' }}>
                  {saveNotice}
                </span>
              )}
              {activeFile.isDirty && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSaveFile}
                  style={{ padding: '3px 8px', fontSize: '0.6875rem' }}
                >
                  <Save size={11} />
                  <span>Save</span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleCopyCode}
                style={{ padding: '3px 8px', fontSize: '0.6875rem', color: '#94a3b8' }}
                title="Copy code"
              >
                {copied ? <Check size={12} style={{ color: 'var(--success)' }} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Search bar inside file if triggered */}
          <div
            style={{
              padding: '6px 12px',
              backgroundColor: '#080d16',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Search size={12} style={{ color: '#64748b' }} />
            <input
              type="text"
              placeholder="Find in file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e2e8f0',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                width: '180px',
              }}
            />
            {searchTerm && (
              <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                {(activeFile.content.match(new RegExp(searchTerm, 'gi')) || []).length} matches
              </span>
            )}
          </div>

          {/* Code Textarea & Gutter */}
          <div className="code-editor-container">
            <div className="code-line-numbers">
              {Array.from({ length: Math.max(lineCount, 25) }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              className="code-textarea"
              value={activeFile.content}
              onChange={(e) => handleContentChange(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Editor Status Bar */}
          <div className="code-status-bar">
            <span>{activeFileName}</span>
            <span>
              {lineCount} lines &bull; UTF-8 &bull; React / JavaScript &bull; 0 syntax errors
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="action-bar-sticky" style={{ marginTop: '20px' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Development Codebase Ready
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            All source modules compiled. Advance to automated testing to validate functionality and edge cases.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPreviewModal(true)}
          >
            <Eye size={14} />
            <span>Preview App</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadProject}
            title="Download full project as ZIP"
          >
            <Download size={14} />
            <span>Download Project (.zip)</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleProceedToTesting}
          >
            <span>Proceed to Testing</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Live Application Preview Modal */}
      {showPreviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '840px',
              width: '100%',
              backgroundColor: '#0b111c',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Modal Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                backgroundColor: '#080d16',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginLeft: '6px' }}>
                  Live App Simulation: http://localhost:5173/preview
                </span>
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setShowPreviewModal(false)}
                style={{ padding: '4px', color: '#94a3b8' }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Simulated Live Interface */}
            <div style={{ padding: '24px', color: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>
                    {project.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Interactive Client Component
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newPreviewTitle.trim()) return;
                    setPreviewTasks([
                      ...previewTasks,
                      { id: Date.now().toString(), title: newPreviewTitle.trim(), status: 'todo', priority: 'medium' },
                    ]);
                    setNewPreviewTitle('');
                  }}
                  style={{ display: 'flex', gap: '8px' }}
                >
                  <input
                    type="text"
                    placeholder="Add item..."
                    value={newPreviewTitle}
                    onChange={(e) => setNewPreviewTitle(e.target.value)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid #334155',
                      backgroundColor: '#1e293b',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Plus size={12} />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* 3 Column Task Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {['todo', 'in-progress', 'done'].map((column) => (
                  <div
                    key={column}
                    style={{
                      backgroundColor: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid #1e293b',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>
                        {column.replace('-', ' ')}
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
                        {previewTasks.filter((t) => t.status === column).length}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {previewTasks
                        .filter((t) => t.status === column)
                        .map((task) => (
                          <div
                            key={task.id}
                            style={{
                              padding: '8px 10px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: '#1e293b',
                              border: '1px solid #334155',
                              fontSize: '0.75rem',
                              color: '#e2e8f0',
                            }}
                          >
                            {task.title}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
