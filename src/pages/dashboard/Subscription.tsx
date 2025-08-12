import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, X, Star
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

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

  const b2cPlans = [
    {
      id: 'Free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      pricePerUser: undefined,
      period: '/ month',
      features: [
        { text: '1 Digital Business Card', included: true },
        { text: 'Basic theme options', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Basic analytics (views, taps, saves)', included: true },
        { text: 'Email support', included: true },
        { text: 'CRM & Calendar integration', included: false },
        { text: 'AI Avatar', included: false },
        { text: 'Priority support', included: false }
      ],
      current: true,
      recommended: false
    },
    {
      id: 'Premium',
      name: 'Premium',
      price: { monthly: 8, yearly: 80 },
      pricePerUser: undefined,
      period: '/ month',
      features: [
        { text: '1 Digital Business Card', included: true },
        { text: 'Full branding (colors, logo, layout)', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Advanced analytics (source, device, geo, trends)', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Personal AI avatar', included: true },
        { text: 'Priority support', included: true }
      ],
      current: false,
      recommended: true
    }
  ];

  const b2bPlans = [
    {
      id: 'Business Starter',
      name: 'Business Starter',
      price: { monthly: 25, yearly: 250 },
      pricePerUser: { monthly: 4, yearly: 40 },
      period: '/ month',
      features: [
        { text: 'Up to 10 users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Org-wide branding', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Org-level basic metrics', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'Optional NFC cards (ordering & mapping)', included: true },
        { text: 'Standard support', included: true },
        { text: 'CRM & Calendar integration', included: false },
        { text: 'AI Avatar', included: false },
        { text: 'API & SSO', included: false }
      ],
      current: false,
      recommended: false
    },
    {
      id: 'Business Growth',
      name: 'Business Growth',
      price: { monthly: 50, yearly: 500 },
      pricePerUser: { monthly: 6, yearly: 60 },
      period: '/ month',
      features: [
        { text: 'Unlimited users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Org-wide branding + custom templates', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Org + per-user advanced analytics', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Organization avatar (shared brand twin)', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'Optional NFC cards (ordering & mapping)', included: true },
        { text: 'Priority support', included: true },
        { text: 'API & SSO', included: false }
      ],
      current: false,
      recommended: true
    },
    {
      id: 'Enterprise',
      name: 'Enterprise',
      price: { monthly: 0, yearly: 0 },
      pricePerUser: { monthly: 0, yearly: 0 },
      period: '/ month',
      features: [
        { text: 'Unlimited users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Full white-label (domains, templates)', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Advanced + custom reports/exports', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Per-user avatars (team twins)', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'API, SSO, SCIM', included: true },
        { text: 'NFC cards (bulk, custom print, mapping)', included: true },
        { text: 'Dedicated support (SLAs, success manager)', included: true }
      ],
      current: false,
      recommended: false
    }
  ];

  // Determine which plans to show based on user type
  const plans = user.organizationId ? b2bPlans : b2cPlans;

  const handlePlanSelect = (planId: string) => {
    // Here you would typically handle the plan upgrade
    console.log('Selected plan:', planId);
  };

  return (
    <DashboardLayout 
      title="Subscription Plans" 
      subtitle="Find a plan that's right for you"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Find a plan that's right for you
          </h2>
          <p className="text-gray-600">
            Upgrade for advanced features and unlock your full potential.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center space-x-4">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600 transition-colors"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 text-purple-600 font-medium">Save 17%</span>
          </span>
        </div>

        {/* Subscription Plans */}
        <div className="space-y-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
                plan.recommended 
                  ? 'border-purple-500 shadow-lg' 
                  : plan.current 
                    ? 'border-gray-200' 
                    : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    {plan.name === 'Enterprise' ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900">Custom</span>
                        <span className="text-gray-500">Contact sales</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        </span>
                        <span className="text-gray-500">{plan.period}</span>
                        {plan.pricePerUser && (
                          <span className="text-sm text-gray-500 ml-2">
                            +${billingCycle === 'monthly' ? plan.pricePerUser.monthly : plan.pricePerUser.yearly}/user
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {plan.recommended && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      Recommended
                    </span>
                  )}
                  {plan.current && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      Current Plan
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.current
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.recommended
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : plan.name === 'Enterprise'
                        ? 'bg-gray-600 text-white hover:bg-gray-700'
                        : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 
                 plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Star className="w-6 h-6 text-purple-600 mt-1" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">Why Upgrade?</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Get advanced analytics and custom branding</li>
                <li>• AI-powered avatar for better engagement</li>
                <li>• CRM integrations and calendar links</li>
                <li>• Priority support and dedicated account management</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Plan:</span>
              <span className="font-medium text-gray-900">Free Plan</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Next Billing:</span>
              <span className="text-gray-900">N/A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Auto-renew:</span>
              <span className="text-gray-900">Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
