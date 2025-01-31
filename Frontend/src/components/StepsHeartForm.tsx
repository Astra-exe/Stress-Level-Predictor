import FormWrapper from "./FormWrapper";
import { UserStepsHeartData } from "../types";

type StepsHeartFormProps = UserStepsHeartData & {
  onChangeFields: (fields: Partial<UserStepsHeartData>) => void;
};

export default function StepsHeartForm({
  stepsByDay,
  heartRatio,
  onChangeFields,
}: StepsHeartFormProps) {
  return (
    <FormWrapper title="Pasos diarios y Latidos por minuto">
      <label htmlFor="Daily Steps" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Pasos diarios</span>
        <input
          type="number"
          id="Daily Steps"
          name="Daily Steps"
          placeholder="8000"
          required
          value={stepsByDay}
          onChange={(e) => onChangeFields({ stepsByDay: e.target.value })}
          className="rounded-lg mt-1 block w-full bg-white/5 py-1.5 px-3  ring-1 ring-gray-400 shadow-sm sm:text-sm"
        />
      </label>
      <label htmlFor="Heart Rate" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Latidos por minuto</span>
        <input
          type="number"
          id="Heart Rate"
          name="Heart Rate"
          placeholder="80"
          required
          value={heartRatio}
          onChange={(e) => onChangeFields({ heartRatio: e.target.value })}
          className="rounded-lg mt-1 block w-full bg-white/5 py-1.5 px-3  ring-1 ring-gray-400 shadow-sm sm:text-sm"
        />
      </label>
    </FormWrapper>
  );
}
