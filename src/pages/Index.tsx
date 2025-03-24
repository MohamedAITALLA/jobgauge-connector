
import React from 'react';
import SurveyContainer from '@/components/SurveyContainer';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Professional Opportunity Match</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <SurveyContainer />
      </div>
    </>
  );
};

export default Index;
