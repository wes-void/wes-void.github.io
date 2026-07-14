// Handoff from the Operational Friction Score results to the /demo booking flow.
//
// The assessment already captures the visitor as a lead (name, email, website,
// score) via /api/assessment, so when they continue to book a demo we prefill
// the Cal.com booker with their name/email/website instead of making them
// re-enter it. The booking is linked back to that same assessment row by the
// /api/demo-booking webhook, which reconciles by email — so no duplicate lead.
//
// sessionStorage (not a URL param) keeps the email out of the address bar; it
// is written on the results CTA, read once on /demo, then cleared.

export const DEMO_PREFILL_KEY = 'threshold_demo_prefill';

export interface DemoPrefill {
  from: 'assessment';
  name: string;
  email: string;
  website: string;
  score?: number;
  recommendedLoop?: string;
}

export function writeDemoPrefill(p: DemoPrefill): void {
  try {
    sessionStorage.setItem(DEMO_PREFILL_KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — fall back to the normal form flow */
  }
}

export function readDemoPrefill(): DemoPrefill | null {
  try {
    const raw = sessionStorage.getItem(DEMO_PREFILL_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as DemoPrefill;
    return p && typeof p.email === 'string' && p.email.includes('@') ? p : null;
  } catch {
    return null;
  }
}

export function clearDemoPrefill(): void {
  try {
    sessionStorage.removeItem(DEMO_PREFILL_KEY);
  } catch {
    /* ignore */
  }
}
