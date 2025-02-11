const MAX_STRESS_LEVEL = 8;
const MIN_STRESS_LEVEL = 2;

const getColorByPercentage = (percentage: number): string => {
  if (percentage < 30) return "bg-green-400/60"; // Low
  if (percentage < 70) return "bg-yellow-400/60"; // Medium
  return "bg-red-400/60"; // High
};

export default function StressBar({ stressLevel }: { stressLevel: number }) {
  const porcentageValue =
    ((stressLevel - MIN_STRESS_LEVEL) / (MAX_STRESS_LEVEL - MIN_STRESS_LEVEL)) *
    100;
  const color = getColorByPercentage(porcentageValue);
  const heightPorcentage = `${porcentageValue}%`;

  return (
    <div className="h-auto w-[10%] flex flex-col gap-y-3">
      <strong className="text-2xl text-center">
        {porcentageValue.toFixed(1)}%
      </strong>
      <div className="h-full flex items-end bg-gray-200 rounded-t-full overflow-hidden shadow-2xl">
        <div
          style={{ height: heightPorcentage }}
          className={`w-full  ${color}`}
        ></div>
      </div>
    </div>
  );
}
