import React from 'react';
import {
  MessageSquare,
  HelpCircle,
  CheckSquare,
  Activity,
  Rocket
} from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: 'Describe Your Idea',
      icon: MessageSquare,
      youDo: 'Share your idea in natural language.',
      autoDevDoes: 'Analyzes and starts the workflow.',
    },
    {
      step: 2,
      title: 'Answer Questions',
      icon: HelpCircle,
      youDo: 'Provide details and clarify requirements.',
      autoDevDoes: 'Identifies missing information and asks relevant questions.',
    },
    {
      step: 3,
      title: 'Review & Approve',
      icon: CheckSquare,
      youDo: 'Review requirements and architecture.',
      autoDevDoes: 'Generates structured docs and recommendations.',
    },
    {
      step: 4,
      title: 'Monitor Progress',
      icon: Activity,
      youDo: 'Track progress and intervene if needed.',
      autoDevDoes: 'Develops, tests and secures your application.',
    },
    {
      step: 5,
      title: 'Final Approval',
      icon: Rocket,
      youDo: 'Approve deployment.',
      autoDevDoes: 'Prepares and deploys your application.',
    },
  ];

  return (
    <section className="section-wrapper" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>You bring the idea. We handle the rest.</p>
        </div>

        <div className="how-it-works-grid">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="how-card card-clean">
                {/* Card Header: Step number badge and Icon */}
                <div className="how-card-header">
                  <span className="how-step-badge">{item.step}</span>
                  <div className="how-card-icon">
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="how-card-title">{item.title}</h3>

                {/* You do vs AutoDevAI does */}
                <div className="how-card-body">
                  <div className="how-role-block you-do">
                    <span className="how-role-label">You do:</span>
                    <p className="how-role-text">{item.youDo}</p>
                  </div>

                  <div className="how-role-block autodevai-does">
                    <span className="how-role-label">AutoDevAI does:</span>
                    <p className="how-role-text">{item.autoDevDoes}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
