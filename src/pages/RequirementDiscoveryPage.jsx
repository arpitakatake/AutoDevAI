import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, HelpCircle } from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { QUESTION_FLOWS } from '../data/mockQuestionFlows.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function RequirementDiscoveryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, updateProjectAnswers, completeDiscovery, setActiveProjectId } = useProject();

  const project = getProject(id);
  const flow = QUESTION_FLOWS[project?.category] || QUESTION_FLOWS.generic;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(() => project?.answers || {});
  const [customNotes, setCustomNotes] = useState(() => project?.answers?.notes || {});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (project) {
      setActiveProjectId(project.id);
    }
  }, [project, setActiveProjectId]);

  if (!project) {
    return (
      <div className="workspace-page" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Project not found</h2>
        <Link to="/projects" className="btn btn-primary btn-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const currentQuestion = flow.questions[currentQuestionIndex];
  const totalQuestions = flow.questions.length;

  const handleOptionSelect = (value) => {
    if (currentQuestion.type === 'multiple') {
      const existing = selectedAnswers[currentQuestion.id] || [];
      const updated = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: updated });
    } else {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion.id]: value });
    }
  };

  const handleNext = () => {
    updateProjectAnswers(project.id, {
      ...selectedAnswers,
      notes: customNotes,
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setIsFinished(false);
    }
  };

  const handleFinishDiscovery = () => {
    completeDiscovery(project.id);
    navigate(`/project/${project.id}/requirements`);
  };

  const currentAnswerValue = selectedAnswers[currentQuestion?.id];
  const hasSelectedAnswer =
    currentQuestion?.type === 'multiple'
      ? Array.isArray(currentAnswerValue) && currentAnswerValue.length > 0
      : Boolean(currentAnswerValue);

  // Dynamic feedback on chosen option
  const getSelectedInsight = () => {
    if (!hasSelectedAnswer) return null;
    if (currentQuestion.type === 'multiple') {
      const count = Array.isArray(currentAnswerValue) ? currentAnswerValue.length : 1;
      return `Selected ${count} priorities. AutoDevAI will synthesize dedicated acceptance criteria and operational logic for each.`;
    }
    const selectedOption = currentQuestion.options.find((o) => o.value === currentAnswerValue);
    if (selectedOption?.agentInsight) {
      return selectedOption.agentInsight;
    }
    return 'Decision recorded. The application structure will incorporate this choice.';
  };

  return (
    <div className="workspace-page" style={{ maxWidth: '820px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row" style={{ marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">{project.name}</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>&bull; Requirement Discovery</span>
          </div>
          <p className="page-header-subtitle">
            AutoDevAI is analyzing your idea to prepare a complete product specification.
          </p>
        </div>

        {!isFinished && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="workspace-doc" style={{ padding: '24px 28px' }}>
          {/* Agent Analysis Context */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
            }}
          >
            <strong style={{ color: 'var(--text-primary)' }}>Idea Analysis: </strong>
            &ldquo;{project.idea}&rdquo;
          </div>

          {/* Question Title & Text */}
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--accent-primary)',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Decision: {currentQuestion.title}
            </span>
            <h2
              style={{
                fontSize: '1.1875rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: '1.35',
                marginBottom: '8px',
              }}
            >
              {currentQuestion.question}
            </h2>

            {/* Why We're Asking Callout */}
            {currentQuestion.whyAsking && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px',
                  lineHeight: '1.4',
                }}
              >
                <HelpCircle size={13} style={{ marginTop: '1px', flexShrink: 0 }} />
                <span>
                  <strong>Why we&apos;re asking:</strong> {currentQuestion.whyAsking}
                </span>
              </div>
            )}
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            {currentQuestion.options.map((opt) => {
              const isSelected =
                currentQuestion.type === 'multiple'
                  ? Array.isArray(currentAnswerValue) && currentAnswerValue.includes(opt.value)
                  : currentAnswerValue === opt.value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOptionSelect(opt.value)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    backgroundColor: isSelected ? 'var(--accent-subtle)' : 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '2px' }}>
                      {opt.label}
                    </div>
                    {opt.desc && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {opt.desc}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: currentQuestion.type === 'multiple' ? '3px' : '50%',
                      border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                      backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Real-time Agent Feedback on Choice */}
          {hasSelectedAnswer && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                borderLeft: '2px solid var(--accent-primary)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
                lineHeight: '1.4',
              }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>Agent Note: </strong>
              {getSelectedInsight()}
            </div>
          )}

          {/* Optional Nuance / Custom Rule */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                marginBottom: '4px',
              }}
            >
              Add a specific rule or preference for this area (Optional):
            </label>
            <input
              type="text"
              className="input-clean"
              placeholder="e.g. Instructors should be able to manually override if a student forgets their phone..."
              value={customNotes[currentQuestion?.id] || ''}
              onChange={(e) => setCustomNotes({ ...customNotes, [currentQuestion?.id]: e.target.value })}
              style={{ fontSize: '0.75rem', padding: '7px 10px' }}
            />
          </div>

          {/* Navigation Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1 }}
            >
              <ArrowLeft size={13} />
              <span>Back</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
            >
              <span>
                {currentQuestionIndex < totalQuestions - 1 ? 'Save & Next Question' : 'Finish & Generate Requirements'}
              </span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* Discovery Complete Document */
        <div className="workspace-doc" style={{ padding: '28px 32px' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--success)',
              }}
            >
              Discovery Complete
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
              Requirements Formulated
            </h2>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
            Based on your answers, AutoDevAI has compiled a complete product specification covering:
          </p>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              marginBottom: '28px',
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--success)' }} />
              <span>Core Features and user capabilities</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--success)' }} />
              <span>User Stories with acceptance criteria</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--success)' }} />
              <span>Operational rules and data validation</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--success)' }} />
              <span>Performance and security standards</span>
            </li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFinishDiscovery}
            >
              <span>Review Product Specification</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
