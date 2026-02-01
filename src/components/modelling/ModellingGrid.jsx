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

  const handlePlaceholderClick = (stage) => {
    navigate(`/find-programme?stage=${encodeURIComponent(stage)}`);
  };

  return (
    <section className="px-6 py-4 overflow-x-auto">
      <div
        className="flex gap-2"
        style={{ minWidth: '1300px' }}
      >
        {/* Each column is independent - items stack vertically without affecting other columns */}
        {columnData.map((col) => {
          const { stage, existingCards, draftCards, hasDrafts, belowMinimum, betweenMinAndIdeal, totalCount, minimum, ideal } = col;
          const defaultColor = STAGE_COLOR_MAP[stage] || '#6B7280';

          // Determine header color based on threshold status
          let headerColor = defaultColor;
          let statusClass = '';

          if (totalCount < minimum) {
            headerColor = '#DC2626';
            statusClass = 'ring-2 ring-red-300 ring-offset-1';
          } else if (totalCount < ideal) {
            headerColor = '#D97706';
          }

          return (
            <div key={stage} className="flex-1 flex flex-col gap-2" style={{ minWidth: '130px' }}>
              {/* Stage Header */}
              <div
                className={`text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${statusClass}`}
                style={{ backgroundColor: headerColor }}
              >
                <span className="whitespace-nowrap">{stage}</span>
                <span className="opacity-90 text-[10px]">
                  {totalCount}/{ideal}
                </span>
              </div>

              {/* Existing cards */}
              {existingCards.map((card) => {
                const isSelected = selectedProgrammes.has(card.id);
                return (
                  <ModellingCard
                    key={card.id}
                    card={card}
                    showValue={showValue}
                    isSelected={isSelected}
                    onSelect={() => onProgrammeSelect(card.id)}
                  />
                );
              })}

              {/* Draft programmes grouped in one container */}
              {hasDrafts && (
                <DraftPlaceholder
                  programmes={draftCards}
                  stage={stage}
                  onRemove={(id) => removeProgrammeFromStage(stage, id)}
                />
              )}

              {/* Gap placeholders (red dashed) */}
              {Array.from({ length: belowMinimum + betweenMinAndIdeal }).map((_, i) => (
                <GapPlaceholder key={`gap-${i}`} onClick={() => handlePlaceholderClick(stage)} />
              ))}

              {/* Add more button */}
              <AddMoreButton onClick={() => handlePlaceholderClick(stage)} />
            </div>
          );
        })}
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
