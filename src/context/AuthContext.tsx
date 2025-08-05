import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  jobTitle?: string;
  company?: string;
  website?: string;
  uniqueUrl?: string;
  plan: 'freemium' | 'premium' | 'business';
  hasDigitalCard: boolean;
  nfcCardRequested?: boolean;
  avatarEnabled?: boolean;
  analyticsEnabled?: boolean;
  // B2B Organization fields
  department?: string;
  companySize?: string;
  organizationId?: string;
  role?: 'owner' | 'admin' | 'member';
  teamMembers?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, plan?: 'freemium' | 'business', organizationData?: {
    companyName?: string;
    jobTitle?: string;
    department?: string;
    companySize?: string;
  }) => Promise<void>;
  logout: () => void;
  verifyEmail: (otp: string) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  upgradePlan: (plan: 'premium' | 'business') => Promise<void>;
  requestNfcCard: (address: string, design: string, quantity?: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app this would come from API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      jobTitle: 'Software Engineer',
      company: 'TechCorp',
      website: 'https://johndoe.com',
      uniqueUrl: 'john-doe',
      plan: 'freemium',
      hasDigitalCard: true,
      nfcCardRequested: false,
      avatarEnabled: false,
      analyticsEnabled: false,
    };
    
    saveUser(mockUser);
  };

  const signup = async (name: string, email: string, password: string, plan?: 'freemium' | 'business', organizationData?: {
    companyName?: string;
    jobTitle?: string;
    department?: string;
    companySize?: string;
  }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate unique URL from name
    const uniqueUrl = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
    
    // Mock user data with automatically created digital card
    const mockUser: User = {
      id: '1',
      name,
      email,
      uniqueUrl,
      plan: plan || 'freemium', // Default to 'freemium' if plan is not provided
      hasDigitalCard: true, // Digital card is automatically created
      nfcCardRequested: false,
      avatarEnabled: false,
      analyticsEnabled: false,
      // B2B organization data
      company: organizationData?.companyName,
      jobTitle: organizationData?.jobTitle,
      department: organizationData?.department,
      companySize: organizationData?.companySize,
      organizationId: plan === 'business' ? 'org_' + Math.random().toString(36).substr(2, 9) : undefined,
      role: plan === 'business' ? 'owner' : undefined,
      teamMembers: plan === 'business' ? [] : undefined,
    };
    
    saveUser(mockUser);
  };

  const verifyEmail = async (otp: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }
    
    // Email verified successfully
    console.log('Email verified');
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...profileData };
    saveUser(updatedUser);
  };

  const upgradePlan = async (plan: 'premium' | 'business') => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { 
      ...user, 
      plan,
      avatarEnabled: plan === 'premium' || plan === 'business',
      analyticsEnabled: plan === 'premium' || plan === 'business'
    };
    saveUser(updatedUser);
  };

  const requestNfcCard = async (address: string, design: string, quantity?: string) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, nfcCardRequested: true };
    saveUser(updatedUser);
    
    console.log('NFC card requested:', { address, design });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    verifyEmail,
    updateProfile,
    upgradePlan,
    requestNfcCard,
    isAuthenticated: !!user,
    isLoading,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 