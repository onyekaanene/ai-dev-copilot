export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white space-y-6">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-700 border-t-white rounded-full animate-spin" />

      {/* Text */}
      <p className="text-lg text-gray-300">Analyzing your GitHub profile...</p>
      
      <p className="text-sm text-gray-500">
        Reviewing repositories, code quality, and project impact
      </p>
    </main>
  );
}
