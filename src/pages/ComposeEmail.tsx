import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, User, Type, AlertCircle } from 'lucide-react';

interface ComposeEmailProps {
  senderEmail: string;
  subject: string;
  body: string;
  onSenderEmailChange: (email: string) => void;
  onSubjectChange: (subject: string) => void;
  onBodyChange: (body: string) => void;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({
  senderEmail,
  subject,
  body,
  onSenderEmailChange,
  onSubjectChange,
  onBodyChange
}) => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const isValidSender = validateEmail(senderEmail);
  const canProceed = isValidSender && subject.trim() && body.trim();

  const templates = [
    {
      title: 'Welcome Message',
      subject: 'Welcome to University - Important Information',
      body: `Dear Students,

Welcome to our university! We're excited to have you join our academic community.

Here's what you need to know:
• Course registration opens next week
• Orientation sessions are mandatory
• Student ID cards are available at the main office

If you have any questions, please don't hesitate to contact us.

Best regards,
University Administration`
    },
    {
      title: 'Event Announcement',
      subject: 'Upcoming Campus Event - Mark Your Calendar',
      body: `Dear Students and Faculty,

We're pleased to announce an exciting upcoming event on campus.

Event Details:
• Date: [Insert Date]
• Time: [Insert Time]  
• Location: Main Auditorium
• Topic: Academic Excellence Workshop

Please RSVP by replying to this email.

Looking forward to seeing you there!

Best regards,
Event Planning Committee`
    },
    {
      title: 'Important Notice',
      subject: 'Important: Action Required - Please Read',
      body: `Dear Students,

This is an important notice regarding upcoming deadlines and requirements.

Please ensure you:
• Complete your course registration by the deadline
• Submit all required documents to the registrar
• Attend mandatory orientation sessions

For assistance, contact our student services team.

Best regards,
Academic Affairs Office`
    }
  ];

  const useTemplate = (template: typeof templates[0]) => {
    onSubjectChange(template.subject);
    onBodyChange(template.body);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compose Email</h1>
        <p className="text-lg text-gray-600">
          Create your email campaign with compelling content and proper sender information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Compose Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Mail className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Email Content</h2>
            </div>

            <div className="space-y-6">
              {/* Sender Email Field */}
              <div>
                <label htmlFor="sender" className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="sender"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => onSenderEmailChange(e.target.value)}
                    placeholder="your-email@university.edu"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      senderEmail && !isValidSender 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                </div>
                {senderEmail && !isValidSender && (
                  <div className="flex items-center space-x-1 mt-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-sm text-red-600">Please enter a valid email address</p>
                  </div>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  placeholder="Enter your email subject..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Body Field */}
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                  Message Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => onBodyChange(e.target.value)}
                  placeholder="Write your email content here..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Characters: {body.length}
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          {(subject || body) && isValidSender && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="border-b border-gray-300 pb-3 mb-4">
                  <h4 className="font-semibold text-gray-900">
                    {subject || 'No subject'}
                  </h4>
                  <p className="text-sm text-gray-600">From: {senderEmail}</p>
                  <p className="text-sm text-gray-600">To: Recipients from uploaded contacts</p>
                </div>
                <div className="whitespace-pre-wrap text-gray-800">
                  {body || 'No content'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Templates Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <div className="flex items-center space-x-2 mb-4">
              <Type className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Choose from pre-made templates to get started quickly
            </p>
            
            <div className="space-y-3">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {template.body.substring(0, 60)}...
                  </p>
                </button>
              ))}
            </div>

            {/* Requirements Checklist */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${isValidSender ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Valid sender email</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${subject.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Subject line</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${body.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Message content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link
          to="/upload"
          className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back: Upload Contacts</span>
        </Link>
        
        {canProceed ? (
          <Link
            to="/send"
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Next: Send Campaign</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="flex items-center space-x-2 px-6 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
            <span>Complete all fields</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposeEmail;