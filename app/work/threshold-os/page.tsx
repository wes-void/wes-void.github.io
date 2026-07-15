import type { Metadata } from 'next'
import Link from 'next/link'
import { ObjectiveAnatomy } from '../../components/ObjectiveAnatomy'
import { SurfaceAccordion } from '../../components/SurfaceAccordion'
import { JourneyGallery } from '../../components/JourneyGallery'

export const metadata: Metadata = {
  title: 'Threshold OS | Wes Norris',
  description:
    'The multi-tenant platform behind an AI execution firm: three role-based surfaces from one codebase, an object model designed as UI and database constraint together, designed and built by one person.',
}

export default function ThresholdOS() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>Threshold OS: the system a done-for-you firm runs on</h1>
      <p className="lede">
        Threshold executes for its clients as a service. Threshold OS is the
        platform that runs it: one codebase serving three role-based audiences
        across many client companies. I designed it and I built it, so the
        product decisions and the database constraints are the same decisions.
        What follows is less a tour of screens than a look at what was built,
        and why.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Lead Product Designer, and the engineer who shipped it</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Design system, three role-based surfaces, onboarding, the object model</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js, TypeScript, Supabase, Postgres + RLS</dd>
        </div>
        <div>
          <dt>Shipped</dt>
          <dd>Production, in use by paying companies</dd>
        </div>
      </dl>

      {/* 1 — the complexity thesis: one product, three audiences, many companies */}
      <section>
        <h2>One product, three audiences, many companies</h2>
        <p>
          This isn’t a single-user, point-and-click app. It’s multi-tenant: a
          company is the unit, and every row in the database is scoped to one.
          On top of that, a single codebase renders three different products
          depending on who is looking, because the firm, its operators, and its
          clients need to see three different things.
        </p>
        <SurfaceAccordion />
        <p>
          Three surfaces, one system. Designing that is a product problem
          (what each role should and shouldn’t see) and an architecture problem
          (how one codebase safely serves all three) at the same time. The rest
          of this study is how those two halves were actually built as one.
        </p>
      </section>

      {/* 2 — the object model */}
      <section>
        <h2>The chain everything hangs on</h2>
        <p>
          The core model is a single chain: a{' '}
          <strong>company-wide alignment</strong> sets direction, an{' '}
          <strong>objective</strong> makes it measurable, a{' '}
          <strong>drive</strong> is the work pursued against it, and a{' '}
          <strong>run</strong> is an atomic execution attempt inside a drive. It
          was designed as a UI concept and a database shape in the same breath.
        </p>
        <div className="chain-diagram" aria-hidden>
          <span className="chain-node">Company-wide Alignment</span>
          <span className="chain-arrow">→</span>
          <span className="chain-node">Objective</span>
          <span className="chain-arrow">→</span>
          <span className="chain-node">Drive</span>
          <span className="chain-arrow">→</span>
          <span className="chain-node">Run</span>
        </div>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/os-alignment.jpg" alt="The alignment screen showing the chain from company statement to live work" />
          </span>
          <figcaption>The chain, as the client reads it: from company statement down to live work</figcaption>
        </figure>
        <p>
          The rule “exactly one active alignment per company” isn’t something
          the app hopes to maintain. It’s a Postgres invariant: a partial unique
          index that the database refuses to violate.
        </p>
        <div className="codeblock">
          <span className="codeblock-file">supabase/migrations/…company_wide_alignment.sql</span>
          <pre><code>{`CREATE UNIQUE INDEX company_wide_alignments_one_active_per_company
    ON company_wide_alignments (company_id)
    WHERE superseded_at IS NULL;`}</code></pre>
          <p className="codeblock-intent">
            One active alignment per company, enforced by the database. Changing
            it goes through an RPC that locks the company row and soft-supersedes
            the old one, so history is never lost and two can never be live at
            once.
          </p>
        </div>
      </section>

      {/* 3 — the interactive centerpiece */}
      <section>
        <h2>An objective is a sentence, not a form</h2>
        <p>
          The hardest surface to design was objective authoring. A stacked form
          of fields (metric, target, unit, deadline…) is easy to build and
          miserable to think in. So an objective is written as a{' '}
          <strong>sentence</strong> the exec fills in like a mad-lib, and that
          same sentence decomposes into typed, queryable columns underneath.
          Legible prose and clean data, from one act of typing.
        </p>
        <p className="obj-anatomy-lead">
          This is the real thing, rebuilt to poke at. Edit any slot.
        </p>
        <ObjectiveAnatomy />
        <p>
          The “serves the alignment” justification is required before an
          objective can leave draft, on purpose: every measurable target has to
          declare how it serves the company direction, or it can’t enter the
          pipeline. Strategy stays legible, and it stays queryable.
        </p>
      </section>

      {/* 4 — the onboarding journey */}
      <section>
        <h2>Onboarding is the product’s first sentence</h2>
        <p>
          A client’s first minutes set the tone for the whole engagement, so
          onboarding got the same weight as the platform: one guided wizard that
          moves from password to signed agreement to saved payment to approving
          the first outcome, without ever feeling like a form. Every page of it
          is below, in order.
        </p>
        <JourneyGallery />
      </section>

      {/* 5 — state machine */}
      <section>
        <h2>Illegal states can’t exist</h2>
        <p>
          Objectives and drives move through lifecycle states, and separately
          carry a review status. The interesting design decision wasn’t the
          states, it was ruling out the <em>combinations</em> that make no
          sense. An objective that’s still a draft, or already closed, can never
          be flagged “needs review” by anything, including a bug, because the
          database refuses to store that pairing.
        </p>
        <div className="codeblock">
          <span className="codeblock-file">supabase/migrations/…objective_client_approval_shape.sql</span>
          <pre><code>{`ALTER TABLE objectives
  ADD CONSTRAINT objectives_review_lifecycle_check CHECK (
    NOT (lifecycle_stage = 'draft'          AND review_status = 'needs_review')
    AND NOT (lifecycle_stage = 'pending_review' AND review_status = 'needs_review')
    AND NOT (lifecycle_stage = 'closed'         AND review_status = 'needs_review')
  );`}</code></pre>
          <p className="codeblock-intent">
            “Needs review” only makes sense for live work. That product rule is a
            cross-column CHECK constraint, so the illegal states are unreachable,
            not merely discouraged.
          </p>
        </div>
        <p>
          A drive walks that lifecycle, and only the middle of it, live work,
          can ever carry a “needs review” flag. When the company alignment
          changes underneath a running drive, the affected objectives are
          flagged for exactly that, and nothing outside those states can be.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/os-drift.jpg" alt="An operator dashboard flagging objectives that need review after the alignment changed" />
          </span>
          <figcaption>
            The rule in the product: when the alignment changes underneath live
            work, the affected objectives are flagged “needs review”, exactly the
            state the constraint allows
          </figcaption>
        </figure>
      </section>

      {/* 6 — multi-tenant enforcement */}
      <section>
        <h2>Multi-tenant, by construction</h2>
        <p>
          The scariest failure mode for a platform like this is one company
          seeing another’s work. So tenancy isn’t enforced in the app, where a
          missed check leaks data. It’s enforced at the database, as the last
          line: row-level security scopes every read to the viewer’s company,
          and clients are additionally never shown work that’s still an internal
          draft.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/os-admin-companies.jpg" alt="The admin company list: many separate tenant companies in one system" />
          </span>
          <figcaption>
            Many companies, one system. Every table the policies below guard is
            scoped to one of them.
          </figcaption>
        </figure>
        <div className="codeblock">
          <span className="codeblock-file">supabase/migrations/…state_rework.sql</span>
          <pre><code>{`CREATE POLICY "clients_view_drives" ON drives FOR SELECT TO authenticated
USING (
  get_user_role() = 'client'
  AND company_id = (SELECT company_id FROM profiles WHERE id = auth.uid())
  AND stage IN ('pending_review','approved','started','stopped','closed')
);`}</code></pre>
          <p className="codeblock-intent">
            A client can read a drive only if it’s theirs <em>and</em> it has
            reached a client-visible stage. Internal drafts are invisible at the
            row level, not hidden by the UI.
          </p>
        </div>
        <p>
          On top of that last line, the app adds defense in depth: role, access
          level, and whether the agreement is signed. The finest-grained guard
          encodes a whole access decision in one function.
        </p>
        <div className="codeblock">
          <span className="codeblock-file">lib/auth/guards.ts</span>
          <pre><code>{`export function fullClientNeedsSetup(user): boolean {
  return (
    user?.role === "client" &&
    user.client_access_level === "full" &&
    !user.agreement_signed_at
  );
}`}</code></pre>
          <p className="codeblock-intent">
            A full client who hasn’t signed the agreement may read, but not act.
            The database is the last line of defense, not the only one.
          </p>
        </div>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/os-outcome-full.jpg" alt="A full outcome page as the client sees it: status, approval, and success criteria" />
          </span>
          <figcaption>
            What the client is allowed to see: one outcome, top to bottom, with
            the approval decision that gates execution
          </figcaption>
        </figure>
      </section>

      {/* 7 — the pivot: reprices the outcome-focused framing above */}
      <section>
        <h2>The story changed, the system didn’t</h2>
        <p>
          This platform was built to do one thing for a client: make the
          outcomes Threshold pursued on their behalf visible, and let them
          approve and pay for those outcomes one at a time. That was the
          business, and the object model above is shaped to it.
        </p>
        <p>
          Running it taught us something the plan didn’t predict. To reach any
          outcome, we first built a loop: a repeatable agentic process that
          produced the result. New customers wanted the loop more than a
          finished outcome sold to them piece by piece. The value was in the
          machine, not in its output metered out. So the go-to-market moved,
          from charging for outcomes to building and handing over the loops
          themselves.
        </p>
        <p>
          The part worth noticing, as the person who designed the model, is how
          little of it had to move. The vocabulary was already there: a{' '}
          <em>run</em> is an atomic execution attempt, which is another way of
          saying a loop. The chain still holds. What changed was where the price
          sat, not the shape underneath it.
        </p>
      </section>

      {/* 8 — the close */}
      <section>
        <h2>Shipped by the designer</h2>
        <p>
          Every surface here went to production through my own pull requests:
          risk-classified, planned before code, tested, and reviewed, down to
          the database migrations, row-level security policies, and auth guards
          you just read. A design isn’t done until it survives contact with real
          data and real permissions.
        </p>
        <p>
          That’s the whole argument for this case study. It isn’t only product
          design, and it isn’t only architecture. It’s the tight loop most teams
          don’t get: the person deciding how it should feel is the same person
          deciding how it’s built, so nothing is lost in translation, and the
          product rule and the database law end up being the same sentence.
        </p>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/brand">the brand system</Link>
        </p>
      </nav>
    </main>
  )
}
