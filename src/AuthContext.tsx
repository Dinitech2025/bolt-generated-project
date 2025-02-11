import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from './supabase';

interface AuthContextType {
  user: { email: string; role: string } | null;
  session: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchUserRole(session?.user?.email || null); // Fetch role on session load
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      fetchUserRole(session?.user?.email || null); // Fetch role on auth state change
    })
  }, []);

  const fetchUserRole = async (email: string | null) => {
    if (!email) {
      setUser(null);
      return;
    }
    try {
      const { data: users, error } = await supabase
        .from('users') // Replace 'users' with your actual table name
        .select('role')
        .eq('email', email);

      if (error) {
        console.error("Error fetching user role:", error);
        setUser({ email: email, role: 'client' }); // Default to 'client' role on error
      } else if (users && users.length > 0) {
        const userRole = users[0].role || 'client'; // Default to 'client' if role is null in DB
        setUser({ email: email, role: userRole });
      } else {
        console.log("User not found in 'users' table, defaulting to 'client' role");
        setUser({ email: email, role: 'client' }); // Default to 'client' if user not found
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUser({ email: email, role: 'client' }); // Default to 'client' role on error
    }
  };


  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase sign-in error:", error);
        alert("Erreur lors de la connexion: " + error.message);
      } else {
        console.log("Supabase sign-in success:", data.session);
        setSession(data.session);
        fetchUserRole(email); // Fetch user role after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An unexpected error occurred during login.");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase sign-out error:", error);
        alert("Error during logout: " + error.message);
      } else {
        console.log("Supabase sign-out success");
        setSession(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An unexpected error occurred during logout.");
    }
  };

  const value: AuthContextType = {
    user,
    session,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
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
