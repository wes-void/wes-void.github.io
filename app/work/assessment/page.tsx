import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Assessment journey | Wes Norris',
  description:
    'A three-part interactive assessment that qualifies leads by being genuinely useful: friction mapping, readiness scoring, and a first-loop simulation.',
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
        qualified, self-selected lead.
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
          <dd>Shipped across 14 pull requests</dd>
        </div>
      </dl>

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
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/assess-hub.jpg" alt="Assessment hub" />
          </span>
          <figcaption>The assessment hub: three tools, one journey</figcaption>
        </figure>
      </section>

      <section>
        <h2>Interaction design as qualification</h2>
        <p>
          Every input doubles as a signal: the answers that shape the
          prospect’s results also tell the sales conversation where to start.
          The design problem was keeping that honest. The tools had to be
          worth using for their own sake, or the whole premise collapses into
          a lead form wearing a costume.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/assess-tool.jpg"
              alt="Assessment tool interaction"
            />
          </span>
          <figcaption>Readiness: scoring interaction</figcaption>
        </figure>
      </section>

      <section>
        <h2>Shipped like product, not campaign</h2>
        <p>
          The journey shipped as fourteen scoped pull requests with tests,
          because it lives inside the product codebase and writes to the same
          database the business runs on. Marketing surfaces deserve production
          discipline. They’re the first product a customer ever touches.
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
