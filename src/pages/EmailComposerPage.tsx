import React, { useState } from 'react';
import { Send, Sparkles, Eye, Save, Type, Image, Link, Bold, Italic, List } from 'lucide-react';

const EmailComposerPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [senderName, setSenderName] = useState('College Administration');
  const [senderEmail, setSenderEmail] = useState('admin@university.edu');
  const [showPreview, setShowPreview] = useState(false);

  const templates = [
    {
      title: 'Welcome Message',
      subject: 'Welcome to University - Important Information Inside',
      content: `Dear Student,

Welcome to our university! We're excited to have you join our academic community.

Please find attached important information about:
- Course registration deadlines
- Campus orientation schedule
- Student services and resources

If you have any questions, please don't hesitate to reach out to our student services team.

Best regards,
University Administration`
    },
    {
      title: 'Event Announcement',
      subject: 'Upcoming Event - Mark Your Calendar',
      content: `Dear Students and Faculty,

We're pleased to announce an upcoming event that you won't want to miss.

Event Details:
- Date: [Insert Date]
- Time: [Insert Time]
- Location: [Insert Location]
- Description: [Insert Description]

Please RSVP by [Insert Deadline] to secure your spot.

Looking forward to seeing you there!

Best regards,
Event Planning Committee`
    },
    {
      title: 'Reminder Notice',
      subject: 'Important Reminder - Action Required',
      content: `Dear Students,

This is a friendly reminder about upcoming deadlines and requirements.

Please remember to:
- Complete your course registration by [Date]
- Submit required documents to the registrar
- Attend mandatory orientation sessions

For questions or assistance, please contact our support team.

Best regards,
Academic Affairs Office`
    }
  ];

  const useTemplate = (template: typeof templates[0]) => {
    setSubject(template.subject);
    setContent(template.content);
  };

  const generateAIContent = () => {
    // Simulate AI content generation
    const aiSuggestions = [
      "Consider adding a personal greeting to increase engagement.",
      "Include a clear call-to-action button for better response rates.",
      "Add contact information for follow-up questions.",
      "Consider segmenting your message for different recipient groups."
    ];
    
    alert(`AI Suggestions:\n\n${aiSuggestions.join('\n')}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Composer</h1>
        <p className="text-lg text-gray-600">
          Create compelling email campaigns with AI-powered suggestions and templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Composer */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sender Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sender Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name or organization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Email
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="sender@university.edu"
                />
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Email Content</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Eye className="h-4 w-4" />
                  <span>{showPreview ? 'Edit' : 'Preview'}</span>
                </button>
                <button
                  onClick={generateAIContent}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>AI Suggest</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                
                {!showPreview ? (
                  <div className="space-y-2">
                    {/* Formatting Toolbar */}
                    <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Bold className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Italic className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <List className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Link className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Image className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Compose your email content here..."
                    />
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 min-h-80">
                    <div className="mb-4 pb-4 border-b border-gray-300">
                      <h3 className="font-semibold text-gray-900">{subject}</h3>
                      <p className="text-sm text-gray-600">
                        From: {senderName} &lt;{senderEmail}&gt;
                      </p>
                    </div>
                    <div className="prose max-w-none">
                      {content.split('\n').map((line, index) => (
                        <p key={index} className="mb-2">{line || '\u00A0'}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <span>Continue to Send</span>
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Templates Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
            <div className="space-y-3">
              {templates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Type className="h-4 w-4 text-gray-500" />
                    <h4 className="font-medium text-gray-900">{template.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {template.content.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">AI Assistant</h4>
              </div>
              <p className="text-sm text-purple-800 mb-3">
                Get personalized suggestions for your email content, subject lines, and timing.
              </p>
              <button
                onClick={generateAIContent}
                className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
              >
                Get AI Suggestions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposerPage;