import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, Palette, Upload, Trash2, Check, User, Mail, Phone
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const CustomizeCard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  // Card customization state
  const [cardDesign, setCardDesign] = useState({
    themeColor: 'sky',
    backgroundType: 'solid',
    hasBackgroundImage: false,
    hasCompanyLogo: true
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const themeColors = [
    { name: 'Purple', value: 'purple', color: '#8b5cf6' },
    { name: 'Cyan', value: 'cyan', color: '#06b6d4' },
    { name: 'Blue', value: 'blue', color: '#3b82f6' },
    { name: 'Pink', value: 'pink', color: '#ec4899' },
    { name: 'Emerald', value: 'emerald', color: '#10b981' },
    { name: 'Orange', value: 'orange', color: '#f97316' },
    { name: 'Sky', value: 'sky', color: '#0ea5e9', selected: true },
    { name: 'Red', value: 'red', color: '#ef4444' },
    { name: 'Amber', value: 'amber', color: '#f59e0b' },
    { name: 'Violet', value: 'violet', color: '#7c3aed' },
    { name: 'Green', value: 'green', color: '#22c55e' },
    { name: 'Indigo', value: 'indigo', color: '#6366f1' }
  ];

  const handleSaveDesign = () => {
    // Save card design
    console.log('Saving card design:', cardDesign);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
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
      title="Customize Card" 
      subtitle="Personalize the look and feel of your TwinTik profile"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Live Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          </div>
          
          {/* Card Preview */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
            {/* Circuit pattern background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-cyan-300 rounded-full"></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-cyan-200 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-1 h-1 bg-cyan-300 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-300 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-200 rounded-full"></div>
            </div>
            
            {/* GTX 1080 Text */}
            <div className="absolute top-4 left-4 text-yellow-400 font-bold text-sm">GTX 1080</div>
            
            {/* Twintik Logo */}
            <div className="absolute top-4 right-4 text-white font-bold text-sm">Twintik</div>
            
            {/* Profile Info */}
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <h2 className="text-xl font-bold">{user.name || 'John'}</h2>
              <p className="text-gray-300">{user.jobTitle || 'Project Manager'}</p>
              <p className="text-lg font-semibold">{user.company || 'TechoCIT Software Solutions'}</p>
            </div>
            
            {/* Contact Info */}
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{user.email || 'john@technocit.com'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{user.phone || '+971 544123123'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Color Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Theme Color</h3>
          </div>
          
          <p className="text-gray-600 mb-4">Choose a color that represents your brand</p>
          
          <div className="grid grid-cols-4 gap-4">
            {themeColors.map((color) => (
              <div key={color.value} className="text-center">
                <button
                  onClick={() => setCardDesign({...cardDesign, themeColor: color.value})}
                  className={`w-16 h-16 rounded-lg border-2 mx-auto mb-2 relative ${
                    cardDesign.themeColor === color.value ? 'border-gray-900' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                >
                  {cardDesign.themeColor === color.value && (
                    <Check className="w-5 h-5 text-white absolute inset-0 m-auto" />
                  )}
                </button>
                <span className="text-sm text-gray-700">{color.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Background</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="backgroundType"
                  value="solid"
                  checked={cardDesign.backgroundType === 'solid'}
                  onChange={() => setCardDesign({...cardDesign, backgroundType: 'solid'})}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-900">Solid Color</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="backgroundType"
                  value="image"
                  checked={cardDesign.backgroundType === 'image'}
                  onChange={() => setCardDesign({...cardDesign, backgroundType: 'image'})}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-900">Image</span>
              </label>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Background Image</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Remove Background Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Logo Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-green-600 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
          </div>
          
          {/* Current Logo Display */}
          <div className="mb-4">
            <div className="text-blue-600 font-bold text-lg">Twintik</div>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Logo</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Remove Logo</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            Allowed formats: PNG, JPG, JPEG. Max size: 5MB. Recommended size: 200x200px.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDesign}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomizeCard;
