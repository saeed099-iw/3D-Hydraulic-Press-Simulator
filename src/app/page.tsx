"use client"; 

import { useState } from 'react';
import {Scene} from '@/components/Scene'; 
import {Overlay} from '@/components/Overlay'; 

export default function Page() { 
  const [f1, setF1] = useState(100);
  const [r1, setR1] = useState(0.02);
  const [r2, setR2] = useState(0.1);
  const [d1, setD1] = useState(0.1);
  const [shouldPress, setShouldPress] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePress = () => {
    if (!isAnimating) {
      setShouldPress(true);
      setIsAnimating(true);
    }
  };

  const handleReset = () => {
    if (!isAnimating) {
      setF1(100);
      setR1(0.02);
      setR2(0.1);
      setD1(0.1);
      window.location.reload();
    }
  };

  const handleAnimationComplete = () => {
    setShouldPress(false);
    setIsAnimating(false);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Scene
        f1={f1}
        r1={r1}
        r2={r2}
        d1={d1}
        onPress={handlePress}
        shouldPress={shouldPress}
        onAnimationComplete={handleAnimationComplete}
      />
      <Overlay
        f1={f1}
        r1={r1}
        r2={r2}
        d1={d1}
        onF1Change={setF1}
        onR1Change={setR1}
        onR2Change={setR2}
        onD1Change={setD1}
        onPress={handlePress}
        onReset={handleReset}
        isAnimating={isAnimating}
      />
    </div>
  );
}