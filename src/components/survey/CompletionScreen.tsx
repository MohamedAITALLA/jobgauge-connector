
import React from 'react';
import { Check, CheckCircle } from 'lucide-react';

interface CompletionScreenProps {
  onReset: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onReset }) => {
  return (
    <div className="glass-card rounded-xl p-8 shadow-md text-center space-y-6 animate-fade-in">
      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">Application Submitted!</h2>
      
      <p className="text-muted-foreground">
        Thank you for completing the application process. Our team will review your submission and contact qualified candidates within 48 hours.
      </p>
      
      <div className="bg-muted rounded-lg p-4 text-sm">
        <p className="font-medium mb-1">What happens next?</p>
        <ul className="text-left space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" /> Application review (1-2 business days)
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" /> Initial phone screening for qualified candidates
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" /> Technical assessment and team interviews
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-4 w-4 text-primary mt-0.5" /> Final decision and offer
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
