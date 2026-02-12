"use client";

import { useRef, useEffect } from 'react';
import { Group } from 'three';
import { useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import gsap from 'gsap';

interface HydraulicPressProps {
  f1: number;
  r1: number;
  r2: number;
  d1: number;
  shouldPress: boolean;
  onAnimationComplete: () => void;
}

export function HydraulicPress({ f1, r1, r2, d1, shouldPress, onAnimationComplete }: HydraulicPressProps) {
  const inputPistonRef = useRef<Group>(null);
  const outputPistonRef = useRef<Group>(null);
  const fluidRef = useRef<Group>(null);
  const loadRef = useRef<Group>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { camera } = useThree();

  const initialCameraPos = useRef({ x: 2.5, y: 2, z: 3.5 });

  const computePhysics = (f1: number, r1: number, r2: number, d1: number) => {
    const A1 = Math.PI * r1 * r1;
    const A2 = Math.PI * r2 * r2;
    const P = f1 / A1;
    const F2 = P * A2;
    const d2 = d1 * (A1 / A2); 
    return { d2 };
  };

  useEffect(() => {
    if (shouldPress) {
      if (timelineRef.current) timelineRef.current.kill();

      const { d2 } = computePhysics(f1, r1, r2, d1);

      const tl = gsap.timeline({
        onComplete: () => onAnimationComplete()
      });

      const inputPos = inputPistonRef.current?.position;
      const outputPos = outputPistonRef.current?.position;
      const fluidPos = fluidRef.current?.position;
      const loadPos = loadRef.current?.position;

      if (inputPos && outputPos && fluidPos && loadPos) {
        tl.to(camera.position, {
          x: initialCameraPos.current.x + 0.1,
          y: initialCameraPos.current.y - 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        }, 0)
        
        .to(inputPos, {
          y: inputPos.y - d1,
          duration: 1.2, 
          ease: 'power3.inOut' 
        }, 0)
        
        .to(outputPos, {
          y: outputPos.y + d2,
          duration: 1.2,
          ease: 'power3.inOut'
        }, 0)
        
        .to(loadPos, {
          y: loadPos.y + d2,
          duration: 1.2,
          ease: 'power3.inOut'
        }, 0)
        
        .to(fluidPos, {
          y: fluidPos.y - d1 * 0.5, 
          duration: 1.2,
          ease: 'power3.inOut'
        }, 0);
      }
      timelineRef.current = tl;
    }
  }, [shouldPress, f1, r1, r2, d1, camera, onAnimationComplete]);

  const chamberHeight = 0.8; 
  const pistonThickness = 0.05;

  const MetalMaterial = (
    <meshStandardMaterial
      color="#1a1a1a"
      roughness={0.2}
      metalness={1}
      envMapIntensity={1.5}
    />
  );

  const PistonMaterial = (
    <meshStandardMaterial
      color="#e0e0e0"
      roughness={0.1}
      metalness={1}
      envMapIntensity={2}
    />
  );

  return (
    <group position={[0, 0.2, 0]}> 
      
      <group position={[-0.8, 0, 0]}>
        <mesh castShadow receiveShadow position={[0, chamberHeight/2, 0]}>
          <cylinderGeometry args={[r1 * 8, r1 * 8, chamberHeight, 32]} />
          <MeshTransmissionMaterial 
            backside
            backsideThickness={0.5}
            thickness={0.1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            ior={1.5}
            color="#ffffff"
            roughness={0.1}
            transmission={0.95}
          />
        </mesh>
        
        <group ref={fluidRef} position={[0, -0.05, 0]}>
           <mesh position={[0, chamberHeight/2, 0]}>
            <cylinderGeometry args={[r1 * 7.5, r1 * 7.5, chamberHeight * 0.9, 32]} />
            <meshPhysicalMaterial 
              color="#0066ff"
              emissive="#002244"
              emissiveIntensity={2} 
              roughness={0.1}
              metalness={0.1}
              transmission={0.6}
              thickness={2}
            />
          </mesh>
        </group>

        <group ref={inputPistonRef} position={[0, chamberHeight - 0.1, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[r1 * 7.2, r1 * 7.2, pistonThickness, 32]} />
            {PistonMaterial}
          </mesh>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
            {PistonMaterial}
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff0000" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </group>

    
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 16]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.8} />
      </mesh>

      <group position={[0.8, 0, 0]}>
        <mesh castShadow receiveShadow position={[0, chamberHeight/2, 0]}>
          <cylinderGeometry args={[r2 * 8, r2 * 8, chamberHeight, 48]} />
          <MeshTransmissionMaterial 
             backside
             backsideThickness={0.5}
             thickness={0.1}
             ior={1.5}
             color="#ffffff"
             roughness={0.1}
             transmission={0.9}
          />
        </mesh>

        <mesh position={[0, chamberHeight/2 - 0.05, 0]}>
           <cylinderGeometry args={[r2 * 7.6, r2 * 7.6, chamberHeight * 0.9, 32]} />
           <meshPhysicalMaterial 
              color="#0066ff"
              emissive="#002244"
              emissiveIntensity={1.5}
              roughness={0.1}
              metalness={0.1}
              transmission={0.6}
              thickness={2}
           />
        </mesh>

        <group ref={outputPistonRef} position={[0, 0.1 + pistonThickness, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[r2 * 7.5, r2 * 7.5, pistonThickness, 32]} />
            {PistonMaterial}
          </mesh>
          
          <mesh position={[0, 0.05, 0]}>
             <cylinderGeometry args={[r2 * 6, r2 * 6, 0.02, 32]} />
             <meshStandardMaterial color="#111" />
          </mesh>
        </group>

        <group ref={loadRef} position={[0, 0.3, 0]}>
           <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.05} smoothness={4} castShadow>
             <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.2} 
                metalness={0.5}
             />
           </RoundedBox>
           <mesh position={[0, 0, 0.21]}>
             <planeGeometry args={[0.3, 0.1]} />
             <meshBasicMaterial color="#000" />
           </mesh>
        </group>
      </group>
    </group>
  );
}