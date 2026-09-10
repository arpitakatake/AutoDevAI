import React, { useState } from 'react';
import {
  User,
  Sparkles,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud
} from 'lucide-react';
import './HeroWorkflow.css';

export default function HeroWorkflow() {
  const [activeNode, setActiveNode] = useState(null);

  const agents = [
    {
      id: 'requirements',
      name: 'Requirements',
      icon: FileText,
      color: '#3B82F6',
      bgLight: 'rgba(59, 130, 246, 0.08)',
      desc: 'PRD & Specs'
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: Boxes,
      color: '#6366F1',
      bgLight: 'rgba(99, 102, 241, 0.08)',
      desc: 'System Design'
    },
    {
      id: 'development',
      name: 'Development',
      icon: Code2,
      color: '#10B981',
      bgLight: 'rgba(16, 185, 129, 0.08)',
      desc: 'Full-stack Code'
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: CheckCircle2,
      color: '#F59E0B',
      bgLight: 'rgba(245, 158, 11, 0.08)',
      desc: 'QA & E2E'
    },
  ];

  const bottomAgents = [
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheck,
      color: '#EF4444',
      bgLight: 'rgba(239, 68, 68, 0.08)',
      desc: 'Audit & Compliance'
    },
    {
      id: 'deployment',
      name: 'Deployment',
      icon: Cloud,
      color: '#06B6D4',
      bgLight: 'rgba(6, 182, 212, 0.08)',
      desc: 'CI/CD & Cloud'
    },
  ];

  return (
    <div className="hero-workflow-wrapper">
      <div className="hero-workflow-card">
        {/* Step 1: Your Idea */}
        <div className="hw-idea-node">
          <div className="hw-idea-pill">
            <span className="hw-user-icon-wrap">
              <User size={14} />
            </span>
            <span className="hw-node-title">Your Idea</span>
          </div>
        </div>

        {/* Connector from Idea to Orchestrator */}
        <div className="hw-connector-vertical">
          <svg width="2" height="24" viewBox="0 0 2 24">
            <line x1="1" y1="0" x2="1" y2="24" stroke="var(--workflow-line)" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
          <div className="hw-arrow-down" />
        </div>

        {/* Step 2: AI Orchestrator */}
        <div className="hw-orchestrator-node">
          <div className="hw-orchestrator-pill">
            <Sparkles size={15} className="hw-sparkle-icon" />
            <span>AI Orchestrator</span>
          </div>
        </div>

        {/* SVG Connector lines branching out to 4 agents */}
        <div className="hw-branching-svg-wrap">
          <svg viewBox="0 0 400 36" preserveAspectRatio="none" className="hw-branch-svg">
            <defs>
              <marker
                id="hw-arrow"
                viewBox="0 0 6 6"
                refX="3"
                refY="3"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--workflow-line)" />
              </marker>
            </defs>
            {/* Center stem down */}
            <line x1="200" y1="0" x2="200" y2="14" stroke="var(--workflow-line)" strokeWidth="1.5" />
            {/* Horizontal bar spanning across columns */}
            <line x1="50" y1="14" x2="350" y2="14" stroke="var(--workflow-line)" strokeWidth="1.5" />
            {/* 4 drop stems with arrowheads */}
            <line x1="50" y1="14" x2="50" y2="34" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
            <line x1="150" y1="14" x2="150" y2="34" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
            <line x1="250" y1="14" x2="250" y2="34" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
            <line x1="350" y1="14" x2="350" y2="34" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
          </svg>
        </div>

        {/* 4 Main Agents Grid */}
        <div className="hw-agents-grid">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isHovered = activeNode === agent.id;
            return (
              <div
                key={agent.id}
                className={`hw-agent-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveNode(agent.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div
                  className="hw-agent-icon-box"
                  style={{
                    color: agent.color,
                    backgroundColor: agent.bgLight,
                    borderColor: `${agent.color}30`
                  }}
                >
                  <Icon size={18} />
                </div>
                <span className="hw-agent-name">{agent.name}</span>
              </div>
            );
          })}
        </div>

        {/* Branch down from agents to Security & Deployment */}
        <div className="hw-merge-svg-wrap">
          <svg viewBox="0 0 400 32" preserveAspectRatio="none" className="hw-merge-svg">
            <line x1="150" y1="0" x2="150" y2="30" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
            <line x1="250" y1="0" x2="250" y2="30" stroke="var(--workflow-line)" strokeWidth="1.5" markerEnd="url(#hw-arrow)" />
          </svg>
        </div>

        {/* Bottom 2 Agents (Security & Deployment) */}
        <div className="hw-bottom-agents">
          {bottomAgents.map((agent, idx) => {
            const Icon = agent.icon;
            const isHovered = activeNode === agent.id;
            return (
              <React.Fragment key={agent.id}>
                <div
                  className={`hw-agent-card ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setActiveNode(agent.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <div
                    className="hw-agent-icon-box"
                    style={{
                      color: agent.color,
                      backgroundColor: agent.bgLight,
                      borderColor: `${agent.color}30`
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="hw-agent-name">{agent.name}</span>
                </div>
                {idx === 0 && (
                  <div className="hw-bottom-connector">
                    <div className="hw-bottom-line" />
                    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="hw-arrow-r">
                      <path d="M1 1L5 4L1 7" stroke="var(--workflow-line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
