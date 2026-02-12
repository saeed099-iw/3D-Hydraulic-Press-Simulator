"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Stars } from '@react-three/drei';
import { HydraulicPress } from './HydraulicPress';

interface SceneProps {
  f1: number;
  r1: number;
  r2: number;
  d1: number;
  onPress: () => void;
  shouldPress: boolean;
  onAnimationComplete: () => void;
}

export function Scene({ f1, r1, r2, d1, onPress, shouldPress, onAnimationComplete }: SceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [2.5, 2, 3.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#050505']} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      
      <pointLight position={[-2, 1, 2]} intensity={2} color="#00ffff" />
      <pointLight position={[2, 1, -2]} intensity={2} color="#ff00ff" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <HydraulicPress
          f1={f1}
          r1={r1}
          r2={r2}
          d1={d1}
          shouldPress={shouldPress}
          onAnimationComplete={onAnimationComplete}
        />
      </Float>

      <ContactShadows position={[0, -0.4, 0]} opacity={0.4} scale={10} blur={2.5} far={1} />
      <gridHelper args={[20, 20, '#111', '#050505']} position={[0, -0.41, 0]} />

      <OrbitControls makeDefault minDistance={2} maxDistance={7} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
}