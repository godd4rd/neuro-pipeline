export default function TitleSection() {
  return (
    <div className="mb-6">
      {/* Back Link */}
      <button className="flex items-center gap-1 text-[#9E0000] text-sm mb-4 hover:underline">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            2025 Pipeline (live)
          </h1>
          <p className="text-sm text-gray-500">
            Count of programmes by stage (columns) and therapy area (rows). This view is read-only.
          </p>
        </div>

        <button className="px-4 py-2 text-sm font-medium text-[#9E0000] border border-[#9E0000] rounded-lg hover:bg-red-50">
          Pipeline playground
        </button>
      </div>

      {/* Year Selector */}
      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#9E0000]"></span>
          <span className="font-medium">2025</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        </div>
      </div>
    </div>
  );
}
