import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: `Airport Management System`,
    picture: 'images/ams.png',
    description: '',
    live: ``,
    github: 'https://github.com/MoBensaleh/AirportManagementSystem',
    technologies: ['Java', 'JavaFX', 'SQLite']
  },
  {
    title: `Omnee GetQuote`,
    picture: 'images/OmneeGetQuote.png',
    description: '',
    live: 'https://getquote.omnee.ca/#/general/step1',
    github: '',
    technologies: ['VueJs', 'SCSS', 'Laravel']
  },
  {
    title: `Curses Labyrinth`,
    picture: `images/CursesLabyrinth.png`,
    description: '',
    live: 'https://mobensaleh.itch.io/curses-labyrinth',
    github: 'https://github.com/MoBensaleh/CursesLabyrinth',
    technologies: ['Unity', 'C#']
  },
  {
    title: `Portfolio Website`,
    picture: 'images/Portfolio.png',
    description: '',
    live: 'https://www.mohamedbensaleh.com/',
    github: 'https://github.com/MoBensaleh/portfolio-website-v2',
    technologies: ['NuxtJs', 'TypeScript', 'SCSS', 'GSAP']
  },
]