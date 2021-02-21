import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Mesh, Raycaster, ShaderMaterial, Vector2, Vector3 } from 'three';
import fragment from './shaders/fragment';
import { getUniforms } from './shaders/uniforms';
import vertex from './shaders/vertex';
import { NextRouter } from 'next/router';
import { Project } from 'portfolio';
import { SetPlaneRefAction } from '@redux/actions/types';
import { animate } from 'framer-motion';

const ProjectPlane: React.FC<ProjectPlaneProps> = ({ router, textures, setPlaneRef, id, moving }) => {
  const [position, setPosition] = useState(new Vector3(-0.105, -0.8, 1.5));
  const [show, setShow] = useState(false);
  const [scale, setScale] = useState<number>(1);

  const uniforms = getUniforms(textures[0]);
  const mouse = new Vector2();

  const planeRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const raycasterRef = useRef<Raycaster>(null);
  
  const { camera, clock } = useThree();

  const handleRouteChange = (url: string) => {
    if(url === '/projects') setShow(true);
    else setShow(false);
  };
  
  const onMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    const x = - 0.105 + (event.clientX / window.innerWidth * 0.04);
    const y = - 0.22 + (event.clientY / window.innerWidth * 0.04);
    setPosition(new Vector3(x, y, 1.5));
    
    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeRef.current);
    if(intersects.length) {
      document.body.style.cursor = 'pointer';
      document.body.addEventListener('click', clickRef.current)
    } else {
      document.body.style.cursor = 'initial';
      document.body.removeEventListener('click', clickRef.current)
    }
  };

  const onClick = () => {
    router.push(`/projects/${id}`);
  };
  
  const moveRef = useRef<typeof onMouseMove>(onMouseMove);
  const clickRef = useRef<typeof onClick>(onClick);

  useEffect(() => {
    if(show) {
      window.addEventListener('mousemove', moveRef.current);
      setPosition(new Vector3(-0.105, -0.22, 1.5));
    } else {
      window.removeEventListener('mousemove', moveRef.current);
      document.body.style.cursor = 'initial';
      document.body.removeEventListener('click', clickRef.current);
      setPosition(new Vector3(-0.105, -0.8, 1.5))
    }
  }, [show]);

  useEffect(() => {
    if(moving) {
      animate(scale, 0.85, {
        onUpdate: setScale,
        duration: 0.5
      });
    } else {
      animate(scale, 1, {
        onUpdate: setScale,
        duration: 0.5
      });
    }
  }, [moving]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    if(router.pathname === '/projects') setShow(true);
    setPlaneRef(planeRef.current, 'electra');
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, []);

  useFrame(() => {
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    planeRef.current.position.copy(planeRef.current.position.clone().lerp(position, 0.05));
    planeRef.current.lookAt(camera.position);
  });

  return (
    <group>
      <mesh
        rotation={[0, 0, 0]}
        position={[-0.105, -0.8, 1.5]}
        ref={planeRef}
      > 
        <planeBufferGeometry args={[0.4 * scale, 0.25 * scale, 16, 16]} />
        <shaderMaterial 
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          ref={materialRef}
        />
        <ambientLight />
        <raycaster 
          ref={raycasterRef}
        />
      </mesh>

    </group>
  );
};

export default ProjectPlane;

interface ProjectPlaneProps extends Project {
  router: NextRouter
  setPlaneRef: (mesh: Mesh, id: string) => SetPlaneRefAction
  moving: boolean
}