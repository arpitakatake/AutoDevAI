import React, { useState } from 'react'
import { Check, Save } from 'lucide-react'
import { Card } from '../components/Card'

export const SettingsPage: React.FC = () => {
  const [model, setModel] = useState('AutoDevAI Core 3.5 Pro (DAG Mode)')
  const [tokensLimit, setTokensLimit] = useState('128,000')
  const [autoApprove, setAutoApprove] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="settings-view flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="title-page">Platform & Agent Settings</h1>
          <p className="subtitle">Configure AI model providers, orchestration limits, and security policies.</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary btn-sm flex items-center gap-2">
          {saved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved Successfully' : 'Save Preferences'}</span>
        </button>
      </div>

      <div className="grid-2 gap-6">
        <Card title="Orchestrator LLM Configuration" subtitle="Model engines powering the 6 specialized agents">
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Orchestration Engine</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white text-xs"
              >
                <option value="AutoDevAI Core 3.5 Pro (DAG Mode)">AutoDevAI Core 3.5 Pro (DAG Mode)</option>
                <option value="Claude 3.7 Sonnet (Hybrid Thinking)">Claude 3.7 Sonnet (Hybrid Thinking)</option>
                <option value="GPT-4o Agentic SDLC Suite">GPT-4o Agentic SDLC Suite</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Unified Context Memory Pool</label>
              <input
                type="text"
                value={tokensLimit}
                onChange={(e) => setTokensLimit(e.target.value)}
                className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white text-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 mt-2">
              <div>
                <span className="text-xs font-semibold text-white block">Auto-Approve Non-Breaking Stages</span>
                <span className="text-[11px] text-slate-400">Allows agents to proceed without human intervention</span>
              </div>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
            </div>
          </div>
        </Card>

        <Card title="DevSecOps & Secrets Vault" subtitle="Environment keys and audit thresholds">
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">AWS EKS Cluster ARN</label>
              <input
                type="text"
                readOnly
                value="arn:aws:eks:us-east-1:748291039481:cluster/autodevai-prod"
                className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-slate-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">MongoDB Atlas URI Token</label>
              <input
                type="password"
                readOnly
                value="mongodb+srv://admin:••••••••••••@cluster0.autodevai.net"
                className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-slate-400 text-xs font-mono"
              />
            </div>

            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
              <span className="text-xs font-semibold text-indigo-300 block">Lead Architect Profile</span>
              <p className="text-[11px] text-slate-300 mt-0.5">Arpita Katake • Final-Year Computer Science Project</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
