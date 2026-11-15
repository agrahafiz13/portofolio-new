import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  section: motion.section,
  span: motion.span,
} as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: keyof typeof tags
  /** Travel distance in px; keep small so the page never feels animated for its own sake. */
  distance?: number
  /** Animate immediately on mount instead of waiting for the viewport. */
  onMount?: boolean
}

/** A restrained fade-up that fires once when the element enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  distance = 18,
  onMount = false,
}: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = tags[as]

  if (reduce) {
    return <Tag className={className}>{children}</Tag>
  }

  const transition = { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as const }

  if (onMount) {
    return (
      <Tag className={cn(className)} initial={{ opacity: 0, y: distance }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={transition}
    >
      {children}
    </Tag>
  )
}
