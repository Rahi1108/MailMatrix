import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import UploadContacts from './pages/UploadContacts';
import ComposeEmail from './pages/ComposeEmail';
import SendCampaign from './pages/SendCampaign';

export interface AppState {
  uploadedFile: File | null;
  emailSubject: string;
  emailBody: string;
  stats: {
    totalCampaigns: number;
    emailsSent: number;
    activeRecipients: number;
    successRate: number;
  };
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    uploadedFile: null,
    emailSubject: '',
    emailBody: '',
    stats: {
      totalCampaigns: 24,
      emailsSent: 15847,
      activeRecipients: 2341,
      successRate: 94.2
    }
  });

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard stats={appState.stats} />} 
            />
            <Route 
              path="/upload" 
              element={
                <UploadContacts 
                  uploadedFile={appState.uploadedFile}
                  onFileUpload={(file) => updateAppState({ uploadedFile: file })}
                />
              } 
            />
            <Route 
              path="/compose" 
              element={
                <ComposeEmail 
                  subject={appState.emailSubject}
                  body={appState.emailBody}
                  onSubjectChange={(subject) => updateAppState({ emailSubject: subject })}
                  onBodyChange={(body) => updateAppState({ emailBody: body })}
                />
              } 
            />
            <Route 
              path="/send" 
              element={
                <SendCampaign 
                  uploadedFile={appState.uploadedFile}
                  subject={appState.emailSubject}
                  body={appState.emailBody}
                  onCampaignSent={() => {
                    const newStats = {
                      ...appState.stats,
                      totalCampaigns: appState.stats.totalCampaigns + 1,
                      emailsSent: appState.stats.emailsSent + Math.floor(Math.random() * 500) + 100
                    };
                    updateAppState({ 
                      stats: newStats,
                      uploadedFile: null,
                      emailSubject: '',
                      emailBody: ''
                    });
                  }}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;