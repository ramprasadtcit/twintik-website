import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Crown, 
  Settings, 
  Edit3, 
  ArrowRight, 
  Check, 
  X, 
  Brain, 
  Smartphone, 
  QrCode, 
  Shield, 
  MessageCircle, 
  Calendar, 
  FileText, 
  Star, 
  Sparkles
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  cardCreated: boolean;
  jobTitle?: string;
  department?: string;
  joinedDate?: string;
  lastActive?: string;
}

const B2BSubscription: React.FC = () => {
  const { user, upgradePlan } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    jobTitle: '',
    department: ''
  });

  // Mock team data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      role: 'admin',
      status: 'active',
      cardCreated: true,
      jobTitle: 'CEO',
      department: 'Executive',
      joinedDate: '2024-01-15',
      lastActive: '2024-08-05'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'editor',
      status: 'active',
      cardCreated: true,
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      joinedDate: '2024-02-20',
      lastActive: '2024-08-04'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'viewer',
      status: 'pending',
      cardCreated: false,
      jobTitle: 'Sales Representative',
      department: 'Sales',
      joinedDate: '2024-07-30',
      lastActive: '2024-08-01'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'editor',
      status: 'active',
      cardCreated: true,
      jobTitle: 'Product Manager',
      department: 'Product',
      joinedDate: '2024-03-10',
      lastActive: '2024-08-05'
    }
  ];

  const companyStats = {
    totalMembers: 12,
    activeCards: 8,
    totalViews: 1247,
    totalLeads: 89,
    monthlyGrowth: 23
  };

  const handleInviteMember = async () => {
    if (!inviteData.email.trim()) {
      alert('Please enter an email address');
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowInviteModal(false);
    setInviteData({ email: '', role: 'viewer', jobTitle: '', department: '' });
    alert('Invitation sent successfully!');
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'team', label: 'Team Management', icon: <Users className="w-5 h-5" /> },
    { id: 'cards', label: 'Digital Cards', icon: <QrCode className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to {user?.company || 'Your Company'}
          </h2>
          <p className="text-gray-600">
            Manage your team's digital business cards and track performance.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Team Members</p>
                      <p className="text-2xl font-bold text-gray-900">{companyStats.totalMembers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Cards</p>
                      <p className="text-2xl font-bold text-gray-900">{companyStats.activeCards}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">{companyStats.totalViews}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Leads Generated</p>
                      <p className="text-2xl font-bold text-gray-900">{companyStats.totalLeads}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Invite Team Member</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cards')}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <QrCode className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">Create Digital Card</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">View Analytics</span>
                  </button>
                </div>
              </div>

              {/* Organization Details */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Company Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company Name:</span>
                        <span className="font-medium">{user?.company || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company Size:</span>
                        <span className="font-medium">{user?.companySize || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Organization ID:</span>
                        <span className="font-medium text-sm">{user?.organizationId || 'Not assigned'}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Your Role</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job Title:</span>
                        <span className="font-medium">{user?.jobTitle || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">{user?.department || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role:</span>
                        <span className="font-medium capitalize">{user?.role || 'member'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'team' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="btn-primary text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Job Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Card</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-gray-600">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{member.name}</span>
                              <p className="text-xs text-gray-500">Joined {member.joinedDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{member.email}</td>
                        <td className="py-4 px-4 text-gray-600">{member.jobTitle || '-'}</td>
                        <td className="py-4 px-4 text-gray-600">{member.department || '-'}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            member.role === 'admin' ? 'bg-red-100 text-red-800' :
                            member.role === 'editor' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            member.status === 'active' ? 'bg-green-100 text-green-800' :
                            member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {member.cardCreated ? (
                            <div className="flex items-center space-x-1">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-gray-500">Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <X className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">Pending</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800" title="Edit member">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800" title="Remove member">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Digital Cards</h3>
              <p className="text-gray-600">Card management features coming soon...</p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics</h3>
              <p className="text-gray-600">Advanced analytics features coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
              <p className="text-gray-600">Company settings and preferences coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Invite Team Member</h3>
              <p className="text-gray-600">Send an invitation to join your team</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input w-full"
                  placeholder="colleague@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={inviteData.jobTitle}
                  onChange={(e) => setInviteData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="form-input w-full"
                  placeholder="e.g., Sales Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={inviteData.department}
                  onChange={(e) => setInviteData(prev => ({ ...prev, department: e.target.value }))}
                  className="form-input w-full"
                  placeholder="e.g., Sales, Marketing, IT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData(prev => ({ ...prev, role: e.target.value as any }))}
                  className="form-input w-full"
                >
                  <option value="viewer">Viewer - Can view team analytics</option>
                  <option value="editor">Editor - Can manage team members</option>
                  <option value="admin">Admin - Full access to all features</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                className="flex-1 btn-primary"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
              <p className="text-gray-600">Unlock enterprise features for your team</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">AI Avatar Assistant for all team members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Pre-linked NFC cards with company branding</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">CRM integration (Salesforce, HubSpot, Zoho)</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Priority support & onboarding assistance</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button className="flex-1 btn-primary">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2BSubscription; 