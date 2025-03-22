
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface QuestionCardProps {
  question: {
    id: number;
    title: string;
    description?: string;
    type: string;
    options?: string[];
  };
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  value,
  onChange,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  className
}) => {
  // Handle enter key to move to next question
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value) {
      onNext();
    }
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 shadow-md transition-all animate-scale-in",
        "w-full max-w-md mx-auto",
        className
      )}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
            Question {question.id}
          </div>
          <h3 className="text-xl font-semibold leading-tight">{question.title}</h3>
          {question.description && (
            <p className="text-sm text-muted-foreground">{question.description}</p>
          )}
        </div>
        
        <div className="py-2">
          {question.type === 'select' && question.options ? (
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  onClick={() => onChange(option)}
                  className={cn(
                    "flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                    "hover:bg-accent min-h-[44px]",
                    value === option 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full mr-3 flex-shrink-0",
                      "border-2 transition-all",
                      value === option 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground"
                    )}
                  />
                  <span className="text-base">{option}</span>
                </div>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
              className="survey-input"
              autoFocus
            />
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className={cn(
              "flex items-center text-sm font-medium px-4 py-2 rounded-md transition-all",
              "hover:bg-muted hover:text-foreground",
              "disabled:opacity-50 disabled:pointer-events-none",
              "min-h-[44px]"
            )}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </button>
          
          <button
            type="button"
            onClick={onNext}
            disabled={!value}
            className={cn(
              "btn-primary",
              !value && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLast ? "Complete" : "Next"}
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
