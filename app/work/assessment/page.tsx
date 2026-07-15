import type { Metadata } from 'next'
import Link from 'next/link'
import { AgentImpactJourney } from '../../components/assessment/journey/AgentImpactJourney'

export const metadata: Metadata = {
  title: 'Assessment journey | Wes Norris',
  description:
    'A three-part interactive assessment that qualifies leads by being genuinely useful: friction mapping, readiness scoring, and a first-loop simulation. Play the real thing.',
}

export default function Assessment() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>An assessment that earns the conversation</h1>
      <p className="lede">
        “Book a demo” asks for trust before offering value. The Threshold
        assessment inverts that: a three-part interactive journey that gives a
        prospect a real diagnosis of their operation, and gives Threshold a
        qualified, self-selected lead. This is the real thing, running here,
        with the lead-capture gate removed so you can play it end to end.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Product design, interaction design, build</dd>
        </div>
        <div>
          <dt>Shape</dt>
          <dd>Three tools plus a synthesis finale</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js, TypeScript, Supabase</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>In production, shipped with tests</dd>
        </div>
      </dl>

      <div className="assessment-live">
        <div className="assessment-live-chrome" aria-hidden>
          <span className="pageframe-dot" />
          <span className="pageframe-dot" />
          <span className="pageframe-dot" />
          <span className="pageframe-url">threshhold.com/assessment</span>
        </div>
        <AgentImpactJourney />
      </div>
      <p className="assessment-live-hint">
        Live and interactive · pick any tool to begin
      </p>

      <section>
        <h2>Three tools, one journey</h2>
        <p>
          <strong>Friction</strong> maps where a team’s time actually goes and
          where work snags. <strong>Readiness</strong> scores how prepared the
          organization is to hand work to AI agents. <strong>First Loop</strong>{' '}
          simulates what an initial engagement would look like for their
          specific situation. A finale stitches the three into a single
          takeaway the prospect can keep, useful even if they never buy.
        </p>
      </section>

      <section>
        <h2>Interaction design as qualification</h2>
        <p>
          Every input doubles as a signal: the answers that shape the
          prospect’s results also tell the sales conversation where to start.
          The design problem was keeping that honest. The tools had to be
          worth using for their own sake, or the whole premise collapses into
          a lead form wearing a costume. In production, the first set of
          results sits behind a light capture gate; that gate is lifted in this
          portfolio build.
        </p>
      </section>

      <section>
        <h2>Shipped like product, not campaign</h2>
        <p>
          The journey shipped with the same discipline as the product: tested,
          reviewed, and merged in small scoped steps, because it lives inside
          the product codebase and writes to the same database the business
          runs on. Marketing surfaces deserve production discipline. They’re
          the first product a customer ever touches.
        </p>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/threshold-os">Threshold OS</Link>
        </p>
      </nav>
    </main>
  )
}
