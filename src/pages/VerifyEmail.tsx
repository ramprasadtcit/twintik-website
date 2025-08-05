import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Shield, Mail, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface VerifyEmailForm {
  otp: string;
}

const VerifyEmail: React.FC = () => {
  const { user, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailForm>();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const onSubmit = async (data: VerifyEmailForm) => {
    setIsLoading(true);
    setError('');
    
    try {
      await verifyEmail(data.otp);
      navigate('/complete-profile');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      // Call resend OTP API
      setCanResend(false);
      setResendTimer(60);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = value;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Your Account
          </h2>
          
          <p className="text-gray-600 mb-6">
            We've sent a verification code to your email.
          </p>

          {user?.email && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium text-gray-900">
                Email: {user.email}
              </p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">OTP Verified successfully</span>
          </div>
        </div>

        <div className="card shadow-strong">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="otp" className="form-label">
                Email Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('otp', {
                    required: 'Verification code is required',
                    minLength: {
                      value: 6,
                      message: 'Code must be 6 digits',
                    },
                    maxLength: {
                      value: 6,
                      message: 'Code must be 6 digits',
                    },
                  })}
                  type="text"
                  id="otp"
                  className={`form-input pl-10 text-center text-lg tracking-widest ${
                    errors.otp ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter 6-digit code"
                  onChange={handleOtpChange}
                  maxLength={6}
                />
              </div>
              {errors.otp && (
                <p className="form-error">{errors.otp.message}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={!canResend}
                className={`text-sm ${
                  canResend
                    ? 'text-green-600 hover:text-green-500 underline'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {canResend
                  ? 'Resend OTP'
                  : `Resend OTP in ${resendTimer}s`
                }
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <div className="spinner" />
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 