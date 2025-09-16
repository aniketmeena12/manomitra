import React, { useState, useEffect, useRef } from "react";

const wordsList = [
  "focus",
  "keyboard",
  "speed",
  "react",
  "canvas",
  "typing",
  "challenge",
  "brain",
  "game",
  "concentration",
  "practice",
  "fast",
  "coding",
];

const FallingTypingGame = () => {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef(null);

  // Spawn new words
  useEffect(() => {
    if (gameOver) return;

    const spawnInterval = setInterval(() => {
      const randomWord =
        wordsList[Math.floor(Math.random() * wordsList.length)];
      const startX = Math.floor(Math.random() * 80); // random left %
      setWords((prev) => [
        ...prev,
        { text: randomWord, y: 0, x: startX, color: randomColor() },
      ]);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  // Make words fall
  useEffect(() => {
    if (gameOver) return;

    const fallInterval = setInterval(() => {
      setWords((prev) =>
        prev.map((word) => ({ ...word, y: word.y + 2 }))
      );
    }, 100);

    return () => clearInterval(fallInterval);
  }, [gameOver]);

  // Check if word hit bottom
  useEffect(() => {
    const containerHeight = containerRef.current?.offsetHeight || 400;
    words.forEach((word) => {
      if (word.y * 5 >= containerHeight - 30) {
        setGameOver(true);
      }
    });
  }, [words]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    words.forEach((word) => {
      if (word.text === value) {
        setWords((prev) => prev.filter((w) => w.text !== word.text));
        setScore((prev) => prev + 1);
        setUserInput("");
      }
    });
  };

  const restartGame = () => {
    setWords([]);
    setUserInput("");
    setScore(0);
    setGameOver(false);
  };

  function randomColor() {
    const colors = ["#ff4d6d", "#6dc1ff", "#ffcb6d", "#6dff96", "#d86dff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
        ⚡ Falling Words Typing Game
      </h1>
      <p className="text-lg mb-4 text-gray-700">Score: {score}</p>

      {!gameOver ? (
        <>
          <div
            ref={containerRef}
            className="relative w-full max-w-3xl h-[400px] border-4 border-gray-300 rounded-xl bg-white overflow-hidden shadow-lg"
          >
            {words.map((word, idx) => (
              <div
                key={idx}
                className="absolute text-2xl font-bold"
                style={{
                  top: `${word.y * 5}px`,
                  left: `${word.x}%`,
                  color: word.color,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                  transition: "top 0.1s linear",
                }}
              >
                {word.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Type the word here..."
            className="mt-6 px-6 py-3 w-full max-w-3xl rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md text-lg text-gray-800"
          />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mt-6 text-gray-800">
            Game Over!
          </h2>
          <p className="mb-4 text-gray-700 text-xl">Final Score: {score}</p>
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-full shadow-md hover:bg-gray-700 transition"
          >
            Restart
          </button>
        </>
      )}
    </div>
  );
};

export default FallingTypingGame;
