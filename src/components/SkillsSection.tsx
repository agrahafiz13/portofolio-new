import { skillGroups } from '../data/skills'
import { cn } from '../lib/cn'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Window } from './ui/Window'

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="02"
          kicker="Technical skills"
          file="skills.sys"
          title={<span id="skills-title">Tools I Work With.</span>}
          aside="Grouped by discipline. No proficiency percentages — only the tools I have actually worked with."
        />

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon
            return (
              <Reveal
                as="li"
                key={group.id}
                delay={index * 0.06}
                className={cn(
                  'group h-full',
                  index === 0 && 'lg:col-span-2',
                )}
              >
                <Window
                  className="flex h-full flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1"
                  title={group.file}
                  barClassName="transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
                  meta={
                    <Icon
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="mr-1 text-brick transition-colors group-hover:text-cream"
                    />
                  }
                >
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="display text-[1.15rem] tracking-[-0.02em] sm:text-[1.3rem]">
                      {group.title}
                    </h3>
                    <p className="mt-1.5 max-w-[38ch] text-[0.82rem] leading-relaxed text-ink/55">
                      {group.note}
                    </p>

                    <ul className="mt-4 flex-1 border-t border-line-soft">
                      {group.items.map((item, itemIndex) => (
                        <li
                          key={item}
                          className="flex items-baseline justify-between gap-3 border-b border-line-soft py-2 font-mono text-[0.76rem] text-ink/80"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="text-[0.6rem] text-brick" aria-hidden="true">
                              ▸
                            </span>
                            {item}
                          </span>
                          <span className="text-[0.6rem] tabular-nums text-ink/25">
                            {String(itemIndex + 1).padStart(2, '0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Window>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
