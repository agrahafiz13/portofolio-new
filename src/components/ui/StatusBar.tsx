import { useEffect, useRef, useState } from 'react'
import { useClock } from '../../lib/hooks'

/**
 * The persistent system bar. It reads like the bottom edge of an old
 * desktop: current path, machine state, pointer position, clock.
 */
export function StatusBar({ section }: { section: string }) {
  const clock = useClock()
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const frame = useRef(0)

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (frame.current) return
      frame.current = window.requestAnimationFrame(() => {
        setPointer({ x: Math.round(event.clientX), y: Math.round(event.clientY) })
        frame.current = 0
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame.current) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  const path = section || 'home'

  return (
    <div
      aria-hidden="true"
      data-statusbar
      className="fixed inset-x-0 bottom-0 z-40 flex h-8 items-center justify-between gap-4 border-t border-line bg-cream/95 px-3 text-ink/60 backdrop-blur-[2px] md:h-9 md:px-5"
    >
      <span className="label flex min-w-0 items-center gap-1.5 truncate">
        <span className="text-brick">&gt;</span>
        <span className="truncate">agra@portfolio:~/</span>
        <span className="text-ink/85">{path}</span>
      </span>

      <span className="label hidden items-center gap-2 md:flex">
        <span className="led" />
        SYS 1984 — ONLINE
      </span>

      <span className="label flex items-center gap-3 tabular-nums">
        <span className="hidden tabular-nums lg:inline">
          X {String(pointer?.x ?? 0).padStart(4, '0')} Y {String(pointer?.y ?? 0).padStart(4, '0')}
        </span>
        <span className="text-ink/85">{clock}</span>
      </span>
    </div>
  )
}
