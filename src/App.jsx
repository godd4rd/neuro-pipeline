import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NeurosciencePipeline from './pages/NeurosciencePipeline';
import PortfolioModelling from './pages/PortfolioModelling';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/neuroscience" element={<NeurosciencePipeline />} />
        <Route path="/modelling" element={<PortfolioModelling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
