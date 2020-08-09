import { useState } from 'react';

export const useStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return [
    activeStep,
    handleNext,
    handleBack,
    handleReset,
    setActiveStep,
  ] as const;
};
