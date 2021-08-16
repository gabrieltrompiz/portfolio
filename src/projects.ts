import { Project } from 'portfolio';

enum ProjectType {
  'PERSONAL' = 'Personal',
  'PROMOTIONAL' = 'Promotional',
  'UNIVERSITY' = 'University'
}

export const projects: Project[] = [
  {
    title: 'Electra',
    id: 'electra',
    description: 'Issue tracking and communication platform making use of GitHub API',
    backgroundColor: '#183642',
    titleColor: '#EAEAEA',
    textures: [],
    assets: [
      {
        url: '/images/electra/login.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'December 2019',
    type: ProjectType['UNIVERSITY'],
    role: 'FULLSTACK DEV'
  },
  {
    title: 'FMS Stats',
    id: 'fms',
    description: 'Page dedicated to provide insights and stats to FMS (Freestyle Master Series) watchers',
    backgroundColor: '#7A9CC6',
    titleColor: '#FFFD98',
    textures: [],
    assets: [
      {
        url: '/images/fms/home.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'July 2020',
    type: ProjectType['PERSONAL'],
    role: 'BACKEND DEV'
  },
  {
    title: 'Raven',
    id: 'raven',
    description: 'Cross-platform messaging app, built for a college subject',
    backgroundColor: '#839788',
    titleColor: '#EEE0CB',
    textures: [],
    assets: [
      {
        url: '/images/raven/mockup.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'September 2019',
    type: ProjectType['UNIVERSITY'],
    role: 'FULLSTACK DEV'
  },
  {
    title: 'Unnamed',
    id: 'lol',
    description: 'Mobile application for tier lists and profile tracking for League of Legends players',
    backgroundColor: '#191919',
    titleColor: '#FFFFFF',
    textures: [],
    assets: [
      {
        url: '/images/fms/home.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'May 2019',
    type: ProjectType['PERSONAL'],
    role: 'FULLSTACK DEV'
  },
  {
    title: 'Reign',
    id: 'reign',
    description: 'Test provided by a contractor. Covers subjects like Docker, React, Nest.js and MongoDB',
    backgroundColor: '#353535',
    titleColor: '#D9D9D9',
    textures: [],
    assets: [
      {
        url: '/images/reign/description.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'December 2020',
    type: ProjectType['PERSONAL'],
    role: 'FULLSTACK DEV'
  },
  {
    title: 'Portfolio',
    id: 'portfolio',
    description: 'This very same portfolio, giving a try to Three.js',
    backgroundColor: '#191919',
    titleColor: '#FFFFFF',
    textures: [],
    assets: [
      {
        url: '/images/portfolio/home.png',
        w: 1080,
        q: 75
      }
    ],
    completedDate: 'July 2021',
    type: ProjectType['PERSONAL'],
    role: 'FULLSTACK DEV'
  },
];

export const totalProjects = projects.length;