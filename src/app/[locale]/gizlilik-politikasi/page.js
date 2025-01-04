'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Container from '@/components/layout/Container';

export default function PrivacyPolicy() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('legal');

  useEffect(() => {
    if (locale === 'en') {
      router.replace(`/${locale}/privacy-policy`);
      return;
    }
  }, [router, locale]);

  if (locale === 'en') {
    return null;
  }

  return (
    <Container>
      <div className='max-w-4xl mx-auto py-12'>
        <h1 className='text-4xl font-bold mb-8'>{t('privacyTitle')}</h1>

        <div className='prose prose-lg'>
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('privacy.section1.title')}
            </h2>
            <p>{t('privacy.section1.content')}</p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('privacy.section2.title')}
            </h2>
            <p>{t('privacy.section2.content')}</p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('privacy.section3.title')}
            </h2>
            <p>{t('privacy.section3.content')}</p>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('privacy.cookies.title')}
            </h2>
            <p>{t('privacy.cookies.content')}</p>
            <ul className='list-disc ml-6 mt-4'>
              <li>{t('privacy.cookies.essential')}</li>
              <li>{t('privacy.cookies.analytics')}</li>
              <li>{t('privacy.cookies.preferences')}</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              {t('privacy.section4.title')}
            </h2>
            <p>{t('privacy.section4.content')}</p>
          </section>
        </div>

        <div className='mt-12 text-sm text-gray-600'>
          <p>
            {t('lastUpdated')}: {t('privacyLastUpdated')}
          </p>
        </div>
      </div>
    </Container>
  );
}
