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
import LanguageSwitcher from './LanguageSwitcher';

const UserMenu = ({ onAuthRequired }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const t = useTranslations('user');

  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className='flex items-center justify-between space-x-2 md:space-x-2'
      ref={menuRef}
    >
      <div className='flex items-center gap-4 md:gap-6 order-first md:order-last md:ml-6'>
        <button
          onClick={isAuthenticated ? () => setIsOpen(!isOpen) : onAuthRequired}
          className='w-8 h-8 rounded-full bg-gray-200 overflow-hidden focus:ring-2 focus:ring-[#ff4f00]'
        >
          <img
            src='https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
            alt='User avatar'
            className='w-full h-full object-cover'
          />
        </button>

        <div className='flex items-center gap-4 md:hidden'>
          {isAuthenticated ? (
            <Link href='/favorites' className='text-white hover:text-white/90'>
              <HiHeart className='w-8 h-8' />
            </Link>
          ) : (
            <button
              onClick={onAuthRequired}
              className='text-white hover:text-white/90'
            >
              <HiHeart className='w-8 h-8' />
            </button>
          )}
          <div className='relative'>
            {isAuthenticated ? (
              <Link
                href='/notifications'
                className='text-white hover:text-white/90'
              >
                <HiBell className='w-7 h-7' />
              </Link>
            ) : (
              <button
                onClick={onAuthRequired}
                className='text-white hover:text-white/90'
              >
                <HiBell className='w-7 h-7' />
              </button>
            )}
            {isAuthenticated && (
              <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
            )}
          </div>
        </div>
      </div>

      <div className='hidden md:flex items-center gap-4'>
        {isAuthenticated ? (
          <Link href='/favorites' className='text-white hover:text-white/90'>
            <HiHeart className='w-8 h-8' />
          </Link>
        ) : (
          <button
            onClick={onAuthRequired}
            className='text-white hover:text-white/90'
          >
            <HiHeart className='w-8 h-8' />
          </button>
        )}
        <div className='relative'>
          {isAuthenticated ? (
            <Link
              href='/notifications'
              className='text-white hover:text-white/90'
            >
              <HiBell className='w-7 h-7' />
            </Link>
          ) : (
            <button
              onClick={onAuthRequired}
              className='text-white hover:text-white/90'
            >
              <HiBell className='w-7 h-7' />
            </button>
          )}
          {isAuthenticated && (
            <span className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full' />
          )}
        </div>
      </div>

      <div className='order-last md:order-first md:mr-4'>
        <LanguageSwitcher />
      </div>

      {isAuthenticated && isOpen && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50'>
          <Link
            href='/profile'
            className='flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <HiOutlineUser className='text-lg' />
            {t('profile')}
          </Link>
          <button
            onClick={() => {
              // TODO: Implement logout logic
              setIsOpen(false);
            }}
            className='w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <HiOutlineLogout className='text-lg' />
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
