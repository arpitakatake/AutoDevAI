import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Weak', color: 'var(--error)', width: '33%' };
    if (password.length < 10) return { label: 'Medium', color: 'var(--warning)', width: '66%' };
    return { label: 'Strong', color: 'var(--success)', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      signup(fullName, email, password);
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color var(--transition-base)',
      }}
    >
      {/* Mini top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <path d="M14 3L4 21H10L14 13L18 21H24L14 3Z" fill="url(#s-up-1)" />
              <path d="M14 13L10 21H18L14 13Z" fill="url(#s-up-2)" />
              <defs>
                <linearGradient id="s-up-1" x1="4" y1="3" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
                <linearGradient id="s-up-2" x1="10" y1="13" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-name">AutoDevAI</span>
        </Link>
        <ThemeToggle />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <div
          className="card-clean"
          style={{
            maxWidth: 460,
            width: '100%',
            padding: '36px 32px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 700, marginBottom: 8 }}>
              Create your AutoDevAI account
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Start turning your software ideas into production systems.
            </p>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--error-subtle)',
                color: 'var(--error)',
                fontSize: '0.84rem',
                marginBottom: 20,
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Full Name
              </label>
              <div className="hero-input-group" style={{ padding: '8px 14px' }}>
                <User size={16} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="text"
                  className="hero-input"
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                Work Email Address
              </label>
              <div className="hero-input-group" style={{ padding: '8px 14px' }}>
                <Mail size={16} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="email"
                  className="hero-input"
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Password
              </label>
              <div className="hero-input-group" style={{ padding: '8px 14px' }}>
                <Lock size={16} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="password"
                  className="hero-input"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {strength && (
                <div style={{ marginTop: 6 }}>
                  <div
                    style={{
                      height: 4,
                      width: '100%',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: strength.width,
                        backgroundColor: strength.color,
                        transition: 'all 200ms ease',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: strength.color, marginTop: 2, display: 'inline-block' }}>
                    Password Strength: {strength.label}
                  </span>
                </div>
              )}
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
                Confirm Password
              </label>
              <div className="hero-input-group" style={{ padding: '8px 14px' }}>
                <Lock size={16} style={{ color: 'var(--text-muted)', marginRight: 8 }} />
                <input
                  type="password"
                  className="hero-input"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px 18px', marginTop: 10 }}
              disabled={loading}
            >
              {loading ? <span>Creating Account...</span> : <span>Create Account →</span>}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginTop: 24,
            }}
          >
            Already have an account?{' '}
            <Link to="/sign-in" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
