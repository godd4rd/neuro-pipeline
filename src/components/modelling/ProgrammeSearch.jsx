export default function ProgrammeSearch({
  programmes,
  searchQuery,
  onSearchChange,
  selectedTA,
  onTAChange,
  selectedProgrammes,
  onProgrammeSelect,
}) {
  const filteredProgrammes = programmes.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.drugName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <aside className="w-80 border-l border-gray-200 bg-white min-h-screen p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Search for a programme</h2>
      <p className="text-xs text-gray-500 mb-4">
        Deals below refined based on the selected TA.
      </p>

      {/* Search Input */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
          placeholder="Search for a deal name, ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D21034] focus:border-transparent"
        />
      </div>

      {/* TA Filter */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">TA</label>
        <select
          value={selectedTA}
          onChange={(e) => onTAChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D21034] focus:border-transparent bg-white"
        >
          <option value="Neuroscience">Neuroscience</option>
          <option value="Oncology">Oncology</option>
          <option value="Immunology">Immunology</option>
          <option value="Cardiovascular">Cardiovascular</option>
        </select>
      </div>

      {/* Programme List */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_50px] gap-2 px-3 py-2 bg-gray-100 text-xs font-medium text-gray-600 border-b border-gray-200">
          <span className="w-5"></span>
          <span>Project name</span>
          <span>Y FI</span>
        </div>

        {/* Programme Rows */}
        <div className="max-h-[500px] overflow-y-auto">
          {filteredProgrammes.length > 0 ? (
            filteredProgrammes.map((programme) => {
              const isSelected = selectedProgrammes.has(programme.id);
              return (
                <div
                  key={programme.id}
                  onClick={() => onProgrammeSelect(programme.id)}
                  className="grid grid-cols-[auto_1fr_50px] gap-2 px-3 py-2 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer items-center"
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#D21034] border-[#D21034]'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 truncate">{programme.drugName}</span>
                  <span className="text-gray-500 text-xs">JJI</span>
                </div>
              );
            })
          ) : (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              No programmes found
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
