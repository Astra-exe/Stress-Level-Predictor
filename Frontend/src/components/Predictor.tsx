import { FormEvent, useState } from "react";
import AgeGenderForm from "./AgeGenderForm";
import WeightHeightForm from "./WeightHeightForm";
import JobSleepForm from "./JobSleepForm";
import StepsHeartForm from "./StepsHeartForm";
import { StressFormData } from "../types";
import { getStressData } from "../services/stress";
import useMultiStepForm from "../hooks/useMultiStepForm";

const INITIAL_DATA: StressFormData = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  job: "",
  sleepHours: "",
  stepsByDay: "",
  heartRatio: "",
};

export default function Predictor({ nextStatus, setResultsData }) {
  const [dataForm, setDataForm] = useState(INITIAL_DATA);
  const onChangeFields = (fields: Partial<StressFormData>) => {
    setDataForm((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  };
  const {
    step,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    stepsLength,
  } = useMultiStepForm({
    steps: [
      <AgeGenderForm {...dataForm} onChangeFields={onChangeFields} />,
      <WeightHeightForm {...dataForm} onChangeFields={onChangeFields} />,
      <JobSleepForm {...dataForm} onChangeFields={onChangeFields} />,
      <StepsHeartForm {...dataForm} onChangeFields={onChangeFields} />,
    ],
  });

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      nextStep();
      return;
    }

    nextStatus("loading");
    const { stress_level, recommendations } = await getStressData(dataForm);
    setResultsData({
      stressLevel: stress_level,
      recommendations,
    });
  };

  return (
    <div className="mt-28" id="app">
      <section className="relative w-3/4 mx-auto">
        <div className="blob absolute top-10 left-0 w-18 md:w-20 lg:w-32 h-18 md:h-20 lg:h-32 bg-primary mix-blend-multiply blur-xl opacity-65 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-blob"></div>
        <div
          className="blob absolute bottom-0 right-0 w-44 h-44 bg-primary mix-blend-multiply blur-xl opacity-65 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] animate-blob"
          style={{ animationDirection: "reverse" }}
        ></div>
        <div className="text-center">
          <h2 className="text-4xl leading-10 xs:text-5xl xs:leading-16 tracking-wider font-bold">
            Conoce tu nivel de Estrés
          </h2>
          <p className="mt-4 text-lg">🚀 Llena lo siguiente para saberlo ...</p>
        </div>
        <div className="conic__background relative h-auto mt-16 max-w-2xl mx-auto drop-shadow-2xl rounded-lg overflow-hidden before:w-full before:h-full before:content-[''] before:absolute before:animate-border-spin bg-linear-to-r from-[#ECEEED] to-[#F9F9F9] p-1.5">
          <div className="relative p-8 left-[1px] top-[1px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-linear-to-r from-[#ECEEED] to-[#F9F9F9]">
            {/* Steps info */}
            <span>
              {currentStepIndex + 1} / {stepsLength}
            </span>
            <form onSubmit={handleSumbit} className="mt-5">
              {/* Content inputs by step */}
              {step}

              {/* Navigation Buttons */}
              <div className="mt-12 flex justify-between">
                {!isFirstStep && (
                  <button
                    type="button"
                    className="cursor-pointer px-4 py-2 text-sm bg-black text-white rounded-lg hover:shadow-xl hover:shadow-gray-300 transition-shadow"
                    onClick={prevStep}
                  >
                    Anterior
                  </button>
                )}
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 text-sm bg-black text-white rounded-lg hover:shadow-xl hover:shadow-gray-300 transition-shadow"
                >
                  {isLastStep ? "Enviar" : "Siguiente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
