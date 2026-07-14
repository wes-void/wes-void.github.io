import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Threshold marketing site | Wes Norris',
  description:
    'A go-to-market website carried through two strategy pivots: narrative, copy, design, and code shipped as one system.',
}

export default function ThresholdMarketing() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>A go-to-market site built around a narrative</h1>
      <p className="lede">
        Threshold’s public site is the argument for a new kind of service:
        AI-powered execution, done for you. I owned it end to end through two
        full go-to-market pivots: positioning translated into copy, copy into
        design, design into shipped code.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Design, copywriting, and build</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Homepage, pricing, insights, demo booking, SEO</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>Next.js, TypeScript, one CSS file</dd>
        </div>
        <div>
          <dt>Live</dt>
          <dd>
            <a href="https://threshhold.com" target="_blank" rel="noreferrer">
              threshhold.com
            </a>
          </dd>
        </div>
      </dl>

      <section>
        <h2>Strategy is a design input</h2>
        <p>
          The site went through two deliberate pivots: first an audience shift
          toward mission-driven organizations, then a repositioning of the
          offer itself, from a free-first funnel to a consultation-led ladder
          (free consult, paid deep dive, implementation). Each pivot meant
          re-arguing the story, not reskinning the pages.
        </p>
        <p>
          Working from the GTM control document, I translated positioning
          decisions into a copy spec, the copy spec into page structure, and
          shipped the rework as a sequence of small, reviewable commits.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mkt-home.svg" alt="Threshold homepage hero" />
          </span>
          <figcaption>Homepage: narrative-first structure</figcaption>
        </figure>
      </section>

      <section>
        <h2>One voice across every surface</h2>
        <p>
          Pricing, insights, the demo flow, legal pages, even error states:
          the same vocabulary everywhere, down to renaming internal concepts
          for public consumption (“loops” became “agents” when the market
          said so). Consistency here is a retention feature. Visitors who hit
          three pages should hear one company.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mkt-pricing.svg" alt="Pricing page" />
          </span>
          <figcaption>The consultation-led offer, made legible</figcaption>
        </figure>
      </section>

      <section>
        <h2>The plumbing counts too</h2>
        <p>
          A marketing site converts or it doesn’t. I built the contact and
          demo-booking flow (Cal.com integration), structured metadata and SEO,
          and the insights section, so the design work is measurable, not just
          presentable.
        </p>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/assessment">the assessment journey</Link>
        </p>
      </nav>
    </main>
  )
}
