import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, Type } from 'lucide-react';

interface ComposeEmailProps {
  subject: string;
  body: string;
  onSubjectChange: (subject: string) => void;
  onBodyChange: (body: string) => void;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({
  subject,
  body,
  onSubjectChange,
  onBodyChange
}) => {
  const templates = [
    {
      title: 'Welcome Message',
      subject: 'Welcome to our community!',
      body: `Dear [Name],

Welcome to our community! We're excited to have you join us.

Here's what you can expect:
• Regular updates and newsletters
• Exclusive member benefits
• Access to special events

If you have any questions, feel free to reach out.

Best regards,
The Team`
    },
    {
      title: 'Newsletter',
      subject: 'Monthly Newsletter - [Month] Edition',
      body: `Hello [Name],

Here's what's happening this month:

📰 Latest News
• Update 1
• Update 2
• Update 3

📅 Upcoming Events
• Event 1 - Date
• Event 2 - Date

Thank you for being part of our community!

Best regards,
Newsletter Team`
    },
    {
      title: 'Event Invitation',
      subject: 'You\'re Invited: [Event Name]',
      body: `Dear [Name],

You're cordially invited to our upcoming event!

🎉 Event: [Event Name]
📅 Date: [Date]
🕐 Time: [Time]
📍 Location: [Location]

Please RSVP by [RSVP Date].

We look forward to seeing you there!

Best regards,
Event Team`
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
          Create your email campaign with a compelling subject and message
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
              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
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
                  Email Body
                </label>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => onBodyChange(e.target.value)}
                  placeholder="Write your email content here..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {(subject || body) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h3>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="border-b border-gray-300 pb-3 mb-4">
                  <h4 className="font-semibold text-gray-900">
                    {subject || 'No subject'}
                  </h4>
                  <p className="text-sm text-gray-600">From: your-email@domain.com</p>
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
        
        {subject && body && (
          <Link
            to="/send"
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <span>Next: Send Campaign</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ComposeEmail;