import React, { useState } from 'react';
import { Users, Move, ArrowRight, Shuffle } from 'lucide-react';

interface EmailContact {
  id: string;
  email: string;
  name: string;
  category: 'to' | 'cc' | 'bcc';
}

const EmailClassificationPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmailContact[]>([
    { id: '1', email: 'john.doe@university.edu', name: 'John Doe', category: 'to' },
    { id: '2', email: 'jane.smith@university.edu', name: 'Jane Smith', category: 'to' },
    { id: '3', email: 'prof.wilson@university.edu', name: 'Prof. Wilson', category: 'cc' },
    { id: '4', email: 'dean@university.edu', name: 'Dean Johnson', category: 'cc' },
    { id: '5', email: 'admin@university.edu', name: 'Admin Office', category: 'bcc' },
    { id: '6', email: 'sarah.brown@university.edu', name: 'Sarah Brown', category: 'to' },
  ]);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleCategoryChange = (contactId: string, newCategory: 'to' | 'cc' | 'bcc') => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId ? { ...contact, category: newCategory } : contact
      )
    );
  };

  const handleBulkCategoryChange = (newCategory: 'to' | 'cc' | 'bcc') => {
    setContacts(prev => 
      prev.map(contact => 
        selectedContacts.includes(contact.id) ? { ...contact, category: newCategory } : contact
      )
    );
    setSelectedContacts([]);
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const autoClassify = () => {
    setContacts(prev => 
      prev.map(contact => {
        // Simple auto-classification logic
        if (contact.email.includes('prof') || contact.email.includes('dean')) {
          return { ...contact, category: 'cc' };
        } else if (contact.email.includes('admin')) {
          return { ...contact, category: 'bcc' };
        } else {
          return { ...contact, category: 'to' };
        }
      })
    );
  };

  const getContactsByCategory = (category: 'to' | 'cc' | 'bcc') => 
    contacts.filter(contact => contact.category === category);

  const getCategoryColor = (category: 'to' | 'cc' | 'bcc') => {
    switch (category) {
      case 'to': return 'blue';
      case 'cc': return 'yellow';
      case 'bcc': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Classification</h1>
        <p className="text-lg text-gray-600">
          Organize your recipients into To, CC, and BCC groups for targeted communication
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={autoClassify}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              <Shuffle className="h-4 w-4" />
              <span>Auto Classify</span>
            </button>
            
            {selectedContacts.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedContacts.length} selected:
                </span>
                <select
                  onChange={(e) => handleBulkCategoryChange(e.target.value as 'to' | 'cc' | 'bcc')}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                  defaultValue=""
                >
                  <option value="" disabled>Move to...</option>
                  <option value="to">To</option>
                  <option value="cc">CC</option>
                  <option value="bcc">BCC</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>To: {getContactsByCategory('to').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>CC: {getContactsByCategory('cc').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>BCC: {getContactsByCategory('bcc').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Classification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {(['to', 'cc', 'bcc'] as const).map((category) => {
          const categoryContacts = getContactsByCategory(category);
          const color = getCategoryColor(category);
          
          return (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className={`p-4 border-b border-gray-200 bg-${color}-50`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold text-${color}-900`}>
                    {category.toUpperCase()} Recipients
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}>
                    {categoryContacts.length}
                  </span>
                </div>
                <p className={`text-sm text-${color}-700 mt-1`}>
                  {category === 'to' && 'Primary recipients who will receive the email'}
                  {category === 'cc' && 'Secondary recipients for transparency'}
                  {category === 'bcc' && 'Hidden recipients for privacy'}
                </p>
              </div>
              
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {categoryContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                    </div>
                    
                    <select
                      value={contact.category}
                      onChange={(e) => handleCategoryChange(contact.id, e.target.value as 'to' | 'cc' | 'bcc')}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="to">To</option>
                      <option value="cc">CC</option>
                      <option value="bcc">BCC</option>
                    </select>
                  </div>
                ))}
                
                {categoryContacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No recipients in this category</p>
                    <p className="text-sm">Drag contacts here or use the dropdown to assign</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Back to Upload
        </button>
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <span>Continue to Compose</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default EmailClassificationPage;