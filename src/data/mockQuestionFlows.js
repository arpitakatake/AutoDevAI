/**
 * Context-aware question flows for the Requirement Agent discovery process.
 * Analyzes the user's idea in natural language and presents domain-relevant questions.
 */

export const QUESTION_FLOWS = {
  education: {
    category: 'Education & Academic Management',
    initialAnalysis:
      'Identified an educational domain focus with academic hierarchy, record tracking, and multi-user participation requirements.',
    questions: [
      {
        id: 'edu-q1',
        title: 'User Roles & Hierarchy',
        question: 'Who will primarily interact with this application?',
        type: 'single',
        options: [
          { label: 'Students & Faculty', value: 'students_faculty', desc: 'Direct classroom interaction' },
          { label: 'Faculty & Administrative Staff', value: 'faculty_admin', desc: 'Departmental management' },
          { label: 'All Three: Students, Faculty, and Admin', value: 'all_three', desc: 'Complete institutional coverage' },
          { label: 'Parents & External Guardians as well', value: 'parents_included', desc: 'Extended visibility' },
        ],
      },
      {
        id: 'edu-q2',
        title: 'Tracking & Recording Method',
        question: 'How should attendance or academic records be captured?',
        type: 'single',
        options: [
          { label: 'Manual Roster Check-in', value: 'manual', desc: 'Quick digital roll-call by instructor' },
          { label: 'Dynamic QR Code per Session', value: 'qr_code', desc: 'Students scan expiring screen code' },
          { label: 'Biometric / RFID Card Hardware', value: 'hardware', desc: 'Physical device sensor integration' },
          { label: 'Hybrid (Instructor Manual + Student QR)', value: 'hybrid', desc: 'Flexible for any classroom' },
        ],
      },
      {
        id: 'edu-q3',
        title: 'Automated Notifications & Warnings',
        question: 'What automated alert thresholds should be configured?',
        type: 'multiple',
        options: [
          { label: 'Low Attendance Warning (<75%)', value: 'low_attendance' },
          { label: 'Daily Absence Notification to Student & Parent', value: 'daily_absence' },
          { label: 'Weekly Faculty Summary & Trend Report', value: 'weekly_report' },
          { label: 'Exam Eligibility Flagging', value: 'exam_eligibility' },
        ],
      },
      {
        id: 'edu-q4',
        title: 'LMS & Database Integration',
        question: 'Does this platform need to connect with existing institutional systems?',
        type: 'single',
        options: [
          { label: 'Standalone Application', value: 'standalone', desc: 'Self-contained database and auth' },
          { label: 'Google Classroom / Canvas LMS', value: 'lms', desc: 'Roster import and grade passback' },
          { label: 'Custom College ERP / SQL Database', value: 'erp', desc: 'Direct enterprise database sync' },
          { label: 'Exportable CSV / Excel Only', value: 'export_only', desc: 'Simple periodic data dump' },
        ],
      },
    ],
  },

  ecommerce: {
    category: 'E-Commerce & Digital Storefront',
    initialAnalysis:
      'Identified a commerce/transactional platform with catalog, shopping cart, checkout, and inventory workflow requirements.',
    questions: [
      {
        id: 'ecom-q1',
        title: 'Product Catalog Type',
        question: 'What types of merchandise or services will be sold?',
        type: 'single',
        options: [
          { label: 'Physical Products with Inventory', value: 'physical', desc: 'Requires shipping and stock counts' },
          { label: 'Digital Downloads & Licenses', value: 'digital', desc: 'Instant fulfillment upon payment' },
          { label: 'Custom Artisanal / Made-to-Order Items', value: 'custom_items', desc: 'Variations & engraving options' },
          { label: 'Multi-Vendor Marketplace', value: 'multi_vendor', desc: 'Multiple sellers with seller dashboard' },
        ],
      },
      {
        id: 'ecom-q2',
        title: 'Payment Gateways & Methods',
        question: 'Which payment options must be supported at checkout?',
        type: 'multiple',
        options: [
          { label: 'Stripe (Credit / Debit Card)', value: 'stripe' },
          { label: 'Apple Pay & Google Pay', value: 'wallets' },
          { label: 'PayPal Integration', value: 'paypal' },
          { label: 'Cash on Delivery (COD)', value: 'cod' },
        ],
      },
      {
        id: 'ecom-q3',
        title: 'Fulfillment & Order Tracking',
        question: 'How should order tracking and delivery updates work?',
        type: 'single',
        options: [
          { label: 'Automated Carrier Tracking API', value: 'carrier_api', desc: 'FedEx, UPS, DHL live tracking link' },
          { label: 'Internal Status Stages', value: 'internal_stages', desc: 'Order Placed → Packed → Shipped → Delivered' },
          { label: 'Local Store Pickup / Click & Collect', value: 'pickup', desc: 'Ready-for-pickup notifications' },
        ],
      },
      {
        id: 'ecom-q4',
        title: 'Customer Authentication',
        question: 'What account policy applies to shoppers?',
        type: 'single',
        options: [
          { label: 'Guest Checkout + Optional Account', value: 'guest_allowed', desc: 'Frictionless conversion' },
          { label: 'Mandatory Customer Registration', value: 'mandatory_account', desc: 'Order history & saved wishlists' },
          { label: 'Social Login (Google, Apple)', value: 'social_login', desc: 'One-click sign in and checkout' },
        ],
      },
    ],
  },

  task_management: {
    category: 'Productivity & Task Management',
    initialAnalysis:
      'Identified a task, sprint, or workflow tracking system requiring organization, priority states, deadlines, and notifications.',
    questions: [
      {
        id: 'task-q1',
        title: 'Task Organization Model',
        question: 'How should tasks be visualized and managed?',
        type: 'single',
        options: [
          { label: 'Kanban Board (Columns: Todo, Doing, Done)', value: 'kanban', desc: 'Visual drag-and-drop workflow' },
          { label: 'Sprint-based Agile Board with Backlog', value: 'agile', desc: 'Epics, story points, sprint milestones' },
          { label: 'Structured Linear List with Nested Sub-tasks', value: 'list', desc: 'High-density checklist interface' },
          { label: 'Timeline & Gantt Calendar View', value: 'gantt', desc: 'Milestones, dependencies, and dates' },
        ],
      },
      {
        id: 'task-q2',
        title: 'Collaboration & Assignment',
        question: 'How are tasks delegated across users?',
        type: 'single',
        options: [
          { label: 'Single Assignee per Task', value: 'single_assignee', desc: 'Clear individual accountability' },
          { label: 'Multiple Assignees & Reviewers', value: 'multi_assignee', desc: 'Collaborative team ownership' },
          { label: 'Role-Based Tagging (Engineering, Design, QA)', value: 'role_tagging', desc: 'Cross-functional pipelines' },
        ],
      },
      {
        id: 'task-q3',
        title: 'Priorities & Deadlines',
        question: 'What deadline and reminder features are critical?',
        type: 'multiple',
        options: [
          { label: 'Strict Due Dates with Overdue Highlights', value: 'due_dates' },
          { label: 'Priority Levels (Urgent, High, Medium, Low)', value: 'priority_levels' },
          { label: 'Automated Reminders (24h before due)', value: 'reminders' },
          { label: 'Recurring Tasks (Daily, Weekly, Monthly)', value: 'recurring' },
        ],
      },
      {
        id: 'task-q4',
        title: 'Notifications & Integrations',
        question: 'Where should task updates and mentions be delivered?',
        type: 'multiple',
        options: [
          { label: 'In-App Notification Center', value: 'in_app' },
          { label: 'Email Digest Notifications', value: 'email' },
          { label: 'Slack / Discord Webhook Alerts', value: 'slack_discord' },
          { label: 'Browser Desktop Push Alerts', value: 'push' },
        ],
      },
    ],
  },

  social: {
    category: 'Social Platform & Community',
    initialAnalysis:
      'Identified a community-driven application with user profiles, dynamic media feeds, discovery, and messaging.',
    questions: [
      {
        id: 'soc-q1',
        title: 'Primary Content Medium',
        question: 'What is the main format of user-generated content?',
        type: 'single',
        options: [
          { label: 'Rich Text & Multi-Image Posts', value: 'text_image', desc: 'Thoughtful micro-blogging and galleries' },
          { label: 'Short-Form Video Reels', value: 'video', desc: 'Vertical video feed and audio tracks' },
          { label: 'Discussion Threads & Upvoting', value: 'forum', desc: 'Topic-based community boards' },
        ],
      },
      {
        id: 'soc-q2',
        title: 'Feed Algorithm & Discovery',
        question: 'How should users discover content?',
        type: 'single',
        options: [
          { label: 'Chronological Following Feed', value: 'chronological', desc: 'Only see posts from accounts followed' },
          { label: 'Engagement-Based Discovery Feed', value: 'algorithmic', desc: 'Personalized recommendations' },
          { label: 'Topic Channels & Hashtags', value: 'channels', desc: 'Community categories and tags' },
        ],
      },
      {
        id: 'soc-q3',
        title: 'Privacy & Moderation',
        question: 'What profile visibility and moderation rules apply?',
        type: 'single',
        options: [
          { label: 'Public by Default (Open Network)', value: 'public', desc: 'Anyone can view posts' },
          { label: 'Private Follower Approval Required', value: 'private', desc: 'Users approve who views their feed' },
          { label: 'Automated AI Content Moderation Filter', value: 'ai_moderation', desc: 'Auto-flag hate speech/spam' },
        ],
      },
      {
        id: 'soc-q4',
        title: 'Direct Interaction',
        question: 'What direct communication features are required?',
        type: 'multiple',
        options: [
          { label: '1-on-1 Direct Messaging (Chat)', value: 'dm_chat' },
          { label: 'Group Chats with Sharing', value: 'group_chat' },
          { label: 'Post Comments & Nested Replies', value: 'comments' },
          { label: 'Emoji Reactions & Bookmarking', value: 'reactions' },
        ],
      },
    ],
  },

  healthcare: {
    category: 'Healthcare & Clinical Portal',
    initialAnalysis:
      'Identified a healthcare management system with sensitive health records, appointment scheduling, and doctor-patient communication.',
    questions: [
      {
        id: 'health-q1',
        title: 'Primary Stakeholders',
        question: 'Who will use this healthcare application?',
        type: 'single',
        options: [
          { label: 'Patients and Attending Physicians', value: 'patient_doctor', desc: 'Direct clinical care' },
          { label: 'Clinic Staff, Doctors, and Patients', value: 'clinic_all', desc: 'Front-desk scheduling & records' },
          { label: 'Pharmacy & Diagnostic Lab Integration', value: 'pharmacy_lab', desc: 'Prescription & lab test dispatch' },
        ],
      },
      {
        id: 'health-q2',
        title: 'Appointment Consultation Mode',
        question: 'How will patient appointments be held?',
        type: 'single',
        options: [
          { label: 'In-Clinic Physical Appointments', value: 'in_person', desc: 'Queue & time slot management' },
          { label: 'Telehealth Video Consultation', value: 'telehealth', desc: 'Integrated encrypted video calls' },
          { label: 'Both In-Person and Telehealth', value: 'hybrid', desc: 'Patient choice during booking' },
        ],
      },
      {
        id: 'health-q3',
        title: 'Medical Records & Prescriptions',
        question: 'What health record features are needed?',
        type: 'multiple',
        options: [
          { label: 'Digital Prescription Generation (PDF)', value: 'prescriptions' },
          { label: 'Lab Test Results & Diagnostic Uploads', value: 'lab_results' },
          { label: 'Medical History & Allergy Log', value: 'medical_history' },
          { label: 'Medication Schedule & Refill Reminders', value: 'refill_reminders' },
        ],
      },
      {
        id: 'health-q4',
        title: 'Compliance & Security',
        question: 'What data protection standards are required?',
        type: 'single',
        options: [
          { label: 'HIPAA & GDPR Compliant Encrypted Vault', value: 'hipaa', desc: 'Full audit trails and data encryption' },
          { label: 'Standard Clinical Data Encryption (AES-256)', value: 'standard_aes', desc: 'Protected health storage' },
          { label: 'Role-Based Doctor/Nurse Access Controls', value: 'rbac', desc: 'Strict permission boundary' },
        ],
      },
    ],
  },

  generic: {
    category: 'Custom Software Application',
    initialAnalysis:
      'Identified a custom software product idea. AutoDevAI will analyze user personas, core transactions, and technical architecture.',
    questions: [
      {
        id: 'gen-q1',
        title: 'Target Audience & Access',
        question: 'Who is the primary user base for this application?',
        type: 'single',
        options: [
          { label: 'Internal Business / Company Staff', value: 'internal', desc: 'Secure company operational tool' },
          { label: 'Public Consumers / General Audience', value: 'b2c', desc: 'High-volume user accounts' },
          { label: 'B2B Enterprise Clients', value: 'b2b', desc: 'Multi-tenant organization accounts' },
          { label: 'Technical Developers / Engineers', value: 'dev_tools', desc: 'API and workflow automation' },
        ],
      },
      {
        id: 'gen-q2',
        title: 'Core System Workflow',
        question: 'What is the primary action users take inside the app?',
        type: 'single',
        options: [
          { label: 'Analytics Dashboard & Reporting', value: 'analytics', desc: 'Viewing metrics and trends' },
          { label: 'Transactional Workflow & Forms', value: 'transactional', desc: 'Creating and approving records' },
          { label: 'Collaborative Workspace', value: 'collaboration', desc: 'Multi-user real-time teamwork' },
          { label: 'Content Creation & Asset Library', value: 'content_mgmt', desc: 'Publishing and managing files' },
        ],
      },
      {
        id: 'gen-q3',
        title: 'Authentication & Security',
        question: 'How should users authenticate securely?',
        type: 'multiple',
        options: [
          { label: 'Standard Email & Password + 2FA', value: 'email_2fa' },
          { label: 'Social Sign-In (Google / GitHub / Apple)', value: 'social_oauth' },
          { label: 'Single Sign-On (SAML / Okta)', value: 'sso' },
          { label: 'Passwordless Magic Links', value: 'magic_link' },
        ],
      },
      {
        id: 'gen-q4',
        title: 'Data Storage & Export',
        question: 'What data handling capabilities are needed?',
        type: 'multiple',
        options: [
          { label: 'Real-Time Database Sync', value: 'realtime' },
          { label: 'Automated Daily Backups', value: 'backups' },
          { label: 'CSV / PDF Report Exporting', value: 'export' },
          { label: 'REST / GraphQL API Access', value: 'api_access' },
        ],
      },
    ],
  },
};

/**
 * Categorize a software idea into one of the specialized flows.
 */
export function detectCategory(idea = '') {
  const text = idea.toLowerCase();

  // Education keywords
  if (
    text.includes('college') ||
    text.includes('student') ||
    text.includes('attendance') ||
    text.includes('school') ||
    text.includes('university') ||
    text.includes('faculty') ||
    text.includes('teacher') ||
    text.includes('course') ||
    text.includes('exam') ||
    text.includes('classroom') ||
    text.includes('academic')
  ) {
    return 'education';
  }

  // E-commerce keywords
  if (
    text.includes('store') ||
    text.includes('shop') ||
    text.includes('ecommerce') ||
    text.includes('e-commerce') ||
    text.includes('jewellery') ||
    text.includes('jewelry') ||
    text.includes('product') ||
    text.includes('cart') ||
    text.includes('order') ||
    text.includes('checkout') ||
    text.includes('buyer') ||
    text.includes('seller') ||
    text.includes('marketplace')
  ) {
    return 'ecommerce';
  }

  // Task Management keywords
  if (
    text.includes('task') ||
    text.includes('todo') ||
    text.includes('to-do') ||
    text.includes('productivity') ||
    text.includes('project management') ||
    text.includes('kanban') ||
    text.includes('sprint') ||
    text.includes('deadline') ||
    text.includes('assignee') ||
    text.includes('workflow')
  ) {
    return 'task_management';
  }

  // Social platform keywords
  if (
    text.includes('social') ||
    text.includes('feed') ||
    text.includes('post') ||
    text.includes('community') ||
    text.includes('follower') ||
    text.includes('chat') ||
    text.includes('messaging') ||
    text.includes('forum')
  ) {
    return 'social';
  }

  // Healthcare keywords
  if (
    text.includes('health') ||
    text.includes('clinic') ||
    text.includes('doctor') ||
    text.includes('patient') ||
    text.includes('hospital') ||
    text.includes('medical') ||
    text.includes('appointment') ||
    text.includes('prescription')
  ) {
    return 'healthcare';
  }

  return 'generic';
}
