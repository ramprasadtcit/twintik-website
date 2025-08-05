import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  QrCode, 
  Brain, 
  Smartphone,
  Shield,
  Zap,
  ArrowRight,
  Check,
  Star,
  Building2,
  User,
  BarChart3,
  MessageCircle,
  Calendar,
  FileText,
  Crown,
  Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Smart Cards',
      description: 'NFC, QR, and Wallet-ready profiles for instant sharing'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Avatar Assistant',
      description: 'Interactive digital twin for automated engagement'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Lead Tools Integration',
      description: 'CRM-integrated contact sync, follow-ups, and insights'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Control',
      description: 'Admin dashboard for staff & branding management'
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: 'Instant Sharing',
      description: 'Tap NFC, scan QR, or share via link instantly'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Register',
      description: 'Sign up and create your profile in minutes'
    },
    {
      step: '2',
      title: 'Create Profile',
      description: 'Add your personal and company information'
    },
    {
      step: '3',
      title: 'Generate Card',
      description: 'Get your NFC card, QR code, and Wallet pass'
    },
    {
      step: '4',
      title: 'Share & Connect',
      description: 'Start networking with instant sharing'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp',
      content: 'TwinTik transformed how our team networks. The AI Avatar feature is incredible!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Sales Manager',
      company: 'Growth Inc',
      content: 'The CRM integration saves me hours every week. Worth every penny!',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelance Consultant',
      company: 'Self-employed',
      content: 'Perfect for my business. The NFC cards make networking so much easier.',
      rating: 5
    }
  ];

  const benefits = [
    {
      title: 'Real-Time Control',
      description: 'Instantly update your contact profile'
    },
    {
      title: 'Productivity Tools',
      description: 'Access notes, reminders, calendar & messaging'
    },
    {
      title: 'Team & Brand Management',
      description: 'Admin dashboard for users & assets'
    },
    {
      title: 'Avatar Engagement',
      description: 'Respond to FAQs & guide leads automatically'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Smart Business Card
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We reimagined the business card as a smart, interactive platform — combining NFC technology with admin controls, automation, and AI to deliver measurable engagement and professional impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Start B2C Free Trial
              </Link>
              <Link to="/signup?type=b2b" className="btn-outline text-lg px-8 py-4">
                Start B2B Free Trial
              </Link>
              <Link to="/pricing" className="btn-ghost text-lg px-8 py-4">
                View All Plans
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Setup in 2 minutes
            </p>
            <div className="flex justify-center mt-6 space-x-8">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Individual Users</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>Business Teams</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Network Smarter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individual professionals to enterprise teams, TwinTik provides the tools you need to make every connection count.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-green-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and transform how you network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                From Card Exchange to Feature-Rich Engagement
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform every interaction into a qualified lead through integrated tools for data capture, engagement tracking, and CRM connectivity.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Benefits
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Smart Interaction</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Quick Actions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Content Access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">Instant Save</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about TwinTik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="section-padding bg-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using TwinTik to grow their network
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Start Free Today
            </Link>
            <Link to="/pricing" className="btn-outline text-lg px-8 py-4 bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 