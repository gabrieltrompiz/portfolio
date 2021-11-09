
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { MeshProps, useFrame, useThree, Vector3 } from '@react-three/fiber';
import { Mesh, ShaderMaterial, Color, PerspectiveCamera, Clock, MathUtils } from 'three';
import vertexShader from './shaders/vertex';
import fragmentShader from './shaders/fragment';
import { cloneDeep } from 'lodash';
import { animate } from 'framer-motion';
import { uniforms } from './shaders/uniforms';
import { useSelector } from 'react-redux';
import { State } from 'portfolio';
import { NextRouter } from 'next/router';

const solidUniforms = cloneDeep(uniforms);
const wireframeUniforms = cloneDeep(uniforms);

const NoiseWave: React.FC<MeshProps & NoiseWaveProps> = ({ wireframe, wireframePosition, router, ...props }) => {
  const [solidOpacity, setSolidOpacity] = useState(1);
  const [wireframeOpacity, setWireframeOpacity] = useState(0);
  const [depthColor, setDepthColor] = useState(new Color('#000'));
  const [surfaceColor, setSurfaceColor] = useState(new Color('#FFF'));
  // const [position, setPosition] = useState(new Vector3(0, -0.2, 1.85));

  const solidMesh = useRef<Mesh>(null);
  const wireframeMesh = useRef<Mesh>(null);
  const solidRef = useRef<ShaderMaterial>(null);
  const wireframeRef = useRef<ShaderMaterial>(null);

  const selectedProject = useSelector((state: State) => state.selectedProject);

  const { clock } = useThree();

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
      });
    }
  }, [wireframe]);

  useEffect(() => {
    setWireframeOpacity(1 - solidOpacity);
  }, [solidOpacity]);

  useEffect(() => {
    if(router?.route === '/projects') {
      animateColor(depthColor, new Color(selectedProject.titleColor), setDepthColor);
      animateColor(surfaceColor, new Color(selectedProject.backgroundColor), setSurfaceColor);
    } else {
      animateColor(depthColor, new Color('#191919'), setDepthColor);
      animateColor(surfaceColor, new Color('#191919'), setSurfaceColor);
    }
  }, [selectedProject, router?.route])

  useFrame(() => {
    solidRef.current.uniforms.uTime.value = clock.elapsedTime;
    wireframeRef.current.uniforms.uTime.value = clock.elapsedTime;
    solidRef.current.uniforms.uOpacity.value = solidOpacity;
    wireframeRef.current.uniforms.uOpacity.value = wireframeOpacity;

    wireframeRef.current.uniforms.uDepthColor.value = depthColor;
    wireframeRef.current.uniforms.uSurfaceColor.value = surfaceColor;
    // camera.position.copy(camera.position.clone().lerp(position, 0.1));
  });

  const animateColor = useCallback((from: Color, to: Color, stateCb: Dispatch<SetStateAction<Color>>) => {
    animate(from.r, to.r, {
      onUpdate: (r) => {
        stateCb((color) => color.setRGB(r, color.g, color.b))
      },
    })
    animate(from.g, to.g, {
      onUpdate: (g) => {
        stateCb((color) => color.setRGB(color.r, g, color.b))
      },
    })
    animate(from.b, to.b, {
      onUpdate: (b) => {
        stateCb((color) => color.setRGB(color.r, color.g, b))
      },
    })
  }, []);

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
        position={wireframePosition}
        ref={wireframeMesh}
      >
        <planeBufferGeometry args={[4, 4, 256, 256]} />
        <shaderMaterial 
          wireframe
          wireframeLinewidth={2}
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
  wireframePosition: Vector3
  router: NextRouter
}