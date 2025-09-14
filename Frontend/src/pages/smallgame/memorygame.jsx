import React, { useState, useEffect } from "react";

const cardValues = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍑", "🍒"];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryMatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const doubled = [...cardValues, ...cardValues];
    setCards(shuffleArray(doubled));
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts(attempts + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx] === cards[secondIdx]) {
        setMatched([...matched, firstIdx, secondIdx]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const resetGame = () => {
    const doubled = [...cardValues, ...cardValues];
    setCards(shuffleArray(doubled));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">🧠 Memory Matching Game</h1>
      <p className="mb-4 text-lg text-gray-700">Attempts: {attempts}</p>
      <div className="grid grid-cols-4 gap-4 max-w-xl w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => handleClick(idx)}
              className={`h-24 flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer transition-transform duration-300
                ${isFlipped ? "bg-yellow-200" : "bg-gray-300 hover:bg-gray-400"}
                ${isFlipped ? "scale-105" : "scale-100"}`}
            >
              {isFlipped ? card : "❓"}
            </div>
          );
        })}
      </div>
      {matched.length === cards.length && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎉 You Won!</h2>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full shadow-md hover:bg-gray-700 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchingGame;
