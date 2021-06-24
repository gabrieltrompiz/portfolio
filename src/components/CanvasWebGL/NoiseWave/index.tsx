
import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Vector3 } from 'three';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';
import { cloneDeep } from 'lodash';
import { animate } from 'framer-motion';
import { uniforms } from './shaders/uniforms';

const solidUniforms = cloneDeep(uniforms);
const wireframeUniforms = cloneDeep(uniforms);

const NoiseWave: React.FC<MeshProps & NoiseWaveProps> = ({ wireframe, ...props }) => {
  const [solidOpacity, setSolidOpacity] = useState(1);
  const [position, setPosition] = useState(new Vector3(0, -0.2, 1.85));

  const solidMesh = useRef<Mesh>(null);
  const wireframeMesh = useRef<Mesh>(null);
  const solidRef = useRef<ShaderMaterial>(null);
  const wireframeRef = useRef<ShaderMaterial>(null);

  const { clock, camera } = useThree();

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      const x = (event.clientX / window.innerWidth * 0.04);
      const y = - 0.2 + (event.clientY / window.innerWidth * 0.04);
      setPosition(new Vector3(x, y, 1.85));
    });

    camera.lookAt(new Vector3(-0.55, -0.3, 0));
  }, []);

  useEffect(() => {
    if(wireframe) {
      animate(1, 0, {
        onUpdate: setSolidOpacity,
        duration: 2
      });
    } else {
      animate(0, 1, {
        onUpdate: setSolidOpacity,
        duration: 2
      })
    }
  }, [wireframe]);

  useFrame(() => {
    solidRef.current.uniforms.uTime.value = clock.elapsedTime;
    wireframeRef.current.uniforms.uTime.value = clock.elapsedTime;
    solidRef.current.uniforms.uOpacity.value = solidOpacity;
    wireframeRef.current.uniforms.uOpacity.value = 1;
    camera.position.copy(camera.position.clone().lerp(position, 0.1));
  });

  return (
    <>
      <mesh
        {...props}
        ref={solidMesh}
      >
        <planeBufferGeometry args={[4, 4, 256, 256]} />
        <shaderMaterial 
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={solidUniforms}
          ref={solidRef}
          transparent
        />
      </mesh>
      <mesh
        {...props}
        ref={wireframeMesh}
      >
        <planeBufferGeometry args={[4, 4, 256, 256]} />
        <shaderMaterial 
          wireframe
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={wireframeUniforms}
          ref={wireframeRef}
          transparent
        />
      </mesh>
    </>
  );
};

export default NoiseWave;

interface NoiseWaveProps {
  wireframe: boolean
}