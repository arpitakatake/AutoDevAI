import React, { useState } from 'react'
import {
  Code2,
  Folder,
  FileCode,
  Play,
  Hammer,
  Eye,
  Terminal,
  Bot,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  X,
  Plus,
  RefreshCw
} from 'lucide-react'
import { ProgressBar } from '../components/ProgressBar'
import { mockCodeFiles } from '../data/mockData'

export const DevelopmentPage: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('KanbanBoard.tsx')
  const [openTabs, setOpenTabs] = useState<string[]>(['KanbanBoard.tsx', 'TaskCard.tsx', 'taskService.ts'])
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success'>('idle')
  const [copied, setCopied] = useState<boolean>(false)
  const [consoleOpen, setConsoleOpen] = useState<boolean>(true)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mockCodeFiles[activeFile] || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBuild = () => {
    setBuildStatus('building')
    setTimeout(() => {
      setBuildStatus('success')
      setTimeout(() => setBuildStatus('idle'), 3500)
    }, 1200)
  }

  const openFileInEditor = (filename: string) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename])
    }
    setActiveFile(filename)
  }

  const closeTab = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const remaining = openTabs.filter((t) => t !== filename)
    setOpenTabs(remaining)
    if (activeFile === filename && remaining.length > 0) {
      setActiveFile(remaining[0])
    }
  }

  return (
    <div className="ide-view-container">
      {/* IDE Top Toolbar */}
      <div className="ide-top-toolbar">
        <div className="ide-toolbar-left">
          <div className="ide-badge">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-xs text-white">AutoDevAI Cloud IDE</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">workspace/task-management-app/src</span>
        </div>

        <div className="ide-toolbar-center">
          {buildStatus === 'building' && (
            <span className="badge badge-running">
              <RefreshCw className="w-3 h-3 animate-spin" /> Compiling TypeScript bundle...
            </span>
          )}
          {buildStatus === 'success' && (
            <span className="badge badge-completed">
              ✓ Build Passed (0 errors, 148.4 kB gzipped)
            </span>
          )}
        </div>

        <div className="ide-toolbar-right">
          <button onClick={() => setShowPreviewModal(true)} className="btn btn-secondary btn-sm">
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run</span>
          </button>
          <button onClick={handleBuild} disabled={buildStatus === 'building'} className="btn btn-secondary btn-sm">
            <Hammer className="w-3.5 h-3.5 text-indigo-400" />
            <span>Build</span>
          </button>
          <button onClick={() => setShowPreviewModal(true)} className="btn btn-primary btn-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>Preview App</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout: Left (File Tree) | Center (Editor) | Right (AI Dev Agent Panel) */}
      <div className="ide-main-stage">
        {/* Left: Project File Tree Explorer */}
        <div className="ide-file-tree-sidebar">
          <div className="file-tree-header">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Explorer</span>
            <span className="text-[10px] font-mono text-slate-500">Auto-Generated</span>
          </div>

          <div className="file-tree-content">
            <div className="tree-node folder-node">
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <Folder className="w-4 h-4 text-indigo-400" />
              <span className="tree-label font-bold text-slate-200">src</span>
            </div>

            <div className="tree-children-block">
              {/* Components */}
              <div className="tree-node folder-node">
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <Folder className="w-4 h-4 text-indigo-300" />
                <span className="tree-label text-slate-300">components</span>
              </div>
              <div className="tree-children-block">
                <div
                  onClick={() => openFileInEditor('TaskCard.tsx')}
                  className={`tree-node file-node ${activeFile === 'TaskCard.tsx' ? 'active' : ''}`}
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tree-label">TaskCard.tsx</span>
                </div>
                <div
                  onClick={() => openFileInEditor('KanbanBoard.tsx')}
                  className={`tree-node file-node ${activeFile === 'KanbanBoard.tsx' ? 'active' : ''}`}
                >
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="tree-label">KanbanBoard.tsx</span>
                </div>
              </div>

              {/* Services */}
              <div className="tree-node folder-node">
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <Folder className="w-4 h-4 text-indigo-300" />
                <span className="tree-label text-slate-300">services</span>
              </div>
              <div className="tree-children-block">
                <div
                  onClick={() => openFileInEditor('taskService.ts')}
                  className={`tree-node file-node ${activeFile === 'taskService.ts' ? 'active' : ''}`}
                >
                  <FileCode className="w-3.5 h-3.5 text-amber-400" />
                  <span className="tree-label">taskService.ts</span>
                </div>
              </div>

              {/* Root Files */}
              <div
                onClick={() => openFileInEditor('App.tsx')}
                className={`tree-node file-node ${activeFile === 'App.tsx' ? 'active' : ''}`}
              >
                <FileCode className="w-3.5 h-3.5 text-purple-400" />
                <span className="tree-label">App.tsx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Mock Code Editor */}
        <div className="ide-editor-workspace">
          <div className="editor-tab-bar">
            {openTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveFile(tab)}
                className={`editor-tab ${activeFile === tab ? 'active' : ''}`}
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span className="tab-title">{tab}</span>
                <button
                  onClick={(e) => closeTab(tab, e)}
                  className="tab-close-btn"
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <div className="editor-tab-actions ml-auto flex items-center pr-3">
              <button
                onClick={handleCopyCode}
                className="btn btn-ghost btn-sm text-xs text-slate-400 hover:text-white"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="editor-body">
            <div className="editor-gutter">
              {Array.from({ length: 45 }).map((_, i) => (
                <span key={i} className="gutter-num">
                  {i + 1}
                </span>
              ))}
            </div>
            <pre className="code-display font-mono">
              <code>{mockCodeFiles[activeFile] || '// Select a file to view code'}</code>
            </pre>
          </div>

          <div className={`ide-console-drawer ${consoleOpen ? 'open' : 'minimized'}`}>
            <div
              onClick={() => setConsoleOpen(!consoleOpen)}
              className="console-header cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-300">Terminal & Compiler Output</span>
                <span className="text-[10px] font-mono text-emerald-400">● vite v8.2.2 dev server ready</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${consoleOpen ? '' : 'rotate-180'}`} />
            </div>
            {consoleOpen && (
              <div className="console-body font-mono text-xs">
                <p className="text-slate-400">[vite] AutoDevAI dynamic HMR module replacement active.</p>
                <p className="text-emerald-400">&gt; local: http://localhost:5173/</p>
                <p className="text-slate-500">&gt; 14 components synthesized • Zustand state store mounted • 0 errors found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Development Agent Panel */}
        <div className="ide-dev-agent-panel">
          <div className="dev-agent-header">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">AI Development Agent</h3>
            </div>
            <span className="badge badge-running">● Active</span>
          </div>

          <div className="dev-agent-status-box">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-300">Generating components…</span>
              <span className="text-xs font-mono font-bold text-indigo-400">82%</span>
            </div>
            <ProgressBar progress={82} height={6} showPercentage={false} />
            <p className="text-xs text-slate-400 mt-2">
              Synthesizing KanbanBoard drag handlers and priority badge renderers.
            </p>
          </div>

          <div className="agent-task-checklist">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Synthesis Milestones
            </span>
            <div className="task-check-item done">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scaffold project structure & TypeScript configs</span>
            </div>
            <div className="task-check-item done">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generate TaskCard.tsx with priority colors</span>
            </div>
            <div className="task-check-item done">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generate taskService.ts REST client endpoints</span>
            </div>
            <div className="task-check-item active">
              <span className="pulse-dot" />
              <span>Refining Kanban drag-and-drop state machine</span>
            </div>
            <div className="task-check-item pending">
              <span className="pending-circle" />
              <span>Optimistic UI rollback handlers</span>
            </div>
          </div>

          <div className="agent-quick-commands">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Prompt the Dev Agent
            </span>
            <button
              onClick={() => handleBuild()}
              className="quick-command-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Refactor Kanban to use custom hook</span>
            </button>
            <button
              onClick={() => handleBuild()}
              className="quick-command-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add filter by deadline urgency</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal: Live Simulated Student Task Management App */}
      {showPreviewModal && (
        <div className="preview-modal-backdrop">
          <div className="preview-modal-dialog">
            <div className="preview-modal-header">
              <div className="flex items-center gap-2">
                <span className="modal-dot red" />
                <span className="modal-dot yellow" />
                <span className="modal-dot green" />
                <span className="text-xs font-mono text-slate-300 ml-2">
                  Live Preview: http://localhost:5173/preview (Task Management App)
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="preview-modal-body">
              <div className="simulated-app-container">
                <div className="simulated-app-header">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Student Task Planner</span>
                      <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Synthesized by AutoDevAI
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">Collaborative study board with automated reminders</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Task</span>
                  </button>
                </div>

                <div className="simulated-kanban-grid">
                  <div className="sim-col">
                    <div className="sim-col-header">
                      <span className="text-xs font-bold text-slate-300">To Do</span>
                      <span className="sim-count">1</span>
                    </div>
                    <div className="sim-card">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-white">Implement Dijkstra Algorithm</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">High</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">CS301 Data Structures • Due Tomorrow</p>
                    </div>
                  </div>

                  <div className="sim-col">
                    <div className="sim-col-header">
                      <span className="text-xs font-bold text-slate-300">In Progress</span>
                      <span className="sim-count">1</span>
                    </div>
                    <div className="sim-card border-indigo-500/40">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-white">Prepare Chemistry Lab Deck</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Medium</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">CHEM102 • Due in 3 Days</p>
                    </div>
                  </div>

                  <div className="sim-col">
                    <div className="sim-col-header">
                      <span className="text-xs font-bold text-slate-300">Completed</span>
                      <span className="sim-count">1</span>
                    </div>
                    <div className="sim-card opacity-75">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold line-through text-slate-400">Submit Literature Essay</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Done</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">ENG210 • Submitted Friday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ide-view-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - var(--topbar-height) - 48px);
          min-height: 680px;
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          overflow: hidden;
          background: #090d16;
        }
        .ide-top-toolbar {
          height: 48px;
          background: #0d121e;
          border-bottom: 1px solid var(--border-subtle);
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .ide-toolbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ide-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ide-toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ide-main-stage {
          flex: 1;
          display: grid;
          grid-template-columns: 220px 1fr 300px;
          min-height: 0;
          overflow: hidden;
        }
        .ide-file-tree-sidebar {
          background: #0a0e18;
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow-y: auto;
        }
        .file-tree-header {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .file-tree-content {
          padding: 8px 6px;
        }
        .tree-node {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12.5px;
          transition: background 0.15s;
        }
        .tree-node:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .tree-node.file-node.active {
          background: rgba(99, 102, 241, 0.15);
          color: #ffffff;
        }
        .tree-children-block {
          padding-left: 14px;
        }
        .tree-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ide-editor-workspace {
          display: flex;
          flex-direction: column;
          min-height: 0;
          background: #060910;
          overflow: hidden;
        }
        .editor-tab-bar {
          height: 38px;
          background: #0a0e18;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          overflow-x: auto;
        }
        .editor-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          height: 100%;
          border-right: 1px solid var(--border-subtle);
          background: #090d16;
          color: var(--text-muted);
          font-size: 12.5px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .editor-tab:hover {
          color: var(--text-primary);
        }
        .editor-tab.active {
          background: #060910;
          color: #ffffff;
          border-top: 2px solid #6366f1;
        }
        .tab-close-btn {
          color: var(--text-muted);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .editor-body {
          flex: 1;
          display: flex;
          overflow: auto;
          padding: 12px 0;
        }
        .editor-gutter {
          width: 44px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 12px;
          color: #475569;
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
          user-select: none;
          flex-shrink: 0;
        }
        .code-display {
          flex: 1;
          color: #e2e8f0;
          font-size: 12.5px;
          line-height: 1.6;
          tab-size: 2;
          overflow-x: auto;
        }
        .ide-console-drawer {
          border-top: 1px solid var(--border-subtle);
          background: #080c14;
        }
        .console-header {
          height: 32px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02);
        }
        .console-body {
          padding: 10px 14px;
          max-height: 100px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ide-dev-agent-panel {
          background: #0a0e18;
          border-left: 1px solid var(--border-subtle);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }
        .dev-agent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .dev-agent-status-box {
          padding: 12px;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 10px;
        }
        .agent-task-checklist {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .task-check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          padding: 6px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.02);
        }
        .task-check-item.done { color: #cbd5e1; }
        .task-check-item.active { color: #a5b4fc; background: rgba(99, 102, 241, 0.12); }
        .task-check-item.pending { color: #64748b; }
        .pending-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid #475569;
        }
        .agent-quick-commands {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        .quick-command-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 11.5px;
          text-align: left;
          transition: all 0.15s;
        }
        .quick-command-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          border-color: rgba(99, 102, 241, 0.4);
        }
        .preview-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }
        .preview-modal-dialog {
          width: 100%;
          max-width: 850px;
          background: #0b0f19;
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.8);
        }
        .preview-modal-header {
          height: 38px;
          background: #0e1322;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .modal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .modal-dot.red { background: #ef4444; }
        .modal-dot.yellow { background: #f59e0b; }
        .modal-dot.green { background: #10b981; }
        .preview-modal-body {
          padding: 24px;
        }
        .simulated-app-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .simulated-app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .simulated-kanban-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .sim-col {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sim-col-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sim-count {
          font-size: 10px;
          font-family: var(--font-mono);
          padding: 1px 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
        }
        .sim-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 10px;
        }
        @media (max-width: 1024px) {
          .ide-main-stage {
            grid-template-columns: 180px 1fr;
          }
          .ide-dev-agent-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
