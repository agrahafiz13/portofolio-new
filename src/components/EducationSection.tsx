import { GraduationCap } from 'lucide-react'
import { education } from '../data/experience'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Window } from './ui/Window'

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="04"
          kicker="Education"
          file="school.doc"
          title={<span id="education-title">Academic Background.</span>}
          aside="Where the networking fundamentals were learned — the base everything else is built on."
        />

        <Reveal>
          <Window
            title="school.doc"
            meta={
              <span className="label text-ink/40">
                {education.period.replace(/\s—\s/g, '–')}
              </span>
            }
            bodyClassName="grid gap-0 md:grid-cols-12"
          >
            <div className="border-b border-line p-5 sm:p-7 md:col-span-5 md:border-b-0 md:border-r">
              <GraduationCap
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
                className="text-brick"
              />
              <h3 className="display mt-5 text-[1.7rem] leading-[1] tracking-[-0.03em] sm:text-[2.1rem]">
                {education.school}
              </h3>
              <p className="mt-2 font-mono text-[0.78rem] leading-relaxed text-ink/60">
                {education.major}
              </p>

              <dl className="mt-6 border-t border-line-soft">
                <div className="flex items-baseline justify-between gap-3 border-b border-line-soft py-2">
                  <dt className="label text-ink/40">Programme</dt>
                  <dd className="label text-right text-ink/70">{education.majorLong}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-line-soft py-2">
                  <dt className="label text-ink/40">Period</dt>
                  <dd className="label text-ink/70">{education.period}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="label text-ink/40">Level</dt>
                  <dd className="label text-ink/70">Vocational secondary</dd>
                </div>
              </dl>
            </div>

            <div className="p-5 sm:p-7 md:col-span-7">
              <p className="label text-ink/40">Coursework</p>
              <p className="mt-3 max-w-[56ch] text-[0.95rem] leading-[1.8] text-ink/80">
                {education.description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {education.subjects.map((subject) => (
                  <li
                    key={subject}
                    className="label border border-ink/20 px-3 py-1.5 text-ink/60 transition-colors hover:border-ink/45 hover:bg-paper hover:text-ink"
                  >
                    {subject}
                  </li>
                ))}
              </ul>

              <p className="label mt-6 flex items-center gap-2 border-t border-line-soft pt-3 text-ink/35">
                <span className="led" aria-hidden="true" />
                Completed — {education.period}
              </p>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  )
}
