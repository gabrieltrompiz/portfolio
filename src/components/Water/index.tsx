
import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame, useThree } from 'react-three-fiber';
import { Color, Mesh, ShaderMaterial, Vector2, Vector3 } from 'three';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';
import { cloneDeep } from 'lodash';
import { animate } from 'framer-motion';

const solidUniforms = {
  uBigWavesElevation: { value: 0 },
  uBigWavesFrequency: { value: new Vector2(0, 0) },
  uTime: { value: 0 },
  uBigWavesSpeed: { value: 0.06 },
  uDepthColor: { value: new Color(0xFFFFFF) },
  uSurfaceColor: { value: new Color(0x000000) },
  uColorOffset: { value: 0.17 },
  uColorMultiplier: { value: 5 },
  uSmallWavesElevation: { value: 0.1 },
  uSmallWavesFrequency: { value: 4 },
  uSmallWavesSpeed: { value: 0.1 },
  uSmallIterations: { value: 4 },
  uOpacity: { value: 1 }
};

const wireframeUniforms = cloneDeep(solidUniforms);

const Water: React.FC<MeshProps & WaterProps> = ({ wireframe, ...props }) => {
  const [solidOpacity, setSolidOpacity] = useState(1);

  const solidMesh = useRef<Mesh>(null);
  const wireframeMesh = useRef<Mesh>(null);
  const solidRef = useRef<ShaderMaterial>(null);
  const wireframeRef = useRef<ShaderMaterial>(null);
  const { clock, camera } = useThree();

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      camera.position.x = (event.clientX / window.innerWidth * 0.015);
      camera.position.y = (event.clientY / window.innerHeight * 0.015) - 0.2;
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

export default Water;

interface WaterProps {
  wireframe: boolean
}