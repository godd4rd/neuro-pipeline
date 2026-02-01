import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useModelling } from '../context/ModellingContext';

// Mock programme data for the search results
const MOCK_PROGRAMMES = [
  { id: 'YD-314', code: 'JJI-1099661', company: 'YD Life Science Inc', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'YD-313', code: 'JJI-1099680', company: 'YD Life Science Inc', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'APTA-1004', code: 'JJI-1099699', company: 'Johnson & Johnson', originated: 'Internal', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'TG-46', code: 'JJI-1099718', company: 'Johnson & Johnson', originated: 'Internal', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'NOV5', code: 'JJI-1099186', company: 'Novaliq GmbH', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'ELN-12', code: 'JJI-1099224', company: 'Elasmogen Ltd', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'TJO-054', code: 'JJI-1099385', company: 'Taejoon Pharm Co Ltd', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'NAV-008', code: 'JJI-1099604', company: 'Navya Biologicals Pvt Ltd', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'BKT-130', code: 'JJI-1099623', company: 'Biokine Therapeutics Ltd', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'MT-914', code: 'JJI-1099433', company: 'Medy-Tox Inc', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'IBI-30089', code: 'JJI-1099281', company: 'Icon Bioscience Inc', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
  { id: 'RBIO-101', code: 'JJI-1099300', company: 'Reflexion Biotechnologies', originated: 'External', therapyArea: 'Neuroscience', das: 'Specialty Ophthalmology', phase: 'Lead Optimisation (LO)' },
];

export default function FindProgramme() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addProgrammesToStage } = useModelling();
  const stage = searchParams.get('stage') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTA, setSelectedTA] = useState('Neuroscience');
  const [selectedIndication, setSelectedIndication] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [selectedPhase, setSelectedPhase] = useState(stage || 'LO');
  const [selectedProgrammes, setSelectedProgrammes] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const selectionCount = selectedProgrammes.size;

  const toggleProgramme = (id) => {
    setSelectedProgrammes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSearch = () => {
    console.log('Search:', { searchQuery, selectedTA, selectedIndication, selectedModality, selectedPhase });
  };

  const handleCompare = () => {
    console.log('Compare programmes:', Array.from(selectedProgrammes));
  };

  const handleAddToModel = () => {
    // Get the full programme data for selected IDs
    const programmesToAdd = MOCK_PROGRAMMES.filter((p) => selectedProgrammes.has(p.id));

    // Add to the stage we came from
    if (stage && programmesToAdd.length > 0) {
      addProgrammesToStage(stage, programmesToAdd);
    }

    navigate('/modelling');
  };

  const handleResetSelection = () => {
    setSelectedProgrammes(new Set());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header subtitle="Modelling wizard">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-900 text-gray-900 bg-white">
            Current pipeline
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-transparent text-gray-600 hover:text-gray-900">
            Saved models
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-lg border border-transparent text-gray-600 hover:text-gray-900 relative">
            Notifications
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D21034] text-white text-xs rounded-full flex items-center justify-center">
              6
            </span>
          </button>
        </div>
      </Header>

      {/* Back Link */}
      <Link
        to="/modelling"
        className="flex items-center gap-1 text-[#D21034] text-sm px-6 py-3 hover:underline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Title */}
      <section className="px-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Search for a programme</h1>
        <p className="text-sm text-gray-500">
          Deals below refined based on the same TA, R&D and modality
        </p>
      </section>

      {/* Search Bar */}
      <section className="px-6 pb-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for a deal name, therapy area, modality, transaction type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D21034] focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-[#D21034] text-white font-medium rounded-lg hover:bg-[#B80D2C] transition-colors"
          >
            Search
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-6 flex items-center gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">TA</label>
          <select
            value={selectedTA}
            onChange={(e) => setSelectedTA(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
          >
            <option value="Neuroscience">Neuroscience</option>
            <option value="Oncology">Oncology</option>
            <option value="Immunology">Immunology</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Indications</label>
          <select
            value={selectedIndication}
            onChange={(e) => setSelectedIndication(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
          >
            <option value="">Select</option>
            <option value="pain">Pain</option>
            <option value="cns">CNS Disorders</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Modality</label>
          <select
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
          >
            <option value="">Select</option>
            <option value="small-molecule">Small Molecule</option>
            <option value="biologic">Biologic</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">R&D Phase</label>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
          >
            <option value="LO">LO</option>
            <option value="LLO">LLO</option>
            <option value="Pre Clinical">Pre Clinical</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2a">Phase 2a</option>
            <option value="Phase 2b">Phase 2b</option>
            <option value="Phase 3">Phase 3</option>
          </select>
        </div>
        <div className="ml-auto">
          <label className="block text-xs font-medium text-transparent mb-1">.</label>
          <button className="px-4 py-2 border border-[#D21034] text-[#D21034] font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M6 12h12M8 18h8" />
            </svg>
            Advanced search
          </button>
        </div>
      </section>

      {/* Results Table */}
      <section className="px-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white text-xs">
                <th className="px-4 py-3 text-left font-medium">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left font-medium">Project name</th>
                <th className="px-4 py-3 text-left font-medium">Project code name</th>
                <th className="px-4 py-3 text-left font-medium">Company name</th>
                <th className="px-4 py-3 text-left font-medium">Originated</th>
                <th className="px-4 py-3 text-left font-medium">Therapy area</th>
                <th className="px-4 py-3 text-left font-medium">DAS</th>
                <th className="px-4 py-3 text-left font-medium">Stage of Development/Phase</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PROGRAMMES.map((prog) => (
                <tr
                  key={prog.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleProgramme(prog.id)}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProgrammes.has(prog.id)}
                      onChange={() => toggleProgramme(prog.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{prog.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.code}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.company}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.originated}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.therapyArea}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.das}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{prog.phase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm text-gray-600">
            Page <input
              type="number"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-12 px-2 py-1 border border-gray-300 rounded text-center mx-1"
              min={1}
              max={20}
            /> of 20
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(20, p + 1))}
            disabled={currentPage === 20}
            className="p-2 rounded-full bg-[#D21034] text-white hover:bg-[#B80D2C] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Floating Action Panel - appears when items are selected */}
      {selectionCount > 0 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
          <button
            onClick={handleCompare}
            className="px-4 py-2 bg-[#7F1D1D] text-white text-sm font-medium rounded-full hover:bg-[#991B1B] transition-colors shadow-lg"
          >
            Compare ({selectionCount})
          </button>
          <button
            onClick={handleAddToModel}
            className="px-4 py-2 bg-[#D21034] text-white text-sm font-medium rounded-full hover:bg-[#B80D2C] transition-colors shadow-lg"
          >
            Add to model ({selectionCount})
          </button>
          <button
            onClick={handleResetSelection}
            className="px-4 py-2 bg-white text-[#D21034] text-sm font-medium rounded-full border border-[#D21034] hover:bg-red-50 transition-colors shadow-lg"
          >
            Reset selection
          </button>
        </div>
      )}
    </div>
  );
}
