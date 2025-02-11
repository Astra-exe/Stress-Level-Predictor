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
        <div>
          <span className="font-semibold text-lg">Pasos diarios</span>
          <p className="text-xs text-gray-500">
            * Realiza un seguimiento de los pasos con un reloj inteligente o una
            aplicación, o aproxima de acuerdo a tu nivel de sedentarismo:
            Sedentario (3000), Moderado (6000), Activo (10000)
          </p>
        </div>
        <input
          type="number"
          id="Daily Steps"
          name="Daily Steps"
          placeholder="8000"
          required
          value={stepsByDay}
          min={20}
          onChange={(e) => onChangeFields({ stepsByDay: e.target.value })}
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
        />
      </label>
      <label htmlFor="Heart Rate" className="flex flex-col gap-1">
        <div>
          <span className="font-semibold text-lg">
            Latidos por minuto (BPM)
          </span>
          <p className="text-xs text-gray-500">
            * Para estimarlo, puedes usar un reloj inteligente, una app o
            calcula manualmente contando los latidos durante 30 segundos y
            multiplicándolos por dos{" "}
            <a
              href="https://es.wikihow.com/tomarse-el-pulso"
              rel="noopener"
              target="_blank"
              className="underline"
            >
              (seguir tutorial)
            </a>
          </p>
        </div>
        <input
          type="number"
          id="Heart Rate"
          name="Heart Rate"
          placeholder="80"
          required
          value={heartRatio}
          min={40}
          max={220}
          onChange={(e) => onChangeFields({ heartRatio: e.target.value })}
          className="input text-sm font-semibold rounded-lg mt-1 contain-inline-size w-full py-1.5 px-3 ring-1 ring-gray-400 shadow-sm sm:text-base"
        />
      </label>
    </FormWrapper>
  );
}
