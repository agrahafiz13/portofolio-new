import { identity } from '../data/site'
import { education } from '../data/experience'
import { FigCaption } from './ui/FigCaption'
import { Portrait } from './ui/Portrait'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Window } from './ui/Window'

const facts = [
  {
    label: 'Expertise',
    value: 'Frontend development, computer networking and IT support.',
  },
  {
    label: 'Experience',
    value: 'IT support and junior frontend work, plus operational and warehouse support.',
  },
  {
    label: 'Education',
    value: `${education.school} — ${education.major}, ${education.period}.`,
  },
  {
    label: 'Approach',
    value: 'Understand the problem, plan the structure, build it, then improve it.',
  },
]

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="01"
          kicker="About"
          file="about.txt"
          title={<span id="about-title">A Little About Me.</span>}
          aside="A short introduction: where the interest in technology started, and where it is heading."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ----------------------------------------------------------- copy */}
          <div className="lg:col-span-7">
            <Reveal className="space-y-5 text-[0.98rem] leading-[1.8] text-ink/85 md:text-[1.05rem]">
              <p>
                I am <strong className="font-medium text-ink">{identity.name}</strong>, a graduate of
                Computer and Network Engineering (TKJ) with a deep interest in information
                technology.
              </p>
              <p>
                It started with a passion for computer networking. From there the interest grew
                toward software development and frontend work — building the interface people
                actually touch, not just the infrastructure underneath it.
              </p>
              <p>
                I like learning new things, solving technical problems, and building digital
                solutions that are genuinely useful. Right now I keep sharpening my coding and web
                development skills, with the goal of becoming an IT professional who is competent
                and adaptable.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <dl className="border-t border-line">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-1 gap-1 border-b border-line-soft py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <dt className="label pt-0.5 text-ink/40">{fact.label}</dt>
                    <dd className="text-[0.9rem] leading-relaxed text-ink/80">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* -------------------------------------------------------- portrait */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <Window title="portrait.jpg" meta={<span className="label text-ink/40">1200×1500</span>}>
                <div className="p-2.5">
                  <Portrait />
                </div>
                <div className="flex items-center justify-between border-t border-line px-2.5 py-2">
                  <span className="label text-ink/40">Fig. 02</span>
                  <span className="label text-ink/40">{identity.location}</span>
                </div>
              </Window>

              <FigCaption figure="02" className="mt-3">
                {identity.name} — frontend &amp; IT support
              </FigCaption>

              <div className="mt-6 border border-ink bg-paper px-4 py-3.5">
                <p className="font-mono text-[0.72rem] leading-[1.9] text-ink/60">
                  <span className="text-brick">&gt;</span> focus&nbsp;&nbsp;= frontend_development
                  <br />
                  <span className="text-brick">&gt;</span> base&nbsp;&nbsp;&nbsp;= {identity.location}
                  <br />
                  <span className="text-brick">&gt;</span> status&nbsp;= learning &amp; building
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
