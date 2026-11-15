import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type WindowProps = {
  title: string
  children: ReactNode
  /** Optional element rendered on the right side of the title bar. */
  meta?: ReactNode
  tone?: 'paper' | 'inverse' | 'cream'
  className?: string
  barClassName?: string
  bodyClassName?: string
  /** Two decorative control boxes, as on a vintage system window. */
  controls?: boolean
  as?: 'div' | 'article' | 'aside' | 'form'
}

const toneClass = {
  paper: 'win',
  cream: 'win bg-cream',
  inverse: 'win win-inverse',
}

export function Window({
  title,
  children,
  meta,
  tone = 'paper',
  className,
  barClassName,
  bodyClassName,
  controls = true,
  as: Tag = 'div',
}: WindowProps) {
  return (
    <Tag className={cn(toneClass[tone], className)}>
      <div
        className={cn(
          'win-bar',
          tone === 'inverse' ? 'text-cream/60' : 'text-ink/55',
          barClassName,
        )}
      >
        {controls && <span className="win-box" aria-hidden="true" />}
        <span className="label flex-1 truncate">{title}</span>
        {meta}
        {controls && (
          <span className="flex items-center gap-1" aria-hidden="true">
            <span className="win-box" />
            <span className="win-box" />
          </span>
        )}
      </div>
      <div className={bodyClassName}>{children}</div>
    </Tag>
  )
}
