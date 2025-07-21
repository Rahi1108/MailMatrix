import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import UploadCsvPage from './pages/UploadCsvPage';
import EmailClassificationPage from './pages/EmailClassificationPage';
import EmailComposerPage from './pages/EmailComposerPage';
import SendSimulationPage from './pages/SendSimulationPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadCsvPage />} />
            <Route path="/classify" element={<EmailClassificationPage />} />
            <Route path="/compose" element={<EmailComposerPage />} />
            <Route path="/simulate" element={<SendSimulationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;