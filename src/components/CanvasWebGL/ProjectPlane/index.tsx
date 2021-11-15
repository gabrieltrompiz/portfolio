import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Raycaster, ShaderMaterial, Vector2, Vector3 } from 'three';
import fragment from './shaders/fragment';
import { getUniforms } from './shaders/uniforms';
import vertex from './shaders/vertex';
import { NextRouter } from 'next/router';
import { Project, State } from 'portfolio';
import { GoToProjectAction, SetPlaneRefAction } from '@redux/actions/types';
import { animate } from 'framer-motion';
import { useSelector } from 'react-redux';
import { totalProjects } from 'src/projects';

const ProjectPlane: React.FC<ProjectPlaneProps> = ({ router, textures, setPlaneRef, id, index, progress, goToNextProject, repo }) => {
  const [position, setPosition] = useState(new Vector3(0.45 * index, -0.5, 1.5));
  const [addedListener, setAddedListener] = useState(false);
  const [show, setShow] = useState(false);
  const [scale, setScale] = useState<number>(1);
  const [hoveringProject, setHoveringProject] = useState<boolean>(false);
  const [lookingAtCamera, setLookingAtCamera] = useState(true);
  const [vec] = useState(() => new Vector3())
  
  const moving = useSelector((state: State) => state.movingScrollBar);
  const selected = useSelector((state: State) => state.selectedProject.id === id);
  const selectedIndex = useSelector((state: State) => state.projects.indexOf(state.selectedProject));
  const nextProject = useSelector((state: State) => state.nextProject);
  
  const uniforms = useCallback(() => getUniforms(textures), [textures]);

  const planeRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const raycasterRef = useRef<Raycaster>(null);
  
  // difference in % between each project showcase
  const percentageDivision = 100 / (totalProjects - 1);

  // the position is equal to 0.45 times the index minus the progress of the scrollbar divided by the difference in % between each project showcase
  const alphaP = useRef<Vector3>(new Vector3((index - progress / percentageDivision) * 0.45, 0, 0));

  const { camera, clock } = useThree();
  
  const handleRouteChange = (url: string) => {
    setShow(url === '/projects');
  };

  const getMouseCoordinates = (e: MouseEvent) => {
    const mouse = new Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      - (e.clientY / window.innerHeight) * 2 + 1
    );

    return mouse;
  };

  const onClick = useCallback((event: MouseEvent) => {
    const mouse = getMouseCoordinates(event);

    const raycaster = raycasterRef.current;
    raycaster?.setFromCamera(mouse, camera);
    const intersects = raycaster?.intersectObject(planeRef.current);

    if(intersects?.length) {
      if(selected) {
        window.open(repo, '_blank');
      } else {
        goToNextProject(index > selectedIndex ? 'NEXT' : 'PREV')
      }
    }
  }, [selectedIndex, selected, camera, goToNextProject, index, repo]);
  
  const onMouseMove = useCallback((event: MouseEvent) => {
    const mouse = getMouseCoordinates(event);
    
    const x = (((event.clientX / window.innerWidth) - 0.5) * 0.04);
    const y = (((event.clientY / window.innerWidth) - 0.3) * 0.04);
    setPosition(new Vector3(x, y, 1.5).add(alphaP.current));
    
    const raycaster = raycasterRef.current;
    raycaster?.setFromCamera(mouse, camera);
    const intersects = raycaster?.intersectObject(planeRef.current);

    if(intersects?.length) {
      setHoveringProject(true);
      document.body.style.cursor = 'pointer';
    } else if(hoveringProject) {
      setHoveringProject(false);
      document.body.style.cursor = 'initial';
    }
  }, [hoveringProject, camera]);
  
  useEffect(() => {
    // the position is equal to 0.45 times the index minus the progress of the scrollbar divided by the difference in % between each project showcase
    alphaP.current = new Vector3((index - progress / percentageDivision) * 0.45, 0, 0);
  }, [progress, index, percentageDivision]);

  // If the project view is selected and the scrollbar isn't moving, centers the plane and adds the listeners
  // If the project view is not selected and the scrollbar isn't movint, removes the listeners
  useEffect(() => {
    if(show && !moving) {
      if(!addedListener) {
        setAddedListener(true);
      }
      setPosition(new Vector3(0, 0, 1.5).add(alphaP.current));
    } else if(!moving) {
      if(addedListener) {
        setAddedListener(false);
        window.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('click', onClick);
      }
      document.body.style.cursor = 'initial';
      setPosition(new Vector3(0, -0.5, 1.5).add(alphaP.current))
    }
  }, [show, progress, moving, addedListener, onClick, onMouseMove]);

  // If the the scrollbar isn't being moved, the selected plane looks at the camera
  useEffect(() => {
    if(moving) {
      setLookingAtCamera(false);
      animate(scale, 0.85, {
        onUpdate: setScale,
        duration: 0.5
      });
    } else {
      setTimeout(() => setLookingAtCamera(true), 1500);
      animate(scale, 1, {
        onUpdate: setScale,
        duration: 0.5
      });
    }
    // cannot run this every time scale changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moving]);

  // When the selected project changes, the next plane will look at the camera after 1.5s
  useEffect(() => {
    setLookingAtCamera(false);
    const id = setTimeout(() => setLookingAtCamera(true), 1500);
    return () => clearTimeout(id);
  }, [nextProject]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    if(router.pathname === '/projects') setShow(true);
    setPlaneRef(planeRef.current, 'electra');
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router, setPlaneRef]);
  
  useEffect(() => {
    if(show) {
      // re-attaches the onMouseMove event listener, usually happens when the mouse hovers between projects
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, [onMouseMove, show]);

  useEffect(() => {
    if(show) {
      // re-attaches the onClick event listener, usually happens when the mouse hovers between projects
      document.body.addEventListener('click', onClick);
      return () => document.body.removeEventListener('click', onClick);
    }
  }, [onClick, show]);
  
  useFrame(() => {
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    planeRef.current.position.copy(planeRef.current.position.clone().lerp(position, 0.05));
    if(selected && !moving && lookingAtCamera) planeRef.current.lookAt(camera.position);
    if(!selected && !moving && !lookingAtCamera) planeRef.current.lookAt(0, 0, 1.85 + ((index + 1) * 20));
    if(moving) planeRef.current.rotation.setFromVector3(planeRef.current.rotation.toVector3().lerp(vec.set(0, 0, 0), 0.05));
  });

  return (
    <>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 0, 1.5]}
        ref={planeRef}
      > 
        <planeBufferGeometry args={[0.4 * scale, 0.25 * scale, 16, 16]} />
        <shaderMaterial 
          attach="material"
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms()}
          ref={materialRef}
          transparent
        />
        <raycaster 
          ref={raycasterRef}
        />
      </mesh>
    </>
  );
};

export default ProjectPlane;

interface ProjectPlaneProps extends Project {
  router: NextRouter
  // eslint-disable-next-line
  setPlaneRef: (mesh: Mesh, id: string) => SetPlaneRefAction
  // eslint-disable-next-line
  goToNextProject: (direction: 'NEXT' | 'PREV') => GoToProjectAction
  index: number
  progress: number
}