
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, MessageCircle, Globe, Heart } from 'lucide-react';

const resources = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: '24/7 crisis support in English and Spanish',
    icon: Phone,
    urgent: true
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: '24/7 crisis support via text message',
    icon: MessageCircle,
    urgent: true
  },
  {
    name: 'National Alliance on Mental Illness',
    phone: '1-800-950-NAMI (6264)',
    description: 'Information, referrals, and support',
    icon: Globe,
    urgent: false
  },
  {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Treatment referral and information service',
    icon: Heart,
    urgent: false
  }
];

export function EmergencyResources() {
  return (
    <section id="resources" className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="mb-8 text-4xl text-red-700">
            Emergency Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you're in crisis or need immediate support, please reach out. Help is available 24/7.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={index} 
                className={`
                  p-6 transition-all duration-200 hover:shadow-lg
                  ${resource.urgent 
                    ? 'border-red-300 bg-red-50/80' 
                    : 'border-pink-200 bg-pink-50/80'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    p-3 rounded-lg
                    ${resource.urgent ? 'bg-red-500' : 'bg-pink-500'}
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-2 ${resource.urgent ? 'text-red-800' : 'text-pink-800'}`}>
                      {resource.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {resource.description}
                    </p>
                    <Button
                      className={`
                        ${resource.urgent 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-pink-600 hover:bg-pink-700'
                        }
                      `}
                      onClick={() => window.location.href = `tel:${resource.phone.replace(/\D/g, '')}`}
                    >
                      {resource.phone}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h3 className="mb-2 text-yellow-800">
            Important Reminder
          </h3>
          <p className="text-yellow-700">
            If you are experiencing a mental health emergency, please call 112 or go to your nearest emergency room immediately.
          </p>
        </div>
      </div>
    </section>
  );
}