'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Flip = { dir: 'next' | 'prev'; front: number; back: number; base: number }

const DURATION = 620

export function FlipBook({
  pages,
  ratio = '16 / 9',
}: {
  pages: string[]
  ratio?: string
}) {
  const n = pages.length
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState<Flip | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (dir: 'next' | 'prev') => {
      setFlip((cur) => {
        if (cur) return cur
        setI((idx) => {
          const to = dir === 'next' ? idx + 1 : idx - 1
          if (to < 0 || to >= n) return idx
          setFlip(
            dir === 'next'
              ? { dir, front: idx, back: to, base: to }
              : { dir, front: to, back: idx, base: to }
          )
          return idx
        })
        return cur
      })
    },
    [n]
  )

  // commit the page once the turn animation finishes
  useEffect(() => {
    if (!flip) return
    const t = setTimeout(() => {
      setI(flip.base)
      setFlip(null)
    }, DURATION)
    return () => clearTimeout(t)
  }, [flip])

  // preload neighbours
  useEffect(() => {
    for (const idx of [i - 1, i + 1]) {
      if (idx >= 0 && idx < n) {
        const img = new Image()
        img.src = pages[idx]
      }
    }
  }, [i, n, pages])

  // keyboard nav when the book is on screen / focused
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go('next')
      else if (e.key === 'ArrowLeft') go('prev')
    }
    const el = frameRef.current
    el?.addEventListener('keydown', onKey)
    return () => el?.removeEventListener('keydown', onKey)
  }, [go])

  const shown = flip ? flip.base : i
  const atStart = i === 0 && !flip
  const atEnd = i === n - 1 && !flip

  return (
    <div className="flipbook">
      <div
        className="flipbook-frame"
        style={{ aspectRatio: ratio }}
        ref={frameRef}
        tabIndex={0}
        aria-label={`Brand book, page ${i + 1} of ${n}`}
      >
        {/* base = whatever should be visible when the sheet clears */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="flipbook-base" src={pages[shown]} alt="" draggable={false} />

        {flip && (
          <div
            className={`flipbook-sheet flipbook-sheet--${flip.dir}`}
            key={`${flip.front}-${flip.back}`}
          >
            <div className="flipbook-face flipbook-face--front">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pages[flip.front]} alt="" draggable={false} />
            </div>
            <div className="flipbook-face flipbook-face--back">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pages[flip.back]} alt="" draggable={false} />
            </div>
          </div>
        )}

        {/* click zones */}
        <button
          className="flipbook-zone flipbook-zone--prev"
          onClick={() => go('prev')}
          disabled={atStart}
          aria-label="Previous page"
        />
        <button
          className="flipbook-zone flipbook-zone--next"
          onClick={() => go('next')}
          disabled={atEnd}
          aria-label="Next page"
        />
      </div>

      <div className="flipbook-bar">
        <button
          className="flipbook-nav"
          onClick={() => go('prev')}
          disabled={atStart}
        >
          ← Prev
        </button>
        <span className="flipbook-count">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button
          className="flipbook-nav"
          onClick={() => go('next')}
          disabled={atEnd}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
