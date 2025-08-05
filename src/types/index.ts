export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
  avatar?: string;
  plan: 'freemium' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

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
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  customColors: {
    primary: string;
    secondary: string;
    background: string;
  };
  logo?: string;
  theme: 'modern' | 'classic' | 'minimal';
  qrCode: string;
  shareLink: string;
  nfcTag?: string;
  walletCard?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AITwin {
  id: string;
  userId: string;
  avatar: string;
  personality: string;
  faqs: FAQ[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Stats {
  views: number;
  taps: number;
  shares: number;
  leads: number;
  lastUpdated: Date;
}

export interface Lead {
  id: string;
  cardId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'qr' | 'nfc' | 'link' | 'wallet';
  timestamp: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
} 