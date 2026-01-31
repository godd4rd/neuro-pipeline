import { THERAPY_AREA_COLORS } from '../data/neuroscienceData';

export default function PipelineCard({ card, showValue = true }) {
  if (!card) {
    return <div className="min-h-[100px]" />;
  }

  const { drugName, condition, type, color, value } = card;
  const borderColor = THERAPY_AREA_COLORS[color] || '#D6D3D1';

  return (
    <div
      className="bg-white border border-gray-300 rounded-lg p-2 min-h-[100px] flex flex-col gap-1"
      style={{ borderLeftWidth: '4px', borderLeftColor: borderColor }}
    >
      <span className="inline-block self-start px-2 py-0.5 border border-gray-300 rounded text-[11px] font-medium bg-white">
        {drugName}
      </span>
      <span className="text-[11px] text-gray-600 leading-tight flex-grow">
        {condition}
      </span>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-[10px] text-gray-500">{type}</span>
        {value && showValue && (
          <span className="text-[11px] font-semibold">{value}</span>
        )}
      </div>
    </div>
  );
}
