import { Project } from 'portfolio';
import { Vector3 } from 'three';

export const projects: Project[] = [
  {
    title: 'Electra: Collaboration App',
    id: 'electra',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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
    title: 'FMS Stats: Statistics for FMS',
    id: 'fms',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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
    title: 'Raven: Messaging App',
    id: 'raven',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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
    title: 'Pandagram: Social Media',
    id: 'pandagram',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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
    title: 'LoL: Statistics for LoL',
    id: 'lol',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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
    title: 'Portfolio: I Like Recursiveness',
    id: 'portfolio',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
    textures: [],
    assets: [
      {
        url: '/images/fms/home.png',
        w: 1080,
        q: 75
      }
    ]
  }
];

export const totalProjects = projects.length;