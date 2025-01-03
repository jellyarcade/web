'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function ProfilePage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const path = locale === 'tr' ? 'hesabim' : 'account';
    router.replace(`/${locale}/${path}`);
  }, [router, locale]);

  return null;
}
