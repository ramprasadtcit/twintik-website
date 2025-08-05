import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Building, 
  Briefcase,
  Palette,
  Image,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles
} from 'lucide-react';

interface CardData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  
  // Contact Info
  website: string;
  linkedin: string;
  address: string;
  
  // Design
  theme: 'modern' | 'classic' | 'minimal' | 'bold';
  primaryColor: string;
  logo?: File;
  
  // Social Media
  twitter: string;
  instagram: string;
  facebook: string;
}

interface CardWizardProps {
  onComplete: (data: CardData) => void;
  onCancel: () => void;
}

const CardWizard: React.FC<CardWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<CardData>({
    mode: 'onChange',
    defaultValues: {
      theme: 'modern',
      primaryColor: '#9333ea',
    }
  });

  const watchedValues = watch();

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic details about yourself',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Contact Details',
      description: 'How people can reach you',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Design & Branding',
      description: 'Make it uniquely yours',
      icon: <Palette className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Review & Create',
      description: 'Finalize your digital card',
      icon: <Check className="w-5 h-5" />
    }
  ];

  const themes = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional',
      preview: 'bg-gradient-to-br from-purple-500 to-blue-500'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Timeless and elegant',
      preview: 'bg-gradient-to-br from-gray-700 to-gray-900'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean',
      preview: 'bg-gradient-to-br from-white to-gray-100 border-2 border-gray-200'
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'Eye-catching and vibrant',
      preview: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ];

  const onSubmit = async (data: CardData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete(data);
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">First Name *</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  className="form-input"
                  placeholder="John"
                />
                {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
              </div>
              
              <div>
                <label className="form-label">Last Name *</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  className="form-input"
                  placeholder="Doe"
                />
                {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email'
                  }
                })}
                type="email"
                className="form-input"
                placeholder="john.doe@company.com"
              />
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input
                {...register('phone')}
                type="tel"
                className="form-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Job Title *</label>
                <input
                  {...register('title', { required: 'Job title is required' })}
                  type="text"
                  className="form-input"
                  placeholder="Marketing Director"
                />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>
              
              <div>
                <label className="form-label">Company *</label>
                <input
                  {...register('company', { required: 'Company is required' })}
                  type="text"
                  className="form-input"
                  placeholder="TechCorp Inc."
                />
                {errors.company && <p className="form-error">{errors.company.message}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Website</label>
              <input
                {...register('website')}
                type="url"
                className="form-input"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="form-label">LinkedIn Profile</label>
              <input
                {...register('linkedin')}
                type="url"
                className="form-input"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="form-label">Address</label>
              <textarea
                {...register('address')}
                className="form-input"
                rows={3}
                placeholder="123 Business St, City, State 12345"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">Twitter</label>
                <input
                  {...register('twitter')}
                  type="text"
                  className="form-input"
                  placeholder="@yourhandle"
                />
              </div>
              
              <div>
                <label className="form-label">Instagram</label>
                <input
                  {...register('instagram')}
                  type="text"
                  className="form-input"
                  placeholder="@yourhandle"
                />
              </div>
              
              <div>
                <label className="form-label">Facebook</label>
                <input
                  {...register('facebook')}
                  type="text"
                  className="form-input"
                  placeholder="your.facebook.page"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="form-label">Choose Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setValue('theme', theme.id as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      watchedValues.theme === theme.id
                        ? 'border-purple-500 ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-16 rounded-lg mb-2 ${theme.preview}`} />
                    <h4 className="font-semibold text-sm">{theme.name}</h4>
                    <p className="text-xs text-gray-500">{theme.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Primary Color</label>
              <div className="flex items-center space-x-4">
                <input
                  {...register('primaryColor')}
                  type="color"
                  className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  This will be used for buttons and accents
                </span>
              </div>
            </div>

            <div>
              <label className="form-label">Company Logo (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-300 transition-colors">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 2MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setValue('logo', file);
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Preview Your Card</h3>
              <div className={`p-6 rounded-xl ${themes.find(t => t.id === watchedValues.theme)?.preview}`}>
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {watchedValues.firstName?.[0]}{watchedValues.lastName?.[0]}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">
                    {watchedValues.firstName} {watchedValues.lastName}
                  </h2>
                  <p className="text-sm opacity-90 mb-2">{watchedValues.title}</p>
                  <p className="text-sm opacity-75">{watchedValues.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Card Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="ml-2">{watchedValues.firstName} {watchedValues.lastName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="ml-2">{watchedValues.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Title:</span>
                  <span className="ml-2">{watchedValues.title}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Company:</span>
                  <span className="ml-2">{watchedValues.company}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Theme:</span>
                  <span className="ml-2 capitalize">{watchedValues.theme}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="ml-2">{watchedValues.phone || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Ready to go live!</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your digital card will be instantly available for sharing via QR code, link, or NFC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Your Digital Card</h2>
              <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="btn-ghost"
              >
                Cancel
              </button>
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isValid}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="spinner" />
                  ) : (
                    <>
                      Create Card
                      <Sparkles className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWizard; 