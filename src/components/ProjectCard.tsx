import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { isPlaceholder } from '../data/projects'
import { cn } from '../lib/cn'
import { BrandIcon } from './ui/BrandIcon'
import { Window } from './ui/Window'

type ProjectCardProps = {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const empty = isPlaceholder(project)

  return (
    <Window
      className="group flex h-full flex-col"
      title={`project_${project.index}.fig`}
      barClassName="transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
      meta={
        <span
          className={cn(
            'label mr-1 hidden sm:inline',
            empty ? 'text-ink/35 group-hover:text-cream/50' : 'text-brick group-hover:text-cream',
          )}
        >
          {empty ? 'slot open' : 'published'}
        </span>
      }
    >
      <article className="flex flex-1 flex-col">
        {/* ---------------------------------------------------------- preview */}
        <div
          className={cn(
            'relative overflow-hidden border-b border-line bg-sand/45',
            wide ? 'h-56 sm:h-64 lg:h-80' : 'h-56 sm:h-64 lg:h-72',
          )}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`Preview of ${project.title}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* hairline crosshair — reads as an empty image slot, not a graphic */}
              <span
                className="absolute top-1/2 right-0 left-0 border-t border-ink/10"
                aria-hidden="true"
              />
              <span
                className="absolute top-0 bottom-0 left-1/2 border-l border-ink/10"
                aria-hidden="true"
              />

              <span
                className="display absolute bottom-6 left-3.5 text-[3.4rem] leading-none text-ink/15 select-none sm:text-[4rem]"
                aria-hidden="true"
              >
                {project.index}
              </span>

              <span className="label relative border border-ink/30 bg-cream/80 px-2.5 py-1.5 text-ink/45">
                preview — not available
              </span>

              {/* corner registration marks */}
              <span className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-ink/30" aria-hidden="true" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-ink/30" aria-hidden="true" />
              <span className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-ink/30" aria-hidden="true" />
              <span className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r border-b border-ink/30" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------ meta */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="label text-brick">{project.category}</span>
            <span className="label tabular-nums text-ink/30">{project.index}/05</span>
          </div>

          <h3
            className={cn(
              'display mt-2.5 text-[1.25rem] tracking-[-0.025em] sm:text-[1.45rem]',
              empty && 'text-ink/45',
            )}
          >
            {project.title || 'Untitled project'}
          </h3>

          <p className="mt-2 max-w-[52ch] text-[0.86rem] leading-relaxed text-ink/60">
            {project.summary ||
              'Summary pending. This slot is reserved for a project that is still being documented.'}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.length > 0 ? (
              project.stack.map((tech) => (
                <span
                  key={tech}
                  className="label border border-ink/20 px-2 py-1 text-ink/55"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="label border border-dashed border-ink/20 px-2 py-1 text-ink/30">
                stack pending
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-3">
            <span className="label text-ink/35">
              {empty ? 'Case study pending' : 'Case study available'}
            </span>

            <div className="flex items-center gap-2">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label flex items-center gap-1 text-ink/60 transition-colors hover:text-brick"
                >
                  <BrandIcon name="github" className="h-3 w-3" />
                  Source
                  <span className="sr-only">— {project.title} repository on GitHub</span>
                </a>
              )}
              {project.href && (
                <a href={project.href} className="btn btn-ghost px-3 py-2">
                  View project
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Window>
  )
}
