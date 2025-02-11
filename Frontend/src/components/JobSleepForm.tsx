import FormWrapper from "./FormWrapper";

import { UserJobSleepData } from "../types";

type JobSleepFormProps = UserJobSleepData & {
  onChangeFields: (fields: Partial<UserJobSleepData>) => void;
};

export default function JobSleepForm({
  job,
  sleepHours,
  onChangeFields,
}: JobSleepFormProps) {
  return (
    <FormWrapper title="Ocupacion y Horas de sueno">
      <label htmlFor="Occupation_encoded" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Ocupación</span>
        <select
          name="Occupation_encoded"
          id="Occupation_encoded"
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
          required
          value={job}
          onChange={(e) => onChangeFields({ job: e.target.value })}
        >
          <option value="" disabled hidden>
            Selecciona una ocupación
          </option>
          <option value="0">Ciencia</option>
          <option value="1">Educacion</option>
          <option value="2">Finanzas</option>
          <option value="3">Recursos humanos</option>
          <option value="4">Ingenieria</option>
          <option value="5">Leyes</option>
          <option value="6">Salud</option>
          <option value="7">Tecnología</option>
          <option value="8">Ventas</option>
        </select>
      </label>
      <label htmlFor="Sleep Duration" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Horas de sueño</span>
        <input
          type="number"
          id="Sleep Duration"
          name="Sleep Duration"
          placeholder="8"
          min={1}
          max={12}
          step="0.01"
          required
          value={sleepHours}
          onChange={(e) => onChangeFields({ sleepHours: e.target.value })}
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
        />
      </label>
    </FormWrapper>
  );
}
