import { useModelling } from '../context/ModellingContext';
import { useNavigate } from 'react-router-dom';

// Extended programme details for comparison view
const PROGRAMME_DETAILS = {
  'YD-314': {
    description: 'YD Life Science is investigating YD-314, likely to be an improved formulation of a launched drug, for the potential treatment of diabetic retinopathy. In February 2019, preclinical development was ongoing [ 2123289 ].',
    indication: 'Diabetic retinopathy',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'YD-313': {
    description: 'YD Life Science is investigating YD-313, an ophthalmic formulation, for the potential treatment of dry eye disease. Development is ongoing.',
    indication: 'Dry eye disease',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'APTA-1004': {
    description: 'Aptabio Therapeutics is investigating APTA-1004 (APX-1004), an NADPH oxidase (NOX) inhibitor, for the potential treatment of diabetic retinopathy. In July 2016, the drug was in druggability confirmation studies [ 1782957 ]. In June 2018, the program was listed in preclinical testing [ 2049293 ]. In October 2019, a non-clinical GLP toxicity study was ongoing; at that time, the company expected to enter phase II development in 2020 [ 2202646 ].',
    indication: 'Diabetic retinopathy',
    drugTarget: 'NADPH oxidase inhibitor',
    modality: 'Small molecule',
  },
  'TG-46': {
    description: 'GlaucoPharm is investigating TG-46, a P2Y6 receptor agonist, for the potential topical treatment of glaucoma [ 1774269 ], [ 1774270 ]. In August 2015, development was ongoing [ 1774269 ].',
    indication: 'Glaucoma',
    drugTarget: 'P2Y6 purinoceptor agonist',
    modality: 'Small molecule; Transdermal formulation',
  },
  'NOV5': {
    description: 'Novaliq GmbH is developing NOV5 for ophthalmic conditions. The compound utilizes proprietary EyeSol technology for enhanced drug delivery.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'ELN-12': {
    description: 'Elasmogen Ltd is investigating ELN-12, a VNAR-based therapeutic, for potential ophthalmic applications.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'VNAR-based',
    modality: 'Biologic',
  },
  'TJO-054': {
    description: 'Taejoon Pharm Co Ltd is developing TJO-054 for the treatment of various ophthalmic conditions.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'NAV-008': {
    description: 'Navya Biologicals Pvt Ltd is investigating NAV-008, a biosimilar candidate, for potential ophthalmic applications.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Biologic',
  },
  'BKT-130': {
    description: 'Biokine Therapeutics Ltd is developing BKT-130 for inflammatory and autoimmune ophthalmic conditions.',
    indication: 'Inflammatory ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'MT-914': {
    description: 'Medy-Tox Inc is investigating MT-914 for potential ophthalmic applications utilizing their proprietary technology platform.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'IBI-30089': {
    description: 'Icon Bioscience Inc is developing IBI-30089 for sustained-release ophthalmic drug delivery.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
  'RBIO-101': {
    description: 'Reflexion Biotechnologies is investigating RBIO-101 for potential ophthalmic therapeutic applications.',
    indication: 'Ophthalmic conditions',
    drugTarget: 'N/A',
    modality: 'Small molecule',
  },
};

const PARAMETERS = [
  { key: 'description', label: 'Drug description' },
  { key: 'code', label: 'Project code name' },
  { key: 'company', label: 'Company name' },
  { key: 'originated', label: 'Originated' },
  { key: 'therapyArea', label: 'Therapy Area' },
  { key: 'das', label: 'Disease Area Strategy' },
  { key: 'phase', label: 'Stage of developement' },
  { key: 'indication', label: 'Indications' },
  { key: 'drugTarget', label: 'Drug target' },
  { key: 'modality', label: 'Modality' },
];

export default function CompareOverlay({ programmes, onClose, stage }) {
  const { addProgrammesToStage } = useModelling();
  const navigate = useNavigate();

  if (!programmes || programmes.length === 0) return null;

  const handleBackToModel = () => {
    navigate('/modelling');
  };

  const handleAddSingleToModel = (programme) => {
    if (stage) {
      addProgrammesToStage(stage, [programme]);
    }
    navigate('/modelling');
  };

  const getValue = (programme, key) => {
    // First check if it's a direct property on the programme
    if (programme[key] !== undefined) {
      return programme[key];
    }
    // Then check extended details
    const details = PROGRAMME_DETAILS[programme.id];
    if (details && details[key] !== undefined) {
      return details[key];
    }
    return 'N/A';
  };

  // Calculate column width - equal distribution for 5 or fewer, fixed width for more
  const programmeCount = programmes.length;
  const shouldScroll = programmeCount > 5;
  const parameterColumnWidth = 180; // Fixed width for parameter column
  // For 5 or fewer: divide remaining space equally
  // For more than 5: use fixed minimum width per column
  const columnWidth = shouldScroll ? 280 : undefined;
  const columnWidthPercent = shouldScroll ? undefined : `${100 / programmeCount}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Overlay Panel */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Comparison view</h2>
          <button
            onClick={handleBackToModel}
            className="px-4 py-2 text-sm font-medium text-[#D21034] border border-[#D21034] rounded hover:bg-red-50 transition-colors"
          >
            Back to model
          </button>
        </div>

        {/* Comparison Table */}
        <div className={`overflow-y-auto max-h-[calc(90vh-140px)] ${shouldScroll ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
          <table className="w-full" style={{ tableLayout: shouldScroll ? 'auto' : 'fixed' }}>
            <colgroup>
              <col style={{ width: parameterColumnWidth }} />
              {programmes.map((prog) => (
                <col
                  key={prog.id}
                  style={{
                    width: shouldScroll ? columnWidth : columnWidthPercent,
                    minWidth: shouldScroll ? columnWidth : undefined
                  }}
                />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-gray-200">
                <th
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10"
                  style={{ width: parameterColumnWidth, minWidth: parameterColumnWidth }}
                >
                  Parameter
                </th>
                {programmes.map((prog) => (
                  <th
                    key={prog.id}
                    className="px-4 py-4 text-left"
                    style={{
                      width: shouldScroll ? columnWidth : columnWidthPercent,
                      minWidth: shouldScroll ? columnWidth : undefined
                    }}
                  >
                    <div className="space-y-2">
                      <span className="text-sm font-semibold text-gray-900 underline">
                        {prog.id}
                      </span>
                      <div>
                        <button
                          onClick={() => handleAddSingleToModel(prog)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-[#D21034] rounded hover:bg-[#B80D2C] transition-colors"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          Add to model
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARAMETERS.map((param, idx) => (
                <tr key={param.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td
                    className={`px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-100 sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    style={{ width: parameterColumnWidth, minWidth: parameterColumnWidth }}
                  >
                    {param.label}
                  </td>
                  {programmes.map((prog) => (
                    <td
                      key={prog.id}
                      className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100"
                    >
                      {getValue(prog, param.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleBackToModel}
            className="px-4 py-2 text-sm font-medium text-white bg-[#D21034] rounded hover:bg-[#B80D2C] transition-colors"
          >
            Back to model
          </button>
        </div>
      </div>
    </div>
  );
}
