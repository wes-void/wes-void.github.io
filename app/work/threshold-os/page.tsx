import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Threshold OS | Wes Norris',
  description:
    'Designing and building the client platform for an AI execution firm: design system, client portal, and admin console, shipped to production.',
}

export default function ThresholdOS() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>Threshold OS: the client platform for an AI execution firm</h1>
      <p className="lede">
        Threshold runs AI-powered execution for its clients as a service. The
        platform is the client’s window into that work: what we’re aligned on,
        what’s being pursued right now, what we’ve learned, and what it costs.
        I designed it, and I built it.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Lead Product Designer, first and only designer</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Design system, client portal, admin console</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js, TypeScript, Supabase, PostgreSQL + RLS</dd>
        </div>
        <div>
          <dt>Shipped</dt>
          <dd>Production, in use by paying clients</dd>
        </div>
      </dl>

      <section>
        <h2>Not a SaaS dashboard, a trust surface</h2>
        <p>
          Threshold is done-for-you, not self-serve. Clients don’t operate the
          product; they <strong>read</strong> it. That reframes every design
          decision: the job isn’t task efficiency, it’s confidence. A client
          opening the portal should feel the way they’d feel reading a
          well-prepared board pack: informed, oriented, and never talked down
          to.
        </p>
        <p>
          That led to a five-screen client MVP (Home, Alignment, Current
          Outcome, Learnings, Billing) with runs and operational detail
          deliberately subordinated. The system knows far more than it shows,
          and choosing what <strong>not</strong> to surface was most of the
          design work.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/os-home.jpg" alt="Threshold OS client home" />
          </span>
          <figcaption>Client portal: home</figcaption>
        </figure>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/os-narrative.jpg"
              alt="Outcome detail narrative: why this outcome exists, what must be true to succeed"
            />
          </span>
          <figcaption>
            An outcome reads like a memo: why it exists, what must be true,
            what success looks like
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>A dark, quiet design system</h2>
        <p>
          The visual language is a dark, glass-morphism system built on a
          single CSS file: one spacing scale, skeleton loading states, toast
          notifications, a command palette, and a collapsible sidebar. Premium
          without decoration: the dark void is the luxury.
        </p>
        <p>
          Language is part of the system too. Internal entities never leak into
          client copy: what the team calls a “drive” is an “outcome” to the
          client, enforced by a terminology layer rather than by discipline.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/os-alignment.jpg"
              alt="Alignment screen showing the company-wide alignment chain"
            />
          </span>
          <figcaption>
            Alignment: the chain from company statement to live work
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Designing the model, not just the screens</h2>
        <p>
          The core object model was designed hand-in-hand with the UI: a
          company-wide alignment statement cascades into objectives, drives,
          and runs, with drift detection when the alignment changes underneath
          live work. State machines, review flows, and approval gates were
          product design decisions first and database constraints second.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/os-outcome.jpg"
              alt="Outcome detail with start conditions and the client approval decision"
            />
          </span>
          <figcaption>
            The approval moment: start conditions gate execution until the
            client says go
          </figcaption>
        </figure>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/os-drift.jpg"
              alt="Internal operator dashboard flagging alignment drift for confirmation"
            />
          </span>
          <figcaption>
            The other side of the glass: the operator view flags drift when
            the alignment changes underneath live work
          </figcaption>
        </figure>
      </section>

      <section>
        <h2>Shipped by the designer</h2>
        <p>
          Every screen here went to production through my own pull requests:
          risk-classified, planned before code, tested, and reviewed. That
          includes the unglamorous parts, from database migrations and
          row-level security policies to auth guards and API routes, because a
          design isn’t done until it survives contact with real data and real
          permissions.
        </p>
        <p>
          The result is a tight loop most teams don’t get: the person deciding
          how it should feel is the same person deciding how it’s built, so
          nothing is lost in translation.
        </p>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/threshold-marketing">the marketing site</Link>
        </p>
      </nav>
    </main>
  )
}
