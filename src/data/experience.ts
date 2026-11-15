export type ExperienceEntry = {
  index: string
  company: string
  role: string
  period: string
  points: string[]
}

export const experience: ExperienceEntry[] = [
  {
    index: '01',
    company: 'PT. Timpat Digital Asia',
    role: 'IT Support & Junior Frontend Developer',
    period: '2023',
    points: [
      'Carried out maintenance and servicing of computer hardware and workstations.',
      'Joined the operations team to install scanning devices for the ordering system at M Bloc Space.',
      'Supported day-to-day technical and operational requirements on site.',
    ],
  },
  {
    index: '02',
    company: 'PT. Lahir Barutam',
    role: 'Staff',
    period: '2023 — 2026',
    points: [
      'Performed maintenance and upkeep of the transport truck fleet.',
      'Helped fulfil goods and spare-part requirements for the mechanics.',
      'Assisted with the supply and management of warehouse stock.',
      'Handled IT support for networking and office systems.',
    ],
  },
]

export type EducationEntry = {
  school: string
  major: string
  majorLong: string
  period: string
  description: string
  subjects: string[]
}

export const education: EducationEntry = {
  school: 'SMK VOCTECH 2',
  major: 'Teknik Komputer dan Jaringan (TKJ)',
  majorLong: 'Computer and Network Engineering',
  period: '2020 — 2023',
  description:
    'Studied computer and network management, router and Mikrotik configuration, network administration, computer setup, and operating system management.',
  subjects: [
    'Computer & network management',
    'Router and Mikrotik configuration',
    'Network administration',
    'Computer configuration',
    'Operating system management',
  ],
}

export const approachSteps = [
  {
    index: '01',
    title: 'Understand',
    body: 'Understand the requirements, the goals and the actual problem before touching a keyboard.',
  },
  {
    index: '02',
    title: 'Plan',
    body: 'Structure the pages, choose the technology, and sketch the solution before building it.',
  },
  {
    index: '03',
    title: 'Build',
    body: 'Develop the solution with attention to functionality, readability and everyday quality.',
  },
  {
    index: '04',
    title: 'Improve',
    body: 'Test what was built, review the result, and fix what does not hold up in use.',
  },
]
