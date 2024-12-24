import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { locales } from "../../../i18n/config";
import QueryProvider from "@/providers/QueryProvider";
import "@/app/globals.css";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Game Portal",
  description: "Play thousands of free games",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const locale = params.locale || "tr";

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
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <QueryProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              {children}
            </NextIntlClientProvider>
          </QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
