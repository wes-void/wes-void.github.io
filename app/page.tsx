import Link from 'next/link'
import { Depth } from './components/Depth'

const projects = [
  {
    slug: 'threshold-os',
    num: '01',
    title: 'Threshold OS: a client platform for an AI execution firm',
    body: 'The core product: alignment, outcomes, learnings, and billing for Threshold’s clients. Designed end-to-end and built the same way, from the design system down to Postgres row-level security.',
    caption: 'Threshold OS / client portal',
    img: '/images/threshold-os-cover.svg',
  },
  {
    slug: 'threshold-marketing',
    num: '02',
    title: 'A go-to-market website built around a narrative, not a feature list',
    body: 'Threshold’s public site through two GTM pivots: a company-wide audience shift, then a consultation-led offer. Strategy, copy, design, and code shipped as one continuous system.',
    caption: 'threshhold.com / GTM v0.9',
    img: '/images/marketing-cover.svg',
  },
  {
    slug: 'assessment',
    num: '03',
    title: 'An interactive assessment that qualifies leads by being genuinely useful',
    body: 'A three-part self-serve journey (friction mapping, readiness scoring, a first-loop simulation) that turns “book a demo” into an experience worth having on its own.',
    caption: 'Threshold Experiences / assessment journey',
    img: '/images/assessment-cover.svg',
  },
]

export default function Home() {
  return (
    <main className="page">
      <header className="intro">
        <h1>
          Wes Norris is a product designer who ships his own work to
          production.
        </h1>
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

      {projects.map((p) => (
        <Depth key={p.slug}>
        <article className="project">
          <figure>
            <Link href={`/work/${p.slug}`} className="shot" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt="" loading="lazy" />
            </Link>
            <figcaption>
              {p.num} | {p.caption}
            </figcaption>
          </figure>
          <h2>
            <Link href={`/work/${p.slug}`}>{p.title}</Link>
          </h2>
          <p>{p.body}</p>
          <Link className="more" href={`/work/${p.slug}`}>
            See more
          </Link>
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
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="/wes-norris-resume.pdf">Resume</a>
        </div>
      </footer>
    </main>
  )
}
