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

      <div className="pageframe">
        <div className="pageframe-window">
          <div className="pageframe-chrome" aria-hidden>
            <span className="pageframe-dot" />
            <span className="pageframe-dot" />
            <span className="pageframe-dot" />
            <span className="pageframe-url">threshhold.com</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mkt-fullpage.jpg"
            alt="The full Threshold homepage, top to bottom"
          />
        </div>
        <p className="pageframe-hint">Scroll the homepage, top to bottom</p>
      </div>

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
      </section>

      <section>
        <h2>One voice across every surface</h2>
        <p>
          The same voice has to hold up everywhere, not just the homepage.
          An editorial essay and a legal agreement sit at opposite ends of
          tone, yet both read as one company: the same serif, the same
          emerald-black calm, the same plain-spoken sentences. Down to
          renaming internal concepts for the public (“loops” became “agents”
          when the market said so), the vocabulary is deliberate and shared.
        </p>
        <div className="surface-grid">
          <figure>
            <span className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mkt-insights.jpg" alt="Insights page hero" />
            </span>
            <figcaption>Insights: the editorial surface</figcaption>
          </figure>
          <figure>
            <span className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mkt-legal.jpg"
                alt="Master Service Agreement legal page"
              />
            </span>
            <figcaption>Legal: even the MSA keeps the voice</figcaption>
          </figure>
        </div>
      </section>

      <section>
        <h2>The plumbing counts too</h2>
        <p>
          A marketing site converts or it doesn’t. I built the booking flow on
          a Cal.com integration, wired structured metadata and SEO, and shipped
          the insights surface, so the design work is measurable, not just
          presentable. The booking page carries the brand right up to the
          moment a prospect picks a time.
        </p>
        <figure>
          <span className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mkt-demo.jpg"
              alt="Consultation booking page with an embedded Cal.com scheduler"
            />
          </span>
          <figcaption>The booking flow: brand held to the last click</figcaption>
        </figure>
      </section>

      <section>
        <h2>The site’s interactive centerpiece</h2>
        <p>
          One surface on this site does more than describe the offer, it runs
          it. The Agent-Ready assessment is a three-part diagnostic that
          qualifies leads by being genuinely useful, and it’s the “Agent
          Ready?” item in the nav above. It lives on the marketing site, but
          it’s a product in its own right, so it gets its own case study.
        </p>
        <figure>
          <Link href="/work/assessment" className="shot" aria-label="Open the assessment case study">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mkt-assessment.jpg"
              alt="The Agent-Ready assessment hub with three diagnostic tools"
            />
          </Link>
          <figcaption>Agent-Ready assessment: a diagnostic, not a form</figcaption>
        </figure>
        <Link className="more" href="/work/assessment">
          See the full assessment case study
        </Link>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/assessment">the assessment journey</Link>
        </p>
      </nav>
    </main>
  )
}
