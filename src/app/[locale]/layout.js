import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import QueryProvider from '@/providers/QueryProvider';
import '@/app/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Analytics from '@/components/analytics/Analytics';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }) {
  const { locale: paramLocale } = await params;
  const locale = paramLocale || defaultLocale;
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
  const { locale: paramLocale } = await params;
  const locale = paramLocale || defaultLocale;

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
    <html lang={locale}>
      <head>
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            <AuthProvider>
              <div className='min-h-screen flex flex-col bg-white'>
                <Analytics />
                <Header />
                <main className='flex-1'>{children}</main>
                <Footer />
              </div>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
