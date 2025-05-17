export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center w-full p-12">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-lms-primary rounded-full"></div>
        <div className="w-3 h-3 bg-lms-primary rounded-full"></div>
        <div className="w-3 h-3 bg-lms-primary rounded-full"></div>
      </div>
      <p className="ml-4 text-gray-600">Loading courses...</p>
    </div>
  );
}