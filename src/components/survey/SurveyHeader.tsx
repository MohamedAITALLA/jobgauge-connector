
import React from 'react';
import AnimatedGradient from '../AnimatedGradient';
import { Briefcase, Users, Award, Clock, Sparkles } from 'lucide-react';

const SurveyHeader: React.FC = () => {
  return (
    <AnimatedGradient className="w-full px-6 py-12 mb-8 flex flex-col items-center">
      <div className="text-center text-white space-y-4 max-w-xl">
        <div className="flex flex-col items-center mb-4">
          <img src="/temu-logo.svg" alt="Temu Logo" className="w-16 h-16 mb-3" />
        </div>
        <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm text-white text-sm font-medium mb-2">
          <span>Temu Global Career Opportunities</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Join Temu's International Team
        </h1>
        
        <p className="text-lg text-white/90">
          Explore exciting positions across design, product, engineering, marketing, and customer service
        </p>
        
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-white/80 text-sm">
            <Briefcase className="w-4 h-4 mr-1" />
            <span>Multiple Global Positions</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>Diverse Team Collaboration</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>Competitive Compensation</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>International Career Growth</span>
          </div>
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default SurveyHeader;
