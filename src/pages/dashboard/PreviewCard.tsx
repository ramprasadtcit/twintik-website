import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, Share2, Copy, ArrowLeft, Download
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PreviewCard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cardLink = `https://twintik.com/card/${user?.id || 'demo'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      title="Preview Card" 
      subtitle="Preview your digital business card"
    >
      <div className="space-y-6">
        {/* Card Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Card Preview</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/cards')}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cards</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Digital Card Display */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 text-white relative overflow-hidden shadow-2xl max-w-sm">
                {/* Circuit pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-8 right-8 w-1 h-1 bg-purple-300 rounded-full"></div>
                  <div className="absolute top-12 right-12 w-1 h-1 bg-purple-200 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-300 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-400 rounded-full opacity-20"></div>
                </div>
                
                {/* TwinTik Logo */}
                <div className="absolute top-4 right-4 text-white font-bold text-sm">TwinTik</div>
                
                {/* Profile Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-2xl">
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <p className="text-purple-200 text-lg mb-1">{user.jobTitle}</p>
                  <p className="text-xl font-semibold">{user.company}</p>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs">📧</span>
                    </div>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs">📞</span>
                    </div>
                    <span>+971 544123123</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs">🌐</span>
                    </div>
                    <span>techocit.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs">📍</span>
                    </div>
                    <span>Dubai, UAE</span>
                  </div>
                </div>
                
                {/* QR Code */}
                <div className="mt-6 flex justify-center">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-gray-600" />
                  </div>
                </div>
                
                {/* Scan Text */}
                <div className="text-center mt-3">
                  <p className="text-purple-200 text-xs">Scan to connect</p>
                </div>
              </div>
            </div>

            {/* QR Code and Actions */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Scan this QR code to view the digital card
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 w-full max-w-xs">
                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Card</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download QR</span>
                </button>
              </div>

              {/* Card Link */}
              <div className="w-full max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={cardLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-gray-600">Shares</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">7.1%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreviewCard;
