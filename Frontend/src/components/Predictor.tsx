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

    const { stress_level, stress_tip, sleep_tip, bmi_tip } = await getStressData(
      dataForm
    );
    setResultsData({
      stresLevel: stress_level,
      stressTip: stress_tip,
      sleepTip: sleep_tip,
      bmiTip: bmi_tip,
    });
    // alert(stressLevel);
    nextStatus("results");
  };

  return (
    <div className="mt-28">
      <section className="w-3/4 mx-auto">
        <div className="text-center">
          <h2 className="text-5xl leading-16 tracking-wider font-semibold">
            Conoce tu nivel de Estrés
          </h2>
          <p className="mt-2 text-lg">Llena lo siguiente para saberlo...</p>
        </div>
        <div className="mt-10 max-w-2xl mx-auto p-8 bg-linear-to-r from-[#ECEEED] to-[#F9F9F9] drop-shadow-2xl rounded-lg">
          <form onSubmit={handleSumbit}>
            {/* Steps info */}
            <span>
              {currentStepIndex} / {stepsLength}
            </span>

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
      </section>
    </div>
  );
}
