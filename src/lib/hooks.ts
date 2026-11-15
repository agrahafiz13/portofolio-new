import { useCallback, useEffect, useState } from 'react'

/** Locks page scroll while the intro screen is on top of the document. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const root = document.documentElement
    if (locked) root.classList.add('is-locked')
    else root.classList.remove('is-locked')
    return () => root.classList.remove('is-locked')
  }, [locked])
}

/**
 * Tracks which section currently occupies the upper part of the viewport,
 * plus how far the reading line has travelled inside that section.
 * Compares scroll position against the section offsets instead of relying on
 * intersection ratios, which under-weight tall sections.
 */
export function useActiveSection(ids: string[]) {
  const [state, setState] = useState({ active: ids[0] ?? '', progress: 0 })

  useEffect(() => {
    let frame = 0

    const measure = () => {
      const line = window.scrollY + window.innerHeight * 0.35
      const bottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4

      let current = ids[0] ?? ''
      let top = 0
      let height = 1
      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        const offset = element.getBoundingClientRect().top + window.scrollY
        if (offset <= line) {
          current = id
          top = offset
          height = Math.max(element.offsetHeight, 1)
        }
      }

      const active = bottom ? (ids[ids.length - 1] ?? current) : current
      const travelled = Math.min(Math.max((line - top) / height, 0), 1)
      const progress = bottom ? 1 : travelled

      setState((prev) =>
        prev.active === active && Math.abs(prev.progress - progress) < 0.002
          ? prev
          : { active, progress },
      )
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        measure()
        frame = 0
      })
    }

    frame = window.requestAnimationFrame(() => {
      measure()
      frame = 0
    })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ids])

  return state
}

/** A very small clock used by the status bar. */
export function useClock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 15_000)
    return () => window.clearInterval(id)
  }, [])

  return time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** True when the device has a precise pointer (i.e. a mouse). */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return fine
}

/** Fires once a scroll threshold (in px) is passed. */
export function useScrolledPast(threshold: number) {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setPassed(window.scrollY > threshold)
        frame = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return passed
}

/**
 * Remembers (for the session) that the intro screen has already played,
 * so navigating back to the site does not replay it.
 */
export function useIntroGate(storageKey = 'agra:intro-seen') {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = window.sessionStorage.getItem(storageKey) === '1'
    const deepLink = Boolean(window.location.hash)
    return !seen && !deepLink && !reduce
  })

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(storageKey, '1')
    } catch {
      /* private mode — the intro simply plays again next visit */
    }
    setShowIntro(false)
  }, [storageKey])

  return { showIntro, dismiss }
}
