import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Type, 
  Settings, 
  Check, 
  X, 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  Globe, 
  Shield, 
  Target, 
  Sparkles, 
  Zap, 
  Crown, 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar, 
  FileText, 
  Bell, 
  Star, 
  Award
} from 'lucide-react';

const OrganizationCustomization: React.FC = () => {
  const { user } = useAuth();
  const [selectedPreset, setSelectedPreset] = useState('blue');
  const [customColors, setCustomColors] = useState({
    primary: '#3B82F6',
    accent: '#108981',
    background: '#F8FAFC'
  });
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [userPermissions, setUserPermissions] = useState({
    profileCustomization: true,
    logoUpload: true,
    colorChanges: true
  });

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', accent: '#1E40AF' },
    { name: 'Purple', primary: '#8B5CF6', accent: '#6D28D9' },
    { name: 'Green', primary: '#10B981', accent: '#059669' },
    { name: 'Red', primary: '#EF4444', accent: '#DC2626' },
    { name: 'Orange', primary: '#F97316', accent: '#EA580C' },
    { name: 'Teal', primary: '#14B8A6', accent: '#0D9488' }
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Montserrat'
  ];

  const handlePresetChange = (preset: any) => {
    setSelectedPreset(preset.name.toLowerCase());
    setCustomColors({
      primary: preset.primary,
      accent: preset.accent,
      background: '#F8FAFC'
    });
  };

  const handleColorChange = (type: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const togglePermission = (permission: string) => {
    setUserPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Customization</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-outline flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Edit Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Customization</h2>
          <p className="text-gray-600">Manage your organization's branding and theme settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Organization Logo */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Logo</h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Logo</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        Upload your organization logo. Recommended size: 200x100px, PNG or JPG.
                      </p>
                      <button className="btn-outline flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Logo</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Users can upload</span>
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Color Scheme</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Users can customize</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Presets</h4>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetChange(preset)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedPreset === preset.name.toLowerCase()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex space-x-1 mb-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Colors</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: customColors.primary }}
                      />
                      <input
                        type="text"
                        value={customColors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: customColors.accent }}
                      />
                      <input
                        type="text"
                        value={customColors.accent}
                        onChange={(e) => handleColorChange('accent', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: customColors.background }}
                      />
                      <input
                        type="text"
                        value={customColors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Family
                </label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold" style={{ fontFamily: selectedFont }}>
                      Heading Text
                    </h1>
                    <h2 className="text-lg font-medium" style={{ fontFamily: selectedFont }}>
                      Subheading Text
                    </h2>
                    <p className="text-sm" style={{ fontFamily: selectedFont }}>
                      Body text with the selected font family.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Permissions */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Permissions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Profile Customization</h4>
                    <p className="text-xs text-gray-600">Users can edit their profile cards</p>
                  </div>
                  <button
                    onClick={() => togglePermission('profileCustomization')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      userPermissions.profileCustomization ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      userPermissions.profileCustomization ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Logo Upload</h4>
                    <p className="text-xs text-gray-600">Users can upload custom logos</p>
                  </div>
                  <button
                    onClick={() => togglePermission('logoUpload')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      userPermissions.logoUpload ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      userPermissions.logoUpload ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Color Changes</h4>
                    <p className="text-xs text-gray-600">Users can customize colors</p>
                  </div>
                  <button
                    onClick={() => togglePermission('colorChanges')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      userPermissions.colorChanges ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      userPermissions.colorChanges ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    When 'Allow user profile customization' is disabled, users cannot update their profile card details. This ensures brand consistency across your organization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCustomization; 