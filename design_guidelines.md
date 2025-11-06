# College Desk - Design Guidelines

## Design Approach: Design System Foundation

**Selected System:** Material Design principles with Linear-inspired minimalism for enterprise productivity applications

**Rationale:** College Desk is a utility-focused workflow automation tool requiring clarity, efficiency, and data density. The design prioritizes learnability, task completion speed, and information hierarchy over decorative aesthetics.

---

## Typography

**Font Family:** Inter (Google Fonts)
- Primary: Inter (body text, UI elements)
- Monospace: 'Courier New' (document IDs, timestamps)

**Type Scale:**
- Headings (H1): text-3xl font-bold (Dashboard titles, role headers)
- Headings (H2): text-2xl font-semibold (Section headers)
- Headings (H3): text-xl font-semibold (Card titles, workflow stages)
- Body Large: text-base font-medium (Primary actions, key metrics)
- Body: text-sm (Default UI text, form labels, table content)
- Small: text-xs (Helper text, timestamps, metadata)

**Line Height:**
- Headings: leading-tight
- Body text: leading-relaxed for readability

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (buttons, icons): p-2, gap-2
- Component internal spacing: p-4, gap-4
- Section spacing: p-6, p-8
- Page margins: p-8, p-12
- Vertical rhythm between sections: mb-8, mb-12

**Grid System:**
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Task lists: Single column with dividers
- Approval workflows: Horizontal stepper layout
- Forms: Two-column for desktop (grid-cols-2 gap-6)

**Container Widths:**
- Full app container: max-w-7xl mx-auto
- Form containers: max-w-4xl
- Chat assistant: max-w-3xl

---

## Component Library

### Navigation
**Sidebar Navigation (Desktop):**
- Fixed left sidebar: w-64
- Logo at top: h-12
- Navigation items: p-4 with icons (Heroicons)
- Active state: subtle background treatment
- Sections: Dashboard, Attendance, Documents, Approvals, AI Assistant, Profile

**Mobile Navigation:**
- Collapsible hamburger menu
- Full-screen overlay when open

**Top Bar:**
- Fixed header: h-16
- Contains: Role badge, notifications bell icon, user avatar/dropdown
- Notification counter badge on bell icon

### Dashboard Cards
**Metric Cards:**
- Elevated cards with p-6
- Large number display (text-3xl font-bold)
- Label below (text-sm)
- Icon in top-right corner
- Border-left accent for status (pending/approved/rejected)

**Quick Action Cards:**
- Icon-first layout
- Title + brief description
- Primary action button at bottom

### Task Tracker / Approval Workflow
**Workflow Stepper:**
- Horizontal timeline: Faculty → HOD → Principal
- Each stage: Circle indicator + label
- Active stage: emphasized
- Completed: checkmark icon
- Lines connecting stages

**Task List Items:**
- Card-based: p-4 border rounded-lg
- Left section: Document icon + title
- Center: Submitted by, date (text-xs)
- Right section: Status badge + action buttons
- Expandable details on click

### Forms
**Input Fields:**
- Full-width with labels above: mb-4
- Rounded borders: rounded-md
- Focus state with ring
- Helper text below in text-xs
- Required field indicator (*)

**Buttons:**
- Primary action: px-6 py-2 rounded-md font-medium
- Secondary: outlined variant
- Danger (reject): appropriate treatment
- Icon + text combination for clarity

**File Upload:**
- Drag-and-drop zone with dashed border
- Icon + text prompt
- File list below with remove option

### AI Chat Assistant
**Chat Interface:**
- Fixed bottom-right: Floating chat bubble trigger (w-14 h-14 rounded-full)
- Expanded: Panel slides up from bottom on mobile, sidebar on desktop (w-96)
- Message bubbles: User (right-aligned), AI (left-aligned)
- Input field: Fixed at bottom with send button
- Suggested prompts as chips above input
- Typing indicator when AI is responding

### Document Display
**Generated Documents:**
- Preview area with white background (mimics paper)
- Document header: Title, generated date, document ID
- Download buttons: PDF and Word icons
- Print option

### Notifications Panel
**Notification Dropdown:**
- Slides from top-right
- List of recent notifications (max-h-96 overflow-y-auto)
- Each item: Icon + message + timestamp
- Mark as read action
- "View all" link at bottom

### Tables (Attendance, Audit Logs)
**Data Tables:**
- Striped rows for readability
- Sticky header on scroll
- Sortable columns (arrow icons)
- Pagination at bottom
- Actions column with icon buttons
- Responsive: Stacks on mobile with card layout

### Status Badges
- Pill-shaped: px-3 py-1 rounded-full text-xs font-medium
- Pending, Approved, Rejected, Below Threshold states
- Appropriate visual treatment per status

---

## Animations

**Minimal, Purposeful Animations:**
- Page transitions: Fade-in (duration-200)
- Modal/dropdown appearance: Slide + fade (duration-300)
- Button interactions: Built-in hover states
- Loading states: Simple spinner or skeleton screens
- Toast notifications: Slide from top

**No complex scroll animations or decorative effects**

---

## Images

**Hero Section:** No traditional hero image for this application. The login page features a split-screen layout:
- Left side: Illustration of college campus or workflow diagram (abstract, geometric style)
- Right side: Login form with role selection

**Dashboard:** No large imagery. Focus on data visualization:
- Small icons for actions and categories (Heroicons library via CDN)
- User avatars in circular frames
- Document type icons in task lists

**Empty States:** Simple illustrations when no data exists:
- "No pending approvals" - icon + message
- "Start a conversation" in AI chat - robot icon

---

## Key Screens

1. **Login:** Split-screen with illustration + form with role dropdown (Admin/Faculty/Student)
2. **Dashboard:** Grid of metric cards + recent tasks list + quick actions
3. **Attendance Management:** Filter bar + data table with threshold highlighting + bulk actions
4. **Document Generator:** Form (left) + AI preview (right) on desktop, stacked on mobile
5. **Approval Workflow:** Task details + stepper + approve/reject actions + comment box
6. **AI Assistant:** Chat interface with suggested prompts and context-aware responses
7. **Task Tracker:** Filterable list view with status badges and expandable details

---

## Accessibility
- All interactive elements keyboard accessible
- Focus indicators on all focusable elements (ring treatment)
- ARIA labels for icons and screen readers
- Sufficient contrast ratios (WCAG AA minimum)
- Form validation with clear error messages
- Skip navigation link for screen readers