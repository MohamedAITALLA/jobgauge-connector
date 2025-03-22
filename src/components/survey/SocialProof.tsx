
import React from 'react';
import { questions } from '@/data/surveyQuestions';

interface SocialProofProps {
  currentStep: number;
  totalSteps: number;
  isOnSharingScreen: boolean;
  sharesCompleted: number;
}

const SocialProof: React.FC<SocialProofProps> = ({ 
  currentStep, 
  totalSteps, 
  isOnSharingScreen,
  sharesCompleted
}) => {
  const progressPercentage = Math.round(
    (isOnSharingScreen ? questions.length + sharesCompleted / 2 : currentStep) / totalSteps * 100
  );

  return (
    <div className="mt-8">
      <div className="glass-card px-4 py-3 rounded-md text-sm text-center">
        <p className="text-muted-foreground">
          <strong className="text-foreground">2,450 candidates</strong> from over 40 countries have applied to the Global Employment Hub in the last 24 hours.
          Your completion progress is <strong className="text-primary">{progressPercentage}%</strong> ahead of other applicants.
          {isOnSharingScreen && (
            <span> Share via WhatsApp to increase your profile visibility across our global network of employers.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SocialProof;
