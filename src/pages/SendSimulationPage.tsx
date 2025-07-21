import React, { useState } from 'react';
import { Send, Clock, CheckCircle, AlertTriangle, Users, Mail, Calendar, ArrowRight } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  subject: string;
  sender: string;
  recipients: {
    to: number;
    cc: number;
    bcc: number;
  };
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  scheduledTime?: string;
  sentTime?: string;
  deliveryRate?: number;
}

const SendSimulationPage: React.FC = () => {
  const [currentCampaign] = useState<Campaign>({
    id: '1',
    title: 'Welcome New Students 2024',
    subject: 'Welcome to University - Important Information Inside',
    sender: 'admin@university.edu',
    recipients: { to: 245, cc: 12, bcc: 3 },
    status: 'draft'
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduledDateTime, setScheduledDateTime] = useState('');

  const simulateSending = async () => {
    setIsSimulating(true);
    setDeliveryProgress(0);
    
    // Simulate sending progress
    const interval = setInterval(() => {
      setDeliveryProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimulationComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const scheduleSending = () => {
    if (scheduledDateTime) {
      alert(`Email scheduled for ${new Date(scheduledDateTime).toLocaleString()}`);
      setScheduleMode(false);
    }
  };

  const totalRecipients = currentCampaign.recipients.to + currentCampaign.recipients.cc + currentCampaign.recipients.bcc;

  const deliveryStats = [
    { label: 'Delivered', value: 242, percentage: 93.8, color: 'green' },
    { label: 'Bounced', value: 12, percentage: 4.7, color: 'red' },
    { label: 'Pending', value: 4, percentage: 1.5, color: 'yellow' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Send Campaign</h1>
        <p className="text-lg text-gray-600">
          Review your campaign details and send to your classified recipient groups
        </p>
      </div>

      {/* Campaign Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
              <p className="text-gray-900 font-medium">{currentCampaign.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
              <p className="text-gray-900">{currentCampaign.subject}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sender</label>
              <p className="text-gray-900">{currentCampaign.sender}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Distribution</label>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">To Recipients</span>
                  </span>
                  <span className="font-medium">{currentCampaign.recipients.to}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">CC Recipients</span>
                  </span>
                  <span className="font-medium">{currentCampaign.recipients.cc}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">BCC Recipients</span>
                  </span>
                  <span className="font-medium">{currentCampaign.recipients.bcc}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Recipients</span>
                    <span>{totalRecipients}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Preview</h2>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="mb-4 pb-4 border-b border-gray-300">
            <h3 className="font-semibold text-gray-900">{currentCampaign.subject}</h3>
            <p className="text-sm text-gray-600">From: {currentCampaign.sender}</p>
          </div>
          <div className="prose max-w-none">
            <p>Dear Student,</p>
            <p>Welcome to our university! We're excited to have you join our academic community.</p>
            <p>Please find attached important information about:</p>
            <ul>
              <li>Course registration deadlines</li>
              <li>Campus orientation schedule</li>
              <li>Student services and resources</li>
            </ul>
            <p>If you have any questions, please don't hesitate to reach out to our student services team.</p>
            <p>Best regards,<br />University Administration</p>
          </div>
        </div>
      </div>

      {/* Send Options */}
      {!isSimulating && !simulationComplete && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Options</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="send-now"
                name="send-option"
                checked={!scheduleMode}
                onChange={() => setScheduleMode(false)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="send-now" className="flex items-center space-x-2 cursor-pointer">
                <Send className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Send Now</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="schedule"
                name="send-option"
                checked={scheduleMode}
                onChange={() => setScheduleMode(true)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="schedule" className="flex items-center space-x-2 cursor-pointer">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Schedule for Later</span>
              </label>
            </div>
            
            {scheduleMode && (
              <div className="ml-8 mt-4">
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(e) => setScheduledDateTime(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Back to Compose
            </button>
            
            <div className="space-x-4">
              {scheduleMode ? (
                <button
                  onClick={scheduleSending}
                  disabled={!scheduledDateTime}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Clock className="h-4 w-4" />
                  <span>Schedule Campaign</span>
                </button>
              ) : (
                <button
                  onClick={simulateSending}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Campaign</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sending Progress */}
      {isSimulating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sending in Progress</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Delivery Progress</span>
              <span className="font-medium">{deliveryProgress}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Sending emails to {totalRecipients} recipients...</span>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Results */}
      {simulationComplete && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Campaign Sent Successfully!</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {deliveryStats.map(({ label, value, percentage, color }) => (
              <div key={label} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
                <div className={`text-xs text-${color}-600 font-medium`}>{percentage}%</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Campaign completed successfully</p>
                <p className="text-sm text-green-700">
                  Sent to {totalRecipients} recipients with 93.8% delivery rate
                </p>
              </div>
            </div>
            <button className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              <span>View Report</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendSimulationPage;