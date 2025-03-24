
import React from 'react';
import { cn } from "@/lib/utils";
import { CheckCircle2, Trophy, Check, MessageCircle } from 'lucide-react';

interface SharePromptProps {
  sharesCompleted: number;
  totalRequired: number;
  onShare: () => void;
  onComplete: () => void;
  className?: string;
}

const SharePrompt: React.FC<SharePromptProps> = ({
  sharesCompleted,
  totalRequired,
  onShare,
  onComplete,
  className
}) => {
  const percentage = Math.round((sharesCompleted / totalRequired) * 100);
  const isComplete = sharesCompleted >= totalRequired;
  
  // Milestone reached (5th or 10th share)
  const isMilestone = sharesCompleted === 5 || sharesCompleted === totalRequired;

  // Share via WhatsApp function
  const shareViaWhatsApp = () => {
    const text = "Check out this Professional Opportunity Match that connects you with roles valuing diverse skills and backgrounds across all industries! Apply now:";
    //WHATSAPP URL
    const url = "https://bit.ly/gobjbsops";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    window.open(whatsappUrl, '_blank');
    onShare(); // Count the share
  };

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 shadow-md",
        isMilestone ? "animate-pulse-soft ring-2 ring-primary" : "",
        className
      )}
    >
      <div className="space-y-5">
        {isMilestone && sharesCompleted === totalRequired ? (
          <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
            <Trophy className="text-primary h-6 w-6 flex-shrink-0" />
            <div>
              <h4 className="font-medium">All shares completed!</h4>
              <p className="text-sm text-muted-foreground">You can now submit your application</p>
            </div>
          </div>
        ) : isMilestone ? (
          <div className="bg-primary/10 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0" />
            <div>
              <h4 className="font-medium">Halfway there!</h4>
              <p className="text-sm text-muted-foreground">Keep sharing to unlock submission</p>
            </div>
          </div>
        ) : null}
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Share with your network</h3>
          <p className="text-sm text-muted-foreground">
            Share this opportunity on WhatsApp to increase your application visibility by 15% per share.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Share progress ({sharesCompleted}/{totalRequired})
            </span>
            <span className="text-sm font-medium text-primary">
              {percentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {Array(5).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "aspect-square rounded-md flex items-center justify-center",
                sharesCompleted > i 
                  ? "bg-primary/20 text-primary" 
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {sharesCompleted > i ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs">{i + 1}</span>
              )}
            </div>
          ))}
          {Array(5).fill(0).map((_, i) => (
            <div 
              key={i + 5} 
              className={cn(
                "aspect-square rounded-md flex items-center justify-center",
                sharesCompleted > i + 5 
                  ? "bg-primary/20 text-primary" 
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {sharesCompleted > i + 5 ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs">{i + 6}</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={shareViaWhatsApp}
            className="btn-primary w-full bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Share via WhatsApp
          </button>
          
          <button
            onClick={onComplete}
            disabled={!isComplete}
            className={cn(
              "w-full min-h-[44px] inline-flex items-center justify-center rounded-md px-6 py-3",
              "text-base font-medium transition-all",
              isComplete 
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isComplete ? "Submit Application" : `Share ${totalRequired - sharesCompleted} more times to unlock`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePrompt;
