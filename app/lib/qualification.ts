// ============================================================
// Shared qualification schema
//
// Single source of truth for the qualification fields collected by BOTH the
// Operational Friction Score tool and the demo-booking form, so the two cannot
// drift apart. See docs/DEMO_BOOKING_PLAN.md.
//
// Design: each option has a stable `value` (used for storage / matching across
// both tools) and a display `label` (which may contain en dashes). Store `value`
// in the `qualification` JSONB; render `label`.
// ============================================================

export interface Option {
  value: string;
  label: string;
}

// Kept in lockstep with the Operational Friction Score tool's industry list so
// the two entry points collect uniform data.
export const INDUSTRIES: Option[] = [
  { value: "community_nonprofit", label: "Community nonprofit" },
  { value: "professional_services", label: "Professional services" },
  { value: "agency_creative", label: "Agency or creative" },
  { value: "local_home_services", label: "Local or home services" },
  { value: "retail_ecommerce", label: "Retail or e-commerce" },
  { value: "other", label: "Other" },
];

export const COMPANY_SIZES: Option[] = [
  { value: "1-10", label: "1–10" },
  { value: "11-25", label: "11–25" },
  { value: "26-50", label: "26–50" },
  { value: "51-100", label: "51–100" },
  { value: "101-250", label: "101–250" },
];

export const REVENUE_BANDS: Option[] = [
  { value: "lt_1m", label: "<$1M" },
  { value: "1-5m", label: "$1–5M" },
  { value: "5-10m", label: "$5–10M" },
  { value: "10-25m", label: "$10–25M" },
  { value: "25m_plus", label: "$25M+" },
];

// The demo form only needs the integration signal — where the team's work
// lives — not the full tool inventory the OFS tool collects for scoring.
export const ECOSYSTEMS: Option[] = [
  { value: "google", label: "Google Workspace" },
  { value: "microsoft", label: "Microsoft 365" },
  { value: "both", label: "A mix of both" },
  { value: "neither", label: "Neither or not sure" },
];

// Shape stored in contact_submissions.qualification (JSONB).
export interface Qualification {
  industry: string;          // Option.value
  companySize: string;       // Option.value
  revenue?: string;          // Option.value — optional (budget or revenue)
  ecosystem?: string;        // Option.value — Google / Microsoft / both / neither
  frictionScore?: number;    // 0-100, carried from the friction tool (warm path)
  estAnnualCost?: number;    // carried from the friction tool (warm path)
}
