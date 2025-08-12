import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Settings, Bot, QrCode, 
  Crown, LogOut
} from 'lucide-react';

interface SidebarProps {
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Main navigation matching mobile app structure
  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: QrCode, label: 'Tools', path: '/cards' }, // Tools includes Cards, Analytics, etc.
    { icon: Bot, label: 'Avatar', path: '/ai-twin' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TwinTik</h1>
            <p className="text-sm text-gray-500">Smart Business Card</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold text-lg">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</h3>
            <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      {user?.plan === 'Free' && (
        <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 mx-4 mt-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Unlock Premium Features</span>
          </div>
          <p className="text-green-100 text-sm mb-3">
            Get advanced analytics, custom branding, and more
          </p>
          <button 
            onClick={() => navigate('/pricing')}
            className="w-full bg-white text-green-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive(item.path)
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-sm text-gray-500">Version 1.0.0</span>
        </div>
        <p className="text-xs text-gray-400 text-center">
          © 2025 TwinTik. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
