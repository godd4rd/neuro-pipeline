import Header from '../components/Header';
import TitleSection from '../components/TitleSection';
import FilterSection from '../components/FilterSection';
import ChartCard from '../components/ChartCard';
import { programmeData } from '../data/pipelineData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-[1512px] mx-auto px-8 py-6">
        <TitleSection />
        <FilterSection />

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard programme={programmeData.all} />
          <ChartCard programme={programmeData.oncology} />
          <ChartCard programme={programmeData.into} />
          <ChartCard programme={programmeData.immunology} />
          <ChartCard programme={programmeData.neuroscience} link="/neuroscience" />
          <ChartCard programme={programmeData.cardiopulmonary} />
          <ChartCard programme={programmeData.other} />
        </div>
      </main>
    </div>
  );
}
