import React, { useState } from 'react'

import { BreathingExercise } from '../smallgame/gamifycard'
import { AssessmentSection } from './assestmenthub'
import { GHQAssessment } from '@/components/assestments/GhQ'
import { GAD7Assessment } from '@/components/assestments/GAD7'
import { PHQ9Assessment } from '@/components/assestments/ph9-Q'
import { EmergencyResources } from './Emergency'
import { CalmingActivities } from './calmingactivities'
import { PositiveAffirmations } from './possitiveaffertion'
import { DailyWellnessQuest } from '../smallgame/dailywellnessquest'
import { Hero } from './hero'
import { Header } from '@/layouts/header'

const Landingpage = () => {
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentScore, setAssessmentScore] = useState(null);

  const handleStartAssessment = (assessmentId) => {
    setCurrentAssessment(assessmentId);
    setAssessmentScore(null);
  };

  const handleAssessmentComplete = (score) => {
    setAssessmentScore(score);
  };

  const handleBackToHub = () => {
    setCurrentAssessment(null);
    setAssessmentScore(null);
  };

  const renderAssessmentContent = () => {
    switch (currentAssessment) {
      case 'phq9':
        return <PHQ9Assessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      case 'gad7':
        return <GAD7Assessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      case 'ghq':
        return <GHQAssessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      default:
        return (
          <AssessmentSection
            onStartAssessment={handleStartAssessment}
            assessmentType={currentAssessment}
            score={assessmentScore}
            onReturnToHub={handleBackToHub}
          />
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #A8D0E6, #E4D9FF)' }}>
      <Header />
      <main>
        <Hero />

        <section id="assessments">{renderAssessmentContent()}</section>

        <section id="wellness-quest">
          <DailyWellnessQuest />
        </section>

        <BreathingExercise />
        <PositiveAffirmations />
        <CalmingActivities />
        <EmergencyResources />
      </main>

      <footer
        className="py-12 border-t"
        style={{ backgroundColor: '#F2F2F2', borderColor: '#A8D0E6' }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-4" style={{ color: '#4A4A4A' }}>
            Remember: You are not alone. Your mental health matters.
          </p>
          <p className="text-sm" style={{ color: '#4A4A4A' }}>
            This website is for supportive purposes only and is not a substitute for professional mental
            health care. If you are experiencing a mental health emergency, please contact 112 or your
            local emergency services.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landingpage
