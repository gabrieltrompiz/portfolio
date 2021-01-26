import React, { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import Overlay from '@components/Overlay';
import Water from '../Water';

const Background: React.FC<BackgroundProps> = ({ wireframe = true }) => {
  const [pixelRatio, setPixelRatio] = useState(2);
  const [aspect, setAspect] = useState<number>(16 / 9);
  const [opacity, setOpacity] = useState(0);

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

  return (
    <Canvas id='webgl' camera={{ position: new Vector3(0, -0.2, 1.8), fov: 75, aspect, near: 0.1, far: 100 }} pixelRatio={pixelRatio} style={{ opacity }}>
      <Water 
        position={[0, 1.3, -0.1]}
        rotation={[- Math.PI * 0.24, 0.25, 0]}
        wireframe={wireframe}
      />
      {/* <Overlay /> */}
    </Canvas>
  );
};

export default Background;

interface BackgroundProps {
  wireframe: boolean
}