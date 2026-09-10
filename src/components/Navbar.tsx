import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bot, Sparkles, ArrowRight, LayoutDashboard, Layers, FileCode2, BookOpen } from 'lucide-react'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const isLanding = location.pathname === '/' || location.pathname === '/landing'

  return (
    <nav className="landing-navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="brand-logo">
          <div className="logo-badge">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="logo-dot" />
          </div>
          <div className="brand-title">
            AutoDev<span className="brand-ai">AI</span>
          </div>
          <span className="version-pill">v2.4</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/workflow" className={`nav-link ${location.pathname === '/workflow' ? 'active' : ''}`}>
            <Layers className="w-4 h-4" />
            AI Workflow
          </Link>
          <Link to="/development" className={`nav-link ${location.pathname === '/development' ? 'active' : ''}`}>
            <FileCode2 className="w-4 h-4" />
            IDE
          </Link>
          <Link to="/requirements" className={`nav-link ${location.pathname === '/requirements' ? 'active' : ''}`}>
            <BookOpen className="w-4 h-4" />
            Docs & Specs
          </Link>
        </div>

        {/* CTA */}
        <div className="nav-cta">
          {isLanding ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm">
              <span>Open Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link to="/new-project" className="btn btn-accent btn-sm">
              <Sparkles className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .landing-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(7, 9, 14, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 14px 28px;
        }
        .nav-container {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo-badge {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }
        .logo-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .brand-title {
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #ffffff;
        }
        .brand-ai {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .version-pill {
          font-size: 10px;
          font-family: var(--font-mono);
          padding: 2px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          color: #94a3b8;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
        }
        .nav-link.active {
          color: #a5b4fc;
          background: rgba(99, 102, 241, 0.12);
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  )
}
