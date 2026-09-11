import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext.jsx';
import { INITIAL_TEST_SUITE, FIXED_TEST_SUITE } from '../data/mockTesting.js';
import WorkflowStepper from '../components/common/WorkflowStepper.jsx';

export default function TestingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, passTests } = useProject();

  const project = getProject(id);
  const [testData, setTestData] = useState(() =>
    project?.testsPassed ? FIXED_TEST_SUITE : INITIAL_TEST_SUITE
  );
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState('tc-4'); // Default expand a failure for progressive disclosure
  const [isReRunning, setIsReRunning] = useState(false);
  const [notice, setNotice] = useState(
    project?.testsPassed ? 'All 48 tests passing. Codebase verified for production release.' : ''
  );

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

  const handleResolveAndRerun = () => {
    setIsReRunning(true);
    setTimeout(() => {
      setTestData(FIXED_TEST_SUITE);
      setIsReRunning(false);
      setNotice('QA Agent patched rate limiters and null guards. 48/48 tests now passing (95.8% coverage).');
      passTests(project.id);
    }, 900);
  };

  const handleRerunTests = () => {
    setIsReRunning(true);
    setTimeout(() => {
      setIsReRunning(false);
      setNotice('Executed all 48 test suites: 100% assertions verified cleanly.');
    }, 700);
  };

  const handleProceedToSecurity = () => {
    passTests(project.id);
    navigate(`/project/${project.id}/security`);
  };

  const isAllPassed = testData.metrics.failed === 0;

  const filteredCases = testData.testCases.filter((tc) => {
    if (filter === 'passed') return tc.status === 'Passed';
    if (filter === 'failed') return tc.status === 'Failed';
    return true;
  });

  return (
    <div className="workspace-page" style={{ maxWidth: '960px' }}>
      <WorkflowStepper project={project} />

      {/* Screen Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="page-header-title">Automated Testing: {project.name}</h1>
            <span className="status-indicator">
              <span className={`status-dot ${isAllPassed ? 'success' : 'error'}`} />
              <span style={{ fontSize: '0.75rem' }}>
                {isAllPassed ? '48 Tests Passing' : `${testData.metrics.failed} Tests Need Resolution`}
              </span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Automated test suites validating user login, transactions, inputs, and edge scenarios.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {!isAllPassed ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleResolveAndRerun}
              disabled={isReRunning}
            >
              {isReRunning ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <CheckCircle2 size={13} style={{ color: 'var(--success)' }} />
              )}
              <span>{isReRunning ? 'Re-running Tests...' : 'Fix Issues & Run Again'}</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleRerunTests}
              disabled={isReRunning}
            >
              <RefreshCw size={13} className={isReRunning ? 'animate-spin' : ''} />
              <span>{isReRunning ? 'Running Tests...' : 'Run Tests Again'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleProceedToSecurity}
          >
            <span>Proceed to Security Review</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {notice && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--success-subtle)',
            color: 'var(--success)',
            fontSize: '0.8125rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Check size={15} />
          <span>{notice}</span>
        </div>
      )}

      {/* Test Results Document */}
      <div className="workspace-doc">
        {/* Concise Status Overview Bar (No giant metric cards!) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            marginBottom: '18px',
            fontSize: '0.8125rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>
              <strong>Total:</strong> {testData.metrics.total} tests
            </span>
            <span style={{ color: 'var(--success)' }}>
              <strong>Passed:</strong> {testData.metrics.passed}
            </span>
            <span style={{ color: testData.metrics.failed > 0 ? 'var(--error)' : 'var(--text-muted)' }}>
              <strong>Failed:</strong> {testData.metrics.failed}
            </span>
            <span>
              <strong>Coverage:</strong> {testData.metrics.coverage}%
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Execution Duration: {testData.metrics.executionTimeMs} ms
          </div>
        </div>

        {/* Filter Tab Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              All ({testData.testCases.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('passed')}
              className={`btn btn-sm ${filter === 'passed' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              Passed ({testData.metrics.passed})
            </button>
            <button
              type="button"
              onClick={() => setFilter('failed')}
              className={`btn btn-sm ${filter === 'failed' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              Failed ({testData.metrics.failed})
            </button>
          </div>

          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
            Click any test for diagnostic details
          </span>
        </div>

        {/* Clean Results List */}
        <div className="results-list">
          {filteredCases.map((tc) => {
            const isFailed = tc.status === 'Failed';
            const isExpanded = expandedId === tc.id;

            return (
              <div key={tc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div
                  className="results-row"
                  onClick={() => setExpandedId(isExpanded ? null : tc.id)}
                  style={{ backgroundColor: isFailed ? 'rgba(239, 68, 68, 0.03)' : 'transparent' }}
                >
                  <div className="results-row-left">
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '3px',
                        backgroundColor: isFailed ? 'var(--error-subtle)' : 'var(--success-subtle)',
                        color: isFailed ? 'var(--error)' : 'var(--success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {isFailed ? <X size={12} strokeWidth={3} /> : <Check size={12} strokeWidth={3} />}
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.8125rem' }}>
                      {tc.name}
                    </span>
                  </div>

                  <div className="results-row-right">
                    <span>{tc.suite}</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{tc.duration}</span>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      padding: '12px 18px',
                      backgroundColor: 'var(--bg-secondary)',
                      fontSize: '0.75rem',
                      lineHeight: '1.5',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <div style={{ marginBottom: '4px' }}>
                      <strong>Purpose:</strong> {tc.description}
                    </div>

                    {tc.failureDetails && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(239, 68, 68, 0.06)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          color: 'var(--error)',
                        }}
                      >
                        <div>
                          <strong>Failure:</strong> {tc.failureDetails.error}
                        </div>
                        <div style={{ marginTop: '4px', color: 'var(--text-primary)' }}>
                          <strong>Recommendation:</strong> {tc.failureDetails.aiRecommendation}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Approval Bar */}
        <div className="action-bar-sticky">
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {isAllPassed ? 'All Test Suites Passing' : 'Resolve Failures to Proceed'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Next stage will inspect security boundaries and dependency vulnerabilities.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {!isAllPassed ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResolveAndRerun}
                disabled={isReRunning}
              >
                <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
                <span>Fix Issues &amp; Run Again</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRerunTests}
                disabled={isReRunning}
              >
                <RefreshCw size={14} className={isReRunning ? 'animate-spin' : ''} />
                <span>{isReRunning ? 'Running Tests...' : 'Run Tests Again'}</span>
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProceedToSecurity}
            >
              <span>Proceed to Security Review</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
