import ModellingCard from './ModellingCard';
import { STAGE_COLORS } from '../../data/pipelineData';

// Map pipeline stage names to STAGE_COLORS keys
const STAGE_COLOR_MAP = {
  'Pre-portfolio': '#6B7280', // gray for pre-portfolio
  'HIT ID': '#FF9B42',
  'HTL': '#4EA62F',
  'LO': '#009189',
  'LLO': '#0F68B2',
  'Pre Clinical (NME)': '#A12B92',
  'Phase 1': '#9E0000',
  'Phase 2a': '#BF1F1F',
  'Phase 2b': '#984211',
  'Phase 3': '#0C394E',
};

export default function ModellingGrid({
  data,
  stages,
  showValue = true,
  selectedProgrammes,
  onProgrammeSelect,
}) {
  // Calculate counts for each stage (total cards in that column)
  const stageCounts = stages.map((_, colIndex) => {
    const total = data.filter((row) => row[colIndex]).length;
    // Mock capacity - in real app this would come from data
    const capacity = total + Math.floor(Math.random() * 4) + 2;
    return { total, capacity };
  });

  return (
    <section className="px-6 py-4 overflow-x-auto">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, minmax(130px, 1fr))`,
          minWidth: '1300px',
        }}
      >
        {/* Stage Headers with counts */}
        {stages.map((stage, idx) => {
          const bgColor = STAGE_COLOR_MAP[stage] || '#6B7280';
          return (
            <div
              key={stage}
              className="text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between"
              style={{ backgroundColor: bgColor }}
            >
              <span className="whitespace-nowrap">{stage}</span>
              <span className="opacity-80 text-[10px]">
                {stageCounts[idx].total}/{stageCounts[idx].capacity}
              </span>
            </div>
          );
        })}

        {/* Data Rows */}
        {data.map((row, rowIndex) =>
          row.map((card, colIndex) => {
            const cardId = card?.id || `prog-${rowIndex}-${colIndex}`;
            const isSelected = card && selectedProgrammes.has(cardId);

            return (
              <div key={`${rowIndex}-${colIndex}`} className="flex flex-col gap-2">
                {card ? (
                  <ModellingCard
                    card={{ ...card, id: cardId }}
                    showValue={showValue}
                    isSelected={isSelected}
                    onSelect={() => onProgrammeSelect(cardId)}
                  />
                ) : (
                  <AddCardPlaceholder />
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

function AddCardPlaceholder() {
  return (
    <div className="border-2 border-dashed border-[#D21034] rounded-lg p-3 min-h-[80px] flex items-center justify-center cursor-pointer hover:bg-red-50 transition-colors">
      <svg
        className="w-5 h-5 text-[#D21034]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    </div>
  );
}
