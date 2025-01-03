'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        try {
          // Token'dan user bilgilerini çıkar
          const decoded = jwtDecode(storedToken);
          const userData = {
            id: decoded.userId,
            role: decoded.role,
          };
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth init error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (userData, newToken) => {
    try {
      localStorage.setItem('token', newToken);
      // Token'dan user bilgilerini çıkar
      const decoded = jwtDecode(newToken);
      const userInfo = {
        id: decoded.userId,
        role: decoded.role,
      };
      setUser(userInfo);
      setToken(newToken);
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
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
