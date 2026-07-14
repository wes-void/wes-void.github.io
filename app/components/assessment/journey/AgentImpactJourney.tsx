'use client';

/* Agent Impact journey — the /assessment experience. A single screen-state
   machine drives the mission-control hub and each tool module. PR1 ships the
   hub + Operational Friction Score (module 01); Agentic Readiness and the First
   Loop Designer arrive in later PRs and appear here as locked hub cards. */

import { useEffect, useMemo } from 'react';
import { computeFriction, computeReadiness, computeFirstLoop, computeImpact, fmtMoney, goalIdForCap, FRICTION_DIMENSION_GOAL } from '../../../lib/assessment';
import { useJourney } from './useJourney';
import type { Screen } from './useJourney';
import { Hub } from './Hub';
import type { HubModuleView } from './Hub';
import { FrictionModule } from './FrictionModule';
import { ReadinessModule } from './ReadinessModule';
import { FirstLoopModule } from './FirstLoopModule';
import { Finale } from './Finale';
import { Processing, aliasVars } from './shared';

const FRICTION_PROC_STEPS = [
  'Mapping your tool stack',
  'Tracing how information moves',
  'Scoring friction across four dimensions',
  'Modeling time and cost impact',
];

const READINESS_PROC_STEPS = [
  'Scoring your knowledge layer',
  'Scoring your visibility layer',
  'Scoring your execution layer',
];

const FIRSTLOOP_PROC_STEPS = [
  'Reading your selected systems',
  'Mapping your company context, read-only',
  'Assembling your loop',
  'Adding the human review step',
];

const J_LEVELS = [
  'Start anywhere below.',
  'Momentum building. 2 steps to go.',
  'One step from your Agent Impact.',
  'Journey complete. Reveal your Agent Impact below.',
];

const BANNER_MAP: Record<string, string> = {
  friction: 'Operational Friction unlocked.',
  readiness: 'Agentic Readiness unlocked.',
  firstloop: 'Your first agent is mapped.',
};

export function AgentImpactJourney() {
  const j = useJourney();
  const { state, patch, go, clearTimers, procTimer, finishProcessing, resetAll } = j;

  const model = useMemo(
    () => computeFriction(state.tools, state.answers, state.companySize),
    [state.tools, state.answers, state.companySize],
  );
  const rModel = useMemo(() => computeReadiness(state.arAnswers), [state.arAnswers]);
  const flModel = useMemo(
    () => computeFirstLoop(state.bpGoal, state.bpSystems, state.bpOutcomes),
    [state.bpGoal, state.bpSystems, state.bpOutcomes],
  );
  const impact = useMemo(() => computeImpact(model.score, rModel.score), [model.score, rModel.score]);

  // Friction processing sequence → capture gate or results.
  useEffect(() => {
    if (state.screen !== 'processing') return;
    patch({ procStage: 0 });
    let st = 0;
    procTimer.current = setInterval(() => {
      st += 1;
      if (st > 3) {
        if (procTimer.current) clearInterval(procTimer.current);
        finishProcessing('friction', 'results');
        return;
      }
      patch({ procStage: st });
    }, 680);
    return () => { if (procTimer.current) clearInterval(procTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen]);

  // Readiness processing sequence → capture gate or results.
  useEffect(() => {
    if (state.screen !== 'arProc') return;
    patch({ arStage: 0 });
    let st = 0;
    procTimer.current = setInterval(() => {
      st += 1;
      if (st > 2) {
        if (procTimer.current) clearInterval(procTimer.current);
        finishProcessing('readiness', 'arResults');
        return;
      }
      patch({ arStage: st });
    }, 720);
    return () => { if (procTimer.current) clearInterval(procTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen]);

  // First Loop assembly sequence → capture gate or blueprint results.
  useEffect(() => {
    if (state.screen !== 'bpProc') return;
    patch({ bpStage: 0 });
    let st = 0;
    procTimer.current = setInterval(() => {
      st += 1;
      if (st > 3) {
        if (procTimer.current) clearInterval(procTimer.current);
        finishProcessing('firstloop', 'bpResults');
        return;
      }
      patch({ bpStage: st });
    }, 720);
    return () => { if (procTimer.current) clearInterval(procTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.screen]);

  const next = () => {
    if (state.step < 2) { patch({ step: state.step + 1 }); j.top(); }
    else { patch({ screen: 'processing', anim: 0 }); j.top(); }
  };
  const back = () => {
    if (state.step > 0) { patch({ step: state.step - 1 }); j.top(); }
    else go('hub');
  };
  const startFriction = () => { clearTimers(); patch({ screen: 'assess', step: 0, justDone: '' }); j.top(); };
  const reviewFriction = () => { clearTimers(); patch({ screen: 'results', anim: 1, justDone: '' }); j.top(); };
  const restart = () => { clearTimers(); patch({ screen: 'assess', step: 0, anim: 1 }); j.top(); };
  const finishModule = () => { clearTimers(); patch({ screen: 'hub' }); j.top(); };

  const startReadiness = () => { clearTimers(); patch({ screen: 'arAssess', justDone: '' }); j.top(); };
  const arRun = () => { patch({ screen: 'arProc', anim: 0 }); j.top(); };
  const reviewReadiness = () => { clearTimers(); patch({ screen: 'arResults', anim: 1, justDone: '' }); j.top(); };
  const arRestart = () => { clearTimers(); patch({ screen: 'arAssess', anim: 1 }); j.top(); };

  const startBlueprint = () => {
    clearTimers();
    // Reuse the friction tool stack as the loop's systems, unless the visitor
    // has already picked systems here. This is the shared "fill once" behavior.
    const hasSystems = Object.values(state.bpSystems).some(Boolean);
    const c = state.completed || {};
    // Open on the loop the earlier tools recommended, if the visitor hasn't
    // already chosen a goal here.
    const recGoal = c.readiness ? goalIdForCap(rModel.recCap)
      : c.friction ? (FRICTION_DIMENSION_GOAL[model.topDimension] || '')
        : '';
    patch({
      screen: 'blueprint', bpStep: 0, justDone: '',
      bpGoal: state.bpGoal || recGoal,
      bpSystems: hasSystems ? state.bpSystems : { ...state.tools },
    });
    j.top();
  };
  const bpNext = () => {
    if (state.bpStep < 2) { patch({ bpStep: state.bpStep + 1 }); j.top(); }
    else { patch({ screen: 'bpProc', anim: 0 }); j.top(); }
  };
  const bpBack = () => {
    if (state.bpStep > 0) { patch({ bpStep: state.bpStep - 1 }); j.top(); }
    else go('hub');
  };
  const reviewFirstLoop = () => { clearTimers(); patch({ screen: 'bpResults', anim: 1, justDone: '' }); j.top(); };
  const bpRestart = () => { clearTimers(); patch({ screen: 'blueprint', bpStep: 0, anim: 1 }); j.top(); };
  const goFinale = () => {
    clearTimers();
    patch({ screen: 'finale', justDone: '' });
    j.top();
    j.animate();
  };
  const sendImpactCopy = async (): Promise<boolean> => false;
  const reviewFromFinale = (screen: Screen) => { clearTimers(); patch({ screen, anim: 1, justDone: '' }); j.top(); };

  // ---- derived journey values ----
  const completed = state.completed || {};
  const doneCount = ['friction', 'readiness', 'firstloop'].filter((k) => completed[k]).length;
  const allDone = doneCount === 3;
  const jPct = Math.round((doneCount / 3) * 100);

  // Directed forward path: the next incomplete tool, or the finale once all done.
  const ORDER: Array<'friction' | 'readiness' | 'firstloop'> = ['friction', 'readiness', 'firstloop'];
  const START: Record<string, () => void> = { friction: startFriction, readiness: startReadiness, firstloop: startBlueprint };
  const NEXT_LABEL: Record<string, string> = { friction: 'Operational Friction Score', readiness: 'Agentic Readiness', firstloop: 'First Agent Opportunity' };
  const firstIncomplete = ORDER.find((k) => !completed[k]) || '';
  const nextCta = firstIncomplete
    ? { label: NEXT_LABEL[firstIncomplete], onClick: START[firstIncomplete], isFinale: false }
    : { label: 'Reveal your Agent Impact', onClick: goFinale, isFinale: true };

  // Partial-progress detection, so a started-but-unfinished tool reads "Resume".
  const frictionInProgress = !completed.friction && (!!state.industry || !!state.companySize || !!state.revenue || Object.values(state.tools).some(Boolean) || state.answers.some((a) => a !== null));
  const readinessInProgress = !completed.readiness && Object.keys(state.arAnswers).length > 0;
  const firstloopInProgress = !completed.firstloop && (!!state.bpGoal || Object.values(state.bpSystems).some(Boolean) || Object.values(state.bpOutcomes).some(Boolean));
  const inProgressMap: Record<string, boolean> = { friction: frictionInProgress, readiness: readinessInProgress, firstloop: firstloopInProgress };

  const ctaFor = (id: string, done: boolean) =>
    done ? 'Review results'
      : inProgressMap[id] ? 'Resume'
        : id === firstIncomplete ? (doneCount === 0 ? 'Start here' : 'Continue here')
          : 'Begin';
  const badgeFor = (id: string, done: boolean) =>
    done ? 'Complete' : inProgressMap[id] ? 'In progress' : 'Not started';

  const modules: HubModuleView[] = [
    {
      id: 'friction', num: '01', title: 'Operational Friction Score',
      desc: 'How much time your team loses to scattered information, disconnected tools, and manual follow-up.',
      done: !!completed.friction, disabled: false, recommended: firstIncomplete === 'friction',
      insight: completed.friction ? `${model.score}/100 · ${fmtMoney(model.opportunity)}/yr to recover` : '',
      badgeLabel: badgeFor('friction', !!completed.friction),
      cta: ctaFor('friction', !!completed.friction),
      onClick: completed.friction ? reviewFriction : startFriction,
    },
    {
      id: 'readiness', num: '02', title: 'Agentic Readiness Assessment',
      desc: 'Whether AI could actually execute work across your systems, or only ever hand back answers.',
      done: !!completed.readiness, disabled: false, recommended: firstIncomplete === 'readiness',
      insight: completed.readiness ? `${rModel.score}% ready · ${rModel.band}` : '',
      badgeLabel: badgeFor('readiness', !!completed.readiness),
      cta: ctaFor('readiness', !!completed.readiness),
      onClick: completed.readiness ? reviewReadiness : startReadiness,
    },
    {
      id: 'firstloop', num: '03', title: 'First Agent Opportunity',
      desc: 'Turn one repetitive workflow into your first agent, on a Business Brain with human review.',
      done: !!completed.firstloop, disabled: false, recommended: firstIncomplete === 'firstloop',
      insight: completed.firstloop ? flModel.cap : '',
      badgeLabel: badgeFor('firstloop', !!completed.firstloop),
      cta: ctaFor('firstloop', !!completed.firstloop),
      onClick: completed.firstloop ? reviewFirstLoop : startBlueprint,
    },
  ];

  // First Loop interconnection: which goal the earlier tools recommend, and the
  // source to name in the note. Readiness takes precedence over friction.
  const recommendedGoalId = completed.readiness ? goalIdForCap(rModel.recCap)
    : completed.friction ? (FRICTION_DIMENSION_GOAL[model.topDimension] || '')
      : '';
  const recommendedSource = completed.readiness ? 'Readiness' : completed.friction ? 'Friction' : '';
  const carriedSystemsCount = Object.values(state.tools).filter(Boolean).length;

  const showBanner = state.screen === 'hub' && !!state.justDone && !!completed[state.justDone];
  const bannerText = `${BANNER_MAP[state.justDone] || ''}  ${doneCount} of 3 complete. ${allDone ? 'Your Agent Impact is ready below.' : 'Keep the momentum going.'}`;

  const ambientWash = (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(900px 600px at 12% -5%, rgba(0,84,95,.28), transparent 60%), radial-gradient(700px 500px at 100% 110%, rgba(0,84,95,.16), transparent 55%)' }} />
  );

  let screenEl: React.ReactNode;
  if (state.screen === 'hub') {
    screenEl = (
      <Hub
        doneCount={doneCount} jPct={jPct} jLevel={J_LEVELS[doneCount]} modules={modules}
        showBanner={showBanner} bannerText={bannerText} allDone={allDone}
        finaleHeadline={allDone ? 'Your Agent Impact is ready' : 'Reveal your Agent Impact'}
        finaleSub={allDone ? 'The combined answer to how much agents will help your business.' : `${3 - doneCount} of 3 steps left to unlock your combined result.`}
        finaleBtnLabel={allDone ? 'Reveal my Agent Impact' : `${doneCount} / 3 complete`}
        onFinale={goFinale}
      />
    );
  } else if (state.screen === 'processing') {
    screenEl = <Processing heading="Reading your operations" steps={FRICTION_PROC_STEPS} stage={state.procStage} />;
  } else if (state.screen === 'arProc') {
    screenEl = <Processing heading="Scoring your readiness" steps={READINESS_PROC_STEPS} stage={state.arStage} />;
  } else if (state.screen === 'bpProc') {
    screenEl = <Processing heading="Assembling your loop" steps={FIRSTLOOP_PROC_STEPS} stage={state.bpStage} />;
  } else if (state.screen === 'arAssess' || state.screen === 'arResults') {
    screenEl = (
      <ReadinessModule
        state={state} patch={patch} model={rModel} nextCta={nextCta}
        onRun={arRun} onBack={() => go('hub')} onRestart={arRestart} onFinishModule={finishModule}
      />
    );
  } else if (state.screen === 'blueprint' || state.screen === 'bpResults') {
    screenEl = (
      <FirstLoopModule
        state={state} patch={patch} model={flModel} nextCta={nextCta}
        recommendedGoalId={recommendedGoalId} recommendedSource={recommendedSource} carriedSystemsCount={carriedSystemsCount}
        onNext={bpNext} onBack={bpBack} onRestart={bpRestart} onFinishModule={finishModule}
      />
    );
  } else if (state.screen === 'finale') {
    screenEl = (
      <Finale
        friction={model} readiness={rModel} firstLoop={flModel} impact={impact}
        anim={state.anim} lead={state.lead} industry={state.industry} companySize={state.companySize}
        autoSentTo={undefined} onSendCopy={sendImpactCopy}
        onReview={reviewFromFinale} onBack={finishModule}
      />
    );
  } else {
    // 'assess' | 'results'
    screenEl = (
      <FrictionModule
        state={state} patch={patch} model={model} nextCta={nextCta}
        onNext={next} onBack={back} onRestart={restart} onFinishModule={finishModule}
      />
    );
  }

  return (
    <div style={{ position: 'relative', ...aliasVars }}>
      {ambientWash}
      <div style={{ position: 'relative', zIndex: 1 }}>{screenEl}</div>
      {/* reset control — quietly available for repeat visitors */}
      {state.screen === 'hub' && doneCount > 0 && (
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px,5vw,40px) 60px', textAlign: 'center' }}>
          <button onClick={resetAll} style={{ background: 'none', border: 'none', color: 'var(--color-text-4)', font: '500 13px var(--font-body)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>Start over</button>
        </div>
      )}
    </div>
  );
}
