import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['tr', 'en'],

  // Used when no locale matches
  defaultLocale: 'tr',
});

// Root URL'den gelen istekleri /tr'ye yönlendir
export function middleware(request) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/tr', request.url));
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*'],
};
