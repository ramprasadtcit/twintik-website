import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, Calendar, BarChart3, Clock, User, Share2, Globe, Mail
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ViewerLogs: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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

  // Mock viewer logs data
  const viewerStats = {
    totalViews: 5,
    thisWeekViews: 5
  };

  const activityLogs = [
    {
      id: 1,
      type: 'view',
      title: 'TwinTik Viewed',
      context: 'QR Code Scan',
      time: '10:30 AM',
      icon: Eye
    },
    {
      id: 2,
      type: 'save',
      title: 'Contact Saved',
      context: 'John Doe',
      time: '09:15 AM',
      icon: User
    },
    {
      id: 3,
      type: 'linkedin',
      title: 'LinkedIn Clicked',
      context: 'Direct Link',
      time: 'Yesterday',
      icon: Share2
    },
    {
      id: 4,
      type: 'view',
      title: 'TwinTik Viewed',
      context: 'Email Signature',
      time: 'Yesterday',
      icon: Eye
    },
    {
      id: 5,
      type: 'website',
      title: 'Website Clicked',
      context: 'QR Code Scan',
      time: '2 days ago',
      icon: Globe
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view':
        return Eye;
      case 'save':
        return User;
      case 'linkedin':
        return Share2;
      case 'website':
        return Globe;
      case 'email':
        return Mail;
      default:
        return Eye;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'view':
        return 'bg-purple-100 text-purple-600';
      case 'save':
        return 'bg-green-100 text-green-600';
      case 'linkedin':
        return 'bg-blue-100 text-blue-600';
      case 'website':
        return 'bg-orange-100 text-orange-600';
      case 'email':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <DashboardLayout 
      title="Viewer Logs" 
      subtitle="Track who's viewing and interacting with your card"
    >
      <div className="space-y-6">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{viewerStats.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week Views</p>
                <p className="text-2xl font-bold text-gray-900">{viewerStats.thisWeekViews}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activityLogs.map((log) => {
                const IconComponent = getActivityIcon(log.type);
                return (
                  <div key={log.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(log.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{log.title}</h4>
                      <p className="text-sm text-gray-500">{log.context}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{log.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Activity</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
              All Activities
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Views Only
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Saves Only
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Clicks Only
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewerLogs;
