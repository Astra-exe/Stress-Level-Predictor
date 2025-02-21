const getColorByPercentage = (percentage: number): string => {
  if (percentage < 30) return "bg-green-400/60"; // Low
  if (percentage < 70) return "bg-yellow-400/60"; // Medium
  return "bg-red-400/60"; // High
};

export default function StressBar({ stressLevel }: { stressLevel: number }) {
  const color = getColorByPercentage(stressLevel);

  return (
    <div className="h-full w-full max-h-[70vh] flex flex-col gap-y-3">
      <strong className="text-2xl text-center">{stressLevel}%</strong>
      <div className="h-[10vh] flex items-end bg-gray-200 rounded-full overflow-hidden shadow-2xl">
        <div
          style={{ width: `${stressLevel}%` }}
          className={`h-full ${color}`}
        ></div>
      </div>
    </div>
  );
}
