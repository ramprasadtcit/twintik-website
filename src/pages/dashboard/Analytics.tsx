import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, BarChart3, UserPlus, ExternalLink, Globe,
  TrendingUp, Filter, Download
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Mock analytics data
  const analytics = {
    totalViews: 1247,
    uniqueVisitors: 892,
    shares: 156,
    connections: 89,
    conversionRate: 7.1,
    avgSessionDuration: '2m 34s'
  };

  // Mock activity logs
  const activityLogs = [
    {
      id: 1,
      type: 'view',
      title: 'Twintik Viewed',
      subtitle: 'QR Code Scan',
      time: '10:30 AM',
      date: 'Today',
      icon: Eye
    },
    {
      id: 2,
      type: 'contact',
      title: 'Contact Saved',
      subtitle: 'John Doe',
      time: '09:15 AM',
      date: 'Today',
      icon: UserPlus
    },
    {
      id: 3,
      type: 'linkedin',
      title: 'Linkedin Clicked',
      subtitle: 'Direct Link',
      time: 'Yesterday',
      date: 'Yesterday',
      icon: ExternalLink
    },
    {
      id: 4,
      type: 'view',
      title: 'Twintik Viewed',
      subtitle: 'Email Signature',
      time: 'Yesterday',
      date: 'Yesterday',
      icon: Eye
    },
    {
      id: 5,
      type: 'website',
      title: 'Website Clicked',
      subtitle: 'QR Code Scan',
      time: '2 days ago',
      date: '2 days ago',
      icon: Globe
    }
  ];

  const getIconComponent = (iconType: any) => {
    switch (iconType) {
      case Eye:
        return <Eye className="w-5 h-5 text-green-600" />;
      case UserPlus:
        return <UserPlus className="w-5 h-5 text-green-600" />;
      case ExternalLink:
        return <ExternalLink className="w-5 h-5 text-green-600" />;
      case Globe:
        return <Globe className="w-5 h-5 text-blue-600" />;
      default:
        return <Eye className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout 
      title="Analytics" 
      subtitle="Track your digital card performance and engagement"
    >
      <div className="space-y-6">
        {/* Time Range Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Time Range</h3>
            <div className="flex space-x-2">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.uniqueVisitors}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shares</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.shares}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connections</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.connections}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-gray-900">{analytics.conversionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg Session Duration</span>
                <span className="font-semibold text-gray-900">{analytics.avgSessionDuration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bounce Rate</span>
                <span className="font-semibold text-gray-900">23.4%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Sources</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">QR Code Scans</span>
                <span className="font-semibold text-gray-900">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Direct Links</span>
                <span className="font-semibold text-gray-900">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email Signatures</span>
                <span className="font-semibold text-gray-900">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Social Media</span>
                <span className="font-semibold text-gray-900">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {activityLogs.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getIconComponent(activity.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
              <p className="text-gray-600">Download your analytics data for further analysis</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 