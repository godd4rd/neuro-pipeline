import { useState } from 'react';

export default function ModellingHeader({ modelName, onModelNameChange, onExport, onShare }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(modelName);

  const handleEditStart = () => {
    setEditValue(modelName);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    onModelNameChange(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <section className="px-6 pb-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Portfolio modelling</h1>
      <p className="text-sm text-gray-500 mb-4">
        TA-specific model for a given year. Test scenarios, highlight gaps and over-capacity, and
        capture comments.
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">Model name</p>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleEditSave}
                onKeyDown={handleKeyDown}
                autoFocus
                className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#D21034]"
              />
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900">{modelName}</h2>
                <button
                  onClick={handleEditStart}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">Last saved: just now</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExport}
            className="px-4 py-2 text-sm font-medium text-[#D21034] border border-[#D21034] rounded-lg hover:bg-red-50 transition-colors"
          >
            Export to PowerPoint deck
          </button>
          <button
            onClick={onShare}
            className="px-4 py-2 text-sm font-medium text-white bg-[#D21034] rounded-lg hover:bg-[#B80D2C] transition-colors"
          >
            Share
          </button>
        </div>
      </div>
    </section>
  );
}
