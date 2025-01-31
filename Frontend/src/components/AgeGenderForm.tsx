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
        <span className="font-semibold text-lg">Edad</span>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="20"
          autoFocus
          className="rounded-lg mt-1 block w-full bg-white/5 py-1.5 px-3  ring-1 ring-gray-400 shadow-sm sm:text-sm"
          required
          value={age}
          onChange={(e) => onChangeFields({ age: e.target.value })}
        />
      </label>
      <label htmlFor="Gender_encoded" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Genero</span>
        <select
          name="Gender_encoded"
          id="Gender_encoded"
          className="px-3 py-1.5 mt-1 rounded-lg ring-1 ring-gray-400 shadow-sm sm:text-sm"
          required
          value={gender}
          onChange={(e) => onChangeFields({ gender: e.target.value })}
        >
          <option value="">Selecciona un genero</option>
          <option value="0" selected={Number(gender) === 0}>
            Masculino
          </option>
          <option value="1" selected={Number(gender) === 1}>
            Femenino
          </option>
        </select>
      </label>
    </FormWrapper>
  );
}
