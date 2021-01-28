import React, { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { Canvas, CanvasProps } from 'react-three-fiber';
import { Vector3 } from 'three';
import Overlay from '@components/Overlay';
import NoiseWave from '../NoiseWave';
import { useRouter } from 'next/router';

const CanvasWebGL: React.FC<CanvasWebGLProps> = ({ wireframe = true }) => {
  const [pixelRatio, setPixelRatio] = useState(2);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState<Coordinates>({ x: 0, y: 1.3, z: -0.1 });
  const [rotation, setRotation] = useState<Coordinates>({ x: - Math.PI * 0.24, y: 0.25, z: 0 });
  const [cameraPosition, setCameraPosition] = useState<Coordinates>({ x: 0, y: -0.2, z: 1.8 });

  const router = useRouter();

  const handleRouteChange = (url: string) => {
    console.log(url);
  };

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

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  };

  const cameraOptions: CanvasProps['camera'] = {
    position: new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z),
    fov: 75,
    aspect,
    near: 0.1,
    far: 100
  };

  return (
    <Canvas 
      id='webgl' 
      camera={cameraOptions} 
      pixelRatio={pixelRatio} 
      style={{ opacity }}
    >
      <NoiseWave 
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        wireframe={wireframe}
      />
      {/* <Overlay /> */}
    </Canvas>
  );
};

export default CanvasWebGL;

interface CanvasWebGLProps {
  wireframe: boolean
}

type Coordinates = { 
  x: number
  y: number
  z: number
};