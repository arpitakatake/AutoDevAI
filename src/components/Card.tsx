import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: React.ReactNode
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  className?: string
  glow?: 'none' | 'indigo' | 'purple' | 'emerald'
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  badge,
  action,
  className = '',
  glow = 'none',
  onClick
}) => {
  const glowClass = {
    none: '',
    indigo: 'glow-indigo',
    purple: 'glow-purple',
    emerald: 'glow-emerald'
  }[glow]

  return (
    <div
      onClick={onClick}
      className={`glass-card ${glowClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {(title || subtitle || badge || action) && (
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-heading-row">
              {typeof title === 'string' ? <h3 className="title-section">{title}</h3> : title}
              {badge}
            </div>
            {subtitle && (typeof subtitle === 'string' ? <p className="subtitle">{subtitle}</p> : subtitle)}
          </div>
          {action && <div className="card-action-slot">{action}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>

      <style>{`
        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .card-title-group {
          flex: 1;
        }
        .card-heading-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .card-action-slot {
          flex-shrink: 0;
        }
        .glow-indigo {
          border-color: rgba(99, 102, 241, 0.35);
          box-shadow: var(--shadow-glow);
        }
        .glow-purple {
          border-color: rgba(139, 92, 246, 0.35);
          box-shadow: var(--shadow-glow-purple);
        }
        .glow-emerald {
          border-color: rgba(16, 185, 129, 0.35);
          box-shadow: var(--shadow-glow-emerald);
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
