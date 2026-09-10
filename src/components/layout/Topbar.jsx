import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  Settings,
  FolderKanban,
  CheckCircle,
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useProject } from '../../context/ProjectContext.jsx';

export default function Topbar({ onToggleSidebar }) {
  const { currentUser, logout } = useAuth();
  const { activeProject } = useProject();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="mobile-sidebar-toggle btn btn-secondary btn-sm"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="topbar-breadcrumbs">
          <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>
            Workspace
          </Link>
          <span>/</span>
          {activeProject ? (
            <span className="topbar-project-tag">
              <FolderKanban size={13} className="text-accent" />
              <span>{activeProject.name}</span>
            </span>
          ) : (
            <span>Dashboard</span>
          )}
        </div>
      </div>

      <div className="topbar-right">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
              }}
            />
          </button>

          {notificationsOpen && (
            <div
              className="card-clean"
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: 300,
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <CheckCircle size={15} className="text-success" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                      JewelCraft deployment verified live.
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>15m ago</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Bell size={15} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                      TaskFlow tests: 3 failures identified by Testing Agent.
                    </p>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>42m ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="user-profile-btn"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
          >
            <div className="user-avatar-initials">{currentUser?.initials || 'AM'}</div>
            <span style={{ display: 'none' }}>{currentUser?.name}</span>
          </button>

          {profileOpen && (
            <div
              className="card-clean"
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: 220,
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{currentUser?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser?.email}</div>
              </div>
              <div style={{ padding: '6px 0' }}>
                <Link
                  to="/settings"
                  className="sidebar-nav-item"
                  onClick={() => setProfileOpen(false)}
                >
                  <Settings size={15} />
                  <span>Account Settings</span>
                </Link>
                <button
                  type="button"
                  className="sidebar-nav-item"
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--error)',
                  }}
                  onClick={handleSignOut}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
