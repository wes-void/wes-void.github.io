'use client';

/* Agentic Readiness Assessment — the journey's module 02. Assess (three
   weighted layers scored No / Partly / Yes) and results (overall readiness dial,
   per-layer bars, biggest unlock, recommended first loop). Ported from Ro's
   "Threshold Experiences" handoff; scoring lives in lib/assessment. */

import type { CSSProperties } from 'react';
import { READINESS_LAYERS, READINESS_OPTS, goalIdForCap } from '../../../lib/assessment';
import type { ReadinessModel } from '../../../lib/assessment';
import type { JourneyState } from './useJourney';
import { aliasVars, Arrow, BackArrow, DIAL_C, MiniGauge, ResultsNav, HubBackLink, LibraryLoopLinks } from './shared';
import type { NextCta } from './shared';

const READINESS_ITEM_COUNT = READINESS_LAYERS.reduce((n, L) => n + L.items.length, 0);

interface ReadinessModuleProps {
  state: JourneyState;
  patch: (p: Partial<JourneyState>) => void;
  model: ReadinessModel;
  nextCta: NextCta;
  onRun: () => void;
  onBack: () => void;
  onRestart: () => void;
  onFinishModule: () => void;
}

const segStyle = (sel: boolean): CSSProperties => ({
  flex: 1,
  padding: '10px 8px',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  font: '500 13px var(--font-body)',
  background: sel ? 'rgba(0,84,95,.32)' : 'rgba(255,255,255,.04)',
  color: sel ? 'var(--text-0)' : 'var(--text-3)',
  boxShadow: sel ? 'inset 0 0 0 1px rgba(106,176,171,.5)' : 'none',
});

export function ReadinessModule({ state, patch, model, nextCta, onRun, onBack, onRestart, onFinishModule }: ReadinessModuleProps) {
  const { screen, arAnswers, anim } = state;

  /* ---------- RESULTS ---------- */
  if (screen === 'arResults') {
    const dialStyle: CSSProperties = {
      strokeDasharray: DIAL_C.toFixed(1),
      strokeDashoffset: (DIAL_C * (1 - (model.score / 100) * anim)).toFixed(1),
    };
    return (
      <div style={aliasVars}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 90px' }}>
          <p className="mkt-eyebrow" style={{ marginBottom: 18 }}>Your agentic readiness</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,44px)', alignItems: 'center', padding: 'clamp(24px,4vw,40px)', borderRadius: 18, border: '1px solid rgba(255,255,255,.09)', background: 'linear-gradient(180deg, rgba(0,84,95,.12), rgba(255,255,255,.02))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07), 0 12px 40px rgba(0,0,0,.4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flex: '0 0 auto', margin: '0 auto' }}>
              <div style={{ position: 'relative', width: 208, height: 208 }}>
                <svg width="208" height="208" viewBox="0 0 208 208" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="104" cy="104" r="86" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="15" />
                  <circle cx="104" cy="104" r="86" fill="none" stroke="#7FC4BE" strokeWidth="15" strokeLinecap="round" style={dialStyle} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3.4rem', lineHeight: 1, color: 'var(--text-0)' }}>{Math.round(model.score * anim)}<span style={{ fontSize: '1.4rem' }}>%</span></div>
                  <div style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-4)', marginTop: 2 }}>Readiness</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.15rem', color: '#9FD3CE' }}>{model.band}</div>
            </div>

            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {model.layers.map((L) => (
                <div key={L.id}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: '.98rem', color: 'var(--text-1)', fontWeight: 500 }}>{L.label}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-0)' }}>{Math.round(L.pct * anim)}%</span>
                  </div>
                  <div style={{ height: 9, borderRadius: 6, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                    <div style={{ width: (L.pct * anim).toFixed(1) + '%', height: '100%', borderRadius: 6, background: 'linear-gradient(90deg,#0c3a40,#6AB0AB)' }} />
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-4)', marginTop: 6 }}>{Math.round(L.weight * 100)}% of score</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 26, padding: '22px 26px', borderRadius: 14, border: '1px solid rgba(106,176,171,.32)', background: 'linear-gradient(180deg,rgba(0,84,95,.2),rgba(255,255,255,.02))', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 18px' }}>
            <span style={{ fontSize: '1.02rem', color: 'var(--text-1)' }}>You are at <strong style={{ color: 'var(--text-0)', fontWeight: 600 }}>{Math.round(model.score * anim)}%</strong> today.</span>
            <span style={{ fontSize: '1.02rem', color: 'var(--text-1)' }}>With an Agentic Core in place, teams like yours reach <strong style={{ color: '#BFE4DF', fontWeight: 600 }}>≈ {Math.round(model.projected * anim)}%</strong>.</span>
          </div>

          <div style={{ marginTop: 20, padding: '26px 28px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
            <p className="mkt-eyebrow" style={{ marginBottom: 12 }}>Your biggest unlock · {model.lowestLabel}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.4, color: 'var(--text-1)', margin: 0 }}>{model.constraint}</p>
          </div>

          <div style={{ marginTop: 20, padding: '26px 28px', borderRadius: 16, border: '1px solid rgba(106,176,171,.3)', background: 'linear-gradient(180deg,rgba(0,84,95,.18),rgba(255,255,255,.02))' }}>
            <p className="mkt-eyebrow" style={{ marginBottom: 10, color: '#9FD3CE' }}>Recommended first loop</p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.6vw,1.9rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>{model.recCap}</h3>
            <p style={{ fontSize: '.97rem', lineHeight: 1.5, color: 'var(--text-2)', margin: 0, maxWidth: 560 }}>{model.recWhy}</p>
          </div>

          <LibraryLoopLinks goalId={goalIdForCap(model.recCap)} industry={state.industry} />

          <ResultsNav nextCta={nextCta} onBackToHub={onFinishModule} redoLabel="Reassess" onRedo={onRestart} />
        </div>
      </div>
    );
  }

  /* ---------- ASSESS ---------- */
  const setAns = (itemId: string, v: number) => patch({ arAnswers: { ...arAnswers, [itemId]: v } });
  const answeredCount = READINESS_LAYERS.reduce(
    (n, L) => n + L.items.filter((it) => arAnswers[it.id] !== undefined).length,
    0,
  );

  return (
    <div style={aliasVars}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 80px' }}>
        <HubBackLink onClick={onFinishModule} />
        <p className="mkt-eyebrow" style={{ marginBottom: 14 }}>Agentic Readiness</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', lineHeight: 1.04, letterSpacing: '-.025em', color: 'var(--text-0)', margin: '0 0 14px' }}>Is your business ready for AI to actually do work?</h2>
        <p style={{ fontSize: '1.02rem', lineHeight: 1.55, color: 'var(--text-2)', margin: '0 0 28px', maxWidth: 600 }}>Most organizations can generate answers with AI. Far fewer can execute work across their systems, yet. Answer honestly to see where you stand today, and how far a foundation would take you.</p>

        {/* live readiness meter — fills as you answer */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '14px 18px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(0,84,95,.12)', marginBottom: 24 }}>
          <MiniGauge value={model.score} label="Live readiness" suffix="%" size={78} accent="#9FD3CE" />
          <span style={{ fontSize: 13, color: 'var(--text-3)' }}>{answeredCount} of {READINESS_ITEM_COUNT} answered</span>
        </div>

        {READINESS_LAYERS.map((L) => {
          const pct = model.layers.find((x) => x.id === L.id)?.pct ?? 0;
          return (
            <div key={L.id} style={{ padding: 'clamp(20px,3vw,26px)', borderRadius: 16, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--text-0)', margin: 0 }}>{L.label}</h3>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#9FD3CE' }}>{pct}<span style={{ fontSize: '.85rem', color: 'var(--text-3)' }}>%</span></span>
              </div>
              <p style={{ fontSize: '.9rem', color: 'var(--text-3)', margin: '6px 0 16px' }}>{L.lead}</p>
              <div>
                {L.items.map((it) => {
                  const ans = arAnswers[it.id];
                  return (
                    <div key={it.id} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                      <span style={{ fontSize: '.96rem', color: 'var(--text-1)', flex: '1 1 200px' }}>{it.text}</span>
                      <div style={{ display: 'flex', gap: 6, flex: '0 0 auto', width: 228, maxWidth: '100%' }}>
                        {READINESS_OPTS.map((o) => (
                          <button key={o.label} style={segStyle(ans === o.v)} onClick={() => setAns(it.id, o.v)}>{o.label}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 34 }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)', background: 'transparent', color: 'var(--text-2)', font: '500 14px var(--font-body)', cursor: 'pointer' }}>
            <BackArrow />All experiences
          </button>
          <button onClick={onRun} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '14px 28px', borderRadius: 11, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', color: 'var(--text-0)', font: '600 15px var(--font-body)', cursor: 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 0 18px rgba(0,84,95,.3)' }}>
            See my readiness <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
