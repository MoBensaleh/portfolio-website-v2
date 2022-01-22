import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: `Airport Management System`,
    picture: 'images/ams.png',
    description: 'A desktop application intended for an airport to manage the day-to-day operations of its business, such as managing gates’ flights, managing employee schedules, managing flight schedules, etc. Built in an agile team of 5.',
    live: ``,
    github: 'https://github.com/MoBensaleh/AirportManagementSystem',
    technologies: ['Java', 'JavaFX', 'SQLite']
  },
  {
    title: `Omnee GetQuote`,
    picture: 'images/OmneeGetQuote.png',
    description: 'A multi-page form style website built for Omnee Technologies Inc. Worked on styling, SEO, and performance optimization.',
    live: 'https://getquote.omnee.ca/#/general/step1',
    github: '',
    technologies: ['VueJs', 'SCSS', 'Laravel']
  },
  {
    title: `Curses Labyrinth`,
    picture: `images/CursesLabyrinth.png`,
    description: 'A 2D top-down game in which a player must evade the AI and complete tasks within a procedurally generated map using items to aid them in their escape.',
    live: 'https://mobensaleh.itch.io/curses-labyrinth',
    github: 'https://github.com/MoBensaleh/CursesLabyrinth',
    technologies: ['Unity', 'C#']
  },
  {
    title: `Portfolio Website`,
    picture: 'images/Portfolio.png',
    description: 'My responsive portfolio website!',
    live: 'https://www.mohamedbensaleh.com/',
    github: 'https://github.com/MoBensaleh/portfolio-website-v2',
    technologies: ['NuxtJs', 'TypeScript', 'SCSS', 'GSAP']
  },
]