import { ArrowRight } from 'lucide-react'
import { approachSteps } from '../data/experience'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Window } from './ui/Window'

export function ApproachSection() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="06"
          kicker="Working approach"
          file="method.map"
          title={<span id="approach-title">How I Approach Things.</span>}
          aside="Four stages, in order. Small enough to move quickly, structured enough not to lose the plot."
        />

        <Reveal>
          <Window
            title="approach.sys"
            meta={<span className="label hidden text-ink/40 sm:inline">4 stages</span>}
            bodyClassName=""
          >
            <ol className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {approachSteps.map((step, index) => (
                <li
                  key={step.index}
                  className="group relative flex flex-col bg-paper p-5 transition-colors duration-300 hover:bg-cream sm:p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="label text-brick">{step.index}</span>
                    <span className="label text-ink/25">
                      {String(approachSteps.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="display mt-6 text-[1.35rem] tracking-[-0.025em] sm:text-[1.5rem]">
                    {step.title}
                  </h3>

                  <p className="mt-2 flex-1 text-[0.86rem] leading-relaxed text-ink/65">
                    {step.body}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-3">
                    <span className="label text-ink/30">stage</span>
                    {index < approachSteps.length - 1 ? (
                      <ArrowRight
                        size={14}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="text-ink/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brick"
                      />
                    ) : (
                      <span className="h-1.5 w-1.5 bg-brick" aria-hidden="true" />
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-2.5">
              <span className="label flex items-center gap-2 text-ink/40">
                <span className="led" aria-hidden="true" />
                Workflow ready
              </span>
              <span className="label text-ink/35">
                understand → plan → build → improve
              </span>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  )
}
