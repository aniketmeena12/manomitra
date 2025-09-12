import React, { useState } from "react";

const Peerform = () => {
  const [problems, setProblems] = useState([]);
  const [text, setText] = useState("");

  const addProblem = () => {
    if (!text.trim()) return;
    setProblems([
      ...problems,
      { id: Date.now(), text, reactions: { like: 0, support: 0, sad: 0 } }
    ]);
    setText("");
  };

  const handleReaction = (id, type) => {
    setProblems(
      problems.map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } }
          : p
      )
    );
  };

  return (
    <div className="bg-[rgb(255,255,255,0.6)] rounded-xl p-5 shadow-md">
    <div className="max-w-xl mx-auto p-6">
      {/* Problem Input */}
      <div className="mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your problem here..."
          className="w-full border rounded-lg p-3 mb-2 input-box"
        />
        <button
          onClick={addProblem}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Post Problem
        </button>
      </div>

      {/* Problem List */}
      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="p-4 bg-white rounded-lg shadow border"
          >
            <p className="text-gray-800">{problem.text}</p>
            <div className="flex space-x-4 mt-3 text-sm">
              <button
                onClick={() => handleReaction(problem.id, "like")}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                👍 {problem.reactions.like}
              </button>
              <button
                onClick={() => handleReaction(problem.id, "support")}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                🤝 {problem.reactions.support}
              </button>
              <button
                onClick={() => handleReaction(problem.id, "sad")}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                😢 {problem.reactions.sad}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Peerform;
