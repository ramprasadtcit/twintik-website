import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, Mail, Phone, FileText, ChevronDown, ChevronUp
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      id: 1,
      question: "How do I create my first digital business card?",
      answer: "Creating your digital business card is easy! Simply sign up for an account, complete your profile information, and customize your card design. You can then share it via QR code, link, or NFC technology."
    },
    {
      id: 2,
      question: "Can I customize the design of my digital card?",
      answer: "Yes! Pro and Business users can fully customize their card design including colors, fonts, logos, and backgrounds. Free users have access to basic customization options."
    },
    {
      id: 3,
      question: "How do I track who views my card?",
      answer: "All users can view basic analytics including total views. Pro and Business users get access to advanced analytics with detailed insights about viewer demographics, engagement, and interaction patterns."
    },
    {
      id: 4,
      question: "What is the AI Avatar feature?",
      answer: "The AI Avatar is an intelligent assistant that can answer questions about you and your business when people interact with your digital card. It's available for Business plan users."
    },
    {
      id: 5,
      question: "How do I upgrade my subscription plan?",
      answer: "You can upgrade your plan anytime from the Subscription page in your dashboard. Simply choose the plan that best fits your needs and follow the payment process."
    },
    {
      id: 6,
      question: "Is my data secure?",
      answer: "Absolutely! We use industry-standard encryption and security measures to protect your personal and business information. Your data is never shared with third parties without your consent."
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly (Business users only)",
      action: "Call Now",
      available: user.plan === 'Business'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <DashboardLayout 
      title="Help & Support" 
      subtitle="Get help and find answers to your questions"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Quick Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportOptions.map((option, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow ${
                !option.available ? 'opacity-50' : ''
              }`}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <option.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{option.description}</p>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  option.available
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!option.available}
              >
                {option.action}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
          </div>
          <div className="space-y-3">
            <a 
              href="#" 
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Getting Started Guide</h4>
              <p className="text-sm text-gray-600">Learn the basics of creating and sharing your digital card</p>
            </a>
            <a 
              href="#" 
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900">Advanced Features</h4>
              <p className="text-sm text-gray-600">Explore advanced customization and analytics features</p>
            </a>
            <a 
              href="#" 
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900">API Documentation</h4>
              <p className="text-sm text-gray-600">Integrate TwinTik with your existing systems</p>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-4">Still Need Help?</h3>
          <div className="space-y-3 text-sm text-purple-800">
            <p>Our support team is here to help you get the most out of TwinTik.</p>
            <div className="space-y-2">
              <p><strong>Email:</strong> support@twintik.com</p>
              <p><strong>Response Time:</strong> Within 24 hours</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HelpSupport;
