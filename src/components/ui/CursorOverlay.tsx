import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer } from '../../lib/hooks'

/**
 * A block cursor that trails the real pointer. Purely decorative: the
 * native cursor stays visible and nothing here intercepts events.
 * Disabled on touch devices and for reduced-motion users.
 */
export function CursorOverlay() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 700, damping: 48, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 700, damping: 48, mass: 0.3 })

  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!fine || reduce) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      setActive(Boolean(target?.closest('a, button, input, textarea, select, [role="button"]')))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[120] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block h-2.5 w-2.5 border border-brick"
        animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ translate: '-50% -50%' }}
      />
    </motion.div>
  )
}
