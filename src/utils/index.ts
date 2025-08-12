// =============================================================================
// TWINTIK UTILITIES
// =============================================================================

import type { User, PricingPlan, TrafficSource, DeviceStats, LocationData } from '../types';

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Application-wide constants
 */
export const APP_CONFIG = {
  NAME: 'TwinTik',
  DESCRIPTION: 'Digital Business Card & AI Twin Platform',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@twintik.com',
  WEBSITE: 'https://twintik.com',
} as const;

/**
 * Subscription plan configurations
 */
export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: 0,
    billingCycle: 'monthly',
    features: [
      '1 Digital Business Card',
      'Basic QR Code',
      'Standard Themes',
      'Email Support',
    ],
    maxUsers: 1,
    maxCards: 1,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 29,
    billingCycle: 'monthly',
    features: [
      'Everything in Freemium',
      'AI Twin Chatbot',
      'Advanced Analytics',
      'Custom Themes',
      'NFC Card Support',
      'Priority Support',
    ],
    popular: true,
    maxUsers: 1,
    maxCards: 1,
  },
  {
    id: 'business',
    name: 'Business',
    price: 99,
    billingCycle: 'monthly',
    features: [
      'Everything in Premium',
      'Team Management',
      'Organization Branding',
      'Lead Management',
      'Advanced CRM Integration',
      'Dedicated Support',
    ],
    maxUsers: 10,
    maxCards: 10,
  },
];

/**
 * Digital card theme options
 */
export const CARD_THEMES = [
  { id: 'classic-green', name: 'Classic Green', primary: '#16a34a', secondary: '#22c55e' },
  { id: 'modern-purple', name: 'Modern Purple', primary: '#8b5cf6', secondary: '#a855f7' },
  { id: 'minimal', name: 'Minimal', primary: '#374151', secondary: '#6b7280' },
  { id: 'gradient', name: 'Gradient', primary: '#16a34a', secondary: '#22c55e' },
  { id: 'dark', name: 'Dark', primary: '#1f2937', secondary: '#374151' },
] as const;

/**
 * AI Twin personality options
 */
export const AI_PERSONALITIES = [
  { id: 'professional', name: 'Professional', description: 'Formal and business-focused' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
  { id: 'casual', name: 'Casual', description: 'Relaxed and conversational' },
  { id: 'formal', name: 'Formal', description: 'Strict and traditional' },
] as const;

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(dateObj);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }
  
  return formatDate(dateObj);
};

/**
 * Format number with abbreviation (e.g., 1.2K, 3.4M)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// =============================================================================
// USER & PERMISSION UTILITIES
// =============================================================================

/**
 * Check if user has access to premium features
 */
export const hasPremiumAccess = (user: User | null): boolean => {
  return user?.plan === 'premium' || user?.plan === 'business';
};

/**
 * Check if user has access to business features
 */
export const hasBusinessAccess = (user: User | null): boolean => {
  return user?.plan === 'business';
};

/**
 * Check if user is organization admin
 */
export const isOrgAdmin = (user: User | null): boolean => {
  return user?.role === 'owner' || user?.role === 'admin';
};

/**
 * Check if user can access AI Twin features
 */
export const canAccessAITwin = (user: User | null): boolean => {
  return hasPremiumAccess(user) && user?.avatarEnabled === true;
};

/**
 * Check if user can access advanced analytics
 */
export const canAccessAnalytics = (user: User | null): boolean => {
  return hasPremiumAccess(user) && user?.analyticsEnabled === true;
};

/**
 * Check if user can request NFC cards
 */
export const canRequestNfc = (user: User | null): boolean => {
  return hasPremiumAccess(user);
};

/**
 * Get user's display name
 */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Guest';
  return user.name || user.email.split('@')[0];
};

/**
 * Get user's plan display name
 */
export const getPlanDisplayName = (plan: string): string => {
  switch (plan) {
    case 'freemium':
      return 'Freemium';
    case 'premium':
      return 'Premium';
    case 'business':
      return 'Business';
    default:
      return 'Unknown';
  }
};

// =============================================================================
// MOCK DATA GENERATORS
// =============================================================================

/**
 * Generate mock traffic source data
 */
export const generateMockTrafficSources = (): TrafficSource[] => {
  return [
    { source: 'qr', count: 45, percentage: 35 },
    { source: 'link', count: 38, percentage: 30 },
    { source: 'nfc', count: 25, percentage: 20 },
    { source: 'social', count: 12, percentage: 10 },
    { source: 'direct', count: 8, percentage: 5 },
  ];
};

/**
 * Generate mock device statistics
 */
export const generateMockDeviceStats = (): DeviceStats => {
  return {
    mobile: 65,
    desktop: 30,
    tablet: 5,
  };
};

/**
 * Generate mock location data
 */
export const generateMockLocationData = (): LocationData[] => {
  return [
    { country: 'United States', city: 'New York', count: 25 },
    { country: 'United States', city: 'Los Angeles', count: 18 },
    { country: 'Canada', city: 'Toronto', count: 12 },
    { country: 'United Kingdom', city: 'London', count: 10 },
    { country: 'Germany', city: 'Berlin', count: 8 },
  ];
};

// =============================================================================
// URL & SHARING UTILITIES
// =============================================================================

/**
 * Generate share URL for digital card
 */
export const generateShareUrl = (uniqueUrl: string): string => {
  return `${window.location.origin}/card/${uniqueUrl}`;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

/**
 * Download file from URL
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// =============================================================================
// STORAGE UTILITIES
// =============================================================================

/**
 * Save data to localStorage
 */
export const saveToStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 */
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to get from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

// =============================================================================
// DEBOUNCE & THROTTLE UTILITIES
// =============================================================================

/**
 * Debounce function execution
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function execution
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// =============================================================================
// ERROR HANDLING UTILITIES
// =============================================================================

/**
 * Handle API errors gracefully
 */
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Log error with context
 */
export const logError = (error: any, context?: string): void => {
  console.error(`[${context || 'App'}] Error:`, error);
  
  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, etc.
};

// =============================================================================
// RANDOM UTILITIES
// =============================================================================

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Generate random color
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#16a34a', '#22c55e', '#15803d', '#166534',
    '#8b5cf6', '#a855f7', '#7c3aed', '#6d28d9',
    '#f59e0b', '#f97316', '#ea580c', '#dc2626',
    '#06b6d4', '#0891b2', '#0e7490', '#155e75',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Shuffle array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}; 