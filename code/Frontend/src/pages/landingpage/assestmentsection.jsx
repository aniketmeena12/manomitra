import AssessmentForm from "./assestmentform";
import { AssessmentHub } from "./assestmenthub";
import { AssessmentResults } from "./assestmentresults";
 // you need to ensure this file exists

export function AssessmentSection({ assessmentType, score, onStartAssessment, onComplete, onReturnToHub }) {
  if (!assessmentType) {
    return <AssessmentHub onStartAssessment={onStartAssessment} />;
  }

  if (assessmentType && score === null) {
    return <AssessmentForm assessmentType={assessmentType} onComplete={onComplete} />;
  }

  return <AssessmentResults assessmentType={assessmentType} score={score} onReturnToHub={onReturnToHub} />;
}
