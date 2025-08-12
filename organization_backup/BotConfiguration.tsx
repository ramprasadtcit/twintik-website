import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Settings, 
  Users, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Zap, 
  BarChart3, 
  Clock, 
  Globe, 
  Shield, 
  Target, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Download, 
  Filter, 
  Search, 
  MoreVertical,
  Eye,
  Save
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface BotTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'greeting' | 'faq' | 'support' | 'sales' | 'custom';
  isActive: boolean;
  usageCount: number;
  lastUpdated: string;
}

interface BotAnalytics {
  totalInteractions: number;
  successfulResponses: number;
  averageResponseTime: number;
  userSatisfaction: number;
  topQuestions: Array<{ question: string; count: number }>;
  dailyInteractions: Array<{ date: string; count: number }>;
  responseAccuracy: number;
  conversationLength: number;
}

const BotConfiguration: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [botStatus, setBotStatus] = useState(true);
  const [botType, setBotType] = useState<'text' | 'avatar'>('text');
  const [trainingMode, setTrainingMode] = useState<'automatic' | 'manual'>('automatic');
  const [responseStyle, setResponseStyle] = useState('professional');
  const [language, setLanguage] = useState('english');
  const [responseLength, setResponseLength] = useState('medium');
  const [autoResponseDelay, setAutoResponseDelay] = useState(2);
  const [dataEncryption, setDataEncryption] = useState(true);
  const [conversationLogging, setConversationLogging] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  // Mock data for templates
  const templates: BotTemplate[] = [
    {
      id: '1',
      name: 'Welcome Message',
      description: 'Friendly greeting for new visitors',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      category: 'greeting',
      isActive: true,
      usageCount: 156,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Product Information',
      description: 'Detailed product specifications and features',
      content: 'Our product offers advanced features including...',
      category: 'sales',
      isActive: true,
      usageCount: 89,
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      name: 'Support Request',
      description: 'Help users submit support tickets',
      content: 'I can help you submit a support request. Please provide...',
      category: 'support',
      isActive: false,
      usageCount: 23,
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      name: 'Pricing Information',
      description: 'Current pricing and plan details',
      content: 'We offer several pricing plans to meet your needs...',
      category: 'faq',
      isActive: true,
      usageCount: 67,
      lastUpdated: '2024-01-12'
    }
  ];

  // Mock analytics data
  const analytics: BotAnalytics = {
    totalInteractions: 1247,
    successfulResponses: 1189,
    averageResponseTime: 2.3,
    userSatisfaction: 4.2,
    topQuestions: [
      { question: 'What are your pricing plans?', count: 45 },
      { question: 'How do I get started?', count: 32 },
      { question: 'What features are included?', count: 28 },
      { question: 'How can I contact support?', count: 22 },
      { question: 'Do you offer custom solutions?', count: 18 }
    ],
    dailyInteractions: [
      { date: '2024-01-15', count: 89 },
      { date: '2024-01-14', count: 76 },
      { date: '2024-01-13', count: 92 },
      { date: '2024-01-12', count: 65 },
      { date: '2024-01-11', count: 78 }
    ],
    responseAccuracy: 95.3,
    conversationLength: 4.2
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Bot Status Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              botStatus ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {/* Power icon was removed from imports, so this will cause an error */}
              {/* <Power className={`w-6 h-6 ${botStatus ? 'text-green-600' : 'text-red-600'}`} /> */}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Bot Status</h3>
              <p className="text-gray-600">
                {botStatus ? 'Your AI assistant is active and ready to help' : 'Bot is currently disabled'}
              </p>
            </div>
          </div>
          <Button
            variant={botStatus ? 'outline' : 'primary'}
            icon={botStatus ? <RotateCcw className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            onClick={() => setBotStatus(!botStatus)}
          >
            {botStatus ? 'Disable Bot' : 'Enable Bot'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{analytics.totalInteractions}</div>
            <div className="text-sm text-gray-600">Total Interactions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{analytics.successfulResponses}</div>
            <div className="text-sm text-gray-600">Successful Responses</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <div className="text-2xl font-bold text-yellow-600">{analytics.averageResponseTime}s</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{analytics.userSatisfaction}/5</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </Card>

      {/* Top Questions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Questions</h3>
        <div className="space-y-3">
          {analytics.topQuestions.map((question, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{question.question}</p>
                  <p className="text-xs text-gray-500">{question.count} times asked</p>
                </div>
              </div>
              <Badge variant="info" size="sm">
                {question.count}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Accuracy</h3>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">{analytics.responseAccuracy}%</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Your bot correctly answers</p>
              <p className="text-lg font-semibold text-gray-900">{analytics.responseAccuracy}% of questions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Length</h3>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">{analytics.conversationLength}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average messages per conversation</p>
              <p className="text-lg font-semibold text-gray-900">{analytics.conversationLength} messages</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6">
      {/* Training Mode Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              trainingMode === 'automatic'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTrainingMode('automatic')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                trainingMode === 'automatic' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {/* Brain icon was removed from imports, so this will cause an error */}
                {/* <Brain className={`w-4 h-4 ${trainingMode === 'automatic' ? 'text-green-600' : 'text-gray-600'}`} /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Automatic Learning</h4>
                <p className="text-sm text-gray-600">Bot learns from conversations automatically</p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              trainingMode === 'manual'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setTrainingMode('manual')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                trainingMode === 'manual' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Settings className={`w-4 h-4 ${trainingMode === 'manual' ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Manual Training</h4>
                <p className="text-sm text-gray-600">You control what the bot learns</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Knowledge Base */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
          <Button icon={<Download className="w-4 h-4" />}>
            Upload Documents
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                {/* FileText icon was removed from imports, so this will cause an error */}
                {/* <FileText className="w-4 h-4 text-blue-600" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Documents</h4>
                <p className="text-sm text-gray-600">PDF, DOC, TXT files</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Uploaded files</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">FAQs</h4>
                <p className="text-sm text-gray-600">Frequently asked questions</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-600">FAQ entries</div>
          </div>

          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                {/* Database icon was removed from imports, so this will cause an error */}
                {/* <Database className="w-4 h-4 text-purple-600" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Training Data</h4>
                <p className="text-sm text-gray-600">Conversation examples</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <div className="text-sm text-gray-600">Training examples</div>
          </div>
        </div>
      </Card>

      {/* Learning Rate */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Rate</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Speed: Medium
            </label>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Higher learning rates may improve responses but could lead to less predictable behavior.
          </p>
        </div>
      </Card>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Template Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Response Templates</h3>
          <p className="text-gray-600">Create and manage response templates for common scenarios</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>
          Add Template
        </Button>
      </div>

      {/* Template Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['All', 'Greeting', 'FAQ', 'Support', 'Sales', 'Custom'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={template.isActive ? 'success' : 'warning'} size="sm">
                  {template.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />}>
                  More
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                "{template.content}"
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>Used {template.usageCount} times</span>
                <span>Updated {template.lastUpdated}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Bot Type */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bot Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              botType === 'text'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setBotType('text')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                botType === 'text' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <MessageCircle className={`w-4 h-4 ${botType === 'text' ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Text Bot</h4>
                <p className="text-sm text-gray-600">Chat-based interactions</p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              botType === 'avatar'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setBotType('avatar')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                botType === 'avatar' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Users className={`w-4 h-4 ${botType === 'avatar' ? 'text-green-600' : 'text-gray-600'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Avatar Bot</h4>
                <p className="text-sm text-gray-600">Visual avatar with voice</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Response Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Style</label>
            <select
              value={responseStyle}
              onChange={(e) => setResponseStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Length</label>
            <select
              value={responseLength}
              onChange={(e) => setResponseLength(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="short">Short (1-2 sentences)</option>
              <option value="medium">Medium (2-3 sentences)</option>
              <option value="long">Long (3+ sentences)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-response Delay: {autoResponseDelay}s
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={autoResponseDelay}
              onChange={(e) => setAutoResponseDelay(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Security & Privacy */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                {/* Lock icon was removed from imports, so this will cause an error */}
                {/* <Lock className="w-4 h-4 text-green-600" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Data Encryption</h4>
                <p className="text-sm text-gray-600">All conversations are encrypted</p>
              </div>
            </div>
            <Button
              variant={dataEncryption ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDataEncryption(!dataEncryption)}
            >
              {dataEncryption ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                {/* Database icon was removed from imports, so this will cause an error */}
                {/* <Database className="w-4 h-4 text-blue-600" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Conversation Logging</h4>
                <p className="text-sm text-gray-600">Store conversation history for training</p>
              </div>
            </div>
            <Button
              variant={conversationLogging ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setConversationLogging(!conversationLogging)}
            >
              {conversationLogging ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                {/* EyeOff icon was removed from imports, so this will cause an error */}
                {/* <EyeOff className="w-4 h-4 text-purple-600" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Anonymous Mode</h4>
                <p className="text-sm text-gray-600">Hide user identity in conversations</p>
              </div>
            </div>
            <Button
              variant={anonymousMode ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setAnonymousMode(!anonymousMode)}
            >
              {anonymousMode ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">Bot Configuration</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" icon={<Eye className="w-4 h-4" />}>
                Preview
              </Button>
              <Button icon={<Save className="w-4 h-4" />}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Bot Configuration</h2>
          <p className="text-gray-600">Advanced AI assistant configuration and training</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'training'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'templates'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'training' && renderTraining()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default BotConfiguration; 