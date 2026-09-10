/**
 * Mock data for the Security Stage.
 */

export const INITIAL_SECURITY_REPORT = {
  score: 76,
  status: 'Needs Attention',
  lastScan: 'Just now',
  scannedEndpoints: 18,
  dependenciesAudited: 412,
  findings: [
    {
      id: 'sec-1',
      title: 'Weak Password Complexity Validation',
      severity: 'High',
      status: 'Needs Attention',
      component: 'Authentication Service',
      cve: 'CWE-521',
      description: 'The signup endpoint accepted passwords under 8 characters without requiring symbol or number entropy.',
      recommendation: 'Enforce zxcvbn password scoring and a mandatory 12-character minimum length.',
      autoFixable: true,
    },
    {
      id: 'sec-2',
      title: 'CORS Wildcard Origin on API Gateway',
      severity: 'Medium',
      status: 'Needs Attention',
      component: 'Gateway Middleware',
      cve: 'CWE-942',
      description: 'Access-Control-Allow-Origin was configured to wildcard (*) rather than strict production origin whitelist.',
      recommendation: 'Constrain allowed origins strictly to the authorized application domain and subdomains.',
      autoFixable: true,
    },
    {
      id: 'sec-3',
      title: 'Missing Content-Security-Policy (CSP) Header',
      severity: 'Low',
      status: 'Resolved',
      component: 'HTTP Headers',
      cve: 'CWE-1021',
      description: 'Default server response lacked frame-ancestors and script-src restrictions.',
      recommendation: 'Injected standard Helmet security headers with strict CSP and HSTS directives.',
      autoFixable: false,
    },
    {
      id: 'sec-4',
      title: 'JWT Secret Key Entropy Verification',
      severity: 'High',
      status: 'Resolved',
      component: 'Session Token Provider',
      cve: 'CWE-330',
      description: 'Generated tokens use a 256-bit high-entropy secret stored in encrypted environment vault.',
      recommendation: 'Cryptographic validation verified.',
      autoFixable: false,
    },
  ],
};

export const FIXED_SECURITY_REPORT = {
  score: 98,
  status: 'Clean / Production Ready',
  lastScan: 'Seconds ago',
  scannedEndpoints: 18,
  dependenciesAudited: 412,
  findings: INITIAL_SECURITY_REPORT.findings.map((f) => ({
    ...f,
    status: 'Resolved',
  })),
};
