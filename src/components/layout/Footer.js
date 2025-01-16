'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const Footer = () => {
  const locale = useLocale();

  return (
    <footer className='bg-[#1a1a1a] text-white py-3'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          {/* Copyright */}
          <div className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} Jelly Arcade. All rights reserved.
          </div>

          {/* Politika Linkleri */}
          <div className='flex flex-wrap gap-4 text-sm'>
            <Link
              href={`/${locale}/${
                locale === 'tr' ? 'kullanim-kosullari' : 'terms-of-service'
              }`}
              className='text-gray-400 hover:text-white transition-colors'
            >
              {locale === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service'}
            </Link>
            <Link
              href={`/${locale}/${
                locale === 'tr' ? 'gizlilik-politikasi' : 'privacy-policy'
              }`}
              className='text-gray-400 hover:text-white transition-colors'
            >
              {locale === 'tr'
                ? 'Gizlilik ve Çerez Politikası'
                : 'Privacy & Cookie Policy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
