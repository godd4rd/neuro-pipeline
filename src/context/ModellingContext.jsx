import { createContext, useContext, useState } from 'react';

const ModellingContext = createContext(null);

export function ModellingProvider({ children }) {
  // Draft programmes added from the Find Programme page
  // Structure: { [stage]: [{ id, company, das, originated, ... }] }
  const [draftProgrammes, setDraftProgrammes] = useState({});

  // Add programmes to a specific stage
  const addProgrammesToStage = (stage, programmes) => {
    setDraftProgrammes((prev) => ({
      ...prev,
      [stage]: [...(prev[stage] || []), ...programmes],
    }));
  };

  // Remove a programme from a stage
  const removeProgrammeFromStage = (stage, programmeId) => {
    setDraftProgrammes((prev) => ({
      ...prev,
      [stage]: (prev[stage] || []).filter((p) => p.id !== programmeId),
    }));
  };

  // Get draft programmes for a specific stage
  const getDraftProgrammesForStage = (stage) => {
    return draftProgrammes[stage] || [];
  };

  // Clear all draft programmes
  const clearDraftProgrammes = () => {
    setDraftProgrammes({});
  };

  return (
    <ModellingContext.Provider
      value={{
        draftProgrammes,
        addProgrammesToStage,
        removeProgrammeFromStage,
        getDraftProgrammesForStage,
        clearDraftProgrammes,
      }}
    >
      {children}
    </ModellingContext.Provider>
  );
}

export function useModelling() {
  const context = useContext(ModellingContext);
  if (!context) {
    throw new Error('useModelling must be used within a ModellingProvider');
  }
  return context;
}
