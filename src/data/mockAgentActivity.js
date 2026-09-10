/**
 * Mock global activity feed for Dashboard and notifications.
 */

export const MOCK_AGENT_ACTIVITY = [
  {
    id: 'act-1',
    agent: 'Deployment Agent',
    badge: 'Deployment',
    message: 'Deployed JewelCraft v1.0.0 to production. Live health checks passing.',
    timestamp: '15m ago',
    type: 'success',
  },
  {
    id: 'act-2',
    agent: 'Testing Agent',
    badge: 'Testing',
    message: 'Completed automated regression suite for TaskFlow. 45/48 tests passed.',
    timestamp: '42m ago',
    type: 'info',
  },
  {
    id: 'act-3',
    agent: 'Security Agent',
    badge: 'Security',
    message: 'Audited 18 API routes in TaskFlow. Found 2 remediations (auto-fixable).',
    timestamp: '1h ago',
    type: 'warning',
  },
  {
    id: 'act-4',
    agent: 'Architecture Agent',
    badge: 'Architecture',
    message: 'Generated micro-service topology and database schema for CampusAttend.',
    timestamp: '2h ago',
    type: 'info',
  },
  {
    id: 'act-5',
    agent: 'Requirement Agent',
    badge: 'Requirements',
    message: 'Completed discovery interview with user for CampusAttend (4/4 questions answered).',
    timestamp: '3h ago',
    type: 'info',
  },
];
