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
  }
];