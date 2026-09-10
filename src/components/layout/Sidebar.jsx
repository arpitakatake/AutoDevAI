import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  Settings,
  HelpCircle,
  Home,
  Check,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { activeProject, projects, setActiveProjectId } = useProject();

  const mainLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Projects', path: '/projects', icon: FolderKanban },
    { label: 'Create Project', path: '/create-project', icon: PlusCircle },
  ];

  const projectStages = activeProject
    ? [
        {
          label: 'Overview',
          path: `/project/${activeProject.id}`,
          icon: Layers,
          completed: true,
        },
        {
          label: 'Requirements',
          path: activeProject.discoveryCompleted
            ? `/project/${activeProject.id}/requirements`
            : `/project/${activeProject.id}/requirements/discovery`,
          icon: FileText,
          completed: activeProject.requirementsApproved,
        },
        {
          label: 'Architecture',
          path: `/project/${activeProject.id}/architecture`,
          icon: Boxes,
          completed: activeProject.architectureApproved,
        },
        {
          label: 'Development',
          path: `/project/${activeProject.id}/development`,
          icon: Code2,
          completed: activeProject.developmentCompleted,
        },
        {
          label: 'Testing',
          path: `/project/${activeProject.id}/testing`,
          icon: CheckCircle2,
          completed: activeProject.testsPassed,
        },
        {
          label: 'Security',
          path: `/project/${activeProject.id}/security`,
          icon: ShieldCheck,
          completed: activeProject.securityResolved,
        },
        {
          label: 'Deployment',
          path: `/project/${activeProject.id}/deployment`,
          icon: Cloud,
          completed: activeProject.deployed,
        },
      ]
    : [];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Sidebar Navigation">
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-brand" onClick={onClose}>
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 3L4 21H10L14 13L18 21H24L14 3Z" fill="url(#s-grad-1)" />
                <path d="M14 13L10 21H18L14 13Z" fill="url(#s-grad-2)" />
                <defs>
                  <linearGradient id="s-grad-1" x1="4" y1="3" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="s-grad-2" x1="10" y1="13" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="brand-name">AutoDevAI</span>
          </Link>
        </div>

        <div className="sidebar-content">
          {/* Main Navigation */}
          <div>
            <div className="sidebar-section-title">Platform</div>
            <ul className="sidebar-nav-list">
              {mainLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      onClick={onClose}
                    >
                      <Icon size={17} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Current Workspace / Project Stages */}
          {activeProject && (
            <div>
              <div className="sidebar-section-title">
                Active Project ({activeProject.name})
              </div>
              <ul className="sidebar-nav-list">
                {projectStages.map((stage) => {
                  const Icon = stage.icon;
                  const isActive =
                    location.pathname === stage.path ||
                    (stage.label === 'Requirements' && location.pathname.includes('/requirements'));

                  return (
                    <li key={stage.path}>
                      <Link
                        to={stage.path}
                        className={`sidebar-stage-item ${isActive ? 'active' : ''} ${
                          stage.completed ? 'completed' : ''
                        }`}
                        onClick={onClose}
                      >
                        <div className="sidebar-stage-left">
                          <Icon size={15} />
                          <span>{stage.label}</span>
                        </div>
                        {stage.completed && <Check size={13} className="text-success" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Other Tools */}
          <div style={{ marginTop: 'auto' }}>
            <div className="sidebar-section-title">Support & System</div>
            <ul className="sidebar-nav-list">
              <li>
                <Link
                  to="/settings"
                  className={`sidebar-nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <Settings size={17} />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`sidebar-nav-item ${location.pathname === '/help' ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <HelpCircle size={17} />
                  <span>Help & Guide</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="sidebar-nav-item" onClick={onClose}>
                  <Home size={17} />
                  <span>Marketing Site</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile-btn" style={{ border: 'none', padding: 0 }}>
            <div className="user-avatar-initials">AM</div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Alex Morgan</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Pro Workspace</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
