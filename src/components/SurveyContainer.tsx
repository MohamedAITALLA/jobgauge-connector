import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import SharePrompt from './SharePrompt';
import AnimatedGradient from './AnimatedGradient';
import { Briefcase, Users, Award, Clock, Sparkles, CheckCircle, Check } from 'lucide-react';
import { toast } from 'sonner';

// Survey questions data
const questions = [
  {
    id: 1,
    title: "How many years of professional experience do you have?",
    type: "select",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "More than 10 years"]
  },
  {
    id: 2,
    title: "What is your highest level of education?",
    type: "select",
    options: ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "PhD or Doctorate"]
  },
  {
    id: 3,
    title: "Which industry sector do you currently work in?",
    type: "select",
    options: ["Technology", "Finance", "Healthcare", "Education", "Retail", "Manufacturing", "Other"]
  },
  {
    id: 4,
    title: "What is your current role level?",
    type: "select",
    options: ["Entry Level", "Mid Level", "Senior Level", "Management", "Executive"]
  },
  {
    id: 5,
    title: "What technical skills are you proficient in?",
    description: "Select the option that best represents your strongest skill set",
    type: "select",
    options: ["Programming/Development", "Data Analysis", "Project Management", "Design/UX", "Marketing/SEO", "Operations", "Leadership"]
  },
  {
    id: 6,
    title: "What are your salary expectations?",
    type: "select",
    options: ["$40,000 - $60,000", "$60,000 - $80,000", "$80,000 - $100,000", "$100,000 - $130,000", "$130,000+"]
  },
  {
    id: 7,
    title: "What work arrangement do you prefer?",
    type: "select",
    options: ["On-site", "Hybrid", "Remote", "Flexible"]
  },
  {
    id: 8,
    title: "What company size do you prefer?",
    type: "select",
    options: ["Startup (1-50)", "Small (51-200)", "Medium (201-1000)", "Large (1000+)"]
  },
  {
    id: 9,
    title: "When would you be available to start a new position?",
    type: "select",
    options: ["Immediately", "2 weeks notice", "1 month notice", "More than 1 month"]
  },
  {
    id: 10,
    title: "Are you willing to relocate for the right opportunity?",
    type: "select",
    options: ["Yes, anywhere", "Yes, within my country", "Yes, within my region", "No, I prefer to stay local"]
  }
];

const SurveyContainer: React.FC = () => {
  // State for survey progress
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [sharesCompleted, setSharesCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('survey-progress');
    if (savedProgress) {
      try {
        const { currentStep, answers, sharesCompleted } = JSON.parse(savedProgress);
        setCurrentStep(currentStep);
        setAnswers(answers);
        setSharesCompleted(sharesCompleted);
      } catch (e) {
        console.error('Failed to load saved progress');
      }
    }
  }, []);
  
  // Save progress when state changes
  useEffect(() => {
    if (currentStep > 0) {
      localStorage.setItem('survey-progress', JSON.stringify({
        currentStep,
        answers,
        sharesCompleted
      }));
    }
  }, [currentStep, answers, sharesCompleted]);
  
  // Auto-scroll to container when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleNext = () => {
    // If all questions are answered, move to sharing step
    if (currentStep === questions.length) {
      setCurrentStep(questions.length + 1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleShare = () => {
    // Simulate sharing functionality
    setSharesCompleted((prev) => {
      const newValue = Math.min(prev + 1, 10);
      
      // Show different messages based on share count
      if (newValue === 5) {
        toast.success("Halfway milestone reached! You've completed 5 shares.");
      } else if (newValue === 10) {
        toast.success("All shares completed! You can now submit your application.");
        setShowConfetti(true);
        
        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        toast.success(`Share ${newValue} complete! ${10 - newValue} more to unlock submission.`);
      }
      
      return newValue;
    });
  };

  const handleComplete = () => {
    if (sharesCompleted >= 10) {
      setIsCompleted(true);
      toast.success("Application submitted successfully!");
      
      // Reset local storage
      localStorage.removeItem('survey-progress');
    }
  };

  // Current question
  const currentQuestion = questions[currentStep - 1];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] || '' : '';
  
  // Check if user is on sharing screen
  const isOnSharingScreen = currentStep > questions.length;
  
  // Total progress (questions + sharing)
  const totalSteps = questions.length + 1;
  
  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center pb-20">
      {/* Header Section */}
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
      
      {/* Main Content */}
      <div className="w-full max-w-2xl px-4">
        {!isCompleted ? (
          <>
            {/* Progress bar */}
            <div className="mb-10">
              <ProgressBar 
                current={currentStep} 
                total={totalSteps} 
              />
            </div>
            
            {/* Survey content */}
            <div className="min-h-[300px] transition-all duration-300">
              {!isOnSharingScreen ? (
                <QuestionCard
                  question={currentQuestion}
                  value={currentAnswer}
                  onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  isFirst={currentStep === 1}
                  isLast={currentStep === questions.length}
                />
              ) : (
                <SharePrompt
                  sharesCompleted={sharesCompleted}
                  totalRequired={10}
                  onShare={handleShare}
                  onComplete={handleComplete}
                />
              )}
            </div>
            
            {/* Social proof and urgency elements */}
            <div className="mt-8">
              <div className="glass-card px-4 py-3 rounded-md text-sm text-center">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">637 people</strong> have applied to this position in the last 24 hours.
                  Your completion progress is <strong className="text-primary">{
                    Math.round((isOnSharingScreen ? questions.length + sharesCompleted / 2 : currentStep) / totalSteps * 100)
                  }%</strong> ahead of other applicants.
                </p>
              </div>
            </div>
          </>
        ) : (
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
              onClick={() => {
                setCurrentStep(1);
                setAnswers({});
                setSharesCompleted(0);
                setIsCompleted(false);
              }}
              className="btn-primary"
            >
              Start New Application
            </button>
          </div>
        )}
      </div>
      
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Simple CSS confetti simulation */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899', '#f59e0b'][
                  Math.floor(Math.random() * 5)
                ],
                animation: `confetti ${1 + Math.random() * 2}s linear forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SurveyContainer;
