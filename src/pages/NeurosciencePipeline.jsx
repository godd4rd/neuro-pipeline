import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import PipelineGrid from '../components/PipelineGrid';
import ProgrammeDetailOverlay from '../components/ProgrammeDetailOverlay';
import PlaygroundDropdown from '../components/PlaygroundDropdown';
import { neurosciencePipelineData } from '../data/neuroscienceData';

export default function NeurosciencePipeline() {
  const [year, setYear] = useState(2025);
  const [showValue, setShowValue] = useState(true);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Back Link */}
      <Link
        to="/"
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

      {/* Title Section */}
      <section className="flex justify-between items-start px-6 pb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Neuroscience pipeline (live)
          </h1>
          <p className="text-sm text-gray-500">
            Count of programmes by stage (columns). This view is read-only.
          </p>
        </div>
        <PlaygroundDropdown
          onSelect={(action) => {
            console.log('Selected action:', action);
            // TODO: Implement action handlers
          }}
        />
      </section>

      {/* Controls Section */}
      <section className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-6">
          {/* Year Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setYear((y) => y - 1)}
              className="w-7 h-7 rounded-full bg-[#D21034] text-white flex items-center justify-center hover:opacity-90"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-base font-semibold min-w-[50px] text-center">
              {year}
            </span>
            <button
              onClick={() => setYear((y) => y + 1)}
              className="w-7 h-7 rounded-full bg-[#D21034] text-white flex items-center justify-center hover:opacity-90"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M6 12h12M8 18h8" />
              </svg>
              Filter by DAS
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowValue(!showValue)}
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  showValue ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                    showValue ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">Show value</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Pipeline value <strong className="text-lg text-gray-900">$67.7m</strong>
        </div>
      </section>

      {/* Pipeline Grid */}
      <PipelineGrid
        data={neurosciencePipelineData}
        showValue={showValue}
        onCardClick={setSelectedProgramme}
      />

      {/* Programme Detail Overlay */}
      {selectedProgramme && (
        <ProgrammeDetailOverlay
          programme={selectedProgramme}
          onClose={() => setSelectedProgramme(null)}
        />
      )}
    </div>
  );
}
