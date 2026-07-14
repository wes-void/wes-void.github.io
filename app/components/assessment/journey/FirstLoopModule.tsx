'use client';

/* First Loop Designer — the journey's module 03. Goal -> Systems -> Outcome,
   then a blueprint of the resulting agentic loop (what it does, how it is built
   on an Agentic Core, time saved, and how Threshold delivers it). Ported from
   Ro's "Threshold Experiences" handoff; scoring lives in lib/assessment. */

import type { CSSProperties } from 'react';
import { FIRST_LOOP_GOALS, FIRST_LOOP_OUTCOMES, fmtInt, visibleToolGroups, applyToolToggle, effectiveSelectedIds } from '../../../lib/assessment';
import type { FirstLoopModel } from '../../../lib/assessment';
import type { JourneyState } from './useJourney';
import { aliasVars, pillStyle, dotStyle, Arrow, BackArrow, ResultsNav, HubBackLink, LibraryLoopLinks } from './shared';
import type { NextCta } from './shared';

interface FirstLoopModuleProps {
  state: JourneyState;
  patch: (p: Partial<JourneyState>) => void;
  model: FirstLoopModel;
  nextCta: NextCta;
  recommendedGoalId: string;
  recommendedSource: string;
  carriedSystemsCount: number;
  onNext: () => void;
  onBack: () => void;
  onRestart: () => void;
  onFinishModule: () => void;
}

/* Small inline note that a value was carried over / recommended from an earlier
   tool — makes the journey's interconnectivity felt, not just silent. */
function CarryNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18, padding: '8px 13px', borderRadius: 9, border: '1px solid rgba(106,176,171,.3)', background: 'rgba(0,84,95,.16)', font: '500 12.5px var(--font-body)', color: '#BFE4DF' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9FD3CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {children}
    </div>
  );
}

const railDefs = ['Goal', 'Systems', 'Outcome'];
const connector = (
  <div style={{ width: 1, height: 24, background: 'linear-gradient(rgba(106,176,171,.55),rgba(106,176,171,.12))', margin: '0 auto' }} />
);

export function FirstLoopModule({ state, patch, model, nextCta, recommendedGoalId, recommendedSource, carriedSystemsCount, onNext, onBack, onRestart, onFinishModule }: FirstLoopModuleProps) {
  const { screen, bpStep, bpGoal, bpSystems, bpOutcomes, anim } = state;

  /* ---------- RESULTS ---------- */
  if (screen === 'bpResults') {
    const roadmap = [
      { phase: '01', when: 'Mapping call', title: 'Map the workflow', body: 'We walk through this workflow with you and agree exactly what the first agent should do.' },
      { phase: '02', when: 'Build', title: 'Build the agent', body: 'We assemble ' + model.cap + ' on your Business Brain, with a human review step where judgment matters.' },
      { phase: '03', when: 'Handoff', title: 'Handoff & 14-day stabilization', body: 'We hand the agent to your team and include a 14-day window for light fixes so it works as scoped.' },
      { phase: '04', when: 'Then', title: 'Expand only if it helps', body: 'Your Business Brain stays yours. If the first agent is useful, the next one is easier to build on top.' },
    ];
    const chip = (accent: boolean): CSSProperties => ({
      display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: 999,
      border: '1px solid ' + (accent ? 'rgba(106,176,171,.3)' : 'rgba(255,255,255,.12)'),
      background: accent ? 'rgba(0,84,95,.16)' : 'rgba(255,255,255,.04)',
      font: '500 12.5px var(--font-body)', color: accent ? '#BFE4DF' : 'var(--text-1)',
    });
    return (
      <div style={aliasVars}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 90px' }}>
          <p className="mkt-eyebrow" style={{ marginBottom: 18 }}>Your first agent</p>

          <div style={{ padding: 'clamp(24px,4vw,40px)', borderRadius: 18, border: '1px solid rgba(106,176,171,.28)', background: 'linear-gradient(180deg,rgba(0,84,95,.16),rgba(255,255,255,.02))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07), 0 12px 40px rgba(0,0,0,.4)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 999, border: '1px solid rgba(106,176,171,.4)', background: 'rgba(0,84,95,.3)', font: '500 11px var(--font-body)', letterSpacing: '.06em', textTransform: 'uppercase', color: '#9FD3CE', marginBottom: 18 }}>Built on your Agentic Core</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem,4vw,3rem)', lineHeight: 1.02, letterSpacing: '-.025em', color: 'var(--text-0)', margin: 0 }}>{model.cap}</h2>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.15rem,2.2vw,1.5rem)', lineHeight: 1.4, color: 'var(--text-1)', margin: '20px 0 0', maxWidth: 640 }}>When someone asks “{model.question}”</p>
          </div>

          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '42px 0 16px' }}>What it does</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {model.behavior.map((b) => (
              <div key={b.n} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'rgba(159,211,206,.55)', flex: '0 0 auto', width: 24 }}>{b.n}</span>
                <span style={{ fontSize: '.98rem', lineHeight: 1.5, color: 'var(--text-1)' }}>{b.text}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '44px 0 4px' }}>How it is built</h3>
          <p style={{ fontSize: '.9rem', color: 'var(--text-3)', margin: '0 0 22px' }}>Your tools stay where they are. The Agentic Core reads approved information; the agent acts within your rules, with a human in review.</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ padding: '18px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,.09)', background: 'rgba(255,255,255,.025)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 11 }}>Your systems</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {model.systems.map((n) => (<span key={n} style={chip(false)}>{n}</span>))}
              </div>
            </div>
            {connector}
            <div style={{ padding: '22px 24px', borderRadius: 14, border: '1px solid rgba(106,176,171,.42)', background: 'rgba(0,84,95,.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 8, color: '#9FD3CE' }}>Agentic Core</p>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-0)' }}>Read-only company context layer</div>
              <div style={{ fontSize: '.9rem', color: 'var(--text-2)', marginTop: 6 }}>Your real working context, rules, and permissions, organized so your team and your agents can use it safely. The Core is yours to keep.</div>
            </div>
            {connector}
            <div style={{ padding: '18px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 8 }}>Your first agent</p>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)' }}>{model.cap}</div>
            </div>
            {connector}
            <div style={{ padding: '18px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,.09)', background: 'rgba(255,255,255,.025)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 11 }}>Outputs &amp; actions</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {model.outputs.map((n) => (<span key={n} style={chip(true)}>{n}</span>))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14, marginTop: 36 }}>
            <div style={{ padding: 20, borderRadius: 13, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 10 }}>Time saved</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.95rem', lineHeight: 1, color: 'var(--text-0)' }}>{fmtInt(model.hours * anim)}<span style={{ fontFamily: 'var(--font-body)', fontSize: '.9rem', color: 'var(--text-3)', marginLeft: 6 }}>hrs / mo</span></div>
            </div>
            <div style={{ padding: 20, borderRadius: 13, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 10 }}>Efficiency gain</p>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.95rem', lineHeight: 1, color: 'var(--text-0)' }}>{Math.round(model.gain * anim)}%</div>
            </div>
          </div>

          <LibraryLoopLinks goalId={model.goalId} industry={state.industry} heading="Agents like this in our library" />

          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '46px 0 4px' }}>How Threshold builds it</h3>
          <p style={{ fontSize: '.9rem', color: 'var(--text-3)', margin: '0 0 22px' }}>One workflow, one agent, human review built in. Your first consultation is free.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {roadmap.map((ph) => (
              <div key={ph.phase} style={{ padding: 20, borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'rgba(159,211,206,.5)' }}>{ph.phase}</span>
                  <span className="mkt-eyebrow">{ph.when}</span>
                </div>
                <div style={{ font: '600 .98rem var(--font-body)', color: 'var(--text-0)', marginBottom: 7 }}>{ph.title}</div>
                <div style={{ fontSize: '.88rem', lineHeight: 1.5, color: 'var(--text-3)' }}>{ph.body}</div>
              </div>
            ))}
          </div>

          <ResultsNav nextCta={nextCta} onBackToHub={onFinishModule} redoLabel="Redesign" onRedo={onRestart} />
        </div>
      </div>
    );
  }

  /* ---------- BLUEPRINT (3 steps) ---------- */
  const toggleSystem = (id: string) => patch({ bpSystems: applyToolToggle(bpSystems, id) });
  const toggleOutcome = (id: string) => patch({ bpOutcomes: { ...bpOutcomes, [id]: !bpOutcomes[id] } });
  const sysCount = effectiveSelectedIds(bpSystems).length;
  const nextDisabled = bpStep === 0 && !bpGoal;

  return (
    <div style={aliasVars}>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 80px' }}>
        <HubBackLink onClick={onFinishModule} />
        {/* step rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 34 }}>
          {railDefs.map((label, i) => {
            const on = i <= bpStep, cur = i === bpStep;
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 11px var(--font-body)', border: '1px solid ' + (on ? 'rgba(106,176,171,.5)' : 'rgba(255,255,255,.12)'), background: cur ? 'rgba(0,84,95,.4)' : 'transparent', color: on ? '#9FD3CE' : 'var(--text-3)' }}>{'0' + (i + 1)}</span>
                <span style={{ fontSize: 13, whiteSpace: 'nowrap', color: cur ? 'var(--text-0)' : 'var(--text-3)' }}>{label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ height: 3, borderRadius: 3, background: 'rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#0c3a40,#6AB0AB)', width: ((bpStep + 1) / 3 * 100) + '%' }} />
        </div>

        {/* STEP 1 — goal */}
        {bpStep === 0 && (
          <div>
            <p className="mkt-eyebrow" style={{ marginBottom: 14 }}>First Agent Opportunity</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>Find your first agent opportunity</h2>
            <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: '0 0 22px', maxWidth: 580 }}>Pick the repetitive workflow you want to run itself. We&rsquo;ll turn your tools into an Agentic Core and build your first agent on top, with a human reviewing before anything important happens.</p>
            {recommendedGoalId && bpGoal === recommendedGoalId && recommendedSource && (
              <CarryNote>Suggested from your {recommendedSource} result. Change it if you like.</CarryNote>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(236px,1fr))', gap: 12 }}>
              {FIRST_LOOP_GOALS.map((g) => {
                const sel = bpGoal === g.id;
                return (
                  <button key={g.id} onClick={() => patch({ bpGoal: g.id })} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 7, padding: 20, borderRadius: 14, cursor: 'pointer', border: '1px solid ' + (sel ? 'rgba(106,176,171,.55)' : 'rgba(255,255,255,.09)'), background: sel ? 'rgba(0,84,95,.22)' : 'rgba(255,255,255,.025)' }}>
                    <span style={{ font: '600 1.02rem var(--font-body)', color: sel ? 'var(--text-0)' : 'var(--text-1)' }}>{g.label}</span>
                    <span style={{ fontSize: '.86rem', lineHeight: 1.45, color: 'var(--text-3)' }}>{g.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 — systems */}
        {bpStep === 1 && (
          <div>
            <p className="mkt-eyebrow" style={{ marginBottom: 14 }}>First Agent Opportunity</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>Which systems hold the context?</h2>
            <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: '0 0 22px', maxWidth: 580 }}>These become your read-only Agentic Core. The agent reads approved information from them. It never changes anything without your authority.</p>
            {carriedSystemsCount > 0 && (
              <CarryNote>Carried over from your Friction answers. Edit anytime.</CarryNote>
            )}
            <p style={{ fontSize: 13, color: '#9FD3CE', margin: '0 0 24px' }}>{sysCount} selected</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {visibleToolGroups(state.industry, bpSystems).map((g) => (
                <div key={g.id}>
                  <p className="mkt-eyebrow" style={{ marginBottom: 11 }}>{g.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {g.items.map((t) => {
                      const sel = !!bpSystems[t.id];
                      return (
                        <button key={t.id} style={pillStyle(sel)} onClick={() => toggleSystem(t.id)}>
                          <span style={dotStyle(sel)} />{t.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — outcome */}
        {bpStep === 2 && (
          <div>
            <p className="mkt-eyebrow" style={{ marginBottom: 14 }}>First Agent Opportunity</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>What should it do?</h2>
            <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: '0 0 28px', maxWidth: 580 }}>Choose the outputs and actions this agent should own. You can change these once it is running.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {FIRST_LOOP_OUTCOMES.map((o) => {
                const sel = !!bpOutcomes[o.id];
                return (
                  <button key={o.id} style={pillStyle(sel)} onClick={() => toggleOutcome(o.id)}>
                    <span style={dotStyle(sel)} />{o.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 44, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)', background: 'transparent', color: 'var(--text-2)', font: '500 14px var(--font-body)', cursor: 'pointer' }}>
            <BackArrow />{bpStep === 0 ? 'All experiences' : 'Back'}
          </button>
          <button onClick={nextDisabled ? undefined : onNext} disabled={nextDisabled} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 10, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', color: 'var(--text-0)', font: '600 14px var(--font-body)', cursor: nextDisabled ? 'not-allowed' : 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 0 16px rgba(0,84,95,.28)', opacity: nextDisabled ? 0.4 : 1 }}>
            {bpStep === 2 ? 'Build my agent' : 'Continue'}<Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
