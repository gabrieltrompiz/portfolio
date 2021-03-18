import React, { Suspense, useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { Canvas, CanvasProps } from 'react-three-fiber';
import { Mesh, Vector3 } from 'three';
// import Overlay from '@components/Overlay';
import NoiseWave from './NoiseWave';
import ProjectPlane from './ProjectPlane';
import { NextRouter } from 'next/router';
import { connect, Provider, useSelector, useStore } from 'react-redux';
import { setPlaneRef } from '@redux/actions/projects';
import { SetPlaneRefAction } from '@redux/actions/types';
import { State } from 'portfolio';

const CanvasWebGL: React.FC<CanvasWebGLProps> = ({ wireframe = true, router, setPlaneRef, loading }) => {
  const [pixelRatio, setPixelRatio] = useState(2);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [opacity, setOpacity] = useState(0);

  const store = useStore();
  /* progress is sent as a prop to the ProjectPlane and is not consumed directly
  * by that component because using a bridge to connect the store to the components inside
  * Canvas degrades performance and progress changes constantly and quickly. Had to create
  * such bridge because Canvas uses a reconciler and store's Context doesn't go through */
  const progress = useSelector((state: State) => state.scrollBarProgress);
  const projects = useSelector((state: State) => state.projects);

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
        <Provider store={store}>
          <NoiseWave 
            position={[0, 1.3, -0.1]}
            rotation={[- Math.PI * 0.24, 0.25, 0]}
            wireframe={wireframe}
          />
          {!loading && 
          <Suspense fallback={null}>
            {projects.map((project, index) => 
              <ProjectPlane 
                {...project} 
                progress={progress}
                index={index + 1} 
                setPlaneRef={setPlaneRef} 
                router={router} 
                key={project.id}
              />
            )}
          </Suspense>}
          {/* <Overlay /> */}
        </Provider>
      </Canvas>
    </>
  );
};

export default connect(undefined, { setPlaneRef })(CanvasWebGL);

interface CanvasWebGLProps {
  wireframe: boolean
  router: NextRouter
  // eslint-disable-next-line
  setPlaneRef: (mesh: Mesh, id: string) => SetPlaneRefAction
  loading: boolean
}