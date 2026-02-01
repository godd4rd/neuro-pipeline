import ModellingCard from './ModellingCard';

// Portfolio thresholds per stage
const STAGE_THRESHOLDS = {
  'Pre-portfolio': { minimum: 12, ideal: 15 },
  'HIT ID': { minimum: 4, ideal: 6 },
  'HTL': { minimum: 4, ideal: 6 },
  'LO': { minimum: 6, ideal: 7 },
  'LLO': { minimum: 2, ideal: 3 },
  'Pre Clinical (NME)': { minimum: 1, ideal: 2 },
  'Phase 1': { minimum: 2, ideal: 4 },
  'Phase 2a': { minimum: 3, ideal: 5 },
  'Phase 2b': { minimum: 2, ideal: 4 },
  'Phase 3': { minimum: 1, ideal: 3 },
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

    const thresholds = STAGE_THRESHOLDS[stage] || { minimum: 2, ideal: 5 };
    const currentCount = cards.length;

    // Calculate how many placeholders needed for minimum and ideal
    const belowMinimum = Math.max(0, thresholds.minimum - currentCount);
    const betweenMinAndIdeal = Math.max(0, thresholds.ideal - Math.max(currentCount, thresholds.minimum));

    return {
      stage,
      cards,
      minimum: thresholds.minimum,
      ideal: thresholds.ideal,
      currentCount,
      belowMinimum,
      betweenMinAndIdeal,
    };
  });

  // Find the maximum number of rows needed (cards + all placeholders + add button)
  const maxRows = Math.max(
    ...columnData.map((col) => col.currentCount + col.belowMinimum + col.betweenMinAndIdeal + 1)
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
        {columnData.map(({ stage, currentCount, minimum, ideal }) => {
          const bgColor = STAGE_COLOR_MAP[stage] || '#6B7280';
          const isBelowMinimum = currentCount < minimum;
          return (
            <div
              key={stage}
              className={`text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                isBelowMinimum ? 'ring-2 ring-red-500 ring-offset-1' : ''
              }`}
              style={{ backgroundColor: bgColor }}
            >
              <span className="whitespace-nowrap">{stage}</span>
              <span className={`text-[10px] ${isBelowMinimum ? 'text-red-200 font-bold' : 'opacity-80'}`}>
                {currentCount}/{minimum}/{ideal}
              </span>
            </div>
          );
        })}

        {/* Grid rows - iterate by row index */}
        {Array.from({ length: maxRows }).map((_, rowIndex) =>
          columnData.map((col, colIndex) => {
            const { cards, belowMinimum, betweenMinAndIdeal, currentCount } = col;

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
            } else if (rowIndex < currentCount + belowMinimum) {
              // Show CRITICAL placeholder (below minimum - red)
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <CriticalGapPlaceholder />
                </div>
              );
            } else if (rowIndex < currentCount + belowMinimum + betweenMinAndIdeal) {
              // Show OPTIONAL placeholder (between min and ideal - orange/amber)
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <OptionalGapPlaceholder />
                </div>
              );
            } else if (rowIndex === currentCount + belowMinimum + betweenMinAndIdeal) {
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

// CRITICAL: Placeholder for gaps below minimum threshold (must fill)
function CriticalGapPlaceholder() {
  return (
    <div className="border-2 border-dashed border-[#D21034] bg-red-50 rounded-lg p-3 min-h-[80px] flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors">
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

// OPTIONAL: Placeholder for gaps between minimum and ideal (nice to have)
function OptionalGapPlaceholder() {
  return (
    <div className="border-2 border-dashed border-amber-400 bg-amber-50 rounded-lg p-3 min-h-[80px] flex items-center justify-center cursor-pointer hover:bg-amber-100 transition-colors">
      <svg
        className="w-5 h-5 text-amber-500"
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
