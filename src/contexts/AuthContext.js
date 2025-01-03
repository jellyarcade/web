'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Token'dan user bilgilerini çıkar
          const decoded = jwtDecode(token);
          const userData = {
            id: decoded.userId,
            role: decoded.role,
          };
          setUser(userData);
        } catch (error) {
          console.error('Auth init error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (userData, token) => {
    try {
      localStorage.setItem('token', token);
      // Token'dan user bilgilerini çıkar
      const decoded = jwtDecode(token);
      const userInfo = {
        id: decoded.userId,
        role: decoded.role,
      };
      setUser(userInfo);
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
