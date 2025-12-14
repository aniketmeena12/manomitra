import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Question banks
const questions = {
  phq9: [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly / being restless",
    "Thoughts that you would be better off dead or of hurting yourself",
  ],
  gad7: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it’s hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
  ],
  ghq: [
    "Been able to concentrate on what you are doing",
    "Lost much sleep over worry",
    "Felt you are playing a useful part in things",
    "Felt capable of making decisions",
    "Felt constantly under strain",
    "Felt you could not overcome difficulties",
    "Been able to enjoy normal day-to-day activities",
    "Been able to face up to problems",
    "Been feeling unhappy or depressed",
    "Been losing confidence in yourself",
    "Been thinking of yourself as worthless",
    "Been feeling reasonably happy",
  ],
};

// Common response options
const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

export default function AssessmentForm({ assessmentType, onComplete }) {
  const [responses, setResponses] = useState({});

  const handleChange = (qIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [qIndex]: value, // keep as string
    }));
  };

  const handleSubmit = () => {
    const unanswered = questions[assessmentType].some(
      (_, i) => responses[i] === undefined
    );
    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // convert to numbers when summing
    const total = Object.values(responses).reduce(
      (a, b) => a + Number(b),
      0
    );
    onComplete(total);
  };

  const answeredCount = Object.keys(responses).length;
  const totalCount = questions[assessmentType].length;

  return (
    <section className="py-20" style={{ backgroundColor: "#F2F2F2" }}>
      <div className="max-w-3xl mx-auto px-6">
        <Card
          className="p-8 border"
          style={{ backgroundColor: "white", borderColor: "#A8D0E6" }}
        >
          <h2 className="text-2xl mb-4" style={{ color: "#4A4A4A" }}>
            {assessmentType.toUpperCase()} Assessment
          </h2>
          <p className="text-sm mb-8" style={{ color: "#4A4A4A" }}>
            Progress: {answeredCount} of {totalCount} answered
          </p>

          <div className="space-y-6">
            {questions[assessmentType].map((q, i) => (
              <div key={i} className="p-4 rounded-lg border bg-gray-50">
                <p className="mb-3 font-medium" style={{ color: "#4A4A4A" }}>
                  {i + 1}. {q}
                </p>
                <RadioGroup
                  value={responses[i] ?? ""}
                  onValueChange={(val) => handleChange(i, val)}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={opt.value}
                        id={`q${i}-${opt.value}`}
                      />
                      <Label htmlFor={`q${i}-${opt.value}`} className="text-sm">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={handleSubmit}
              className="text-white px-6 py-2"
              style={{ backgroundColor: "#7B9ACC" }}
            >
              Submit Assessment
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
