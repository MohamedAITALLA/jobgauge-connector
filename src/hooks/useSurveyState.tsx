
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { questions } from '@/data/surveyQuestions';

interface SurveyState {
  currentStep: number;
  answers: Record<number, string>;
  sharesCompleted: number;
  isCompleted: boolean;
  showConfetti: boolean;
  isOnSharingScreen: boolean;
  currentQuestion: typeof questions[0] | undefined;
  currentAnswer: string;
  totalSteps: number;
}

interface SurveyActions {
  handleNext: () => void;
  handlePrevious: () => void;
  handleAnswerChange: (questionId: number, value: string) => void;
  handleShare: () => void;
  handleComplete: () => void;
  resetSurvey: () => void;
}

export const useSurveyState = (): [SurveyState, SurveyActions] => {
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
        toast.success("Halfway there! You've made 5 valuable connections.");
      } else if (newValue === 10) {
        toast.success("All connections complete! Your profile is now active.");
        setShowConfetti(true);
        
        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        toast.success(`${newValue} connections made! ${10 - newValue} needed to activate profile.`);
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

  const resetSurvey = () => {
    setCurrentStep(1);
    setAnswers({});
    setSharesCompleted(0);
    setIsCompleted(false);
  };

  // Current question
  const currentQuestion = questions[currentStep - 1];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] || '' : '';
  
  // Check if user is on sharing screen
  const isOnSharingScreen = currentStep > questions.length;
  
  // Total progress (questions + sharing)
  const totalSteps = questions.length + 1;

  return [
    {
      currentStep,
      answers,
      sharesCompleted,
      isCompleted,
      showConfetti,
      isOnSharingScreen,
      currentQuestion,
      currentAnswer,
      totalSteps,
    },
    {
      handleNext,
      handlePrevious,
      handleAnswerChange,
      handleShare,
      handleComplete,
      resetSurvey,
    }
  ];
};

export default useSurveyState;
