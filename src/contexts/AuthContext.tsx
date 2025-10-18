import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member } from '@/types/member';

interface AuthContextType {
  member: Member | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      setMember(JSON.parse(storedMember));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockMember: Member = {
        id: '1',
        email,
        firstName: 'Sarah',
        lastName: 'Johnson',
        joinDate: '2024-01-15',
        subscriptionStatus: 'active',
        currentWeight: 185,
        targetWeight: 150,
        height: 66,
      };

      localStorage.setItem('member', JSON.stringify(mockMember));
      setMember(mockMember);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('member');
    setMember(null);
  };

  return (
    <AuthContext.Provider
      value={{
        member,
        isAuthenticated: !!member,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
