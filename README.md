# AutoDevAI – AI-Driven End-to-End Software Development

A modern, presentation-ready React.js + Vite frontend prototype for the final-year research project **AutoDevAI**.

AutoDevAI models an autonomous multi-agent software engineering workflow where a user specifies an application idea in natural language, and a coordinated fleet of specialized AI agents handles the complete SDLC:
`User Idea → AI Orchestrator → Requirements → Architecture → Development → Testing → Security → DevOps → Deployment`.

---

## Key Pages & Platform Modules

1. **Landing / Start Page (`/`)**:
   - Dark modern AI/SaaS hero with prompt builder and examples.
   - Interactive visual multi-agent workflow pipeline with animated flow pulses.
   - Feature highlight grid and platform architecture showcase.

2. **Dashboard (`/dashboard`)**:
   - Key platform metrics (Active Projects, Coordinated Agents, Build Progress, Tests Passed).
   - Recent project spotlight ("Task Management App" at 68% progress).
   - Visual SDLC progress stepper with active development stage highlighted.
   - Live AI agent fleet status and real-time telemetry stream.

3. **New Project Page (`/new-project`)**:
   - Natural language prompt textarea with auto-optimizer.
   - Template presets (Student Task Manager, Team Chat, E-Commerce).
   - Tech stack & database selector.
   - Coordinated deliverables checklist preview and plan generator.

4. **AI Workflow Page (`/workflow`) — Flagship Feature**:
   - Central interactive **AI Agent Orchestrator** hub with pulsing coordination rings.
   - 6 Specialized Agent Cards connected with animated SVG energy streams:
     - Requirements Agent (✓ Completed)
     - Architecture Agent (✓ Completed)
     - Development Agent (● Running 82%)
     - Testing Agent (● Running 45%)
     - Security Agent (○ Pending)
     - DevOps Agent (○ Pending)
   - Click-to-inspect drawer showing agent token count, latency, active reasoning trace, and generated files.
   - Real-time filterable **AI Activity** log stream.

5. **Project Details Page (`/project-details`)**:
   - Project specifications, overall progress bar, SDLC module cards, and milestone execution timeline.

6. **Requirements Page (`/requirements`)**:
   - AI-generated Functional Requirements with BDD acceptance criteria.
   - Non-Functional Requirements (Security, Performance, Scalability, Reliability).
   - Interactive "Approve All", "Regenerate with AI", and inline spec editor.

7. **Architecture Page (`/architecture`)**:
   - Visual system architecture diagram:
     `User Clients → Frontend (React 19) → API Gateway (Envoy) → Backend REST APIs → AI Agent Layer → Persistence (MongoDB & Redis)`
   - Layer contract inspector detailing protocol specifications and endpoint definitions.

8. **Development Page (`/development`)**:
   - 3-column cloud IDE interface:
     - File Tree Explorer (`components/`, `services/`, `App.tsx`)
     - Code Editor with tabs, line numbers, realistic React TypeScript code, and copy function
     - AI Development Agent panel with synthesis milestones and quick prompts
   - Bottom integrated compiler terminal.
   - "Run", "Build", and "Preview" buttons (with an interactive live modal preview of the synthesized Task App!).

9. **Testing Page (`/testing`)**:
   - Summary statistics (Total Tests: 148, Passed: 142, Failed: 0, Coverage: 94.2%).
   - Filterable test execution matrix by suite and test type (Unit, Integration, E2E, Security).
   - Interactive "Run All Test Suites" button.

10. **Security Page (`/security`)**:
    - Prominent **Security Score: 94 / 100 (Grade A+)**.
    - 5 core audit categories: Authentication, Authorization, API Security, Input Validation, and Dependency Scan.
    - AI-suggested vulnerability remediation with one-click auto-fix.

11. **Deployment Page (`/deployment`)**:
    - Visual CI/CD pipeline: `Build → Test → Security Scan → Docker Build → Deploy`.
    - AWS EKS cluster topology details and pod replicas.
    - Interactive "Deploy Application" button with simulated rolling deployment and live production URL.
    - Live Kubernetes container logs viewer.

12. **Settings Page (`/settings`)**:
    - LLM engine selector, context memory pool limit, and secrets vault credentials.

---

## Tech Stack

- **React 19**
- **Vite 8**
- **TypeScript**
- **React Router 7**
- **Lucide React** (icons)
- **Custom Dark SaaS Design System** (responsive CSS variables, glassmorphism, glowing AI accents)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build & type-check
npm run build

# Run linter
npm run lint
```
