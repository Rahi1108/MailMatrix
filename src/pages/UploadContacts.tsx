import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, CheckCircle, ArrowRight } from 'lucide-react';

interface UploadContactsProps {
  uploadedFile: File | null;
  onFileUpload: (file: File) => void;
}

const UploadContacts: React.FC<UploadContactsProps> = ({ uploadedFile, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Contacts</h1>
        <p className="text-lg text-gray-600">
          Import your email contacts from a CSV file to start your campaign
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
                  <li>• First column should contain email addresses</li>
                  <li>• Optional: Second column for names</li>
                  <li>• Example: email@domain.com, John Doe</li>
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
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-gray-600" />
                  <h4 className="font-medium text-gray-900">File Preview</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Estimated contacts: ~{Math.floor(uploadedFile.size / 30)}</p>
                  <p>• File format: CSV</p>
                  <p>• Status: Ready for processing</p>
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

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to="/"
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          Back to Dashboard
        </Link>
        
        {uploadedFile && (
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