'use client';

import { useState } from 'react';
import { HiMenu, HiSearch, HiX } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import AuthModal from '../auth/AuthModal';
import SearchModal from '../search/SearchModal';

const Header = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('navigation');

  const handleAuthModal = () => {
    setIsAuthModalOpen(true);
    // Sidebar'ı kapat
    setIsSidebarOpen(false);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-40 transition-all duration-300'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#b6e18a] to-[#16bf36]' />

        <div className='relative px-4 sm:px-6 py-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 sm:gap-8'>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='text-brand-orange hover:text-brand-orange/90 text-2xl sm:text-3xl'
              >
                <HiMenu />
              </button>
              <Logo />
            </div>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className='hidden md:block flex-1 max-w-xl mx-8 relative'
            >
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className='w-full px-8 py-3 rounded-full bg-white/90 border-0 focus:ring-2 focus:ring-brand-orange font-light text-base'
              />
              <button
                type='submit'
                className='absolute right-6 top-1/2 -translate-y-1/2 text-[#16bf36] hover:text-[#16bf36]/80 transition-colors'
              >
                <HiSearch className='text-2xl' />
              </button>
            </form>

            {/* Mobile Search Button ve Desktop UserMenu Container */}
            <div className='flex items-center gap-4'>
              <button
                className='md:hidden text-white hover:text-white/90'
                onClick={() => setIsSearchOpen(true)}
              >
                <HiSearch className='text-2xl' />
              </button>
              <div className='hidden md:block'>
                <UserMenu onAuthRequired={handleAuthModal} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
        <UserMenu onAuthRequired={handleAuthModal} />
      </Sidebar>

      {children}
    </>
  );
};

export default Header;
