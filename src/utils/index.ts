import type { PricingPlan } from '../types';

export const generateQRCode = (data: string): string => {
  // In a real app, this would generate an actual QR code
  // For now, return a placeholder
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
};

export const generateShareLink = (cardId: string): string => {
  return `${window.location.origin}/card/${cardId}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: 0,
    features: [
      'Create digital business card',
      'Basic customization',
      'QR code sharing',
      'Link sharing',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    popular: true,
    features: [
      'Everything in Freemium',
      'NFC tag support',
      'Apple Wallet / Google Wallet',
      'AI Twin avatar',
      'Advanced analytics',
      'CRM integration',
      'Custom branding',
      'Priority support',
      'Unlimited cards'
    ]
  }
];

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
}; 