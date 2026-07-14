'use client';

/* Shared visual language for the Agent Impact journey. Style helpers and small
   presentational pieces reused across the hub and all three tool modules.
   Fonts/text use the site's brand tokens; tool-specific teal accents use the
   design's literal hexes, matching Ro's "Threshold Experiences" handoff. */

import type { CSSProperties } from 'react';
import { loopsForGoal, getAgency, AGENCY_META } from '../loops-data';

/* Maps the design's short --text-* aliases onto the site's brand tokens so the
   ported inline styles read exactly as in the handoff. Spread onto a wrapper. */
export const aliasVars = {
  ['--text-0' as string]: 'var(--color-text-0)',
  ['--text-1' as string]: 'var(--color-text-1)',
  ['--text-2' as string]: 'var(--color-text-2)',
  ['--text-3' as string]: 'var(--color-text-3)',
  ['--text-4' as string]: 'var(--color-text-4)',
} as CSSProperties;

export const DIAL_R = 86;
export const DIAL_C = 2 * Math.PI * DIAL_R;

/* Selectable pill (multi-select, with a dot indicator) — tool stack, outcomes.
   A subtle lift + brighter ring on select gives selections a tactile "pop". */
export const pillStyle = (sel: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 9,
  padding: '9px 15px',
  borderRadius: 9999,
  cursor: 'pointer',
  font: '500 13.5px var(--font-body)',
  whiteSpace: 'nowrap',
  border: '1px solid ' + (sel ? 'rgba(106,176,171,.55)' : 'rgba(255,255,255,.1)'),
  background: sel ? 'rgba(0,84,95,.28)' : 'rgba(255,255,255,.025)',
  color: sel ? 'var(--text-0)' : 'var(--text-2)',
  transition: 'transform .14s ease, background .14s ease, border-color .14s ease, box-shadow .14s ease',
  transform: sel ? 'translateY(-1px)' : 'none',
  boxShadow: sel ? '0 4px 14px rgba(0,84,95,.28)' : 'none',
});

export const dotStyle = (sel: boolean): CSSProperties => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  flex: '0 0 auto',
  background: sel ? '#7FC4BE' : 'transparent',
  boxShadow: sel ? '0 0 6px rgba(127,196,190,.6)' : 'inset 0 0 0 1.5px rgba(255,255,255,.22)',
});

/* Single-select choice chip — snapshot fields (industry/size/revenue). */
export const choiceStyle = (sel: boolean): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '11px 18px',
  borderRadius: 10,
  font: '500 14px/1 var(--font-body)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  border: '1px solid ' + (sel ? 'rgba(106,176,171,.55)' : 'rgba(255,255,255,.1)'),
  background: sel ? 'rgba(0,84,95,.28)' : 'rgba(255,255,255,.025)',
  color: sel ? 'var(--text-0)' : 'var(--text-2)',
  transition: 'transform .14s ease, background .14s ease, border-color .14s ease, box-shadow .14s ease',
  transform: sel ? 'translateY(-1px)' : 'none',
  boxShadow: sel ? '0 4px 14px rgba(0,84,95,.28)' : 'none',
});

export const primaryBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '15px 28px',
  borderRadius: 11,
  border: '1px solid rgba(255,255,255,.2)',
  background: 'rgba(255,255,255,.1)',
  color: 'var(--text-0)',
  font: '600 15px var(--font-body)',
  cursor: 'pointer',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 0 18px rgba(0,84,95,.3)',
};

export const ghostBtn: CSSProperties = {
  padding: '15px 26px',
  borderRadius: 11,
  border: '1px solid rgba(255,255,255,.14)',
  background: 'transparent',
  color: 'var(--text-1)',
  font: '500 15px var(--font-body)',
  cursor: 'pointer',
};

/* Directed forward action shared by every results screen: the next incomplete
   tool, or the finale once all are done. */
export interface NextCta {
  label: string;
  onClick: () => void;
  isFinale: boolean;
}

const textLink: CSSProperties = {
  background: 'none', border: 'none', color: 'var(--text-3)',
  font: '500 14px var(--font-body)', cursor: 'pointer',
  textDecoration: 'underline', textUnderlineOffset: 3,
};

/* Results footer nav: directed primary ("Next: …" / "Reveal your Agent Impact"),
   a quiet return to the hub, a redo link, and optional extra actions. */
export function ResultsNav({ nextCta, onBackToHub, redoLabel, onRedo, extra }: {
  nextCta: NextCta;
  onBackToHub: () => void;
  redoLabel: string;
  onRedo: () => void;
  extra?: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 34 }}>
      <button onClick={nextCta.onClick} style={primaryBtn}>{nextCta.isFinale ? nextCta.label : `Next: ${nextCta.label}`} <Arrow /></button>
      <button onClick={onBackToHub} style={ghostBtn}>All experiences</button>
      <button onClick={onRedo} style={textLink}>{redoLabel}</button>
      {extra}
    </div>
  );
}

/* Persistent "back to the hub/dashboard" link, placed at the top of every
   in-tool screen so the visitor can leave a tool from any step (progress
   persists and the hub shows it as resumable). */
export function HubBackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 24, padding: '7px 14px 7px 11px', borderRadius: 9, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)', color: 'var(--text-2)', font: '500 13px var(--font-body)', cursor: 'pointer', transition: 'color .15s ease, border-color .15s ease' }}
    >
      <BackArrow /> All experiences
    </button>
  );
}

export function Arrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BackArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

/* Links from a tool result into the real loops library. Given a First Loop
   Designer goal id, it surfaces the concrete library loops that exemplify it,
   so every recommendation across the journey points at a real, browsable loop.
   Renders nothing when the goal has no mapped loops (e.g. the custom goal). */
export function LibraryLoopLinks({ goalId, industry, heading = 'Explore these loops in the library' }: { goalId: string; industry?: string; heading?: string }) {
  const loops = loopsForGoal(goalId, { industry });
  if (!loops.length) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <p className="mkt-eyebrow" style={{ marginBottom: 12 }}>{heading}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
        {loops.map((loop) => {
          const level = getAgency(loop.slug);
          const agentic = level === 'agentic';
          return (
            /* non-interactive in the portfolio build — the real loops library
               isn't part of this site, so these are display-only cards */
            <div
              key={loop.slug}
              style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '15px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,.09)', background: 'rgba(255,255,255,.025)' }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase', color: agentic ? '#9FD3CE' : 'var(--text-3)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', flex: '0 0 auto', background: agentic ? '#6AB0AB' : 'rgba(255,255,255,.28)' }} />
                {AGENCY_META[level].label}
              </span>
              <span style={{ font: '600 .98rem var(--font-body)', color: 'var(--text-0)' }}>{loop.name}</span>
              <span style={{ fontSize: '.83rem', lineHeight: 1.4, color: 'var(--text-3)' }}>{loop.tagline}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Compact live gauge — a small ring that fills to `value` (0-100) as the
   visitor answers, giving each input immediate feedback. `suffix` renders after
   the number (e.g. "%"); `accent` colors the number for readiness. */
export function MiniGauge({ value, label, suffix = '', size = 92, accent }: { value: number; label: string; suffix?: string; size?: number; accent?: string }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  const cx = size / 2;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="#7FC4BE" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={c.toFixed(1)} strokeDashoffset={(c * (1 - v / 100)).toFixed(1)}
            style={{ transition: 'stroke-dashoffset .5s cubic-bezier(.22,1,.36,1)' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: size >= 92 ? '1.5rem' : '1.2rem', color: accent || 'var(--text-0)' }}>{Math.round(v)}{suffix}</span>
        </div>
      </div>
      <span style={{ fontSize: 12, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--text-3)', maxWidth: 96, lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

/* Shared processing screen — orbiting theta + a checklist that fills in.
   Reused by every tool's "reading / assembling / scoring" transition. */
export function Processing({ heading, steps, stage }: { heading: string; steps: string[]; stage: number }) {
  return (
    <div style={aliasVars}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(140px,20vh,200px) clamp(20px,5vw,40px) clamp(60px,12vh,140px)', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-12%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,84,95,.5), transparent 70%)' }} />
          <svg className="animate-spin" width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="3" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#7FC4BE" strokeWidth="3" strokeLinecap="round" strokeDasharray="70 270" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/theta-light.svg" alt="" className="animate-pulse" style={{ position: 'relative', width: 52 }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 38px' }}>{heading}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left', maxWidth: 360, margin: '0 auto' }}>
          {steps.map((label, i) => {
            const done = i < stage, active = i === stage;
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 4px', opacity: done || active ? 1 : 0.4 }}>
                <span style={{ flex: '0 0 auto', width: 9, height: 9, borderRadius: '50%', background: done ? '#6AB0AB' : active ? 'transparent' : 'rgba(255,255,255,.18)', border: active ? '2px solid #6AB0AB' : 'none', boxShadow: active ? '0 0 10px rgba(106,176,171,.7)' : 'none' }} />
                <span style={{ fontSize: 14.5, color: done || active ? 'var(--text-1)' : 'var(--text-3)' }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
