import React, { useState } from "react";

const ghqQuestions = [
  "Able to concentrate on whatever you're doing",
  "Lost much sleep over worry",
  "Felt constantly under strain",
  "Felt you couldn’t overcome difficulties",
  "Able to enjoy normal day-to-day activities",
  "Felt unhappy or depressed",
  "Felt reasonably happy, all things considered",
];

const ghqOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Sometimes" },
  { value: 2, label: "Often" },
  { value: 3, label: "Almost always" },
];

const GHQForm = () => {
  const [answers, setAnswers] = useState(Array(ghqQuestions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Binary GHQ scoring (0-0-1-1)
    const binaryScores = answers.map((ans) => (ans >= 2 ? 1 : 0));
    const totalScore = binaryScores.reduce((acc, curr) => acc + curr, 0);

    let judgment = "";
    if (totalScore <= 2) {
      judgment = "✅ Normal range – low risk of distress.";
    } else if (totalScore <= 4) {
      judgment = "⚠️ Moderate distress – monitor and seek support if needed.";
    } else {
      judgment = "❗ High distress – consider professional help.";
    }

    setResult({ totalScore, judgment });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">GHQ Questionnaire</h2>

      {ghqQuestions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium text-gray-700 mb-2">
            {i + 1}. {q}
          </p>
          <div className="flex flex-wrap gap-4">
            {ghqOptions.map((opt) => (
              <label key={opt.value} className="flex items-center">
                <input
                  type="radio"
                  name={`ghq-${i}`}
                  value={opt.value}
                  checked={answers[i] === opt.value}
                  onChange={() => handleChange(i, opt.value)}
                  className="mr-2 cursor-pointer"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
      >
        Submit
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold">Your Result</h3>
          <p className="mt-2">Score: {result.totalScore} / 7</p>
          <p className="mt-1">{result.judgment}</p>
        </div>
      )}
    </form>
  );
};

export default GHQForm;
