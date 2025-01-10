'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <button
      onClick={handleLocaleChange}
      className='px-2 py-1 rounded hover:bg-gray-100 text-xs font-medium transition-colors'
    >
      {locale === 'tr' ? 'EN' : 'TR'}
    </button>
  );
}
