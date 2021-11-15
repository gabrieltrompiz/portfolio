import React, { useCallback, useEffect, useState } from 'react';

import { State } from 'portfolio';
import { animate } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { NextRouter } from 'next/router';
import { connect, Provider, shallowEqual, useSelector, useStore } from 'react-redux';
import { goToNextProject, setPlaneRef } from '@redux/actions/projects';
import { GoToProjectAction, SetPlaneRefAction } from '@redux/actions/types';

import NoiseWave from './NoiseWave';
import ProjectPlane from './ProjectPlane';

const CanvasWebGL: React.FC<CanvasWebGLProps> = ({ wireframe = true, router, setPlaneRef, loading, goToNextProject }) => {
  const [pixelRatio, setPixelRatio] = useState(2);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [opacity, setOpacity] = useState(0);
  const [color, setColor] = useState<string>('#191919');
  
  const store = useStore();
  /* progress is sent as a prop to the ProjectPlane and is not consumed directly
  * by that component because using a bridge to connect the store to the components inside
  * Canvas degrades performance and progress changes constantly and quickly. Had to create
  * such bridge because Canvas uses a reconciler and store's Context doesn't go through */
  const progress = useSelector((state: State) => state.scrollBarProgress);
  const projects = useSelector((state: State) => state.projects, shallowEqual);
  const selectedProject = useSelector((state: State) => state.selectedProject);

  // Updates the background color depending on the project and url
  const updateBackground = useCallback((url: string) => { 
    setColor(url === '/projects' ? selectedProject?.backgroundColor : '#191919');
  }, [selectedProject]);

  useEffect(() => {
    updateBackground(router.route);
  }, [selectedProject, router, updateBackground]);
  
  useEffect(() => {
    router.events.on('routeChangeComplete', updateBackground);
    return () => router.events.off('routeChangeComplete', updateBackground);
  }, [router, updateBackground]);
  
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
  
  // On resize, updates the aspect and pixel ratio
  const addEventListeners = () => {
    window.addEventListener('resize', () => {
      setAspect(window.innerWidth / window.innerHeight);
      setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });
  };

  const cameraOptions = {
    position: new Vector3(0, 0, 1.85),
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
        dpr={pixelRatio} 
        style={{ opacity, backgroundColor: color }}
      >
        <Provider store={store}>
          {!loading && 
          <>
            <NoiseWave 
              position={[0.3, 1.8, 0.1]}
              wireframePosition={[0.3, 1.8, 0.1]}
              rotation={[- Math.PI * 0.19, 0.1, 0.1]}
              wireframe={wireframe}
              router={router}
            />
            {projects.map((project, index) => 
              <ProjectPlane 
                {...project}
                progress={progress}
                index={index} 
                setPlaneRef={setPlaneRef} 
                router={router} 
                key={project.id}
                goToNextProject={goToNextProject}
              />
            )}
          </>}
          {/* <Overlay /> */}
        </Provider>
      </Canvas>
    </>
  );
};

export default connect(undefined, { setPlaneRef, goToNextProject })(CanvasWebGL);

interface CanvasWebGLProps {
  wireframe: boolean
  router: NextRouter
  // eslint-disable-next-line
  setPlaneRef: (mesh: Mesh, id: string) => SetPlaneRefAction
  // eslint-disable-next-line
  goToNextProject: (direction: 'NEXT' | 'PREV') => GoToProjectAction
  loading: boolean
}