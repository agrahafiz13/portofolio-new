/**
 * Selected works.
 *
 * These five slots are intentionally empty: no project names, outcomes,
 * user counts or repository URLs are invented here. Fill in `title`,
 * `summary`, `stack`, `href` and `repo` once a project is ready to be
 * published — the card switches from its placeholder state to the full
 * layout automatically.
 *
 * `image` accepts anything served from /public, e.g. '/images/projects/web-app.jpg'.
 */

export type Project = {
  id: string
  index: string
  category: string
  title: string
  summary: string
  stack: string[]
  href: string
  repo: string
  image: string
}

const emptyProject = (id: string, index: string, category: string): Project => ({
  id,
  index,
  category,
  title: '',
  summary: '',
  stack: [],
  href: '',
  repo: '',
  image: '',
})

export const projects: Project[] = [
  emptyProject('web', '01', 'Web Development'),
  emptyProject('mobile', '02', 'Mobile Application Development'),
  emptyProject('interface', '03', 'UI/UX Implementation'),
  emptyProject('database', '04', 'Database Integration'),
  emptyProject('infrastructure', '05', 'Networking & IT Solutions'),
]

export const isPlaceholder = (project: Project) => project.title.trim().length === 0
