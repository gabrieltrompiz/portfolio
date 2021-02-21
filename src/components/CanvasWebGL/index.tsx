import React, { Suspense, useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { Canvas, CanvasProps } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
import Overlay from '@components/Overlay';
import NoiseWave from './NoiseWave';
import ProjectPlane from './ProjectPlane';
import { NextRouter } from 'next/router';
import { connect, useSelector } from 'react-redux';
import { State } from 'portfolio';
import { setPlaneRef } from '@redux/actions/projects';
import { SetPlaneRefAction } from '@redux/actions/types';

const CanvasWebGL: React.FC<CanvasWebGLProps> = ({ wireframe = true, router, setPlaneRef, loading }) => {
  const [pixelRatio, setPixelRatio] = useState(2);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [opacity, setOpacity] = useState(0);

  const projects = useSelector((state: State) => state.projects);
  const selectedProject = useSelector((state: State) => state.selectedProject);
  const movingSB = useSelector((state: State) => state.movingScrollBar);

  useEffect(() => {
    setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setAspect(window.innerWidth / window.innerHeight);
    addEventListeners();

    animate(0, 1, {
      duration: 2,
      onUpdate: setOpacity,
      ease: 'easeInOut'
    });
  }, []);

  const addEventListeners = () => {
    window.addEventListener('resize', () => {
      setAspect(window.innerWidth / window.innerHeight);
      setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });
  };

  const cameraOptions: CanvasProps['camera'] = {
    position: new Vector3(0, -0.2, 1.85),
    fov: 75,
    aspect,
    near: 0.1,
    far: 100
  };
  
  return (
    <>
      <Canvas 
        id='webgl' 
        camera={cameraOptions} 
        pixelRatio={pixelRatio} 
        style={{ opacity }}
      >
        <NoiseWave 
          position={[0, 1.3, -0.1]}
          rotation={[- Math.PI * 0.24, 0.25, 0]}
          wireframe={wireframe}
        />
        {!loading && 
        <Suspense fallback={null}>
          {projects.map(project => 
            <ProjectPlane {...project} moving={movingSB} setPlaneRef={setPlaneRef} router={router} key={project.id} />
          )}
        </Suspense>}
        {/* <Overlay /> */}
      </Canvas>
    </>
  );
};

export default connect(undefined, { setPlaneRef })(CanvasWebGL);

interface CanvasWebGLProps {
  wireframe: boolean
  router: NextRouter
  setPlaneRef: (mesh: Mesh, id: string) => SetPlaneRefAction
  loading: boolean
}