import Link from 'next/link'
import { Depth } from './components/Depth'

type Project = {
  slug: string
  num: string
  title: string
  body: string
  caption: string
  img: string
  // device-framed mockup (transparent PNG) vs. flat cover screenshot
  mockup?: boolean
  // portrait device (phone): constrain so it doesn't tower over its row
  portrait?: boolean
}

const projects: Project[] = [
  {
    slug: 'threshold-os',
    num: '01',
    title: 'Threshold OS: a client platform for an AI execution firm',
    body: 'The core product: alignment, outcomes, learnings, and billing for Threshold’s clients. Designed end-to-end and built the same way, from the design system down to the database it runs on.',
    caption: 'Threshold OS / client portal',
    img: '/images/os-mockup.png',
    mockup: true,
  },
  {
    slug: 'brand',
    num: '02',
    title: 'A brand system you can page through, from mark to marketing',
    body: 'The Threshold identity: logo, palette, typography, and application, built end-to-end and documented in a brand book. Page through the real thing, not a screenshot of it.',
    caption: 'Threshold / brand identity',
    img: '/brand/page-01.jpg',
  },
  {
    slug: 'threshold-marketing',
    num: '03',
    title: 'A go-to-market website built around a narrative, not a feature list',
    body: 'Threshold’s public site through two GTM pivots: a company-wide audience shift, then a consultation-led offer. Strategy, copy, design, and code shipped as one continuous system.',
    caption: 'threshhold.com / GTM v0.9',
    img: '/images/marketing-mockup.png',
    mockup: true,
  },
  {
    slug: 'assessment',
    num: '04',
    title: 'An interactive assessment that qualifies leads by being genuinely useful',
    body: 'A three-part self-serve journey (friction mapping, readiness scoring, a first-loop simulation) that turns “book a demo” into an experience worth having on its own.',
    caption: 'Threshold Experiences / assessment journey',
    img: '/images/assessment-mockup.png',
    mockup: true,
    portrait: true,
  },
]

export default function Home() {
  return (
    <main className="page">
      <header className="intro">
        <span className="intro-name">Wes Norris</span>
        <p className="availability">
          <span className="dot" aria-hidden />
          Open to remote Lead &amp; Senior Product Design roles
        </p>
        <h1>Product design, shipped to production.</h1>
        <p className="sub">
          Lead Product Designer at{' '}
          <a href="https://threshhold.com" target="_blank" rel="noreferrer">
            Threshold
          </a>
          , where the design system, the client platform, and the marketing
          site were designed and built by the same pair of hands: Next.js,
          TypeScript, Supabase, Postgres row-level security and all.
        </p>
      </header>

      {projects.map((p, idx) => (
        <Depth key={p.slug}>
        <article className={`project${idx % 2 === 1 ? ' project--flip' : ''}`}>
          <Link
            href={`/work/${p.slug}`}
            className={`project-media${p.mockup ? ' project-media--device' : ''}${
              p.portrait ? ' project-media--portrait' : ''
            }`}
            aria-hidden
            tabIndex={-1}
          >
            <span className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" loading="lazy" />
            </span>
          </Link>
          <div className="project-text">
            <p className="project-caption">
              {p.num} | {p.caption}
            </p>
            <h2>
              <Link href={`/work/${p.slug}`}>{p.title}</Link>
            </h2>
            <p>{p.body}</p>
            <Link className="project-cta" href={`/work/${p.slug}`}>
              See more
            </Link>
          </div>
        </article>
        </Depth>
      ))}

      <footer className="site-footer">
        <p className="contact">
          Say hello:{' '}
          <a href="mailto:wesleynorris.design@gmail.com">
            wesleynorris.design@gmail.com
          </a>
        </p>
        <div className="links">
          <a
            href="https://www.linkedin.com/in/wesley-norris/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="/wes-norris-resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </main>
  )
}
