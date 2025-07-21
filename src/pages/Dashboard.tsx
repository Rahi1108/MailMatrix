import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Users, TrendingUp, Send, Upload, Edit, ArrowRight } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalCampaigns: number;
    emailsSent: number;
    activeRecipients: number;
    successRate: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Campaigns',
      value: stats.totalCampaigns.toString(),
      icon: Mail,
      color: 'blue'
    },
    {
      label: 'Emails Sent',
      value: stats.emailsSent.toLocaleString(),
      icon: Send,
      color: 'emerald'
    },
    {
      label: 'Active Recipients',
      value: stats.activeRecipients.toLocaleString(),
      icon: Users,
      color: 'indigo'
    },
    {
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'green'
    }
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
      path: '/send',
      color: 'indigo'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mass-Mail Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage your email campaigns with powerful tools and real-time analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map(({ label, value, icon: Icon, color }) => (
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
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

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Welcome Campaign</p>
                <p className="text-sm text-gray-600">Sent to 1,247 recipients</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Contact List Updated</p>
                <p className="text-sm text-gray-600">Added 89 new contacts</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Edit className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Newsletter Template</p>
                <p className="text-sm text-gray-600">Created new template</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;