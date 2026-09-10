import React from 'react';
import {
  Lightbulb,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldAlert,
  Cloud,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import './Workflow.css';

export default function Workflow() {
  const stages = [
    {
      id: 'idea',
      name: 'Idea',
      icon: Lightbulb,
      color: '#3B82F6',
      bgLight: 'rgba(59, 130, 246, 0.08)',
      desc: 'Natural language prompt'
    },
    {
      id: 'requirements',
      name: 'Requirements',
      icon: FileText,
      color: '#8B5CF6',
      bgLight: 'rgba(139, 92, 246, 0.08)',
      desc: 'Specs & PRD definition'
    },
    {
      id: 'architecture',
      name: 'Architecture',
      icon: Boxes,
      color: '#6366F1',
      bgLight: 'rgba(99, 102, 241, 0.08)',
      desc: 'System & DB modeling'
    },
    {
      id: 'development',
      name: 'Development',
      icon: Code2,
      color: '#10B981',
      bgLight: 'rgba(16, 185, 129, 0.08)',
      desc: 'Clean, modular code'
    },
    {
      id: 'testing',
      name: 'Testing',
      icon: CheckCircle2,
      color: '#F59E0B',
      bgLight: 'rgba(245, 158, 11, 0.08)',
      desc: 'Unit & integration tests'
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldAlert,
      color: '#EF4444',
      bgLight: 'rgba(239, 68, 68, 0.08)',
      desc: 'Vulnerability scan'
    },
    {
      id: 'deployment',
      name: 'Deployment',
      icon: Cloud,
      color: '#06B6D4',
      bgLight: 'rgba(6, 182, 212, 0.08)',
      desc: 'Production rollout'
    },
  ];

  return (
    <section className="section-wrapper alt-bg" id="workflow">
      <div className="container">
        <div className="section-header">
          <h2>From Idea to Deployment</h2>
          <p>A streamlined workflow powered by specialized AI agents.</p>
        </div>

        {/* Desktop Horizontal Track */}
        <div className="workflow-desktop-track">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === stages.length - 1;

            return (
              <React.Fragment key={stage.id}>
                <div className="workflow-stage-node">
                  <div
                    className="workflow-icon-circle"
                    style={{
                      color: stage.color,
                      backgroundColor: stage.bgLight,
                      borderColor: `${stage.color}35`,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="workflow-stage-title">{stage.name}</span>
                </div>

                {!isLast && (
                  <div className="workflow-connector-horizontal">
                    <div className="workflow-line-h" />
                    <ArrowRight size={14} className="workflow-arrow-h" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline Track */}
        <div className="workflow-mobile-track">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === stages.length - 1;

            return (
              <div key={stage.id} className="workflow-mobile-item">
                <div className="workflow-mobile-left">
                  <div
                    className="workflow-icon-circle mobile"
                    style={{
                      color: stage.color,
                      backgroundColor: stage.bgLight,
                      borderColor: `${stage.color}35`,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  {!isLast && <div className="workflow-mobile-line-v" />}
                </div>
                <div className="workflow-mobile-content">
                  <span className="workflow-mobile-title">{stage.name}</span>
                  <span className="workflow-mobile-desc">{stage.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
