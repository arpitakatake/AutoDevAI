/**
 * Context-aware discovery interview flows for the Requirement Agent.
 * Uses beginner-friendly language with clear "Why we're asking" contextual explanations.
 */

export const QUESTION_FLOWS = {
  task_management: {
    category: 'Task & Project Planner',
    initialAnalysis:
      'I analyzed your idea. It looks like a task and workflow tracking tool. To structure the right interface and database, I need to clarify a few core decisions.',
    questions: [
      {
        id: 'task-q1',
        title: 'Task Organization',
        question: 'How would you like people to organize their tasks?',
        whyAsking: 'This determines whether we build a simple checklist, a visual column board, or a timeline calendar.',
        type: 'single',
        options: [
          {
            label: 'Task Board (Columns: To Do, In Progress, Done)',
            value: 'task_board',
            desc: 'Visual drag-and-drop cards between progress stages.',
            agentInsight: 'We will scaffold a visual drag-and-drop board with column status filters.',
          },
          {
            label: 'Simple Structured List',
            value: 'simple_list',
            desc: 'A clean checklist with subtasks and check-off boxes.',
            agentInsight: 'We will design a fast, high-density linear checklist with quick task creation.',
          },
          {
            label: 'Calendar & Deadlines View',
            value: 'calendar_view',
            desc: 'Dates, milestones, and upcoming due dates on a calendar.',
            agentInsight: 'We will build date-based calendar queries and scheduled milestone views.',
          },
          {
            label: "I'm not sure — suggest the best option",
            value: 'suggest_board',
            desc: 'Let AutoDevAI recommend a flexible task board structure.',
            agentInsight: 'We will start with a versatile Task Board which covers both team and personal needs.',
          },
        ],
      },
      {
        id: 'task-q2',
        title: 'User Collaboration',
        question: 'Who will be working on these tasks?',
        whyAsking: 'This tells us whether to set up personal user accounts or collaborative team workspaces with assignments.',
        type: 'single',
        options: [
          {
            label: 'Personal use (Single user managing their own tasks)',
            value: 'personal',
            desc: 'No shared workspaces; focused on individual productivity.',
            agentInsight: 'We will keep the data model focused on individual user ownership without team overhead.',
          },
          {
            label: 'Team collaboration (Assign tasks to team members)',
            value: 'team',
            desc: 'Multiple team members with assignment, comments, and mentions.',
            agentInsight: 'We will add team member assignments, activity histories, and notification triggers.',
          },
          {
            label: 'Company with departments & roles',
            value: 'enterprise',
            desc: 'Managers, engineers, and clients with separate permissions.',
            agentInsight: 'We will configure role-based access control with manager and contributor roles.',
          },
        ],
      },
      {
        id: 'task-q3',
        title: 'Deadlines & Reminders',
        question: 'What deadline and reminder features do you need?',
        whyAsking: 'This helps us schedule automated notifications before tasks become overdue.',
        type: 'multiple',
        options: [
          {
            label: 'Due dates with overdue highlights',
            value: 'due_dates',
            agentInsight: 'Tasks approaching their due date will be visually flagged.',
          },
          {
            label: 'Priority levels (Urgent, High, Medium, Low)',
            value: 'priorities',
            agentInsight: 'Priority tags will allow sorting and filtering by importance.',
          },
          {
            label: 'Automated email or in-app reminders before due date',
            value: 'reminders',
            agentInsight: 'A background scheduler will send reminder alerts 24 hours prior.',
          },
          {
            label: 'Repeating tasks (Daily, weekly, or monthly)',
            value: 'recurring',
            agentInsight: 'Recurring task rules will automatically generate fresh task instances.',
          },
        ],
      },
      {
        id: 'task-q4',
        title: 'Notifications & Alerts',
        question: 'Where should task updates and reminders be sent?',
        whyAsking: 'This determines which communication services and webhook integrations we wire up.',
        type: 'multiple',
        options: [
          { label: 'In-app notification bell', value: 'in_app' },
          { label: 'Email digest notifications', value: 'email' },
          { label: 'Slack or Discord messages', value: 'chat_webhook' },
        ],
      },
    ],
  },

  education: {
    category: 'Education & School Portal',
    initialAnalysis:
      'I analyzed your idea. It looks like an academic or classroom management tool. Let me ask a few practical questions to shape the student and teacher experience.',
    questions: [
      {
        id: 'edu-q1',
        title: 'People & Roles',
        question: 'Who will primarily use this application?',
        whyAsking: 'This defines the permissions and screens we create for teachers, students, and administrators.',
        type: 'single',
        options: [
          {
            label: 'Students and Teachers',
            value: 'students_teachers',
            desc: 'Direct classroom roll call, attendance, and grades.',
            agentInsight: 'We will create separate student views and teacher control panels.',
          },
          {
            label: 'Students, Teachers, and School Staff',
            value: 'all_roles',
            desc: 'Includes administration, attendance reports, and department oversight.',
            agentInsight: 'We will build administrative overview dashboards and class roster management.',
          },
          {
            label: 'Parents as well (to check student attendance & progress)',
            value: 'include_parents',
            desc: 'Parent login to view daily attendance records and alerts.',
            agentInsight: 'We will provide read-only parent portals with automated absence notices.',
          },
          {
            label: "I'm not sure — start with Students & Teachers",
            value: 'suggest_school',
            desc: 'Start simple with classroom core roles.',
            agentInsight: 'We will build a clean foundation for Students and Teachers first.',
          },
        ],
      },
      {
        id: 'edu-q2',
        title: 'Attendance & Check-in',
        question: 'How should attendance or session participation be recorded?',
        whyAsking: 'This determines whether we need mobile QR scanning features, teacher roll-call lists, or hardware support.',
        type: 'single',
        options: [
          {
            label: 'Quick Digital Roll Call by Teacher',
            value: 'manual_roster',
            desc: 'Teacher taps Present/Absent on a classroom roster list.',
            agentInsight: 'We will build a 1-tap roster grid for fast in-class attendance.',
          },
          {
            label: 'Dynamic QR Code on Projector',
            value: 'qr_code',
            desc: 'Teacher displays a code that students scan with their phone camera.',
            agentInsight: 'We will generate timed QR codes with location and anti-proxy validation.',
          },
          {
            label: 'Both: Teacher Roll Call + Student QR Scanning',
            value: 'hybrid',
            desc: 'Flexible for any classroom environment.',
            agentInsight: 'We will support both modes so teachers can override whenever needed.',
          },
        ],
      },
      {
        id: 'edu-q3',
        title: 'Absence Warnings',
        question: 'What automated alerts should the system send?',
        whyAsking: 'This configures automatic warnings when students miss classes or fall behind.',
        type: 'multiple',
        options: [
          { label: 'Warning when attendance drops below 75%', value: 'low_attendance_warning' },
          { label: 'Same-day absence alert to student and parents', value: 'daily_absence_alert' },
          { label: 'Weekly summary report for department heads', value: 'weekly_summary' },
          { label: 'Exam eligibility lock if attendance is insufficient', value: 'exam_lock' },
        ],
      },
      {
        id: 'edu-q4',
        title: 'School Systems Integration',
        question: 'Does this need to connect with existing school databases?',
        whyAsking: 'This decides whether the app is completely self-contained or requires database sync.',
        type: 'single',
        options: [
          { label: 'Standalone (Has its own independent login and student database)', value: 'standalone' },
          { label: 'Connect to Google Classroom or Canvas LMS', value: 'google_classroom' },
          { label: 'Exportable Excel / CSV reports only', value: 'csv_export' },
        ],
      },
    ],
  },

  ecommerce: {
    category: 'Online Store & E-Commerce',
    initialAnalysis:
      'I analyzed your idea. It looks like an e-commerce storefront. Let me clarify what you are selling and how customers will pay.',
    questions: [
      {
        id: 'ecom-q1',
        title: 'Products Being Sold',
        question: 'What types of items or services will you sell?',
        whyAsking: 'Physical products require inventory tracking and shipping, while digital items deliver instant downloads.',
        type: 'single',
        options: [
          {
            label: 'Physical Products with Stock & Inventory',
            value: 'physical',
            desc: 'Requires stock counts, variants (sizes, colors), and shipping address.',
            agentInsight: 'We will add inventory count tracking and shipping calculator.',
          },
          {
            label: 'Custom / Made-to-order Goods (e.g. jewelry, engraved items)',
            value: 'custom_crafted',
            desc: 'Requires customer engraving notes and custom order specifications.',
            agentInsight: 'We will add custom text fields and personalization options on product pages.',
          },
          {
            label: 'Digital Downloads / Courses',
            value: 'digital',
            desc: 'Instant access or download link delivered after checkout.',
            agentInsight: 'We will configure instant download links after payment verification.',
          },
        ],
      },
      {
        id: 'ecom-q2',
        title: 'Checkout & Payments',
        question: 'How should customers pay at checkout?',
        whyAsking: 'This tells us which payment processors and checkout flows to wire up.',
        type: 'multiple',
        options: [
          { label: 'Credit & Debit Cards (via Stripe)', value: 'stripe' },
          { label: 'Apple Pay & Google Pay', value: 'wallets' },
          { label: 'PayPal Checkout', value: 'paypal' },
          { label: 'Cash on Delivery (COD)', value: 'cod' },
        ],
      },
      {
        id: 'ecom-q3',
        title: 'Order Tracking',
        question: 'How should customers track their order status?',
        whyAsking: 'This defines the customer order history portal and email tracking links.',
        type: 'single',
        options: [
          { label: 'Order Status Page (Placed → Packed → Shipped → Delivered)', value: 'status_page' },
          { label: 'Courier Tracking Link (FedEx, UPS, DHL tracking number)', value: 'courier_api' },
          { label: 'Store Pickup Notification (Ready for in-person pickup)', value: 'store_pickup' },
        ],
      },
      {
        id: 'ecom-q4',
        title: 'Customer Accounts',
        question: 'Should customers be required to create an account?',
        whyAsking: 'Guest checkout reduces checkout friction, while mandatory accounts help build customer loyalty.',
        type: 'single',
        options: [
          { label: 'Allow Guest Checkout (Quick purchase without creating password)', value: 'guest_allowed' },
          { label: 'Mandatory Account (Customer registers to save addresses & order history)', value: 'mandatory_account' },
        ],
      },
    ],
  },

  social: {
    category: 'Community & Social App',
    initialAnalysis:
      'I analyzed your idea. It looks like a social community platform. Let me clarify what content users share and how they discover each other.',
    questions: [
      {
        id: 'soc-q1',
        title: 'Content Format',
        question: 'What is the main format of posts people will share?',
        whyAsking: 'This shapes the feed layout and storage for text, images, or discussion threads.',
        type: 'single',
        options: [
          { label: 'Photos and Text Updates', value: 'photos_text', desc: 'Feed with image galleries and captions.' },
          { label: 'Discussion Forum / Questions & Answers', value: 'forum_threads', desc: 'Topics, upvoting, and comment threads.' },
          { label: 'Short Video Clips', value: 'short_video', desc: 'Vertical video feed and audio tracks.' },
        ],
      },
      {
        id: 'soc-q2',
        title: 'Discovery & Feeds',
        question: 'How should people see new posts?',
        whyAsking: 'This decides how feed algorithms sort posts.',
        type: 'single',
        options: [
          { label: 'Chronological (See latest posts from accounts you follow)', value: 'chronological' },
          { label: 'Topic Channels (Browse by interest, hashtag, or category)', value: 'topics' },
        ],
      },
      {
        id: 'soc-q3',
        title: 'Direct Messaging',
        question: 'Do users need private messaging?',
        whyAsking: 'This decides whether we build a real-time private 1-on-1 chat feature.',
        type: 'single',
        options: [
          { label: 'Yes, private 1-on-1 chat between users', value: 'direct_chat' },
          { label: 'Public comments only (No private messaging needed)', value: 'public_comments_only' },
        ],
      },
    ],
  },

  healthcare: {
    category: 'Healthcare & Clinic Portal',
    initialAnalysis:
      'I analyzed your idea. It looks like a healthcare or patient portal. Because health information is sensitive, let me clarify patient scheduling and records.',
    questions: [
      {
        id: 'health-q1',
        title: 'Appointments',
        question: 'How will patient appointments be held?',
        whyAsking: 'This dictates whether we build video consultation or in-clinic calendar slots.',
        type: 'single',
        options: [
          { label: 'In-Clinic Visits with Time Slot Booking', value: 'in_person' },
          { label: 'Telehealth Video Consultations', value: 'telehealth' },
          { label: 'Both In-Person and Video Appointments', value: 'hybrid_appointments' },
        ],
      },
      {
        id: 'health-q2',
        title: 'Medical Records',
        question: 'What records will doctors and patients view in the portal?',
        whyAsking: 'This defines secure health document storage and download permissions.',
        type: 'multiple',
        options: [
          { label: 'Digital Prescriptions (PDF download)', value: 'prescriptions' },
          { label: 'Lab & Diagnostic Test Results', value: 'lab_results' },
          { label: 'Medical History & Allergies Log', value: 'medical_history' },
        ],
      },
      {
        id: 'health-q3',
        title: 'Privacy & Security',
        question: 'What level of privacy protection is required?',
        whyAsking: 'Medical data requires strict end-to-end encryption and audit logging.',
        type: 'single',
        options: [
          { label: 'HIPAA & GDPR Standard Healthcare Encryption (AES-256 with audit trail)', value: 'hipaa' },
          { label: 'Standard Protected User Authentication', value: 'standard' },
        ],
      },
    ],
  },

  generic: {
    category: 'Custom Software Application',
    initialAnalysis:
      'I analyzed your idea. To establish the right architecture, let me ask a few foundational questions about your users and core workflow.',
    questions: [
      {
        id: 'gen-q1',
        title: 'Primary Audience',
        question: 'Who will primarily use this application?',
        whyAsking: 'This helps us decide whether to design for internal staff, general consumers, or businesses.',
        type: 'single',
        options: [
          { label: 'Internal Business Staff / Employees', value: 'internal' },
          { label: 'Public Consumers (General audience)', value: 'consumers' },
          { label: 'Business Clients (B2B multi-tenant)', value: 'b2b' },
          { label: "I'm not sure — keep it flexible", value: 'flexible' },
        ],
      },
      {
        id: 'gen-q2',
        title: 'Main Activity',
        question: 'What is the primary action someone takes inside your app?',
        whyAsking: 'This identifies the main screen and primary database records to build first.',
        type: 'single',
        options: [
          { label: 'Viewing a Dashboard & Reports', value: 'dashboard' },
          { label: 'Filling out Forms & Submitting Records', value: 'forms' },
          { label: 'Collaborating in a Workspace with Others', value: 'collaboration' },
          { label: 'Managing Files & Content', value: 'content' },
        ],
      },
      {
        id: 'gen-q3',
        title: 'Accounts & Login',
        question: 'How should users log into your app?',
        whyAsking: 'This selects the authentication strategy for your user accounts.',
        type: 'multiple',
        options: [
          { label: 'Email and password with email verification', value: 'email_password' },
          { label: 'Google or GitHub one-click login', value: 'social_login' },
          { label: 'Two-factor authentication (2FA) for extra security', value: 'two_factor' },
        ],
      },
      {
        id: 'gen-q4',
        title: 'Data Export',
        question: 'Do users need to export their data?',
        whyAsking: 'This determines whether we build Excel, CSV, or PDF download generators.',
        type: 'single',
        options: [
          { label: 'Yes, allow downloading reports as Excel / CSV', value: 'csv_export' },
          { label: 'Yes, generate downloadable PDF summaries', value: 'pdf_export' },
          { label: 'No, viewing inside the app is sufficient', value: 'in_app_only' },
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
