// Therapy Area Colors
export const THERAPY_AREA_COLORS = {
  yellow: '#FCD34D',
  green: '#86EFAC',
  purple: '#C4B5FD',
  red: '#FCA5A5',
  blue: '#93C5FD',
  orange: '#FDBA74',
  pink: '#F9A8D4',
  teal: '#5EEAD4',
  lime: '#BEF264',
  indigo: '#A5B4FC',
};

// Pipeline stages
export const PIPELINE_STAGES = [
  'Pre-portfolio',
  'HIT ID',
  'HTL',
  'LO',
  'LLO',
  'Pre Clinical (NME)',
  'Phase 1',
  'Phase 2a',
  'Phase 2b',
  'Phase 3',
];

// Neuroscience pipeline data - organized by rows
export const neurosciencePipelineData = [
  // Row 1
  [
    { drugName: 'Cynotry', condition: 'Neurologic (General)', type: 'External', color: 'yellow' },
    { drugName: 'Cynotry', condition: "Alzheimer's disease (AD) Pain", type: 'External', color: 'yellow' },
    { drugName: 'Pantriva', condition: 'Neurologic (General)', type: 'External', color: 'yellow' },
    { drugName: 'Cynotry', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'yellow' },
    { drugName: 'Cynotry', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'yellow' },
    { drugName: 'Metaphysis', condition: "Huntington's disease (HD)", type: 'External', color: 'green' },
    { drugName: 'OpthTank', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'purple', value: '$3.1M' },
    { drugName: 'Metaphysis', condition: "Huntington's disease (HD)", type: 'External', color: 'purple', value: '$12.1M' },
    { drugName: 'Cynotry', condition: "Alzheimer's disease (AD) Pain", type: 'External', color: 'blue', value: '$3.8M' },
    { drugName: 'Metaphysis', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'orange', value: '$5.4M' },
  ],
  // Row 2
  [
    { drugName: 'Matisem', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'green' },
    { drugName: 'Matisem', condition: "Huntington's disease (HD)", type: 'External', color: 'green' },
    { drugName: 'Resdexel', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'purple' },
    { drugName: 'Nifilmox', condition: 'Amyotrophic lateral sclerosis (ALS)', type: 'External', color: 'red' },
    { drugName: 'Metaphysis', condition: 'Neurologic (General)', type: 'External', color: 'green' },
    null,
    { drugName: 'Resdexel', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'purple', value: '$1.2M' },
    { drugName: 'Pantriva', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'yellow', value: '$0.8M' },
    { drugName: 'Metaphysis', condition: 'Amyotrophic lateral sclerosis (ALS)', type: 'External', color: 'green', value: '$5M' },
    { drugName: 'Nifilmox', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'red', value: '$1.5M' },
  ],
  // Row 3
  [
    { drugName: 'Metaphysis', condition: "Huntington's disease (HD)", type: 'External', color: 'purple' },
    { drugName: 'Resdexel', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'red' },
    { drugName: 'Varmenase', condition: "Huntington's disease (HD)", type: 'External', color: 'green' },
    { drugName: 'Varmenase', condition: "Alzheimer's disease (AD) Pain", type: 'External', color: 'green' },
    { drugName: 'Pantriva', condition: "Parkinson's disease (PD)", type: 'External', color: 'yellow' },
    null,
    null,
    { drugName: 'Cynotry', condition: "Parkinson's disease (PD)", type: 'External', color: 'purple', value: '$2M' },
    { drugName: 'Nifilmox', condition: 'Neurologic (General)', type: 'External', color: 'blue', value: '$4M' },
    { drugName: 'Varmenase', condition: 'Amyotrophic lateral sclerosis (ALS)', type: 'External', color: 'green', value: '$2.5M' },
  ],
  // Row 4
  [
    { drugName: 'Nifilmox', condition: 'Neurologic (General)', type: 'External', color: 'blue' },
    { drugName: 'Varmenase', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'green' },
    null,
    null,
    { drugName: 'Varmenase', condition: "Parkinson's disease (PD)", type: 'External', color: 'green' },
    null,
    null,
    { drugName: 'Resdexel', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'red', value: '$1.5M' },
    { drugName: 'OpthTank', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'purple', value: '$2M' },
    null,
  ],
  // Row 5
  [
    { drugName: 'OpthTank', condition: "Parkinson's disease (PD)", type: 'External', color: 'yellow' },
    { drugName: 'Varmenase', condition: 'Amyotrophic lateral sclerosis (ALS)', type: 'External', color: 'purple' },
    null,
    null,
    null,
    null,
    null,
    { drugName: 'Varmenase', condition: "Alzheimer's disease (AD) Pain", type: 'External', color: 'orange', value: '$1.8M' },
    { drugName: 'Pantriva', condition: "Alzheimer's disease (AD) Pain", type: 'External', color: 'blue', value: '$10M' },
    null,
  ],
  // Row 6
  [
    { drugName: 'Pantriva', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'yellow' },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    { drugName: 'Varmenase', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'green', value: '$12M' },
    null,
  ],
  // Row 7
  [
    { drugName: 'Resdexel', condition: 'Amyotrophic lateral sclerosis (ALS)', type: 'External', color: 'orange' },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  // Row 8
  [
    { drugName: 'Varmenase', condition: 'Central nervous system (CNS) disorders', type: 'External', color: 'green' },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
];
