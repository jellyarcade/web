import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

const pathMappings = {
  en: {
    hesabim: 'account',
    favoriler: 'favorites',
    bildirimler: 'notifications',
  },
  tr: {
    account: 'hesabim',
    favorites: 'favoriler',
    notifications: 'bildirimler',
  },
};

const publicPages = ['/', '/api'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.locale || defaultLocale;
  const segments = pathname.split('/');
  const currentPath = segments[2]; // /[locale]/[path]

  // Skip middleware for public pages
  if (publicPages.some(page => pathname.startsWith(page))) {
    return;
  }

  // Handle special page redirects
  if (pathMappings[locale] && currentPath) {
    const correctPath = pathMappings[locale][currentPath];
    if (correctPath) {
      segments[2] = correctPath;
      return Response.redirect(new URL(segments.join('/'), request.url));
    }
  }

  return createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
