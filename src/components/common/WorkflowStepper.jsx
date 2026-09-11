import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function WorkflowStepper({ project }) {
  const location = useLocation();

  if (!project) return null;

  const stages = [
    {
      key: 'IDEA',
      label: 'Idea',
      path: `/project/${project.id}`,
      isCompleted: true,
    },
    {
      key: 'REQUIREMENTS',
      label: 'Requirements',
      path: project.discoveryCompleted
        ? `/project/${project.id}/requirements`
        : `/project/${project.id}/requirements/discovery`,
      isCompleted: project.requirementsApproved,
    },
    {
      key: 'ARCHITECTURE',
      label: 'Architecture',
      path: `/project/${project.id}/architecture`,
      isCompleted: project.architectureApproved,
    },
    {
      key: 'DEVELOPMENT',
      label: 'Development',
      path: `/project/${project.id}/development`,
      isCompleted: project.developmentCompleted,
    },
    {
      key: 'TESTING',
      label: 'Testing',
      path: `/project/${project.id}/testing`,
      isCompleted: project.testsPassed,
    },
    {
      key: 'SECURITY',
      label: 'Security',
      path: `/project/${project.id}/security`,
      isCompleted: project.securityResolved,
    },
    {
      key: 'DEPLOYMENT',
      label: 'Release',
      path: `/project/${project.id}/deployment`,
      isCompleted: project.deployed,
    },
  ];

  return (
    <nav className="workflow-stepper" aria-label="Project lifecycle progress">
      {stages.map((stage, idx) => {
        const isActive =
          stage.key === 'IDEA'
            ? location.pathname === `/project/${project.id}` || location.pathname === `/project/${project.id}/`
            : stage.key === 'REQUIREMENTS'
            ? location.pathname.includes('/requirements')
            : location.pathname.startsWith(stage.path);
        const isCompleted = stage.isCompleted;

        return (
          <React.Fragment key={stage.key}>
            <Link
              to={stage.path}
              className={`stepper-item ${isActive ? 'active' : ''} ${
                isCompleted ? 'completed' : ''
              }`}
              title={`Stage ${idx + 1}: ${stage.label}`}
            >
              <span className="stepper-num">
                {isCompleted ? <Check size={12} strokeWidth={2.5} /> : `${idx + 1}.`}
              </span>
              <span>{stage.label}</span>
            </Link>
            {idx < stages.length - 1 && <span className="stepper-sep">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
