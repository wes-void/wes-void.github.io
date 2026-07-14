import type { Metadata } from 'next'
import Link from 'next/link'
import { FlipBook } from '../../components/FlipBook'

export const metadata: Metadata = {
  title: 'Brand identity system | Wes Norris',
  description:
    'The Threshold brand: logo, palette, typography, and application, drawn together into a brand book you can page through.',
}

const pages = Array.from(
  { length: 22 },
  (_, i) => `/brand/page-${String(i + 1).padStart(2, '0')}.jpg`
)

export default function Brand() {
  return (
    <main className="page case">
      <Link className="back" href="/">
        ← Wes Norris
      </Link>

      <h1>A brand system, from mark to marketing</h1>
      <p className="lede">
        Before Threshold had a product, it needed an identity: a logo, a
        palette, a voice in type. I built the whole system in two forms, a
        brand book to hand people and a living design system the product is
        actually built from. Both are below.
      </p>

      <dl className="facts">
        <div>
          <dt>Role</dt>
          <dd>Brand and visual identity, end to end</dd>
        </div>
        <div>
          <dt>Scope</dt>
          <dd>Logo, palette, type system, application, brand book</dd>
        </div>
        <div>
          <dt>System</dt>
          <dd>Caudex + Inter, electric blue on emerald-black</dd>
        </div>
        <div>
          <dt>Reach</dt>
          <dd>Every surface: product, site, and this portfolio</dd>
        </div>
      </dl>

      <FlipBook pages={pages} />

      <section>
        <h2>One idea, carried everywhere</h2>
        <p>
          The name is the concept: a <strong>threshold</strong> is the line you
          cross from uncertainty to knowing, drawn as a wordmark split by a
          single bar and distilled into a theta mark. That one idea sets the
          whole system: a humanist serif (Caudex) for old-world trust, a clean
          sans (Inter) for the screen, and an emerald-black field lit by a
          single stroke of electric blue.
        </p>
        <p>
          The book isn’t decoration. It’s the artifact that let the brand
          survive contact with a growing team: logo construction and clear
          space, a documented palette with usage ratios, a type hierarchy with
          real sentences in it, and application mockups that show the system
          living on a real page. The same palette you’re reading this portfolio
          on is drawn straight from it.
        </p>
      </section>

      <section>
        <h2>The living design system</h2>
        <p>
          The brand book is the story you hand someone. The design system is
          the source of truth the product is built from: two typefaces, 98
          tokens, real components, and the two product surfaces they assemble
          into. Where the book shows the brand, this shows the machine, colors
          as tokens, type as a scale, buttons and cards as exported pieces, so
          design and code stay one system rather than two that drift.
        </p>
        <div className="pageframe">
          <div className="pageframe-window">
            <div className="pageframe-chrome" aria-hidden>
              <span className="pageframe-dot" />
              <span className="pageframe-dot" />
              <span className="pageframe-dot" />
              <span className="pageframe-url">threshold · design system</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-designsystem.jpg"
              alt="The Threshold design system: brand, colors, type, spacing, and components"
            />
          </div>
          <p className="pageframe-hint">Scroll the full design system</p>
        </div>
      </section>

      <nav className="footer-nav site-footer">
        <p className="contact">
          Next: <Link href="/work/threshold-marketing">the marketing site</Link>
        </p>
      </nav>
    </main>
  )
}
