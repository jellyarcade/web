'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  HiOutlineUser,
  HiOutlineLogout,
  HiBell,
  HiHeart,
} from 'react-icons/hi';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import LanguageSwitcher from './LanguageSwitcher';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const menuRef = useRef();
  const t = useTranslations('user');
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuthAction = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div
        className='flex items-center justify-between space-x-2 md:space-x-2'
        ref={menuRef}
      >
        <div className='order-last md:order-first md:mr-4'>
          <LanguageSwitcher />
        </div>

        <div className='flex items-center gap-4 md:gap-6 order-first md:order-last md:ml-6'>
          <button
            onClick={handleAuthAction}
            className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden focus:ring-2 focus:ring-orange-500'
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <img
                src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                alt='Default avatar'
                className='w-full h-full object-cover'
              />
            )}
          </button>

          <div className='flex items-center gap-4 md:hidden'>
            {user ? (
              <Link
                href='/favorites'
                className='text-white hover:text-white/90'
              >
                <HiHeart className='w-8 h-8' />
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className='text-white hover:text-white/90'
              >
                <HiHeart className='w-8 h-8' />
              </button>
            )}
            <div className='relative'>
              {user ? (
                <Link
                  href='/notifications'
                  className='text-white hover:text-white/90'
                >
                  <HiBell className='w-7 h-7' />
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className='text-white hover:text-white/90'
                >
                  <HiBell className='w-7 h-7' />
                </button>
              )}
              {user && (
                <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
              )}
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          {user ? (
            <Link href='/favorites' className='text-white hover:text-white/90'>
              <HiHeart className='w-8 h-8' />
            </Link>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className='text-white hover:text-white/90'
            >
              <HiHeart className='w-8 h-8' />
            </button>
          )}
          <div className='relative'>
            {user ? (
              <Link
                href='/notifications'
                className='text-white hover:text-white/90'
              >
                <HiBell className='w-7 h-7' />
              </Link>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className='text-white hover:text-white/90'
              >
                <HiBell className='w-7 h-7' />
              </button>
            )}
            {user && (
              <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
            )}
          </div>
        </div>
      </div>

      {user && isOpen && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50'>
          <div className='px-4 py-2 border-b border-gray-200 dark:border-gray-700'>
            <p className='text-sm font-medium text-gray-900 dark:text-white'>
              {user.name}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
              {user.email}
            </p>
          </div>
          <Link
            href='/profile'
            className='flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <HiOutlineUser className='text-lg' />
            {t('profile')}
          </Link>
          <button
            onClick={logout}
            className='w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <HiOutlineLogout className='text-lg' />
            {t('logout')}
          </button>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default UserMenu;
