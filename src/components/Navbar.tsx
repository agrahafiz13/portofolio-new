import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { identity, links, navigation } from '../data/site'
import { cn } from '../lib/cn'
import { useBodyScrollLock, useClock } from '../lib/hooks'

type NavbarProps = {
  active: string
  progress: number
}

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The system bar. Instead of a row of links it reads the machine state —
 * which section is mounted and how far through it you are — and opens a
 * full-screen index when you ask for the menu, at every viewport size.
 */
export function Navbar({ active, progress }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [inspect, setInspect] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const clock = useClock()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const wasOpen = useRef(false)

  const activeItem =
    active === 'home'
      ? { id: 'home', index: '00', label: 'Home', file: 'index.html', blurb: 'The opening screen — name, role and status.' }
      : (navigation.find((item) => item.id === active) ?? navigation[0])
  const inspected = navigation.find((item) => item.id === (inspect ?? active)) ?? activeItem

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    firstLinkRef.current?.focus({ preventScroll: true })
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Hand focus back to the toggle once the index closes again.
  useEffect(() => {
    if (open) {
      wasOpen.current = true
      return
    }
    if (!wasOpen.current) return
    wasOpen.current = false
    setInspect(null)
    toggleRef.current?.focus({ preventScroll: true })
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-[2px]">
        <div className="shell flex h-14 items-center gap-4 md:h-16 md:gap-5">
          <a
            href="#home"
            aria-label="Agra Alfian Hafiz — back to the top"
            className="group flex flex-none items-center gap-2.5"
          >
            <span className="h-2 w-2 bg-brick" aria-hidden="true" />
            <span className="display text-[1.05rem] tracking-[-0.03em] md:text-[1.15rem]">
              Agra
              <span className="text-ink/40">.</span>
            </span>
            <span className="label hidden text-ink/45 xl:block">Alfian Hafiz</span>
          </a>

          <span className="hidden h-5 w-px flex-none bg-line sm:block" aria-hidden="true" />

          {/* where you are, and how far through it */}
          <div className="hidden min-w-0 flex-none items-center gap-3 sm:flex">
            <span className="flex h-4 items-center overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeItem.id}
                  className="label flex items-baseline gap-2 whitespace-nowrap"
                  initial={reduce ? { opacity: 0 } : { y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  <span className="text-brick">{activeItem.index}</span>
                  <span className="text-ink/70">{activeItem.label}</span>
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="relative h-px w-12 flex-none overflow-hidden bg-ink/15 md:w-16">
              <span
                className="absolute inset-0 origin-left bg-brick transition-transform duration-200 ease-linear"
                style={{ transform: `scaleX(${progress})` }}
                aria-hidden="true"
              />
            </span>
          </div>

          <div className="ml-auto flex flex-none items-center gap-2 md:gap-3">
            <span className="label hidden items-center gap-2 text-ink/40 lg:flex">
              {identity.location}
              <span className="tabular-nums text-ink/70">{clock}</span>
            </span>

            <a href="#contact" className="btn btn-solid hidden sm:inline-flex">
              Get in touch
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="label group flex items-center gap-2.5 border border-ink px-3 py-2 text-ink/80 transition-colors hover:bg-ink hover:text-paper"
            >
              {open ? 'Close' : 'Menu'}
              <span className="flex h-[9px] w-5 flex-col justify-between" aria-hidden="true">
                <span
                  className={cn(
                    'h-px w-full bg-current transition-transform duration-300',
                    open && 'translate-y-[4px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'h-px bg-current transition-all duration-300',
                    open ? 'w-full -translate-y-[4px] -rotate-45' : 'w-3/5 group-hover:w-full',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site index"
            className="fixed inset-0 z-45 flex flex-col bg-ink text-cream"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: EASE }}
          >
            <div className="shell grid flex-1 content-center gap-10 pt-20 pb-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
              <nav aria-label="Primary">
                <ul className="border-t border-cream/15">
                  {navigation.map((item, index) => (
                    <li key={item.id} className="overflow-hidden border-b border-cream/15">
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { y: '110%' }}
                        animate={reduce ? { opacity: 1 } : { y: '0%' }}
                        exit={reduce ? { opacity: 0 } : { y: '110%' }}
                        transition={{
                          duration: reduce ? 0.2 : 0.55,
                          ease: EASE,
                          delay: reduce ? 0 : open ? 0.16 + index * 0.055 : index * 0.02,
                        }}
                      >
                        <a
                          ref={index === 0 ? firstLinkRef : undefined}
                          href={`#${item.id}`}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setInspect(item.id)}
                          onFocus={() => setInspect(item.id)}
                          aria-current={active === item.id ? 'true' : undefined}
                          className="group grid grid-cols-[2.2rem_minmax(0,1fr)_auto] items-baseline gap-2 py-2.5 transition-colors hover:text-brick md:py-3.5"
                        >
                          <span
                            className={cn(
                              'label pt-2',
                              active === item.id ? 'text-brick' : 'text-cream/35',
                            )}
                          >
                            {item.index}
                          </span>
                          <span className="display text-[clamp(2.1rem,7vw,4.6rem)] leading-[1.04] tracking-[-0.04em] transition-transform duration-500 ease-(--ease-out-editorial) group-hover:translate-x-2">
                            {item.label}
                          </span>
                          <span className="label hidden text-cream/30 sm:block">{item.file}</span>
                        </a>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* inspector panel — reads out whatever the pointer is on */}
              <aside className="hidden border-l border-cream/15 pl-8 lg:block" aria-hidden="true">
                <p className="label text-cream/40">inspector.cfg</p>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={inspected.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <p className="display mt-6 text-[3.4rem] leading-none text-cream/25">
                      {inspected.index}
                    </p>
                    <p className="label mt-3 text-cream/70">{inspected.file}</p>
                    <p className="mt-3 max-w-[26ch] text-[0.85rem] leading-relaxed text-cream/55">
                      {inspected.blurb}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <p className="label mt-8 flex items-center gap-2 text-cream/40">
                  <span className="led" />
                  scroll {String(Math.round(progress * 100)).padStart(3, '0')}%
                </p>
              </aside>
            </div>

            <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-cream/15 py-4">
              <a href={links.email} className="label link-line text-cream/60 hover:text-cream">
                {identity.email}
              </a>
              <span className="label flex items-center gap-2 text-cream/45">
                <span className="led" aria-hidden="true" />
                {identity.availability}
              </span>
              <span className="label hidden text-cream/30 sm:block">esc — close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
