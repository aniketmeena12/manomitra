import { useState, useEffect } from 'react';

import { CheckCircle, Circle, Star, Gift, Trophy } from 'lucide-react';
import { Toaster, toast } from "sonner"
import { Card } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { Button } from '@/components/ui/button';


const quests = [
  {
    id: 'breathing',
    title: 'Take 5 Deep Breaths',
    description: 'Practice mindful breathing for 2 minutes',
    points: 10,
    category: 'Mindfulness'
  },
  {
    id: 'gratitude',
    title: 'Write Down 3 Things You\'re Grateful For',
    description: 'Reflect on positive aspects of your day',
    points: 15,
    category: 'Gratitude'
  },
  {
    id: 'movement',
    title: 'Move Your Body for 10 Minutes',
    description: 'Take a walk, stretch, or do light exercise',
    points: 20,
    category: 'Physical'
  },
  {
    id: 'connection',
    title: 'Connect with Someone You Care About',
    description: 'Send a message or call a friend or family member',
    points: 15,
    category: 'Social'
  },
  {
    id: 'nature',
    title: 'Spend 10 Minutes in Nature',
    description: 'Go outside or look at plants/nature photos',
    points: 10,
    category: 'Nature'
  },
  {
    id: 'selfcare',
    title: 'Do One Kind Thing for Yourself',
    description: 'Take a bath, listen to music, or treat yourself gently',
    points: 10,
    category: 'Self-Care'
  },
  {
    id: 'learn',
    title: 'Learn Something New',
    description: 'Read an article, watch a video, or explore a hobby',
    points: 15,
    category: 'Growth'
  },
  {
    id: 'organize',
    title: 'Tidy Up One Small Space',
    description: 'Organize your desk, a drawer, or make your bed',
    points: 10,
    category: 'Environment'
  }
];

export function DailyWellnessQuest() {
  const [completedQuests, setCompletedQuests] = useState([]);
  const [selectedQuests, setSelectedQuests] = useState([]);

  useEffect(() => {
    // Select 4 random quests for today
    const shuffled = [...quests].sort(() => 0.5 - Math.random());
    setSelectedQuests(shuffled.slice(0, 4));
    
    // Load completed quests from localStorage (in a real app, this would be from a database)
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`wellness-quest-${today}`);
    if (saved) {
      setCompletedQuests(JSON.parse(saved));
    }
  }, []);

  const toggleQuest = (questId) => {
    const newCompleted = completedQuests.includes(questId)
      ? completedQuests.filter(id => id !== questId)
      : [...completedQuests, questId];
    
    setCompletedQuests(newCompleted);
    
    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`wellness-quest-${today}`, JSON.stringify(newCompleted));
    
    if (!completedQuests.includes(questId)) {
      const quest = selectedQuests.find(q => q.id === questId);
      toast.success(`Quest completed! +${quest?.points} points 🎉`);
    }
  };

  const totalPoints = selectedQuests
    .filter(quest => completedQuests.includes(quest.id))
    .reduce((sum, quest) => sum + quest.points, 0);
  
  const maxPoints = selectedQuests.reduce((sum, quest) => sum + quest.points, 0);
  const progress = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;

  const getLevelInfo = (points) => {
    if (points >= 60) return { level: 'Wellness Champion', icon: Trophy, color: '#ffd700' };
    if (points >= 40) return { level: 'Wellness Warrior', icon: Star, color: '#7B9ACC' };
    if (points >= 20) return { level: 'Self-Care Seeker', icon: Gift, color: '#A8D0E6' };
    return { level: 'Getting Started', icon: Circle, color: '#E4D9FF' };
  };

  const levelInfo = getLevelInfo(totalPoints);
  const LevelIcon = levelInfo.icon;

  return (
    <section className="py-20" style={{ backgroundColor: '#E4D9FF' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="mb-8 text-4xl" style={{ color: '#4A4A4A' }}>
            Daily Wellness Quest
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A4A4A' }}>
            Complete small acts of self-care throughout your day. Every step counts towards your wellbeing journey.
          </p>
        </div>

        <Card className="p-8 mb-8 border" style={{ backgroundColor: 'white', borderColor: '#A8D0E6' }}>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <LevelIcon className="w-8 h-8" style={{ color: levelInfo.color }} />
              <span className="text-xl" style={{ color: '#4A4A4A' }}>{levelInfo.level}</span>
            </div>
            <div className="mb-4">
              <span className="text-3xl" style={{ color: '#4A4A4A' }}>{totalPoints}</span>
              <span className="text-lg" style={{ color: '#4A4A4A' }}> / {maxPoints} points</span>
            </div>
            <Progress value={progress} className="h-3 mb-2" />
            <p className="text-sm" style={{ color: '#4A4A4A' }}>
              {completedQuests.length} of {selectedQuests.length} quests completed
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {selectedQuests.map((quest) => {
            const isCompleted = completedQuests.includes(quest.id);
            return (
              <Card 
                key={quest.id}
                className={`p-6 transition-all duration-200 cursor-pointer border ${
                  isCompleted ? 'ring-2' : 'hover:shadow-md'
                }`}
                style={{ 
                  backgroundColor: isCompleted ? '#dcfce7' : 'white',
                  borderColor: isCompleted ? '#22c55e' : '#A8D0E6',
                  ringColor: isCompleted ? '#22c55e' : 'transparent'
                }}
                onClick={() => toggleQuest(quest.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6" style={{ color: '#4A4A4A' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={isCompleted ? 'line-through' : ''} style={{ color: '#4A4A4A' }}>
                        {quest.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#A8D0E6', color: '#4A4A4A' }}>
                          {quest.category}
                        </span>
                        <span style={{ color: '#7B9ACC' }}>+{quest.points}pts</span>
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: '#4A4A4A' }}>
                      {quest.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Card className="p-6 border" style={{ backgroundColor: 'white', borderColor: '#A8D0E6' }}>
            <h3 className="mb-4" style={{ color: '#4A4A4A' }}>
              Daily Streak Bonus
            </h3>
            <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>
              Complete all quests for 7 days in a row to unlock special wellness content and earn bonus points!
            </p>
            <Button
              className="text-white"
              style={{ backgroundColor: '#7B9ACC' }}
              onClick={() => toast.info('Streak tracking coming soon!')}
            >
              View Streak Progress
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}