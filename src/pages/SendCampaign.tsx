import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, FileText, Mail, Users, CheckCircle, ArrowLeft, Home, Clock, AlertCircle } from 'lucide-react';
import { EmailContact } from '../App';
import { EmailService } from '../services/emailService';

interface SendCampaignProps {
  uploadedFile: File | null;
  emailContacts: EmailContact[];
  senderEmail: string;
  subject: string;
  body: string;
  onCampaignSent: () => void;
}

const SendCampaign: React.FC<SendCampaignProps> = ({
  uploadedFile,
  emailContacts,
  senderEmail,
  subject,
  body,
  onCampaignSent
}) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [sendingStatus, setSendingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const emailService = new EmailService();

  const validContacts = emailContacts.filter(contact => contact.isValid);
  const toContacts = validContacts.filter(contact => contact.category === 'to');
  const ccContacts = validContacts.filter(contact => contact.category === 'cc');
  const bccContacts = validContacts.filter(contact => contact.category === 'bcc');

  const handleSendReal = async () => {
    setIsSending(true);
    setSendingStatus('sending');
    setSendingProgress(0);
    setErrorMessage('');

    try {
      // Test connection first
      const connectionOk = await emailService.testConnection();
      if (!connectionOk) {
        throw new Error('Unable to connect to email server. Please check your backend configuration.');
      }

      // Prepare email data
      const emailData = {
        from: senderEmail,
        to: toContacts.map(c => c.email),
        cc: ccContacts.length > 0 ? ccContacts.map(c => c.email) : undefined,
        bcc: bccContacts.length > 0 ? bccContacts.map(c => c.email) : undefined,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              ${body.split('\n').map(line => `<p style="margin: 10px 0;">${line}</p>`).join('')}
            </div>
          </div>
        `,
      };

      // Send email
      const result = await emailService.sendEmail(emailData);
      
      if (result.success) {
        setSendingProgress(100);
        setSendingStatus('success');
        setIsSent(true);
        onCampaignSent();
        
        alert(`🎉 Campaign sent successfully via Gmail SMTP!
        
✅ ${validContacts.length} emails delivered
📧 TO: ${toContacts.length} recipients
📧 CC: ${ccContacts.length} recipients  
📧 BCC: ${bccContacts.length} recipients
📨 Message ID: ${result.messageId}

Your campaign has been sent through Gmail's SMTP server.`);
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSendingStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsSending(false);
    }
  };

  const handleSendDemo = async () => {
    setIsSending(true);
    setSendingStatus('sending');
    setSendingProgress(0);
    
    // Simulate sending progress for demo
    const interval = setInterval(() => {
      setSendingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          setSendingStatus('success');
          setIsSent(true);
          onCampaignSent();
          
          alert(`🎉 Demo Campaign sent successfully! 
          
✅ ${validContacts.length} emails delivered
📧 TO: ${toContacts.length} recipients
📧 CC: ${ccContacts.length} recipients  
📧 BCC: ${bccContacts.length} recipients

This was a demo. To send real emails, set up the backend server with Gmail SMTP.`);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const canSend = uploadedFile && validContacts.length > 0 && senderEmail && subject && body;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Send Campaign</h1>
        <p className="text-lg text-gray-600">
          Review your campaign details and send to your classified recipients
        </p>
      </div>

      {/* Campaign Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File & Sender Info */}
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
              <Mail className="h-6 w-6 text-emerald-600" />
              <div>
                <h3 className="font-medium text-gray-900">Sender</h3>
                <p className="text-sm text-gray-600">
                  {senderEmail || 'No sender email set'}
                </p>
              </div>
            </div>
          </div>

          {/* Recipients Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-medium text-gray-900">Recipients</h3>
                <p className="text-sm text-gray-600">
                  {validContacts.length} valid contacts
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">TO Recipients</span>
                </span>
                <span className="font-medium">{toContacts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">CC Recipients</span>
                </span>
                <span className="font-medium">{ccContacts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">BCC Recipients</span>
                </span>
                <span className="font-medium">{bccContacts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      {subject && body && senderEmail && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Message Preview</h2>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="border-b border-gray-300 pb-3 mb-4">
              <h3 className="font-semibold text-gray-900">{subject}</h3>
              <p className="text-sm text-gray-600">From: {senderEmail}</p>
              <p className="text-sm text-gray-600">To: {validContacts.length} recipients</p>
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
            {/* Backend Status Check */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-900">Email Delivery Options</h3>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleSendReal}
                  disabled={!canSend || isSending}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Send via Gmail SMTP (Real)
                </button>
                <button
                  onClick={handleSendDemo}
                  disabled={!canSend || isSending}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Send Demo (Simulation)
                </button>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Real sending requires backend server setup with Gmail SMTP configuration
              </p>
            </div>

            {!canSend ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-medium text-yellow-900">Campaign Not Ready</h3>
                </div>
                <p className="text-yellow-800 text-sm">
                  Please complete all previous steps before sending your campaign.
                </p>
                <ul className="text-yellow-700 text-sm mt-2 space-y-1">
                  {!uploadedFile && <li>• Upload a contact file</li>}
                  {validContacts.length === 0 && <li>• Ensure you have valid email contacts</li>}
                  {!senderEmail && <li>• Set a sender email address</li>}
                  {!subject && <li>• Add an email subject</li>}
                  {!body && <li>• Write your email content</li>}
                </ul>
              </div>
            ) : isSending ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-600 font-medium">Sending campaign...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${sendingProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  Delivering emails to {validContacts.length} recipients... ({sendingProgress}%)
                </p>
                {sendingStatus === 'sending' && (
                  <p className="text-xs text-blue-600">
                    Using Gmail SMTP server for delivery...
                  </p>
                )}
              </div>
            ) : sendingStatus === 'error' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <AlertCircle className="h-6 w-6" />
                  <span className="font-medium">Sending Failed</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{errorMessage}</p>
                  <div className="mt-3 space-y-2 text-xs text-red-700">
                    <p><strong>Common solutions:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Make sure the backend server is running</li>
                      <li>Check Gmail SMTP credentials in .env file</li>
                      <li>Verify App Password is correctly set</li>
                      <li>Ensure 2FA is enabled on Gmail account</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSendingStatus('idle');
                    setErrorMessage('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Send?</h2>
                <p className="text-gray-600 mb-6">
                  Your campaign will be sent to {validContacts.length} recipients across {toContacts.length} TO, {ccContacts.length} CC, and {bccContacts.length} BCC addresses.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-8 w-8" />
              <h2 className="text-xl font-semibold">Campaign Sent Successfully!</h2>
            </div>
            <p className="text-gray-600">
              Your email has been delivered to {validContacts.length} recipients. 
              You can track delivery status and engagement metrics from your dashboard.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• Emails delivered via Gmail SMTP server</li>
                <li>• Recipients will see your Gmail address as sender</li>
                <li>• Delivery confirmations sent to your Gmail</li>
                <li>• Check Gmail Sent folder for copies</li>
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
            
            {!canSend && (
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