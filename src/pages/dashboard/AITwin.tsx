import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Camera, Upload, Zap, BookOpen, User, HelpCircle
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const AITwin: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [avatarEnabled, setAvatarEnabled] = useState(false);
  const [avatarPhoto, setAvatarPhoto] = useState<File | null>(null);
  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([]);
  const [aboutServices, setAboutServices] = useState('');
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPhoto(file);
    }
  };

  const handleKnowledgeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setKnowledgeFiles(prev => [...prev, ...files]);
  };

  const addFaq = () => {
    setFaqs(prev => [...prev, { question: '', answer: '' }]);
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqs(prev => prev.map((faq, i) => 
      i === index ? { ...faq, [field]: value } : faq
    ));
  };

  const removeFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
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
      title="AI Avatar" 
      subtitle="Create an intelligent assistant for your Twintik profile"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Avatar Status Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Avatar Status</h3>
                <p className="text-sm text-gray-600">
                  {avatarEnabled ? 'Currently Enabled' : 'Currently Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAvatarEnabled(!avatarEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                avatarEnabled ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  avatarEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Avatar Photo & Review Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Camera className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Avatar Photo & Review</h3>
          </div>
          
          <div className="text-center mb-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              {avatarPhoto ? (
                <img 
                  src={URL.createObjectURL(avatarPhoto)} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            
            <label className="inline-block px-4 py-2 border border-green-600 text-green-600 rounded-lg cursor-pointer hover:bg-green-50 transition-colors">
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
            
            {avatarPhoto && (
              <p className="text-sm text-gray-600 mt-2">{avatarPhoto.name}</p>
            )}
            
            <button className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Upload Avatar
            </button>
            
            <p className="text-sm text-gray-600 mt-2">
              Upload a clear photo for your AI avatar
            </p>
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Knowledge Base</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Upload documents to enhance your avatar's knowledge
          </p>
          
          <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition-colors">
            <Upload className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-green-600 font-medium">Click to upload knowledge base files</span>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".txt,.pdf,.doc,.docx,.md"
              onChange={handleKnowledgeUpload}
            />
          </label>
          
          <p className="text-sm text-gray-600 mt-2">
            Supports TXT, PDF, DOC, DOCX, MD files you can select multiple files
          </p>
          
          {knowledgeFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {knowledgeFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => setKnowledgeFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* About & Services Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">About & Services</h3>
          </div>
          
          <textarea
            value={aboutServices}
            onChange={(e) => setAboutServices(e.target.value)}
            placeholder="Describe your services, experience, expertise and what you can help visitors with."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <HelpCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">FAQ</h3>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                  placeholder="Question 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                  placeholder="Answer"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                {faqs.length > 1 && (
                  <button
                    onClick={() => removeFaq(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove FAQ
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            onClick={addFaq}
            className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            + Add Another FAQ
          </button>
        </div>

        {/* Avatar Actions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Avatar Actions</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Train your avatar and test its responses to ensure it provides accurate information about your services
          </p>
          
          <div className="flex space-x-4 mb-4">
            <button className="flex-1 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
              Test Avatar Chat
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Train Avatar
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Tip:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Train your avatar after adding knowledge base files or updating your services information</li>
              <li>• Training helps your avatar provide accurate responses.</li>
              <li>• Test the avatar to ensure it understands your business.</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AITwin; 