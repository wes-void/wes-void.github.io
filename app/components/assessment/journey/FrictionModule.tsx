'use client';

/* Operational Friction Score — the journey's module 01. Assess (snapshot →
   tool stack → friction) and results. Ported from the standalone OFS component;
   the email capture now lives at the journey level, so this module no longer
   owns it. Scoring and copy are unchanged. */

import type { CSSProperties } from 'react';
import { INDUSTRIES, COMPANY_SIZES, REVENUE_BANDS } from '../../../lib/qualification';
import { SCALE, FRICTION_QS, EMP, fmtInt, fmtMoney, visibleToolGroups, applyToolToggle, effectiveSelectedIds, FRICTION_DIMENSION_GOAL } from '../../../lib/assessment';
import type { FrictionModel } from '../../../lib/assessment';
import type { JourneyState } from './useJourney';
import { aliasVars, choiceStyle, pillStyle, dotStyle, Arrow, BackArrow, DIAL_C, MiniGauge, ResultsNav, HubBackLink, LibraryLoopLinks } from './shared';
import type { NextCta } from './shared';

const SIZES = COMPANY_SIZES.map((o) => o.label);
const REV = REVENUE_BANDS.map((o) => o.label);
const INDS = INDUSTRIES.map((o) => o.label);

const SOURCES = [
  { name: 'Microsoft Work Trend Index, 2025', href: 'https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday', note: 'Employees are interrupted every two minutes (275 times a day) by meetings, emails, and chats; nearly half say work already feels chaotic and fragmented.' },
  { name: 'Slite Enterprise Search Report, 2025', href: 'https://slite.com/learn/enterprise-search-survey-findings', note: 'Knowledge workers lose about 3.2 hours every week re-finding information that already exists, close to a full working month each year.' },
  { name: 'APQC Workforce Productivity, 2024', href: 'https://www.apqc.org/about-apqc/news-press-release/apqc-survey-finds-one-quarter-knowledge-workers-time-lost-due', note: 'Around a quarter of knowledge workers’ time is lost to productivity drains: duplicated effort, hunting for answers, and status-only meetings.' },
];

interface FrictionModuleProps {
  state: JourneyState;
  patch: (p: Partial<JourneyState>) => void;
  model: FrictionModel;
  nextCta: NextCta;
  onNext: () => void;
  onBack: () => void;
  onRestart: () => void;
  onFinishModule: () => void;
}

export function FrictionModule({ state, patch, model, nextCta, onNext, onBack, onRestart, onFinishModule }: FrictionModuleProps) {
  const { screen, step, tools, answers, industry, companySize, revenue, anim } = state;
  const toolCount = effectiveSelectedIds(tools).length;

  /* ---------- RESULTS ---------- */
  if (screen === 'results') {
    const dialStyle: CSSProperties = {
      strokeDasharray: DIAL_C.toFixed(1),
      strokeDashoffset: (DIAL_C * (1 - (model.score / 100) * anim)).toFixed(1),
    };
    return (
      <div style={aliasVars}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 90px' }}>
          <p className="mkt-eyebrow" style={{ marginBottom: 18 }}>Your results</p>

          {/* dial + cost stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(24px,4vw,44px)', alignItems: 'center', padding: 'clamp(24px,4vw,40px)', borderRadius: 18, border: '1px solid rgba(255,255,255,.09)', background: 'linear-gradient(180deg, rgba(0,84,95,.12), rgba(255,255,255,.02))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.07), 0 12px 40px rgba(0,0,0,.4)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flex: '0 0 auto', margin: '0 auto' }}>
              <div style={{ position: 'relative', width: 208, height: 208 }}>
                <svg width="208" height="208" viewBox="0 0 208 208" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="104" cy="104" r="86" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="15" />
                  <circle cx="104" cy="104" r="86" fill="none" stroke="#7FC4BE" strokeWidth="15" strokeLinecap="round" style={dialStyle} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3.6rem', lineHeight: 1, color: 'var(--text-0)' }}>{Math.round(model.score * anim)}</div>
                  <div style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-4)', marginTop: 2 }}>out of 100</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.15rem', letterSpacing: '.01em', color: model.bandColor }}>{model.band}</div>
            </div>
            <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
                <div style={{ padding: 18, borderRadius: 13, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
                  <p className="mkt-eyebrow" style={{ marginBottom: 10 }}>Hours lost / month</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', lineHeight: 1, color: 'var(--text-0)' }}>{fmtInt(model.totalHours * anim)}</div>
                </div>
                <div style={{ padding: 18, borderRadius: 13, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
                  <p className="mkt-eyebrow" style={{ marginBottom: 10 }}>Estimated annual cost</p>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', lineHeight: 1, color: 'var(--text-0)' }}>{fmtMoney(model.annualCost * anim)}</div>
                </div>
              </div>
              <div style={{ padding: '18px 20px', borderRadius: 13, border: '1px solid rgba(106,176,171,.3)', background: 'rgba(0,84,95,.18)' }}>
                <p className="mkt-eyebrow" style={{ marginBottom: 8, color: '#9FD3CE' }}>Opportunity unlocked</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', lineHeight: 1, color: '#BFE4DF' }}>{fmtMoney(model.opportunity * anim)}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>recoverable per year</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6AB0AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto' }}>
              <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
            </svg>
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Calculated live from your inputs, grounded in 2025 research from Microsoft, Slite &amp; APQC (see methodology below).</span>
          </div>

          {/* dimensions */}
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '42px 0 4px' }}>Friction by dimension</h3>
          <p style={{ fontSize: '.9rem', color: 'var(--text-3)', margin: '0 0 24px' }}>Higher means more drag in that part of the business.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {model.cats.map((c) => (
              <div key={c.name}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 9 }}>
                  <span style={{ fontSize: '.98rem', color: 'var(--text-1)', fontWeight: 500 }}>{c.name}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--text-0)' }}>{Math.round(c.v * anim)}</span>
                </div>
                <div style={{ height: 9, borderRadius: 6, background: 'rgba(255,255,255,.06)', overflow: 'hidden' }}>
                  <div style={{ width: (c.v * anim).toFixed(1) + '%', height: '100%', borderRadius: 6, background: 'linear-gradient(90deg,#0c3a40,#6AB0AB)' }} />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 8 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* diagnostic */}
          <div style={{ marginTop: 38, padding: '26px 28px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
            <p className="mkt-eyebrow" style={{ marginBottom: 12 }}>What this means</p>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.4, color: 'var(--text-1)', margin: 0 }}>{model.diagnostic}</p>
          </div>

          {/* recommended first loop */}
          <div style={{ marginTop: 20, padding: '26px 28px', borderRadius: 16, border: '1px solid rgba(106,176,171,.3)', background: 'linear-gradient(180deg,rgba(0,84,95,.18),rgba(255,255,255,.02))' }}>
            <p className="mkt-eyebrow" style={{ marginBottom: 10, color: '#9FD3CE' }}>Where to start</p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'var(--text-0)', margin: '0 0 8px', fontWeight: 500 }}>{model.firstLoop}</p>
            <p style={{ fontSize: '.92rem', lineHeight: 1.5, color: 'var(--text-2)', margin: 0 }}>Threshold turns one workflow like this into a practical agent, with a human reviewing before anything important happens. Your first consultation is free.</p>
          </div>

          {/* related library loops */}
          <LibraryLoopLinks goalId={FRICTION_DIMENSION_GOAL[model.topDimension] ?? ''} industry={state.industry} />

          {/* CTA */}
          <ResultsNav
            nextCta={nextCta}
            onBackToHub={onFinishModule}
            redoLabel="Recalculate"
            onRedo={onRestart}
            extra={
              /* inert in the portfolio build — booking isn't wired here */
              <span
                aria-disabled
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#9FD3CE', font: '500 14px var(--font-body)', textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'default' }}
              >
                Book a Free Consultation
              </span>
            }
          />

          {/* methodology */}
          <div style={{ marginTop: 52, paddingTop: 38, borderTop: '1px solid rgba(255,255,255,.08)' }}>
            <p className="mkt-eyebrow" style={{ marginBottom: 22 }}>Methodology &amp; sources</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(28px,5vw,56px)' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-0)', margin: '0 0 18px' }}>How your score becomes a number</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    'Your answers feed a 0–100 friction index: three-quarters from how work flows, one-quarter from how fragmented your tool stack is.',
                    'That index scales recoverable time, capped at 16 hours per person each month, deliberately conservative next to the ~3.2 hours a week (close to a full month a year) workers now lose just re-finding information.',
                    'Hours are costed at a fully-loaded $58/hour (≈$120k all-in), then we size opportunity at ~60% of that lost time: the share leaders consider realistically recoverable with better-connected systems.',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'rgba(159,211,206,.55)', flex: '0 0 auto', width: 20 }}>0{i + 1}</span>
                      <p style={{ fontSize: '.95rem', lineHeight: 1.55, color: 'var(--text-2)', margin: 0 }}>{t}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-4)', margin: '22px 0 0' }}>Estimates are directional, built for executive planning, not an audit. Adjust the inputs to pressure-test the range.</p>
              </div>
              <div>
                <p className="mkt-eyebrow" style={{ marginBottom: 16 }}>Grounded in 2024–2025 research</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {SOURCES.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '16px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.025)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--text-0)' }}>{s.name}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-3)', flex: '0 0 auto' }}>
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--text-3)', margin: 0 }}>{s.note}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- ASSESS (3 steps) ---------- */
  const rail = [
    { num: '01', label: 'Snapshot' },
    { num: '02', label: 'Tool stack' },
    { num: '03', label: 'Friction' },
  ];
  const toggleTool = (id: string) => patch({ tools: applyToolToggle(tools, id) });
  const setAnswer = (qi: number, i: number) => patch({ answers: answers.map((x, xi) => (xi === qi ? i : x)) });

  return (
    <div style={aliasVars}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(104px,13vh,128px) clamp(20px,5vw,40px) 80px' }}>
        <HubBackLink onClick={onFinishModule} />
        {/* step rail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 34 }}>
          {rail.map((r, i) => {
            const on = i <= step, cur = i === step;
            return (
              <div key={r.num} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 11px var(--font-body)', border: '1px solid ' + (on ? 'rgba(106,176,171,.5)' : 'rgba(255,255,255,.12)'), background: cur ? 'rgba(0,84,95,.4)' : 'transparent', color: on ? '#9FD3CE' : 'var(--text-3)' }}>{r.num}</span>
                <span style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: cur ? 'var(--text-0)' : 'var(--text-3)' }}>{r.label}</span>
              </div>
            );
          })}
        </div>
        <div style={{ height: 3, borderRadius: 3, background: 'rgba(255,255,255,.06)', overflow: 'hidden', marginBottom: 40 }}>
          <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#0c3a40,#6AB0AB)', width: ((step + 1) / 3 * 100) + '%' }} />
        </div>

        {/* STEP 1 — snapshot */}
        {step === 0 && (
          <div>
            <p className="mkt-eyebrow" style={{ marginBottom: 14 }}>Operational Friction Score</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>Company snapshot</h2>
            <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: '0 0 32px' }}>A few quick questions about your team, tools, and workflows. We&rsquo;ll turn them into a live friction score, what it&rsquo;s costing you, and where your first agent could help.</p>

            <div style={{ marginBottom: 28 }}>
              <p className="mkt-eyebrow" style={{ marginBottom: 12 }}>Industry</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {INDS.map((v) => (<button key={v} style={choiceStyle(industry === v)} onClick={() => patch({ industry: v })}>{v}</button>))}
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                <p className="mkt-eyebrow" style={{ margin: 0 }}>Company size</p>
                <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{companySize ? 'Modeling ' + (EMP[companySize] || 40) + ' people' : ''}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {SIZES.map((v) => (<button key={v} style={choiceStyle(companySize === v)} onClick={() => patch({ companySize: v })}>{v}</button>))}
              </div>
            </div>
            <div>
              <p className="mkt-eyebrow" style={{ marginBottom: 12 }}>Annual revenue</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {REV.map((v) => (<button key={v} style={choiceStyle(revenue === v)} onClick={() => patch({ revenue: v })}>{v}</button>))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — tool stack */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>Your tool stack</h2>
            <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: '0 0 12px' }}>Select the systems your team works in. The more places information lives, the more it has to be moved by hand.</p>
            <p style={{ fontSize: 13, color: '#9FD3CE', margin: '0 0 24px' }}>{toolCount} selected</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {visibleToolGroups(industry, tools).map((g) => (
                <div key={g.id}>
                  <p className="mkt-eyebrow" style={{ marginBottom: 11 }}>{g.label}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {g.items.map((t) => {
                      const sel = !!tools[t.id];
                      return (
                        <button key={t.id} style={pillStyle(sel)} onClick={() => toggleTool(t.id)}>
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

        {/* STEP 3 — friction */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: '1 1 300px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.1rem)', letterSpacing: '-.02em', color: 'var(--text-0)', margin: '0 0 8px' }}>How work actually flows</h2>
                <p style={{ fontSize: '.97rem', color: 'var(--text-2)', margin: 0 }}>Be honest. This is where the score really comes from.</p>
              </div>
              {/* live friction score — climbs as you answer */}
              <div style={{ flex: '0 0 auto', padding: '10px 14px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(0,84,95,.12)' }}>
                <MiniGauge value={model.score} label="Live friction score" size={78} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 34 }}>
              {FRICTION_QS.map((q, qi) => {
                const val = answers[qi];
                const answered = val !== null && val !== undefined;
                return (
                  <div key={q.key}>
                    <div style={{ fontSize: '1.02rem', color: 'var(--text-1)', lineHeight: 1.4, marginBottom: 14 }}>{q.label}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[0, 1, 2, 3, 4].map((i) => {
                        const filled = answered && i <= (val as number);
                        return (
                          <button key={i} aria-label={SCALE[i]} onClick={() => setAnswer(qi, i)}
                            style={{ flex: 1, height: 42, border: 'none', borderRadius: 8, cursor: 'pointer', background: filled ? 'linear-gradient(180deg,#1f6168,#0c3a40)' : 'rgba(255,255,255,.09)', boxShadow: filled ? 'inset 0 1px 0 rgba(255,255,255,.18)' : 'inset 0 0 0 1px rgba(255,255,255,.18)' }} />
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}>
                      <span style={{ fontSize: 11.5, color: 'var(--text-4)' }}>Rarely</span>
                      <span style={{ fontSize: 12.5, color: '#9FD3CE', fontWeight: 500 }}>{answered ? SCALE[val as number] : ''}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--text-4)' }}>Constantly</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 44, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 10, border: '1px solid rgba(255,255,255,.1)', background: 'transparent', color: 'var(--text-2)', font: '500 14px var(--font-body)', cursor: 'pointer' }}>
            <BackArrow />{step === 0 ? 'All experiences' : 'Back'}
          </button>
          <button onClick={onNext} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 26px', borderRadius: 10, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', color: 'var(--text-0)', font: '600 14px var(--font-body)', cursor: 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12), 0 0 16px rgba(0,84,95,.28)' }}>
            {step === 2 ? 'Calculate score' : 'Continue'}<Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
