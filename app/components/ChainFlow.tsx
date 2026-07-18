'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

const LINKS = [
  {
    n: '01',
    name: 'Company-wide Alignment',
    role: 'Sets the single direction the whole company serves.',
    db: 'exactly one active row',
  },
  {
    n: '02',
    name: 'Objective',
    role: 'Makes that direction measurable, written as a sentence.',
    db: 'prose in typed columns',
  },
  {
    n: '03',
    name: 'Drive',
    role: 'The work pursued against an objective.',
    db: 'a lifecycle of legal states',
  },
  {
    n: '04',
    name: 'Run',
    role: 'An atomic execution attempt inside a drive.',
    db: 'one append-only attempt',
  },
]

export function ChainFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [rail, setRail] = useState<{ start: number; end: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Measure the first and last dot centers so the pulse can travel exactly
  // between them (down to Run, then boomerang back up).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const PULSE = 8
    const measure = () => {
      const dots = el.querySelectorAll('.chainflow-dot')
      if (dots.length < 2) return
      const box = el.getBoundingClientRect()
      const first = dots[0].getBoundingClientRect()
      const last = dots[dots.length - 1].getBoundingClientRect()
      setRail({
        start: first.top - box.top + first.height / 2 - PULSE / 2,
        end: last.top - box.top + last.height / 2 - PULSE / 2,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const settle = setTimeout(measure, 300)
    return () => {
      ro.disconnect()
      clearTimeout(settle)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`chainflow${shown ? ' is-shown' : ''}`}
      style={
        rail
          ? ({
              ['--pulse-start' as string]: `${rail.start}px`,
              ['--pulse-end' as string]: `${rail.end}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <span className="chainflow-pulse" aria-hidden />
      <ol className="chainflow-links">
        {LINKS.map((link, i) => (
          <li
            key={link.n}
            className="chainflow-link"
            style={{ ['--i' as string]: i }}
          >
            <span className="chainflow-rail" aria-hidden>
              <span className="chainflow-dot" />
            </span>
            <div className="chainflow-body">
              <div className="chainflow-head">
                <span className="chainflow-n">{link.n}</span>
                <h3 className="chainflow-name">{link.name}</h3>
              </div>
              <p className="chainflow-role">{link.role}</p>
            </div>
            <span className="chainflow-db">{link.db}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
