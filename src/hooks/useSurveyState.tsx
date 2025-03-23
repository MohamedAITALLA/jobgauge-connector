
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { questions } from '@/data/surveyQuestions';
import { formatPhoneWithCountryCode, getCountryCodeByCountry } from '@/data/countryCodes';

interface SurveyState {
  currentStep: number;
  answers: Record<number, string>;
  sharesCompleted: number;
  isCompleted: boolean;
  showConfetti: boolean;
  isOnSharingScreen: boolean;
  isOnUserInfoScreen: boolean;
  currentQuestion: typeof questions[0] | undefined;
  currentAnswer: string;
  totalSteps: number;
  userInfo: UserInfo;
}

export interface UserInfo {
  fullName: string;
  birthDate: Date | undefined;
  gender: string;
  country: string;
  email: string;
  phone: string;
  jobProfileId: string;
}

interface SurveyActions {
  handleNext: () => void;
  handlePrevious: () => void;
  handleAnswerChange: (questionId: number, value: string) => void;
  handleUserInfoChange: (userInfo: UserInfo) => void;
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
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: "",
    birthDate: undefined,
    gender: "",
    country: "",
    email: "",
    phone: "",
    jobProfileId: "creative-design"
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('survey-progress');
    if (savedProgress) {
      try {
        const { currentStep, answers, sharesCompleted, userInfo } = JSON.parse(savedProgress);
        setCurrentStep(currentStep);
        setAnswers(answers);
        setSharesCompleted(sharesCompleted);
        if (userInfo) {
          // Convert string date back to Date object if it exists
          const parsedUserInfo = {
            ...userInfo,
            birthDate: userInfo.birthDate ? new Date(userInfo.birthDate) : undefined
          };
          setUserInfo(parsedUserInfo);
        }
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
        sharesCompleted,
        userInfo
      }));
    }
  }, [currentStep, answers, sharesCompleted, userInfo]);
  
  // Auto-scroll to container when step changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleNext = () => {
    // If all questions are answered, move to user info step
    if (currentStep === questions.length) {
      setCurrentStep(questions.length + 1);
    } 
    // If on user info step, move to sharing step
    else if (currentStep === questions.length + 1) {
      setCurrentStep(questions.length + 2);
    }
    // Otherwise, move to next question
    else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  
  const handleUserInfoChange = (newUserInfo: UserInfo) => {
    // Don't format the phone number while user is typing - just store the raw input
    // The formatting will happen when submitting the form
    setUserInfo(newUserInfo);
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
  
  // Check if user is on user info screen
  const isOnUserInfoScreen = currentStep === questions.length + 1;
  
  // Check if user is on sharing screen
  const isOnSharingScreen = currentStep > questions.length + 1;
  
  // Total progress (questions + user info + sharing)
  const totalSteps = questions.length + 2;

  return [
    {
      currentStep,
      answers,
      sharesCompleted,
      isCompleted,
      showConfetti,
      isOnSharingScreen,
      isOnUserInfoScreen,
      currentQuestion,
      currentAnswer,
      totalSteps,
      userInfo,
    },
    {
      handleNext,
      handlePrevious,
      handleAnswerChange,
      handleUserInfoChange,
      handleShare,
      handleComplete,
      resetSurvey,
    }
  ];
};

export default useSurveyState;
