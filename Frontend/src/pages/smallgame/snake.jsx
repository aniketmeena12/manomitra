import React, { useRef, useState, useEffect, useCallback } from "react";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [rows] = useState(20);
  const [cols] = useState(20);
  const [cellSize] = useState(20);
  const [speed, setSpeed] = useState(120); // ms per tick

  // Game state refs to avoid re-renders inside RAF loop
  const snakeRef = useRef([{ x: 9, y: 9 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef(placeRandomFood([{ x: 9, y: 9 }], cols, rows));
  const lastMoveRef = useRef(Date.now());

  // Helpers
  function isEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }

  function placeRandomFood(snake, cols, rows) {
    const occupied = new Set(snake.map(p => `${p.x},${p.y}`));
    let fx, fy;
    do {
      fx = Math.floor(Math.random() * cols);
      fy = Math.floor(Math.random() * rows);
    } while (occupied.has(`${fx},${fy}`));
    return { x: fx, y: fy };
  }

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
    dirRef.current = { x: 1, y: 0 };
    foodRef.current = placeRandomFood(snakeRef.current, cols, rows);
    setScore(0);
    setSpeed(120);
    setPaused(false);
    setRunning(true);
    lastMoveRef.current = Date.now();
  }, [cols, rows]);

  // Keyboard controls
  useEffect(() => {
    function handleKey(e) {
      if (!running) return;
      const key = e.key;
      const d = dirRef.current;
      if (key === "ArrowUp" || key === "w") {
        if (d.y !== 1) dirRef.current = { x: 0, y: -1 };
      } else if (key === "ArrowDown" || key === "s") {
        if (d.y !== -1) dirRef.current = { x: 0, y: 1 };
      } else if (key === "ArrowLeft" || key === "a") {
        if (d.x !== 1) dirRef.current = { x: -1, y: 0 };
      } else if (key === "ArrowRight" || key === "d") {
        if (d.x !== -1) dirRef.current = { x: 1, y: 0 };
      } else if (key === " ") {
        // space to pause/unpause
        setPaused(p => !p);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running]);

  // Main game tick
  useEffect(() => {
    let rafId;

    function loop() {
      const now = Date.now();
      if (!paused && running && now - lastMoveRef.current >= speed) {
        step();
        lastMoveRef.current = now;
      }
      draw();
      rafId = requestAnimationFrame(loop);
    }

    if (running) {
      rafId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, paused, speed]);

  function step() {
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };
    const d = dirRef.current;
    head.x += d.x;
    head.y += d.y;

    // check border collision -> game over
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      setRunning(false);
      setPaused(false);
      return;
    }

    // check self-collision -> game over
    for (let i = 0; i < snake.length; i++) {
      if (isEqual(head, snake[i])) {
        setRunning(false);
        setPaused(false);
        return;
      }
    }

    snake.unshift(head);

    // eat food?
    if (isEqual(head, foodRef.current)) {
      setScore(s => s + 1);
      setSpeed(prev => Math.max(40, Math.floor(prev * 0.93)));
      foodRef.current = placeRandomFood(snake, cols, rows);
    } else {
      snake.pop();
    }

    snakeRef.current = snake;
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // size
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    // clear
    ctx.fillStyle = "#0b1220"; // background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * cellSize);
      ctx.lineTo(canvas.width, j * cellSize);
      ctx.stroke();
    }

    // draw food
    const food = foodRef.current;
    drawCell(ctx, food.x, food.y, cellSize, "#ff4d4f");

    // draw snake
    const snake = snakeRef.current;
    for (let i = 0; i < snake.length; i++) {
      const s = snake[i];
      const isHead = i === 0;
      drawCell(ctx, s.x, s.y, cellSize, isHead ? "#a0e7a0" : "#3ddc84");
    }
  }

  function drawCell(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
  }

  // Controls for touch (swipe)
  useEffect(() => {
    let startX = null;
    let startY = null;

    function touchStart(e) {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }

    function touchMove(e) {
      if (!startX || !startY) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 20 && dirRef.current.x !== -1) dirRef.current = { x: 1, y: 0 };
        else if (dx < -20 && dirRef.current.x !== 1) dirRef.current = { x: -1, y: 0 };
      } else {
        if (dy > 20 && dirRef.current.y !== -1) dirRef.current = { x: 0, y: 1 };
        else if (dy < -20 && dirRef.current.y !== 1) dirRef.current = { x: 0, y: -1 };
      }
      startX = null;
      startY = null;
    }

    const c = canvasRef.current;
    if (c) {
      c.addEventListener("touchstart", touchStart, { passive: true });
      c.addEventListener("touchmove", touchMove, { passive: true });
    }
    return () => {
      if (c) {
        c.removeEventListener("touchstart", touchStart);
        c.removeEventListener("touchmove", touchMove);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-indigo-100">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-xl w-full">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Snake Game</h2>
        <p className="text-gray-500 mb-4 text-center">
          Use <b>arrow keys</b> or <b>WASD</b> to move. Space to pause. On touch devices, swipe to change direction.
        </p>
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full flex justify-center">
            <canvas
              ref={canvasRef}
              className="rounded-xl shadow-lg bg-[#0b1220] border-4 border-indigo-200"
              style={{
                maxWidth: 400,
                maxHeight: 400,
                width: "100%",
                aspectRatio: "1/1",
                background: "#0b1220",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <div className="flex gap-4 mt-6">
            {!running ? (
              <button onClick={resetGame} className={btnClass}>
                Start
              </button>
            ) : (
              <button
                onClick={() => setPaused(p => !p)}
                className={btnClass}
              >
                {paused ? "Resume" : "Pause"}
              </button>
            )}
            <button
              onClick={() => {
                snakeRef.current = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
                dirRef.current = { x: 1, y: 0 };
                foodRef.current = placeRandomFood(snakeRef.current, cols, rows);
                setScore(0);
                setSpeed(120);
                setPaused(false);
                setRunning(false);
                draw();
              }}
              className={btnClass}
            >
              Reset
            </button>
            <button
              onClick={() => setSpeed(prev => (prev <= 60 ? 120 : 60))}
              className={btnClass}
            >
              Speed: {speed}ms
            </button>
          </div>
          <div className="flex gap-8 mt-6 text-lg font-semibold text-indigo-700">
            <span>Score: {score}</span>
            <span>Speed: {speed}ms</span>
          </div>
        </div>
        <div className="mt-8 w-full">
          <div className="bg-indigo-50 rounded-lg p-4 text-indigo-800 text-sm">
            <b>Tips:</b>
            <ul className="list-disc pl-6 mt-1">
              <li>Try not to trap yourself — plan turns ahead.</li>
              <li>Edges are fatal; avoid crashing into them.</li>
              <li>Speed increases slowly as you eat food.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnClass =
  "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors";
