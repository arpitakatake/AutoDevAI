import React from 'react'

interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
  active?: boolean
  height?: number
  color?: 'default' | 'emerald' | 'amber' | 'purple'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  active = true,
  height = 7,
  color = 'default'
}) => {
  const clamped = Math.min(100, Math.max(0, progress))

  const colorStyles: Record<string, string> = {
    default: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 60%, #06b6d4 100%)',
    emerald: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
    amber: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
    purple: 'linear-gradient(90deg, #8b5cf6 0%, #d946ef 100%)'
  }

  return (
    <div className="progress-component">
      {(label || showPercentage) && (
        <div className="progress-info-row">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && <span className="progress-number">{clamped}%</span>}
        </div>
      )}
      <div className="progress-track" style={{ height: `${height}px` }}>
        <div
          className={`progress-fill ${active ? 'active' : ''}`}
          style={{
            width: `${clamped}%`,
            background: colorStyles[color]
          }}
        />
      </div>

      <style>{`
        .progress-component {
          width: 100%;
        }
        .progress-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .progress-label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .progress-number {
          font-size: 12px;
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}
