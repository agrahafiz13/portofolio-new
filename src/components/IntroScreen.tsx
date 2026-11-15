import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useBodyScrollLock } from '../lib/hooks'
import { cn } from '../lib/cn'

const DURATION = 1750
const SEGMENTS = 32

const logLines = [
  { at: 18, label: 'mount /profile', value: 'OK' },
  { at: 52, label: 'load /experience', value: 'OK' },
  { at: 82, label: 'index /projects', value: 'OK' },
  { at: 100, label: 'system ready', value: 'OK' },
]

export function IntroScreen({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const titleId = useId()
  const [progress, setProgress] = useState(0)
  const enterRef = useRef<HTMLButtonElement>(null)

  useBodyScrollLock(true)

  useEffect(() => {
    const start = performance.now()
    const duration = reduce ? 1 : DURATION
    let frame = 0

    const tick = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration)
      setProgress(Math.round(ratio * 100))
      if (ratio < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduce])

  useEffect(() => {
    enterRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDone()
      if (event.key === 'Enter' && progress >= 100) onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDone, progress])

  const filled = useMemo(() => Math.round((progress / 100) * SEGMENTS), [progress])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cream px-4 py-10"
      initial={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-full max-w-[560px]">
        <div className="win bg-paper">
          <div className="win-bar text-ink/55">
            <span className="win-box" aria-hidden="true" />
            <span className="label flex-1 truncate">Agra OS — installer</span>
            <button
              type="button"
              onClick={onDone}
              className="label px-1 py-0.5 text-ink/55 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-brick"
            >
              Skip
            </button>
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="win-box" />
              <span className="win-box" />
            </span>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <span className="label text-ink/45">AGRA SYSTEMS</span>
              <span className="label text-ink/45">v1.984</span>
            </div>

            <h1
              id={titleId}
              className="display mt-7 text-[clamp(1.75rem,6vw,2.6rem)] tracking-[-0.04em]"
            >
              Agra&apos;s Digital Portfolio
            </h1>

            <p className="mt-3 font-mono text-[0.72rem] tracking-[0.02em] text-ink/65 sm:text-xs">
              Initializing Digital Experience
              <span className="cursor-block ml-1 h-3 w-1.5 align-middle" aria-hidden="true" />
            </p>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="label text-ink/45">Progress</span>
                <span className="label tabular-nums text-ink/70">
                  {String(progress).padStart(3, '0')}%
                </span>
              </div>

              <div
                className="mt-2 flex h-4 items-stretch gap-px border border-ink/40 bg-cream p-[2px]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Loading portfolio"
              >
                {Array.from({ length: SEGMENTS }, (_, index) => (
                  <span
                    key={index}
                    className={cn(
                      'flex-1 transition-colors duration-150',
                      index < filled ? 'bg-brick' : 'bg-ink/10',
                    )}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-1.5 font-mono text-[0.7rem] text-ink/55">
              {logLines.map((line) => (
                <li
                  key={line.label}
                  className={cn(
                    'flex items-baseline gap-2 transition-opacity duration-300',
                    progress >= line.at ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <span className="text-brick">&gt;</span>
                  <span className="flex-1 truncate">{line.label}</span>
                  <span className="hidden flex-1 border-b border-dotted border-ink/25 sm:block" />
                  <span className="text-ink/70">{line.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="label flex items-center gap-2 text-ink/50">
                <span className={cn('led', progress < 100 && 'opacity-40')} aria-hidden="true" />
                {progress >= 100 ? 'System ready' : 'Loading'}
              </span>

              <div className="flex items-center gap-2">
                <button type="button" onClick={onDone} className="btn btn-ghost flex-1 sm:flex-none">
                  Skip intro
                </button>
                <button
                  ref={enterRef}
                  type="button"
                  onClick={onDone}
                  disabled={progress < 100}
                  className="btn btn-solid flex-1 sm:flex-none"
                >
                  Enter portfolio
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="label mt-4 flex items-center justify-between text-ink/40">
          <span>&copy; 1984 — 2026 Agra Systems</span>
          <span className="hidden sm:inline">Press enter to continue</span>
        </p>
      </div>
    </motion.div>
  )
}
