import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import UploadContacts from './pages/UploadContacts';
import ComposeEmail from './pages/ComposeEmail';
import SendCampaign from './pages/SendCampaign';

export interface EmailContact {
  email: string;
  name?: string;
  category: 'to' | 'cc' | 'bcc';
  isValid: boolean;
}

export interface AppState {
  uploadedFile: File | null;
  emailContacts: EmailContact[];
  senderEmail: string;
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
    emailContacts: [],
    senderEmail: '',
    emailSubject: '',
    emailBody: '',
    stats: {
      totalCampaigns: 47,
      emailsSent: 23456,
      activeRecipients: 3892,
      successRate: 96.8
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
                  emailContacts={appState.emailContacts}
                  onFileUpload={(file) => updateAppState({ uploadedFile: file })}
                  onContactsProcessed={(contacts) => updateAppState({ emailContacts: contacts })}
                />
              } 
            />
            <Route 
              path="/compose" 
              element={
                <ComposeEmail 
                  senderEmail={appState.senderEmail}
                  subject={appState.emailSubject}
                  body={appState.emailBody}
                  onSenderEmailChange={(email) => updateAppState({ senderEmail: email })}
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
                  emailContacts={appState.emailContacts}
                  senderEmail={appState.senderEmail}
                  subject={appState.emailSubject}
                  body={appState.emailBody}
                  onCampaignSent={() => {
                    const validContacts = appState.emailContacts.filter(c => c.isValid);
                    const newStats = {
                      ...appState.stats,
                      totalCampaigns: appState.stats.totalCampaigns + 1,
                      emailsSent: appState.stats.emailsSent + validContacts.length,
                      activeRecipients: appState.stats.activeRecipients + Math.floor(Math.random() * 50)
                    };
                    updateAppState({ 
                      stats: newStats,
                      uploadedFile: null,
                      emailContacts: [],
                      senderEmail: '',
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