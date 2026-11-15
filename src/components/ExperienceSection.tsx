import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../data/experience'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function ExperienceSection() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" aria-labelledby="experience-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="03"
          kicker="Experience"
          file="history.log"
          title={<span id="experience-title">Where I&apos;ve Been.</span>}
          aside="Two roles, both hands-on: hardware in the field and code on the screen."
        />

        <ol className="relative">
          {experience.map((entry, index) => (
            <Reveal as="li" key={entry.company} delay={index * 0.08} className={index === 0 ? 'relative pb-10' : 'relative'}>
              <div className="grid gap-4 md:grid-cols-[3.5rem_1fr] md:gap-6 lg:grid-cols-[5rem_1fr_9rem]">
                {/* index */}
                <div className="md:pt-0">
                  <span className="display block text-[1.5rem] leading-none text-brick md:text-[1.9rem]">
                    {entry.index}
                  </span>
                </div>

                <div className="relative border-l border-line pl-5 md:pl-6">
                  {/* the red timeline segment */}
                  <span
                    className="absolute top-2 -left-[4.5px] h-2 w-2 bg-brick ring-4 ring-cream"
                    aria-hidden="true"
                  />
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className={`absolute top-4 left-0 w-px origin-top bg-brick/50 ${
                        index === experience.length - 1 ? 'bottom-0' : '-bottom-10'
                      }`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                    />
                  )}

                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <h3 className="display text-[1.35rem] tracking-[-0.025em] md:text-[1.7rem]">
                      {entry.company}
                    </h3>
                  </div>

                  <p className="label mt-1.5 text-brick">{entry.role}</p>
                  <p className="label mt-1 text-ink/40 lg:hidden">{entry.period}</p>

                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[0.9rem] leading-relaxed text-ink/75 md:text-[0.95rem]"
                      >
                        <span className="mt-[0.6em] h-1 w-1 flex-none bg-ink/35" aria-hidden="true" />
                        <span className="max-w-[62ch]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden lg:block">
                  <span className="label block border-t border-line pt-1.5 text-ink/45">
                    {entry.period}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
          <span className="label text-ink/35">End of record</span>
          <span className="label text-ink/45">02 positions — 2023 → 2026</span>
        </Reveal>
      </div>
    </section>
  )
}
