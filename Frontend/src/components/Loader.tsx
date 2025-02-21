import { useEffect } from "react";
type LoaderProps = {
  nextStatus: (status: string) => void;
};

export default function Loader({ nextStatus }: LoaderProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log("loading");
      nextStatus("results");
    }, 6000);
  }, [nextStatus]);

  return (
    <div className="relative min-h-[90vh]">
      <div className="flex flex-row gap-2 absolute top-1/2 left-1/2 -translate-x-1/2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
