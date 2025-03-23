
import React from 'react';
import { Check, CheckCircle } from 'lucide-react';
import { getJobProfileById } from '@/data/jobProfiles';

interface CompletionScreenProps {
  onReset: () => void;
  jobProfileId?: string;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onReset, jobProfileId = 'creative-design' }) => {
  const jobProfile = getJobProfileById(jobProfileId);
  const jobTitle = jobProfile ? jobProfile.title : 'Creative Design Specialist';
  return (
    <div className="glass-card rounded-xl p-8 shadow-md text-center space-y-6 animate-fade-in">
      <div className="flex flex-col items-center">
        <img src="/temu-logo.svg" alt="Temu Logo" className="w-12 h-12 mb-2" />
        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">Application Submitted!</h2>
      
      <p className="text-muted-foreground">
        Thank you for completing the application process for the <strong>{jobTitle}</strong> position at Temu. Our global talent team will review your submission and contact qualified candidates within 48 hours.
      </p>
      
      <div className="bg-muted rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">What happens next?</p>
        <ul className="text-left space-y-2 text-muted-foreground">
          <li className="flex items-start" role="listitem">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" aria-hidden="true" /> Application review (1-2 business days)
          </li>
          <li className="flex items-start" role="listitem">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" aria-hidden="true" /> Initial phone call for qualified candidates
          </li>
          <li className="flex items-start" role="listitem">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" aria-hidden="true" /> Skills assessment and team interviews
          </li>
          <li className="flex items-start" role="listitem">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" aria-hidden="true" /> Final decision and job offer
          </li>
        </ul>
      </div>
      
      <button
        onClick={onReset}
        className="btn-primary"
      >
        Start New Application
      </button>
    </div>
  );
};

export default CompletionScreen;
