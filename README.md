# Agra Alfian Hafiz — Portfolio

A single-page portfolio built as a vintage-desktop interface: warm cream paper,
vintage red accents, monospace labels and windows that behave like a 1984
operating system. Built with React, TypeScript, Tailwind CSS and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
npm run lint
```

Requires Node.js 20 or newer.

## Where things live

```
src/
  components/            one file per section of the page
    ui/                  reusable primitives (Window, SectionHeader, Reveal …)
  data/                  every piece of content on the site
    site.ts              name, contact details, links, navigation
    skills.ts            skill groups
    experience.ts        experience, education, working approach
    projects.ts          selected works (see below)
  lib/
    cn.ts                className helper
    hooks.ts             scroll spy, clock, intro gate, pointer detection
  index.css              design tokens, window chrome, buttons, type scale
```

### Content

Almost all copy lives in `src/data`. Edit those files rather than the JSX.

| Change | File |
| --- | --- |
| Name, headline, bio, email, phone, availability | `src/data/site.ts` |
| GitHub / LinkedIn URLs | `src/data/site.ts` → `links` |
| Skill groups and their items | `src/data/skills.ts` |
| Experience, education, approach steps | `src/data/experience.ts` |
| Navigation labels and section order | `src/data/site.ts` → `navigation` |

### Portrait

Drop a portrait photograph at `public/images/portrait.jpg` (portrait crop,
around 1200 × 1500). The placeholder frame is replaced automatically; no code
change is required. Until then a designed "missing image" frame is shown.

### Selected works

`src/data/projects.ts` ships with five deliberately empty slots — one per
discipline. Nothing is invented: no project names, results or repository URLs.
Fill in `title`, `summary`, `stack`, `href`, `repo` and optionally `image`
(`/images/projects/your-file.jpg`) for a slot and its card switches from the
placeholder layout to the full one:

```ts
{
  id: 'web',
  index: '01',
  category: 'Web Development',
  title: 'Project name',
  summary: 'One or two sentences about the problem and what you built.',
  stack: ['Laravel', 'MySQL'],
  href: 'https://example.com',
  repo: 'https://github.com/…',
  image: '/images/projects/web.jpg',
}
```

## Contact form

The form validates on submit (name, email, subject, message) and then:

- **With `VITE_CONTACT_ENDPOINT` set** — sends a JSON `POST` to that URL
  (Formspree, a serverless function, your own API). Success and failure states
  are shown inline.
- **Without it** — opens the visitor's mail client with the message pre-filled
  and addressed to `agrahafiz2@gmail.com`. Nothing pretends to be delivered
  when it is not.

To enable the endpoint path, copy `.env.example` to `.env` and fill it in.

## Notes

- The intro screen plays once per session, can be skipped at any time, and is
  skipped entirely for `prefers-reduced-motion` or deep links.
- Every animation and the custom cursor respect `prefers-reduced-motion`;
  the cursor never replaces the native pointer.
- Colours, type and spacing are tokens in `src/index.css` (`@theme`). Changing
  the palette there updates the whole site.
