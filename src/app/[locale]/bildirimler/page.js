'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations('notifications');
  const locale = useLocale();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // İngilizce için notifications sayfasına yönlendir
  useEffect(() => {
    if (locale === 'en') {
      router.replace('/en/notifications');
    }
  }, [locale, router]);

  if (!user) {
    return null;
  }

  return (
    <div className='container  mt-24 mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-2xl font-bold mb-6'>{t('title')}</h1>
        <div className='space-y-4'>
          {/* Bildirimler listesi buraya gelecek */}
          <p className='text-gray-500'>{t('noNotifications')}</p>
        </div>
      </div>
    </div>
  );
}
