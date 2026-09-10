import React from 'react';
import {
  Layers,
  UserCheck,
  Cpu,
  RefreshCw
} from 'lucide-react';
import './WhyAutoDevAI.css';

export default function WhyAutoDevAI() {
  const features = [
    {
      id: 'end-to-end',
      title: 'End-to-End Development',
      description: 'From idea to deployment in one workflow.',
      icon: Layers,
    },
    {
      id: 'human-in-loop',
      title: 'Human in the Loop',
      description: 'You review and approve key decisions.',
      icon: UserCheck,
    },
    {
      id: 'specialized-agents',
      title: 'Specialized AI Agents',
      description: 'Each stage is handled by a dedicated agent.',
      icon: Cpu,
    },
    {
      id: 'continuous-validation',
      title: 'Continuous Validation',
      description: 'Testing and security feedback improves the final product.',
      icon: RefreshCw,
    },
  ];

  return (
    <section className="section-wrapper alt-bg" id="why-autodevai">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose AutoDevAI?</h2>
          <p>Built for engineers and founders who demand speed without sacrificing control.</p>
        </div>

        <div className="why-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="why-card card-clean">
                <div className="why-icon-box">
                  <Icon size={20} className="why-icon" />
                </div>
                <div className="why-card-text">
                  <h3 className="why-card-title">{feature.title}</h3>
                  <p className="why-card-desc">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
