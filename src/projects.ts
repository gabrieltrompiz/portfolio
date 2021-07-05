import { Project } from 'portfolio';

export const projects: Project[] = [
  {
    title: 'Electra',
    id: 'electra',
    description: 'Lorem ipsum',
    backgroundColor: '#183642',
    titleColor: '#EAEAEA',
    textures: [],
    assets: [
      {
        url: '/images/electra/login.png',
        w: 1080,
        q: 75
      }
    ]
  },
  {
    title: 'FMS Stats',
    id: 'fms',
    description: 'Lorem ipsum',
    backgroundColor: '#7A9CC6',
    titleColor: '#FFFD98',
    textures: [],
    assets: [
      {
        url: '/images/fms/home.png',
        w: 1080,
        q: 75
      }
    ]
  },
  {
    title: 'Raven',
    id: 'raven',
    description: 'Lorem ipsum',
    backgroundColor: '#839788',
    titleColor: '#EEE0CB',
    textures: [],
    assets: [
      {
        url: '/images/raven/mockup.png',
        w: 1080,
        q: 75
      }
    ]
  },
  {
    title: 'Unnamed',
    id: 'lol',
    description: 'Lorem ipsum',
    backgroundColor: '#191919',
    titleColor: '#FFF',
    textures: [],
    assets: [
      {
        url: '/images/fms/home.png',
        w: 1080,
        q: 75
      }
    ]
  },
  {
    title: 'Reign',
    id: 'reign',
    description: 'Lorem ipsum',
    backgroundColor: '#353535',
    titleColor: '#D9D9D9',
    textures: [],
    assets: [
      {
        url: '/images/reign/description.png',
        w: 1080,
        q: 75
      }
    ]
  },
  {
    title: 'Portfolio',
    id: 'portfolio',
    description: 'Lorem ipsum',
    backgroundColor: '#191919',
    titleColor: '#FFF',
    textures: [],
    assets: [
      {
        url: '/images/portfolio/home.png',
        w: 1080,
        q: 75
      }
    ]
  },
];

export const totalProjects = projects.length;