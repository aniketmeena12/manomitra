import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(0);
  const [scale, setScale] = useState(1);

  // user-defined durations
  const [inhaleTime, setInhaleTime] = useState(4);
  const [holdTime, setHoldTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);

  const phases = {
    inhale: { duration: inhaleTime, next: "hold" },
    hold: { duration: holdTime, next: "exhale" },
    exhale: { duration: exhaleTime, next: "inhale" },
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const currentPhase = phases[phase];

          if (prev >= currentPhase.duration) {
            setPhase(currentPhase.next);
            return 0;
          }

          // Update scale based on phase
          if (phase === "inhale") {
            setScale(1 + (prev / currentPhase.duration) * 0.3);
          } else if (phase === "exhale") {
            setScale(1.3 - (prev / currentPhase.duration) * 0.5);
          }

          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, inhaleTime, holdTime, exhaleTime]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase("inhale");
    setTimer(0);
    setScale(1);
  };

  return (
    <section
      id="breathing"
      className="py-20"
      style={{ backgroundColor: "#A8D0E6" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="mb-8 text-4xl" style={{ color: "#4A4A4A" }}>
          Guided Breathing
        </h2>
        <p
          className="mb-12 text-lg max-w-2xl mx-auto"
          style={{ color: "#4A4A4A" }}
        >
          Customize your breathing cycle and follow the visual guide.
        </p>

        {/* Settings */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-700">Inhale (s)</label>
            <input
              type="number"
              min="1"
              value={inhaleTime}
              onChange={(e) => setInhaleTime(Number(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-700">Hold (s)</label>
            <input
              type="number"
              min="1"
              value={holdTime}
              onChange={(e) => setHoldTime(Number(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm text-gray-700">Exhale (s)</label>
            <input
              type="number"
              min="1"
              value={exhaleTime}
              onChange={(e) => setExhaleTime(Number(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>

        {/* Breathing circle */}
        <div className="mb-12">
          <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
            <div
              className="w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-100 ease-in-out shadow-lg"
              style={{
                transform: `scale(${scale})`,
                background:
                  "linear-gradient(to bottom right, #7B9ACC, #E4D9FF)",
              }}
            >
              <div className="text-center">
                <div
                  className="text-2xl mb-2 capitalize"
                  style={{ color: "white" }}
                >
                  {phase}
                </div>
                <div className="text-sm" style={{ color: "white" }}>
                  {Math.ceil(phases[phase].duration - timer)}s
                </div>
              </div>
            </div>
            <div
              className="absolute w-72 h-72 rounded-full border-2 opacity-30"
              style={{ borderColor: "#4A4A4A" }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={toggleExercise}
            size="lg"
            className="flex items-center gap-2 text-white bg-[#7B9ACC] hover:bg-[#abc3e9] cursor-pointer"
          >
            {isActive ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button
            onClick={resetExercise}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border cursor-pointer"
            style={{ borderColor: "#4A4A4A", color: "#4A4A4A" }}
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
