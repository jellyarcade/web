'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { pageView } = useAnalytics();

  useEffect(() => {
    if (pathname) {
      // Construct the full URL
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      // Send pageview
      pageView(url);
    }
  }, [pathname, searchParams, pageView]);

  return null;
}
