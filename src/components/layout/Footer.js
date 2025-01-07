'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FooterLinks from './FooterLinks';
import Logo from './Logo';

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://api.jellyarcade.com/api/categories'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        // isActive olan ve parent'ı null olan kategorileri filtrele ve order'a göre sırala
        const filteredCategories = data
          .filter(cat => cat.isActive && cat.parent === null)
          .sort((a, b) => a.order - b.order);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className='w-full bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo ve Açıklama */}
          <div className='space-y-4'>
            <Link href={`/${locale}`}>
              <Logo size='large' />
            </Link>
            <p className='text-gray-400'>{t('description')}</p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>{t('quickLinks')}</h3>
            <FooterLinks />
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>{t('categories')}</h3>
            <ul className='space-y-2'>
              {!loading &&
                categories.map(category => (
                  <li key={category._id}>
                    <Link
                      href={`/${locale}/${
                        locale === 'tr' ? 'kategori' : 'category'
                      }/${category.slug[locale]}`}
                      className='text-gray-400 hover:text-white'
                    >
                      {category.name[locale]}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>{t('legal')}</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href={`/${t('locale')}/${t('paths.termsOfService')}`}
                  className='text-gray-400 hover:text-white'
                >
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${t('locale')}/${t('paths.privacyPolicy')}`}
                  className='text-gray-400 hover:text-white'
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-400'>
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
