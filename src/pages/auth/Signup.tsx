import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, Users, Check } from 'lucide-react';
import { Header, Footer } from '../../components/layout';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'b2c' | 'b2b'>('b2c');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+1',
    mobileNumber: '',
    password: '',
    organizationName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.mobileNumber.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (userType === 'b2b' && !formData.organizationName.trim()) {
      setError('Organization name is required for business accounts');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store user data and navigate to email verification
    const userData = {
      id: '1',
      name: formData.fullName,
      email: formData.email,
      countryCode: formData.countryCode,
      mobileNumber: formData.mobileNumber,
      fullMobileNumber: `${formData.countryCode}${formData.mobileNumber}`,
      userType: userType,
      organizationName: userType === 'b2b' ? formData.organizationName : '',
      jobTitle: '',
      company: '',
      website: '',
      uniqueUrl: formData.fullName.toLowerCase().replace(/\s+/g, ''),
      plan: 'Free',
      hasDigitalCard: false,
      nfcCardRequested: false,
      avatarEnabled: false,
      analyticsEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/verify-email', { state: { email: formData.email } });
    setIsLoading(false);
  };

  const b2cFeatures = [
    'Create your digital business card',
    'Share via QR code, link, or NFC',
    'Basic analytics and insights',
    'Mobile wallet integration',
    'Free forever plan available'
  ];

  const b2bFeatures = [
    'Team management (up to 10 users)',
    'Organization branding control',
    'Centralized AI bot configuration',
    'Advanced team analytics',
    'Role-based access control',
    'Custom integrations available'
  ];

  const currentFeatures = userType === 'b2c' ? b2cFeatures : b2bFeatures;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TwinTik</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600">
              Join thousands of professionals using TwinTik
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* User Type Toggle */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  I'm signing up as:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('b2c')}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      userType === 'b2c'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        userType === 'b2c' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Individual</h3>
                        <p className="text-sm text-gray-600">Personal use</p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('b2b')}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      userType === 'b2b'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        userType === 'b2b' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Business</h3>
                        <p className="text-sm text-gray-600">Team management</p>
                        {userType === 'b2b' && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    {userType === 'b2c' ? 'Full Name' : 'Admin Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={userType === 'b2c' ? 'Enter your full name' : 'Enter admin name'}
                    />
                  </div>
                </div>

                {/* Organization Name Field (only for B2B) */}
                {userType === 'b2b' && (
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="organizationName"
                        name="organizationName"
                        type="text"
                        autoComplete="organization"
                        required
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter organization name"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+55">🇧🇷 +55</option>
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+46">🇸🇪 +46</option>
                      <option value="+47">🇳🇴 +47</option>
                      <option value="+45">🇩🇰 +45</option>
                      <option value="+358">🇫🇮 +358</option>
                      <option value="+41">🇨🇭 +41</option>
                    </select>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || userType === 'b2b'}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    userType === 'b2c' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : userType === 'b2b' ? (
                    <span>Coming Soon</span>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-green-600 hover:text-green-500 underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Terms and Privacy */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-green-600 underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-green-600 underline">Privacy Policy</a>
                </p>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {userType === 'b2c' ? 'Individual Features' : 'Business Features'}
                </h3>
                <p className="text-gray-600">
                  {userType === 'b2c' 
                    ? 'Everything you need to create and share your digital business card'
                    : 'Powerful tools for managing your team\'s digital presence'
                  }
                </p>
              </div>

              <div className="space-y-4">
                {currentFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      userType === 'b2c' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Check className={`w-4 h-4 ${
                        userType === 'b2c' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {userType === 'b2b' && (
                <div className="mt-8 p-4 bg-blue-100 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Business Features Coming Soon</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    We're working hard to bring you powerful team management features. 
                    Sign up for our newsletter to be notified when business features launch.
                  </p>
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  to="/pricing"
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    userType === 'b2c' 
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup; 