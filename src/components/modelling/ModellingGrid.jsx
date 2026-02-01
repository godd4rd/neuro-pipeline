import ModellingCard from './ModellingCard';

// Ideal portfolio shape - target number of programmes per stage
const IDEAL_CAPACITY = {
  'Pre-portfolio': 12,
  'HIT ID': 6,
  'HTL': 7,
  'LO': 7,
  'LLO': 5,
  'Pre Clinical (NME)': 4,
  'Phase 1': 4,
  'Phase 2a': 7,
  'Phase 2b': 6,
  'Phase 3': 3,
};

// Stage colors
const STAGE_COLOR_MAP = {
  'Pre-portfolio': '#6B7280',
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
  // Reorganize data by columns (stages) instead of rows
  const columnData = stages.map((stage, colIndex) => {
    const cards = data
      .map((row, rowIndex) => {
        const card = row[colIndex];
        if (card) {
          return { ...card, id: card.id || `prog-${rowIndex}-${colIndex}` };
        }
        return null;
      })
      .filter(Boolean);

    const idealCount = IDEAL_CAPACITY[stage] || 5;
    const currentCount = cards.length;
    const placeholdersNeeded = Math.max(0, idealCount - currentCount);

    return {
      stage,
      cards,
      idealCount,
      currentCount,
      placeholdersNeeded,
    };
  });

  // Find the maximum number of rows needed (cards + placeholders + add button)
  const maxRows = Math.max(
    ...columnData.map((col) => col.currentCount + col.placeholdersNeeded + 1)
  );

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
        {columnData.map(({ stage, currentCount, idealCount }) => {
          const bgColor = STAGE_COLOR_MAP[stage] || '#6B7280';
          return (
            <div
              key={stage}
              className="text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between"
              style={{ backgroundColor: bgColor }}
            >
              <span className="whitespace-nowrap">{stage}</span>
              <span className="opacity-80 text-[10px]">
                {currentCount}/{idealCount}
              </span>
            </div>
          );
        })}

        {/* Grid rows - iterate by row index */}
        {Array.from({ length: maxRows }).map((_, rowIndex) =>
          columnData.map((col, colIndex) => {
            const { cards, placeholdersNeeded, currentCount } = col;

            // Determine what to show in this cell
            if (rowIndex < cards.length) {
              // Show actual card
              const card = cards[rowIndex];
              const isSelected = selectedProgrammes.has(card.id);
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <ModellingCard
                    card={card}
                    showValue={showValue}
                    isSelected={isSelected}
                    onSelect={() => onProgrammeSelect(card.id)}
                  />
                </div>
              );
            } else if (rowIndex < currentCount + placeholdersNeeded) {
              // Show placeholder (gap to fill)
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <GapPlaceholder />
                </div>
              );
            } else if (rowIndex === currentCount + placeholdersNeeded) {
              // Show "add more" button
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <AddMoreButton />
                </div>
              );
            } else {
              // Empty cell
              return <div key={`${rowIndex}-${colIndex}`} />;
            }
          })
        )}
      </div>
    </section>
  );
}

// Placeholder for gaps (slots to fill to reach ideal capacity)
function GapPlaceholder() {
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

// Button to add more programmes beyond ideal capacity
function AddMoreButton() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[80px] flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
      <svg
        className="w-5 h-5 text-gray-400"
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
