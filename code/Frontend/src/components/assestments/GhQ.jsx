import { useState } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const questions = [
  "Been able to concentrate on whatever you're doing",
  "Lost much sleep over worry",
  "Felt that you were playing a useful part in things",
  "Felt capable of making decisions about things",
  "Felt constantly under strain",
  "Felt you couldn't overcome your difficulties",
  "Been able to enjoy your normal day-to-day activities",
  "Been able to face up to problems",
  "Been feeling unhappy or depressed",
  "Been losing confidence in yourself",
  "Been thinking of yourself as a worthless person",
  "Been feeling reasonably happy, all things considered"
];

const positiveQuestions = [0, 2, 3, 6, 7, 11]; // Questions where positive responses are healthy

const getOptions = (questionIndex) => {
  const isPositive = positiveQuestions.includes(questionIndex);
  
  if (isPositive) {
    return [
      { value: '0', label: 'Better than usual' },
      { value: '1', label: 'Same as usual' },
      { value: '2', label: 'Less than usual' },
      { value: '3', label: 'Much less than usual' }
    ];
  } else {
    return [
      { value: '0', label: 'Not at all' },
      { value: '1', label: 'No more than usual' },
      { value: '2', label: 'Rather more than usual' },
      { value: '3', label: 'Much more than usual' }
    ];
  }
};

export function GHQAssessment({ onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(''));

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast.error('Please select an answer before continuing');
      return;
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate GHQ score - count answers of 2 or 3 (indicating distress)
      const totalScore = answers.reduce((sum, answer) => {
        const score = parseInt(answer);
        return sum + (score >= 2 ? 1 : 0);
      }, 0);
      onComplete(totalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const options = getOptions(currentQuestion);

  return (
    <section className="py-20" style={{ backgroundColor: '#F2F2F2' }}>
      <div className="max-w-4xl mx-auto px-6">
        <Card className="p-8 border" style={{ backgroundColor: 'white', borderColor: '#A8D0E6' }}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="border"
                style={{ borderColor: '#A8D0E6', color: '#4A4A4A' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <span className="text-sm" style={{ color: '#4A4A4A' }}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-6" />
            <h2 className="mb-4" style={{ color: '#4A4A4A' }}>
              GHQ-12 General Health Questionnaire
            </h2>
            <p className="text-sm mb-6" style={{ color: '#4A4A4A' }}>
              We would like to know how your health has been in general over the past few weeks. Have you recently...
            </p>
          </div>

          <div className="mb-8">
            <h3 className="mb-6 text-lg" style={{ color: '#4A4A4A' }}>
              {questions[currentQuestion]}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border"
              style={{ borderColor: '#A8D0E6', color: '#4A4A4A' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="text-white"
              style={{ backgroundColor: '#7B9ACC' }}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
              {currentQuestion < questions.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}