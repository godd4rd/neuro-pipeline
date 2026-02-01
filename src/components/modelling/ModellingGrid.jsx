import { useNavigate } from 'react-router-dom';
import ModellingCard from './ModellingCard';
import { useModelling } from '../../context/ModellingContext';

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
  const navigate = useNavigate();
  const { getDraftProgrammesForStage, removeProgrammeFromStage } = useModelling();

  // Reorganize data by columns (stages) instead of rows
  const columnData = stages.map((stage, colIndex) => {
    // Existing cards from the data
    const existingCards = data
      .map((row, rowIndex) => {
        const card = row[colIndex];
        if (card) {
          return { ...card, id: card.id || `prog-${rowIndex}-${colIndex}`, isDraft: false };
        }
        return null;
      })
      .filter(Boolean);

    // Draft cards added from Find Programme
    const draftCards = getDraftProgrammesForStage(stage);

    const thresholds = STAGE_THRESHOLDS[stage] || { minimum: 2, ideal: 5 };
    // Draft programmes fill one placeholder slot (regardless of how many)
    const hasDrafts = draftCards.length > 0;
    const totalCount = existingCards.length + (hasDrafts ? 1 : 0);

    // Calculate how many placeholders needed for minimum and ideal
    const belowMinimum = Math.max(0, thresholds.minimum - totalCount);
    const betweenMinAndIdeal = Math.max(0, thresholds.ideal - Math.max(totalCount, thresholds.minimum));

    return {
      stage,
      existingCards,
      draftCards,
      hasDrafts,
      minimum: thresholds.minimum,
      ideal: thresholds.ideal,
      totalCount,
      belowMinimum,
      betweenMinAndIdeal,
    };
  });

  // Find the maximum number of rows needed (cards + all placeholders + add button)
  const maxRows = Math.max(
    ...columnData.map((col) => col.totalCount + col.belowMinimum + col.betweenMinAndIdeal + 1)
  );

  const handlePlaceholderClick = (stage) => {
    navigate(`/find-programme?stage=${encodeURIComponent(stage)}`);
  };

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
        {columnData.map(({ stage, totalCount, minimum, ideal }) => {
          const defaultColor = STAGE_COLOR_MAP[stage] || '#6B7280';

          // Determine header color based on threshold status
          let headerColor = defaultColor;
          let statusClass = '';

          if (totalCount < minimum) {
            // Critical: below minimum threshold - RED
            headerColor = '#DC2626'; // red-600
            statusClass = 'ring-2 ring-red-300 ring-offset-1';
          } else if (totalCount < ideal) {
            // Warning: between minimum and ideal - AMBER
            headerColor = '#D97706'; // amber-600
          }
          // else: at or above ideal - use default stage color

          return (
            <div
              key={stage}
              className={`text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${statusClass}`}
              style={{ backgroundColor: headerColor }}
            >
              <span className="whitespace-nowrap">{stage}</span>
              <span className="opacity-90 text-[10px]">
                {totalCount}/{ideal}
              </span>
            </div>
          );
        })}

        {/* Grid rows - iterate by row index */}
        {Array.from({ length: maxRows }).map((_, rowIndex) =>
          columnData.map((col, colIndex) => {
            const { stage, existingCards, draftCards, hasDrafts, belowMinimum, betweenMinAndIdeal, totalCount } = col;

            // Determine what to show in this cell
            if (rowIndex < existingCards.length) {
              // Show existing card
              const card = existingCards[rowIndex];
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
            } else if (hasDrafts && rowIndex === existingCards.length) {
              // Show all draft programmes grouped in one dashed container
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <DraftPlaceholder
                    programmes={draftCards}
                    stage={stage}
                    onRemove={(id) => removeProgrammeFromStage(stage, id)}
                  />
                </div>
              );
            } else if (rowIndex < totalCount + belowMinimum + betweenMinAndIdeal) {
              // Show gap placeholder (red dashed) - navigates to find programme
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <GapPlaceholder onClick={() => handlePlaceholderClick(stage)} />
                </div>
              );
            } else if (rowIndex === totalCount + belowMinimum + betweenMinAndIdeal) {
              // Show "add more" button - also navigates to find programme
              return (
                <div key={`${rowIndex}-${colIndex}`}>
                  <AddMoreButton onClick={() => handlePlaceholderClick(stage)} />
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

// Placeholder for gaps to reach ideal capacity
function GapPlaceholder({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-[#D21034] rounded-lg p-3 min-h-[100px] flex items-center justify-center cursor-pointer hover:bg-red-50 transition-colors"
    >
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
function AddMoreButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[100px] flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
    >
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

// Container for draft programmes - groups multiple programmes in one dashed placeholder
function DraftPlaceholder({ programmes, stage, onRemove }) {
  return (
    <div className="border-2 border-dashed border-gray-900 rounded-lg p-2 min-h-[100px] bg-white">
      <div className="space-y-2">
        {programmes.map((prog) => (
          <div key={prog.id} className="relative bg-gray-50 rounded p-2">
            <button
              onClick={() => onRemove(prog.id)}
              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <p className="text-xs font-medium text-gray-900 pr-5">{prog.company}</p>
            <p className="text-[10px] text-gray-500">{prog.das}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
