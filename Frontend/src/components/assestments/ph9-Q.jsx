import React, { useState } from "react";

const phq9Questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure?",
  "Trouble concentrating on things?",
  "Moving or speaking so slowly that others could notice?",
  "Thoughts that you would be better off dead, or hurting yourself?",
];

const options = [
  { label: "Not at all", score: 0 },
  { label: "Several days", score: 1 },
  { label: "More than half the days", score: 2 },
  { label: "Nearly every day", score: 3 },
];

export default function PHQ9Assessment() {
  const [answers, setAnswers] = useState(Array(phq9Questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, score) => {
    const newAns = [...answers];
    newAns[qIndex] = score;
    setAnswers(newAns);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }
    setSubmitted(true);
  };

  const totalScore = answers.reduce((a, b) => a + (b ?? 0), 0);

  const getSeverity = () => {
    if (totalScore <= 4) return "Minimal depression";
    if (totalScore <= 9) return "Mild depression";
    if (totalScore <= 14) return "Moderate depression";
    if (totalScore <= 19) return "Moderately severe depression";
    return "Severe depression";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">PHQ-9 Assessment</h2>

      {!submitted ? (
        <div className="space-y-6">
          {phq9Questions.map((q, i) => (
            <div key={i}>
              <p className="font-medium text-gray-700">{i + 1}. {q}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                {options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q${i}`}
                      onChange={() => handleSelect(i, opt.score)}
                      className="cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Your Score: <b>{totalScore}</b></p>
          <p className="mt-2 text-xl font-semibold text-indigo-700">{getSeverity()}</p>
        </div>
      )}
    </div>
  );
}
