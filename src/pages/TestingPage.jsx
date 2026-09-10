import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Check,
  XCircle,
  FileCheck2,
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
  const [expandedId, setExpandedId] = useState('tc-4'); // Default expand a failed case to highlight progressive disclosure
  const [isReRunning, setIsReRunning] = useState(false);
  const [fixSuccessNotice, setFixSuccessNotice] = useState(
    project?.testsPassed ? 'All 48 test suites verified and passing with 95.8% coverage.' : ''
  );

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

  const handleResolveAndRerun = () => {
    setIsReRunning(true);
    setTimeout(() => {
      setTestData(FIXED_TEST_SUITE);
      setIsReRunning(false);
      setFixSuccessNotice(
        'QA Agent applied patch: Sliding window capacity increased to 250 req/m and CSV fallback guard injected. 48/48 tests now passing.'
      );
      passTests(project.id);
    }, 1000);
  };

  const handleProceedToSecurity = () => {
    passTests(project.id);
    navigate(`/project/${project.id}/security`);
  };

  const filteredCases = testData.testCases.filter((tc) => {
    if (filter === 'passed') return tc.status === 'Passed';
    if (filter === 'failed') return tc.status === 'Failed';
    return true;
  });

  const isAllPassed = testData.metrics.failed === 0;

  return (
    <div className="workspace-page">
      <WorkflowStepper project={project} />

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Automated Testing &amp; QA</h1>
            <span
              className={`status-pill ${isAllPassed ? 'success' : 'warning'}`}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              {isAllPassed ? <Check size={12} /> : <AlertTriangle size={12} />}
              <span>{isAllPassed ? 'All Tests Passing' : 'Issues Identified'}</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Continuous integration test runner verifying unit contracts, database rollbacks, and security boundaries.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isAllPassed && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResolveAndRerun}
              disabled={isReRunning}
            >
              {isReRunning ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Sparkles size={15} className="text-accent" />
              )}
              <span>{isReRunning ? 'Re-running Tests...' : 'Fix Issues & Run Again'}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleProceedToSecurity}
          >
            <span>Proceed to Security Audit</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Status Notice Banner if fixed */}
      {fixSuccessNotice && (
        <div
          className="panel-card"
          style={{
            padding: '14px 18px',
            marginBottom: 24,
            backgroundColor: 'var(--success-subtle)',
            borderColor: 'var(--success)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: '0.84rem',
          }}
        >
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
          <span>{fixSuccessNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: 28 }}>
        <div className="metric-card">
          <span className="metric-card-label">Total Test Cases</span>
          <span className="metric-card-val">{testData.metrics.total}</span>
          <span className="metric-card-desc">Comprehensive test coverage</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Passed Tests</span>
          <span className="metric-card-val" style={{ color: 'var(--success)' }}>
            {testData.metrics.passed}
          </span>
          <span className="metric-card-desc">Verified business contracts</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Failed Tests</span>
          <span
            className="metric-card-val"
            style={{ color: testData.metrics.failed > 0 ? 'var(--error)' : 'var(--text-muted)' }}
          >
            {testData.metrics.failed}
          </span>
          <span className="metric-card-desc">
            {testData.metrics.failed > 0 ? 'Action required before release' : 'Zero failures'}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Code Coverage</span>
          <span className="metric-card-val" style={{ color: 'var(--accent-primary)' }}>
            {testData.metrics.coverage}%
          </span>
          <span className="metric-card-desc">Branch &amp; statement coverage</span>
        </div>

        <div className="metric-card">
          <span className="metric-card-label">Execution Duration</span>
          <span className="metric-card-val">{testData.metrics.executionTimeMs} ms</span>
          <span className="metric-card-desc">Parallel test execution</span>
        </div>
      </div>

      {/* Filter Tabs & Test Cases List */}
      <div className="panel-card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            borderBottom: '1px solid var(--border-color)',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All Tests ({testData.testCases.length})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'passed' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('passed')}
            >
              Passed ({testData.metrics.passed})
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'failed' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('failed')}
            >
              Failed ({testData.metrics.failed})
            </button>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Click any test case to expand execution diagnostics
          </span>
        </div>

        {/* Test Cases Table / List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredCases.map((tc) => {
            const isFailed = tc.status === 'Failed';
            const isExpanded = expandedId === tc.id;

            return (
              <div
                key={tc.id}
                className="card-clean"
                style={{
                  padding: '14px 18px',
                  borderColor: isFailed ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)',
                  backgroundColor: isFailed ? 'rgba(239, 68, 68, 0.02)' : 'var(--bg-card)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : tc.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {isFailed ? (
                      <XCircle size={18} style={{ color: 'var(--error)' }} />
                    ) : (
                      <CheckCircle2 size={18} className="text-success" />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {tc.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {tc.suite} • Duration: {tc.duration}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      className={`status-pill ${isFailed ? 'warning' : 'success'}`}
                      style={{ fontSize: '0.6875rem' }}
                    >
                      {tc.status}
                    </span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>

                {/* Expanded Details / AI Diagnosis */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong>Description:</strong> {tc.description}
                    </p>

                    {tc.failureDetails && (
                      <div
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'rgba(239, 68, 68, 0.05)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <AlertTriangle size={15} style={{ color: 'var(--error)' }} />
                          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--error)' }}>
                            Assertion Failure: {tc.failureDetails.error}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                            AI Testing Agent Recommendation:{' '}
                          </span>
                          {tc.failureDetails.aiRecommendation}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
