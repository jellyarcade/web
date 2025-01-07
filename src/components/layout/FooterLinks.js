'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const FooterLinks = () => {
  const t = useTranslations('navigation');
  const locale = useLocale();

  const links = [
    { href: `/${locale}`, label: t('home') },
    {
      href: `/${locale}/${locale === 'tr' ? 'en-iyi-oyunlar' : 'top-games'}`,
      label: t('topGames'),
    },
    {
      href: `/${locale}/${locale === 'tr' ? 'hesap' : 'account'}`,
      label: locale === 'tr' ? 'Hesabım' : 'My Account',
    },
    {
      href: `/${locale}/${locale === 'tr' ? 'favoriler' : 'favorites'}`,
      label: locale === 'tr' ? 'Favoriler' : 'Favorites',
    },
    {
      href: `/${locale}/${locale === 'tr' ? 'bildirimler' : 'notifications'}`,
      label: locale === 'tr' ? 'Bildirimler' : 'Notifications',
    },
  ];

  return (
    <ul className='space-y-2'>
      {links.map(link => (
        <li key={link.href}>
          <Link href={link.href} className='text-gray-400 hover:text-white'>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
