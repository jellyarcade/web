'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ locale }) => {
  return (
    <Link href={`/${locale}`} className='block'>
      <Image
        src='/images/logo.png'
        alt='Game Portal Logo'
        width={300}
        height={100}
        className='h-16 w-auto'
      />
    </Link>
  );
};

export default Logo;
