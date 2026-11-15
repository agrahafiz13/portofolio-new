/**
 * Single source of truth for personal details.
 * Edit this file to update the contact points, availability and copy
 * that appear across the site.
 */

export const identity = {
  name: 'Agra Alfian Hafiz',
  firstName: 'Agra',
  lastInitial: 'A.',
  roles: ['Web Developer', 'Frontend Developer', 'IT Support'],
  roleLine: 'Web Developer | Frontend Developer | IT Support',
  email: 'agrahafiz2@gmail.com',
  phone: '08987892216',
  phoneInternational: '628987892216',
  location: 'Indonesia',
  availability: 'Available for work',
  headline: 'FrontEnd Developer\nNetworking & IT Support',
  description:
    'An aspiring Software and Frontend Developer with a background in computer networking, technical support, and digital development. Passionate about learning, solving problems, and creating meaningful digital solutions.',
  footerNote: 'Designed with curiosity. Built with technology.',
} as const

export const links = {
  email: `mailto:${identity.email}`,
  whatsapp: `https://wa.me/${identity.phoneInternational}`,
  /**
   * Placeholders — replace with your own profile URLs.
   * While a value is an empty string the matching button renders as a
   * disabled chip instead of a dead link.
   */
  github: '',
  linkedin: '',
} as const

/**
 * Set `VITE_CONTACT_ENDPOINT` in a `.env` file to POST the contact form
 * to a real backend (Formspree, a serverless function, your own API).
 * Without it the form falls back to a pre-filled mail draft.
 */
export const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''

export type NavItem = {
  id: string
  label: string
  index: string
  file: string
  blurb: string
}

export const navigation: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    index: '01',
    file: 'about.txt',
    blurb: 'Where the interest in technology started, and where it is heading.',
  },
  {
    id: 'skills',
    label: 'Skills',
    index: '02',
    file: 'skills.sys',
    blurb: 'The tools I reach for, grouped by discipline.',
  },
  {
    id: 'experience',
    label: 'Experience',
    index: '03',
    file: 'history.log',
    blurb: 'Hands-on roles across support, operations and frontend work.',
  },
  {
    id: 'education',
    label: 'Education',
    index: '04',
    file: 'school.doc',
    blurb: 'Networking fundamentals from vocational school.',
  },
  {
    id: 'work',
    label: 'Work',
    index: '05',
    file: 'projects.dir',
    blurb: 'Selected projects and the slots still waiting to be filled.',
  },
  {
    id: 'approach',
    label: 'Approach',
    index: '06',
    file: 'method.map',
    blurb: 'Understand, plan, build, improve — in that order.',
  },
  {
    id: 'contact',
    label: 'Contact',
    index: '07',
    file: 'contact.app',
    blurb: 'Email, WhatsApp and a form that really sends.',
  },
]

export const sectionIds = ['home', ...navigation.map((item) => item.id)]
