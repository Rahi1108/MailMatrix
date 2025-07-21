import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Users, TrendingUp, Clock, ArrowRight, Upload, Edit, Send } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    { label: 'Total Campaigns', value: '12', icon: Mail, color: 'blue' },
    { label: 'Emails Sent', value: '3,247', icon: Send, color: 'emerald' },
    { label: 'Active Recipients', value: '891', icon: Users, color: 'indigo' },
    { label: 'Success Rate', value: '94.2%', icon: TrendingUp, color: 'green' },
  ];

  const recentCampaigns = [
    { id: 1, title: 'Welcome New Students', status: 'Sent', recipients: 156, date: '2 hours ago' },
    { id: 2, title: 'Course Registration Reminder', status: 'Draft', recipients: 89, date: '1 day ago' },
    { id: 3, title: 'Library Workshop Invitation', status: 'Scheduled', recipients: 234, date: '3 days ago' },
  ];

  const quickActions = [
    { 
      title: 'Upload Contacts', 
      description: 'Import email lists from CSV files',
      icon: Upload,
      path: '/upload',
      color: 'blue'
    },
    { 
      title: 'Compose Email', 
      description: 'Create new email campaigns',
      icon: Edit,
      path: '/compose',
      color: 'emerald'
    },
    { 
      title: 'Send Campaign', 
      description: 'Review and send your emails',
      icon: Send,
      path: '/simulate',
      color: 'indigo'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to MailMatrix
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your smart mass-mail dispatcher for efficient college communication
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${color}-100`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map(({ title, description, icon: Icon, path, color }) => (
            <Link
              key={title}
              to={path}
              className={`group p-6 rounded-lg border-2 border-gray-200 hover:border-${color}-300 transition-all duration-200 hover:shadow-md`}
            >
              <div className={`inline-flex p-3 rounded-lg bg-${color}-100 text-${color}-600 mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">Get started</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Campaigns</h2>
          <Link to="/campaigns" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {recentCampaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">{campaign.recipients} recipients</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {campaign.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;