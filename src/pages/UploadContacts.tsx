import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, Users, Mail } from 'lucide-react';
import { EmailContact } from '../App';

interface UploadContactsProps {
  uploadedFile: File | null;
  emailContacts: EmailContact[];
  onFileUpload: (file: File) => void;
  onContactsProcessed: (contacts: EmailContact[]) => void;
}

const UploadContacts: React.FC<UploadContactsProps> = ({ 
  uploadedFile, 
  emailContacts,
  onFileUpload, 
  onContactsProcessed 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const smartClassifyEmail = (email: string, name?: string): 'to' | 'cc' | 'bcc' => {
    const emailLower = email.toLowerCase();
    const nameLower = name?.toLowerCase() || '';
    
    // Smart classification logic
    if (emailLower.includes('admin') || emailLower.includes('office') || 
        emailLower.includes('dean') || emailLower.includes('director')) {
      return 'bcc';
    }
    
    if (emailLower.includes('prof') || emailLower.includes('faculty') || 
        emailLower.includes('teacher') || nameLower.includes('prof') ||
        nameLower.includes('dr.') || nameLower.includes('doctor')) {
      return 'cc';
    }
    
    return 'to';
  };

  const processCSVFile = async (file: File) => {
    setIsProcessing(true);
    
    return new Promise<EmailContact[]>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const contacts: EmailContact[] = [];
        
        lines.forEach((line, index) => {
          if (index === 0 && (line.toLowerCase().includes('email') || line.toLowerCase().includes('name'))) {
            return; // Skip header row
          }
          
          const [email, name] = line.split(',').map(item => item.trim().replace(/"/g, ''));
          
          if (email) {
            const isValid = validateEmail(email);
            const category = smartClassifyEmail(email, name);
            
            contacts.push({
              email,
              name: name || '',
              category,
              isValid
            });
          }
        });
        
        setTimeout(() => {
          setIsProcessing(false);
          resolve(contacts);
        }, 1500); // Simulate processing time
      };
      reader.readAsText(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
      const processedContacts = await processCSVFile(file);
      onContactsProcessed(processedContacts);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validContacts = emailContacts.filter(contact => contact.isValid);
  const invalidContacts = emailContacts.filter(contact => !contact.isValid);
  const toContacts = validContacts.filter(contact => contact.category === 'to');
  const ccContacts = validContacts.filter(contact => contact.category === 'cc');
  const bccContacts = validContacts.filter(contact => contact.category === 'bcc');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Contacts</h1>
        <p className="text-lg text-gray-600">
          Import your email contacts from a CSV file and let our smart classifier organize them
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          {!uploadedFile ? (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-gray-400 transition-colors duration-200">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload your CSV file
                </h3>
                <p className="text-gray-600 mb-6">
                  Select a CSV file containing email addresses and contact information
                </p>
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              
              <div className="text-left bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• First column: email addresses (required)</li>
                  <li>• Second column: names (optional)</li>
                  <li>• Example: john@university.edu, John Doe</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 p-6 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="text-left">
                  <h3 className="font-medium text-green-900">File uploaded successfully!</h3>
                  <p className="text-green-700">{uploadedFile.name}</p>
                  <p className="text-sm text-green-600">
                    Size: {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleUploadClick}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Upload a different file
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-900">Processing your contacts...</p>
          <p className="text-gray-600">Validating emails and smart classifying recipients</p>
        </div>
      )}

      {/* Results */}
      {emailContacts.length > 0 && !isProcessing && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{validContacts.length}</p>
              <p className="text-sm text-gray-600">Valid Emails</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{invalidContacts.length}</p>
              <p className="text-sm text-gray-600">Invalid Emails</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{emailContacts.length}</p>
              <p className="text-sm text-gray-600">Total Contacts</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {validContacts.length > 0 ? Math.round((validContacts.length / emailContacts.length) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>

          {/* Classification Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Classification Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TO Recipients */}
              <div className="border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-blue-900">TO Recipients</h4>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {toContacts.length}
                  </span>
                </div>
                <p className="text-sm text-blue-700 mb-3">Primary recipients (students, general contacts)</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {toContacts.slice(0, 5).map((contact, index) => (
                    <div key={index} className="text-xs text-gray-600 truncate">
                      {contact.email}
                    </div>
                  ))}
                  {toContacts.length > 5 && (
                    <div className="text-xs text-gray-500">+{toContacts.length - 5} more</div>
                  )}
                </div>
              </div>

              {/* CC Recipients */}
              <div className="border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-yellow-900">CC Recipients</h4>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    {ccContacts.length}
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mb-3">Faculty, professors, supervisors</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {ccContacts.slice(0, 5).map((contact, index) => (
                    <div key={index} className="text-xs text-gray-600 truncate">
                      {contact.email}
                    </div>
                  ))}
                  {ccContacts.length > 5 && (
                    <div className="text-xs text-gray-500">+{ccContacts.length - 5} more</div>
                  )}
                </div>
              </div>

              {/* BCC Recipients */}
              <div className="border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-purple-900">BCC Recipients</h4>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                    {bccContacts.length}
                  </span>
                </div>
                <p className="text-sm text-purple-700 mb-3">Administrators, office staff</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {bccContacts.slice(0, 5).map((contact, index) => (
                    <div key={index} className="text-xs text-gray-600 truncate">
                      {contact.email}
                    </div>
                  ))}
                  {bccContacts.length > 5 && (
                    <div className="text-xs text-gray-500">+{bccContacts.length - 5} more</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Invalid Emails */}
          {invalidContacts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invalid Emails Found</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {invalidContacts.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-700">{contact.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to="/"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Dashboard
        </Link>
        
        {validContacts.length > 0 && (
          <Link
            to="/compose"
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Next: Compose Email</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default UploadContacts;