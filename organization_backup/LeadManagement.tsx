import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Phone, 
  Mail, 
  Building, 
  Globe, 
  Smartphone, 
  CreditCard, 
  MessageCircle, 
  Calendar, 
  FileText, 
  MoreVertical
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'qr' | 'nfc' | 'link' | 'wallet' | 'social';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assignedTo?: string;
  cardOwner: string;
  timestamp: string;
  location?: string;
  notes?: string;
  value?: number;
  lastContact?: string;
}

const LeadManagement: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp',
      source: 'qr',
      status: 'new',
      assignedTo: 'Sarah Johnson',
      cardOwner: 'Sarah Johnson',
      timestamp: '2024-01-15 14:30',
      location: 'New York, NY',
      value: 50000,
      notes: 'Interested in enterprise solutions'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@innovate.com',
      phone: '+1 (555) 234-5678',
      company: 'Innovate Inc',
      source: 'nfc',
      status: 'contacted',
      assignedTo: 'Michael Chen',
      cardOwner: 'Michael Chen',
      timestamp: '2024-01-14 16:45',
      location: 'San Francisco, CA',
      value: 75000,
      lastContact: '2024-01-16 10:00',
      notes: 'Follow up scheduled for next week'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@startup.com',
      company: 'StartupXYZ',
      source: 'link',
      status: 'qualified',
      assignedTo: 'Emily Rodriguez',
      cardOwner: 'Emily Rodriguez',
      timestamp: '2024-01-13 09:15',
      location: 'Austin, TX',
      value: 25000,
      lastContact: '2024-01-15 14:00',
      notes: 'Ready for proposal'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice.brown@enterprise.com',
      phone: '+1 (555) 456-7890',
      company: 'Enterprise Solutions',
      source: 'social',
      status: 'converted',
      assignedTo: 'Sarah Johnson',
      cardOwner: 'Sarah Johnson',
      timestamp: '2024-01-12 11:20',
      location: 'Chicago, IL',
      value: 100000,
      lastContact: '2024-01-14 15:30',
      notes: 'Contract signed, implementation starting'
    },
    {
      id: '5',
      name: 'Charlie Davis',
      email: 'charlie.davis@smallbiz.com',
      company: 'Small Business Co',
      source: 'wallet',
      status: 'lost',
      assignedTo: 'Michael Chen',
      cardOwner: 'Michael Chen',
      timestamp: '2024-01-11 13:45',
      location: 'Miami, FL',
      value: 15000,
      lastContact: '2024-01-13 16:00',
      notes: 'Budget constraints, will revisit in Q2'
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || lead.source === selectedFilter;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'warning';
      case 'qualified': return 'plan';
      case 'converted': return 'success';
      case 'lost': return 'warning';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'qr': return <CreditCard className="w-4 h-4" />;
      case 'nfc': return <Smartphone className="w-4 h-4" />;
      case 'link': return <Globe className="w-4 h-4" />;
      case 'wallet': return <Building className="w-4 h-4" />;
      case 'social': return <MessageCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0);
  const convertedValue = leads.filter(lead => lead.status === 'converted').reduce((sum, lead) => sum + (lead.value || 0), 0);
  const conversionRate = leads.length > 0 ? (leads.filter(lead => lead.status === 'converted').length / leads.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<Users className="w-4 h-4" />}
                onClick={() => navigate('/org')}
              >
                Back to Organization
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
                <p className="text-gray-600">Track and manage leads from your team's digital cards</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="plan" size="lg">
                Business Plan
              </Badge>
              <Button icon={<Plus className="w-4 h-4" />}>
                Add New Lead
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Converted Value</p>
                <p className="text-2xl font-bold text-gray-900">${convertedValue.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15.2% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +2.1% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Sources</option>
                <option value="qr">QR Code</option>
                <option value="nfc">NFC Tap</option>
                <option value="link">Direct Link</option>
                <option value="wallet">Wallet</option>
                <option value="social">Social Media</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" icon={<Mail className="w-4 h-4" />}>
                Bulk Email
              </Button>
              <Button variant="outline" size="sm" icon={<FileText className="w-4 h-4" />}>
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Lead</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Source</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        {lead.company && (
                          <p className="text-xs text-gray-500">{lead.company}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getSourceIcon(lead.source)}
                        </div>
                        <span className="text-sm text-gray-900 capitalize">{lead.source}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(lead.status) as any} size="sm">
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">
                        ${lead.value?.toLocaleString() || '0'}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {lead.assignedTo?.charAt(0) || 'U'}
                        </div>
                        <span className="text-sm text-gray-900">{lead.assignedTo || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{lead.timestamp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Users className="w-4 h-4" />}
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowLeadModal(true);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit className="w-4 h-4" />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<MoreVertical className="w-4 h-4" />}
                        >
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

        {/* Lead Details Modal */}
        {showLeadModal && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Lead Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<X className="w-4 h-4" />}
                  onClick={() => setShowLeadModal(false)}
                >
                  Close
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedLead.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Company</label>
                      <p className="text-gray-900">{selectedLead.company || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="text-gray-900">{selectedLead.location || 'Unknown'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Lead Information</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Lead Value</p>
                        <p className="text-2xl font-bold text-gray-900">${selectedLead.value?.toLocaleString() || '0'}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge variant={getStatusColor(selectedLead.status) as any} size="sm">
                          {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Source</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getSourceIcon(selectedLead.source)}
                        <span className="text-gray-900 capitalize">{selectedLead.source}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Card Owner</label>
                      <p className="text-gray-900">{selectedLead.cardOwner}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assigned To</label>
                      <p className="text-gray-900">{selectedLead.assignedTo || 'Unassigned'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Created</label>
                      <p className="text-gray-900">{selectedLead.timestamp}</p>
                    </div>
                    {selectedLead.lastContact && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Last Contact</label>
                        <p className="text-gray-900">{selectedLead.lastContact}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedLead.notes && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.notes}</p>
                </div>
              )}

              <div className="flex space-x-3 mt-6 pt-6 border-t">
                <Button variant="outline" icon={<Mail className="w-4 h-4" />}>
                  Send Email
                </Button>
                <Button variant="outline" icon={<Phone className="w-4 h-4" />}>
                  Call Lead
                </Button>
                <Button variant="outline" icon={<Edit className="w-4 h-4" />}>
                  Edit Lead
                </Button>
                <Button
                  variant="outline"
                  icon={<Trash2 className="w-4 h-4" />}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Delete Lead
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadManagement; 