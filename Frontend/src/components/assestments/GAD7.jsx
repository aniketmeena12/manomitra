import React, { useState } from "react";

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const gad7Options = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

const GAD7Form = () => {
  const [answers, setAnswers] = useState(Array(gad7Questions.length).fill(null));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalScore = answers.reduce((acc, curr) => acc + (curr ?? 0), 0);

    let judgment = "";
    if (totalScore <= 4) {
      judgment = "✅ Minimal anxiety.";
    } else if (totalScore <= 9) {
      judgment = "⚠️ Mild anxiety.";
    } else if (totalScore <= 14) {
      judgment = "❗ Moderate anxiety.";
    } else {
      judgment = "🚨 Severe anxiety – consider professional help.";
    }

    setResult({ totalScore, judgment });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">GAD-7 Questionnaire</h2>

      {gad7Questions.map((q, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium text-gray-700 mb-2">
            {i + 1}. {q}
          </p>
          <div className="flex flex-wrap gap-4">
            {gad7Options.map((opt) => (
              <label key={opt.value} className="flex items-center">
                <input
                  type="radio"
                  name={`gad7-${i}`}
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
          <p className="mt-2">Score: {result.totalScore} / 21</p>
          <p className="mt-1">{result.judgment}</p>
        </div>
      )}
    </form>
  );
};

export default GAD7Form;
