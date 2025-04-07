// app/[locale]/layout.js (SERVER COMPONENT)
import "@/app/globals.css";
import Analytics from "@/components/analytics/Analytics";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext"; // Import AuthModalProvider
import QueryProvider from "@/providers/QueryProvider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

// Import the client layout
import ClientLayout from "./ClientLayout"; // <-- Bunu birazdan oluşturacağız

const inter = Inter({ subsets: ["latin"] });

const locales = ["tr", "en"];
export const defaultLocale = "tr";

export async function generateMetadata({ params }) {
  const { locale: paramLocale } = params;
  const locale = paramLocale || defaultLocale;
  return {
    title: {
      template:
        locale === "tr"
          ? "%s - Ücretsiz Oyunlar & Yüklemeden hemen oyna!"
          : "%s - Free Games & Play without installing!",
      default:
        locale === "tr"
          ? "Ücretsiz Oyunlar & Yüklemeden hemen oyna!"
          : "Free Games & Play without installing!",
    },
    description:
      locale === "tr"
        ? "Ücretsiz online oyunlar oyna. Yükleme yapmadan binlerce oyunu Jelly Arcade'de oynayabilirsin."
        : "Play free online games. You can play thousands of games on Jelly Arcade without downloading.",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale: paramLocale } = params;
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
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
      <body style={{ fontFamily: "'KarlsenRound', sans-serif" }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryProvider>
            <AuthProvider>
              <AuthModalProvider>
                <ClientLayout>
                  <div className="min-h-screen flex flex-col bg-[#060820]">
                    <Analytics />
                    <Header />
                    <main className="flex-1 mt-5">{children}</main>
                    <Footer />
                  </div>
                </ClientLayout>
              </AuthModalProvider>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
