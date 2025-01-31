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
        <span className="font-semibold text-lg">Peso(en kg)</span>
        <input
          type="number"
          id="weight"
          name="weight"
          placeholder="78"
          required
          value={weight}
          onChange={(e) => onChangeFields({ weight: e.target.value })}
          className="rounded-lg mt-1 block w-full bg-white/5 py-1.5 px-3  ring-1 ring-gray-400 shadow-sm sm:text-sm"
        />
      </label>
      <label htmlFor="height" className="flex flex-col gap-1">
        <span className="font-semibold text-lg">Altura(en m)</span>
        <input
          type="number"
          id="height"
          name="height"
          placeholder="120"
          required
          value={height}
          onChange={(e) => onChangeFields({ height: e.target.value })}
          className="rounded-lg mt-1 block w-full bg-white/5 py-1.5 px-3  ring-1 ring-gray-400 shadow-sm sm:text-sm"
        />
      </label>
    </FormWrapper>
  );
}
