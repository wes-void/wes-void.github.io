'use client'

import { useEffect, useRef } from 'react'

/**
 * A full-bleed, viewport-tall embed of a live app (an iframe is its own scroll
 * container, so left alone it steals the wheel the moment the cursor is over it
 * — even while it's only half on screen, which traps you before you can bring
 * it fully into view).
 *
 * Fix: the iframe only captures scroll once its top has reached the top of the
 * viewport. Until then it's pointer-events: none, so wheel and touch pass
 * straight through to the page and the embed rides up with it. Once it's
 * pinned at the top (fully in view), scrolling and interaction belong to the
 * live system; a natural overscroll at its top or bottom hands scroll back to
 * the page.
 */
export function LiveEmbed({
  src,
  title,
  background,
}: {
  src: string
  title: string
  /** loading canvas color, matched to the embedded app so there's no flash */
  background?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const frame = frameRef.current
    if (!wrap || !frame) return

    let raf = 0
    let captured: boolean | null = null

    const sync = () => {
      raf = 0
      // pinned once the embed's top reaches (or passes) the viewport top
      const pinned = wrap.getBoundingClientRect().top <= 1
      if (pinned !== captured) {
        captured = pinned
        frame.style.pointerEvents = pinned ? 'auto' : 'none'
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync)
    }

    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="ds-live" ref={wrapRef}>
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        style={background ? { background } : undefined}
      />
    </div>
  )
}
