import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrolledPast } from '../../lib/hooks'

export function BackToTop() {
  const visible = useScrolledPast(720)
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          title="Back to top"
          aria-label="Back to top"
          className="fixed right-3 bottom-11 z-40 flex h-8 w-8 items-center justify-center border border-ink/25 bg-cream/90 text-ink/55 backdrop-blur-[2px] transition-colors hover:border-ink hover:bg-ink hover:text-paper md:right-4 md:bottom-12"
        >
          <ArrowUp size={13} strokeWidth={2} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
