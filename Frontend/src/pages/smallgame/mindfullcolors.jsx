import React, { useRef, useState } from "react";

const CanvasBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "my_drawing.png";
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 space-y-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-2">Mindful Colors</h2>
      <p className="text-gray-500 mb-2 text-center">
        Draw your thoughts and relax your mind. Use your mouse or touch to create!
      </p>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-black rounded-lg bg-white cursor-crosshair"
      />
      <div className="space-x-4">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
        >
          Clear
        </button>
        <button
          onClick={saveDrawing}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CanvasBoard;
