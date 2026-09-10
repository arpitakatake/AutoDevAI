import React, { useState } from 'react';
import {
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  Key,
  Shield,
  Check,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem('autodevai-theme') || 'dark');
  const [notification, setNotification] = useState('');

  // Preference switches
  const [autoFixSec, setAutoFixSec] = useState(true);
  const [autoRunTests, setAutoRunTests] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('autodevai-theme', newTheme);
    setNotification(`Theme changed to ${newTheme} mode.`);
    setTimeout(() => setNotification(''), 2500);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setNotification('Settings saved successfully.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="workspace-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Settings &amp; Workspace Preferences</h1>
          <p className="page-header-subtitle">
            Manage your account identity, theme appearance, and autonomous AI swarm parameters.
          </p>
        </div>
      </div>

      {notification && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'var(--success-subtle)',
            color: 'var(--success)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.84rem',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
        {/* Left Column: Profile & Appearance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* User Profile Card */}
          <div className="panel-card" style={{ margin: 0 }}>
            <div className="panel-header">
              <h3 className="panel-title">Developer Identity</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Profile</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                }}
              >
                {currentUser?.initials || 'AM'}
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {currentUser?.name || 'Alex Morgan'}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {currentUser?.email || 'alex@autodevai.com'} &bull; {currentUser?.role || 'Product Engineer'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Display Name
                </label>
                <input
                  type="text"
                  className="hero-input-group"
                  defaultValue={currentUser?.name || 'Alex Morgan'}
                  style={{ width: '100%', padding: '10px 14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className="hero-input-group"
                  defaultValue={currentUser?.email || 'alex@autodevai.com'}
                  style={{ width: '100%', padding: '10px 14px' }}
                  disabled
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 6 }}>
                  Role in Organization
                </label>
                <input
                  type="text"
                  className="hero-input-group"
                  defaultValue={currentUser?.role || 'Product Engineer'}
                  style={{ width: '100%', padding: '10px 14px' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ alignSelf: 'flex-start', marginTop: 6 }}
              >
                Save Profile
              </button>
            </form>
          </div>

          {/* Theme & Appearance */}
          <div className="panel-card" style={{ margin: 0 }}>
            <div className="panel-header">
              <h3 className="panel-title">Interface Appearance</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Theme Setting</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <button
                type="button"
                className={`card-clean ${theme === 'dark' ? 'border-accent' : ''}`}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  borderColor: theme === 'dark' ? 'var(--accent-primary)' : 'var(--border-color)',
                  backgroundColor: theme === 'dark' ? 'var(--accent-subtle)' : 'var(--bg-card)',
                }}
                onClick={() => handleThemeChange('dark')}
              >
                <Moon size={18} className="text-accent" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Dark Theme</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Default SaaS mode</div>
                </div>
              </button>

              <button
                type="button"
                className={`card-clean ${theme === 'light' ? 'border-accent' : ''}`}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  borderColor: theme === 'light' ? 'var(--accent-primary)' : 'var(--border-color)',
                  backgroundColor: theme === 'light' ? 'var(--accent-subtle)' : 'var(--bg-card)',
                }}
                onClick={() => handleThemeChange('light')}
              >
                <Sun size={18} style={{ color: 'var(--warning)' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Light Theme</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clean crisp contrast</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Agent Automation Rules & Integrations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Agent Swarm Rules */}
          <div className="panel-card" style={{ margin: 0 }}>
            <div className="panel-header">
              <h3 className="panel-title">Autonomous Agent Policies</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automation Guardrails</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    Automated Vulnerability Auto-Fix
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Allow Security Agent to inject patches for High &amp; Medium CVE findings automatically.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoFixSec}
                  onChange={(e) => setAutoFixSec(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    Continuous QA Execution
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Execute all 48 test suites immediately following code synthesis.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoRunTests}
                  onChange={(e) => setAutoRunTests(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    Deployment Email Digest
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Receive notification whenever an edge deployment completes.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Connected Integrations */}
          <div className="panel-card" style={{ margin: 0 }}>
            <div className="panel-header">
              <h3 className="panel-title">Connected Integrations</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3 Active</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'GitHub Repository Sync', desc: 'Sync code branches & PRs', connected: true },
                { name: 'Edge CDN Network', desc: 'Global serverless container hosting', connected: true },
                { name: 'Slack Alerts Webhook', desc: 'Deploy notifications channel', connected: true },
              ].map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <span className="status-pill success" style={{ fontSize: '0.6875rem' }}>
                    Connected
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
