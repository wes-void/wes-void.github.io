'use client';

/* Journey state for the Agent Impact experience.
 *
 * One state machine drives the hub and every tool module. The persistent slice
 * (which tools are complete, the shared snapshot + tool stack, friction answers,
 * and whether the visitor has already passed the capture gate) is mirrored to
 * localStorage so the journey survives reloads and can be resumed in any order.
 *
 * PII (name / email) is deliberately NOT persisted — only the `captured` flag,
 * so a returning visitor skips the gate without their email living in
 * localStorage. The lead itself is stored server-side at capture time.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export type ModuleId = 'friction' | 'readiness' | 'firstloop';

export type Screen =
  | 'hub'
  | 'assess'
  | 'processing'
  | 'capture'
  | 'results'
  | 'arAssess'
  | 'arProc'
  | 'arResults'
  | 'blueprint'
  | 'bpProc'
  | 'bpResults'
  | 'finale';

const STORAGE_KEY = 'th_journey_v1';

export interface JourneyState {
  screen: Screen;
  // friction assess
  step: number;
  companySize: string;
  revenue: string;
  industry: string;
  tools: Record<string, boolean>;
  answers: (number | null)[];
  // readiness
  arAnswers: Record<string, number>;
  arStage: number;
  // first loop designer
  bpStep: number;
  bpGoal: string;
  bpSystems: Record<string, boolean>;
  bpOutcomes: Record<string, boolean>;
  bpStage: number;
  // transient
  procStage: number;
  anim: number;
  // journey
  completed: Record<string, boolean>;
  captured: boolean;
  justDone: string;
  // capture gate routing: where to land once results are unlocked
  pendingResults: Screen | '';
  // lead (in-memory only, not persisted) — used to prefill the demo handoff
  lead: { name: string; email: string; website: string } | null;
}

const initialState: JourneyState = {
  screen: 'hub',
  step: 0,
  companySize: '',
  revenue: '',
  industry: '',
  tools: {},
  answers: [null, null, null, null],
  arAnswers: {},
  arStage: 0,
  bpStep: 0,
  bpGoal: '',
  bpSystems: {},
  bpOutcomes: {},
  bpStage: 0,
  procStage: 0,
  anim: 1,
  completed: {},
  captured: false,
  justDone: '',
  pendingResults: '',
  lead: null,
};

// Only these keys are mirrored to localStorage.
type PersistShape = Pick<
  JourneyState,
  'completed' | 'captured' | 'companySize' | 'revenue' | 'industry' | 'tools' | 'answers' | 'arAnswers' | 'bpGoal' | 'bpSystems' | 'bpOutcomes'
>;

export function useJourney() {
  const [state, setState] = useState<JourneyState>(initialState);
  const procTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrame = useRef<number | null>(null);
  // Mirror of `captured` so processing-complete can branch without a stale closure.
  const capturedRef = useRef(false);

  const patch = useCallback((p: Partial<JourneyState>) => setState((s) => ({ ...s, ...p })), []);

  // Snap to the top of the embed when this journey is mounted inside the
  // portfolio's `.assessment-live` frame, so advancing a step doesn't yank the
  // reader up to the top of the whole case-study page. Falls back to the top of
  // the window when rendered standalone.
  const top = useCallback(() => {
    try {
      const host = document.querySelector('.assessment-live') as HTMLElement | null;
      if (host) {
        const y = host.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, y - 12), behavior: 'auto' });
      } else {
        window.scrollTo(0, 0);
      }
    } catch { /* noop */ }
  }, []);

  // Hydrate from localStorage on mount; always land on the hub.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<PersistShape>;
        if (saved && typeof saved === 'object') {
          setState((s) => ({
            ...s,
            completed: saved.completed ?? {},
            captured: !!saved.captured,
            companySize: saved.companySize ?? '',
            revenue: saved.revenue ?? '',
            industry: saved.industry ?? '',
            tools: saved.tools ?? {},
            answers: Array.isArray(saved.answers) ? saved.answers : [null, null, null, null],
            arAnswers: saved.arAnswers ?? {},
            bpGoal: saved.bpGoal ?? '',
            bpSystems: saved.bpSystems ?? {},
            bpOutcomes: saved.bpOutcomes ?? {},
            screen: 'hub',
            justDone: '',
          }));
          capturedRef.current = !!saved.captured;
        }
      }
    } catch { /* storage unavailable — start fresh */ }
  }, []);

  const persist = useCallback((s: JourneyState) => {
    try {
      const slice: PersistShape = {
        completed: s.completed,
        captured: s.captured,
        companySize: s.companySize,
        revenue: s.revenue,
        industry: s.industry,
        tools: s.tools,
        answers: s.answers,
        arAnswers: s.arAnswers,
        bpGoal: s.bpGoal,
        bpSystems: s.bpSystems,
        bpOutcomes: s.bpOutcomes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slice));
    } catch { /* ignore */ }
  }, []);

  const clearTimers = useCallback(() => {
    if (procTimer.current) clearInterval(procTimer.current);
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const go = useCallback((screen: Screen) => {
    clearTimers();
    patch({ screen, justDone: '' });
    top();
  }, [clearTimers, patch, top]);

  // count-up animation on results reveal
  const animate = useCallback(() => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
    setState((s) => ({ ...s, anim: 0 }));
    const start = performance.now();
    const dur = 1150;
    const tick = (now: number) => {
      let p = Math.min(1, (now - start) / dur);
      p = 1 - Math.pow(1 - p, 3);
      setState((s) => ({ ...s, anim: p }));
      if (p < 1) animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
  }, []);

  // Reveal a module's results, marking it complete + persisting.
  const revealResults = useCallback((tool: ModuleId, resultsScreen: Screen) => {
    setState((s) => {
      const next = {
        ...s,
        screen: resultsScreen,
        completed: { ...s.completed, [tool]: true },
        justDone: tool,
        pendingResults: '' as const,
      };
      persist(next);
      return next;
    });
    top();
    animate();
  }, [persist, animate, top]);

  // Called when a module finishes processing. Journey-level gate: the first
  // module to reach results shows the capture card; afterwards results are free.
  const finishProcessing = useCallback((tool: ModuleId, resultsScreen: Screen) => {
    revealResults(tool, resultsScreen);
  }, [revealResults]);

  // After a successful capture submit.
  const onCaptured = useCallback((lead: { name: string; email: string; website: string }, tool: ModuleId) => {
    capturedRef.current = true;
    setState((s) => {
      const resultsScreen = (s.pendingResults || 'results') as Screen;
      const next = {
        ...s,
        captured: true,
        lead,
        screen: resultsScreen,
        completed: { ...s.completed, [tool]: true },
        justDone: tool,
        pendingResults: '' as const,
      };
      persist(next);
      return next;
    });
    top();
    animate();
  }, [persist, animate, top]);

  const resetAll = useCallback(() => {
    clearTimers();
    capturedRef.current = false;
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setState({ ...initialState });
    top();
  }, [clearTimers, top]);

  return { state, setState, patch, go, top, clearTimers, procTimer, animate, finishProcessing, revealResults, onCaptured, resetAll };
}
