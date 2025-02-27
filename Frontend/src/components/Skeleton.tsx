export default function Skeleton() {
  return (
    <div className="h-[40vh] w-[90%] mx-auto animate-pulse grid items-center space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-5 rounded bg-gray-200"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-4 rounded bg-gray-200"></div>
            <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          </div>
          <div className="h-4 rounded bg-gray-200"></div>
        </div>
        <div className="h-5 rounded bg-gray-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-4 rounded bg-gray-200"></div>
          <div className="col-span-1 h-4 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
