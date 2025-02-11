import FormWrapper from "./FormWrapper";
import { UserWeightHeightData } from "../types";

type WeightHeightFormProps = UserWeightHeightData & {
  onChangeFields: (fields: Partial<UserWeightHeightData>) => void;
};

export default function WeightHeightForm({
  height,
  weight,
  onChangeFields,
}: WeightHeightFormProps) {
  return (
    <FormWrapper title="Peso y Altura">
      <label htmlFor="weight" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">
          Peso <span className="text-gray-500 text-base">(kg)</span>
        </span>
        <input
          type="number"
          id="weight"
          name="weight"
          placeholder="78"
          required
          min={40}
          max={350}
          step="0.01"
          value={weight}
          onChange={(e) => onChangeFields({ weight: e.target.value })}
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
        />
      </label>
      <label htmlFor="height" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">
          Altura <span className="text-gray-500 text-base">(m)</span>
        </span>
        <input
          type="number"
          id="height"
          name="height"
          placeholder="1.7"
          required
          min={1}
          max={2.5}
          step="0.01"
          value={height}
          onChange={(e) => onChangeFields({ height: e.target.value })}
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
        />
      </label>
    </FormWrapper>
  );
}
