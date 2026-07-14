'use client';

/* Mission-control hub. Frames the journey ("How much will agents help your
   business?"), tracks progress across the three tools, and routes into each.
   The finale ("Agent Impact") unlocks once all three are complete. */

import type { CSSProperties } from 'react';
import { aliasVars, Arrow } from './shared';

export interface HubModuleView {
  id: string;
  num: string;
  title: string;
  desc: string;
  done: boolean;
  disabled: boolean;
  recommended: boolean;
  insight: string;
  badgeLabel: string;
  cta: string;
  onClick?: () => void;
}

interface HubProps {
  doneCount: number;
  jPct: number;
  jLevel: string;
  modules: HubModuleView[];
  showBanner: boolean;
  bannerText: string;
  allDone: boolean;
  finaleHeadline: string;
  finaleSub: string;
  finaleBtnLabel: string;
  onFinale?: () => void;
}

const CheckCircle = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9FD3CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
    <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
  </svg>
);

export function Hub({ doneCount, jPct, jLevel, modules, showBanner, bannerText, allDone, finaleHeadline, finaleSub, finaleBtnLabel, onFinale }: HubProps) {
  // Glow intensifies as the journey fills, then locks into a gentle pulse at 3/3.
  const glow = 12 + doneCount * 12; // px blur
  const finaleCardStyle: CSSProperties = allDone
    ? { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22, marginTop: 26, padding: '26px 30px', borderRadius: 18, border: '1px solid rgba(106,176,171,.5)', background: 'linear-gradient(180deg,rgba(0,84,95,.3),rgba(255,255,255,.02))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.08),0 0 34px rgba(0,84,95,.32)', animation: 'thGlowPulse 3.2s ease-in-out infinite' }
    : { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22, marginTop: 26, padding: '26px 30px', borderRadius: 18, border: '1px solid rgba(106,176,171,' + (0.14 + doneCount * 0.12) + ')', background: 'linear-gradient(180deg,rgba(0,84,95,' + (0.06 + doneCount * 0.05) + '),rgba(255,255,255,.015))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.05),0 0 ' + glow + 'px rgba(0,84,95,' + (0.12 + doneCount * 0.08) + ')', transition: 'box-shadow .5s ease, border-color .5s ease, background .5s ease' };

  const finaleBtnStyle: CSSProperties = allDone
    ? { display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', color: 'var(--text-0)', font: '600 15px var(--font-body)', cursor: 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12),0 0 18px rgba(0,84,95,.35)', whiteSpace: 'nowrap' }
    : { display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)', color: 'var(--text-4)', font: '600 15px var(--font-body)', cursor: 'not-allowed', whiteSpace: 'nowrap' };

  return (
    <div style={aliasVars}>
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: 'clamp(96px,13vh,140px) clamp(20px,5vw,40px) 90px' }}>
        {showBanner && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(106,176,171,.4)', background: 'rgba(0,84,95,.22)', animation: 'thRise .45s cubic-bezier(.22,1,.36,1) both' }}>
            <span style={{ display: 'inline-flex', animation: 'thPop .5s cubic-bezier(.22,1,.36,1) both' }}><CheckCircle /></span>
            <span style={{ fontSize: 14, color: 'var(--text-1)' }}>{bannerText}</span>
          </div>
        )}

        <div style={{ maxWidth: 780 }}>
          <p className="mkt-eyebrow" style={{ marginBottom: 22 }}>Agent-Ready Assessment · Interactive</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.3rem,5.2vw,3.9rem)', lineHeight: 1.02, letterSpacing: '-.025em', color: 'var(--text-0)', margin: 0 }}>How much will agents help your business?</h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.18rem)', lineHeight: 1.55, color: 'var(--text-2)', margin: '22px 0 0', maxWidth: 620 }}>Three short diagnostics, done in any order. Each one builds on the last, and together they add up to one clear answer, with your recommended first agent and the time it could give back.</p>
        </div>

        {/* progress tracker */}
        <div style={{ marginTop: 'clamp(30px,4vw,44px)', padding: '22px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, marginBottom: 14 }}>
            <span style={{ font: '600 14px var(--font-body)', color: 'var(--text-1)' }}>{doneCount} of 3 complete</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#9FD3CE' }}>{jPct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 4, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#0c3a40,#6AB0AB)', width: jPct + '%', transition: 'width .5s ease' }} />
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-3)', letterSpacing: '.01em' }}>{jLevel}</div>
        </div>

        {/* module cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, marginTop: 22 }}>
          {modules.map((m) => {
            const highlight = m.recommended && !m.done;
            const cardStyle: CSSProperties = {
              textAlign: 'left', display: 'flex', flexDirection: 'column', minHeight: 264, padding: 28, borderRadius: 16,
              cursor: m.disabled ? 'default' : 'pointer',
              border: '1px solid ' + (m.done ? 'rgba(106,176,171,.5)' : highlight ? 'rgba(106,176,171,.45)' : 'rgba(255,255,255,.1)'),
              background: m.done ? 'linear-gradient(180deg,rgba(0,84,95,.22),rgba(255,255,255,.02))' : 'linear-gradient(180deg,rgba(0,84,95,.1),rgba(255,255,255,.02))',
              boxShadow: highlight
                ? 'inset 0 1px 0 rgba(255,255,255,.06),0 8px 30px rgba(0,0,0,.35),0 0 22px rgba(0,84,95,.28)'
                : 'inset 0 1px 0 rgba(255,255,255,.06),0 8px 30px rgba(0,0,0,.35)',
              opacity: m.disabled ? 0.55 : 1,
            };
            const badgeStyle: CSSProperties = {
              display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 11px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
              border: '1px solid ' + (m.done ? 'rgba(106,176,171,.5)' : 'rgba(255,255,255,.14)'),
              background: m.done ? 'rgba(0,84,95,.35)' : 'rgba(255,255,255,.03)',
              color: m.done ? '#9FD3CE' : 'var(--text-3)',
            };
            return (
              <button key={m.id} onClick={m.onClick} disabled={m.disabled} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1, color: m.done ? 'rgba(159,211,206,.9)' : 'rgba(159,211,206,.45)' }}>{m.num}</span>
                  <span style={badgeStyle}>{m.badgeLabel}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.3rem', letterSpacing: '-.01em', color: 'var(--text-0)', margin: '26px 0 0' }}>{m.title}</h2>
                <p style={{ fontSize: '.94rem', lineHeight: 1.5, color: 'var(--text-3)', margin: '11px 0 0' }}>{m.desc}</p>
                {m.done && m.insight && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '8px 12px', borderRadius: 9, border: '1px solid rgba(106,176,171,.32)', background: 'rgba(0,84,95,.2)', font: '500 12.5px var(--font-body)', color: '#BFE4DF', animation: 'thPop .5s cubic-bezier(.22,1,.36,1) both' }}>
                    <CheckCircle size={14} />{m.insight}
                  </div>
                )}
                {!m.disabled && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 20, font: '500 14px var(--font-body)', color: 'var(--text-0)' }}>
                    {m.cta}<Arrow />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* finale unlock — a teased dial that fills with progress, locked until 3/3 */}
        <div style={finaleCardStyle}>
          <div style={{ position: 'relative', width: 68, height: 68, flex: '0 0 auto', filter: allDone ? 'none' : 'blur(1px)', opacity: allDone ? 1 : 0.7 }}>
            <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
              <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6" />
              <circle cx="34" cy="34" r="28" fill="none" stroke="#7FC4BE" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - doneCount / 3)}
                style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {allDone ? (
                <CheckCircle size={22} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              )}
            </div>
          </div>
          <div style={{ minWidth: 0, flex: '1 1 260px' }}>
            <div className="mkt-eyebrow" style={{ marginBottom: 8, color: '#9FD3CE' }}>The finale</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.4vw,1.7rem)', letterSpacing: '-.02em', color: 'var(--text-0)' }}>{finaleHeadline}</div>
            <div style={{ fontSize: '.95rem', color: 'var(--text-2)', marginTop: 6 }}>{finaleSub}</div>
          </div>
          <button onClick={allDone ? onFinale : undefined} disabled={!allDone} style={finaleBtnStyle}>{finaleBtnLabel}<Arrow /></button>
        </div>
      </main>
    </div>
  );
}
