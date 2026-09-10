import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CTA.css';

export default function CTA() {
  return (
    <section className="section-wrapper cta-section">
      <div className="container">
        <div className="cta-box">
          <div className="cta-content">
            <h2 className="cta-heading">Ready to Build Something Amazing?</h2>
            <p className="cta-description">
              Join AutoDevAI and turn your ideas into real, working applications
              &mdash; with the power of autonomous AI agents.
            </p>
          </div>
          <div className="cta-action">
            <Link to="/get-started" className="btn btn-primary btn-lg cta-btn">
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
