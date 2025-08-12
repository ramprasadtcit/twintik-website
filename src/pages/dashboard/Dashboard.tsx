import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, Share2, Download, Users, Star, Palette, Edit, Eye as PreviewIcon
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Dashboard: React.FC = () => {
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Mock analytics data
  const analytics = {
    totalViews: 80,
    shares: 30,
    connections: 32,
    saves: 20
  };

  return (
    <DashboardLayout 
      title={`Welcome ${user.name}!`}
      subtitle="Here's a look at your Twintik profile's performance"
    >
      <div className="space-y-8">
        {/* Twintik Branding & Smart Card Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">Twintik</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-green-600" />
            <span className="text-gray-700 font-medium text-lg">Smart Card</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Digital Business Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
              {/* Circuit pattern background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full"></div>
                <div className="absolute top-12 right-12 w-1 h-1 bg-blue-200 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-blue-300 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-400 rounded-full opacity-20"></div>
              </div>
              
              {/* Profile Info */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-3xl">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-3">{user.name}</h2>
                <p className="text-blue-200 text-xl mb-2">{user.jobTitle}</p>
                <p className="text-2xl font-semibold">{user.company}</p>
              </div>
              
              {/* Contact Info */}
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <span className="mr-3">📧</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📞</span>
                  <span>+971 544123123</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Section - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Analytics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <Eye className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.totalViews}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <Share2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.shares}</div>
                  <div className="text-sm text-gray-600">Shares</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.connections}</div>
                  <div className="text-sm text-gray-600">Connections</div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <Download className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{analytics.saves}</div>
                  <div className="text-sm text-gray-600">Saves</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/customize-card')}
              className="flex flex-col items-center space-y-3 p-6 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors"
            >
              <Palette className="w-8 h-8" />
              <span className="font-medium">Customize</span>
            </button>
            
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex flex-col items-center space-y-3 p-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Edit className="w-8 h-8" />
              <span className="font-medium">Edit</span>
            </button>
            
            <button
              onClick={() => navigate('/preview-card')}
              className="flex flex-col items-center space-y-3 p-6 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors"
            >
              <PreviewIcon className="w-8 h-8" />
              <span className="font-medium">Preview</span>
            </button>
            
            <button
              onClick={() => navigate('/share-card')}
              className="flex flex-col items-center space-y-3 p-6 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors"
            >
              <Share2 className="w-8 h-8" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 