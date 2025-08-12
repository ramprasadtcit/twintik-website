import React from 'react';
import { QrCode, Smartphone, MessageCircle, Share2, Download } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface DigitalCardProps {
  user: {
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    website?: string;
    bio?: string;
    avatar?: string;
    logo?: string;
  };
  theme?: 'default' | 'modern' | 'minimal' | 'gradient';
  showActions?: boolean;
  onShare?: () => void;
  onEdit?: () => void;
}

const DigitalCard: React.FC<DigitalCardProps> = ({
  user,
  theme = 'default',
  showActions = true,
  onShare,
  onEdit
}) => {
  const themes = {
    default: 'bg-gradient-to-br from-green-500 to-blue-600',
    modern: 'bg-gradient-to-br from-purple-500 to-pink-600',
    minimal: 'bg-white border-2 border-gray-200',
    gradient: 'bg-gradient-to-br from-green-500 via-blue-500 to-purple-600'
  };

  const isDarkTheme = theme !== 'minimal';

  return (
    <Card variant="elevated" className="max-w-sm mx-auto overflow-hidden">
      <div className={`${themes[theme]} p-6 text-center relative`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>

        {/* Avatar */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/30">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>
                {user.name.charAt(0)}
              </span>
            )}
          </div>

          {/* User Info */}
          <h3 className={`text-xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {user.name}
          </h3>
          <p className={`text-sm mb-2 ${isDarkTheme ? 'text-green-100' : 'text-gray-600'}`}>
            {user.title}
          </p>
          <p className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>
            {user.company}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6 bg-white">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold">📧</span>
            </div>
            <span className="text-gray-700">{user.email}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold">📱</span>
            </div>
            <span className="text-gray-700">{user.phone}</span>
          </div>

          {user.website && (
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">🌐</span>
              </div>
              <span className="text-gray-700">{user.website}</span>
            </div>
          )}
        </div>

        {user.bio && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{user.bio}</p>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<QrCode className="w-4 h-4" />}
                className="w-full"
                onClick={onShare}
              >
                QR
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Smartphone className="w-4 h-4" />}
                className="w-full"
                onClick={onShare}
              >
                NFC
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full"
                onClick={onShare}
              >
                Chat
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
                className="flex-1"
                onClick={onShare}
              >
                Share
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={onEdit}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DigitalCard; 