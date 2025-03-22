
import React from 'react';
import AnimatedGradient from '../AnimatedGradient';
import { Briefcase, Users, Award, Clock, Sparkles } from 'lucide-react';

const SurveyHeader: React.FC = () => {
  return (
    <AnimatedGradient className="w-full px-6 py-12 mb-8 flex flex-col items-center">
      <div className="text-center text-white space-y-4 max-w-xl">
        <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm text-white text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Exclusive Opportunity</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          LinkedIn Job Opportunity
        </h1>
        
        <p className="text-lg text-white/90">
          Senior Product Designer for a Fortune 500 Tech Company
        </p>
        
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-white/80 text-sm">
            <Briefcase className="w-4 h-4 mr-1" />
            <span>Product Design</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>5,000+ employees</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>Top tier benefits</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Limited positions</span>
          </div>
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default SurveyHeader;
