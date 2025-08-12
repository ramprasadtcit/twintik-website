import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Check, Building2 } from 'lucide-react';
import { Header, Footer } from '../../components/layout';

const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    website: '',
    uniqueUrl: '',
    organizationName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUrlAvailable, setIsUrlAvailable] = useState(true);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setFormData({
        jobTitle: '',
        company: '',
        website: '',
        uniqueUrl: userObj.uniqueUrl || userObj.name?.toLowerCase().replace(/\s+/g, '') || 'john',
        organizationName: userObj.organizationName || ''
      });
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const checkUrlAvailability = async (url: string) => {
    setIsCheckingUrl(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo purposes, assume URL is available if it's not 'john' or 'admin'
    setIsUrlAvailable(!['john', 'admin', 'test'].includes(url.toLowerCase()));
    setIsCheckingUrl(false);
  };

  const handleUrlCheck = async () => {
    await checkUrlAvailability(formData.uniqueUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted || !privacyAccepted) {
      setError('Please accept both Terms and Conditions and Privacy Policy to continue.');
      return;
    }

    if (!formData.jobTitle.trim()) {
      setError('Job title is required');
      return;
    }

    if (!formData.company.trim()) {
      setError('Company or organization is required');
      return;
    }

    if (user?.userType === 'b2b' && !formData.organizationName.trim()) {
      setError('Organization name is required for business accounts');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update user data
    const updatedUser = {
      ...user,
      jobTitle: formData.jobTitle,
      company: formData.company,
      website: formData.website,
      uniqueUrl: formData.uniqueUrl,
      organizationName: user?.userType === 'b2b' ? formData.organizationName : '',
      hasDigitalCard: true,
      profileCompleted: true
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/dashboard');
    setIsLoading(false);
  };

  const suggestions = [
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}ak`,
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}123`,
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}56`
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isB2B = user.userType === 'b2b';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {isB2B ? (
                <Building2 className="w-10 h-10 text-green-600" />
              ) : (
                <User className="w-10 h-10 text-green-600" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h2>
            <p className="text-gray-600">
              {isB2B 
                ? 'Set up your business profile and team configuration'
                : 'Set up your professional identity and unique TwinTik URL'
              }
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  {isB2B ? 'Admin Role' : 'Job Title'}
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={isB2B ? 'e.g., CEO, Manager, Director' : 'e.g., Sales Manager, Developer'}
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  {isB2B ? 'Company Name' : 'Company or Organization'}
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={isB2B ? 'Enter company name' : 'Enter company or organization'}
                />
              </div>

              {/* Organization Name (B2B only) */}
              {isB2B && (
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Display Name
                  </label>
                  <input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Name to display on team cards"
                  />
                </div>
              )}

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website or Portfolio
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://your-website.com"
                />
              </div>

              {/* Unique URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Unique URL
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">twintik.com/card/</span>
                  <input
                    name="uniqueUrl"
                    type="text"
                    required
                    value={formData.uniqueUrl}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="unique-url"
                  />
                  {isUrlAvailable && formData.uniqueUrl && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={handleUrlCheck}
                    disabled={isCheckingUrl}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {isCheckingUrl ? 'Checking...' : 'Check'}
                  </button>
                  <p className="text-xs text-gray-500">
                    Check availability of the unique URL
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggestions
                </label>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="urlSuggestion"
                        value={suggestion}
                        onChange={() => setFormData(prev => ({ ...prev, uniqueUrl: suggestion }))}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{suggestion}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 underline">Terms and Conditions</a>
                  </span>
                </label>
                
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 underline">Privacy Policy</a>
                  </span>
                </label>
                
                <p className="text-xs text-gray-500">
                  Please accept both Terms and Conditions and Privacy Policy to continue
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Setting up...</span>
                  </div>
                ) : (
                  <span>Complete Setup</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile; 