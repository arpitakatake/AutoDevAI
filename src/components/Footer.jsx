import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const location = useLocation();

  const footerNav = [
    { label: 'Home', href: '#home', path: '/' },
    { label: 'Workflow', href: '#workflow', path: '/workflow' },
    { label: 'How It Works', href: '#how-it-works', path: '/how-it-works' },
    { label: 'Why AutoDevAI', href: '#why-autodevai', path: '/why-autodevai' },
    { label: 'About', href: '#about', path: '/about' },
  ];

  const handleLinkClick = (e, link) => {
    if (location.pathname === '/' && link.href.startsWith('#')) {
      e.preventDefault();
      const targetId = link.href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Left: Brand & Tagline */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo footer-logo">
              <div className="brand-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 3L4 21H10L14 13L18 21H24L14 3Z"
                    fill="url(#footer-brand-grad-1)"
                  />
                  <path
                    d="M14 13L10 21H18L14 13Z"
                    fill="url(#footer-brand-grad-2)"
                  />
                  <defs>
                    <linearGradient id="footer-brand-grad-1" x1="4" y1="3" x2="24" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5" />
                      <stop offset="1" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="footer-brand-grad-2" x1="10" y1="13" x2="18" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="brand-name">AutoDevAI</span>
            </Link>
            <p className="footer-tagline">
              AI-driven software development from idea to deployment.
            </p>
          </div>

          {/* Right: Navigation & Social Placeholders */}
          <div className="footer-links-col">
            <nav className="footer-nav" aria-label="Footer Navigation">
              {footerNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="footer-socials" aria-label="Social Media Links">
              <a
                href="#github"
                className="footer-social-link"
                aria-label="GitHub repository placeholder"
                rel="noreferrer"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="footer-social-link"
                aria-label="Twitter profile placeholder"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="footer-social-link"
                aria-label="LinkedIn profile placeholder"
                rel="noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom: Legal & Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 AutoDevAI. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy" className="footer-legal-link">
              Privacy Policy
            </a>
            <span className="footer-legal-sep">•</span>
            <a href="#terms" className="footer-legal-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
