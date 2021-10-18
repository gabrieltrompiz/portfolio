import React from 'react';
import { MeshProps } from '@react-three/fiber';
import fragment from './shaders/fragment';
import vertex from './shaders/vertex';

const uniforms = {
  uAlpha: { value: 1 }
}

const Overlay: React.FC<MeshProps> = (props) => (
  <mesh
    {...props}
  >
    <planeBufferGeometry args={[2, 2, 1, 1]} />
    <shaderMaterial
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={uniforms}
      transparent
    />
  </mesh>
);

export default Overlay;