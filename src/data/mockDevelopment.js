/**
 * Mock data for the Development Workspace stage in AutoDev.
 * Contains modular synthesized project files that can be viewed, edited, and downloaded as a ZIP.
 */

export const MOCK_DEVELOPMENT = {
  modules: [
    {
      id: 'mod-auth',
      name: 'Login & User Accounts',
      description: 'Password hashing with Argon2id, session tokens, and permission middleware.',
      status: 'Completed',
      progress: 100,
      files: ['src/services/authService.js'],
    },
    {
      id: 'mod-core',
      name: 'Core Application Engine',
      description: 'Domain data models, state management, and business logic coordinators.',
      status: 'Completed',
      progress: 100,
      files: ['src/components/TaskBoard.jsx', 'src/services/apiClient.js'],
    },
    {
      id: 'mod-ui',
      name: 'User Interface Components',
      description: 'Accessible layout components, forms, filters, and stateful views.',
      status: 'In Progress',
      progress: 85,
      files: ['src/App.jsx'],
    },
    {
      id: 'mod-db',
      name: 'Database Storage & Schemas',
      description: 'Normalized relational schemas with primary and foreign key constraints.',
      status: 'Completed',
      progress: 100,
      files: ['src/models/schema.sql'],
    },
  ],

  codeFiles: [
    {
      name: 'src/App.jsx',
      language: 'jsx',
      lines: 34,
      content: `import React, { useState } from 'react';
import { TaskBoard } from './components/TaskBoard';

export default function App() {
  const [workspace, setWorkspace] = useState('My Workspace');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">{workspace}</h1>
        <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
          AutoDevAI Live Preview
        </span>
      </header>

      <main className="p-6">
        <TaskBoard />
      </main>
    </div>
  );
}`,
    },
    {
      name: 'src/components/TaskBoard.jsx',
      language: 'jsx',
      lines: 48,
      content: `import React, { useState } from 'react';

const INITIAL_TASKS = [
  { id: '1', title: 'Complete system architecture review', status: 'done', priority: 'high' },
  { id: '2', title: 'Connect PostgreSQL database migrations', status: 'in-progress', priority: 'medium' },
  { id: '3', title: 'Configure user session tokens', status: 'todo', priority: 'high' },
];

export function TaskBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, status: 'todo', priority: 'medium' }]);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {['todo', 'in-progress', 'done'].map((column) => (
          <div key={column} className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{column.replace('-', ' ')}</h3>
            <div className="space-y-2">
              {tasks.filter((t) => t.status === column).map((t) => (
                <div key={t.id} className="bg-slate-800 border border-slate-700 p-2.5 rounded text-xs">
                  {t.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    },
    {
      name: 'src/services/apiClient.js',
      language: 'javascript',
      lines: 26,
      content: `/**
 * AutoDevAI API Client
 * Configured for REST endpoints with automated token refresh.
 */
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
    ...options.headers,
  };

  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(\`API request failed: \${response.statusText}\`);
  }

  return response.json();
}`,
    },
    {
      name: 'src/models/schema.sql',
      language: 'sql',
      lines: 22,
      content: `-- AutoDevAI Database Schema (PostgreSQL 16)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  priority VARCHAR(20) DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);`,
    },
    {
      name: 'package.json',
      language: 'json',
      lines: 24,
      content: `{
  "name": "autodevai-generated-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^1.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}`,
    },
    {
      name: 'README.md',
      language: 'markdown',
      lines: 18,
      content: `# Generated Application

Synthesized by AutoDevAI — Autonomous Software Development Platform.

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the local development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Run the automated test suite:
   \`\`\`bash
   npm test
   \`\`\`
`,
    },
  ],
};
