import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ModellingHeader from '../components/modelling/ModellingHeader';
import ModellingControls from '../components/modelling/ModellingControls';
import ModellingGrid from '../components/modelling/ModellingGrid';
import { neurosciencePipelineData, PIPELINE_STAGES } from '../data/neuroscienceData';

export default function PortfolioModelling() {
  const [activeTab, setActiveTab] = useState('current');
  const [modelName, setModelName] = useState('Neuroscience pipeline 2025 draft 1');
  const [showValue, setShowValue] = useState(true);
  const [selectedProgrammes, setSelectedProgrammes] = useState(new Set());

  const handleProgrammeSelect = (programmeId) => {
    setSelectedProgrammes((prev) => {
      const next = new Set(prev);
      if (next.has(programmeId)) {
        next.delete(programmeId);
      } else {
        next.add(programmeId);
      }
      return next;
    });
  };

  const handleExport = () => {
    console.log('Export to PowerPoint');
  };

  const handleShare = () => {
    console.log('Share model');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header subtitle="Modelling wizard">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              activeTab === 'current'
                ? 'border-gray-900 text-gray-900 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Current pipeline
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              activeTab === 'saved'
                ? 'border-gray-900 text-gray-900 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Saved models
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors relative ${
              activeTab === 'notifications'
                ? 'border-gray-900 text-gray-900 bg-white'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Notifications
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D21034] text-white text-xs rounded-full flex items-center justify-center">
              6
            </span>
          </button>
        </div>
      </Header>

      {/* Back Link */}
      <Link
        to="/neuroscience"
        className="flex items-center gap-1 text-[#D21034] text-sm px-6 py-3 hover:underline"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <ModellingHeader
        modelName={modelName}
        onModelNameChange={setModelName}
        onExport={handleExport}
        onShare={handleShare}
      />

      <ModellingControls
        showValue={showValue}
        onShowValueChange={setShowValue}
        pipelineValue="$67.7m"
      />

      <ModellingGrid
        data={neurosciencePipelineData}
        stages={PIPELINE_STAGES}
        showValue={showValue}
        selectedProgrammes={selectedProgrammes}
        onProgrammeSelect={handleProgrammeSelect}
      />
    </div>
  );
}
