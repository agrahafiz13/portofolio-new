import { Blocks, Database, Handshake, Network, Wrench, type LucideIcon } from 'lucide-react'

export type SkillGroup = {
  id: string
  title: string
  file: string
  note: string
  icon: LucideIcon
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    file: 'frontend.sys',
    note: 'Interface work, from markup to mobile.',
    icon: Blocks,
    items: ['HTML', 'CSS', 'JavaScript', 'Flutter'],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    file: 'backend.db',
    note: 'Server-side logic and persistent data.',
    icon: Database,
    items: ['Laravel', 'MySQL', 'Supabase'],
  },
  {
    id: 'networking',
    title: 'Networking & IT Support',
    file: 'network.cfg',
    note: 'Hardware, cabling, routers and the people using them.',
    icon: Network,
    items: ['Computer Networking', 'Mikrotik', 'Computer Maintenance', 'IT Support'],
  },
  {
    id: 'tools',
    title: 'Tools & Productivity',
    file: 'tools.exe',
    note: 'The everyday kit around the craft.',
    icon: Wrench,
    items: ['Git', 'GitHub', 'Microsoft Office'],
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    file: 'soft.skl',
    note: 'How the work gets done with other people.',
    icon: Handshake,
    items: ['Problem Solving', 'Teamwork'],
  },
]
