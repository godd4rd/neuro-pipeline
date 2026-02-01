import ModellingCard from './ModellingCard';

export default function ModellingGrid({
  data,
  stages,
  showValue = true,
  selectedProgrammes,
  onProgrammeSelect,
}) {
  // Calculate counts for each stage
  const stageCounts = stages.map((_, colIndex) => {
    const total = data.filter((row) => row[colIndex]).length;
    const selected = data.filter(
      (row) => row[colIndex] && selectedProgrammes.has(row[colIndex].id || `prog-${colIndex}`)
    ).length;
    return { selected, total };
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
        {stages.map((stage, idx) => (
          <div
            key={stage}
            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium text-center whitespace-nowrap flex items-center justify-between"
          >
            <span>{stage}</span>
            <span className="text-gray-400">
              {stageCounts[idx].selected}/{stageCounts[idx].total}
            </span>
          </div>
        ))}

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
