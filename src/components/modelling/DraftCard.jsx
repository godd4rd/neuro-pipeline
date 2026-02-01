export default function DraftCard({ programme, onRemove }) {
  return (
    <div
      className="relative bg-white rounded-lg p-3 shadow-sm min-h-[100px] border border-gray-200"
      style={{ borderLeftWidth: '4px', borderLeftColor: '#0F68B2', borderLeftStyle: 'solid' }}
    >
      {/* Remove button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <h3 className="text-sm font-semibold text-gray-900 pr-6">{programme.company}</h3>
      <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded inline-block">
        {programme.das}
      </p>
      <p className="text-xs text-gray-400 mt-2">{programme.originated}</p>
    </div>
  );
}
