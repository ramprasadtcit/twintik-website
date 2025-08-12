import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Crown, Users, Bot, QrCode, Smartphone, Globe, Building2, User, X, Wrench } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [planType, setPlanType] = useState<'b2c' | 'b2b'>('b2c');

  const b2cPlans = [
    {
      name: 'Free',
      description: 'Perfect for individuals getting started',
      price: { monthly: 0, yearly: 0 },
      pricePerUser: undefined,
      features: [
        { text: '1 Digital Business Card', included: true },
        { text: 'Basic theme options', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Basic analytics (views, taps, saves)', included: true },
        { text: 'Email support', included: true },
        { text: 'Basic Tools (Coming Soon)', included: true, basic: true },
        { text: 'Basic AI Avatar (Coming Soon)', included: true, basic: true },
        { text: 'CRM & Calendar integration', included: false },
        { text: 'Advanced Tools & Analytics', included: false },
        { text: 'Premium AI Avatar', included: false },
        { text: 'Priority support', included: false }
      ],
      icon: User,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      name: 'Premium',
      description: 'For professionals who want more',
      price: { monthly: 8, yearly: 80 },
      pricePerUser: undefined,
      features: [
        { text: '1 Digital Business Card', included: true },
        { text: 'Full branding (colors, logo, layout)', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Advanced analytics (source, device, geo, trends)', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Premium Tools & Advanced Analytics', included: true },
        { text: 'Premium AI Avatar with Custom Training', included: true },
        { text: 'Priority support', included: true }
      ],
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      popular: true
    }
  ];

  const b2bPlans = [
    {
      name: 'Business Starter',
      description: 'Perfect for small teams and startups',
      price: { monthly: 25, yearly: 250 },
      pricePerUser: { monthly: 4, yearly: 40 },
      features: [
        { text: 'Up to 10 users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Org-wide branding', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Org-level basic metrics', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'Basic Tools (Coming Soon)', included: true, basic: true },
        { text: 'Basic AI Avatar (Coming Soon)', included: true, basic: true },
        { text: 'Optional NFC cards (ordering & mapping)', included: true },
        { text: 'Standard support', included: true },
        { text: 'CRM & Calendar integration', included: false },
        { text: 'Advanced Tools & Analytics', included: false },
        { text: 'Premium AI Avatar', included: false },
        { text: 'API & SSO', included: false }
      ],
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: false
    },
    {
      name: 'Business Growth',
      description: 'For growing organizations',
      price: { monthly: 50, yearly: 500 },
      pricePerUser: { monthly: 6, yearly: 60 },
      features: [
        { text: 'Unlimited users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Org-wide branding + custom templates', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Org + per-user advanced analytics', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Premium Tools & Advanced Analytics', included: true },
        { text: 'Premium AI Avatar with Custom Training', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'Optional NFC cards (ordering & mapping)', included: true },
        { text: 'Priority support', included: true },
        { text: 'API & SSO', included: false }
      ],
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large enterprises',
      price: { monthly: 0, yearly: 0 },
      pricePerUser: { monthly: 0, yearly: 0 },
      features: [
        { text: 'Unlimited users', included: true },
        { text: '1 card per user', included: true },
        { text: 'Full white-label (domains, templates)', included: true },
        { text: 'Direct link, QR code, Apple Wallet, Google Wallet, NFC-ready', included: true },
        { text: 'Advanced + custom reports/exports', included: true },
        { text: 'Salesforce / HubSpot / Zoho + calendar links', included: true },
        { text: 'Premium Tools & Advanced Analytics', included: true },
        { text: 'Premium AI Avatar with Custom Training', included: true },
        { text: 'Users, roles, access controls', included: true },
        { text: 'Sub-admins', included: true },
        { text: 'API, SSO, SCIM', included: true },
        { text: 'NFC cards (bulk, custom print, mapping)', included: true },
        { text: 'Dedicated support (SLAs, success manager)', included: true }
      ],
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      popular: false
    }
  ];

  const currentPlans = planType === 'b2c' ? b2cPlans : b2bPlans;

  const features = [
    {
      title: 'Digital Business Cards',
      description: 'Create stunning digital cards that reflect your brand',
      icon: QrCode
    },
    {
      title: 'AI-Powered Avatar',
      description: 'Engage contacts with intelligent AI assistant (Premium)',
      icon: Bot
    },
    {
      title: 'Advanced Tools & Analytics',
      description: 'Track engagement and optimize your networking (Premium)',
      icon: Wrench
    },
    {
      title: 'Team Management',
      description: 'Manage your entire team from one dashboard',
      icon: Users
    },
    {
      title: 'NFC Technology',
      description: 'Tap to share with physical NFC cards',
      icon: Smartphone
    },
    {
      title: 'Global Reach',
      description: 'Connect with professionals worldwide',
      icon: Globe
    }
  ];

  const faqs = [
    {
      question: 'What\'s the difference between Basic and Premium Tools?',
      answer: 'Basic Tools provide essential functionality for getting started, while Premium Tools offer advanced analytics, automation, and customization options for power users.'
    },
    {
      question: 'What\'s included in the Basic AI Avatar?',
      answer: 'Basic AI Avatar provides simple automated responses, while Premium AI Avatar includes custom training, knowledge base integration, and advanced conversation capabilities.'
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can change your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team.'
    },
    {
      question: 'Is there a limit on the number of cards I can create?',
      answer: 'Individual plans are limited to 1 card per user. Business plans allow 1 card per team member.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.'
    },
    {
      question: 'Do you offer custom pricing for large teams?',
      answer: 'Yes, we offer custom pricing for Enterprise plans. Contact our sales team for a personalized quote.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    }
  ];

  const handlePlanAction = (plan: any) => {
    if (planType === 'b2c') {
      if (plan.name === 'Free') {
        window.location.href = '/signup';
      } else {
        window.location.href = '/signup';
      }
    } else {
      window.location.href = '/signup?type=b2b';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TwinTik</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your needs. Start free, upgrade anytime.
            </p>

            {/* Plan Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPlanType('b2c')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    planType === 'b2c'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Individual (B2C)
                </button>
                <button
                  onClick={() => setPlanType('b2b')}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    planType === 'b2b'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Business (B2B)
                </button>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center items-center space-x-4 mb-12">
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
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                plan.popular ? 'border-purple-500 ring-4 ring-purple-100' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  {plan.name === 'Enterprise' ? (
                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-xl text-gray-600 ml-1">
                        {billingCycle === 'yearly' ? '/yr' : '/mo'}
                      </span>
                    </>
                  )}
                </div>
                {plan.pricePerUser && (
                  <p className="text-gray-600 mt-2">
                    + ${billingCycle === 'yearly' ? plan.pricePerUser.yearly : plan.pricePerUser.monthly}/user/mo
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-gray-700 ${feature.basic ? 'text-gray-500 italic' : ''}`}>
                      {feature.text}
                      {feature.basic && <span className="text-xs text-gray-400 ml-1">(Basic)</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanAction(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.name === 'Free'
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : plan.buttonColor + ' text-white'
                }`}
              >
                {plan.name === 'Free' ? 'Start Free' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you create, manage, and grow your digital presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and features
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals using TwinTik to grow their network
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">TwinTik</span>
              </div>
              <p className="text-gray-400">
                The modern digital business card platform that helps professionals connect, share, and grow their network.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TwinTik. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 