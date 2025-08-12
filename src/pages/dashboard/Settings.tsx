import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, CreditCard, HelpCircle, Lock, Crown, ChevronRight
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Settings: React.FC = () => {
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

  const settingsOptions = [
    { icon: Eye, label: 'Viewer Logs', path: '/viewer-logs' },
    { icon: CreditCard, label: 'Subscription', path: '/subscription' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
    { icon: Lock, label: 'Change Password', path: '/change-password' },
  ];

  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your account and preferences"
    >
      <div className="space-y-8 max-w-4xl">
        {/* User Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-2xl">
                {user.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{user.name}</h3>
              <p className="text-gray-500 text-lg">{user.email}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Premium Features Banner */}
        <div className="bg-green-600 rounded-xl p-8 text-white shadow-lg">
          <div className="text-center mb-6">
            <Crown className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Unlock Premium Features</h3>
          </div>
          <p className="text-green-100 text-center mb-6 text-lg">
            Get advanced analytics, custom branding, and more
          </p>
          <button 
            onClick={() => navigate('/pricing')}
            className="w-full bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-lg"
          >
            Upgrade to PRO
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          {settingsOptions.map((option) => (
            <div key={option.path} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <button
                onClick={() => navigate(option.path)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <option.icon className="w-6 h-6 text-gray-600" />
                  <span className="font-medium text-gray-900 text-lg">{option.label}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {/* App Information */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="text-2xl font-bold text-blue-600">Twintik</span>
          </div>
          <p className="text-gray-500 text-lg">Version 1.0.0</p>
          <p className="text-sm text-gray-400 mt-2">
            © 2025 Twintik. All rights reserved.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 