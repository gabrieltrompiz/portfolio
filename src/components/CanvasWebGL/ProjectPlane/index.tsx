import React, { useEffect, useRef, useState } from 'react';
import { MeshProps, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Mesh, Raycaster, ShaderMaterial, TextureLoader, Vector2, Vector3 } from 'three';
import fragment from './shaders/fragment';
import { getUniforms } from './shaders/uniforms';
import vertex from './shaders/vertex';
import { NextRouter, useRouter, withRouter } from 'next/router';

const ProjectPlane: React.FC<MeshProps & ProjectPlaneProps> = ({ router }) => {
  const [position, setPosition] = useState(new Vector3(-0.1, -0.8, 1.5));
  const [show, setShow] = useState(false);

  const params = new URLSearchParams();
  params.set('url', '/images/electra/login.png');
  params.set('w', '1080');
  params.set('q', '75');
  // const texture = useLoader(TextureLoader, `/_next/image?${params}`);

  const uniforms = getUniforms();
  const mouse = new Vector2();

  const meshRef = useRef<Mesh>(null);
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
    
    const x = - 0.1 + (event.clientX / window.innerWidth * 0.020);
    const y = - 0.22 + (event.clientY / window.innerWidth * 0.020);
    setPosition(new Vector3(x, y, 1.5));
    
    const raycaster = raycasterRef.current;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current);
    if(intersects.length) {
      document.body.style.cursor = 'pointer';
      document.body.addEventListener('click', clickRef.current)
    } else {
      document.body.style.cursor = 'initial';
      document.body.removeEventListener('click', clickRef.current)
    }
  };
  
  const moveRef = useRef<typeof onMouseMove>(onMouseMove);
  const clickRef = useRef<typeof console.log>(console.log);

  useEffect(() => {
    if(show) {
      window.addEventListener('mousemove', moveRef.current);
      setPosition(new Vector3(-0.1, -0.22, 1.5));
    } else {
      window.removeEventListener('mousemove', moveRef.current);
      document.body.style.cursor = 'initial';
      document.body.removeEventListener('click', clickRef.current);
      setPosition(new Vector3(-0.1, -0.8, 1.5))
    }
  }, [show]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, []);

  useFrame(() => {
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    meshRef.current.position.copy(meshRef.current.position.clone().lerp(position, 0.05));
    meshRef.current.lookAt(camera.position);
  });

  return (
    <>
      <mesh
        rotation={[0, 0, 0]}
        position={[-0.1, -0.8, 1.5]}
        ref={meshRef}
      > 
        <planeBufferGeometry args={[0.4, 0.25, 16, 16]} />
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
    </>
  );
};

export default ProjectPlane;

interface ProjectPlaneProps {
  router: NextRouter
}