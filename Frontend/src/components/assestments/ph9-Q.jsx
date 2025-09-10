import { useState } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const options = [
  { value: '0', label: 'Not at all' },
  { value: '1', label: 'Several days' },
  { value: '2', label: 'More than half the days' },
  { value: '3', label: 'Nearly every day' }
];

export function PHQ9Assessment({ onComplete, onBack }) {
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
      const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);
      onComplete(totalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
              PHQ-9 Depression Screening
            </h2>
            <p className="text-sm mb-6" style={{ color: '#4A4A4A' }}>
              Over the last 2 weeks, how often have you been bothered by the following problem?
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