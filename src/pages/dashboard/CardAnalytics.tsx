import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Eye, BarChart3, UserPlus, ExternalLink, Globe,
  TrendingUp, Filter, Download, ArrowLeft
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const CardAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate, id]);

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

  // Mock analytics data for specific card
  const cardAnalytics = {
    totalViews: 156,
    uniqueVisitors: 89,
    shares: 23,
    connections: 12,
    conversionRate: 7.7,
    avgSessionDuration: '1m 45s',
    topSources: [
      { source: 'QR Code Scans', percentage: 45, count: 70 },
      { source: 'Direct Links', percentage: 32, count: 50 },
      { source: 'Email Signatures', percentage: 18, count: 28 },
      { source: 'Social Media', percentage: 5, count: 8 }
    ]
  };

  // Mock activity logs for this card
  const activityLogs = [
    {
      id: 1,
      type: 'view',
      title: 'Card Viewed',
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
      title: 'LinkedIn Clicked',
      subtitle: 'Direct Link',
      time: 'Yesterday',
      date: 'Yesterday',
      icon: ExternalLink
    },
    {
      id: 4,
      type: 'view',
      title: 'Card Viewed',
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
      title="Card Analytics" 
      subtitle={`Analytics for card ${id}`}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/cards')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cards</span>
              </button>
              <h3 className="text-lg font-semibold text-gray-900">Card Performance</h3>
            </div>
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
                <p className="text-2xl font-bold text-gray-900">{cardAnalytics.totalViews}</p>
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
                <p className="text-2xl font-bold text-gray-900">{cardAnalytics.uniqueVisitors}</p>
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
                <p className="text-2xl font-bold text-gray-900">{cardAnalytics.shares}</p>
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
                <p className="text-2xl font-bold text-gray-900">{cardAnalytics.connections}</p>
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
                <span className="font-semibold text-gray-900">{cardAnalytics.conversionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg Session Duration</span>
                <span className="font-semibold text-gray-900">{cardAnalytics.avgSessionDuration}</span>
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
              {cardAnalytics.topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{source.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{source.count}</span>
                    <span className="text-sm text-gray-500">({source.percentage}%)</span>
                  </div>
                </div>
              ))}
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
              <p className="text-gray-600">Download analytics data for this card</p>
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

export default CardAnalytics;
