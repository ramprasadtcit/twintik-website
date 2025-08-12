import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Crown, 
  Settings, 
  Edit3, 
  Filter, 
  Search, 
  Plus, 
  XCircle, 
  Clock, 
  Building2, 
  MessageCircle, 
  Upload, 
  ArrowRight, 
  Zap, 
  Activity, 
  Globe, 
  Smartphone, 
  CreditCard, 
  Calendar, 
  FileText, 
  Bell, 
  Star, 
  Award
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  cardViews: number;
  leads: number;
  avatar?: string;
}

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  status: 'active' | 'inactive';
  lastActive: string;
}

interface NfcRequest {
  id: string;
  userId: string;
  userName: string;
  address: string;
  design: string;
  quantity: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  requestedAt: string;
}

interface ViewerLog {
  id: string;
  userId: string;
  userName: string;
  viewerName: string;
  viewerEmail: string;
  action: 'view' | 'share' | 'contact' | 'download';
  timestamp: string;
  source: 'qr' | 'nfc' | 'link' | 'search';
}

const OrganizationDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app this would come from API
  const organizationStats = {
    totalUsers: 24,
    activeUsers: 18,
    totalViews: 1247,
    totalLeads: 89,
    conversionRate: 7.1,
    avgEngagement: 4.2
  };

  const organizationUsers: OrganizationUser[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'admin',
      status: 'active',
      lastActive: '2 hours ago',
      cardViews: 156,
      leads: 12,
      avatar: undefined
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@company.com',
      role: 'user',
      status: 'active',
      lastActive: '1 day ago',
      cardViews: 89,
      leads: 7,
      avatar: undefined
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@company.com',
      role: 'user',
      status: 'active',
      lastActive: '3 hours ago',
      cardViews: 234,
      leads: 18,
      avatar: undefined
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david@company.com',
      role: 'viewer',
      status: 'inactive',
      lastActive: '1 week ago',
      cardViews: 45,
      leads: 2,
      avatar: undefined
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      role: 'user',
      status: 'pending',
      lastActive: 'Never',
      cardViews: 0,
      leads: 0,
      avatar: undefined
    },
    {
      id: '6',
      name: 'Alex Thompson',
      email: 'alex@company.com',
      role: 'user',
      status: 'active',
      lastActive: '5 hours ago',
      cardViews: 123,
      leads: 9,
      avatar: undefined
    }
  ];

  const subAdmins: SubAdmin[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      permissions: ['user_management', 'analytics', 'settings'],
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@company.com',
      permissions: ['user_management', 'analytics'],
      status: 'active',
      lastActive: '1 day ago'
    }
  ];

  const nfcRequests: NfcRequest[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      address: '123 Main St, New York, NY 10001',
      design: 'Custom Branded',
      quantity: 2,
      status: 'pending',
      requestedAt: '2024-01-15'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Michael Chen',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      design: 'Standard Design',
      quantity: 1,
      status: 'approved',
      requestedAt: '2024-01-14'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Rodriguez',
      address: '789 Pine St, Chicago, IL 60601',
      design: 'Custom Branded',
      quantity: 3,
      status: 'shipped',
      requestedAt: '2024-01-13'
    }
  ];

  const viewerLogs: ViewerLog[] = [
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      viewerName: 'John Smith',
      viewerEmail: 'john@example.com',
      action: 'view',
      timestamp: '2024-01-15 14:30',
      source: 'qr'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Michael Chen',
      viewerName: 'Jane Doe',
      viewerEmail: 'jane@example.com',
      action: 'contact',
      timestamp: '2024-01-15 13:45',
      source: 'nfc'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Rodriguez',
      viewerName: 'Bob Wilson',
      viewerEmail: 'bob@example.com',
      action: 'share',
      timestamp: '2024-01-15 12:20',
      source: 'link'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'error';
      case 'approved': return 'success';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      default: return 'info';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'user': return 'blue';
      case 'viewer': return 'gray';
      default: return 'gray';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{organizationStats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
          <div className="text-xs text-blue-600 mt-2">+3 this month</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{organizationStats.totalViews}</div>
          <div className="text-sm text-gray-600">Total Views</div>
          <div className="text-xs text-green-600 mt-2">+12% this week</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{organizationStats.totalLeads}</div>
          <div className="text-sm text-gray-600">Leads Generated</div>
          <div className="text-xs text-purple-600 mt-2">+8% this week</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">{organizationStats.conversionRate}%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
          <div className="text-xs text-yellow-600 mt-2">+2.1% this month</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setActiveSection('users')}
            className="w-full justify-start"
          >
            Add User
          </Button>
          <Button
            variant="outline"
            icon={<Brain className="w-4 h-4" />}
            onClick={() => navigate('/org/bot-configuration')}
            className="w-full justify-start"
          >
            Configure AI
          </Button>
          <Button
            variant="outline"
            icon={<BarChart3 className="w-4 h-4" />}
            onClick={() => setActiveSection('analytics')}
            className="w-full justify-start"
          >
            View Analytics
          </Button>
          <Button
            variant="outline"
            icon={<Settings className="w-4 h-4" />}
            onClick={() => navigate('/org/customization')}
            className="w-full justify-start"
          >
            Brand Settings
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {viewerLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {log.viewerName} viewed {log.userName}'s card
                </p>
                <p className="text-xs text-gray-500">{log.timestamp}</p>
              </div>
              <Badge variant="info" size="sm">
                {log.source.toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Team Members</h3>
          <p className="text-gray-600">Manage your organization's users and their permissions</p>
        </div>
        <Button
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => console.log('Add user')}
        >
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizationUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getRoleColor(user.role) as any} size="sm">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusColor(user.status) as any} size="sm">
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{user.cardViews} views</div>
                      <div className="text-gray-500">{user.leads} leads</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                        View
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />}>
                        More
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderSubAdmins = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Sub-Admins</h3>
          <p className="text-gray-600">Manage administrative permissions for your team</p>
        </div>
        <Button
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => console.log('Add sub-admin')}
        >
          Add Sub-Admin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subAdmins.map((admin) => (
          <Card key={admin.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{admin.name}</h4>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
              </div>
              <Badge variant={getStatusColor(admin.status) as any} size="sm">
                {admin.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Permissions</h5>
                <div className="flex flex-wrap gap-2">
                  {admin.permissions.map((permission) => (
                    <Badge key={permission} variant="info" size="sm">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Last active: {admin.lastActive}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNfcRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">NFC Card Requests</h3>
          <p className="text-gray-600">Track and manage physical NFC card requests</p>
        </div>
        <Button
          icon={<Download className="w-4 h-4" />}
          onClick={() => console.log('Export requests')}
        >
          Export
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Design
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {nfcRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                    <div className="text-sm text-gray-500">{request.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.design}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusColor(request.status) as any} size="sm">
                      {request.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.requestedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                        View
                      </Button>
                      {request.status === 'pending' && (
                        <Button variant="ghost" size="sm" icon={<CheckCircle className="w-4 h-4" />}>
                          Approve
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderViewerLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Viewer Logs</h3>
          <p className="text-gray-600">Track who viewed your team's digital cards</p>
        </div>
        <Button
          icon={<Download className="w-4 h-4" />}
          onClick={() => console.log('Export logs')}
        >
          Export
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Card Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Viewer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewerLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.viewerName}</div>
                    <div className="text-sm text-gray-500">{log.viewerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" size="sm">
                      {log.action}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" size="sm">
                      {log.source.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
              <p className="text-gray-600">Manage your team, track performance, and configure settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="plan" size="lg">
                Business Plan
              </Badge>
              <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveSection('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('/org/users')}
              className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Users
            </button>
            <button
              onClick={() => navigate('/org/leads')}
              className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Leads
            </button>
            <button
              onClick={() => navigate('/org/billing')}
              className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Billing
            </button>
            <button
              onClick={() => navigate('/org/customization')}
              className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Branding
            </button>
            <button
              onClick={() => navigate('/org/bot-configuration')}
              className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              AI Bot
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'users' && renderUsers()}
        {activeSection === 'sub-admins' && renderSubAdmins()}
        {activeSection === 'nfc-requests' && renderNfcRequests()}
        {activeSection === 'viewer-logs' && renderViewerLogs()}
      </div>
    </div>
  );
};

export default OrganizationDashboard; 