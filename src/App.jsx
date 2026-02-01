import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NeurosciencePipeline from './pages/NeurosciencePipeline';
import PortfolioModelling from './pages/PortfolioModelling';
import FindProgramme from './pages/FindProgramme';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/neuroscience" element={<NeurosciencePipeline />} />
        <Route path="/modelling" element={<PortfolioModelling />} />
        <Route path="/find-programme" element={<FindProgramme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
