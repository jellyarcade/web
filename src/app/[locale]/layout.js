import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import QueryProvider from '@/providers/QueryProvider';
import '@/app/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: {
      template:
        locale === 'tr'
          ? '%s - Ücretsiz Oyunlar & Yükleme Yok'
          : '%s - Free Games & No Install',
      default:
        locale === 'tr'
          ? 'Ücretsiz Oyunlar & Yükleme Yok'
          : 'Free Games & No Install',
    },
    description:
      locale === 'tr'
        ? "Ücretsiz online oyunlar oyna. Yükleme yapmadan binlerce oyunu Jelly Arcade'de oynayabilirsin."
        : 'Play free online games. You can play thousands of games on Jelly Arcade without downloading.',
  };
}

const locales = ['tr', 'en'];
export const defaultLocale = 'tr';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const locale = params.locale || defaultLocale;

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <QueryProvider>
        <AuthProvider>
          <div className='min-h-screen flex flex-col bg-white'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
