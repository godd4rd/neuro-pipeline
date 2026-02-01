import { THERAPY_AREA_COLORS } from '../../data/neuroscienceData';

export default function ModellingCard({ card, showValue = true, isSelected, onSelect }) {
  if (!card) return null;

  const borderColor = THERAPY_AREA_COLORS[card.color] || '#9CA3AF';

  return (
    <div
      onClick={onSelect}
      className={`relative bg-white rounded-lg p-3 shadow-sm cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-[#D21034] border-2 border-[#D21034]'
          : 'border border-gray-200 hover:shadow-md'
      }`}
      style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
    >
      {/* Selection Checkbox */}
      <div
        className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-[#D21034] border-[#D21034]'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {isSelected && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <h3 className="text-sm font-semibold text-gray-900 pr-6">{card.drugName}</h3>
      <p className="text-xs text-gray-500 mt-1">{card.condition}</p>
      <p className="text-xs text-gray-400 mt-1">{card.type}</p>

      {showValue && card.value && (
        <p className="text-xs font-medium text-gray-700 mt-2">{card.value}</p>
      )}
    </div>
  );
}
