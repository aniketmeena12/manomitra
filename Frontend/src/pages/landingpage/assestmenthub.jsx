import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { FileText, Brain, Heart, Shield } from 'lucide-react';

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

export function AssessmentHub({ onStartAssessment }) {
  return (
    <section className="py-20" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="max-w-6xl mx-auto px-6">
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
      </div>
    </section>
  );
}
