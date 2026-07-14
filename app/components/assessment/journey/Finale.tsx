'use client';

/* The finale — combined Agent Impact. Unlocks once all three diagnostics are
   complete; folds friction + readiness + first loop into one headline answer,
   a scannable three-card recap, and the recommended free first loop. */

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { fmtInt, fmtMoney } from '../../../lib/assessment';
import type { FrictionModel, ReadinessModel, FirstLoopModel } from '../../../lib/assessment';
import type { Screen } from './useJourney';
import { aliasVars, primaryBtn, Arrow, DIAL_C } from './shared';
import { writeDemoPrefill } from '../../../lib/demo-prefill';

interface FinaleProps {
  friction: FrictionModel;
  readiness: ReadinessModel;
  firstLoop: FirstLoopModel;
  impact: { impactRaw: number; band: string };
  anim: number;
  lead: { name: string; email: string; website: string } | null;
  industry: string;
  companySize: string;
  // The email a copy was already auto-sent to this session (empty if we don't
  // have the visitor's email in memory and should offer to email it).
  autoSentTo?: string;
  onSendCopy: (email: string) => Promise<boolean>;
  onReview: (screen: Screen) => void;
  onBack: () => void;
}

export function Finale({ friction, readiness, firstLoop, impact, anim, lead, industry, companySize, onReview, onBack }: FinaleProps) {
  // Snapshot (collected in Friction, always done by the finale) personalizes the
  // headline context.
  const persona = [companySize && `${companySize}-person`, industry && industry.toLowerCase()].filter(Boolean).join(' ');
  const dialStyle: CSSProperties = {
    strokeDasharray: DIAL_C.toFixed(1),
    strokeDashoffset: (DIAL_C * (1 - (impact.impactRaw / 100) * anim)).toFixed(1),
  };

  const cards = [
    { k: 'Operational friction', big: `${friction.score}/100`, bigDisplay: true, sub: `${fmtMoney(friction.opportunity)}/yr recoverable · ${fmtInt(friction.totalHours)} hrs/mo lost today`, screen: 'results' as Screen },
    { k: 'Agentic readiness', big: `${readiness.score}%`, bigDisplay: true, sub: `${readiness.band} now · reaches ~${readiness.projected}% with an Agentic Core`, screen: 'arResults' as Screen },
    { k: 'Your first agent', big: firstLoop.cap, bigDisplay: false, sub: `${firstLoop.hours} hrs/mo saved · human review built in`, screen: 'bpResults' as Screen },
  ];

  return (
    <div style={aliasVars}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 90px' }}>
        <p className="mkt-eyebrow" style={{ marginBottom: 18 }}>Your Agent Impact</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,48px)', alignItems: 'center', padding: 'clamp(26px,4vw,44px)', borderRadius: 20, border: '1px solid rgba(106,176,171,.32)', background: 'linear-gradient(180deg,rgba(0,84,95,.2),rgba(255,255,255,.02))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08),0 16px 50px rgba(0,0,0,.45)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flex: '0 0 auto', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: 208, height: 208 }}>
              <svg width="208" height="208" viewBox="0 0 208 208" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="104" cy="104" r="86" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="15" />
                <circle cx="104" cy="104" r="86" fill="none" stroke="#7FC4BE" strokeWidth="15" strokeLinecap="round" style={dialStyle} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3.6rem', lineHeight: 1, color: 'var(--text-0)' }}>{Math.round(impact.impactRaw * anim)}</div>
                <div style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-4)', marginTop: 2 }}>Impact index</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.15rem', color: '#9FD3CE' }}>{impact.band}</div>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            {persona && (
              <p className="mkt-eyebrow" style={{ margin: '0 0 10px', color: '#9FD3CE' }}>For your {persona}</p>
            )}
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', lineHeight: 1.08, letterSpacing: '-.025em', color: 'var(--text-0)', margin: 0 }}>Agents could give your team back about {fmtInt(friction.totalHours * anim)} hours a month.</h1>
            <p style={{ fontSize: 'clamp(1.05rem,2vw,1.22rem)', lineHeight: 1.5, color: 'var(--text-1)', margin: '16px 0 0' }}>That is roughly <strong style={{ color: '#BFE4DF', fontWeight: 600 }}>{fmtMoney(friction.opportunity * anim)} a year</strong> in recoverable capacity, and you are <strong style={{ color: 'var(--text-0)', fontWeight: 600 }}>{Math.round(readiness.score * anim)}% agent-ready</strong> to capture it.</p>
            <p style={{ fontSize: '.98rem', lineHeight: 1.5, color: 'var(--text-2)', margin: '14px 0 0' }}>Your recommended starting point is the <strong style={{ color: 'var(--text-0)', fontWeight: 600 }}>{firstLoop.cap}</strong>.</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6AB0AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
            <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
          </svg>
          <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Combined from all three diagnostics. Time and cost figures are directional estimates, not guaranteed outcomes.</span>
        </div>

        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '44px 0 4px' }}>The full picture</h3>
        <p style={{ fontSize: '.9rem', color: 'var(--text-3)', margin: '0 0 22px' }}>The three diagnostics behind your Agent Impact. Open any one to revisit the detail.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {cards.map((c) => (
            <button key={c.k} onClick={() => onReview(c.screen)} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10, padding: 22, borderRadius: 14, cursor: 'pointer', border: '1px solid rgba(255,255,255,.09)', background: 'rgba(255,255,255,.025)' }}>
              <div className="mkt-eyebrow">{c.k}</div>
              <div style={c.bigDisplay
                ? { fontFamily: 'var(--font-display)', fontSize: '2.1rem', lineHeight: 1, color: 'var(--text-0)' }
                : { fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.2, color: 'var(--text-0)' }}>{c.big}</div>
              <div style={{ fontSize: '.86rem', lineHeight: 1.45, color: 'var(--text-3)' }}>{c.sub}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4, font: '500 13px var(--font-body)', color: '#9FD3CE' }}>Review <Arrow /></span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: '28px 30px', borderRadius: 16, border: '1px solid rgba(106,176,171,.3)', background: 'linear-gradient(180deg,rgba(0,84,95,.2),rgba(255,255,255,.02))' }}>
          <p className="mkt-eyebrow" style={{ marginBottom: 12, color: '#9FD3CE' }}>Where to start · your first consultation is free</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem,2.8vw,2rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 10px' }}>{firstLoop.cap}</h3>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.35rem)', lineHeight: 1.4, color: 'var(--text-1)', margin: 0 }}>When someone asks “{firstLoop.question}”</p>
          <p style={{ fontSize: '.95rem', lineHeight: 1.5, color: 'var(--text-2)', margin: '14px 0 0', maxWidth: 620 }}>Threshold turns one workflow like this into a practical agent on your Agentic Core, with a human reviewing before anything important happens. Every agent after it gets easier to build.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 34 }}>
          <Link href="https://threshhold.com" target="_blank" rel="noreferrer" style={primaryBtn} onClick={() => writeDemoPrefill({ from: 'assessment', name: lead?.name ?? '', email: lead?.email ?? '', website: lead?.website ?? '', score: friction.score, recommendedLoop: firstLoop.cap })}>
            Book a Free Consultation <Arrow />
          </Link>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-3)', font: '500 14px var(--font-body)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>Back to journey</button>
        </div>
      </div>
    </div>
  );
}
