'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function FavoritesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations('favorites');
  const locale = useLocale();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // İngilizce için favorites sayfasına yönlendir
  useEffect(() => {
    if (locale === 'en') {
      router.replace('/en/favorites');
    }
  }, [locale, router]);

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-2xl font-bold mb-6'>{t('title')}</h1>
        <div className='space-y-4'>
          {/* Favori oyunlar listesi buraya gelecek */}
          <p className='text-gray-500'>{t('noFavorites')}</p>
        </div>
      </div>
    </div>
  );
}
