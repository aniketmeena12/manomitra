
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Brain, Heart, Shield, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const assessments = [
  {
    id: 'phq9',
    title: 'PHQ-9',
    fullName: 'Patient Health Questionnaire-9',
    description: 'Screen for depression symptoms over the past 2 weeks',
    icon: Heart,
    questions: 9,
    timeEstimate: '3-5 minutes',
    color: 'from-blue-100 to-blue-200'
  },
  {
    id: 'gad7',
    title: 'GAD-7',
    fullName: 'General Anxiety Disorder-7',
    description: 'Assess anxiety symptoms over the past 2 weeks',
    icon: Brain,
    questions: 7,
    timeEstimate: '2-4 minutes',
    color: 'from-purple-100 to-purple-200'
  },
  {
    id: 'ghq',
    title: 'GHQ-12',
    fullName: 'General Health Questionnaire-12',
    description: 'Evaluate overall psychological well-being',
    icon: Shield,
    questions: 12,
    timeEstimate: '4-6 minutes',
    color: 'from-indigo-100 to-indigo-200'
  }
];

const getResultInfo = (type, score) => {
  switch (type) {
    case 'phq9':
      if (score <= 4) return {
        level: 'Minimal',
        icon: CheckCircle,
        color: '#22c55e',
        bgColor: '#dcfce7',
        description: 'Minimal depression symptoms. You appear to be doing well.',
        recommendations: ['Continue healthy lifestyle habits', 'Stay connected with supportive relationships', 'Consider regular check-ins with yourself']
      };
      if (score <= 9) return {
        level: 'Mild',
        icon: Info,
        color: '#eab308',
        bgColor: '#fefce8',
        description: 'Mild depression symptoms. Some areas for attention.',
        recommendations: ['Consider lifestyle changes like exercise and sleep hygiene', 'Practice stress management techniques', 'Monitor your symptoms']
      };
      if (score <= 14) return {
        level: 'Moderate',
        icon: AlertTriangle,
        color: '#f97316',
        bgColor: '#fff7ed',
        description: 'Moderate depression symptoms. Consider professional support.',
        recommendations: ['Speak with a healthcare provider', 'Consider therapy or counseling', 'Maintain social connections']
      };
      if (score <= 19) return {
        level: 'Moderately Severe',
        icon: AlertCircle,
        color: '#ef4444',
        bgColor: '#fef2f2',
        description: 'Moderately severe depression symptoms. Professional help recommended.',
        recommendations: ['Seek professional mental health care', 'Consider therapy and/or medication evaluation', 'Reach out to trusted friends or family']
      };
      return {
        level: 'Severe',
        icon: AlertCircle,
        color: '#dc2626',
        bgColor: '#fef2f2',
        description: 'Severe depression symptoms. Immediate professional care recommended.',
        recommendations: ['Seek immediate professional help', 'Contact a mental health crisis line if needed', 'Don\'t wait - reach out today']
      };
      
    case 'gad7':
      if (score <= 4) return {
        level: 'Minimal',
        icon: CheckCircle,
        color: '#22c55e',
        bgColor: '#dcfce7',
        description: 'Minimal anxiety symptoms. You appear to be managing well.',
        recommendations: ['Continue healthy coping strategies', 'Practice relaxation techniques', 'Maintain work-life balance']
      };
      if (score <= 9) return {
        level: 'Mild',
        icon: Info,
        color: '#eab308',
        bgColor: '#fefce8',
        description: 'Mild anxiety symptoms. Some techniques may help.',
        recommendations: ['Try breathing exercises and mindfulness', 'Regular exercise can help reduce anxiety', 'Consider limiting caffeine']
      };
      if (score <= 14) return {
        level: 'Moderate',
        icon: AlertTriangle,
        color: '#f97316',
        bgColor: '#fff7ed',
        description: 'Moderate anxiety symptoms. Consider professional guidance.',
        recommendations: ['Speak with a healthcare provider', 'Learn about anxiety management techniques', 'Consider therapy or counseling']
      };
      return {
        level: 'Severe',
        icon: AlertCircle,
        color: '#ef4444',
        bgColor: '#fef2f2',
        description: 'Severe anxiety symptoms. Professional help recommended.',
        recommendations: ['Seek professional mental health care', 'Consider therapy and anxiety management programs', 'Don\'t hesitate to reach out for support']
      };
      
    case 'ghq':
      if (score <= 2) return {
        level: 'Good',
        icon: CheckCircle,
        color: '#22c55e',
        bgColor: '#dcfce7',
        description: 'Good psychological well-being. No significant concerns detected.',
        recommendations: ['Maintain current healthy habits', 'Continue positive lifestyle choices', 'Regular self-care practices']
      };
      if (score <= 5) return {
        level: 'Mild Concerns',
        icon: Info,
        color: '#eab308',
        bgColor: '#fefce8',
        description: 'Some areas of psychological distress. Monitor your well-being.',
        recommendations: ['Focus on stress management', 'Ensure adequate rest and recreation', 'Consider talking to someone you trust']
      };
      return {
        level: 'Significant Concerns',
        icon: AlertTriangle,
        color: '#f97316',
        bgColor: '#fff7ed',
        description: 'Significant psychological distress detected. Professional support recommended.',
        recommendations: ['Consider speaking with a mental health professional', 'Don\'t ignore persistent symptoms', 'Reach out to supportive friends or family']
      };
      
    default:
      return {
        level: 'Unknown',
        icon: Info,
        color: '#6b7280',
        bgColor: '#f9fafb',
        description: 'Assessment completed.',
        recommendations: ['Thank you for completing the assessment']
      };
  }
};

// Assessment Hub Component
function AssessmentHub({ onStartAssessment }) {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="mb-8 text-4xl" style={{ color: '#4A4A4A' }}>
          Mental Health Assessments
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
          Take clinically validated assessments to better understand your mental health. 
          These tools can help identify areas where you might benefit from professional support.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {assessments.map((assessment) => {
          const Icon = assessment.icon;
          return (
            <Card 
              key={assessment.id} 
              className="p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border"
              style={{ backgroundColor: 'white', borderColor: '#A8D0E6' }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${assessment.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8" style={{ color: '#4A4A4A' }} />
                </div>
                <h3 className="mb-2" style={{ color: '#4A4A4A' }}>
                  {assessment.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: '#4A4A4A' }}>
                  {assessment.fullName}
                </p>
                <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>
                  {assessment.description}
                </p>
                <div className="flex justify-between items-center mb-4 text-xs" style={{ color: '#4A4A4A' }}>
                  <span>{assessment.questions} questions</span>
                  <span>{assessment.timeEstimate}</span>
                </div>
                <Button
                  onClick={() => onStartAssessment(assessment.id)}
                  className="w-full text-white"
                  style={{ backgroundColor: '#7B9ACC' }}
                >
                  Start Assessment
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="bg-white border rounded-lg p-6 text-center" style={{ borderColor: '#A8D0E6' }}>
        <FileText className="w-8 h-8 mx-auto mb-4" style={{ color: '#7B9ACC' }} />
        <h3 className="mb-2" style={{ color: '#4A4A4A' }}>
          Important Note
        </h3>
        <p className="text-sm max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
          These assessments are screening tools and are not diagnostic. They should not replace professional consultation. 
          If you're experiencing distress, please consider speaking with a mental health professional.
        </p>
      </div>
    </>
  );
}

// Assessment Results Component
function AssessmentResults({ assessmentType, score, onReturnToHub }) {
  const result = getResultInfo(assessmentType, score);
  const Icon = result.icon;
  
  const assessmentNames = {
    phq9: 'PHQ-9 Depression Screening',
    gad7: 'GAD-7 Anxiety Screening',
    ghq: 'GHQ-12 General Health Questionnaire'
  };

  return (
    <Card className="p-8 border" style={{ backgroundColor: 'white', borderColor: '#A8D0E6' }}>
      <div className="text-center mb-8">
        <div 
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: result.bgColor }}
        >
          <Icon className="w-10 h-10" style={{ color: result.color }} />
        </div>
        <h2 className="mb-4" style={{ color: '#4A4A4A' }}>
          {assessmentNames[assessmentType]} Results
        </h2>
        <div className="mb-4">
          <span className="text-3xl" style={{ color: '#4A4A4A' }}>{score}</span>
          <span className="text-lg ml-2" style={{ color: '#4A4A4A' }}>/ {assessmentType === 'ghq' ? '12' : assessmentType === 'gad7' ? '21' : '27'}</span>
        </div>
        <div 
          className="inline-block px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: result.bgColor, color: result.color }}
        >
          {result.level}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4" style={{ color: '#4A4A4A' }}>
          What This Means
        </h3>
        <p className="mb-6" style={{ color: '#4A4A4A' }}>
          {result.description}
        </p>
        
        <h3 className="mb-4" style={{ color: '#4A4A4A' }}>
          Recommendations
        </h3>
        <ul className="space-y-2 mb-8">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2">
              <div 
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: '#7B9ACC' }}
              ></div>
              <span style={{ color: '#4A4A4A' }}>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm" style={{ color: '#4A4A4A' }}>
          <strong>Important:</strong> This assessment is a screening tool and not a diagnostic instrument. 
          Results should not replace professional medical advice, diagnosis, or treatment. 
          If you have concerns about your mental health, please consult with a qualified healthcare provider.
        </p>
      </div>

      <div className="text-center space-y-4">
        <Button
          onClick={onReturnToHub}
          className="text-white"
          style={{ backgroundColor: '#7B9ACC' }}
        >
          Take Another Assessment
        </Button>
        
        {(score >= 10 && assessmentType === 'phq9') || 
         (score >= 10 && assessmentType === 'gad7') || 
         (score >= 4 && assessmentType === 'ghq') ? (
          <div className="pt-4 border-t" style={{ borderColor: '#A8D0E6' }}>
            <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>
              Need immediate support? Here are some resources:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                className="border text-white"
                style={{ backgroundColor: '#ef4444', borderColor: '#ef4444' }}
                onClick={() => window.open('tel:988')}
              >
                Crisis Line: 988
              </Button>
              <Button
                variant="outline"
                className="border"
                style={{ borderColor: '#A8D0E6', color: '#4A4A4A' }}
                onClick={() => window.open('tel:741741')}
              >
                Text: 741741
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

// Main Assessment Section Component
export function AssessmentSection({ onStartAssessment, assessmentType, score, onReturnToHub }) {
  const showResults = score !== null && assessmentType;

  return (
    <section className="py-20" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="max-w-6xl mx-auto px-6">
        {showResults ? (
          <AssessmentResults 
            assessmentType={assessmentType}
            score={score}
            onReturnToHub={onReturnToHub}
          />
        ) : (
          <AssessmentHub onStartAssessment={onStartAssessment} />
        )}
      </div>
    </section>
  );
}