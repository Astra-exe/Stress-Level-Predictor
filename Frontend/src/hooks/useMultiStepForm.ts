import { ReactElement, useState } from "react";

type MultiSteps = {
  steps: ReactElement[]
}


export default function useMultiStepForm({steps}: MultiSteps) {
  const [stepFormIndex, setStepFormIndex] = useState(0);


  const nextStep = () => {
    const nextStepToSet = stepFormIndex + 1;
    if (nextStepToSet > steps.length - 1) return;
    setStepFormIndex(stepFormIndex + 1);
  };

  const prevStep = () => {
    const prevStepToSet = stepFormIndex - 1;
    if (prevStepToSet < 0) return;
    setStepFormIndex(prevStepToSet);
  };

  const isLastStep = stepFormIndex === steps.length - 1;
  const isFirstStep = stepFormIndex === 0;
  return {
    step: steps[stepFormIndex],
    isLastStep,
    isFirstStep,
    prevStep,
    nextStep,
    currentStepIndex: stepFormIndex,
    stepsLength: steps.length
  }
}
