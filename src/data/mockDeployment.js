/**
 * Mock data for the Deployment Stage.
 */

export const MOCK_DEPLOYMENT_CONFIG = {
  environment: 'Production (US-East / Global Edge)',
  checklist: [
    { id: 'chk-1', title: 'Production assets compiled with zero bundle warnings', completed: true },
    { id: 'chk-2', title: 'Full automated test suite verified passing (48/48 tests)', completed: true },
    { id: 'chk-3', title: 'Security vulnerability scan passed with score >= 95', completed: true },
    { id: 'chk-4', title: 'Database schema migrations and seed scripts validated', completed: true },
    { id: 'chk-5', title: 'SSL / TLS certificate provisioned with automated renewal', completed: true },
  ],
  steps: [
    { id: 'step-1', label: 'Compiling optimized production bundle & static assets', progress: 20 },
    { id: 'step-2', label: 'Provisioning isolated cloud database & executing migrations', progress: 45 },
    { id: 'step-3', label: 'Deploying serverless API containers to Edge compute network', progress: 70 },
    { id: 'step-4', label: 'Running end-to-end synthetic health checks on primary routes', progress: 88 },
    { id: 'step-5', label: 'Routing custom domain & warming global CDN cache', progress: 100 },
  ],
  history: [
    {
      id: 'dep-1',
      version: 'v1.0.0-prod',
      deployedAt: 'Today at 09:45 AM',
      author: 'AutoDevAI Deployment Agent',
      status: 'Live',
      commit: '9f2a4b1 - Release candidate 1.0',
      duration: '42s',
    },
    {
      id: 'dep-0',
      version: 'v0.9.2-staging',
      deployedAt: 'Yesterday at 04:12 PM',
      author: 'AutoDevAI Deployment Agent',
      status: 'Archived',
      commit: '3e8c109 - Pre-flight verification build',
      duration: '38s',
    },
  ],
};
