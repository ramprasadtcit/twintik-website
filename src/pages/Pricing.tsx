import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Check, 
  Crown, 
  Users, 
  Brain, 
  BarChart3, 
  Smartphone,
  QrCode,
  Shield,
  Zap,
  MessageCircle,
  Calendar,
  FileText,
  ArrowRight,
  Building,
  Star,
  Sparkles,
  User,
  Building2
} from 'lucide-react';

const Pricing: React.FC = () => {
  const { user, upgradePlan } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'b2c' | 'b2b'>('b2c');
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'business' | 'enterprise' | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const b2cPlans = [
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'Free Forever',
      price: 'Free',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      features: [
        'Digital business card',
        'QR code sharing',
        'Basic profile customization',
        'Mobile wallet integration',
        'Direct link sharing',
        'Basic analytics (10 views/month)'
      ],
      limitations: [
        'No AI Avatar',
        'Limited analytics',
        'No NFC cards',
        'No CRM integration'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'primary' as const,
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      id: 'pro',
      name: 'Pro',
      subtitle: 'For Professionals',
      price: '$9.99',
      period: 'per month',
      description: 'Perfect for professionals and freelancers',
      features: [
        'Everything in Starter',
        'AI Avatar Assistant',
        'Advanced analytics & insights',
        'NFC card request (1 free)',
        'Custom branding',
        'Priority email support',
        'Unlimited views & shares',
        'Lead tracking'
      ],
      limitations: [
        'No team management',
        'No CRM integration',
        'Limited NFC cards'
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'primary' as const,
      popular: true,
      cta: 'Start 14-Day Free Trial'
    }
  ];

  const b2bPlans = [
    {
      id: 'business',
      name: 'Business',
      subtitle: 'Teams & SMBs',
      price: '$29',
      period: 'per month',
      description: 'Perfect for growing teams and small businesses',
      features: [
        'Everything in Pro',
        'Team management (up to 10 members)',
        'Admin dashboard',
        'Team-branded templates',
        'Bulk user onboarding',
        'Permission levels (Admin, Editor, Viewer)',
        'Advanced team analytics',
        'Standard email support',
        'NFC cards for team (5 free)'
      ],
      limitations: [
        'No CRM integration',
        'Limited team size',
        'No custom branded NFC cards'
      ],
      buttonText: 'Start Business Trial',
      buttonVariant: 'primary' as const,
      popular: true,
      cta: 'Start 14-Day Free Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'Large Organizations',
      price: '$99',
      period: 'per month',
      description: 'Advanced features for large organizations',
      features: [
        'Everything in Business',
        'Unlimited team members',
        'CRM integration (Salesforce, HubSpot, Zoho)',
        'Pre-linked NFC cards with company branding',
        'Advanced card customization',
        'Priority support & onboarding',
        'API access & webhooks',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline' as const,
      popular: false,
      cta: 'Contact Sales Team'
    }
  ];

  const handleUpgrade = async (plan: 'starter' | 'pro' | 'business' | 'enterprise') => {
    setSelectedPlan(plan);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = async () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    try {
      if (selectedPlan === 'pro') {
        await upgradePlan('premium');
      } else if (selectedPlan === 'business') {
        await upgradePlan('business');
      } else if (selectedPlan === 'enterprise') {
        await upgradePlan('premium');
      }
      setShowUpgradeModal(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentPlan = () => {
    const allPlans = [...b2cPlans, ...b2bPlans];
    return allPlans.find(plan => plan.id === user?.plan) || b2cPlans[0];
  };

  const handlePlanAction = (plan: any) => {
    if (plan.id === 'starter') {
      // For B2C starter plan, go to regular signup
      navigate('/signup');
    } else if (plan.id === 'business') {
      // For B2B business plan, go to B2B signup
      navigate('/signup?type=b2b');
    } else if (plan.id === 'enterprise') {
      // Open contact form or redirect to contact page
      window.open('mailto:sales@twintik.com?subject=Enterprise%20Inquiry', '_blank');
    } else {
      handleUpgrade(plan.id as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From individual professionals to enterprise teams, we have the perfect plan for your digital business card needs.
          </p>
        </div>

        {/* Quick Start Options */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quick Start Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Individual User</h3>
              <p className="text-gray-600 mb-4">Perfect for professionals and freelancers</p>
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary w-full"
              >
                Start B2C Free Trial
              </button>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Team</h3>
              <p className="text-gray-600 mb-4">Perfect for teams and organizations</p>
              <button
                onClick={() => navigate('/signup?type=b2b')}
                className="btn-primary w-full"
              >
                Start B2B Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Current Plan Banner */}
        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">
                    Current Plan: {getCurrentPlan().name}
                  </p>
                  <p className="text-sm text-blue-700">
                    {getCurrentPlan().description}
                  </p>
                </div>
              </div>
              {user.plan === 'freemium' && (
                <button
                  onClick={() => handleUpgrade('pro')}
                  className="btn-primary text-sm"
                >
                  Upgrade Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* B2C/B2B Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('b2c')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'b2c'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Individual Plans</span>
              </button>
              <button
                onClick={() => setActiveTab('b2b')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'b2b'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Business Plans</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`grid gap-8 mb-12 ${
          activeTab === 'b2c' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {(activeTab === 'b2c' ? b2cPlans : b2bPlans).map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-sm border p-8 ${
                plan.popular ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-600">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-6">Not included:</h4>
                    <ul className="space-y-3">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">×</div>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <button
                onClick={() => handlePlanAction(plan)}
                disabled={user?.plan === plan.id}
                className={`w-full ${
                  plan.buttonVariant === 'primary' ? 'btn-primary' :
                  plan.buttonVariant === 'outline' ? 'btn-outline' : 'btn-ghost'
                } ${user?.plan === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {user?.plan === plan.id ? 'Current Plan' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Business</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Digital Card</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">QR Code Sharing</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">AI Avatar</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">NFC Cards</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">1 free</td>
                  <td className="text-center py-4 px-4">5 free</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Analytics</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">Advanced</td>
                  <td className="text-center py-4 px-4">Team</td>
                  <td className="text-center py-4 px-4">Enterprise</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Team Management</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">CRM Integration</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">×</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Support</td>
                  <td className="text-center py-4 px-4">Help docs</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Email</td>
                  <td className="text-center py-4 px-4">Priority + SLA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">Absolutely. You can cancel your subscription at any time from your account settings. No long-term contracts required.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upgrade to {selectedPlan === 'pro' ? 'Pro' : selectedPlan === 'business' ? 'Business' : 'Enterprise'}
              </h3>
              <p className="text-gray-600">
                {selectedPlan === 'pro' 
                  ? 'Perfect for professionals and freelancers'
                  : selectedPlan === 'business'
                  ? 'Perfect for teams and small businesses'
                  : 'Advanced features for large organizations'
                }
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              {selectedPlan === 'pro' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">AI Avatar Assistant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Advanced analytics & insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">NFC card request (1 free)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited views & shares</span>
                  </div>
                </>
              ) : selectedPlan === 'business' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Team management (up to 10 members)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Admin dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Team-branded templates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">NFC cards for team (5 free)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited team members</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">CRM integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Pre-linked NFC cards with branding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={confirmUpgrade}
                disabled={isLoading}
                className="flex-1 btn-primary"
              >
                {isLoading ? (
                  <div className="spinner" />
                ) : (
                  `Upgrade to ${selectedPlan === 'pro' ? 'Pro' : selectedPlan === 'business' ? 'Business' : 'Enterprise'}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing; 