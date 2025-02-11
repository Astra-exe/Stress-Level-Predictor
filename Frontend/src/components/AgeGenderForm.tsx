import FormWrapper from "./FormWrapper";
import { UserAgeGenderData } from "../types";

type AgeGenderFormProps = UserAgeGenderData & {
  onChangeFields: (fields: Partial<UserAgeGenderData>) => void;
};

export default function AgeGenderForm({
  age,
  gender,
  onChangeFields,
}: AgeGenderFormProps) {
  return (
    <FormWrapper title="Edad y Genero">
      <label htmlFor="age" className="flex flex-col gap-1">
        <span className="pl-2 font-semibold text-lg transition-opacity">
          Edad{" "}
          <span className="font-normal text-gray-500 text-base">(16-70)</span>
        </span>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="20"
          autoFocus
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
          required
          min={16}
          max={70}
          value={age}
          onChange={(e) => onChangeFields({ age: e.target.value })}
        />
      </label>
      <label htmlFor="Gender_encoded" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Género</span>
        <select
          name="Gender_encoded"
          id="Gender_encoded"
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
          required
          value={gender}
          aria-placeholder="Selecciona un género"
          onChange={(e) => onChangeFields({ gender: e.target.value })}
        >
          <option value="" disabled hidden>
            Selecciona un género
          </option>
          <option value="0">Masculino</option>
          <option value="1">Femenino</option>
        </select>
      </label>
    </FormWrapper>
  );
}
