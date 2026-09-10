import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '#home', path: '/' },
    { label: 'Workflow', href: '#workflow', path: '/workflow' },
    { label: 'How It Works', href: '#how-it-works', path: '/how-it-works' },
    { label: 'Why AutoDevAI', href: '#why-autodevai', path: '/why-autodevai' },
    { label: 'About', href: '#about', path: '/about' },
  ];

  // Track active section on scroll when on the home page
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['home', 'workflow', 'how-it-works', 'why-autodevai', 'about'];

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);

    if (location.pathname === '/' && link.href.startsWith('#')) {
      e.preventDefault();
      const targetId = link.href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      }
    }
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Left: Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setActiveSection('home')}>
          <div className="brand-icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 3L4 21H10L14 13L18 21H24L14 3Z"
                fill="url(#brand-grad-1)"
              />
              <path
                d="M14 13L10 21H18L14 13Z"
                fill="url(#brand-grad-2)"
              />
              <defs>
                <linearGradient id="brand-grad-1" x1="4" y1="3" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
                <linearGradient id="brand-grad-2" x1="10" y1="13" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-name">AutoDevAI</span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isSectionActive =
              location.pathname === '/' &&
              ((link.href === '#home' && activeSection === 'home') ||
                activeSection === link.href.substring(1));

            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${isSectionActive ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (Theme Toggle, Sign In, Get Started) */}
        <div className="nav-desktop-actions">
          <ThemeToggle />
          <Link to="/sign-in" className="btn btn-ghost btn-sm">
            Sign In
          </Link>
          <Link to="/get-started" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile Actions: Theme Toggle & Hamburger Toggle */}
        <div className="nav-mobile-actions">
          <ThemeToggle />
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-nav-divider" />
            <div className="mobile-nav-auth">
              <Link
                to="/sign-in"
                className="btn btn-secondary btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                className="btn btn-primary btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
