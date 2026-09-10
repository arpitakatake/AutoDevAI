import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FolderKanban,
  Check,
  Bot,
  MessageSquarePlus,
  HelpCircle,
} from 'lucide-react';
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState(
    'Analyzing your initial prompt and mapping key system boundaries...'
  );
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (project) {
      setActiveProjectId(project.id);
    }
  }, [project, setActiveProjectId]);

  useEffect(() => {
    // Initial analysis simulation on first load
    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisText(flow.initialAnalysis);
    }, 600);
    return () => clearTimeout(timer);
  }, [flow]);

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

  const currentQuestion = flow.questions[currentQuestionIndex];
  const totalQuestions = flow.questions.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

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

  const handleNoteChange = (text) => {
    setCustomNotes({ ...customNotes, [currentQuestion.id]: text });
  };

  const handleNext = () => {
    updateProjectAnswers(project.id, {
      ...selectedAnswers,
      notes: customNotes,
    });

    if (currentQuestionIndex < totalQuestions - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 400);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsFinished(true);
      }, 500);
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

  // Generate dynamic Agent Evaluation commentary based on chosen option
  const getAgentAssessment = () => {
    if (!hasSelectedAnswer) return null;
    if (currentQuestion.type === 'multiple') {
      const count = Array.isArray(currentAnswerValue) ? currentAnswerValue.length : 1;
      return `Identified ${count} priority capabilities. Requirement Agent will synthesize dedicated acceptance criteria and API endpoints for each.`;
    }
    const selectedOption = currentQuestion.options.find((o) => o.value === currentAnswerValue);
    if (selectedOption) {
      return `Selected "${selectedOption.label}". The architecture will prioritize ${selectedOption.desc ? selectedOption.desc.toLowerCase() : 'this configuration'} as a core operational boundary.`;
    }
    return null;
  };

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Main Workspace Layout: 2 Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1fr',
          gap: 28,
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Interactive Context-Aware Interview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Agent Context & Intent Card */}
          <div
            className="panel-card"
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--accent-subtle-border)',
              margin: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  Requirement Agent Discovery
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Analyzing domain boundaries for &ldquo;{project.name}&rdquo; before generating architectural specifications.
                </p>
              </div>
            </div>
            {analysisText && (
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid var(--border-color)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Agent Rationale: </span>
                {analysisText}
              </div>
            )}
          </div>

          {/* Interactive Question Card or Finished State */}
          {!isFinished ? (
            <div className="panel-card" style={{ margin: 0, padding: '28px 26px' }}>
              {/* Question Header & Progress Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Step {currentQuestionIndex + 1} of {totalQuestions}: {currentQuestion.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {progressPercent}% completed
                </span>
              </div>

              {/* Progress track */}
              <div
                style={{
                  height: 4,
                  width: '100%',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 2,
                  overflow: 'hidden',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: 'var(--accent-primary)',
                    transition: 'width 250ms ease',
                  }}
                />
              </div>

              {/* The Question */}
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 18,
                  lineHeight: 1.35,
                }}
              >
                {currentQuestion.question}
              </h2>

              {/* Options */}
              {isAnalyzing ? (
                <div
                  style={{
                    padding: '36px 0',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Sparkles size={20} className="badge-sparkle" />
                  <span>Requirement Agent is evaluating domain context...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
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
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-md)',
                          border: `1.5px solid ${
                            isSelected ? 'var(--accent-primary)' : 'var(--border-color)'
                          }`,
                          backgroundColor: isSelected ? 'var(--accent-subtle)' : 'var(--bg-card)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: 12,
                          transition: 'all 150ms ease',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 2 }}>
                            {opt.label}
                          </div>
                          {opt.desc && (
                            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                              {opt.desc}
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: currentQuestion.type === 'multiple' ? '4px' : '50%',
                            border: `1.5px solid ${
                              isSelected ? 'var(--accent-primary)' : 'var(--border-hover)'
                            }`,
                            backgroundColor: isSelected ? 'var(--accent-primary)' : 'transparent',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {isSelected && <Check size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Agent Assessment box if answer chosen */}
              {hasSelectedAnswer && !isAnalyzing && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '3px solid var(--accent-primary)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                    Agent Assessment:{' '}
                  </span>
                  {getAgentAssessment()}
                </div>
              )}

              {/* Optional Custom Nuance / Follow-up Input */}
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginBottom: 6,
                  }}
                >
                  <MessageSquarePlus size={13} />
                  <span>Add Specific Rule or Edge Case (Optional):</span>
                </label>
                <input
                  type="text"
                  className="hero-input-group"
                  placeholder="e.g. Instructors must be able to manually override if phone scanner fails..."
                  value={customNotes[currentQuestion?.id] || ''}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', fontSize: '0.8125rem' }}
                />
              </div>

              {/* Navigation Controls */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 16,
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                >
                  <ArrowLeft size={15} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!hasSelectedAnswer || isAnalyzing}
                >
                  <span>
                    {currentQuestionIndex < totalQuestions - 1 ? 'Save & Continue' : 'Finish Discovery'}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            /* Finished Discovery Summary */
            <div
              className="panel-card"
              style={{
                margin: 0,
                padding: '36px 32px',
                textAlign: 'center',
                borderColor: 'var(--success)',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-subtle)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <CheckCircle2 size={28} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>
                Discovery Complete &bull; Specification Formulated
              </h2>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  maxWidth: 520,
                  margin: '0 auto 24px auto',
                  lineHeight: 1.6,
                }}
              >
                The Requirement Agent has synthesized your responses into structured Core Features,
                User Stories, and Functional Acceptance Criteria. You can now review, edit, and approve them.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleFinishDiscovery}
              >
                <span>Review Generated Requirements</span>
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Project Context Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="panel-card" style={{ margin: 0, padding: '22px 20px' }}>
            <h3
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 14,
                letterSpacing: '0.04em',
              }}
            >
              Project Specifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Project Name
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {project.name}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Detected Domain
                </span>
                <span className="badge-pill" style={{ fontSize: '0.75rem', marginTop: 4 }}>
                  {flow.category}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                  Original Prompt
                </span>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{project.idea}&rdquo;
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Discovery Progress
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                        width: `${progressPercent}%`,
                        height: '100%',
                        backgroundColor: 'var(--accent-primary)',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {currentQuestionIndex + 1}/{totalQuestions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
