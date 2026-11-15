import { projects } from '../data/projects'
import { cn } from '../lib/cn'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const spans = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-12',
]

export function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="05"
          kicker="Selected works"
          file="projects.dir"
          title={<span id="work-title">Selected Works.</span>}
          aside="Five slots, arranged by discipline. Details are added here as each project is finished and documented."
        />

        <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
          {projects.map((project, index) => (
            <Reveal
              as="li"
              key={project.id}
              delay={index * 0.05}
              className={cn('h-full', spans[index] ?? 'lg:col-span-6')}
            >
              <ProjectCard project={project} wide={index === 4} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
          <span className="label text-ink/35">05 entries</span>
          <span className="label text-ink/45">
            Placeholder slots — no project details are published yet
          </span>
        </Reveal>
      </div>
    </section>
  )
}
