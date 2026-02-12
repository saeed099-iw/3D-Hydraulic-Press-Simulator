"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import { Settings, RefreshCw, Play, Info, Code, X, Cpu, Layers, Box, Palette, Zap, Edit3, Check } from 'lucide-react';

interface OverlayProps {
  f1: number;
  r1: number;
  r2: number;
  d1: number;
  onF1Change: (value: number) => void;
  onR1Change: (value: number) => void;
  onR2Change: (value: number) => void;
  onD1Change: (value: number) => void;
  onPress: () => void;
  onReset: () => void;
  isAnimating: boolean;
}

export function Overlay({
  f1,
  r1,
  r2,
  d1,
  onF1Change,
  onR1Change,
  onR2Change,
  onD1Change,
  onPress,
  onReset,
  isAnimating
}: OverlayProps) {
  const [showKPa, setShowKPa] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showSpecs, setShowSpecs] = useState(false); 

  const A1 = Math.PI * r1 * r1;
  const A2 = Math.PI * r2 * r2;
  const P = f1 / A1;
  const F2 = P * A2;
  const d2 = d1 * (A1 / A2);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  return (
    <div className="absolute inset-0 pointer-events-none font-sans select-none">
      
      <div className="absolute bottom-6 right-6 pointer-events-auto z-50">
        <button
          onClick={() => setShowSpecs(true)}
          className="bg-black/60 backdrop-blur-xl border border-white/10 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600/80 hover:scale-110 hover:border-blue-400 transition-all duration-300 group"
        >
          <Code className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {showSpecs && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md pointer-events-auto transition-all duration-300">
          <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 relative overflow-hidden animate-in fade-in zoom-in duration-300">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

            <button 
                onClick={() => setShowSpecs(false)}
                className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
            
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                    <Cpu className="w-7 h-7 text-blue-400" />
                    Technical Specs
                </h2>
                <p className="text-gray-400 text-sm">
                    Architecture & Technologies used in this simulation.
                </p>
            </div>

            <div className="space-y-3">
                <TechRow icon={<Layers className="w-4 h-4" />} label="Framework" value="Next.js 16 (App Router)" color="text-white" />
                <TechRow icon={<Cpu className="w-4 h-4" />} label="Core Library" value="React 19" color="text-blue-400" />
                <TechRow icon={<Box className="w-4 h-4" />} label="3D Engine" value="Three.js & R3F" color="text-orange-400" />
                <TechRow icon={<Palette className="w-4 h-4" />} label="Styling" value="Tailwind CSS v4" color="text-cyan-400" />
                <TechRow icon={<Zap className="w-4 h-4" />} label="Animation" value="GSAP" color="text-green-400" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                    Darolfonoon High School • Grade 10 Project
                </p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl max-w-sm transition-all hover:bg-black/50 hover:border-white/20">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-400" />
              {"Pascal's Press"}
            </h1>
            
            <div className="flex gap-2">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
                  aria-label="Toggle info"
                >
                  <Info className="w-5 h-5" />
                </button>
            </div>
          </div>

          {showInfo && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <p className="text-xs text-blue-200 leading-relaxed">
                Demonstrates {"Pascals Principle"}: pressure applied to a confined fluid transmits equally throughout.
                Small force on small piston creates large force on large piston.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <ControlGroup 
                label="Input Force (F₁)" 
            >
                <EditableValue 
                    value={f1} 
                    unit="N" 
                    min={1} max={5000} 
                    onChange={onF1Change}
                    color="text-orange-500"
                />
                <input
                    type="range" min="1" max="5000" step="1" value={f1}
                    onChange={(e) => onF1Change(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all mt-2"
                />
            </ControlGroup>

            <ControlGroup 
                label="Input Radius (r₁)" 
            >
                <EditableValue 
                    value={r1} 
                    unit="mm" 
                    multiplier={1000} 
                    decimals={1}
                    min={5} max={50}
                    onChange={(val) => onR1Change(val / 1000)} 
                    color="text-orange-500"
                />
                <input
                    type="range" min="0.005" max="0.05" step="0.001" value={r1}
                    onChange={(e) => onR1Change(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all mt-2"
                />
            </ControlGroup>

            <ControlGroup 
                label="Output Radius (r₂)" 
            >
                <EditableValue 
                    value={r2} 
                    unit="mm" 
                    multiplier={1000}
                    decimals={1}
                    min={20} max={500}
                    onChange={(val) => onR2Change(val / 1000)}
                    color="text-green-500"
                />
                <input
                    type="range" min="0.02" max="0.5" step="0.001" value={r2}
                    onChange={(e) => onR2Change(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition-all mt-2"
                />
            </ControlGroup>

            <ControlGroup 
                label="Stroke Depth (d₁)" 
            >
                <EditableValue 
                    value={d1} 
                    unit="mm" 
                    multiplier={1000}
                    decimals={0}
                    min={10} max={500}
                    onChange={(val) => onD1Change(val / 1000)}
                    color="text-purple-500"
                />
                <input
                    type="range" min="0.01" max="0.5" step="0.01" value={d1}
                    onChange={(e) => onD1Change(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all mt-2"
                />
            </ControlGroup>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Results</h3>
              <button
                onClick={() => setShowKPa(!showKPa)}
                className="text-[10px] font-bold px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors text-gray-300 uppercase tracking-wider"
              >
                {showKPa ? 'kPa' : 'Pa'}
              </button>
            </div>

            <div className="space-y-2 text-sm font-medium">
              <ResultRow label="Pressure (P)" value={`${showKPa ? formatNumber(P / 1000, 2) : formatNumber(P, 0)} ${showKPa ? 'kPa' : 'Pa'}`} color="text-blue-400" />
              <ResultRow label="Output Force (F₂)" value={`${formatNumber(F2, 0)} N`} color="text-green-400" />
              <ResultRow label="Output Displacement (d₂)" value={`${formatNumber(d2 * 1000, 2)} mm`} color="text-purple-400" />
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-gray-400">Mechanical Advantage:</span>
                <span className="font-mono text-yellow-400 font-bold">{formatNumber(F2 / f1, 1)}×</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onPress}
              disabled={isAnimating}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/25 active:scale-95"
            >
              <Play className={`w-5 h-5 ${isAnimating ? 'animate-pulse' : ''}`} fill="currentColor" />
              {isAnimating ? 'PRESSING...' : 'PRESS'}
            </button>
            <button
              onClick={onReset}
              disabled={isAnimating}
              className="bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg active:scale-95"
            >
              <RefreshCw className={`w-5 h-5 ${isAnimating ? 'opacity-50' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 pointer-events-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Physics Validation</h3>
          <div className="space-y-2 text-xs text-gray-400 font-mono">
            <div className="flex justify-between gap-4"><span>A₁ = π·r₁²</span> <span className="text-white">{formatNumber(A1, 6)} m²</span></div>
            <div className="flex justify-between gap-4"><span>A₂ = π·r₂²</span> <span className="text-white">{formatNumber(A2, 6)} m²</span></div>
            <div className="pt-2 border-t border-white/10 mt-2">
              <div className="text-gray-300 mb-1">F₁/A₁ = F₂/A₂</div>
              <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 p-1 rounded justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                Volume Conserved
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto w-full max-w-2xl px-4">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center justify-center">
          <p className="text-sm text-gray-300 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-orange-400 font-bold">Example:</span> F₁=100N, r₁=20mm, r₂=100mm 
            <span className="text-gray-500 mx-3">→</span>
            <span className="text-green-400 font-bold">F₂=2500N</span>
            <span className="text-gray-600 mx-3">|</span>
            <span className="text-yellow-400 font-bold">MA=25×</span>
          </p>
        </div>
      </div>
    </div>
  );
}


interface EditableValueProps {
  value: number;
  unit: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  multiplier?: number;
  decimals?: number;
  color: string;
}

function EditableValue({ 
  value, 
  unit, 
  onChange, 
  min, 
  max, 
  multiplier = 1, 
  decimals = 0, 
  color 
}: EditableValueProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const startEditing = () => {
        setTempValue((value * multiplier).toFixed(decimals));
        setIsEditing(true);
    };

    const commitChange = () => {
        const num = parseFloat(tempValue);
        if (!isNaN(num) && num >= min && num <= max) {
            onChange(num);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') commitChange();
        if (e.key === 'Escape') setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2 h-6">
                <input
                    ref={inputRef}
                    type="number"
                    value={tempValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValue(e.target.value)}
                    onBlur={commitChange}
                    onKeyDown={handleKeyDown}
                    className="w-20 bg-white/10 text-white text-right px-2 py-0.5 rounded-md border border-blue-500 outline-none font-mono text-sm shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all"
                />
                <button onMouseDown={commitChange} className="text-green-400 hover:text-green-300">
                    <Check className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div 
            onClick={startEditing}
            className={`group flex items-center gap-1 cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded-md transition-all border border-transparent hover:border-white/10`}
            title="Click to edit value"
        >
            <span className={`font-mono font-bold ${color}`}>
                {(value * multiplier).toFixed(decimals)}
            </span>
            <span className="text-gray-500 text-xs">{unit}</span>
            <Edit3 className="w-3 h-3 text-gray-600 group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all -ml-1 group-hover:ml-1" />
        </div>
    );
}

interface TechRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: string;
}

const TechRow = ({ icon, label, value, color }: TechRowProps) => (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-black/50 rounded-lg text-gray-400 group-hover:text-white transition-colors">
                {icon}
            </div>
            <span className="text-gray-400 text-sm font-medium group-hover:text-gray-200">{label}</span>
        </div>
        <span className={`text-sm font-bold font-mono ${color}`}>{value}</span>
    </div>
);

interface ControlGroupProps {
  label: string;
  children: [ReactNode, ReactNode]; 
}

const ControlGroup = ({ label, children }: ControlGroupProps) => (
    <div>
        <div className="flex items-center justify-between text-sm font-medium text-gray-300 mb-1">
            <span>{label}</span>
            {children[0]} 
        </div>
        {children[1]}
    </div>
);

interface ResultRowProps {
  label: string;
  value: string;
  color: string;
}

const ResultRow = ({ label, value, color }: ResultRowProps) => (
    <div className="flex justify-between items-center">
        <span className="text-gray-400">{label}:</span>
        <span className={`font-mono ${color}`}>{value}</span>
    </div>
);