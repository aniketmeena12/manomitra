import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Free soothing background sounds
const sounds = {
  None: "",
  Rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
  Forest: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  Ocean: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

const motivationalTips = [
  "You are stronger than you think 🌱",
  "It’s okay to take things one step at a time 💙",
  "Breathe deeply — you are safe right now 🌸",
  "Your thoughts matter. Your feelings are valid 🌟",
  "Every day is a new chance for growth 🌿",
];

const LocalJournal = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");
  const [mood, setMood] = useState("🙂");
  const [tip, setTip] = useState("");
  const [sound, setSound] = useState("None");
  const [audio, setAudio] = useState(null);

  // Load saved entries
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    setTip(motivationalTips[Math.floor(Math.random() * motivationalTips.length)]);
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  // Handle background sounds
  useEffect(() => {
    if (audio) {
      audio.pause();
    }
    if (sound !== "None") {
      const newAudio = new Audio(sounds[sound]);
      newAudio.loop = true;
      newAudio.volume = 0.5;
      newAudio.play();
      setAudio(newAudio);
    }
  }, [sound]);

  const addEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      id: Date.now(),
      mood,
      text,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setText("");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center overflow-y-auto" style={{ maxHeight: 500 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-700 mb-2"
      >
        🌸 My Gentle Journal
      </motion.h1>
      <p className="italic text-gray-600 mb-6">{tip}</p>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <select
          className="px-3 py-2 rounded-lg shadow bg-white border"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option>🙂</option>
          <option>😊</option>
          <option>😔</option>
          <option>😡</option>
          <option>😴</option>
        </select>

        <select
          className="px-3 py-2 rounded-lg shadow bg-white border"
          value={sound}
          onChange={(e) => setSound(e.target.value)}
        >
          {Object.keys(sounds).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Entry box */}
      <textarea
        className="w-full max-w-xl p-4 rounded-xl border shadow focus:ring-2 focus:ring-blue-300"
        rows="4"
        placeholder="Write your thoughts here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={addEntry}
        className="mt-4 px-6 py-2 rounded-xl bg-blue-400 text-white shadow hover:bg-blue-500 transition"
      >
        Save Entry
      </button>

      {/* Journal entries */}
      <div className="mt-8 w-full max-w-xl space-y-4">
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg">{entry.mood}</span>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </div>
            <p className="mt-2 text-gray-700">{entry.text}</p>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LocalJournal;
