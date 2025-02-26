import { useEffect, useState } from "react";

export default function Toast({
  message,
  close,
}: {
  message: string;
  close: () => void;
}) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;
    let closeTimeoutId: number | null = null;

    timeoutId = setTimeout(() => {
      setIsShow(true);
      closeTimeoutId = setTimeout(() => {
        close();
      }, 2000);
    }, 1000);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (closeTimeoutId) {
        clearTimeout(closeTimeoutId);
      }
    };
  }, [close]);

  return (
    <div
      className={`animate-slide-in bg-slate-800 text-white rounded-lg drop-shadow-2xl px-4 py-2 ${
        isShow && "animate-slide-out"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
}
