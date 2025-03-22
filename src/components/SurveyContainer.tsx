
import React, { useRef } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import SharePrompt from './SharePrompt';
import { questions } from '@/data/surveyQuestions';
import useSurveyState from '@/hooks/useSurveyState';
import SurveyHeader from './survey/SurveyHeader';
import SocialProof from './survey/SocialProof';
import CompletionScreen from './survey/CompletionScreen';
import ConfettiEffect from './survey/ConfettiEffect';

const SurveyContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [
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
  ] = useSurveyState();
  
  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col items-center pb-20">
      {/* Header Section */}
      <SurveyHeader />
      
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
                currentQuestion && (
                  <QuestionCard
                    question={currentQuestion}
                    value={currentAnswer}
                    onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    isFirst={currentStep === 1}
                    isLast={currentStep === questions.length}
                  />
                )
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
            <SocialProof 
              currentStep={currentStep}
              totalSteps={totalSteps}
              isOnSharingScreen={isOnSharingScreen}
              sharesCompleted={sharesCompleted}
            />
          </>
        ) : (
          <CompletionScreen onReset={resetSurvey} />
        )}
      </div>
      
      {/* Confetti effect */}
      <ConfettiEffect show={showConfetti} />
    </div>
  );
};

export default SurveyContainer;
