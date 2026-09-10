import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  User,
  Sparkles,
  Monitor,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud
} from 'lucide-react';
import './About.css';

export default function About() {
  const miniAgents = [
    { label: 'Req.', icon: FileText, color: '#3B82F6' },
    { label: 'Arch.', icon: Boxes, color: '#6366F1' },
    { label: 'Dev.', icon: Code2, color: '#10B981' },
    { label: 'Test.', icon: CheckCircle2, color: '#F59E0B' },
    { label: 'Sec.', icon: ShieldCheck, color: '#EF4444' },
    { label: 'Deploy', icon: Cloud, color: '#06B6D4' },
  ];

  return (
    <section className="section-wrapper" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Text & CTA */}
          <div className="about-content">
            <span className="badge-pill about-badge">
              <span>About AutoDevAI</span>
            </span>

            <h2 className="about-heading">
              Software Development, Reimagined as a Collaborative AI Workflow.
            </h2>

            <p className="about-text">
              AutoDevAI is an AI-driven software development platform that transforms
              your natural-language idea into a structured, production-ready application.
              It brings together specialized agents for the entire SDLC, while keeping
              you in control at important decision points.
            </p>

            <div className="about-action">
              <Link to="/about" className="btn btn-secondary">
                <span>Learn More</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Miniature Collaborative Visual */}
          <div className="about-visual-col">
            <div className="about-visual-card">
              {/* Top: Idea */}
              <div className="mini-idea-node">
                <span className="mini-user-icon">
                  <User size={12} />
                </span>
                <span>Your Idea</span>
              </div>

              {/* Arrow */}
              <div className="mini-arrow-down" />

              {/* Orchestrator */}
              <div className="mini-orchestrator-node">
                <Sparkles size={13} />
                <span>AI Agent Orchestrator</span>
              </div>

              {/* Arrow */}
              <div className="mini-arrow-down" />

              {/* Mini Agents Row */}
              <div className="mini-agents-row">
                {miniAgents.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <div key={agent.label} className="mini-agent-item">
                      <div
                        className="mini-agent-icon"
                        style={{ color: agent.color }}
                      >
                        <Icon size={14} />
                      </div>
                      <span className="mini-agent-label">{agent.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Arrow */}
              <div className="mini-arrow-down" />

              {/* Final Output: Application */}
              <div className="mini-application-node">
                <Monitor size={15} />
                <span>Application</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
