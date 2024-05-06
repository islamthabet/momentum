import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Preload } from '@react-three/drei';
import Model from './Model';
// import AnimatedSphere from './AnimatedSphere';

export default function CanvasWrapper() {
  return (
    <Canvas camera={{ position: [0, 0, 500] }}>
      <Suspense fallback={null}>
        <Model />
        <OrbitControls />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
