import React, { useState, useEffect } from "react";

// Utility to format date as YYYY-MM-DD
const getToday = () => new Date().toISOString().split("T")[0];

export default function PositiveHabitTracker({ userId = "guest" }) {
  const habits = [
    { id: 1, name: "💧 Drink Water", benefit: "Keeps you hydrated & improves focus", reward: 10 },
    { id: 2, name: "📔 Journal Daily", benefit: "Clears your mind & reduces stress", reward: 10 },
    { id: 3, name: "🚶 Walk 15 mins", benefit: "Boosts energy & mood", reward: 10 },
    { id: 4, name: "🧘 Meditation", benefit: "Relieves anxiety & sharpens focus", reward: 15 },
    { id: 5, name: "🌞 Morning Sunlight", benefit: "Regulates sleep & boosts Vitamin D", reward: 10 },
    { id: 6, name: "📚 Read 10 pages", benefit: "Increases knowledge & focus", reward: 10 },
    { id: 7, name: "🍎 Eat a Fruit", benefit: "Improves nutrition & immunity", reward: 5 },
    { id: 8, name: "🤝 Gratitude Note", benefit: "Improves positivity & relationships", reward: 10 },
    { id: 9, name: "🎶 Listen to Music", benefit: "Lifts mood instantly", reward: 5 },
  ];

  // Load user data from localStorage
  const loadUserData = () => {
    const data = JSON.parse(localStorage.getItem("habitData")) || {};
    const today = getToday();

    // If new day → reset completed habits
    if (data[userId]?.lastDate !== today) {
      return {
        points: data[userId]?.points || 0,
        streak: data[userId]?.streak || 0,
        completed: [],
        lastDate: today,
      };
    }
    return data[userId] || { points: 0, streak: 0, completed: [], lastDate: today };
  };

  const [userData, setUserData] = useState(loadUserData);

  // Save whenever userData changes
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("habitData")) || {};
    allUsers[userId] = userData;
    localStorage.setItem("habitData", JSON.stringify(allUsers));
  }, [userData, userId]);

  const handleComplete = async (habit) => {
  if (!userData.completed.includes(habit.id)) {
    const updatedCompleted = [...userData.completed, habit.id];

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/habits/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ habitId: habit.id, reward: habit.reward }),
      });

      const data = await res.json();

      let newData = {
        ...userData,
        completed: updatedCompleted,
        streak: data.streak,
        points: data.wellnessPoints,
      };

      setUserData(newData);
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  }
};


  const progress = Math.round((userData.completed.length / habits.length) * 100);

  return (
    <div className="bg-[rgb(228,217,255,0.3)] shadow-md rounded-2xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">🌱 Positive Habit Tracker</h3>
        <span className="bg-yellow-100 text-yellow-700 text-sm font-medium px-3 py-1 rounded-full">
          🔥 Streak: {userData.streak} days
        </span>
      </div>

      <p className="text-gray-600 mb-3">
        Replace bad habits with good ones & grow every day 💪
      </p>

      {/* Points */}
      <div className="mb-4 text-green-600 font-semibold">
        🎯 {userData.points} Points Earned
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {userData.completed.length}/{habits.length} habits completed ({progress}%)
      </p>

      {/* Motivational Message */}
      <div className="bg-purple-50 p-3 rounded-lg text-sm text-purple-700 mb-4">
        {progress === 0 && "🌟 Let's start small – 1 habit at a time!"}
        {progress > 0 && progress < 50 && "💡 Keep going! You're building momentum."}
        {progress >= 50 && progress < 100 && "🔥 Amazing! You're more than halfway there."}
        {progress === 100 && "🏆 All habits completed today – You’re unstoppable!"}
      </div>

      {/* Habits List */}
      <ul className="space-y-3">
        {habits.map((habit) => (
          <li
            key={habit.id}
            onClick={() => handleComplete(habit)}
            className={`p-3 rounded-lg border cursor-pointer transition ${
              userData.completed.includes(habit.id)
                ? "bg-green-100 line-through text-gray-500"
                : "bg-white/70 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{habit.name}</span>
              {userData.completed.includes(habit.id) && <span>✅</span>}
            </div>
            <p className="text-xs text-gray-600">{habit.benefit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
