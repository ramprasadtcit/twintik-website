import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Link as LinkIcon, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CompleteProfileForm {
  jobTitle: string;
  company: string;
  website: string;
  uniqueUrl: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

const CompleteProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUrlAvailable, setIsUrlAvailable] = useState(true);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CompleteProfileForm>({
    mode: 'onChange',
    defaultValues: {
      uniqueUrl: user?.name?.toLowerCase().replace(/\s+/g, '') || 'john'
    }
  });

  const watchedUrl = watch('uniqueUrl');

  const suggestions = [
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}ak`,
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}123`,
    `${user?.name?.toLowerCase().replace(/\s+/g, '')}56`
  ];

  const checkUrlAvailability = async (url: string) => {
    setIsCheckingUrl(true);
    try {
      // Simulate API call to check URL availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      const available = url !== 'taken';
      setIsUrlAvailable(available);
      return available;
    } catch (err) {
      setIsUrlAvailable(false);
      return false;
    } finally {
      setIsCheckingUrl(false);
    }
  };

  const handleUrlCheck = async () => {
    await checkUrlAvailability(watchedUrl);
  };

  const onSubmit = async (data: CompleteProfileForm) => {
    if (!data.termsAccepted || !data.privacyAccepted) {
      setError('Please accept both Terms and Conditions and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await updateProfile({
        jobTitle: data.jobTitle,
        company: data.company,
        website: data.website,
        uniqueUrl: data.uniqueUrl,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to complete profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h2>
          
          <p className="text-gray-600 mb-8">
            Set up your professional identity and unique TwinTik URL.
          </p>
        </div>

        <div className="card shadow-strong">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                Job Title
              </label>
              <input
                {...register('jobTitle', {
                  required: 'Job title is required',
                })}
                type="text"
                id="jobTitle"
                className={`form-input ${
                  errors.jobTitle ? 'border-red-300' : ''
                }`}
                placeholder="Job Title"
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                Company or Organization
              </label>
              <input
                {...register('company', {
                  required: 'Company is required',
                })}
                type="text"
                id="company"
                className={`form-input ${
                  errors.company ? 'border-red-300' : ''
                }`}
                placeholder="Company or Organization"
              />
              {errors.company && (
                <p className="text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-semibold text-gray-700">
                Website or Portfolio
              </label>
              <input
                {...register('website', {
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL starting with http:// or https://'
                  }
                })}
                type="url"
                id="website"
                className={`form-input ${
                  errors.website ? 'border-red-300' : ''
                }`}
                placeholder="Website or Portfolio"
              />
              {errors.website && (
                <p className="text-sm text-red-600">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="uniqueUrl" className="block text-sm font-semibold text-gray-700">
                Your Unique URL
              </label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      twintik.com/card/
                    </span>
                    <input
                      {...register('uniqueUrl', {
                        required: 'Unique URL is required',
                        pattern: {
                          value: /^[a-z0-9-]+$/,
                          message: 'Only lowercase letters, numbers, and hyphens allowed'
                        },
                        minLength: {
                          value: 3,
                          message: 'URL must be at least 3 characters'
                        }
                      })}
                      type="text"
                      id="uniqueUrl"
                      className={`form-input rounded-l-none ${
                        errors.uniqueUrl ? 'border-red-300' : ''
                      }`}
                      placeholder="yourname"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUrlCheck}
                  disabled={isCheckingUrl || !watchedUrl}
                  className="btn-outline px-4 whitespace-nowrap"
                >
                  {isCheckingUrl ? 'Checking...' : 'Check'}
                </button>
              </div>
              
              {watchedUrl && (
                <div className="flex items-center space-x-2 mt-2">
                  {isUrlAvailable ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                  )}
                  <span className={`text-sm ${isUrlAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {isUrlAvailable ? 'Available' : 'Not available'}
                  </span>
                </div>
              )}
              
              {errors.uniqueUrl && (
                <p className="text-sm text-red-600">{errors.uniqueUrl.message}</p>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                Check availability of the unique URL before proceeding
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Suggestions</label>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="urlSuggestion"
                      value={suggestion}
                      onChange={(e) => {
                        const form = document.getElementById('uniqueUrl') as HTMLInputElement;
                        if (form) form.value = e.target.value;
                      }}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('termsAccepted', {
                    required: 'You must accept the Terms and Conditions'
                  })}
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-green-600 underline">
                    Terms and Conditions
                  </a>
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('privacyAccepted', {
                    required: 'You must accept the Privacy Policy'
                  })}
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/privacy" className="text-green-600 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500">
              Please accept both Terms and Conditions and Privacy Policy to continue
            </p>

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/verify-email')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile; 