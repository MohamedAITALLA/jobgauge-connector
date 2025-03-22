
import React from 'react';
import AnimatedGradient from '../AnimatedGradient';
import { Briefcase, Users, Award, Clock, Sparkles } from 'lucide-react';

const SurveyHeader: React.FC = () => {
  return (
    <AnimatedGradient className="w-full px-6 py-12 mb-8 flex flex-col items-center">
      <div className="text-center text-white space-y-4 max-w-xl">
        <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm text-white text-sm font-medium mb-2">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Professional Opportunity Matching</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Professional Opportunity Match
        </h1>
        
        <p className="text-lg text-white/90">
          Connect with roles that value your diverse skills and backgrounds
        </p>
        
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <div className="flex items-center text-white/80 text-sm">
            <Briefcase className="w-4 h-4 mr-1" />
            <span>All Industries - Tech to Trades</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span>Businesses of every size</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Award className="w-4 h-4 mr-1" />
            <span>Practical skills recognition</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Flexible opportunity timing</span>
          </div>
        </div>
      </div>
    </AnimatedGradient>
  );
};

export default SurveyHeader;
