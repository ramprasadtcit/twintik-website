import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, Share2, Copy, MessageCircle, Mail
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ShareCard: React.FC = () => {
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

  const cardLink = `https://twintik.com/${user?.name?.toLowerCase().replace(/\s+/g, '') || 'demo'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardLink);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name}'s Digital Business Card`,
          text: `Check out ${user?.name}'s digital business card`,
          url: cardLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

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

  return (
    <DashboardLayout 
      title="Share your Card" 
      subtitle="Let others scan your QR code or use your link"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Your QR Code */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your QR Code</h3>
          
          <div className="text-center">
            <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            
            <p className="text-gray-600 mb-4">Point a camera at the QR code to share.</p>
            
            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors mx-auto"
            >
              <Share2 className="w-5 h-5" />
              <span>Share QR Code</span>
            </button>
          </div>
        </div>

        {/* Your TwinTik Link */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your TwinTik Link</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              value={cardLink}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
            
            <div className="flex space-x-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy URL</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Share */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Share</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>Share via Whatsapp</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>Share via SMS</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <Mail className="w-5 h-5" />
              <span>Share via Email</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>Share via Linkedin</span>
            </button>
          </div>
        </div>

        {/* Digital Wallet */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Wallet</h3>
          <p className="text-gray-600 mb-4">Let others scan your QR code or use your link</p>
          
          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <span className="text-lg">🍎</span>
              <span>Apple Wallet</span>
            </button>
            
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <span className="text-lg">📱</span>
              <span>Google Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShareCard;
