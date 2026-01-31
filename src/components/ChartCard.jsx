import { Link } from 'react-router-dom';
import PipelineChart from './PipelineChart';
import { CATEGORY_COLORS } from '../data/pipelineData';

export default function ChartCard({ programme, link }) {
  const { title, category, internalCount, externalCount, total, data } = programme;
  const badgeColor = category ? CATEGORY_COLORS[category] : null;

  const CardWrapper = link ? Link : 'div';
  const wrapperProps = link ? { to: link } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`bg-white rounded-lg border border-gray-200 p-6 block ${
        link ? 'hover:border-gray-400 hover:shadow-md transition-all cursor-pointer' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {badgeColor && (
          <span
            className="px-3 py-1 text-xs font-medium text-white rounded uppercase"
            style={{ backgroundColor: badgeColor }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 uppercase text-xs font-medium">
            Internal Programmes:{' '}
            <span className="text-gray-900 font-bold">{internalCount}</span>
          </span>
          <span className="text-gray-500 uppercase text-xs font-medium">
            External Programmes:{' '}
            <span className="text-gray-900 font-bold">{externalCount}</span>
          </span>
        </div>
      </div>

      {total !== undefined && (
        <div className="mb-4">
          <span className="text-gray-500 uppercase text-xs font-medium">
            Total:{' '}
          </span>
          <span className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold text-white bg-gray-900 rounded">
            {total}
          </span>
        </div>
      )}

      {/* Chart */}
      <PipelineChart data={data} />

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#9E0000]"></span>
          <span className="text-xs text-gray-600">Internal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0F68B2]"></span>
          <span className="text-xs text-gray-600">External</span>
        </div>
      </div>
    </CardWrapper>
  );
}
