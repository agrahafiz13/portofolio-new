import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { identity, links } from '../data/site'
import { BrandIcon } from './ui/BrandIcon'
import { ContactForm } from './ContactForm'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { Window } from './ui/Window'

type Row = {
  label: string
  value: string
  href: string
  icon: ReactNode
  external?: boolean
}

const rows: Row[] = [
  {
    label: 'Email',
    value: identity.email,
    href: links.email,
    icon: <Mail size={13} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    label: 'Phone',
    value: identity.phone,
    href: `tel:+${identity.phoneInternational}`,
    icon: <Phone size={13} strokeWidth={1.75} aria-hidden="true" />,
  },
  {
    label: 'WhatsApp',
    value: identity.phone,
    href: links.whatsapp,
    icon: <BrandIcon name="whatsapp" className="h-3 w-3" />,
    external: true,
  },
]

type Social = {
  label: string
  href: string
  icon: ReactNode
}

const socials: Social[] = [
  { label: 'LinkedIn', href: links.linkedin, icon: <BrandIcon name="linkedin" className="h-3.5 w-3.5" /> },
  { label: 'GitHub', href: links.github, icon: <BrandIcon name="github" className="h-3.5 w-3.5" /> },
]

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section section-rule">
      <div className="shell">
        <SectionHeader
          index="07"
          kicker="Contact"
          file="contact.app"
          title={<span id="contact-title">Have a Project in Mind?</span>}
          aside="I'm always interested in learning, collaborating, and exploring new opportunities. Let's connect and build something meaningful."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* -------------------------------------------------------- details */}
          <div className="lg:col-span-5">
            <Reveal>
              <Window
                title="contact.vcf"
                meta={<span className="label hidden text-ink/40 sm:inline">3 entries</span>}
              >
                <ul>
                  {rows.map((row) => (
                    <li key={row.label}>
                      <a
                        href={row.href}
                        target={row.external ? '_blank' : undefined}
                        rel={row.external ? 'noreferrer noopener' : undefined}
                        className="group flex items-center justify-between gap-4 border-b border-line-soft px-4 py-3.5 transition-colors hover:bg-cream"
                      >
                        <span className="min-w-0">
                          <span className="label flex items-center gap-1.5 text-ink/40">
                            {row.icon}
                            {row.label}
                          </span>
                          <span className="mt-1 block truncate font-mono text-[0.82rem] text-ink/85">
                            {row.value}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="flex-none text-ink/25 transition-colors group-hover:text-brick"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="label flex items-center gap-1.5 text-ink/40">
                    <MapPin size={12} strokeWidth={1.75} aria-hidden="true" />
                    Location
                  </span>
                  <span className="label text-ink/70">{identity.location}</span>
                </div>
              </Window>

              <div className="mt-5">
                <p className="label text-ink/35">Elsewhere</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {socials.map((social) =>
                    social.href ? (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="btn btn-ghost"
                        >
                          {social.icon}
                          {social.label}
                        </a>
                      </li>
                    ) : (
                      <li key={social.label}>
                        <span
                          aria-disabled="true"
                          title="Add your profile URL in src/data/site.ts"
                          className="btn btn-ghost cursor-not-allowed opacity-45 hover:translate-y-0"
                        >
                          {social.icon}
                          {social.label}
                          <span className="sr-only">— profile link not added yet</span>
                        </span>
                      </li>
                    ),
                  )}
                </ul>
                <p className="label mt-2 pr-12 text-ink/30 sm:pr-0">
                  Profile links are added once the accounts are published
                </p>
              </div>

              <div className="mt-6 border border-ink bg-paper px-4 py-3.5">
                <p className="font-mono text-[0.72rem] leading-[1.9] text-ink/60">
                  <span className="text-brick">&gt;</span> prefer&nbsp;= email or whatsapp
                  <br />
                  <span className="text-brick">&gt;</span> based&nbsp;&nbsp;= {identity.location}
                  <br />
                  <span className="text-brick">&gt;</span> open&nbsp;&nbsp;&nbsp;= collaboration,
                  junior roles
                </p>
              </div>
            </Reveal>
          </div>

          {/* ----------------------------------------------------------- form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
