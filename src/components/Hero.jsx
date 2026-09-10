import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeroWorkflow from './HeroWorkflow.jsx';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const [ideaInput, setIdeaInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const popularIdeas = [
    { label: 'Task Manager', prompt: 'Build a task management application for engineering teams' },
    { label: 'E-commerce', prompt: 'Build a modern e-commerce platform with product catalog and checkout' },
    { label: 'Social Media App', prompt: 'Build a social media application with user feeds and profiles' },
    { label: 'Portfolio Website', prompt: 'Build a responsive developer portfolio website' },
  ];

  const handleSelectIdea = (item) => {
    setIdeaInput(item.prompt);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ideaInput.trim()) {
      return;
    }
    navigate('/create-project', { state: { initialIdea: ideaInput } });
  };

  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Product Intro & Input */}
          <div className="hero-content">
            <div className="hero-badge-wrap">
              <span className="badge-pill">
                <Sparkles size={13} className="badge-sparkle" />
                <span>AI-Powered Development Platform</span>
              </span>
            </div>

            <h1 className="hero-heading">
              Turn Your Idea Into a{' '}
              <span className="highlight">Production-Ready</span> Application.
            </h1>

            <p className="hero-description">
              Describe your software idea in simple language. AutoDevAI&apos;s
              specialized agents understand your requirements, design the
              architecture, develop, test, secure and deploy your application.
            </p>

            {/* Interactive Idea Input Form */}
            <form className="hero-input-form" onSubmit={handleSubmit}>
              <div className="hero-input-group">
                <input
                  type="text"
                  className="hero-input"
                  placeholder="e.g. Build a task management app for students..."
                  value={ideaInput}
                  onChange={(e) => {
                    setIdeaInput(e.target.value);
                    setIsSubmitted(false);
                  }}
                  aria-label="Describe your software idea"
                />
                <button type="submit" className="btn btn-primary btn-start">
                  <span>Start Building</span>
                  <ArrowRight size={16} />
                </button>
              </div>
              {isSubmitted && (
                <div className="hero-input-feedback">
                  <span>Ready to start! Proceed to configure your agents.</span>
                </div>
              )}
            </form>

            {/* Popular Idea Chips */}
            <div className="popular-ideas-wrap">
              <span className="popular-ideas-label">Popular ideas:</span>
              <div className="popular-ideas">
                {popularIdeas.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="chip-tag"
                    onClick={() => handleSelectIdea(item)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Restrained Workflow Diagram */}
          <div className="hero-visual-col">
            <HeroWorkflow />
          </div>
        </div>
      </div>
    </section>
  );
}
