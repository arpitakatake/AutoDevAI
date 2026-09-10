import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  Layers,
  FolderKanban
} from 'lucide-react'
import { initialActivityLogs } from '../data/mockData'

export const TopBar: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const q = searchQuery.toLowerCase()
    if (q.includes('work') || q.includes('agent')) navigate('/workflow')
    else if (q.includes('req')) navigate('/requirements')
    else if (q.includes('arch')) navigate('/architecture')
    else if (q.includes('code') || q.includes('dev') || q.includes('ide')) navigate('/development')
    else if (q.includes('test')) navigate('/testing')
    else if (q.includes('sec')) navigate('/security')
    else if (q.includes('deploy')) navigate('/deployment')
    else navigate('/dashboard')
  }

  return (
    <header className="platform-topbar">
      {/* Left: Project Selector & Breadcrumb */}
      <div className="topbar-left">
        <div className="current-project-selector">
          <FolderKanban className="w-4 h-4 text-indigo-400" />
          <span className="project-title">Task Management App</span>
          <span className="environment-badge">dev-preview</span>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="topbar-center">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <Search className="w-4 h-4 search-icon" />
          <input
            type="text"
            placeholder="Search agents, specs, code, test runs... (press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </form>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="topbar-right">
        {/* Quick New Project CTA */}
        <Link to="/new-project" className="btn btn-secondary btn-sm new-proj-btn">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>New Prompt</span>
        </Link>

        {/* Notifications */}
        <div className="dropdown-wrapper">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowUserMenu(false)
            }}
            className="icon-action-btn"
            title="Agent Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="notification-ping" />
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="dropdown-title">Live Agent Activity</span>
                </div>
                <span className="text-xs text-slate-400">6 events</span>
              </div>
              <div className="notifications-list">
                {initialActivityLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="notification-item">
                    <div className="notification-dot" />
                    <div className="notification-content">
                      <div className="notification-meta">
                        <span className="agent-tag">{log.agentName}</span>
                        <span className="timestamp">{log.timestamp}</span>
                      </div>
                      <p className="notification-text">{log.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <Link
                  to="/workflow"
                  onClick={() => setShowNotifications(false)}
                  className="view-all-link"
                >
                  Inspect Full Orchestration Stream →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="dropdown-wrapper">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
            className="user-profile-btn"
          >
            <div className="avatar-badge">AK</div>
            <div className="user-meta-text">
              <span className="user-name">Arpita</span>
              <span className="user-role">Lead Architect</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="user-dropdown-menu">
              <div className="user-menu-header">
                <p className="user-full-name">Arpita Katake</p>
                <p className="user-email">arpita@autodevai.io</p>
              </div>
              <div className="menu-divider" />
              <Link to="/dashboard" onClick={() => setShowUserMenu(false)} className="menu-item">
                Workspace Dashboard
              </Link>
              <Link to="/project-details" onClick={() => setShowUserMenu(false)} className="menu-item">
                Active Projects (3)
              </Link>
              <Link to="/workflow" onClick={() => setShowUserMenu(false)} className="menu-item">
                Agent Telemetry & Logs
              </Link>
              <div className="menu-divider" />
              <Link to="/" onClick={() => setShowUserMenu(false)} className="menu-item text-slate-400">
                Back to Landing Page
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .platform-topbar {
          height: var(--topbar-height);
          background: rgba(9, 13, 21, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .current-project-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
        }
        .project-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .environment-badge {
          font-size: 10px;
          font-family: var(--font-mono);
          padding: 1px 6px;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.12);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .topbar-center {
          flex: 1;
          max-width: 480px;
          margin: 0 24px;
        }
        .search-form {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          height: 36px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 9999px;
          padding: 0 42px 0 34px;
          color: var(--text-primary);
          font-size: 13px;
          transition: all 0.2s;
        }
        .search-input:focus {
          background: rgba(15, 23, 42, 0.9);
          border-color: var(--border-focus);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
        }
        .search-shortcut {
          position: absolute;
          right: 10px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .new-proj-btn {
          font-size: 12px;
          padding: 6px 12px;
        }
        .dropdown-wrapper {
          position: relative;
        }
        .icon-action-btn {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s;
        }
        .icon-action-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
        }
        .notification-ping {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 6px #6366f1;
        }
        .notifications-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 360px;
          background: #0f1422;
          border: 1px solid var(--border-medium);
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          overflow: hidden;
          z-index: 100;
          animation: dropIn 0.2s ease-out;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.02);
        }
        .dropdown-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .notifications-list {
          max-height: 280px;
          overflow-y: auto;
        }
        .notification-item {
          padding: 12px 16px;
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.15s;
        }
        .notification-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        .notification-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #818cf8;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .notification-content {
          flex: 1;
        }
        .notification-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3px;
        }
        .agent-tag {
          font-size: 11.5px;
          font-weight: 600;
          color: #c7d2fe;
        }
        .timestamp {
          font-size: 10.5px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .notification-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .dropdown-footer {
          padding: 10px 16px;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
        }
        .view-all-link {
          font-size: 12px;
          color: #818cf8;
          font-weight: 500;
        }
        .view-all-link:hover {
          text-decoration: underline;
        }
        .user-profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 10px 4px 5px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          transition: all 0.2s;
        }
        .user-profile-btn:hover {
          background: rgba(255, 255, 255, 0.06);
        }
        .avatar-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-meta-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .user-name {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .user-role {
          font-size: 10px;
          color: var(--text-muted);
        }
        .user-dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 220px;
          background: #0f1422;
          border: 1px solid var(--border-medium);
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          padding: 6px;
          z-index: 100;
          animation: dropIn 0.2s ease-out;
        }
        .user-menu-header {
          padding: 8px 10px;
        }
        .user-full-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .user-email {
          font-size: 11px;
          color: var(--text-muted);
        }
        .menu-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 6px 0;
        }
        .menu-item {
          display: block;
          padding: 8px 10px;
          font-size: 12.5px;
          color: var(--text-secondary);
          border-radius: 6px;
          transition: all 0.15s;
        }
        .menu-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        @media (max-width: 900px) {
          .topbar-center {
            display: none;
          }
          .user-meta-text {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
