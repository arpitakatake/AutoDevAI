import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lightbulb,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  ArrowRight,
  Sparkles,
  Layers,
  Check,
  ExternalLink,
  ChevronRight,
  Bot,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function ProjectOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, setActiveProjectId } = useProject();

  const project = getProject(id);

  // Ensure active project matches current route
  React.useEffect(() => {
    if (project) {
      setActiveProjectId(project.id);
    }
  }, [project, setActiveProjectId]);

  if (!project) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>
          Return to Projects
        </Link>
      </div>
    );
  }

  const lifecycleStages = [
    {
      key: 'IDEA',
      title: 'Idea Formulation',
      description: 'Initial natural language problem description and scope boundary definition.',
      icon: Lightbulb,
      path: `/project/${project.id}`,
      status: 'Completed',
      actionLabel: 'View Concept',
    },
    {
      key: 'REQUIREMENTS',
      title: 'Requirements Discovery & Review',
      description: 'Context-aware feature extraction, user story modeling, and scope approval.',
      icon: FileText,
      path: project.discoveryCompleted
        ? `/project/${project.id}/requirements`
        : `/project/${project.id}/requirements/discovery`,
      status: project.requirementsApproved
        ? 'Completed'
        : project.discoveryCompleted
        ? 'In Review'
        : 'In Progress',
      actionLabel: project.requirementsApproved
        ? 'View Specs'
        : project.discoveryCompleted
        ? 'Review Requirements'
        : 'Resume Discovery',
    },
    {
      key: 'ARCHITECTURE',
      title: 'Architecture Blueprint',
      description: 'Micro-service topology, relational database schema, and OpenAPI specification.',
      icon: Boxes,
      path: `/project/${project.id}/architecture`,
      status: project.architectureApproved
        ? 'Completed'
        : project.requirementsApproved
        ? 'Pending Review'
        : 'Pending',
      actionLabel: project.architectureApproved ? 'View Blueprint' : 'Review Architecture',
    },
    {
      key: 'DEVELOPMENT',
      title: 'Development Workspace',
      description: 'Autonomous component synthesis, state stores, and modular code generation.',
      icon: Code2,
      path: `/project/${project.id}/development`,
      status: project.developmentCompleted
        ? 'Completed'
        : project.architectureApproved
        ? 'In Progress'
        : 'Pending',
      actionLabel: project.developmentCompleted ? 'View Code' : 'Open Workspace',
    },
    {
      key: 'TESTING',
      title: 'Testing & Quality Assurance',
      description: 'Automated unit, integration, and load test suites with AI issue diagnosis.',
      icon: CheckCircle2,
      path: `/project/${project.id}/testing`,
      status: project.testsPassed
        ? 'Completed'
        : project.developmentCompleted
        ? 'Ready to Run'
        : 'Pending',
      actionLabel: project.testsPassed ? 'View Test Report' : 'Run Tests',
    },
    {
      key: 'SECURITY',
      title: 'Security & Vulnerability Audit',
      description: 'Static AST scanning, dependency CVE analysis, and automated remediation.',
      icon: ShieldCheck,
      path: `/project/${project.id}/security`,
      status: project.securityResolved
        ? 'Completed'
        : project.testsPassed
        ? 'Audit Required'
        : 'Pending',
      actionLabel: project.securityResolved ? 'View Security Score' : 'Run Audit',
    },
    {
      key: 'DEPLOYMENT',
      title: 'Deployment & Live Infrastructure',
      description: 'Edge-container deployment, TLS cert provisioning, and live monitoring.',
      icon: Cloud,
      path: `/project/${project.id}/deployment`,
      status: project.deployed ? 'Live' : project.securityResolved ? 'Ready to Deploy' : 'Pending',
      actionLabel: project.deployed ? 'View Live URL' : 'Deploy Application',
    },
  ];

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Project Overview Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">{project.name}</h1>
            <span
              className={`status-pill ${
                project.status === 'Live'
                  ? 'success'
                  : project.status === 'In Progress'
                  ? 'active'
                  : 'neutral'
              }`}
            >
              {project.status}
            </span>
            <span className="badge-pill" style={{ textTransform: 'capitalize' }}>
              {project.category.replace('_', ' ')}
            </span>
          </div>
          <p className="page-header-subtitle">{project.description}</p>
        </div>

        {project.deployed && project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <span>Open Live App</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Next Recommended Action Banner */}
      <div
        className="panel-card"
        style={{
          background:
            'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          marginBottom: 28,
          padding: '24px 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.04em',
                }}
              >
                Recommended Next Step
              </div>
              <h3
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: 2,
                }}
              >
                {project.nextAction}
              </h3>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(project.nextRoute || `/project/${project.id}/requirements`)}
          >
            <span>Continue Stage</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 2-Column Section: Lifecycle Grid & Meta Sidebar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: 28,
          alignItems: 'flex-start',
        }}
      >
        {/* Left: 7 Lifecycle Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Software Development Lifecycle (7 Stages)
            </h2>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Progress: {project.progress}%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {lifecycleStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCompleted =
                stage.status === 'Completed' || stage.status === 'Live';
              const isInProgress =
                stage.status === 'In Progress' ||
                stage.status === 'In Review' ||
                stage.status === 'Ready to Run' ||
                stage.status === 'Pending Review' ||
                stage.status === 'Audit Required' ||
                stage.status === 'Ready to Deploy';

              return (
                <div
                  key={stage.key}
                  className="card-clean"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isCompleted
                          ? 'var(--success-subtle)'
                          : isInProgress
                          ? 'var(--accent-subtle)'
                          : 'var(--bg-secondary)',
                        color: isCompleted
                          ? 'var(--success)'
                          : isInProgress
                          ? 'var(--accent-primary)'
                          : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          marginBottom: 2,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: '0.9375rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {idx + 1}. {stage.title}
                        </span>
                        <span
                          className={`status-pill ${
                            isCompleted ? 'success' : isInProgress ? 'active' : 'neutral'
                          }`}
                          style={{ fontSize: '0.6875rem' }}
                        >
                          {stage.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={stage.path}
                    className={`btn ${isInProgress ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span>{stage.actionLabel}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Project Meta & Agent Team */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Specifications Card */}
          <div className="panel-card" style={{ margin: 0, padding: '22px 20px' }}>
            <h3
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 16,
                letterSpacing: '0.04em',
              }}
            >
              Project Specifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: 2,
                  }}
                >
                  Original Prompt
                </span>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{project.idea}&rdquo;
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Domain Category
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    textTransform: 'capitalize',
                  }}
                >
                  {project.category.replace('_', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Lifecycle Stage
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent-primary)' }}>
                  {project.stage.replace('_', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Overall Progress
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      backgroundColor: 'var(--border-color)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-primary)',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.progress}%
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Last Updated
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {project.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Agents Team */}
          <div className="panel-card" style={{ margin: 0, padding: '22px 20px' }}>
            <h3
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 16,
                letterSpacing: '0.04em',
              }}
            >
              Assigned AI Agents
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Requirement Agent', role: 'Discovery & User Stories', active: true },
                { name: 'Architecture Agent', role: 'System & DB Schemas', active: true },
                { name: 'Development Agent', role: 'Component Synthesis', active: project.progress >= 50 },
                { name: 'Testing Agent', role: 'Automated QA & Diagnosis', active: project.progress >= 70 },
                { name: 'Security Agent', role: 'Vulnerability Analysis', active: project.progress >= 80 },
                { name: 'DevOps Agent', role: 'Edge Deployment Pipeline', active: project.progress >= 90 },
              ].map((agent) => (
                <div
                  key={agent.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Bot size={15} className={agent.active ? 'text-accent' : 'text-muted'} />
                    <div>
                      <div
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: agent.active ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}
                      >
                        {agent.name}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        {agent.role}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`status-pill ${agent.active ? 'active' : 'neutral'}`}
                    style={{ fontSize: '0.625rem', padding: '1px 6px' }}
                  >
                    {agent.active ? 'Assigned' : 'Queued'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
