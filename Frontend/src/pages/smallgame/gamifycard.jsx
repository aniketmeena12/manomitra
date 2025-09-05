import React, { useEffect, useState } from "react";

/**
 * GamifyCard with Breathing Modal
 */
export default function GamifyCard({
  id = "gamify-1",
  title = "Daily Wellness Quest",
  desc = "Complete a short breathing exercise to earn points.",
  goal = 10,
  initialPoints = 0,
}) {
  const storageKey = `manomitra:${id}:points`;
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? Number(saved) : initialPoints;
  });
  const [completed, setCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const progress = Math.min(100, Math.round((points / goal) * 100));

  useEffect(() => {
    localStorage.setItem(storageKey, String(points));
    setCompleted(points >= goal);
  }, [points, storageKey, goal]);

  const earnPoints = (n = 2) => {
    setPoints((p) => Math.min(goal, p + n));
  };

  const startBreathing = () => {
    setShowModal(true);
    setTimeout(() => {
      earnPoints(3);
      setShowModal(false);
    }, 8000);
  };

  const handleReset = () => {
    setPoints(0);
  };

  return (
    <>
      {/* Main Gamify Card */}
      <div className="bg-[#FFFCEF] rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{desc}</p>
        <div className="mb-4">
          <span className="bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {points} pts
          </span>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-amber-100 rounded-full mt-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#ff9324] to-[#e99a4b] transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-4 text-gray-600">
          Goal: <span className="font-semibold">{goal} points</span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          {!completed ? (
            <button
              onClick={startBreathing}
              className="flex-1 bg-gradient-to-r from-[#ff9324] to-[#e99a4b] hover:bg-black text-white font-semibold px-7 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Start Task
            </button>
          ) : (
            <div className="flex-1 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
              🎉 Completed!
            </div>
          )}
          <button
            onClick={handleReset}
            className="text-[#ff9324] text-sm font-medium mt-2 ml-2 hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Breathing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#FFFCEF] rounded-2xl border border-amber-200 p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-black mb-4">
              Breathe with me 🌬️
            </h2>
            <p className="text-amber-700 mb-6">
              Inhale as the circle grows, exhale as it shrinks.
            </p>
            <div className="flex justify-center mb-6">
              <div className="animate-breathe w-24 h-24 rounded-full bg-gradient-to-r from-[#ff9324] to-[#e99a4b]"></div>
            </div>
            <p className="text-sm text-amber-500 italic">One cycle = 8 seconds</p>
          </div>
        </div>
      )}
    </>
  );
}
