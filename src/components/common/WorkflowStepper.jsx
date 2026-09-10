import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Lightbulb,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  Check,
} from 'lucide-react';

export default function WorkflowStepper({ project }) {
  const location = useLocation();

  if (!project) return null;

  const stages = [
    {
      key: 'IDEA',
      label: 'Idea',
      icon: Lightbulb,
      path: `/project/${project.id}`,
      isCompleted: true,
    },
    {
      key: 'REQUIREMENTS',
      label: 'Requirements',
      icon: FileText,
      path: project.discoveryCompleted
        ? `/project/${project.id}/requirements`
        : `/project/${project.id}/requirements/discovery`,
      isCompleted: project.requirementsApproved,
    },
    {
      key: 'ARCHITECTURE',
      label: 'Architecture',
      icon: Boxes,
      path: `/project/${project.id}/architecture`,
      isCompleted: project.architectureApproved,
    },
    {
      key: 'DEVELOPMENT',
      label: 'Development',
      icon: Code2,
      path: `/project/${project.id}/development`,
      isCompleted: project.developmentCompleted,
    },
    {
      key: 'TESTING',
      label: 'Testing',
      icon: CheckCircle2,
      path: `/project/${project.id}/testing`,
      isCompleted: project.testsPassed,
    },
    {
      key: 'SECURITY',
      label: 'Security',
      icon: ShieldCheck,
      path: `/project/${project.id}/security`,
      isCompleted: project.securityResolved,
    },
    {
      key: 'DEPLOYMENT',
      label: 'Deployment',
      icon: Cloud,
      path: `/project/${project.id}/deployment`,
      isCompleted: project.deployed,
    },
  ];

  return (
    <nav className="workflow-stepper" aria-label="Project Lifecycle Stepper">
      {stages.map((stage, idx) => {
        const Icon = stage.icon;
        const isActive = location.pathname === stage.path || location.pathname.startsWith(stage.path);
        const isCompleted = stage.isCompleted;

        return (
          <React.Fragment key={stage.key}>
            <Link
              to={stage.path}
              className={`stepper-item ${isActive ? 'active' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
              title={`Stage: ${stage.label}`}
            >
              <div className="stepper-icon-wrap">
                {isCompleted ? <Check size={14} /> : <Icon size={14} />}
              </div>
              <span className="stepper-label">{stage.label}</span>
            </Link>
            {idx < stages.length - 1 && <span className="stepper-sep">→</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
