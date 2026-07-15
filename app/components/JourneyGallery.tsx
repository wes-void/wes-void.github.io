'use client'

import { useState } from 'react'

/**
 * The full onboarding journey as a swappable gallery: a large stage showing
 * one page at a time, a caption with the step's intent, prev/next, and a
 * numbered rail to jump to any of the twelve pages. Every screen is the real
 * product, captured with believable data.
 */

const STEPS = [
  { n: '01', title: 'Password', img: '/images/os-onb-01-password.jpg', caption: 'Reassuring and reversible: “change it anytime in Settings.”' },
  { n: '02', title: 'Profile', img: '/images/os-onb-02-profile.jpg', caption: 'Name required, photo optional and deferrable.' },
  { n: '03', title: 'Welcome', img: '/images/os-onb-03-welcome.jpg', caption: 'The first outcome is already prepared; they review before anything begins.' },
  { n: '04', title: 'Focus', img: '/images/os-onb-04-focus.jpg', caption: 'Sells hands-off execution: real progress you watch, not manage.' },
  { n: '05', title: 'Trial', img: '/images/os-onb-05-trial.jpg', caption: 'Pricing stated plainly. The trial starts with no charge.' },
  { n: '06', title: 'Agreement', img: '/images/os-onb-06-agreement.jpg', caption: 'Scroll-to-read gating and plain-language terms before you can sign.' },
  { n: '07', title: 'Signature', img: '/images/os-onb-07-sign.jpg', caption: 'A typed signature that feels like one; Threshold’s side pre-signed.' },
  { n: '08', title: 'Payment', img: '/images/os-onb-08-payment.jpg', caption: 'Card saved, not charged. Details never touch our servers.' },
  { n: '09', title: 'Alignment', img: '/images/os-onb-09-approve-alignment.jpg', caption: 'Approve the company direction everything else will support.' },
  { n: '10', title: 'Objective', img: '/images/os-onb-10-approve-objective.jpg', caption: 'Confirm the measurable target the work is tied to.' },
  { n: '11', title: 'Outcome', img: '/images/os-onb-11-approve-outcome.jpg', caption: 'Approve the first outcome. Once you say go, execution begins.' },
  { n: '12', title: 'You’re in', img: '/images/os-onb-12-welcome-moment.jpg', caption: 'A one-shot welcome moment: “your trial outcome starts now.”' },
]

export function JourneyGallery() {
  const [i, setI] = useState(0)
  const s = STEPS[i]
  const go = (n: number) => setI(Math.min(STEPS.length - 1, Math.max(0, n)))

  return (
    <div className="journey-gallery">
      <div className="jg-stage">
        {/* key forces a fresh element per step so the fade re-runs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={s.img} src={s.img} alt={`Onboarding step ${s.n}: ${s.title}`} />
      </div>

      <div className="jg-bar">
        <button
          className="jg-nav"
          onClick={() => go(i - 1)}
          disabled={i === 0}
          aria-label="Previous step"
        >
          ‹
        </button>
        <p className="jg-caption">
          <span className="jg-cap-n">Step {s.n}</span>
          <span className="jg-cap-title">{s.title}</span>
          <span className="jg-cap-text">{s.caption}</span>
        </p>
        <button
          className="jg-nav"
          onClick={() => go(i + 1)}
          disabled={i === STEPS.length - 1}
          aria-label="Next step"
        >
          ›
        </button>
      </div>

      <div className="jg-rail" role="tablist" aria-label="Onboarding steps">
        {STEPS.map((st, idx) => (
          <button
            key={st.n}
            className={`jg-step ${idx === i ? 'is-active' : ''}`}
            onClick={() => setI(idx)}
            role="tab"
            aria-selected={idx === i}
            aria-label={`${st.title}, step ${st.n}`}
          >
            <span className="jg-step-n">{st.n}</span>
            <span className="jg-step-t">{st.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
