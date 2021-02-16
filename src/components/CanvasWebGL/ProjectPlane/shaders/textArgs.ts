import { Font, TextGeometry, TextGeometryParameters } from 'three';

export const getArgs = (title: string, font: Font): [text: string, parameters: TextGeometryParameters] => 
[
  title,
  {
    font,
    size: 0.03,
    height: 0.01,
    curveSegments: 24,
    bevelEnabled: false,
    bevelThickness: 0.02,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 0
  }
];