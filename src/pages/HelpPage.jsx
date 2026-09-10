import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Lightbulb,
  FileText,
  Boxes,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Cloud,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Bot,
  ExternalLink,
} from 'lucide-react';

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the Requirement Agent discover context-aware requirements?',
      a: 'When you submit an idea, the Requirement Agent categorizes your prompt into specialized domain workflows (such as Education, E-Commerce, Task Management, Healthcare, or Custom B2B). It then conducts an intelligent discovery interview, asking questions specific to your application type (such as student rosters, checkout gateways, or audit rules) and evaluates your selections before synthesizing structured requirements.',
    },
    {
      q: 'Can I modify or reject requirements before architecture generation?',
      a: 'Yes. AutoDevAI is designed with Human-in-the-Loop safeguards. On the Requirements Review screen, you can approve or reject individual features, add custom requirements, and inspect generated User Stories before approving the specification for Architecture generation.',
    },
    {
      q: 'What does the Architecture Agent synthesize?',
      a: 'The Architecture Agent analyzes approved requirements to generate a complete technology stack, an interactive micro-service topology diagram, a normalized relational database schema with types and constraints, and an OpenAPI 3.1 specification for all core API endpoints.',
    },
    {
      q: 'How does automated testing and issue resolution work?',
      a: 'The autonomous QA Agent executes unit, integration, and load test suites. If any assertion fails (e.g. rate limiter threshold or empty export guard), the agent provides root-cause diagnosis and actionable recommendations, allowing you to trigger simulated auto-fixes with one click.',
    },
    {
      q: 'How does AutoDevAI secure production applications?',
      a: 'The SecOps Agent performs static AST analysis, CVE dependency checks, and OWASP Top 10 compliance audits. It scores your application from 0 to 100 and provides automated remediation patches for password policies, CORS origins, and HTTP security headers before release.',
    },
    {
      q: 'Where are deployed applications hosted?',
      a: 'AutoDevAI deploys verified builds to an isolated Edge compute network with automatic Let&apos;s Encrypt TLS 1.3 certificates, global CDN caching, and custom domain routing under your project URL.',
    },
  ];

  const agentGuide = [
    {
      name: 'Requirement Agent',
      icon: FileText,
      role: 'Translates natural language ideas into structured features, user stories, and acceptance criteria.',
    },
    {
      name: 'Architecture Agent',
      icon: Boxes,
      role: 'Designs database entities, microservice boundaries, API routes, and selects optimal frameworks.',
    },
    {
      name: 'Development Swarm',
      icon: Code2,
      role: 'Writes modular, clean full-stack code, handles state management, and compiles client/server assets.',
    },
    {
      name: 'Testing Agent',
      icon: CheckCircle2,
      role: 'Executes automated test suites across auth, database transactions, and end-to-end user workflows.',
    },
    {
      name: 'Security Agent',
      icon: ShieldCheck,
      role: 'Scans for CVE vulnerabilities, enforces OWASP security headers, and automates hardening patches.',
    },
    {
      name: 'DevOps Agent',
      icon: Cloud,
      role: 'Provisions global edge containers, configures SSL/TLS, and executes zero-downtime releases.',
    },
  ];

  return (
    <div className="workspace-page">
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="page-header-title">Platform Documentation &amp; Workflow Guide</h1>
            <span className="badge-pill">
              <HelpCircle size={13} />
              <span>Developer Reference</span>
            </span>
          </div>
          <p className="page-header-subtitle">
            Understand how AutoDevAI reimagines software engineering through autonomous collaborative agent swarms.
          </p>
        </div>

        <Link to="/create-project" className="btn btn-primary">
          <span>Start New Project</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* 7-Stage End-to-End Workflow Diagram */}
      <div className="panel-card" style={{ marginBottom: 28 }}>
        <div className="panel-header">
          <h3 className="panel-title">The AutoDevAI 7-Stage Autonomous SDLC</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Iterative &amp; Verified</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
            padding: '20px 10px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          {[
            { step: '1. Idea', icon: Lightbulb, desc: 'Natural language description' },
            { step: '2. Requirements', icon: FileText, desc: 'Context-aware discovery' },
            { step: '3. Architecture', icon: Boxes, desc: 'Stack, models & APIs' },
            { step: '4. Development', icon: Code2, desc: 'Modular code synthesis' },
            { step: '5. Testing', icon: CheckCircle2, desc: 'Unit, integration & load' },
            { step: '6. Security', icon: ShieldCheck, desc: 'AST & CVE vulnerability audit' },
            { step: '7. Deployment', icon: Cloud, desc: 'Edge container hosting' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 8,
                  padding: '12px 8px',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-card)',
                    border: '1.5px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Section: Autonomous Agent Roles & Interactive FAQs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 28 }}>
        {/* Agent Team Matrix */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Specialized AI Agent Swarm</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>6 Agent Roles</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {agentGuide.map((ag) => {
              const Icon = ag.icon;
              return (
                <div
                  key={ag.name}
                  className="card-clean"
                  style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {ag.name}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      {ag.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h3 className="panel-title">Frequently Asked Questions</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click to Expand</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="card-clean"
                  style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    borderColor: isOpen ? 'var(--accent-primary)' : 'var(--border-color)',
                  }}
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>

                  {isOpen && (
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginTop: 10,
                        paddingTop: 10,
                        borderTop: '1px solid var(--border-color)',
                      }}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
