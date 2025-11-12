import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'faculty' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'student',
    };
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock register - replace with actual API call
    const mockUser: User = {
      id: '1',
      email,
      name,
      role: 'student',
    };
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
