import { Project } from 'portfolio';
import { Vector3 } from 'three';

export const projects: Project[] = [
  {
    title: 'Electra: Team Collaboration App',
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
        url: '/images/raven/mockup.png',
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
    title: 'Unnamed: Statistics for LoL',
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
    title: 'Portfolio: Who doesn\'t like recursion?',
    id: 'portfolio',
    description: 'Lorem ipsum',
    point: new Vector3(0, 0, 0),
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

// Don't really know how to calculate this, need to think about it
export const DIFFERENCE = totalProjects * 0.00015;
export const FACTOR = (0.00390 - DIFFERENCE) * totalProjects;