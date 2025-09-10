
import { ImageWithFallback } from '@/components/inputs/imagefallback';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, Users, PenTool } from 'lucide-react';

const activities = [
  {
    title: 'Mindful Coloring',
    description: 'Focus your mind with simple coloring patterns',
    icon: Palette,
    color: 'from-purple-400 to-pink-400',
    action: 'Start Coloring'
  },
  {
    title: 'Community',
    description: 'Connect with others in a supportive environment',
    icon: Users,
    color: 'from-green-400 to-blue-400',
    action: 'Join Community'
  },
  {
    title: 'Guided Journaling',
    description: 'Share your thoughts with gentle support to other people\'s',
    icon: PenTool,
    color: 'from-orange-400 to-red-400',
    action: 'Start Writing'
  }
];

export function CalmingActivities() {
  const handleActivityClick = (activity) => {
    // In a real app, these would navigate to specific activity pages
    alert(`Starting ${activity}... (This would open the activity in a real app)`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="mb-8 text-4xl text-teal-700">
            Calming Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose an activity that speaks to you. Sometimes the best therapy is a simple, mindful practice.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card key={index} className="group p-6 bg-white/80 backdrop-blur border-teal-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-teal-800">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activity.description}
                  </p>
                  <Button
                    onClick={() => handleActivityClick(activity.title)}
                    className="w-full bg-teal-500 hover:bg-teal-600 cursor-pointer"
                  >
                    {activity.action}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Card className="p-8 bg-white/80 backdrop-blur border-teal-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1656613031370-7d2af1275810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx6ZW4lMjBnYXJkZW4lMjBzdG9uZXMlMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTczNDIxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Zen garden stones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="mb-4 text-teal-800">
                Remember: Progress, Not Perfection
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every small step you take towards caring for your mental health matters. 
                Be patient with yourself as you explore what brings you peace.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}