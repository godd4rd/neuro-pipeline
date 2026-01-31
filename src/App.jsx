import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NeurosciencePipeline from './pages/NeurosciencePipeline';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/neuroscience" element={<NeurosciencePipeline />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
