"use client";

import { UserContext } from "@/context/usercontext";
import React, { useContext, useState } from "react";

// Mood options with emoji and color
const moods = [
  { name: "Excited", emoji: "🤩", color: "bg-yellow-300" },
  { name: "Happy", emoji: "😊", color: "bg-green-300" },
  { name: "Calm", emoji: "😌", color: "bg-blue-200" },
  { name: "Surprised", emoji: "😮", color: "bg-pink-200" },
  { name: "Anxious", emoji: "😬", color: "bg-orange-200" },
  { name: "Sad", emoji: "😢", color: "bg-blue-300" },
  { name: "Angry", emoji: "😡", color: "bg-red-300" },
  { name: "Tired", emoji: "🥱", color: "bg-purple-200" },
  { name: "Frustrated", emoji: "😤", color: "bg-red-200" },
];

const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const getMonthName = (month) =>
  new Date(2000, month, 1).toLocaleString("default", { month: "long" });

const habits = [
  { name: "sleep 8hrs" },
  { name: "meditate" },
  { name: "exercise" },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

const MoodTracker = () => {
  const {user} = useContext(UserContext);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journal, setJournal] = useState({});
  const [entry, setEntry] = useState("");
  const [activeTab, setActiveTab] = useState("month");
  const [calendar, setCalendar] = useState({});
  const [selectedHabit, setSelectedHabit] = useState(null);
  // Track habit completion: { habitName: { 'YYYY-MM-DD': true } }
  const [habitData, setHabitData] = useState({});
  // New: state for displayed month/year
  const now = new Date();
  const [displayMonth, setDisplayMonth] = useState(now.getMonth());
  const [displayYear, setDisplayYear] = useState(now.getFullYear());

  // Days in displayed month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const today = getToday();

  // Mood select handler
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // Save mood for the selected day in displayed month
    const dateKey = `${displayYear}-${displayMonth + 1}-${now.getDate()}`;
    setCalendar((prev) => ({
      ...prev,
      [dateKey]: mood,
    }));
  };

  // Journal entry handler
  const handleAddEntry = () => {
    const dateKey = `${displayYear}-${displayMonth + 1}-${now.getDate()}`;
    if (entry.trim()) {
      setJournal((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), entry],
      }));
      setEntry("");
    }
  };

  // Habit tracker handler
  const handleHabit = (habit) => {
    setHabitData((prev) => ({
      ...prev,
      [habit]: prev[habit] === today ? null : today,
    }));
  };

  // Get current week dates (Monday to Sunday)
  const getCurrentWeekDates = () => {
    const now = new Date();
    // Monday as first day of week
    const monday = new Date(now);
    const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
    monday.setDate(now.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    });
  };

  // Toggle habit for a specific day
  const toggleHabitDay = (habit, dateKey) => {
    setHabitData((prev) => {
      // Toggle the clicked day
      const updated = {
        ...(prev[habit] || {}),
        [dateKey]: !(prev[habit] && prev[habit][dateKey]),
      };

      // Get all 7 days for this week
      const weekDates = getCurrentWeekDates();
      // Check if all 7 days are done
      const allDone = weekDates.every((d) => updated[d]);

      // If all done, clear all
      if (allDone) {
        weekDates.forEach((d) => {
          updated[d] = false;
        });
      }

      return {
        ...prev,
        [habit]: updated,
      };
    });
  };

  // Change month
  const changeMonth = (offset) => {
    let newMonth = displayMonth + offset;
    let newYear = displayYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setDisplayMonth(newMonth);
    setDisplayYear(newYear);
  };

  return (
    <div className="min-h-screen bg-[rgba(255,245,204,0.7)] flex justify-center py-8 px-2 rounded-3xl">
      <div className="w-full max-w-2xl bg-[#FFF5CC] rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-xl font-bold mb-1">
          DEAR {user?.name?.split(" ")[0] || "ADI"}!
        </h1>
        <p className="text-gray-700 mb-4">How was your day?</p>

        {/* Mood Selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {moods.map((m) => (
            <button
              key={m.name}
              onClick={() => handleMoodSelect(m.name)}
              className={`flex flex-col items-center justify-center rounded-full px-4 py-2 text-sm border transition ${
                selectedMood === m.name
                  ? `${m.color} text-black scale-105`
                  : "bg-white hover:bg-yellow-100"
              }`}
              style={{ minWidth: 80 }}
            >
              <span className="text-2xl">{m.emoji}</span>
              {m.name}
            </button>
          ))}
        </div>

        {/* Calendar & Tabs */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex justify-between mb-3 items-center">
            <span className="font-medium">MY CALENDAR</span>
            <div className="flex items-center gap-2">
              {activeTab === "month" && (
                <>
                  <button
                    onClick={() => changeMonth(-1)}
                    className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                    aria-label="Previous month"
                  >
                    &lt;
                  </button>
                  <span className="font-semibold">
                    {getMonthName(displayMonth)} {displayYear}
                  </span>
                  <button
                    onClick={() => changeMonth(1)}
                    className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                    aria-label="Next month"
                  >
                    &gt;
                  </button>
                </>
              )}
              <button
                onClick={() => setActiveTab("month")}
                className={`px-2 py-1 text-sm rounded ${
                  activeTab === "month" ? "bg-yellow-300" : "bg-gray-100"
                }`}
              >
                month
              </button>
              <button
                onClick={() => setActiveTab("week")}
                className={`px-2 py-1 text-sm rounded ${
                  activeTab === "week" ? "bg-yellow-300" : "bg-gray-100"
                }`}
              >
                week
              </button>
              <button
                onClick={() => setActiveTab("graph")}
                className={`px-2 py-1 text-sm rounded ${
                  activeTab === "graph" ? "bg-yellow-300" : "bg-gray-100"
                }`}
              >
                graph
              </button>
            </div>
          </div>

          {/* Month Calendar */}
          {activeTab === "month" && (
            <div className="grid grid-cols-7 gap-2 text-center">
              {[...Array(daysInMonth)].map((_, i) => {
                const dateKey = `${displayYear}-${displayMonth + 1}-${i + 1}`;
                const mood = calendar[dateKey];
                const moodObj = moods.find((m) => m.name === mood);
                return (
                  <div
                    key={i}
                    className={`p-2 rounded-full text-xl border ${
                      moodObj ? moodObj.color : "bg-yellow-50"
                    }`}
                  >
                    {moodObj ? moodObj.emoji : i + 1}
                  </div>
                );
              })}
            </div>
          )}

          {/* Week View */}
          {activeTab === "week" && (
            <div className="flex justify-between items-center px-2 py-4">
              {(() => {
                // Find the reference date: today if in displayed month, else 1st of displayed month
                const referenceDate = new Date(displayYear, displayMonth, now.getDate());
                if (referenceDate.getMonth() !== displayMonth) {
                  referenceDate.setDate(1);
                }
                // Find the Monday of the week (for Monday-start week)
                const dayOfWeek = referenceDate.getDay() === 0 ? 6 : referenceDate.getDay() - 1; // 0=Sunday, 1=Monday...
                const weekStart = new Date(referenceDate);
                weekStart.setDate(referenceDate.getDate() - dayOfWeek);

                // Weekday labels, Monday to Sunday
                const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

                return weekDays.map((d, idx) => {
                  const date = new Date(weekStart);
                  date.setDate(weekStart.getDate() + idx);
                  const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                  const mood = calendar[dateKey];
                  const moodObj = moods.find((m) => m.name === mood);
                  return (
                    <div
                      key={d}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border ${
                        moodObj ? moodObj.color : "bg-yellow-50"
                      }`}
                    >
                      {moodObj ? moodObj.emoji : d}
                    </div>
                  );
                });
              })()}
            </div>
          )}

          {/* Graph View (simple bar chart demo) */}
          {activeTab === "graph" && (
            <div className="w-full h-48 flex items-center justify-center">
              <div className="flex gap-2 w-full">
                {moods.map((m) => {
                  // Count mood occurrences in calendar
                  const count = Object.values(calendar).filter(
                    (v) => v === m.name
                  ).length;
                  return (
                    <div key={m.name} className="flex flex-col items-center w-8">
                      <div
                        className={`rounded-t-lg ${m.color}`}
                        style={{
                          height: `${count * 16}px`,
                          minHeight: "8px",
                          width: "100%",
                          transition: "height 0.3s",
                        }}
                      ></div>
                      <span className="text-xs mt-1">{m.emoji}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Journal Section */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="mb-2 text-gray-600 font-medium">
            {new Date().toLocaleString("default", {
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {moods.map((m) => (
              <button
                key={m.name}
                onClick={() => handleMoodSelect(m.name)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedMood === m.name ? m.color : "bg-yellow-50"
                }`}
              >
                {m.emoji} {m.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="what happened?"
            className="w-full border rounded-lg p-2 mb-2"
          />
          <button
            onClick={handleAddEntry}
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg"
          >
            +
          </button>
          <div className="mt-4">
            {(journal[today] || []).map((j, i) => (
              <div key={i} className="border-b py-2 text-gray-700">
                {j}
              </div>
            ))}
          </div>
        </div>

        {/* Habit Tracker */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-bold mb-2">TRACK OTHER HABITS</div>
          {habits.map((h) => (
            <div key={h.name} className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSelectedHabit(selectedHabit === h.name ? null : h.name)
                  }
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    habitData[h.name] && habitData[h.name][getToday()]
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-yellow-400"
                  }`}
                >
                  {habitData[h.name] && habitData[h.name][getToday()] && (
                    <span className="block w-3 h-3 bg-yellow-600 rounded-full"></span>
                  )}
                </button>
                <span className="text-sm">{h.name}</span>
              </div>
              {/* Weekly tracker for this habit */}
              {selectedHabit === h.name && (
                <div className="flex gap-2 mt-2 ml-8 items-center">
                  {weekDays.map((label, idx) => {
                    // Get the date for this weekday in the current week
                    const now = new Date();
                    const monday = new Date(now);
                    const day = now.getDay() === 0 ? 6 : now.getDay() - 1;
                    monday.setDate(now.getDate() - day);
                    const d = new Date(monday);
                    d.setDate(monday.getDate() + idx);
                    const dateKey = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                    const done = habitData[h.name] && habitData[h.name][dateKey];
                    return (
                      <div key={label} className="flex flex-col items-center">
                        <button
                          onClick={() => toggleHabitDay(h.name, dateKey)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            done
                              ? "bg-yellow-400 border-yellow-500"
                              : "bg-gray-200"
                          }`}
                          title={label}
                        >
                          {done && (
                            <span className="block w-3 h-3 bg-yellow-600 rounded-full"></span>
                          )}
                        </button>
                        <span className="text-xs mt-1">{label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
