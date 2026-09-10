import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  Bot,
  LayoutDashboard,
  FolderGit2,
  Workflow,
  FileCheck,
  Network,
  Code2,
  CheckCircle2,
  ShieldCheck,
  CloudUpload,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react'

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, badge: 'Live' },
    { label: 'Projects', to: '/project-details', icon: FolderGit2 },
    { label: 'AI Workflow', to: '/workflow', icon: Workflow, badge: 'Active', pulse: true },
    { label: 'Requirements', to: '/requirements', icon: FileCheck },
    { label: 'Architecture', to: '/architecture', icon: Network },
    { label: 'Development', to: '/development', icon: Code2, badge: 'IDE' },
    { label: 'Testing', to: '/testing', icon: CheckCircle2 },
    { label: 'Security', to: '/security', icon: ShieldCheck, badge: '94%' },
    { label: 'Deployment', to: '/deployment', icon: CloudUpload },
    { label: 'New Project', to: '/new-project', icon: Sparkles, accent: true },
    { label: 'Settings', to: '/settings', icon: Settings },
  ]

  return (
    <aside className={`platform-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo-group">
          <div className="sidebar-logo-icon">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="live-indicator" />
          </div>
          {!collapsed && (
            <div className="brand-text-block">
              <span className="brand-name">AutoDev<span className="accent">AI</span></span>
              <span className="brand-sub">Autonomous SDLC</span>
            </div>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-btn"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Project Capsule */}
      {!collapsed && (
        <div className="active-project-card">
          <div className="project-pill-header">
            <span className="project-tag">CURRENT PROJECT</span>
            <span className="project-status">68%</span>
          </div>
          <div className="project-name">Task Management App</div>
          <div className="project-mini-progress">
            <div className="mini-fill" style={{ width: '68%' }} />
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="sidebar-nav-container">
        <div className="nav-group-label">{!collapsed ? 'PLATFORM MODULES' : '•'}</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''} ${item.accent ? 'accent-link' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <span className="link-icon-wrapper">
                  <Icon className="w-4 h-4" />
                </span>
                {!collapsed && (
                  <>
                    <span className="link-label">{item.label}</span>
                    {item.badge && (
                      <span className={`link-badge ${item.pulse ? 'pulse-badge' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="sidebar-footer">
        {!collapsed ? (
          <div className="orchestrator-status">
            <div className="status-avatar">
              <span className="status-dot" />
            </div>
            <div className="status-meta">
              <span className="agent-status-label">6 Agents Coordinated</span>
              <span className="sub-meta">Autonomous Fleet v2.4</span>
            </div>
            <Link to="/workflow" className="inspect-link" title="Open AI Workflow">
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="collapsed-indicator" title="Autonomous Fleet v2.4">
            <span className="status-dot" />
          </div>
        )}
      </div>

      <style>{`
        .platform-sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          height: 100vh;
          position: sticky;
          top: 0;
          background: #090d15;
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.25s;
          z-index: 40;
        }
        .platform-sidebar.collapsed {
          width: var(--sidebar-collapsed-width);
          min-width: var(--sidebar-collapsed-width);
        }
        .sidebar-header {
          height: var(--topbar-height);
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }
        .sidebar-logo-group {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          min-width: 0;
        }
        .sidebar-logo-icon {
          position: relative;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .live-indicator {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .brand-text-block {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .brand-name {
          font-size: 15.5px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }
        .brand-name .accent {
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-sub {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .collapse-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .collapse-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
        }
        .active-project-card {
          margin: 14px 14px 4px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
        }
        .project-pill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .project-tag {
          font-size: 9.5px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }
        .project-status {
          font-size: 10.5px;
          font-family: var(--font-mono);
          color: #818cf8;
          font-weight: 600;
        }
        .project-name {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-mini-progress {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          margin-top: 8px;
          overflow: hidden;
        }
        .mini-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 999px;
        }
        .sidebar-nav-container {
          flex: 1;
          overflow-y: auto;
          padding: 10px 10px;
        }
        .nav-group-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          padding: 8px 10px 4px;
          letter-spacing: 0.06em;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8.5px 12px;
          border-radius: 8px;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          transition: all 0.15s ease;
          position: relative;
        }
        .sidebar-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }
        .sidebar-link.active {
          color: #ffffff;
          background: rgba(99, 102, 241, 0.14);
          border: 1px solid rgba(99, 102, 241, 0.3);
          font-weight: 600;
        }
        .sidebar-link.active .link-icon-wrapper {
          color: #818cf8;
        }
        .sidebar-link.accent-link {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px dashed rgba(139, 92, 246, 0.35);
          color: #c084fc;
        }
        .sidebar-link.accent-link:hover {
          border-color: rgba(139, 92, 246, 0.6);
        }
        .link-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .link-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .link-badge {
          font-size: 10.5px;
          font-family: var(--font-mono);
          padding: 1px 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
        }
        .pulse-badge {
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          border: 1px solid rgba(99, 102, 241, 0.4);
        }
        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.2);
        }
        .orchestrator-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px;
          border-radius: 8px;
        }
        .status-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .status-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .agent-status-label {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .sub-meta {
          font-size: 10px;
          color: var(--text-muted);
        }
        .inspect-link {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .inspect-link:hover {
          color: var(--text-primary);
        }
        .collapsed-indicator {
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }
      `}</style>
    </aside>
  )
}
