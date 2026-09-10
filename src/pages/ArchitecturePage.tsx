import React, { useState } from 'react'
import {
  Users,
  Layout,
  Server,
  Bot,
  Database,
  ArrowDown,
  KeyRound,
  FileCode,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react'
import { Card } from '../components/Card'
import { initialArchitectureNodes } from '../data/mockData'
import type { ArchitectureNode } from '../types'

export const ArchitecturePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(initialArchitectureNodes[1]) // Frontend default

  const nodes = [
    {
      id: 'layer-user',
      title: 'User & Client Interfaces',
      badge: 'Clients',
      icon: Users,
      tech: 'Web Browser • Progressive Web App • Mobile Viewport',
      endpoints: ['HTTPS / WSS Protocol', 'DOM Events & Optimistic Updates', 'Session State via Cookies'],
      color: '#a855f7'
    },
    {
      id: 'layer-frontend',
      title: 'Frontend Presentation Layer',
      badge: 'React 19 + Vite',
      icon: Layout,
      tech: 'React 19, TypeScript, Tailwind/Modern CSS, Zustand Store, Lucide Icons',
      endpoints: ['TaskCard.tsx', 'KanbanBoard.tsx', 'taskService.ts', 'App.tsx'],
      color: '#6366f1'
    },
    {
      id: 'layer-gateway',
      title: 'API Gateway & Reverse Proxy',
      badge: 'Envoy / NGINX',
      icon: KeyRound,
      tech: 'SSL/TLS Termination, Rate Limiting (100 req/min), CORS Policy, JWT Auth Middleware',
      endpoints: ['POST /api/v1/auth/login', 'GET /api/v1/auth/refresh', 'Reverse Proxy to Node Cluster'],
      color: '#3b82f6'
    },
    {
      id: 'layer-backend',
      title: 'Application Services & REST APIs',
      badge: 'Node.js Express',
      icon: Server,
      tech: 'Express.js microservice router, Zod request sanitization, OpenAPI 3.1 contract engine',
      endpoints: ['GET /api/v1/tasks', 'POST /api/v1/tasks', 'PATCH /api/v1/tasks/:id', 'DELETE /api/v1/tasks/:id'],
      color: '#06b6d4'
    },
    {
      id: 'layer-ai',
      title: 'AutoDevAI Agent Orchestration Core',
      badge: 'AI Orchestrator',
      icon: Bot,
      tech: 'Multi-Agent DAG Scheduler, AST Static Code Generator, Unit QA Synthesizer, Memory Bus',
      endpoints: ['agent:req (Requirements)', 'agent:arch (Architecture)', 'agent:dev (Development)', 'agent:test (QA)'],
      color: '#8b5cf6',
      specialGlow: true
    },
    {
      id: 'layer-database',
      title: 'Persistence & In-Memory Cache',
      badge: 'MongoDB + Redis',
      icon: Database,
      tech: 'MongoDB Atlas (Replica Sets for Tasks & Users) + Redis Cluster (Session Tokens & Cache)',
      endpoints: ['mongodb://cluster0.autodevai.net/student_tasks', 'redis://cache-cluster:6379'],
      color: '#10b981'
    }
  ]

  return (
    <div className="architecture-view">
      {/* Header */}
      <div className="arch-header-row">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="title-page">System Architecture Design</h1>
            <span className="badge badge-completed">Verified by Architecture Agent</span>
          </div>
          <p className="subtitle">
            C4 Container Level Diagram detailing the multi-tier microservice and AI coordination topology.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="badge badge-ai">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OpenAPI 3.1 & C4 Validated</span>
          </div>
        </div>
      </div>

      {/* Main Visual Architecture Layout */}
      <div className="arch-main-grid">
        {/* Left Column: Visual Vertical Architecture Pipeline */}
        <div className="arch-pipeline-column">
          {nodes.map((node, idx) => {
            const Icon = node.icon
            const isSelected = selectedNode.id === node.id

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node as unknown as ArchitectureNode)}
                  className={`arch-layer-card ${isSelected ? 'selected' : ''} ${node.specialGlow ? 'ai-glow' : ''}`}
                >
                  <div className="layer-icon-box" style={{ backgroundColor: `${node.color}15`, color: node.color }}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="layer-info-box">
                    <div className="flex items-center gap-2">
                      <h3 className="layer-title">{node.title}</h3>
                      <span className="layer-badge" style={{ borderColor: `${node.color}40`, color: node.color }}>
                        {node.badge}
                      </span>
                    </div>
                    <p className="layer-tech">{node.tech}</p>
                  </div>

                  <div className="layer-select-arrow">
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Connecting Arrow Down */}
                {idx < nodes.length - 1 && (
                  <div className="arrow-down-connector">
                    <div className="line-down" />
                    <ArrowDown className="w-4 h-4 text-indigo-400" />
                    <div className="line-down" />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Right Column: Layer Spec Inspector & Contract Details */}
        <div className="arch-inspector-column">
          <Card
            title={
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Layer Contract & Spec Inspector</span>
              </div>
            }
            subtitle={selectedNode.title}
            className="sticky-inspector-card"
          >
            <div className="inspector-content">
              <div className="inspect-item">
                <span className="inspect-label">Selected Layer</span>
                <p className="text-sm font-semibold text-white">{selectedNode.title}</p>
              </div>

              <div className="inspect-item">
                <span className="inspect-label">Technology Specification</span>
                <p className="text-xs font-mono text-indigo-300 bg-black/30 p-2.5 rounded border border-white/5">
                  {selectedNode.tech}
                </p>
              </div>

              <div className="inspect-item">
                <span className="inspect-label">Interfaces, Endpoints & Contracts</span>
                <div className="endpoints-list">
                  {selectedNode.endpoints?.map((ep: string, idx: number) => (
                    <div key={idx} className="endpoint-row">
                      <FileCode className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono text-xs text-slate-200">{ep}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="architecture-specs-box">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Security & Protocol Enforcement
                </h4>
                <div className="grid-2 text-xs text-slate-400 gap-2">
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-emerald-400 font-semibold block mb-0.5">TLS 1.3 Strict</span>
                    Encrypted transport
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <span className="text-indigo-400 font-semibold block mb-0.5">JWT RS256</span>
                    Stateless token claims
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        .architecture-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .arch-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .arch-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .arch-pipeline-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arch-layer-card {
          width: 100%;
          background: rgba(15, 21, 35, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .arch-layer-card:hover {
          border-color: var(--border-medium);
          background: rgba(20, 28, 48, 0.9);
          transform: translateY(-2px);
        }
        .arch-layer-card.selected {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4), var(--shadow-glow);
          background: rgba(22, 32, 54, 0.95);
        }
        .arch-layer-card.ai-glow {
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.2);
        }
        .layer-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .layer-info-box {
          flex: 1;
        }
        .layer-title {
          font-size: 14.5px;
          font-weight: 700;
          color: #ffffff;
        }
        .layer-badge {
          font-size: 10.5px;
          font-family: var(--font-mono);
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid;
        }
        .layer-tech {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .arrow-down-connector {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 6px 0;
        }
        .line-down {
          width: 2px;
          height: 10px;
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.5));
        }
        .sticky-inspector-card {
          position: sticky;
          top: calc(var(--topbar-height) + 16px);
        }
        .inspector-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .inspect-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .inspect-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .endpoints-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .endpoint-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
        }
        .architecture-specs-box {
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }
        @media (max-width: 1024px) {
          .arch-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
