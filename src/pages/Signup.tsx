import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Sparkles, Shield, Clock, Zap, Phone, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils';

interface SignupForm {
  fullName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  companyName?: string;
  jobTitle?: string;
  department?: string;
  companySize?: string;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isB2B = searchParams.get('type') === 'b2b';
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      countryCode: '+971'
    }
  });

  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError('');
    
    try {
      // For B2B users, automatically set them to business plan
      if (isB2B) {
        await signup(
          data.fullName, 
          data.email, 
          data.password, 
          'business',
          {
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            department: data.department,
            companySize: data.companySize,
          }
        );
      } else {
        await signup(data.fullName, data.email, data.password, 'freemium');
      }
      navigate('/verify-email');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Setup in 2 Minutes',
      description: 'Get your digital card ready instantly'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Instant Sharing',
      description: 'Share via QR code, link, or NFC'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: isB2B ? 'Team Management' : 'AI-Powered',
      description: isB2B ? 'Manage your team and track performance' : 'Smart features to grow your network'
    }
  ];

  const countryCodes = [
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">TwinTik</span>
              </Link>
              <div className="flex items-center justify-center lg:justify-start mb-4">
                {isB2B && (
                  <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Building2 className="w-4 h-4" />
                    <span>Business Account</span>
                  </div>
                )}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {isB2B ? 'Create your business account' : 'Create your account'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isB2B ? 'Set up your team for success' : "Let's get started with a few details"}
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
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('fullName', {
                        required: 'Full name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                      type="text"
                      id="fullName"
                      className={`form-input-with-icon ${
                        errors.fullName ? 'border-red-300' : ''
                      }`}
                      placeholder="Full Name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        validate: (value) => validateEmail(value) || 'Please enter a valid email',
                      })}
                      type="email"
                      id="email"
                      className={`form-input-with-icon ${
                        errors.email ? 'border-red-300' : ''
                      }`}
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700">
                    Mobile Number *
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <select
                        {...register('countryCode')}
                        className="form-input pr-8 min-w-[120px]"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register('mobileNumber', {
                          required: 'Mobile number is required',
                          pattern: {
                            value: /^[0-9]{9,15}$/,
                            message: 'Please enter a valid mobile number'
                          }
                        })}
                        type="tel"
                        id="mobileNumber"
                        className={`form-input-with-icon ${
                          errors.mobileNumber ? 'border-red-300' : ''
                        }`}
                        placeholder="Mobile Number"
                      />
                    </div>
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        validate: (value) => validatePassword(value) || 'Password must be at least 8 characters',
                      })}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className={`form-input-with-icons ${
                        errors.password ? 'border-red-300' : ''
                      }`}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className={`form-input-with-icons ${
                        errors.confirmPassword ? 'border-red-300' : ''
                      }`}
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* B2B Organization Details */}
                {isB2B && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">
                        Company Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('companyName', {
                            required: isB2B ? 'Company name is required' : false,
                          })}
                          type="text"
                          id="companyName"
                          className={`form-input-with-icon ${
                            errors.companyName ? 'border-red-300' : ''
                          }`}
                          placeholder="Company Name"
                        />
                      </div>
                      {errors.companyName && (
                        <p className="text-sm text-red-600">{errors.companyName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                        Job Title *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('jobTitle', {
                            required: isB2B ? 'Job title is required' : false,
                          })}
                          type="text"
                          id="jobTitle"
                          className={`form-input-with-icon ${
                            errors.jobTitle ? 'border-red-300' : ''
                          }`}
                          placeholder="Job Title"
                        />
                      </div>
                      {errors.jobTitle && (
                        <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                        Department
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          {...register('department')}
                          type="text"
                          id="department"
                          className="form-input-with-icon"
                          placeholder="Department (Optional)"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="companySize" className="block text-sm font-semibold text-gray-700">
                        Company Size
                      </label>
                      <select
                        {...register('companySize')}
                        id="companySize"
                        className="form-input"
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary"
                >
                  {isLoading ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join 10,000+ professionals
              </h3>
              <p className="text-gray-600 text-lg">
                Create your digital business card and start networking smarter today
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-green-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">What you'll get:</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free digital business card</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>QR code sharing</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Basic analytics</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Setup in under 2 minutes</span>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Trusted by professionals at</p>
              <div className="flex items-center justify-center space-x-6 opacity-60">
                <div className="text-sm font-medium text-gray-400">TechCorp</div>
                <div className="text-sm font-medium text-gray-400">Growth Inc</div>
                <div className="text-sm font-medium text-gray-400">StartupXYZ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 