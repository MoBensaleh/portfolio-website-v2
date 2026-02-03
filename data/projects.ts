import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: 'Footy Fetch ⚽',
    picture: '/images/FootyFetch.png',
    description:
      'A MERN stack application designed to showcase my dual passions for soccer and cutting-edge technology, particularly in the realms of AI and data analytics. The application fetches and categorizes soccer-related posts from r/soccer, provides data analytics on posts and user interactions, and integrates with the OpenAI ChatGPT API for enriched user engagement.',
    live: 'https://footy-fetch.vercel.app/',
    github: 'https://github.com/MoBensaleh/Footy-Fetch',
    technologies: [
      'ReactJs',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MaterialUI',
      'SCSS/CSS',
      'Reddit API',
      'OpenAI ChatGPT API',
    ],
  },
  {
    title: 'Omnee AI',
    picture: '/images/OmneeAI.png',
    description:
      'Omnee is an AI home assistant mobile application which creates a 3D digital twin of each home you build, responds to every incoming inquiry, and submits clear and qualified service requests for buyers.',
    live: 'https://omneehome.app.link/dN4lCbvV2Vb?_p=c11c33dc9e067af1eb1f90ffecb2',
    github: '',
    website: 'https://www.omnee.ai/',
    technologies: [
      'Pytorch',
      'Google Document AI',
      'AWS Textract',
      'transformer NER',
      'YOLOv8/YOLO11',
      'SAM / SAM2',
      'OpenCLIP',
      'multimodal LLMs',
      'Flutter',
      'VueJs',
      'SCSS',
      'Laravel',
    ],
  },
  {
    title: 'Target Trainer Application',
    picture: '/images/TargetTrainer.png',
    description:
      "A JavaFX application that enables users to design and evaluate target-based user interfaces. The app features an editor that allows users to create, arrange, and modify targets, as well as a testing mode that measures their performance using Fitts' Law. Other features include undo/redo and clipboard support.",
    live: '',
    github: 'https://github.com/MoBensaleh/Target-Trainer-Application',
    technologies: ['Java', 'JavaFX'],
  },
  {
    title: 'A* Pathfinding Visualization',
    picture: '/images/Pathfinding.png',
    description:
      'A python visualization of the A* path finding algorithm. It allows you to pick your start and end location and view the process of finding the shortest path.',
    live: '',
    github: 'https://github.com/MoBensaleh/A-Path-Finding-Visualization',
    technologies: ['Python', 'PyGame'],
  },
  {
    title: 'Airport Management System',
    picture: '/images/ams.png',
    description:
      'A desktop application intended for an airport to manage the day-to-day operations of its business, such as managing gates’ flights, managing employee schedules, managing flight schedules, etc. Built in an agile team of 5.',
    live: '',
    github: 'https://github.com/MoBensaleh/AirportManagementSystem',
    technologies: ['Java', 'JavaFX', 'SQLite'],
  },
  {
    title: 'State Machine Visual Editor App',
    picture: '/images/VisualEditor.png',
    description:
      'The JavaFX project is an interactive editor for building state-machine diagrams. It has features for creating and editing nodes, linking them with transitions, and customizing their properties. It also has multiple synchronized views and is built with immediate-mode graphics and a complex MVC architecture.',
    live: '',
    github: 'https://github.com/MoBensaleh/Visual-Editor-App',
    technologies: ['Java', 'JavaFX'],
  },
  {
    title: 'Curses Labyrinth',
    picture: '/images/CursesLabyrinth.png',
    description:
      'A 2D top-down game in which a player must evade the AI and complete tasks within a procedurally generated map using items to aid them in their escape.',
    live: 'https://mobensaleh.itch.io/curses-labyrinth',
    github: 'https://github.com/MoBensaleh/CursesLabyrinth',
    technologies: ['Unity', 'C#'],
  },
  {
    title: 'Portfolio Website',
    picture: '/images/Portfolio.png',
    description: 'My responsive portfolio website!',
    live: 'https://www.mohamedbensaleh.com/',
    github: 'https://github.com/MoBensaleh/portfolio-website-v2',
    technologies: ['NuxtJs', 'TypeScript', 'SCSS', 'GSAP', 'Tailwindcss', 'Git'],
  },
]
