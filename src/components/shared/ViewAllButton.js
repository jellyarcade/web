'use client';

import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

export default function ViewAllButton({ href, children }) {
  return (
    <Link
      href={href}
      className='inline-flex items-center text-orange-600 hover:text-orange-700 font-medium'
    >
      {children}
      <HiChevronRight className='w-5 h-5 ml-1' />
    </Link>
  );
}
