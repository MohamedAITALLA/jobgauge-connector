
import React from 'react';
import SurveyContainer from '@/components/SurveyContainer';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Temu Global Career Opportunities</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <SurveyContainer />
      </div>
    </>
  );
};

export default Index;
