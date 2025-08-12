import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simple login function
  const login = async (email: string, _password: string) => {
    // Mock user for testing
    const mockUser: User = {
      id: '1',
      name: 'Test User',
      email,
      jobTitle: 'Developer',
      company: 'Test Company',
      website: 'https://test.com',
      uniqueUrl: 'test-user',
      plan: 'freemium',
      hasDigitalCard: true,
      nfcCardRequested: false,
      avatarEnabled: false,
      analyticsEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(mockUser);
  };

  // Simple signup function
  const signup = async (name: string, email: string, _password: string) => {
    const mockUser: User = {
      id: '2',
      name,
      email,
      jobTitle: 'Professional',
      company: 'New Company',
      website: 'https://newcompany.com',
      uniqueUrl: name.toLowerCase().replace(/\s+/g, ''),
      plan: 'freemium',
      hasDigitalCard: true,
      nfcCardRequested: false,
      avatarEnabled: false,
      analyticsEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(mockUser);
  };

  // Simple logout function
  const logout = () => {
    setUser(null);
  };

  // Placeholder functions
  const verifyEmail = async () => {};
  const updateProfile = async () => {};
  const upgradePlan = async () => {};
  const requestNfcCard = async () => {};

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: false,
    login,
    signup,
    logout,
    verifyEmail,
    updateProfile,
    upgradePlan,
    requestNfcCard,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 