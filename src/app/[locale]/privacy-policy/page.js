'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const path = locale === 'tr' ? 'gizlilik-politikasi' : 'privacy-policy';
    router.replace(`/${locale}/${path}`);
  }, [router, locale]);

  return null;
}
