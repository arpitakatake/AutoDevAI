import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import './PlaceholderPage.css';

export default function PlaceholderPage({ title, description }) {
  return (
    <main className="placeholder-page">
      <div className="container placeholder-container">
        <div className="placeholder-card card-clean">
          <div className="placeholder-icon-wrap">
            <Clock size={28} className="placeholder-icon" />
          </div>
          <h1 className="placeholder-title">{title}</h1>
          <p className="placeholder-desc">
            {description ||
              'This page is queued for upcoming product releases. AutoDevAI is currently showcasing the landing page and core workflow.'}
          </p>
          <div className="placeholder-action">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
