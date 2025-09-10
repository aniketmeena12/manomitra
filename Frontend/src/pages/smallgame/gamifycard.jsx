import { useState, useEffect } from 'react';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [timer, setTimer] = useState(0);
  const [scale, setScale] = useState(1);

  const phases = {
    inhale: { duration: 4, next: 'hold' },
    hold: { duration: 4, next: 'exhale' },
    exhale: { duration: 6, next: 'inhale' }
  };

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          const currentPhase = phases[phase];
          
          if (prev >= currentPhase.duration) {
            setPhase(currentPhase.next);
            return 0;
          }
          
          // Update scale based on phase
          if (phase === 'inhale') {
            setScale(1 + (prev / currentPhase.duration) * 0.3);
          } else if (phase === 'exhale') {
            setScale(1.3 - (prev / currentPhase.duration) * 0.5);
          }
          
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(0);
    setScale(1);
  };

  return (
    <section id="breathing" className="py-20" style={{ backgroundColor: '#A8D0E6' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="mb-8 text-4xl" style={{ color: '#4A4A4A' }}>
          Guided Breathing
        </h2>
        <p className="mb-12 text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
          Follow the visual guide below. Breathe in as the circle grows, hold when it pauses, and breathe out as it shrinks.
        </p>
        
        <div className="mb-12">
          <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
            {/* Breathing circle */}
            <div 
              className="w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-100 ease-in-out shadow-lg"
              style={{ 
                transform: `scale(${scale})`,
                background: 'linear-gradient(to bottom right, #7B9ACC, #E4D9FF)'
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2 capitalize" style={{ color: 'white' }}>
                  {phase}
                </div>
                <div className="text-sm" style={{ color: 'white' }}>
                  {Math.ceil(phases[phase].duration - timer)}s
                </div>
              </div>
            </div>
            
            {/* Outer ring for visual guidance */}
            <div 
              className="absolute w-72 h-72 rounded-full border-2 opacity-30"
              style={{ borderColor: '#4A4A4A' }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={toggleExercise}
            size="lg"
            className="flex items-center gap-2 text-white"
            style={{ backgroundColor: '#7B9ACC' }}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            onClick={resetExercise}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border"
            style={{ borderColor: '#4A4A4A', color: '#4A4A4A' }}
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h3 className="mb-4" style={{ color: '#4A4A4A' }}>
            How to Practice
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg">
              <div className="mb-2" style={{ color: '#7B9ACC' }}>Inhale (4s)</div>
              <p style={{ color: '#4A4A4A' }}>Breathe in slowly through your nose</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg">
              <div className="mb-2" style={{ color: '#7B9ACC' }}>Hold (4s)</div>
              <p style={{ color: '#4A4A4A' }}>Hold your breath gently</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-4 rounded-lg">
              <div className="mb-2" style={{ color: '#7B9ACC' }}>Exhale (6s)</div>
              <p style={{ color: '#4A4A4A' }}>Breathe out slowly through your mouth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}