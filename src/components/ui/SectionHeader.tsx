import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type SectionHeaderProps = {
  index: string
  kicker: string
  title: ReactNode
  file: string
  aside?: ReactNode
  className?: string
}

/**
 * The editorial header shared by every section: a rule, a filing line
 * (section number + file name) and an oversized title against a note.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  file,
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('mb-12 md:mb-16', className)}>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
        <span className="label text-brick">
          {index} <span className="text-ink/30">/</span> {kicker}
        </span>
        <span className="label text-ink/40">{file}</span>
      </div>

      <div className="mt-7 grid items-end gap-6 md:mt-9 md:grid-cols-12 md:gap-10">
        <h2 className="display text-[clamp(2.15rem,5.2vw,3.9rem)] md:col-span-7">{title}</h2>
        {aside && (
          <div className="text-[0.95rem] leading-relaxed text-ink/70 md:col-span-5 md:max-w-[34ch] md:justify-self-end">
            {aside}
          </div>
        )}
      </div>
    </header>
  )
}
