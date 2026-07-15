'use client'

import { useState } from 'react'

/**
 * Horizontal expanding accordion for the three role-based surfaces. Inactive
 * panels collapse to slim mono-labelled spines; the active one glides open to
 * show its surface large, with the role and its purpose over a scrim. One open
 * at a time, click to swap. Reinforces "three surfaces, one system" as a single
 * object you operate, rather than three thumbnails.
 */

const SURFACES = [
  {
    key: 'client',
    index: '01',
    label: 'Client',
    img: '/images/os-home.jpg',
    purpose:
      'Read-mostly. Clients don’t operate the work, they approve it and watch it. The job here is confidence, not task efficiency.',
  },
  {
    key: 'operator',
    index: '02',
    label: 'Operator',
    img: '/images/os-operator-drive.jpg',
    purpose:
      'The people doing the execution: authoring objectives, running drives through their lifecycle, declaring outcomes, resolving drift. The doing tier.',
  },
  {
    key: 'admin',
    index: '03',
    label: 'Admin',
    img: '/images/os-admin-run-approvals.jpg',
    purpose:
      'The firm’s cross-tenant control plane: pricing approval before a client ever sees a result, tenant and billing administration, monitoring. The oversight tier.',
  },
] as const

export function SurfaceAccordion() {
  const [active, setActive] = useState<string>('client')

  return (
    <div className="surface-acc">
      {SURFACES.map((s) => {
        const on = s.key === active
        return (
          <button
            key={s.key}
            type="button"
            className={`surface-panel ${on ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${s.img})` }}
            aria-expanded={on}
            aria-label={`${s.label} surface`}
            onClick={() => setActive(s.key)}
          >
            <span className="surface-spine" aria-hidden>
              <span className="surface-idx">{s.index}</span>
              <span className="surface-name">{s.label}</span>
            </span>
            <span className="surface-reveal">
              <span className="surface-cap-label">
                <span className="surface-cap-idx">{s.index}</span>
                {s.label}
              </span>
              <span className="surface-cap-text">{s.purpose}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
