import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { identity, links } from '../data/site'
import { BrandIcon } from './ui/BrandIcon'
import { FigCaption } from './ui/FigCaption'
import { Reveal } from './ui/Reveal'
import { Window } from './ui/Window'

const terminalLines = [
  { prompt: 'whoami', output: 'agra_alfian_hafiz' },
  { prompt: 'role --list', output: 'web_developer / frontend_developer / it_support' },
  { prompt: 'location', output: 'indonesia' },
]

export function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative pt-14 pb-9 md:pt-16">
      <div className="shell">
        <div className="flex items-center justify-between gap-4 border-b border-line py-3">
          <span className="label text-ink/45">Portfolio — 2026</span>
          <span className="label flex items-center gap-2 text-ink/70">
            <span className="led" aria-hidden="true" />
            {identity.availability}
          </span>
        </div>

        <div className="grid gap-12 pt-10 pb-10 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-12">
          {/* ---------------------------------------------- editorial column */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal onMount>
              <h1
                id="hero-title"
                className="display text-[clamp(2.85rem,10.5vw,6.4rem)] leading-[0.86]"
              >
                <span className="block">Agra Alfian</span>
                <span className="block">
                  Hafiz
                  <span className="ml-1 inline-block h-[0.13em] w-[0.13em] bg-brick align-baseline" />
                </span>
              </h1>
            </Reveal>

            <Reveal onMount delay={0.08} className="mt-8 max-w-[32ch] md:mt-10">
              <p className="display text-[clamp(1.3rem,2.9vw,1.9rem)] leading-[1.08] tracking-[-0.02em] text-ink">
                {identity.headline}
              </p>
            </Reveal>

            <Reveal onMount delay={0.14} className="mt-6 max-w-[52ch]">
              <p className="lede text-[0.95rem] md:text-base">{identity.description}</p>
            </Reveal>

            <Reveal onMount delay={0.2} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-solid">
                Explore my work
                <ArrowDownRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal onMount delay={0.26} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label flex items-center gap-1.5 text-ink/50">
                <MapPin size={12} strokeWidth={1.75} aria-hidden="true" />
                {identity.location}
              </span>
              <span className="label hidden text-ink/25 sm:inline" aria-hidden="true">
                /
              </span>
              <span className="label text-ink/50">TKJ — Computer &amp; Network Engineering</span>
            </Reveal>
          </div>

          {/* ------------------------------------------------ technical column */}
          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-8 xl:pl-10">
            <Reveal onMount delay={0.12}>
              <Window
                tone="inverse"
                title="agra@workstation — zsh"
                meta={<span className="label text-cream/40">80×24</span>}
                bodyClassName="p-4 font-mono text-[0.72rem] leading-[1.9] sm:text-xs"
              >
                <dl className="space-y-3">
                  {terminalLines.map((line) => (
                    <div key={line.prompt}>
                      <dt className="text-cream/85">
                        <span className="text-brick">$ </span>
                        {line.prompt}
                      </dt>
                      <dd className="pl-4 text-cream/55">{line.output}</dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-cream/85">
                      <span className="text-brick">$ </span>status
                    </dt>
                    <dd className="flex items-center gap-2 pl-4 text-cream/80">
                      <span className="led" aria-hidden="true" />
                      available_for_work
                    </dd>
                  </div>
                </dl>

                <p className="mt-3 text-cream/85">
                  <span className="text-brick">$ </span>
                  <span className="cursor-block align-middle text-cream" aria-hidden="true" />
                </p>
              </Window>

              <FigCaption figure="01" className="mt-3">
                Agra@workstation — ready for input
              </FigCaption>

              <div className="mt-6 flex flex-wrap items-center gap-px border border-line bg-line">
                <a
                  href={links.email}
                  className="label flex flex-1 items-center justify-center gap-1.5 bg-cream px-3 py-2.5 text-ink/70 transition-colors hover:bg-paper hover:text-brick"
                >
                  <Mail size={13} strokeWidth={1.75} aria-hidden="true" />
                  Email
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label flex flex-1 items-center justify-center gap-1.5 bg-cream px-3 py-2.5 text-ink/70 transition-colors hover:bg-paper hover:text-brick"
                >
                  <BrandIcon name="whatsapp" className="h-3 w-3" />
                  WhatsApp
                </a>
                {links.github ? (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label flex flex-1 items-center justify-center gap-1.5 bg-cream px-3 py-2.5 text-ink/70 transition-colors hover:bg-paper hover:text-brick"
                  >
                    <BrandIcon name="github" className="h-3 w-3" />
                    GitHub
                  </a>
                ) : (
                  <span className="label flex flex-1 items-center justify-center gap-1.5 bg-cream px-3 py-2.5 text-ink/35">
                    <BrandIcon name="github" className="h-3 w-3" />
                    GitHub
                    <span className="sr-only">— link not set yet</span>
                  </span>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------------------------ ledger */}
        <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {[
            { k: 'Fig.', v: '01 — Hero' },
            { k: 'Base', v: 'Indonesia' },
            { k: 'Focus', v: 'Frontend & IT support' },
            { k: 'Scroll', v: '↓ 07 sections' },
          ].map((cell, index) => (
            <div
              key={cell.k}
              className={`flex items-baseline gap-2 py-2.5 ${
                index % 2 === 1 ? 'pl-4' : ''
              } md:border-l md:border-line md:pl-4 md:first:border-l-0 md:first:pl-0`}
            >
              <span className="label text-ink/35">{cell.k}</span>
              <span className="label text-ink/70">{cell.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
