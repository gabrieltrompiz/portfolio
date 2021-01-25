
import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { Clock, Color, Mesh, ShaderMaterial, Vector2 } from 'three';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';

const uniforms = {
  uBigWavesElevation: { value: 0 },
  uBigWavesFrequency: { value: new Vector2(0, 0) },
  uTime: { value: 0 },
  uBigWavesSpeed: { value: 0.06 },
  uDepthColor: { value: new Color(0xFFFFFF) },
  uSurfaceColor: { value: new Color(0x000000) },
  uColorOffset: { value: 0.15 },
  uColorMultiplier: { value: 5 },
  uSmallWavesElevation: { value: 0.1 },
  uSmallWavesFrequency: { value: 4 },
  uSmallWavesSpeed: { value: 0.1 },
  uSmallIterations: { value: 4 },
  uOpacity: { value: 1 }
}

const Water: React.FC<MeshProps> = (props) => {
  const [wireframe, setWireframe] = useState(false);

  const mesh = useRef<Mesh>(null);
  const shaderRef = useRef<ShaderMaterial>(null);
  const { clock, camera } = useThree();

  useEffect(() => {
    // window.addEventListener('mousemove', (event) => {
    //   camera.position.x = (event.clientX / window.innerWidth * 0.012);
    //   camera.position.y = (event.clientY / window.innerHeight * 0.012) - 0.2;
    // });
  }, []);

  useFrame(() => {
    shaderRef.current.uniforms.uTime.value = clock.elapsedTime;
    // shaderRef.current.uniforms.uOpacity.value = Math.sin(clock.elapsedTime);
  });

  return (
    <mesh
      {...props}
      ref={mesh}
    >
      <planeBufferGeometry args={[3, 3, 512, 512]} />
      <shaderMaterial 
        wireframe={wireframe}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        ref={shaderRef}
        transparent
      />
    </mesh>
  );
};

export default Water;