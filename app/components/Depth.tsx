'use client'

import { useEffect, useRef } from 'react'

/**
 * Wraps a section in its own perspective scene and eases it toward the
 * viewer from far translateZ as it scrolls into view.
 */
export function Depth({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const inner = el.firstElementChild as HTMLElement
    if (!inner) return

    let raf = 0
    let current = -1

    const tick = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 = section top at bottom of viewport, 1 = section top 30% up
      const raw = (vh - r.top) / (vh * 0.7)
      const p = Math.min(1, Math.max(0, raw))
      if (Math.abs(p - current) > 0.001) {
        current = p
        const eased = 1 - Math.pow(1 - p, 3)
        inner.style.transform = `translateZ(${(1 - eased) * -340}px)`
        inner.style.opacity = String(0.05 + 0.95 * eased)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={ref} className="depth">
      <div className="depth-inner">{children}</div>
    </div>
  )
}
