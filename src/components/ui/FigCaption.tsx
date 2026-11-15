import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type FigCaptionProps = {
  figure: string
  children: ReactNode
  className?: string
}

/** The small technical caption that anchors every visual on the page. */
export function FigCaption({ figure, children, className }: FigCaptionProps) {
  return (
    <p className={cn('label flex items-baseline gap-2 text-ink/55', className)}>
      <span className="text-brick">Fig. {figure}</span>
      <span className="h-px w-4 bg-ink/25" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
