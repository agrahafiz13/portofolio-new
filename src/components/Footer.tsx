import { ArrowUp } from 'lucide-react'
import { identity, links, navigation } from '../data/site'
import { BrandIcon } from './ui/BrandIcon'
import { Reveal } from './ui/Reveal'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-ink bg-cream">
      <div className="shell pt-12 pb-6 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="label text-ink/35">End of file</p>
            <p className="display mt-3 text-[clamp(1.9rem,5.5vw,3.4rem)] leading-[0.92]">
              {identity.name}
            </p>
            <p className="label mt-3 text-ink/55">{identity.roleLine}</p>

            <p className="mt-6 max-w-[34ch] text-[0.9rem] leading-relaxed text-ink/60">
              {identity.footerNote}
            </p>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-3">
            <p className="label text-ink/35">Index</p>
            <ul className="mt-3 space-y-1.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-line label text-ink/65 transition-colors hover:text-brick"
                  >
                    <span className="text-ink/25">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-3">
            <p className="label text-ink/35">Elsewhere</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a
                  href={links.email}
                  className="link-line label text-ink/65 transition-colors hover:text-brick"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line label text-ink/65 transition-colors hover:text-brick"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                {links.github ? (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line label text-ink/65 transition-colors hover:text-brick"
                  >
                    <BrandIcon name="github" className="h-3 w-3" />
                    GitHub
                  </a>
                ) : (
                  <span aria-disabled="true" className="label flex items-center gap-1.5 text-ink/30">
                    <BrandIcon name="github" className="h-3 w-3" />
                    GitHub
                    <span className="text-[0.5625rem]">pending</span>
                  </span>
                )}
              </li>
              <li>
                {links.linkedin ? (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line label text-ink/65 transition-colors hover:text-brick"
                  >
                    <BrandIcon name="linkedin" className="h-3 w-3" />
                    LinkedIn
                  </a>
                ) : (
                  <span aria-disabled="true" className="label flex items-center gap-1.5 text-ink/30">
                    <BrandIcon name="linkedin" className="h-3 w-3" />
                    LinkedIn
                    <span className="text-[0.5625rem]">pending</span>
                  </span>
                )}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-4 pb-10 md:flex-row md:items-center md:justify-between md:pb-6">
          <p className="label text-ink/40">
            &copy; {year} {identity.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="label hidden text-ink/30 sm:inline">SYS 1984 — end of page</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="label flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-ink/60 transition-colors hover:border-ink hover:text-ink"
            >
              Back to top
              <ArrowUp size={12} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
