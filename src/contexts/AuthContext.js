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
      try {
        // URL'den token'ı kontrol et
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const urlToken = urlParams.get('token');
          
          if (urlToken) {
            await handleToken(urlToken);
            // Token'ı URL'den temizle
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
          }

          // Normal localStorage kontrolü
          const storedToken = localStorage.getItem('token');
          if (storedToken) {
            await handleToken(storedToken);
          }
        }
      } catch (error) {
        console.error('Auth init error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Token işleme fonksiyonu
  const handleToken = async (token) => {
    try {
      const decoded = jwtDecode(token);
      
      // Token'ın gerekli alanları içerdiğinden emin olalım
      if (!decoded.userId) {
        throw new Error('Invalid token: missing userId');
      }
      
      const userData = {
        id: decoded.userId,
        role: decoded.role || 'user',
      };

      setUser(userData);
      setToken(token);
      localStorage.setItem('token', token);
      
      return true;
    } catch (error) {
      console.error('Token handling error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      return false;
    }
  };

  const login = async (userData, newToken) => {
    return handleToken(newToken);
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
