import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

interface EmailRecord {
  email: string;
  name: string;
  category: 'to' | 'cc' | 'bcc';
  valid: boolean;
}

const UploadCsvPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [emailRecords, setEmailRecords] = useState<EmailRecord[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'text/csv') {
      processFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      const dummyData: EmailRecord[] = [
        { email: 'john.doe@university.edu', name: 'John Doe', category: 'to', valid: true },
        { email: 'jane.smith@university.edu', name: 'Jane Smith', category: 'to', valid: true },
        { email: 'prof.wilson@university.edu', name: 'Prof. Wilson', category: 'cc', valid: true },
        { email: 'invalid-email', name: 'Invalid User', category: 'to', valid: false },
        { email: 'admin@university.edu', name: 'Admin', category: 'bcc', valid: true },
      ];
      setEmailRecords(dummyData);
      setIsProcessing(false);
    }, 2000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setEmailRecords([]);
  };

  const validEmails = emailRecords.filter(record => record.valid);
  const invalidEmails = emailRecords.filter(record => !record.valid);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Email Lists</h1>
        <p className="text-lg text-gray-600">
          Import your email contacts from CSV files for campaign targeting
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : uploadedFile
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="h-8 w-8 text-green-600" />
                <span className="text-lg font-medium text-gray-900">{uploadedFile.name}</span>
                <button
                  onClick={removeFile}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-red-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                File size: {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your CSV file here, or{' '}
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                    browse
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-600">
                  Supports CSV files up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Format Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">CSV Format Requirements:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Column headers: email, name (optional), category (optional)</li>
            <li>• Category values: to, cc, bcc (defaults to 'to')</li>
            <li>• Example: email@domain.com, John Doe, to</li>
          </ul>
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-900">Processing your file...</p>
          <p className="text-gray-600">Validating email addresses and categorizing recipients</p>
        </div>
      )}

      {/* Results */}
      {emailRecords.length > 0 && !isProcessing && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{validEmails.length}</p>
                <p className="text-sm text-green-800">Valid Emails</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{invalidEmails.length}</p>
                <p className="text-sm text-red-800">Invalid Emails</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{emailRecords.length}</p>
                <p className="text-sm text-blue-800">Total Records</p>
              </div>
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Email Preview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emailRecords.slice(0, 10).map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.valid ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          record.category === 'to' ? 'bg-blue-100 text-blue-800' :
                          record.category === 'cc' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {record.category.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {emailRecords.length > 10 && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                Showing 10 of {emailRecords.length} records
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={removeFile}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Upload Different File
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Proceed to Classification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCsvPage;