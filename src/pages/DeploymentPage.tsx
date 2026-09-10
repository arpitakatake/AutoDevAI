import React, { useState } from 'react'
import {
  Rocket,
  Terminal,
  ExternalLink,
  Cloud,
  ChevronRight
} from 'lucide-react'
import { Card } from '../components/Card'

export const DeploymentPage: React.FC = () => {
  const [isDeploying, setIsDeploying] = useState<boolean>(false)
  const [deploySuccess, setDeploySuccess] = useState<boolean>(false)
  const [showLogs, setShowLogs] = useState<boolean>(true)
  const [selectedEnv, setSelectedEnv] = useState<'production' | 'staging'>('staging')

  const handleDeploy = () => {
    setIsDeploying(true)
    setDeploySuccess(false)

    setTimeout(() => {
      setIsDeploying(false)
      setDeploySuccess(true)
    }, 1800)
  }

  const pipelineSteps = [
    { title: 'Build', icon: '01', status: 'Passed', duration: '18s' },
    { title: 'Test', icon: '02', status: 'Passed', duration: '24s' },
    { title: 'Security Scan', icon: '03', status: 'Passed', duration: '12s' },
    { title: 'Docker Build', icon: '04', status: 'Passed', duration: '42s' },
    {
      title: 'Deploy to Cloud',
      icon: '05',
      status: deploySuccess ? 'Live' : 'Ready',
      active: true
    }
  ]

  return (
    <div className="deployment-view">
      {/* Header */}
      <div className="deploy-header-row">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="title-page">Cloud Deployment & DevOps Pipeline</h1>
            <span className={`badge ${deploySuccess ? 'badge-completed' : 'badge-running'}`}>
              {deploySuccess ? '✓ Deployed to Production' : '● Ready for Deployment'}
            </span>
          </div>
          <p className="subtitle">
            Autonomous multi-stage container build and Kubernetes orchestration managed by <strong>DevOps Agent</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="env-selector-pill">
            <button
              onClick={() => setSelectedEnv('staging')}
              className={`env-btn ${selectedEnv === 'staging' ? 'active' : ''}`}
            >
              Staging
            </button>
            <button
              onClick={() => setSelectedEnv('production')}
              className={`env-btn ${selectedEnv === 'production' ? 'active' : ''}`}
            >
              Production
            </button>
          </div>

          <button onClick={() => setShowLogs(!showLogs)} className="btn btn-secondary btn-sm">
            <Terminal className="w-3.5 h-3.5" />
            <span>{showLogs ? 'Hide Logs' : 'View Logs'}</span>
          </button>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="btn btn-primary btn-sm"
          >
            {isDeploying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deploying to Cluster...</span>
              </>
            ) : (
              <>
                <Rocket className="w-3.5 h-3.5" />
                <span>Deploy Application</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Deployment Pipeline */}
      <Card title="CI/CD Pipeline Visualization" subtitle="Sequential container orchestration stages">
        <div className="pipeline-flow-strip">
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="flow-step-unit">
              <div className={`pipeline-box ${step.active ? 'active-stage' : 'done-stage'}`}>
                <div className="box-top">
                  <span className="step-num-tag">{step.icon}</span>
                  <span className="step-status-tag">
                    {step.status === 'Live' ? '✓ Live' : step.status === 'Passed' ? '✓ Passed' : 'Ready'}
                  </span>
                </div>
                <h4 className="step-title-text">{step.title}</h4>
                {step.duration && <span className="step-time-text font-mono">{step.duration}</span>}
              </div>
              {idx < pipelineSteps.length - 1 && (
                <div className="flow-arrow-divider">
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Deployment Status & Live Endpoint Banner */}
      <div className="grid-2 status-cluster-grid">
        <Card title="Cluster Topology & Target Environment" glow="indigo">
          <div className="cluster-meta-grid">
            <div className="cluster-row">
              <span className="meta-label">Cloud Provider</span>
              <span className="meta-val flex items-center gap-1 text-white">
                <Cloud className="w-3.5 h-3.5 text-indigo-400" /> AWS EKS us-east-1
              </span>
            </div>
            <div className="cluster-row">
              <span className="meta-label">Container Image</span>
              <span className="meta-val font-mono text-xs text-indigo-300">
                autodevai/task-app:v1.2.4-prod
              </span>
            </div>
            <div className="cluster-row">
              <span className="meta-label">Pod Replicas</span>
              <span className="meta-val font-mono text-xs text-emerald-400">
                3 Active (Auto-scale 3-10)
              </span>
            </div>
            <div className="cluster-row">
              <span className="meta-label">Health Status</span>
              <span className="meta-val font-mono text-xs text-emerald-400">
                ● 100% Passing Health Probes
              </span>
            </div>
          </div>

          {deploySuccess && (
            <div className="deployed-url-box mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Public Live URL:</span>
                <span className="badge badge-completed">SSL Active</span>
              </div>
              <a
                href="#live-demo"
                onClick={(e) => e.preventDefault()}
                className="live-url-link mt-1 flex items-center gap-1 text-sm font-mono text-indigo-400 hover:underline"
              >
                <span>https://task-management-app.autodevai.cloud</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </Card>

        {/* Live Kubernetes Pod Logs Terminal */}
        {showLogs && (
          <Card
            title={
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Deployment & Runtime Logs</span>
              </div>
            }
            subtitle="Streaming pod logs from AWS EKS"
            action={<span className="text-xs font-mono text-slate-400">pod/task-app-7bf98c</span>}
          >
            <div className="logs-terminal-viewport font-mono text-xs">
              <p className="text-slate-400">[16:45:01] Preparing Docker multi-stage build context...</p>
              <p className="text-slate-400">[16:45:18] Image layer cached: node:20-alpine base (74MB)</p>
              <p className="text-slate-400">[16:45:22] Vite production assets bundled into /dist</p>
              <p className="text-slate-400">[16:45:34] Pushed to Amazon ECR: autodevai/task-app:v1.2.4-prod</p>
              <p className="text-indigo-300">[16:45:41] Applying Kubernetes deployment manifest...</p>
              <p className="text-emerald-400">[16:45:48] Deployment rollout successful: 3/3 pods running.</p>
              <p className="text-slate-500">[16:45:50] Ingress route mapped: https://task-management-app.autodevai.cloud</p>
              {isDeploying && (
                <p className="text-amber-400 animate-pulse">&gt; Executing live rolling upgrade...</p>
              )}
            </div>
          </Card>
        )}
      </div>

      <style>{`
        .deployment-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .deploy-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .env-selector-pill {
          display: flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 2px;
        }
        .env-btn {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.15s;
        }
        .env-btn.active {
          background: rgba(99, 102, 241, 0.2);
          color: #ffffff;
        }
        .pipeline-flow-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow-x: auto;
          gap: 8px;
          padding: 10px 0;
        }
        .flow-step-unit {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .pipeline-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pipeline-box.active-stage {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(99, 102, 241, 0.12);
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.2);
        }
        .box-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .step-num-tag {
          font-size: 9px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .step-status-tag {
          font-size: 10px;
          font-family: var(--font-mono);
          color: #34d399;
        }
        .step-title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .step-time-text {
          font-size: 10.5px;
          color: var(--text-muted);
        }
        .flow-arrow-divider {
          padding: 0 4px;
        }
        .cluster-meta-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cluster-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .meta-label {
          font-size: 12px;
          color: var(--text-muted);
        }
        .deployed-url-box {
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          padding: 12px 14px;
        }
        .logs-terminal-viewport {
          background: #080c14;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 14px;
          max-height: 220px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        @media (max-width: 900px) {
          .status-cluster-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
