// ============================================================
// Shared assessment data + scoring
//
// Single source of truth for the question sets and scoring shared across the
// Agent Impact journey's three tools (Operational Friction Score, Agentic
// Readiness Assessment, First Loop Designer). The tool stack in particular is
// reused by both the Friction tool and the First Loop Designer's "Systems"
// step, so it lives here to keep the two from drifting.
//
// Industry / company size / revenue continue to come from lib/qualification.ts,
// which is the cross-form single source shared with the demo booking flow.
// ============================================================

// ---- Tool stack (shared: Friction step 2 + First Loop "Systems") ----------
//
// Categorized for a regular SMB stack. Two OS suites (Google Workspace,
// Microsoft 365) declare the components they subsume via `includes`; when a
// suite is selected its components drop out of the picker so nothing is
// double-counted. Industry-specific groups/tools carry an `industries` list
// (qualification VALUES) and only render for those industries.

import { INDUSTRIES } from './qualification';

export interface ToolGroup {
  id: string;
  label: string;
  industries?: string[]; // qualification values; omitted = shown for all industries
}

export interface ToolDef {
  id: string;
  name: string;
  group: string;
  includes?: string[];   // component tool ids this suite subsumes
}

export const TOOL_GROUPS: ToolGroup[] = [
  { id: 'workspace', label: 'Workspace, email & files' },
  { id: 'comms', label: 'Messaging & meetings' },
  { id: 'crm', label: 'CRM & sales' },
  { id: 'marketing', label: 'Marketing & outreach' },
  { id: 'finance', label: 'Finance & payments' },
  { id: 'pm', label: 'Projects & tasks' },
  { id: 'fundraising', label: 'Fundraising & donors', industries: ['community_nonprofit'] },
];

export const TOOLS: ToolDef[] = [
  // Workspace, email & files — suites first, then standalone components/apps.
  { id: 'gworkspace', name: 'Google Workspace', group: 'workspace', includes: ['gmail', 'gdrive', 'gmeet'] },
  { id: 'microsoft365', name: 'Microsoft 365', group: 'workspace', includes: ['outlook', 'teams', 'onedrive'] },
  { id: 'gmail', name: 'Gmail', group: 'workspace' },
  { id: 'outlook', name: 'Outlook', group: 'workspace' },
  { id: 'gdrive', name: 'Google Drive', group: 'workspace' },
  { id: 'onedrive', name: 'OneDrive', group: 'workspace' },
  { id: 'dropbox', name: 'Dropbox', group: 'workspace' },
  { id: 'box', name: 'Box', group: 'workspace' },
  // Messaging & meetings
  { id: 'slack', name: 'Slack', group: 'comms' },
  { id: 'teams', name: 'Microsoft Teams', group: 'comms' },
  { id: 'zoom', name: 'Zoom', group: 'comms' },
  { id: 'gmeet', name: 'Google Meet', group: 'comms' },
  { id: 'calendly', name: 'Calendly', group: 'comms' },
  // CRM & sales
  { id: 'hubspot', name: 'HubSpot', group: 'crm' },
  { id: 'salesforce', name: 'Salesforce', group: 'crm' },
  { id: 'pipedrive', name: 'Pipedrive', group: 'crm' },
  { id: 'zoho', name: 'Zoho CRM', group: 'crm' },
  { id: 'lightcrm', name: 'Spreadsheet / light CRM', group: 'crm' },
  { id: 'apollo', name: 'Apollo', group: 'crm' },
  { id: 'clay', name: 'Clay', group: 'crm' },
  // Marketing & outreach
  { id: 'mailchimp', name: 'Mailchimp', group: 'marketing' },
  { id: 'constantcontact', name: 'Constant Contact', group: 'marketing' },
  // Finance & payments
  { id: 'quickbooks', name: 'QuickBooks', group: 'finance' },
  { id: 'xero', name: 'Xero', group: 'finance' },
  { id: 'stripe', name: 'Stripe', group: 'finance' },
  { id: 'billcom', name: 'Bill.com', group: 'finance' },
  { id: 'docusign', name: 'DocuSign', group: 'finance' },
  { id: 'pandadoc', name: 'PandaDoc', group: 'finance' },
  // Projects & tasks
  { id: 'asana', name: 'Asana', group: 'pm' },
  { id: 'clickup', name: 'ClickUp', group: 'pm' },
  { id: 'monday', name: 'Monday', group: 'pm' },
  { id: 'trello', name: 'Trello', group: 'pm' },
  { id: 'jira', name: 'Jira', group: 'pm' },
  { id: 'linear', name: 'Linear', group: 'pm' },
  { id: 'notion', name: 'Notion', group: 'pm' },
  { id: 'airtable', name: 'Airtable', group: 'pm' },
  // Fundraising & donors — nonprofit only.
  { id: 'bloomerang', name: 'Bloomerang', group: 'fundraising' },
  { id: 'littlegreenlight', name: 'Little Green Light', group: 'fundraising' },
  { id: 'donorperfect', name: 'DonorPerfect', group: 'fundraising' },
  { id: 'neoncrm', name: 'Neon CRM', group: 'fundraising' },
  { id: 'donorbox', name: 'Donorbox', group: 'fundraising' },
  { id: 'classy', name: 'Classy', group: 'fundraising' },
  { id: 'givebutter', name: 'GiveButter', group: 'fundraising' },
];

// componentId -> suiteId, derived from the suites' `includes`.
function componentToSuite(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const t of TOOLS) if (t.includes) for (const c of t.includes) map[c] = t.id;
  return map;
}

// Toggle a tool in a selection map. Turning a suite ON folds in (removes) any of
// its components that were separately selected, so they can't double-count.
export function applyToolToggle(selected: Record<string, boolean>, id: string): Record<string, boolean> {
  const next: Record<string, boolean> = { ...selected, [id]: !selected[id] };
  const tool = TOOLS.find((t) => t.id === id);
  if (tool?.includes && next[id]) for (const c of tool.includes) delete next[c];
  return next;
}

// The selected ids that actually count: components are dropped when their parent
// suite is also selected. Includes per-group "Other" selections.
export function effectiveSelectedIds(selected: Record<string, boolean>): string[] {
  const c2s = componentToSuite();
  return Object.keys(selected).filter((id) => selected[id] && !(c2s[id] && selected[c2s[id]]));
}

interface VisibleGroup { id: string; label: string; items: { id: string; name: string }[] }

// Groups + tools to render, filtered by industry (label) and with suite
// components hidden once their suite is selected. Appends a per-group "Other".
export function visibleToolGroups(industryLabel: string, selected: Record<string, boolean>): VisibleGroup[] {
  const industryValue = INDUSTRIES.find((o) => o.label === industryLabel)?.value ?? '';
  const c2s = componentToSuite();
  return TOOL_GROUPS
    .filter((g) => !g.industries || g.industries.includes(industryValue))
    .map((g) => {
      const items = TOOLS
        .filter((t) => t.group === g.id)
        .filter((t) => { const suite = c2s[t.id]; return !(suite && selected[suite]); })
        .map((t) => ({ id: t.id, name: t.name }));
      items.push({ id: g.id + '_other', name: 'Other' });
      return { id: g.id, label: g.label, items };
    });
}

// Employee-count model, keyed by the company-size display label.
export const EMP: Record<string, number> = {
  '1–10': 6,
  '11–25': 18,
  '26–50': 38,
  '51–100': 75,
  '101–250': 160,
};

// ---- Friction question set -------------------------------------------------

export const SCALE = ['Rarely', 'Occasionally', 'Sometimes', 'Often', 'Constantly'];

export const FRICTION_QS = [
  { key: 'q1', label: 'How often do people need information that lives with someone else?' },
  { key: 'q2', label: 'How often does answering a simple question mean checking more than one place?' },
  { key: 'q3', label: 'How often are meetings used mainly to gather status updates?' },
  { key: 'q4', label: 'How often do people search for information they cannot quickly find?' },
] as const;

const DIAG: Record<string, string> = {
  'Scattered information':
    'Answers live in too many places, so your team keeps rebuilding context that already exists somewhere.',
  'Disconnected tools':
    'Your tools hold the information but do not share it, so people copy things between systems by hand.',
  'Limited visibility':
    'You tend to find out about problems in meetings instead of seeing them as they happen.',
  'Manual follow-through':
    'Work waits on hand-offs and on the one person who happens to know the answer.',
};

const LOOP: Record<string, string> = {
  'Scattered information':
    'A first loop that gathers and organizes this information in one place, so your team stops hunting for it.',
  'Disconnected tools':
    'A first loop that moves information between your tools automatically, so no one has to rekey it.',
  'Limited visibility':
    'A first loop that prepares a simple status summary, so you can see what is happening without a meeting.',
  'Manual follow-through':
    'A first loop that handles routine follow-up and coordination, with a human reviewing before anything goes out.',
};

// ---- Formatting helpers ----------------------------------------------------

export const clamp = (x: number) => Math.max(0, Math.min(100, Math.round(x)));
export const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US');
export const fmtMoney = (n: number) => {
  n = Math.round(n);
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
  return '$' + n;
};

// ---- Friction scoring ------------------------------------------------------

export interface FrictionModel {
  score: number;
  band: string;
  bandColor: string;
  totalHours: number;
  annualCost: number;
  opportunity: number;
  cats: { name: string; desc: string; v: number }[];
  diagnostic: string;
  firstLoop: string;
  topDimension: string;
}

export function computeFriction(
  tools: Record<string, boolean>,
  q: (number | null)[],
  companySize: string
): FrictionModel {
  const [q1, q2, q3, q4] = q.map((v) => v ?? 0);
  const toolCount = effectiveSelectedIds(tools).length;
  const toolScore = Math.min(toolCount, 12) / 12;
  const sliderAvg = (q1 + q2 + q3 + q4) / 16;
  const score = clamp((sliderAvg * 0.75 + toolScore * 0.25) * 100);

  const cats = [
    { name: 'Scattered information', desc: 'How spread out answers are across people and tools', v: clamp((q4 / 4 * 0.6 + toolScore * 0.4) * 100) },
    { name: 'Disconnected tools', desc: 'How little your tools actually share with each other', v: clamp((q2 / 4 * 0.65 + toolScore * 0.35) * 100) },
    { name: 'Limited visibility', desc: 'How hard it is to see real status without asking around', v: clamp((q3 / 4 * 0.7 + q1 / 4 * 0.3) * 100) },
    { name: 'Manual follow-through', desc: 'How much work waits on hand-offs and coordination', v: clamp((q1 / 4 * 0.55 + q3 / 4 * 0.45) * 100) },
  ];

  const employees = EMP[companySize] || 40;
  const hoursPerEmp = (score / 100) * 16;
  const totalHours = Math.round(employees * hoursPerEmp);
  const annualCost = Math.round(totalHours * 12 * 58);
  const opportunity = Math.round(annualCost * 0.6);

  let band = 'Low friction';
  let bandColor = '#5FC98A';
  if (score >= 67) { band = 'High friction'; bandColor = '#D2A263'; }
  else if (score >= 34) { band = 'Moderate friction'; bandColor = '#A8C6C1'; }

  const top = [...cats].sort((a, b) => b.v - a.v)[0];
  const diagnostic = 'Your biggest source of friction is ' + top.name.toLowerCase() + '. ' + DIAG[top.name];

  return {
    score, band, bandColor, totalHours, annualCost, opportunity, cats,
    diagnostic, firstLoop: LOOP[top.name], topDimension: top.name,
  };
}

// ---- Agentic Readiness ----------------------------------------------------

export interface ReadinessLayer {
  id: 'k' | 'v' | 'e';
  label: string;
  weight: number;
  lead: string;
  items: { id: string; text: string }[];
}

export const READINESS_LAYERS: ReadinessLayer[] = [
  {
    id: 'k', label: 'Knowledge layer', weight: 0.25,
    lead: 'Can agents reach the information they would need?',
    items: [
      { id: 'k1', text: 'Client, donor, or customer information' },
      { id: 'k2', text: 'Project and program information' },
      { id: 'k3', text: 'Internal documentation and process' },
      { id: 'k4', text: 'Communications across email and chat' },
    ],
  },
  {
    id: 'v', label: 'Visibility layer', weight: 0.30,
    lead: 'Can your team instantly answer these?',
    items: [
      { id: 'v1', text: 'Which relationships are at risk' },
      { id: 'v2', text: 'Which projects are behind schedule' },
      { id: 'v3', text: 'Which clients or donors need attention' },
      { id: 'v4', text: 'Which follow-ups are slipping' },
    ],
  },
  {
    id: 'e', label: 'Execution layer', weight: 0.45,
    lead: 'Can agents take action across your tools?',
    items: [
      { id: 'e1', text: 'Update records' },
      { id: 'e2', text: 'Create tasks' },
      { id: 'e3', text: 'Trigger workflows' },
      { id: 'e4', text: 'Send communications' },
      { id: 'e5', text: 'Coordinate work across people' },
    ],
  },
];

export const READINESS_OPTS = [
  { label: 'No', v: 0 },
  { label: 'Partly', v: 0.5 },
  { label: 'Yes', v: 1 },
];

const READINESS_CONSTRAINT: Record<string, string> = {
  k: 'Your working context is scattered today, and that is the fastest thing to fix. A read-only Agentic Core organizes it first, so everything built on top of it gets sharper.',
  v: 'You are already storing the information, you just cannot see it in time. With an Agentic Core in place, a simple live answer about what needs attention comes almost for free.',
  e: 'The hard part, having the information, is already done. The gap is execution, and that is exactly what a first loop unlocks: moving you from read-only answers to safe, human-reviewed action.',
};

const READINESS_REC: Record<string, { cap: string; why: string }> = {
  k: { cap: 'Data Cleanup Loop', why: 'Organize your real information into an Agentic Core your agents can work from.' },
  v: { cap: 'Reporting Loop', why: 'Turn stored information into a simple live answer about what needs attention.' },
  e: { cap: 'Follow-up & Outreach Loop', why: 'Move from read-only answers to safe, human-reviewed action on a real workflow.' },
};

export interface ReadinessModel {
  score: number;
  band: string;
  layers: { id: string; label: string; lead: string; weight: number; pct: number }[];
  lowestId: string;
  lowestLabel: string;
  constraint: string;
  recCap: string;
  recWhy: string;
  projected: number;
}

export function computeReadiness(answers: Record<string, number>): ReadinessModel {
  const layers = READINESS_LAYERS.map((L) => {
    const sum = L.items.reduce((acc, it) => acc + (answers[it.id] || 0), 0);
    const pct = Math.round((sum / L.items.length) * 100);
    return { id: L.id, label: L.label, lead: L.lead, weight: L.weight, pct };
  });

  const score = Math.round(layers.reduce((acc, L) => acc + L.pct * L.weight, 0));
  let band = 'Nascent';
  if (score >= 80) band = 'Agentic-ready';
  else if (score >= 60) band = 'Operational';
  else if (score >= 40) band = 'Developing';

  // Lowest layer (stable: k before v before e on ties, matching layer order).
  const lowest = layers.reduce((lo, L) => (L.pct < lo.pct ? L : lo), layers[0]);

  const [kp, vp, ep] = [layers[0].pct, layers[1].pct, layers[2].pct];
  const projected = Math.round(Math.max(kp, 80) * 0.25 + Math.max(vp, 75) * 0.30 + Math.max(ep, 82) * 0.45);

  return {
    score, band, layers,
    lowestId: lowest.id, lowestLabel: lowest.label,
    constraint: READINESS_CONSTRAINT[lowest.id],
    recCap: READINESS_REC[lowest.id].cap,
    recWhy: READINESS_REC[lowest.id].why,
    projected,
  };
}

// ---- First Loop Designer --------------------------------------------------

export interface FirstLoopGoal {
  id: string;
  label: string;
  desc: string;
  cap: string;
  q: string;
  behavior: string[];
}

export const FIRST_LOOP_GOALS: FirstLoopGoal[] = [
  { id: 'followup', label: 'Follow-up & outreach', desc: 'Keep donor, lead, and client follow-up from slipping.', cap: 'Follow-up & Outreach Loop', q: 'Who hasn’t heard from us that should have this week?', behavior: ['reviews recent activity across your inbox and CRM', 'finds contacts who have gone quiet or are overdue', 'pulls the context of your last conversation', 'drafts a personal follow-up for each one', 'queues every draft for a human to review before it sends'] },
  { id: 'reporting', label: 'Reporting & updates', desc: 'Turn scattered activity into a clean update.', cap: 'Reporting Loop', q: 'What changed since our last update, and who needs to know?', behavior: ['gathers activity across your tools and documents', 'reconciles it against your goals and last report', 'flags wins, risks, and decisions that need attention', 'assembles a clean, on-brand update', 'queues it for a human to approve before it goes out'] },
  { id: 'coordination', label: 'Campaign & project coordination', desc: 'Keep work moving without the constant chasing.', cap: 'Coordination Loop', q: 'What is stuck or waiting on someone right now?', behavior: ['tracks tasks and milestones across your tools', 'spots work that has stalled or missed a hand-off', 'reads recent messages for unflagged blockers', 'drafts the nudge or next step for each owner', 'routes it for a human to confirm before sending'] },
  { id: 'intake', label: 'Intake & onboarding', desc: 'Give every new client, donor, or hire a clean start.', cap: 'Intake Loop', q: 'Is every new relationship getting the right first steps?', behavior: ['watches for new clients, donors, members, or hires', 'gathers the information each onboarding step needs', 'prepares the documents, records, and welcome notes', 'creates the tasks so nothing is missed', 'queues the work for a human to review and send'] },
  { id: 'cleanup', label: 'Records & data cleanup', desc: 'Keep your CRM or database clean and current.', cap: 'Data Cleanup Loop', q: 'Where is our information out of date or duplicated?', behavior: ['scans your records for gaps, duplicates, and stale fields', 'cross-checks against recent activity and documents', 'proposes the corrections and merges', 'organizes records so they are easy to work from', 'applies changes only after a human approves them'] },
  { id: 'visibility', label: 'Status & visibility', desc: 'See what is working and what is stuck, without a meeting.', cap: 'Visibility Loop', q: 'What needs my attention across the organization today?', behavior: ['reads current activity across your core systems', 'surfaces what moved, stalled, or slipped', 'connects the signals into a short, plain summary', 'flags the few decisions that need a person', 'keeps a running record you can look back on'] },
  { id: 'custom', label: 'Custom', desc: 'Start from a repetitive task in your own words.', cap: 'Custom Loop', q: 'What repetitive workflow should run itself?', behavior: ['captures the trigger and the context it needs', 'maps the steps the workflow follows today', 'assembles those steps from your approved information', 'prepares the output or the next action', 'keeps a human in review before anything important happens'] },
];

// Maps a friction dimension to the loop that best addresses it, so the First
// Loop Designer can open on the goal the earlier tools recommended.
export const FRICTION_DIMENSION_GOAL: Record<string, string> = {
  'Scattered information': 'cleanup',
  'Disconnected tools': 'coordination',
  'Limited visibility': 'visibility',
  'Manual follow-through': 'followup',
};

// Resolve a recommended loop capability name (e.g. "Reporting Loop") back to its
// First Loop Designer goal id, for pre-seeding.
export function goalIdForCap(cap: string): string {
  return FIRST_LOOP_GOALS.find((g) => g.cap === cap)?.id ?? '';
}

export const FIRST_LOOP_OUTCOMES = [
  { id: 'answer', label: 'Answer questions' },
  { id: 'reports', label: 'Generate reports' },
  { id: 'risks', label: 'Detect risks' },
  { id: 'actions', label: 'Trigger actions' },
  { id: 'monitor', label: 'Monitor progress' },
  { id: 'coordinate', label: 'Coordinate work' },
];

export interface FirstLoopModel {
  goalId: string;
  cap: string;
  question: string;
  behavior: { n: string; text: string }[];
  systems: string[];
  outputs: string[];
  sysCount: number;
  outCount: number;
  hours: number;
  gain: number;
}

export function computeFirstLoop(
  goalId: string,
  systems: Record<string, boolean>,
  outcomes: Record<string, boolean>
): FirstLoopModel {
  const goal = FIRST_LOOP_GOALS.find((g) => g.id === goalId) || null;
  const cap = goal ? goal.cap : 'First Loop';

  const effIds = effectiveSelectedIds(systems);
  const sysSel = TOOLS.filter((t) => effIds.includes(t.id));
  const systemNames = sysSel.length ? sysSel.map((t) => t.name) : ['Your core systems'];
  const outSel = FIRST_LOOP_OUTCOMES.filter((o) => outcomes[o.id]);
  const outputNames = outSel.length ? outSel.map((o) => o.label) : ['Answer questions', 'Detect risks'];

  const sysCount = effIds.length;
  const outCount = outSel.length;
  const hours = Math.round(32 + sysCount * 5 + outCount * 6);
  const gain = Math.min(72, 30 + sysCount * 3 + outCount * 4);

  return {
    goalId,
    cap,
    question: goal ? goal.q : '',
    behavior: goal ? goal.behavior.map((t, i) => ({ n: '0' + (i + 1), text: t })) : [],
    systems: systemNames,
    outputs: outputNames,
    sysCount,
    outCount,
    hours,
    gain,
  };
}

// ---- Combined Agent Impact (finale) ---------------------------------------

export function computeImpact(frictionScore: number, readinessScore: number) {
  const impactRaw = Math.round(frictionScore * 0.5 + readinessScore * 0.5);
  let band = 'Promising agent fit';
  if (impactRaw >= 68) band = 'Exceptional agent fit';
  else if (impactRaw >= 44) band = 'Strong agent fit';
  return { impactRaw, band };
}
