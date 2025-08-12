// =============================================================================
// CORE USER & AUTHENTICATION TYPES
// =============================================================================

/**
 * User interface representing both B2C and B2B users
 * Includes role-based fields for organization management
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  uniqueUrl?: string;
  
  // Subscription and feature flags
  plan: 'freemium' | 'premium' | 'business';
  hasDigitalCard: boolean;
  nfcCardRequested?: boolean;
  avatarEnabled?: boolean;
  analyticsEnabled?: boolean;
  
  // B2B Organization fields (only for business plan users)
  department?: string;
  companySize?: string;
  organizationId?: string;
  role?: 'owner' | 'admin' | 'member';
  teamMembers?: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Authentication context interface for managing user state
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: 'freemium' | 'business', organizationData?: OrganizationSignupData) => Promise<void>;
  logout: () => void;
  verifyEmail: (otp: string) => Promise<void>;
  
  // User management methods
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  upgradePlan: (plan: 'premium' | 'business') => Promise<void>;
  requestNfcCard: (address: string, design: string, quantity?: string) => Promise<void>;
}

/**
 * Organization signup data for B2B users
 */
export interface OrganizationSignupData {
  companyName?: string;
  jobTitle?: string;
  department?: string;
  companySize?: string;
}

// =============================================================================
// DIGITAL CARD TYPES
// =============================================================================

/**
 * Digital business card configuration and data
 */
export interface DigitalCard {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  
  // Social media links
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  
  // Design customization
  customColors: {
    primary: string;
    secondary: string;
    background: string;
  };
  logo?: string;
  theme: 'modern' | 'classic' | 'minimal' | 'gradient' | 'dark';
  
  // Sharing options
  qrCode: string;
  shareLink: string;
  nfcTag?: string;
  walletCard?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// AI TWIN & CHATBOT TYPES
// =============================================================================

/**
 * AI Twin configuration for personalized chatbot
 */
export interface AITwin {
  id: string;
  userId: string;
  avatar: string;
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
  tone: string;
  responseStyle: string;
  faqs: FAQ[];
  documents: Document[];
  links: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * FAQ item for AI Twin knowledge base
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Document for AI Twin knowledge base
 */
export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'txt';
  url: string;
  uploadedAt: Date;
}

// =============================================================================
// ANALYTICS & STATISTICS TYPES
// =============================================================================

/**
 * Card performance statistics
 */
export interface Stats {
  views: number;
  taps: number;
  shares: number;
  leads: number;
  conversionRate: number;
  uniqueVisitors: number;
  returnVisitors: number;
  lastUpdated: Date;
}

/**
 * Traffic source breakdown
 */
export interface TrafficSource {
  source: 'qr' | 'nfc' | 'link' | 'social' | 'direct';
  count: number;
  percentage: number;
}

/**
 * Device breakdown statistics
 */
export interface DeviceStats {
  mobile: number;
  desktop: number;
  tablet: number;
}

/**
 * Geographic location data
 */
export interface LocationData {
  country: string;
  city: string;
  count: number;
}

// =============================================================================
// LEAD MANAGEMENT TYPES
// =============================================================================

/**
 * Lead captured from digital card interactions
 */
export interface Lead {
  id: string;
  cardId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'qr' | 'nfc' | 'link' | 'wallet';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  value?: number;
  notes?: string;
  timestamp: Date;
}

// =============================================================================
// SUBSCRIPTION & BILLING TYPES
// =============================================================================

/**
 * Pricing plan configuration
 */
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  maxUsers?: number;
  maxCards?: number;
}

/**
 * Invoice/transaction record
 */
export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: Date;
  description: string;
}

// =============================================================================
// ORGANIZATION MANAGEMENT TYPES
// =============================================================================

/**
 * Team member in B2B organization
 */
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'invited' | 'suspended';
  joinedAt: Date;
  lastActive: Date;
  cardViews: number;
  leadsGenerated: number;
}

/**
 * Organization settings and branding
 */
export interface OrganizationSettings {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  defaultTheme: string;
  allowCustomBranding: boolean;
  maxTeamSize: number;
  createdAt: Date;
  updatedAt: Date;
} 