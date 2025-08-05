import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  QrCode, 
  Share2, 
  Eye, 
  Users, 
  TrendingUp, 
  Crown, 
  Settings, 
  Edit3,
  Smartphone,
  CreditCard,
  Zap,
  Brain,
  BarChart3,
  MessageCircle,
  Calendar,
  FileText,
  ArrowRight,
  Check,
  X,
  Building2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout, requestNfcCard } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showNfcRequestModal, setShowNfcRequestModal] = useState(false);
  const [nfcRequestData, setNfcRequestData] = useState({
    address: '',
    design: 'Standard Design',
    quantity: '1'
  });
  const [isSubmittingNfc, setIsSubmittingNfc] = useState(false);

  // Mock data - in real app this would come from API
  const cardStats = {
    views: 127,
    shares: 43,
    leads: 12,
    uniqueUrl: user?.uniqueUrl || 'john-doe'
  };

  const recentActivity = [
    { type: 'view', message: 'Card viewed by Sarah Johnson', time: '2 hours ago' },
    { type: 'share', message: 'Card shared via WhatsApp', time: '4 hours ago' },
    { type: 'lead', message: 'New lead captured from LinkedIn', time: '1 day ago' },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const handleNfcRequest = () => {
    setShowNfcRequestModal(true);
  };

  const handleNfcSubmit = async () => {
    if (!nfcRequestData.address.trim()) {
      alert('Please enter your shipping address');
      return;
    }

    setIsSubmittingNfc(true);
    try {
      await requestNfcCard(nfcRequestData.address, nfcRequestData.design, nfcRequestData.quantity);
      setShowNfcRequestModal(false);
      setNfcRequestData({ address: '', design: 'Standard Design', quantity: '1' });
      alert('NFC card request submitted successfully! We\'ll ship it to your address.');
    } catch (error) {
      alert('Failed to submit NFC card request. Please try again.');
    } finally {
      setIsSubmittingNfc(false);
    }
  };

  const getPlanName = () => {
    switch (user?.plan) {
      case 'freemium': return 'Starter';
      case 'premium': return 'Pro';
      case 'business': return 'Business';
      default: return 'Starter';
    }
  };

  const canRequestNfc = () => {
    // Allow all users to request NFC cards
    return true;
  };

  const canAccessAvatar = () => {
    return user?.plan === 'premium' || user?.plan === 'business';
  };

  const canAccessAnalytics = () => {
    return user?.plan === 'premium' || user?.plan === 'business';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Your digital business card is active and ready to share.
          </p>
          {user?.plan === 'freemium' && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">
                      Current Plan: {getPlanName()}
                    </p>
                    <p className="text-sm text-blue-700">
                      Upgrade to unlock AI Avatar, NFC cards, and advanced analytics
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="btn-primary text-sm"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Digital Card Preview */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Digital Card</h3>
            <div className="flex space-x-2">
              <button className="btn-ghost text-sm">
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button className="btn-ghost text-sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Preview */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{user?.name || 'Your Name'}</h4>
                <p className="text-gray-600 text-sm mb-2">{user?.jobTitle || 'Professional Title'}</p>
                <p className="text-gray-600 text-sm mb-4">{user?.company || 'Company Name'}</p>
                <div className="flex justify-center space-x-2">
                  <button className="p-2 bg-white rounded-lg shadow-sm">
                    <QrCode className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-sm">
                    <Smartphone className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full btn-outline text-sm">
                <QrCode className="w-4 h-4 mr-2" />
                Show QR Code
              </button>
              <button 
                className={`w-full text-sm ${
                  canRequestNfc() 
                    ? 'btn-outline' 
                    : 'btn-ghost text-gray-400 cursor-not-allowed'
                }`}
                onClick={canRequestNfc() ? handleNfcRequest : undefined}
                disabled={!canRequestNfc()}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Request NFC Card
              </button>
              <button className="w-full btn-outline text-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </button>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Views</span>
                </div>
                <span className="font-semibold text-gray-900">{cardStats.views}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Shares</span>
                </div>
                <span className="font-semibold text-gray-900">{cardStats.shares}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Leads</span>
                </div>
                <span className="font-semibold text-gray-900">{cardStats.leads}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Features Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Avatar */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI Avatar Assistant</h4>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Pro
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Create an AI-powered digital twin that can answer questions and engage with your contacts automatically.
            </p>
            {canAccessAvatar() ? (
              <button className="btn-primary text-sm">
                Setup Avatar
              </button>
            ) : (
              <button 
                onClick={handleUpgrade}
                className="btn-outline text-sm"
              >
                Upgrade to Access
              </button>
            )}
          </div>

          {/* Advanced Analytics */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Advanced Analytics</h4>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Pro
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Get detailed insights into your card performance, engagement metrics, and lead generation.
            </p>
            {canAccessAnalytics() ? (
              <button className="btn-primary text-sm">
                View Analytics
              </button>
            ) : (
              <button 
                onClick={handleUpgrade}
                className="btn-outline text-sm"
              >
                Upgrade to Access
              </button>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'view' ? 'bg-blue-100' :
                  activity.type === 'share' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {activity.type === 'view' && <Eye className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'share' && <Share2 className="w-4 h-4 text-green-600" />}
                  {activity.type === 'lead' && <Users className="w-4 h-4 text-purple-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upgrade to {user?.plan === 'freemium' ? 'Pro' : user?.plan === 'premium' ? 'Business' : 'Enterprise'}
              </h3>
              <p className="text-gray-600">Unlock premium features and grow your network faster</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">AI Avatar Assistant</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Advanced Analytics & Insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">NFC Card Requests</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Priority Support</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowUpgradeModal(false);
                  window.location.href = '/pricing';
                }}
                className="flex-1 btn-primary"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NFC Request Modal */}
      {showNfcRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Request NFC Card</h3>
              <p className="text-gray-600">Get a physical NFC card for instant sharing</p>
            </div>

            {/* Plan-specific information */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Your Plan Benefits</h4>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {getPlanName()}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                {user?.plan === 'freemium' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>1 free NFC card included</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Standard design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <X className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">No custom branding</span>
                    </div>
                  </>
                )}
                {(user?.plan === 'premium' || user?.plan === 'business') && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Multiple NFC cards available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Custom branding options</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Priority shipping</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address *
                </label>
                <textarea
                  value={nfcRequestData.address}
                  onChange={(e) => setNfcRequestData(prev => ({ ...prev, address: e.target.value }))}
                  className="form-input w-full"
                  rows={3}
                  placeholder="Enter your complete shipping address including postal code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Design
                </label>
                <select
                  value={nfcRequestData.design}
                  onChange={(e) => setNfcRequestData(prev => ({ ...prev, design: e.target.value }))}
                  className="form-input w-full"
                >
                  <option value="Standard Design">Standard Design (Free)</option>
                  {user?.plan !== 'freemium' && (
                    <option value="Custom Branded">Custom Branded (+$5)</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <select
                  value={nfcRequestData.quantity || '1'}
                  onChange={(e) => setNfcRequestData(prev => ({ ...prev, quantity: e.target.value }))}
                  className="form-input w-full"
                >
                  <option value="1">1 card</option>
                  {user?.plan !== 'freemium' && (
                    <>
                      <option value="2">2 cards</option>
                      <option value="3">3 cards</option>
                      <option value="5">5 cards</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowNfcRequestModal(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleNfcSubmit}
                disabled={isSubmittingNfc || !nfcRequestData.address.trim()}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingNfc ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Request Card'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 