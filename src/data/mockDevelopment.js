/**
 * Mock data for the Development Workspace stage.
 */

export const MOCK_DEVELOPMENT = {
  modules: [
    {
      id: 'mod-auth',
      name: 'Authentication & Session Boundary',
      description: 'JWT issuance, password hashing with Argon2id, and role-based middleware.',
      status: 'Completed',
      progress: 100,
      files: ['src/modules/auth/auth.service.js', 'src/modules/auth/jwt.strategy.js'],
    },
    {
      id: 'mod-core',
      name: 'Core Domain Engine & Validation',
      description: 'Business rules, database entity models, and transaction coordinators.',
      status: 'Completed',
      progress: 100,
      files: ['src/modules/core/entity.model.js', 'src/modules/core/service.js'],
    },
    {
      id: 'mod-ui',
      name: 'Interactive Frontend Interface',
      description: 'React UI components, optimistic state handlers, and form validation.',
      status: 'In Progress',
      progress: 75,
      files: ['src/components/DashboardView.jsx', 'src/components/RecordTable.jsx'],
    },
    {
      id: 'mod-api',
      name: 'REST API & Webhook Handlers',
      description: 'Route controllers, OpenAPI swagger documentation, and rate limiters.',
      status: 'In Progress',
      progress: 60,
      files: ['src/routes/api.routes.js', 'src/middleware/rateLimiter.js'],
    },
    {
      id: 'mod-notify',
      name: 'Notifications & Audit Dispatcher',
      description: 'Background message queues, email triggers, and audit event logger.',
      status: 'Pending',
      progress: 20,
      files: ['src/jobs/notificationQueue.js'],
    },
  ],

  agents: [
    {
      id: 'planning-agent',
      name: 'Planning Agent',
      role: 'SDLC Architect',
      status: 'Idle',
      currentTask: 'All 5 module specifications compiled and approved.',
    },
    {
      id: 'coding-agent',
      name: 'Coding Agent',
      role: 'Full-Stack Developer',
      status: 'Active',
      currentTask: 'Implementing responsive data tables and form error boundaries.',
    },
    {
      id: 'review-agent',
      name: 'Review Agent',
      role: 'Static Code Analyst',
      status: 'Active',
      currentTask: 'Running SonarQube & ESLint rules on newly generated routes.',
    },
  ],

  codeFiles: [
    {
      name: 'src/modules/core/service.js',
      language: 'javascript',
      lines: 32,
      code: `import { db } from '../../config/database.js';
import { AppError } from '../../utils/errors.js';

export async function processRecordTransaction(userId, payload) {
  // Validate caller permissions
  if (!userId) {
    throw new AppError('Unauthorized access attempt', 401);
  }

  // Execute atomic transactional mutation
  return await db.transaction(async (trx) => {
    const record = await trx('records').insert({
      owner_id: userId,
      status: 'ACTIVE',
      meta: JSON.stringify(payload),
      created_at: new Date()
    }).returning('*');

    // Trigger audit notification event
    await trx('audit_logs').insert({
      event: 'RECORD_INITIALIZED',
      target_id: record[0].id,
      timestamp: new Date()
    });

    return record[0];
  });
}`,
    },
    {
      name: 'src/components/DashboardView.jsx',
      language: 'javascript',
      lines: 28,
      code: `import React, { useState, useEffect } from 'react';
import { MetricCard } from './common/MetricCard';

export function DashboardView({ projectId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/projects/\${projectId}/metrics\`)
      .then(res => res.json())
      .then(metrics => {
        setData(metrics);
        setLoading(false);
      });
  }, [projectId]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="metrics-grid">
      <MetricCard title="Total Activity" value={data.total} />
      <MetricCard title="Success Rate" value="99.4%" />
    </div>
  );
}`,
    },
  ],
};
