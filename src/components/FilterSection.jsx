import { PIPELINE_VALUE, STAGE_COLORS } from '../data/pipelineData';

const stages = [
  'Pre-portfolio',
  'HIT ID',
  'HTL',
  'LO',
  'LLO',
  'Pre-clinical',
  'Phase 1',
  'Phase 2a',
  'Phase 2b',
  'Phase 3',
];

export default function FilterSection() {
  return (
    <div className="mb-8">
      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
            Filter by DAS
          </label>
          <label className="flex items-center gap-2 text-sm">
            <div className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#9E0000]"></div>
            </div>
            Show value
          </label>
        </div>

        <div className="text-sm">
          <span className="text-gray-500">Pipeline value: </span>
          <span className="font-bold">{PIPELINE_VALUE}</span>
        </div>
      </div>

      {/* Stage Pills */}
      <div className="flex gap-2 flex-wrap">
        {stages.map((stage) => (
          <span
            key={stage}
            className="px-3 py-1.5 text-xs font-medium text-white rounded"
            style={{ backgroundColor: STAGE_COLORS[stage] || '#666' }}
          >
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}
