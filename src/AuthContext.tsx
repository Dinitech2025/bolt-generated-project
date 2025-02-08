import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simuler l'authentification
    const users = {
      'admin@exemple.com': { password: 'password', role: 'admin' },
      'client@exemple.com': { password: 'password', role: 'client' },
      'staff@exemple.com': { password: 'password', role: 'staff' },
    };

    if (users[email] && users[email].password === password) {
      setUser({ email: email, role: users[email].role });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
