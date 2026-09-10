/**
 * Generates structured requirements based on the domain category and user answers.
 */

export function generateRequirementsForProject(category, projectName, idea, answers = {}) {
  const baseRequirements = {
    education: {
      overview: `A modern campus attendance and student management system designed to eliminate manual paper logging, provide real-time session verification, and notify faculty and students of attendance trends.`,
      coreFeatures: [
        {
          id: 'feat-1',
          title: 'Session & Roster Verification',
          description: 'Instructors can initiate digital sessions with student roster validation and dynamic status markers.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-2',
          title: 'Dynamic QR Code Generation',
          description: 'Generates rotating 15-second QR codes on the classroom screen to prevent proxy attendance.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-3',
          title: 'Automated Attendance Warning System',
          description: 'Triggers alerts to students and guardians when attendance drops below the 75% institutional threshold.',
          priority: 'Medium',
          status: 'Approved',
        },
        {
          id: 'feat-4',
          title: 'Dean & Department Analytics',
          description: 'Aggregates departmental trends, course section averages, and semester audit exports.',
          priority: 'Low',
          status: 'Approved',
        },
      ],
      userStories: [
        {
          id: 'us-1',
          asA: 'Professor',
          iWant: 'to launch an attendance session in under 5 seconds',
          soThat: 'I do not waste class time taking roll call manually.',
        },
        {
          id: 'us-2',
          asA: 'Student',
          iWant: 'to view my semester attendance percentage in real-time',
          soThat: 'I stay compliant with university exam eligibility rules.',
        },
        {
          id: 'us-3',
          asA: 'Department Admin',
          iWant: 'to export accredited attendance records for semester accreditation',
          soThat: 'audit compliance is effortless.',
        },
      ],
      functional: [
        { id: 'fr-1', title: 'Role-based access controls for Students, Faculty, and Administrators', priority: 'High', status: 'Approved' },
        { id: 'fr-2', title: 'Geofenced session validation to ensure physical classroom presence', priority: 'Medium', status: 'Approved' },
        { id: 'fr-3', title: 'Absence excuse slip upload and faculty approval workflow', priority: 'Low', status: 'Approved' },
        { id: 'fr-4', title: 'Export to CSV and PDF formats for institutional reporting', priority: 'Medium', status: 'Approved' },
      ],
      nonFunctional: [
        { id: 'nfr-1', title: 'Sub-second QR code generation and instant scan processing (<300ms)', priority: 'High', status: 'Approved' },
        { id: 'nfr-2', title: 'Concurrent load support for up to 5,000 simultaneous student check-ins', priority: 'High', status: 'Approved' },
        { id: 'nfr-3', title: 'FERPA & GDPR compliant student personal data encryption at rest', priority: 'High', status: 'Approved' },
      ],
    },

    ecommerce: {
      overview: `A high-conversion e-commerce storefront with intuitive catalog exploration, frictionless checkout, automated payment processing, and real-time inventory synchronization.`,
      coreFeatures: [
        {
          id: 'feat-1',
          title: 'Product Catalog & Dynamic Filter',
          description: 'Faceted search with category filters, price ranges, variations, and high-resolution media galleries.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-2',
          title: 'Cart & Multi-Payment Checkout',
          description: 'Instant checkout supporting Stripe cards, digital wallets (Apple/Google Pay), and guest purchases.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-3',
          title: 'Order Status & Tracking API',
          description: 'Real-time order stage tracker notifying customers from packing to carrier dispatch and doorstep delivery.',
          priority: 'Medium',
          status: 'Approved',
        },
        {
          id: 'feat-4',
          title: 'Inventory & Stock Management',
          description: 'Automated stock decrementing upon order confirmation with low-stock alerts to merchants.',
          priority: 'High',
          status: 'Approved',
        },
      ],
      userStories: [
        {
          id: 'us-1',
          asA: 'Shopper',
          iWant: 'to complete a purchase with 1-click payment as a guest',
          soThat: 'I do not have to fill out long registration forms.',
        },
        {
          id: 'us-2',
          asA: 'Customer',
          iWant: 'to track my shipment delivery milestones on a live timeline',
          soThat: 'I know exactly when my package arrives.',
        },
        {
          id: 'us-3',
          asA: 'Store Owner',
          iWant: 'to receive notifications when an item stock falls below 5 units',
          soThat: 'I can restock before losing sales.',
        },
      ],
      functional: [
        { id: 'fr-1', title: 'Secure webhook listener for Stripe payment intent confirmations', priority: 'High', status: 'Approved' },
        { id: 'fr-2', title: 'Automated transactional email receipts with order tracking links', priority: 'Medium', status: 'Approved' },
        { id: 'fr-3', title: 'Discount code and promotion coupon validation engine', priority: 'Low', status: 'Approved' },
      ],
      nonFunctional: [
        { id: 'nfr-1', title: 'PCI-DSS compliant payment tokenization (no card numbers stored)', priority: 'High', status: 'Approved' },
        { id: 'nfr-2', title: 'P95 product page load speed under 400ms globally via CDN', priority: 'High', status: 'Approved' },
        { id: 'nfr-3', title: '99.99% checkout availability during peak traffic flash sales', priority: 'High', status: 'Approved' },
      ],
    },

    task_management: {
      overview: `An agile team task and productivity platform focused on clear task ownership, kanban visualization, deadline accountability, and minimal context switching.`,
      coreFeatures: [
        {
          id: 'feat-1',
          title: 'Interactive Kanban & Sprint Board',
          description: 'Drag-and-drop task progression between customizable workflow columns with WIP limits.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-2',
          title: 'Task Delegation & Sub-Task Tree',
          description: 'Granular task decomposition with assignees, due dates, file attachments, and checklists.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-3',
          title: 'Priority & Deadline Escalations',
          description: 'Color-coded visual urgency flags (Urgent, High, Med, Low) with automated due-date reminders.',
          priority: 'Medium',
          status: 'Approved',
        },
        {
          id: 'feat-4',
          title: 'Activity Stream & Audit Logs',
          description: 'Real-time record of all task modifications, comments, mentions, and state transitions.',
          priority: 'Low',
          status: 'Approved',
        },
      ],
      userStories: [
        {
          id: 'us-1',
          asA: 'Project Lead',
          iWant: 'to drag tasks across columns on a Kanban board',
          soThat: 'I can rebalance team workload in real time.',
        },
        {
          id: 'us-2',
          asA: 'Developer',
          iWant: 'to receive an alert 24 hours before a task deadline expires',
          soThat: 'I never miss a sprint milestone.',
        },
        {
          id: 'us-3',
          asA: 'Contributor',
          iWant: 'to filter the board to only show tasks assigned to me',
          soThat: 'I can focus on my immediate deliverables.',
        },
      ],
      functional: [
        { id: 'fr-1', title: 'Real-time WebSocket task state synchronization across open client sessions', priority: 'High', status: 'Approved' },
        { id: 'fr-2', title: 'Markdown editor support for rich task specifications and code snippets', priority: 'Medium', status: 'Approved' },
        { id: 'fr-3', title: 'Full-text search across all task titles, descriptions, and comments', priority: 'Medium', status: 'Approved' },
      ],
      nonFunctional: [
        { id: 'nfr-1', title: 'Optimistic UI updates for immediate drag-and-drop feedback (<50ms)', priority: 'High', status: 'Approved' },
        { id: 'nfr-2', title: 'End-to-end data encryption for private organization workspaces', priority: 'High', status: 'Approved' },
        { id: 'nfr-3', title: 'Offline caching with automated reconciliation when reconnecting', priority: 'Medium', status: 'Approved' },
      ],
    },

    generic: {
      overview: `A production-grade application engineered to fulfill the core objectives of ${projectName || 'the product idea'}, emphasizing reliability, modular design, and streamlined user workflows.`,
      coreFeatures: [
        {
          id: 'feat-1',
          title: 'Core Workflow & Transaction Engine',
          description: `Primary operational interface allowing users to execute core operations for ${projectName || 'the product'}.`,
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-2',
          title: 'User Authentication & Access Management',
          description: 'Secure credential verification with encrypted sessions, role boundaries, and account preferences.',
          priority: 'High',
          status: 'Approved',
        },
        {
          id: 'feat-3',
          title: 'Interactive Metrics & Status Dashboard',
          description: 'Consolidated overview displaying operational metrics, activity history, and status updates.',
          priority: 'Medium',
          status: 'Approved',
        },
        {
          id: 'feat-4',
          title: 'Data Export & Notification Triggers',
          description: 'Automated status alerts and structured CSV/JSON report exports.',
          priority: 'Low',
          status: 'Approved',
        },
      ],
      userStories: [
        {
          id: 'us-1',
          asA: 'Registered User',
          iWant: 'to quickly perform core actions in a clean, intuitive layout',
          soThat: 'I accomplish my workflow without technical friction.',
        },
        {
          id: 'us-2',
          asA: 'Administrator',
          iWant: 'to audit system events and manage team permissions',
          soThat: 'operational integrity is strictly maintained.',
        },
      ],
      functional: [
        { id: 'fr-1', title: 'Input validation and sanitized parameter handling across all endpoints', priority: 'High', status: 'Approved' },
        { id: 'fr-2', title: 'Paginated data queries with filtering and sort capabilities', priority: 'Medium', status: 'Approved' },
      ],
      nonFunctional: [
        { id: 'nfr-1', title: 'Strict adherence to OWASP Top 10 security best practices', priority: 'High', status: 'Approved' },
        { id: 'nfr-2', title: 'Responsive design rendering seamlessly on mobile, tablet, and desktop', priority: 'High', status: 'Approved' },
      ],
    },
  };

  const selected = baseRequirements[category] || baseRequirements.generic;

  return {
    category,
    projectName: projectName || 'New Application',
    idea: idea || '',
    generatedAt: new Date().toISOString(),
    ...selected,
  };
}
