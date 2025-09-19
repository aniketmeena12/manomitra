import { useState } from "react";
import { AssessmentSection } from "./assestmentsection";


export default function AssessmentContainer() {
  const [assessmentType, setAssessmentType] = useState(null);
  const [score, setScore] = useState(null);

  const handleStartAssessment = (type) => {
    setAssessmentType(type);
    setScore(null);
  };

  const handleComplete = (newScore) => {
    setScore(newScore);
  };

  const handleReturnToHub = () => {
    setAssessmentType(null);
    setScore(null);
  };

  return (
    <AssessmentSection
      assessmentType={assessmentType}
      score={score}
      onStartAssessment={handleStartAssessment}
      onComplete={handleComplete}
      onReturnToHub={handleReturnToHub}
    />
  );
}
