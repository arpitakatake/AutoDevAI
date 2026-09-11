import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  ChevronRight,
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
      num: '01',
      title: 'Idea Formulation',
      deliverable: 'Natural language problem description & scope definition',
      path: `/project/${project.id}`,
      status: 'Completed',
      dotClass: 'completed',
      actionLabel: 'View Prompt',
      isCurrent: false,
    },
    {
      key: 'REQUIREMENTS',
      num: '02',
      title: 'Requirements Discovery',
      deliverable: project.requirementsApproved
        ? 'PRD specification, user stories & operational rules approved'
        : project.discoveryCompleted
        ? 'Discovery interview finished, PRD awaiting review'
        : 'Domain discovery questionnaire in progress',
      path: project.discoveryCompleted
        ? `/project/${project.id}/requirements`
        : `/project/${project.id}/requirements/discovery`,
      status: project.requirementsApproved
        ? 'Completed'
        : project.discoveryCompleted
        ? 'In Review'
        : 'In Progress',
      dotClass: project.requirementsApproved ? 'completed' : 'active',
      actionLabel: project.requirementsApproved
        ? 'View Specs'
        : project.discoveryCompleted
        ? 'Review Requirements'
        : 'Resume Discovery',
      isCurrent: !project.requirementsApproved,
    },
    {
      key: 'ARCHITECTURE',
      num: '03',
      title: 'Architecture Blueprint',
      deliverable: project.architectureApproved
        ? 'Technology stack, relational schema & OpenAPI routes approved'
        : project.requirementsApproved
        ? 'Technical architecture generated, awaiting approval'
        : 'Awaiting requirements approval',
      path: `/project/${project.id}/architecture`,
      status: project.architectureApproved
        ? 'Completed'
        : project.requirementsApproved
        ? 'Pending Review'
        : 'Pending',
      dotClass: project.architectureApproved
        ? 'completed'
        : project.requirementsApproved
        ? 'active'
        : 'pending',
      actionLabel: project.architectureApproved ? 'View Blueprint' : 'Review Architecture',
      isCurrent: project.requirementsApproved && !project.architectureApproved,
    },
    {
      key: 'DEVELOPMENT',
      num: '04',
      title: 'Development Workspace',
      deliverable: project.developmentCompleted
        ? '6 multi-file source modules & state stores synthesized'
        : project.architectureApproved
        ? 'Source synthesis active in virtual workspace'
        : 'Awaiting architecture approval',
      path: `/project/${project.id}/development`,
      status: project.developmentCompleted
        ? 'Completed'
        : project.architectureApproved
        ? 'In Progress'
        : 'Pending',
      dotClass: project.developmentCompleted
        ? 'completed'
        : project.architectureApproved
        ? 'active'
        : 'pending',
      actionLabel: project.developmentCompleted ? 'Open Code Workspace' : 'Open Workspace',
      isCurrent: project.architectureApproved && !project.developmentCompleted,
    },
    {
      key: 'TESTING',
      num: '05',
      title: 'Testing & Verification',
      deliverable: project.testsPassed
        ? '48 automated test suites passing across auth, data & edge'
        : project.developmentCompleted
        ? 'Test suites prepared, awaiting test execution run'
        : 'Awaiting code synthesis',
      path: `/project/${project.id}/testing`,
      status: project.testsPassed
        ? 'Completed'
        : project.developmentCompleted
        ? 'Ready to Run'
        : 'Pending',
      dotClass: project.testsPassed
        ? 'completed'
        : project.developmentCompleted
        ? 'active'
        : 'pending',
      actionLabel: project.testsPassed ? 'View Test Report' : 'Run Tests',
      isCurrent: project.developmentCompleted && !project.testsPassed,
    },
    {
      key: 'SECURITY',
      num: '06',
      title: 'Security & Vulnerability Audit',
      deliverable: project.securityResolved
        ? '0 High/Medium CVE vulnerabilities, OWASP headers verified'
        : project.testsPassed
        ? 'Security audit required before production deployment'
        : 'Awaiting testing completion',
      path: `/project/${project.id}/security`,
      status: project.securityResolved
        ? 'Completed'
        : project.testsPassed
        ? 'Audit Required'
        : 'Pending',
      dotClass: project.securityResolved
        ? 'completed'
        : project.testsPassed
        ? 'active'
        : 'pending',
      actionLabel: project.securityResolved ? 'View Security Score' : 'Run Audit',
      isCurrent: project.testsPassed && !project.securityResolved,
    },
    {
      key: 'DEPLOYMENT',
      num: '07',
      title: 'Deployment & Live Hosting',
      deliverable: project.deployed
        ? 'Live on Edge CDN with automated TLS 1.3 certificate'
        : project.securityResolved
        ? 'Build verified and ready for edge container deployment'
        : 'Awaiting security clearance',
      path: `/project/${project.id}/deployment`,
      status: project.deployed
        ? 'Live'
        : project.securityResolved
        ? 'Ready to Deploy'
        : 'Pending',
      dotClass: project.deployed
        ? 'completed'
        : project.securityResolved
        ? 'active'
        : 'pending',
      actionLabel: project.deployed ? 'View Live URL' : 'Deploy Application',
      isCurrent: project.securityResolved && !project.deployed,
    },
  ];

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Project Overview Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 className="page-header-title">{project.name}</h1>
            <span className="status-indicator">
              <span className={`status-dot ${project.status === 'Live' ? 'active' : 'completed'}`} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {project.status}
              </span>
            </span>
            <span className="badge-pill" style={{ textTransform: 'capitalize' }}>
              {project.category.replace('_', ' ')}
            </span>
          </div>
          <p className="page-header-subtitle">{project.description}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {project.deployed && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <span>Open Live URL</span>
              <ExternalLink size={13} />
            </a>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate(project.nextRoute || `/project/${project.id}/requirements`)}
          >
            <span>Resume: {project.nextAction}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Product Layout */}
      <div className="project-overview-grid">
        {/* Left Column: Lifecycle Progression Table */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
              Software Development Lifecycle
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Progress: <strong style={{ color: 'var(--text-primary)' }}>{project.progress}%</strong>
            </span>
          </div>

          <div className="data-table-container">
            <table className="clean-table">
              <thead>
                <tr>
                  <th style={{ width: '45px' }}>#</th>
                  <th style={{ width: '210px' }}>Stage</th>
                  <th>Deliverable / Artifact</th>
                  <th style={{ width: '120px' }}>Status</th>
                  <th style={{ width: '130px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {lifecycleStages.map((stage) => (
                  <tr
                    key={stage.key}
                    style={{
                      backgroundColor: stage.isCurrent ? 'var(--accent-subtle)' : 'transparent',
                    }}
                  >
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {stage.num}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {stage.title}
                      </div>
                    </td>
                    <td>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                        {stage.deliverable}
                      </span>
                    </td>
                    <td>
                      <span className="status-indicator">
                        <span className={`status-dot ${stage.dotClass}`} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {stage.status}
                        </span>
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to={stage.path}
                        className={`btn ${stage.isCurrent ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span>{stage.actionLabel}</span>
                        <ChevronRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Project Context & Pipeline Environment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Specifications Card */}
          <div className="panel-card" style={{ margin: 0, padding: '20px' }}>
            <div className="panel-header" style={{ marginBottom: 14 }}>
              <h3 className="panel-title" style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Project Specifications
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Metadata</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Initial Prompt
                </span>
                <div
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{project.idea}&rdquo;
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
                    Domain
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                    {project.category.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 2 }}>
                    Target Stack
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    React + Vite + SQL
                  </span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Overall Lifecycle Completion
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 5,
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
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {project.progress}%
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: 8, borderTop: '1px solid var(--border-color)' }}>
                <span>Last Updated</span>
                <span style={{ color: 'var(--text-secondary)' }}>{project.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Autonomous Pipeline Roles */}
          <div className="panel-card" style={{ margin: 0, padding: '20px' }}>
            <div className="panel-header" style={{ marginBottom: 14 }}>
              <h3 className="panel-title" style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pipeline Automation
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>6 Workflows</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'Requirement Discovery', scope: 'Context Q&A & PRD Generation', state: 'active' },
                { name: 'Architecture Synthesis', scope: 'Relational Schemas & OpenAPI', state: project.requirementsApproved ? 'active' : 'pending' },
                { name: 'Development Synthesizer', scope: 'Multi-file Code Generation', state: project.architectureApproved ? 'active' : 'pending' },
                { name: 'Automated QA Runner', scope: '48 Unit, Integration & Load Suites', state: project.developmentCompleted ? 'active' : 'pending' },
                { name: 'Security AST Scanner', scope: 'CVE Analysis & OWASP Hardening', state: project.testsPassed ? 'active' : 'pending' },
                { name: 'Edge DevOps Pipeline', scope: 'Container Release & TLS Routing', state: project.securityResolved ? 'active' : 'pending' },
              ].map((pipe) => (
                <div
                  key={pipe.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.8125rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pipe.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{pipe.scope}</div>
                  </div>
                  <span className="status-indicator">
                    <span className={`status-dot ${pipe.state}`} />
                    <span style={{ fontSize: '0.6875rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                      {pipe.state}
                    </span>
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
