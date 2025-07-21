import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, FileText, Mail, Users, CheckCircle, ArrowLeft, Home } from 'lucide-react';

interface SendCampaignProps {
  uploadedFile: File | null;
  subject: string;
  body: string;
  onCampaignSent: () => void;
}

const SendCampaign: React.FC<SendCampaignProps> = ({
  uploadedFile,
  subject,
  body,
  onCampaignSent
}) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSending(false);
    setIsSent(true);
    onCampaignSent();
    
    // Show success alert
    alert('🎉 Campaign sent successfully! Your emails are being delivered.');
  };

  const estimatedRecipients = uploadedFile ? Math.floor(uploadedFile.size / 30) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Send Campaign</h1>
        <p className="text-lg text-gray-600">
          Review your campaign details and send to your recipients
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Contact File</h3>
                <p className="text-sm text-gray-600">
                  {uploadedFile ? uploadedFile.name : 'No file uploaded'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-emerald-600" />
              <div>
                <h3 className="font-medium text-gray-900">Recipients</h3>
                <p className="text-sm text-gray-600">
                  ~{estimatedRecipients} contacts
                </p>
              </div>
            </div>
          </div>

          {/* Email Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-medium text-gray-900">Subject</h3>
                <p className="text-sm text-gray-600">
                  {subject || 'No subject set'}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Content Preview</h3>
              <div className="text-sm text-gray-600 bg-gray-50 rounded p-3 max-h-20 overflow-hidden">
                {body ? body.substring(0, 100) + '...' : 'No content set'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      {subject && body && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Final Email Preview</h2>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="border-b border-gray-300 pb-3 mb-4">
              <h3 className="font-semibold text-gray-900">{subject}</h3>
              <p className="text-sm text-gray-600">From: your-email@domain.com</p>
              <p className="text-sm text-gray-600">To: {estimatedRecipients} recipients</p>
            </div>
            <div className="whitespace-pre-wrap text-gray-800 max-h-40 overflow-y-auto">
              {body}
            </div>
          </div>
        </div>
      )}

      {/* Send Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!isSent ? (
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Send?</h2>
              <p className="text-gray-600">
                Your campaign will be sent to approximately {estimatedRecipients} recipients
              </p>
            </div>

            {isSending ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-600 font-medium">Sending campaign...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-600">
                  Please wait while we deliver your emails...
                </p>
              </div>
            ) : (
              <button
                onClick={handleSend}
                disabled={!uploadedFile || !subject || !body}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Campaign
              </button>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-8 w-8" />
              <h2 className="text-xl font-semibold">Campaign Sent Successfully!</h2>
            </div>
            <p className="text-gray-600">
              Your email has been sent to {estimatedRecipients} recipients. 
              You can track the delivery status from your dashboard.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• Emails are being delivered to recipients</li>
                <li>• You'll receive delivery reports via email</li>
                <li>• Track opens and clicks in your dashboard</li>
                <li>• Bounced emails will be automatically flagged</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {!isSent ? (
          <>
            <Link
              to="/compose"
              className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back: Compose Email</span>
            </Link>
            
            {(!uploadedFile || !subject || !body) && (
              <div className="text-sm text-gray-500 flex items-center">
                Complete all steps to send campaign
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center">
            <Link
              to="/"
              className="flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendCampaign;