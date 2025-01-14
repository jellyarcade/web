'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const t = useTranslations('auth');

  if (!isOpen) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };

      console.log(
        'Sending auth request to:',
        `https://api.jellyarcade.com${endpoint}`
      );
      console.log('Request body:', body);

      const response = await fetch(`https://api.jellyarcade.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Auth response:', data);

      if (!response.ok) {
        throw new Error(data.message || data.msg || t('error'));
      }

      if (!data.token) {
        throw new Error(t('tokenError'));
      }

      await login(data.user, data.token);
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = provider => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // Her zaman API URL'ini kullan
    const url = `https://api.jellyarcade.com/api/auth/${provider}`;
    console.log('Opening social login URL:', url);

    const popup = window.open(
      url,
      `${provider}Login`,
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,toolbar=no,menubar=no,location=no,status=no`
    );

    // Popup blocker check
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setError('Please disable your popup blocker and try again.');
      return;
    }

    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
      }
    }, 1000);

    window.addEventListener('message', async function handleMessage(event) {
      console.log('Received message:', event.data);
      console.log('Message origin:', event.origin);

      if (event.origin === 'https://api.jellyarcade.com') {
        const { token, error } = event.data;
        if (token) {
          console.log('Received token:', token);
          await login(null, token);
          popup.close();
          onClose();
          window.removeEventListener('message', handleMessage);
          clearInterval(checkPopup);
        } else if (error) {
          console.error('Social login error:', error);
          setError(error);
          popup.close();
          window.removeEventListener('message', handleMessage);
          clearInterval(checkPopup);
        }
      }
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>
            {isLogin ? t('login') : t('signup')}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          {!isLogin && (
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                {t('name')}
              </label>
              <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500'
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {t('email')}
            </label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              {t('password')}
            </label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? t('processing') : isLogin ? t('login') : t('signup')}
          </button>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>
                {t('continueWith')}
              </span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className='w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <FcGoogle className='h-5 w-5' />
              <span className='ml-2'>Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
              className='w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <FaFacebook className='h-5 w-5 text-blue-600' />
              <span className='ml-2'>Facebook</span>
            </button>
          </div>
        </div>

        <div className='mt-6 text-center text-sm'>
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
            className='text-orange-600 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLogin ? t('noAccount') : t('haveAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}
