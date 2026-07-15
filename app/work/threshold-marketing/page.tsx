import type { Metadata } from 'next'
import Link from 'next/link'
import { LiveEmbed } from '../../components/LiveEmbed'

export const metadata: Metadata = {
  title: 'Threshold marketing site | Wes Norris',
  description:
    'The go-to-market surface for an AI execution firm: positioning, copy, and code shipped as one funnel that hands off to a live product diagnostic.',
}

export default function ThresholdMarketing() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>The front door to the system</h1>
      <p className="lede">
        Threshold’s public site is a small, deliberate surface with one job:
        turn curiosity into a qualified conversation. It’s less screen than the
        product or the design system, and that restraint is the point. So
        instead of narrating it section by section, here it is, live and
        clickable. What’s worth telling is the strategy behind it, and where it
        hands you next.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Positioning, copy, design, and build</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Homepage, offer, insights, consultation booking, SEO</dd>
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

      <LiveEmbed
        src="/marketing-site.html"
        title="The Threshold marketing site, running live"
        background="#060a0b"
      />
      <p className="ds-live-hint">
        Live and clickable · click through the funnel
      </p>

      <section>
        <h2>Strategy is the design input</h2>
        <p>
          The site has been re-argued more often than it’s been redesigned: an
          audience shift toward mission-driven organizations, then a move from a
          free-first funnel to a consultation-led offer. Each pivot was a
          positioning decision translated into copy, then structure, then
          shipped code, holding one voice from the brand system all the way to
          the legal pages. On a surface this small, restraint is the craft: it
          earns the next click or it doesn’t.
        </p>
      </section>

      <section>
        <h2>Where it hands you next</h2>
        <p>
          A marketing site is one surface in a system, not the destination. This
          one’s job is to pass the visitor along: the brand system into the
          market, the market into a genuinely useful diagnostic. That
          diagnostic, the Agent-Ready assessment, is the real product moment,
          and it’s alive with a working demo. It’s where this case study goes
          next, the same way the funnel does.
        </p>
        <figure>
          <Link
            href="/work/assessment"
            className="shot"
            aria-label="Open the assessment case study"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mkt-assessment.jpg"
              alt="The Agent-Ready assessment hub, the funnel's interactive endpoint"
            />
          </Link>
          <figcaption>
            The funnel’s endpoint: a diagnostic, not a lead form
          </figcaption>
        </figure>
        <Link className="more" href="/work/assessment">
          See the assessment journey
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
