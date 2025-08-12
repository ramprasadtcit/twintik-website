import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bot, 
  Settings, 
  MessageCircle, 
  FileText, 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
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
  Bell, 
  Star, 
  Award,
  User,
  Power
} from 'lucide-react';

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

const BotSettings: React.FC = () => {
  const { user } = useAuth();
  const [botStatus, setBotStatus] = useState(true);
  const [botType, setBotType] = useState<'text' | 'avatar'>('text');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: '1',
      name: 'Company Handbook 2024.pdf',
      size: '1.95 MB',
      uploadDate: '1/15/2024'
    },
    {
      id: '2',
      name: 'Product Catalog.pdf',
      size: '3 MB',
      uploadDate: '1/16/2024'
    },
    {
      id: '3',
      name: 'FAQ Document.pdf',
      size: '2.1 MB',
      uploadDate: '1/17/2024'
    },
    {
      id: '4',
      name: 'Training Manual.pdf',
      size: '4.2 MB',
      uploadDate: '1/18/2024'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        name: files[0].name,
        size: `${(files[0].size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString()
      };
      setUploadedDocuments(prev => [...prev, newDocument]);
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Bot Settings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Org Admin</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bot Settings</h2>
          <p className="text-gray-600">Configure AI assistant for your organization users.</p>
        </div>

        <div className="space-y-8">
          {/* Bot Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Power className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Bot Status</h3>
                </div>
                <p className="text-green-800 mb-4">
                  AI assistant is active and available to your users.
                </p>
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 inline-flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 text-sm font-medium">Bot is Active</span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  Users can interact with the AI assistant. All configuration changes will be applied immediately.
                </p>
              </div>
              <button
                onClick={() => setBotStatus(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Disable Bot</span>
              </button>
            </div>
          </div>

          {/* Bot Type */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bot Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setBotType('text')}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  botType === 'text'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <MessageCircle className={`w-6 h-6 ${botType === 'text' ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`font-medium ${botType === 'text' ? 'text-blue-600' : 'text-gray-900'}`}>
                    Text Chat
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Basic Q&A chatbot based on uploaded documents.
                </p>
              </button>
              <button
                onClick={() => setBotType('avatar')}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  botType === 'avatar'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <User className={`w-6 h-6 ${botType === 'avatar' ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`font-medium ${botType === 'avatar' ? 'text-blue-600' : 'text-gray-900'}`}>
                    Avatar
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Visual AI bot with speaking animation.
                </p>
              </button>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base</h3>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h4>
              <p className="text-gray-600 mb-4">
                Upload PDF files to train your bot. Supported formats: PDF only.
              </p>
              <label className="btn-primary inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span>Select Files</span>
              </label>
            </div>

            {/* Uploaded Documents */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Uploaded Documents ({uploadedDocuments.length})
              </h4>
              <div className="space-y-3">
                {uploadedDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{document.name}</p>
                        <p className="text-xs text-gray-500">
                          {document.size} • Uploaded {document.uploadDate}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDocument(document.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Style
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Formal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Response Length
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Concise</option>
                  <option>Detailed</option>
                  <option>Very Detailed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-Response Delay
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                  <option>Immediate</option>
                  <option>2 seconds</option>
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="btn-primary flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings; 