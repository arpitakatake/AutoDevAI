/**
 * Mock data for the Testing Stage.
 */

export const INITIAL_TEST_SUITE = {
  metrics: {
    total: 48,
    passed: 45,
    failed: 3,
    coverage: 92.4,
    executionTimeMs: 1420,
  },
  testCases: [
    {
      id: 'tc-1',
      name: 'Authentication: Valid JWT token grants access',
      suite: 'Unit / Auth',
      status: 'Passed',
      duration: '18ms',
      description: 'Verifies bearer token decoding and claims verification.',
    },
    {
      id: 'tc-2',
      name: 'Authentication: Expired token rejected with 401',
      suite: 'Unit / Auth',
      status: 'Passed',
      duration: '12ms',
      description: 'Ensures expired session tokens cannot access protected routes.',
    },
    {
      id: 'tc-3',
      name: 'Transaction: Record creation writes to audit log',
      suite: 'Integration / Core',
      status: 'Passed',
      duration: '45ms',
      description: 'Verifies database transaction rollbacks and audit log consistency.',
    },
    {
      id: 'tc-4',
      name: 'Rate Limiter: Burst traffic handled gracefully under load',
      suite: 'Performance / Load',
      status: 'Failed',
      duration: '310ms',
      description: 'Simulates 500 concurrent requests within a 2-second burst window.',
      failureDetails: {
        error: 'Status 429 dropped 4 valid authenticated requests prematurely',
        severity: 'Medium',
        aiRecommendation:
          'Increase Redis sliding window token bucket capacity from 100 to 250 requests per minute for authenticated tokens.',
      },
    },
    {
      id: 'tc-5',
      name: 'Input Sanitization: Malicious SQL in search parameters escaped',
      suite: 'Security / Unit',
      status: 'Passed',
      duration: '22ms',
      description: 'Tests parameterized query bindings against SQL injection attempts.',
    },
    {
      id: 'tc-6',
      name: 'Export Service: Empty datasets generate valid blank templates',
      suite: 'Integration / Export',
      status: 'Failed',
      duration: '88ms',
      description: 'Attempts CSV export when query returns 0 matching records.',
      failureDetails: {
        error: 'NullPointerException on headers when dataset collection is empty',
        severity: 'Low',
        aiRecommendation:
          'Add a fallback header row guard to the CSV streaming pipeline when row count equals zero.',
      },
    },
    {
      id: 'tc-7',
      name: 'End-to-End: Full user workflow from creation to summary report',
      suite: 'E2E / Cypress',
      status: 'Passed',
      duration: '820ms',
      description: 'Automated browser journey through login, form input, and dashboard view.',
    },
  ],
};

export const FIXED_TEST_SUITE = {
  metrics: {
    total: 48,
    passed: 48,
    failed: 0,
    coverage: 95.8,
    executionTimeMs: 1280,
  },
  testCases: [
    ...INITIAL_TEST_SUITE.testCases.map((tc) => ({
      ...tc,
      status: 'Passed',
      failureDetails: null,
    })),
  ],
};
