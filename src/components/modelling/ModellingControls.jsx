export default function ModellingControls({ showValue, onShowValueChange, pipelineValue }) {
  return (
    <section className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-6">
        {/* Filters */}
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M6 12h12M8 18h8" />
          </svg>
          Filter by DAS
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowValueChange(!showValue)}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              showValue ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                showValue ? 'left-[18px]' : 'left-0.5'
              }`}
            />
          </button>
          <span className="text-sm text-gray-600">Show value</span>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Pipeline value <strong className="text-lg text-gray-900">{pipelineValue}</strong>
      </div>
    </section>
  );
}
