import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Check, 
  X, 
  AlertCircle, 
  Clock, 
  Star, 
  Building2, 
  TrendingUp, 
  Plus, 
  Download, 
  Eye, 
  EyeOff, 
  Settings, 
  Bell, 
  Shield, 
  Zap, 
  Crown, 
  Activity, 
  Globe, 
  Smartphone, 
  MessageCircle, 
  Target, 
  BarChart3, 
  Users, 
  Award, 
  DollarSign
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
  dueDate: string;
  description: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiry?: string;
  isDefault: boolean;
}

const Billing: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const currentPlan = {
    name: 'Business Plan',
    price: 299,
    billingCycle: 'monthly',
    users: 25,
    features: [
      'Unlimited digital cards',
      'AI twin assistant',
      'Advanced analytics',
      'Team management',
      'Organization branding',
      'Priority support'
    ]
  };

  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      amount: 299,
      status: 'paid',
      date: '2024-01-01',
      dueDate: '2024-01-01',
      description: 'Business Plan - January 2024'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      amount: 299,
      status: 'pending',
      date: '2024-02-01',
      dueDate: '2024-02-01',
      description: 'Business Plan - February 2024'
    },
    {
      id: '3',
      number: 'INV-2023-012',
      amount: 299,
      status: 'paid',
      date: '2023-12-01',
      dueDate: '2023-12-01',
      description: 'Business Plan - December 2023'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiry: '08/26',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'warning';
      default: return 'default';
    }
  };

  const handleAddPaymentMethod = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Adding payment method...');
      setShowAddPaymentModal(false);
    } catch (error) {
      console.error('Failed to add payment method:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradePlan = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Upgrading plan...');
      setShowUpgradeModal(false);
    } catch (error) {
      console.error('Failed to upgrade plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/org')}
              >
                Back to Organization
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="text-gray-600">Manage your subscription, invoices, and payment methods</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="plan" size="lg">
                Business Plan
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Current Plan</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Change Plan
                </Button>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentPlan.name}</h3>
                    <p className="text-gray-600">${currentPlan.price}/month</p>
                    <p className="text-sm text-gray-500">Billed {currentPlan.billingCycle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Next billing</p>
                    <p className="font-semibold text-gray-900">March 1, 2024</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Plan Features</h4>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Usage</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Team Members</span>
                        <span className="text-sm font-medium text-gray-900">18 / {currentPlan.users}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(18 / currentPlan.users) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Digital Cards</span>
                        <span className="text-sm font-medium text-gray-900">Unlimited</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Storage</span>
                        <span className="text-sm font-medium text-gray-900">50GB / 100GB</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: '50%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                <Button
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddPaymentModal(true)}
                >
                  Add Payment Method
                </Button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-600">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <Badge variant="success" size="sm">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" icon={<X className="w-4 h-4" />}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Invoices */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Invoices</h2>
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                  Download All
                </Button>
              </div>

              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{invoice.number}</p>
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                        <p className="text-xs text-gray-500">{invoice.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${invoice.amount}</p>
                        <Badge variant={getStatusColor(invoice.status) as any} size="sm">
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                          View
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Billing Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Plan</span>
                  <span className="font-medium text-gray-900">${currentPlan.price}/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Billing</span>
                  <span className="font-medium text-gray-900">March 1, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total This Year</span>
                  <span className="font-medium text-gray-900">${currentPlan.price * 12}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total Due</span>
                    <span className="text-lg font-bold text-gray-900">${currentPlan.price}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" icon={<Download className="w-4 h-4" />}>
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={<CreditCard className="w-4 h-4" />}>
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={<Users className="w-4 h-4" />}>
                  Manage Team Size
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={<Activity className="w-4 h-4" />}>
                  View Usage
                </Button>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help with any billing questions.
              </p>
              <Button variant="outline" className="w-full" icon={<Activity className="w-4 h-4" />}>
                Contact Support
              </Button>
            </Card>
          </div>
        </div>

        {/* Add Payment Method Modal */}
        {showAddPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Method</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddPaymentModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddPaymentMethod}
                  disabled={isLoading}
                  icon={isLoading ? undefined : <Plus className="w-4 h-4" />}
                >
                  {isLoading ? 'Adding...' : 'Add Payment Method'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Plan Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-gray-200">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Pro Plan</h4>
                    <p className="text-3xl font-bold text-gray-900 mb-2">$99<span className="text-lg text-gray-600">/month</span></p>
                    <p className="text-gray-600 mb-4">Perfect for growing teams</p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li>• Up to 10 team members</li>
                      <li>• AI twin assistant</li>
                      <li>• Advanced analytics</li>
                      <li>• Priority support</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Downgrade to Pro
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-green-500 bg-green-50">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Plan</h4>
                    <p className="text-3xl font-bold text-gray-900 mb-2">$499<span className="text-lg text-gray-600">/month</span></p>
                    <p className="text-gray-600 mb-4">For large organizations</p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li>• Unlimited team members</li>
                      <li>• Custom integrations</li>
                      <li>• Dedicated support</li>
                      <li>• Advanced security</li>
                    </ul>
                    <Button className="w-full" icon={<Zap className="w-4 h-4" />}>
                      Upgrade to Enterprise
                    </Button>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing; 