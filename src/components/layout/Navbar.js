'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LocaleSwitcher from './LocaleSwitcher';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className='fixed top-0 left-0 right-0 bg-white border-b z-50'>
      <div className='container mx-auto px-3'>
        <div className='flex items-center justify-between h-12'>
          {/* Logo */}
          <Link href={`/${locale}`} className='flex-shrink-0'>
            <Logo size='small' />
          </Link>

          {/* Search Bar */}
          <div className='flex-grow max-w-xl mx-3'>
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className='flex items-center gap-1.5'>
            <LocaleSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
