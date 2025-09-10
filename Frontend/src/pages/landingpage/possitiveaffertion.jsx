import { useState } from 'react';

import { RefreshCw, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/inputs/imagefallback';
import { Button } from '@/components/ui/button';


const affirmations = [
  "You are stronger than you know.",
  "This difficult moment will pass.",
  "You deserve love and kindness.",
  "Your feelings are valid and important.",
  "You have overcome challenges before, and you will again.",
  "You are worthy of peace and happiness.",
  "It's okay to not be okay right now.",
  "You are enough, just as you are.",
  "Every small step forward matters.",
  "You have the courage to heal.",
  "Your mental health matters.",
  "You are not alone in this journey.",
  "Progress, not perfection, is what matters.",
  "You are capable of amazing things.",
  "Your story isn't over yet."
];

export function PositiveAffirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation);
    setCurrentAffirmation(newAffirmation);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="mb-8 text-4xl text-purple-700">
          Daily Affirmations
        </h2>
        <p className="mb-12 text-lg text-gray-600 max-w-2xl mx-auto">
          Take a moment to read and internalize these positive messages. You deserve every kind word.
        </p>
        
        <Card className="p-12 mb-8 bg-white/80 backdrop-blur border-purple-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1616398397849-942d434d0a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwb2NlYW4lMjB3YXZlcyUyMHN1bnJpc2V8ZW58MXx8fHwxNzU3MzQyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Soft ocean waves"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <Heart className="w-12 h-12 mx-auto mb-6 text-pink-500" />
            <blockquote className="text-2xl md:text-3xl text-gray-800 mb-6 italic">
              "{currentAffirmation}"
            </blockquote>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
        </Card>
        
        <Button
          onClick={getNewAffirmation}
          size="lg"
          className="bg-purple-500 hover:bg-purple-600"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Affirmation
        </Button>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Take a deep breath and let these words settle in your heart.</p>
        </div>
      </div>
    </section>
  );
}