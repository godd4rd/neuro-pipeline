import PipelineCard from './PipelineCard';
import { PIPELINE_STAGES } from '../data/neuroscienceData';

export default function PipelineGrid({ data, showValue = true, onCardClick }) {
  return (
    <section className="px-6 py-4 overflow-x-auto">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${PIPELINE_STAGES.length}, minmax(130px, 1fr))`,
          minWidth: '1300px',
        }}
      >
        {/* Stage Headers */}
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage}
            className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium text-center whitespace-nowrap"
          >
            {stage}
          </div>
        ))}

        {/* Data Rows */}
        {data.map((row, rowIndex) =>
          row.map((card, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="flex flex-col gap-2">
              <PipelineCard
                card={card}
                showValue={showValue}
                onClick={card && onCardClick ? () => onCardClick({ ...card, stage: PIPELINE_STAGES[colIndex] }) : undefined}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
