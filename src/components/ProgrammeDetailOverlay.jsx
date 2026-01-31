import { useState } from 'react';
import { THERAPY_AREA_COLORS } from '../data/neuroscienceData';

const CATEGORY_BADGE_COLORS = {
  yellow: '#FCD34D',
  green: '#22C55E',
  purple: '#A855F7',
  red: '#EF4444',
  blue: '#3B82F6',
  orange: '#F97316',
  pink: '#EC4899',
  teal: '#14B8A6',
};

export default function ProgrammeDetailOverlay({ programme, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!programme) return null;

  const { drugName, condition, type, color, value, stage } = programme;
  const badgeColor = CATEGORY_BADGE_COLORS[color] || '#6B7280';

  // Mock data for the overlay - in real app this would come from API/props
  const programmeDetails = {
    description: `Therabest granted ViGenCell rights to co-develop and commercialize ${drugName}, an iPSC-derived GPC3 CAR-T therapy for hepatocellular carcinoma (HCC). The companies will leverage their combined expertise to advance toward clinical trials and global tech transfer. The therapy is designed to selectively target HCC tumours with a favorable safety profile and scalable, cost-effective manufacturing, addressing significant unmet needs in a cancer with low survival and high recurrence rates. Therabest will receive WON 4B (approx. $2.8M) up front as a contract fee and will be eligible for undisclosed development milestones. Both companies will share the revenue according to a mutually agreed ratio upon technology transfer and upon the generation of independent sales. The total deal value is based on the disclosed amount only.`,
    indication: condition,
    focusArea: 'CDS',
    commentsCount: 2,
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'comments', label: `Comments (${programmeDetails.commentsCount})` },
    { id: 'dependencies', label: 'Dependencies' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Overlay Panel */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm text-gray-400">Company details</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">{drugName}</h2>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="px-3 py-1 text-xs font-semibold text-white rounded uppercase"
              style={{ backgroundColor: badgeColor }}
            >
              {color === 'green' ? 'NEUROSCIENCE' : color?.toUpperCase()}
            </span>
            <span className="px-3 py-1.5 text-sm border border-gray-300 rounded-full">
              {condition}
            </span>
          </div>

          <p className="text-sm text-gray-600">
            Stage: <span className="font-semibold">{stage || 'LO'}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#D21034] text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Programme Description */}
              <section>
                <h3 className="text-lg font-semibold text-[#D21034] mb-3">
                  Programme description
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {programmeDetails.description}
                </p>
              </section>

              {/* Programme Information */}
              <section>
                <h3 className="text-lg font-semibold text-[#D21034] mb-3">
                  Programme Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Indication</p>
                    <p className="text-sm text-gray-600">{programmeDetails.indication}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">J&J DAS/Focus area</p>
                    <p className="text-sm text-gray-600">{programmeDetails.focusArea}</p>
                  </div>
                </div>
              </section>

              {/* Deal Value if available */}
              {value && (
                <section>
                  <h3 className="text-lg font-semibold text-[#D21034] mb-3">
                    Deal Value
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                </section>
              )}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="text-center py-8 text-gray-500">
              <p>Comments functionality coming soon</p>
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div className="text-center py-8 text-gray-500">
              <p>Dependencies functionality coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
