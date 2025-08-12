import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  onBack,
  showLogo = false,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      {/* Status Bar Placeholder */}
      <div className="h-6 bg-white"></div>
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {showLogo && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TwinTik</span>
              </div>
            )}
          </div>
          
          {/* Status Bar Icons */}
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
              <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Title and Subtitle */}
        {title && (
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
