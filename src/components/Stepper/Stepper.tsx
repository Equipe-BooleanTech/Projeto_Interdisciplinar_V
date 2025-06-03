import React from 'react';
import { StepperProps } from './Stepper.interface';
import { Step, StyledStepper } from './Stepper.style';

const Stepper = (Props: StepperProps) => {
  const { steps, currentStep } = Props;

  return (
    <StyledStepper>
      {Array.from({ length: steps }, (_, index) => (
        <Step key={index} isActive={index === currentStep} />
      ))}
    </StyledStepper>
  );
};

export default Stepper;
